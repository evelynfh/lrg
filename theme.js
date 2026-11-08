// Ringing Tracker theme: applies the saved theme immediately — load in <head> to avoid a flash —
// and exposes setTheme() for the Settings menu.
//
// Themes: 'cream' (the default), 'light' and 'dark' — each is just a set of colours in shared.css.
// 'light' and 'dark' are also the values older versions of the site saved, so existing
// visitors keep their choice.
(function () {
  var KEY = 'rt-theme';

  // What a first-time visitor sees. Change this to 'light' or 'dark' to change the default.
  var DEFAULT_THEME = 'cream';

  // Theme -> colour for the browser's own UI (mobile address bar etc.)
  var THEMES = { light: '#f6f7f8', cream: '#f5f0e8', dark: '#0f1316' };

  function isTheme(mode) {
    return Object.prototype.hasOwnProperty.call(THEMES, mode);
  }

  function saved() {
    try { return localStorage.getItem(KEY); } catch (e) { return null; }
  }

  function apply(mode) {
    if (!isTheme(mode)) mode = DEFAULT_THEME;
    document.documentElement.setAttribute('data-theme', mode);

    document.querySelectorAll('meta[name="theme-color"]').forEach(function (m) {
      m.setAttribute('content', THEMES[mode]);
    });

    // Mark the matching option in the Settings picker (it may not exist yet when this first runs)
    document.querySelectorAll('[data-theme-choice]').forEach(function (b) {
      b.setAttribute('aria-pressed', b.getAttribute('data-theme-choice') === mode ? 'true' : 'false');
    });
  }

  var s = saved();
  apply(isTheme(s) ? s : DEFAULT_THEME);

  window.setTheme = function (mode) {
    if (!isTheme(mode)) return;
    try { localStorage.setItem(KEY, mode); } catch (e) {}
    apply(mode);
  };

  // The picker buttons are added by shared.js after this runs in <head>: sync them once the page is ready.
  document.addEventListener('DOMContentLoaded', function () {
    apply(document.documentElement.getAttribute('data-theme'));
  });
})();
