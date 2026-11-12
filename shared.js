// Ringing Tracker: behaviour and markup shared by every page.
// Load at the END of <body>, after the page's own scripts.
// Set <body data-page="log"> or <body data-page="dashboard"> to mark the active nav link.

// ── Backend ──
window.SCRIPT_URL = 'https://script.google.com/macros/s/AKfycby_325ASJS3a7eWO0SF1VKzMLJyePOAVuk46kxnRf6voyz_u1lIBJYvnZ9gbkczMrpH/exec';

// ── Safety helpers: use esc() on ANY text that came from a user or the spreadsheet
// before putting it into innerHTML or an HTML attribute.
window.esc = function (s) {
  return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
    return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
  });
};

// Like esc(), but wraps every case-insensitive match of q in <span class="match">.
window.highlight = function (text, q) {
  if (!q) return window.esc(text);
  var re = new RegExp('(' + q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + ')', 'i');
  return String(text).split(re).map(function (part, i) {
    return i % 2 ? '<span class="match">' + window.esc(part) + '</span>' : window.esc(part);
  }).join('');
};

// ── Catching-method helpers: one definition of "is this a whoosh / mist net?" ──
window.isWhoosh = function (method) {
  return String(method == null ? '' : method).toLowerCase().indexOf('whoosh') !== -1;
};
window.isMistNet = function (method) {
  return String(method == null ? '' : method).trim().toLowerCase() === 'mist net';
};

// ── Downloads ──
window.downloadBlob = function (blob, filename) {
  var url = URL.createObjectURL(blob);
  var a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};

// One CSV cell: quotes values containing , " or a newline, and defuses spreadsheet formulas
// (text starting with = + - @ would otherwise run when the file is opened in Excel).
window.csvCell = function (value) {
  var s = value === null || value === undefined ? '' : String(value);
  if (typeof value === 'string' && /^[=+\-@\t\r]/.test(s)) s = "'" + s;
  if (s.indexOf(',') !== -1 || s.indexOf('"') !== -1 || s.indexOf('\n') !== -1) {
    return '"' + s.replace(/"/g, '""') + '"';
  }
  return s;
};

// rows: array of arrays. The leading BOM makes Excel read accented names as UTF-8.
window.downloadCSV = function (rows, filename) {
  var csv = rows.map(function (row) { return row.map(window.csvCell).join(','); }).join('\r\n');
  window.downloadBlob(new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8;' }), filename);
};

(function () {
  var page = document.body.dataset.page || '';
  var email = 'evelynfhowatson' + '@' + 'gmail.com'; // split to deter scrapers

  function modal(id, title, body) {
    return '<div class="info-overlay" id="' + id + '" onclick="handleInfoOverlayClick(event,\'' + id + '\')">'
      + '<div class="info-modal"><div class="info-modal-hd"><h2>' + title + '</h2>'
      + '<button class="info-modal-x" onclick="closeInfoModal(\'' + id + '\')" aria-label="Close">\u00d7</button></div>'
      + '<div class="info-modal-bd">' + body + '</div></div></div>';
  }

  var header =
    '<header><h1>Ringing Tracker</h1><nav>'
    + '<a href="index.html"' + (page === 'log' ? ' class="active"' : '') + '>Log session</a>'
    + '<a href="dashboard.html"' + (page === 'dashboard' ? ' class="active"' : '') + '>Dashboard</a>'
    + '<div class="settings-wrap">'
    + '<button class="settings-btn" id="settings-btn" onclick="toggleSettings(event)" aria-label="Settings">'
    + '\u2699 <span class="settings-label">Settings</span></button>'
    + '<div class="settings-dropdown" id="settings-dropdown">'
    + '<div class="settings-theme" role="group" aria-label="Theme"><span class="settings-theme-label">Theme</span><div class="theme-options">'
    + '<button type="button" class="theme-opt" data-theme-choice="light" aria-pressed="false">Light</button>'
    + '<button type="button" class="theme-opt" data-theme-choice="cream" aria-pressed="false">Cream</button>'
    + '<button type="button" class="theme-opt" data-theme-choice="dark" aria-pressed="false">Dark</button>'
    + '</div></div>'
    + '<button class="settings-item" onclick="openInfoModal(\'about-modal\')">FAQ</button>'
    + '<button class="settings-item" onclick="openInfoModal(\'changelog-modal\')">Changelog</button>'
    + '<button class="settings-item" onclick="openInfoModal(\'report-modal\')">Report issues</button>'
    + '</div></div></nav></header>';

  var faq =
    '<h3>What can Ringing Tracker do?</h3>'
    + '<p>Ringing Tracker is primarily for ringing trainees and anyone interested in tracking their ringing data, with a focus on those working towards ringing licence endorsements. Anyone with the website link can start logging their own sessions, upload their old records to be added to the database, and view their compiled stats to see their licence progression, breakdowns across species and catching methods.</p>'
    + '<h3>How does logging data work?</h3>'
    + '<p>Ringing data is stored on a Google Sheets spreadsheet, which tracks Ringers, Methods, and Responses to the Log session form. If you are new to the tracker, please write your full name and click "Add new" when logging data \u2014 it should then be saved going forward. This should also work for new species and catching methods, in case you catch something outside the UK or with a novel method. Since it needs to update a spreadsheet, it requires an internet connection to work.</p>'
    + '<h3>How do I upload my old data?</h3>'
    + '<p>Use the "Upload previous records" button at the bottom of the Log session page and upload your old data in whatever format you use. Since the data structures will vary, uploaded files need manual approval, so it may be a few days before they get added to the main database and appear in the dashboard. If you want to be notified when this happens, pop your contact details in the notes section.</p>'
    + '<h3>What if I entered something wrong?</h3>'
    + '<p>On the Dashboard, each session in the Session history has a Flag button. Use it to describe what needs changing and the request is emailed to the person who looks after the spreadsheet, who will make the edit.</p>'
    + '<h3>Is the data backed up?</h3>'
    + '<p>Yes \u2014 every time you log a new session the responses sheet is backed up to a separate spreadsheet, and there are also regular weekly backups to cover manual edits. It\'s also worth using the "Export data" button on the dashboard to download your data (as a session-level .csv or a BTO-format .xlsx) so you have an offline copy.</p>';

  var changelog =
    '<div class="cl-entry"><span class="vtag vtag-new">v1.1.1 \u00b7 Latest</span><ul>'
    + '<li>Species gaps now include the group\u2019s trainer data, so you can see what the wider group is catching.</li>'
    + '<li>Choose which ringers (including trainers) to compare against in the Species gaps header.</li>'
    + '<li>Fixed the bottom of the FAQ, changelog and other pop-ups being cut off on mobile.</li>'
    + '</ul></div>'
    + '<div class="cl-entry"><span class="vtag">v1.1.0</span><ul>'
    '<div class="cl-entry"><span class="vtag vtag-new">v1.1.0</span><ul>'
    + '<li>Dashboard now tracks licence progression, showing how far you are to the minimum thresholds for all endorsements.</li>'
    + '<li>Users can now flag past sessions in case of data error and send a comment to request a database edit.</li>'
    + '<li>Updated the website style, with choice of light/cream/dark themes (saved via cookies).</li>'
    + '<li>Various QoL improvements: nest type is pre-selected from species; improved highlighting consistency in the log session; species breakdown table now includes totals; can now submit a zero-catch whoosh session.</li>'    + '</ul></div>'
    + '<div class="cl-entry"><span class="vtag">v1.0.1</span><ul>'
    + '<li>Added extra detail to track BTO-relevant ringing progress (e.g. number of whoosh net firings, number of broods assessed)</li>'
    + '<li>Added bird categories (e.g. open-nesting passerines, birds of prey etc.) to the dashboard for clearer reading</li>'
    + '<li>Added an export option for a BTO-formatted .xlsx ringing progress tracker, alongside the session-level .csv option</li>'
    + '<li>Can now click on a species gap to view ringers who have logged that species</li>'
    + '<li>Fixed mobile padding issue with the settings button</li>'
    + '</ul></div>'
    + '<div class="cl-entry"><span class="vtag">v1.0.0</span><ul>'
    + '<li>Log sessions by species, age class, and catching method, with separate counts for extracted and processed birds</li>'
    + '<li>Searchable species dropdown covering the full BTO list, with 5-letter codes</li>'
    + '<li>New species, methods, and ringers are added to the sheet automatically</li>'
    + '<li>Confirmation screen so you can check everything before it gets submitted</li>'
    + '<li>Per-ringer dashboard with total extractions, processing counts, and a full method breakdown</li>'
    + '<li>Species gap analysis \u2014 see what other ringers have caught that you haven\'t yet</li>'
    + '<li>Upload previous records in any format for manual import into the database</li>'
    + '<li>Works on mobile</li>'
    + '</ul></div>';

  var report =
    '<h3>Email</h3><p><a href="mailto:' + email + '">' + email + '</a> \u2014 let me know if you have any questions or feedback!</p>'
    + '<h3>GitHub</h3><p><a href="https://github.com/evelynfh/lrg" target="_blank" rel="noopener">https://github.com/evelynfh/lrg</a> \u2014 please report any bugs or issues here!</p>';

  document.body.insertAdjacentHTML('afterbegin', header);
  document.body.insertAdjacentHTML('beforeend',
    modal('about-modal', 'FAQ', faq)
    + modal('changelog-modal', 'Changelog', changelog)
    + modal('report-modal', 'Report issues', report));

  // ── Settings dropdown ──
  window.toggleSettings = function (e) {
    e.stopPropagation();
    var open = document.getElementById('settings-dropdown').classList.toggle('open');
    document.getElementById('settings-btn').classList.toggle('open', open);
  };

  window.closeSettings = function () {
    document.getElementById('settings-dropdown').classList.remove('open');
    document.getElementById('settings-btn').classList.remove('open');
  };

  document.addEventListener('click', function (e) {
    var wrap = document.querySelector('.settings-wrap');
    if (wrap && !wrap.contains(e.target)) window.closeSettings();
  });

  // ── Theme picker (the buttons are added above; theme.js does the work) ──
  document.addEventListener('click', function (e) {
    var btn = e.target.closest && e.target.closest('[data-theme-choice]');
    if (btn && typeof window.setTheme === 'function') window.setTheme(btn.getAttribute('data-theme-choice'));
  });

  // ── Info modals ──
  window.openInfoModal = function (id) {
    window.closeSettings();
    document.getElementById(id).classList.add('open');
    document.body.style.overflow = 'hidden';
  };

  window.closeInfoModal = function (id) {
    document.getElementById(id).classList.remove('open');
    if (!document.querySelectorAll('.info-overlay.open').length) document.body.style.overflow = '';
  };

  window.handleInfoOverlayClick = function (e, id) {
    if (e.target === document.getElementById(id)) window.closeInfoModal(id);
  };

  // Single, shared Escape handler for every page. Pages can opt in to extra
  // Escape behaviour (e.g. closing a page-specific modal or menu) by defining
  // window.closeOnEscape — called last, only once info modals/settings are
  // already handled.
  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Escape') return;
    var open = document.querySelectorAll('.info-overlay.open');
    if (open.length) { open.forEach(function (m) { window.closeInfoModal(m.id); }); return; }
    window.closeSettings();
    if (typeof window.closeOnEscape === 'function') window.closeOnEscape();
  });

  // (theme.js marks the selected theme in the picker once the page has loaded.)
})();
