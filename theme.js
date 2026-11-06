// Ringing Tracker theme: applies the saved (or system) theme immediately — load in <head>
// to avoid a flash — and exposes setTheme() for the Settings menu.
//
// Themes: 'light' (shown as "White", the default), 'cream' (the original look) and 'dark'.
// 'light' and 'dark' are also the values older versions of the site saved, so existing
// visitors keep their choice.
(function () {
  var KEY = 'rt-theme';

  // Theme -> colour for the browser's own UI (mobile address bar etc.)
  var THEMES = { light: '#f6f7f8', cream: '#f5f0e8', dark: '#0f1316' };

  // The cream theme's fonts. Only fetched when cream is actually used.
  var CREAM_FONTS = 'https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500&family=Playfair+Display:wght@500;600;700&display=swap';

  function saved() {
    try { return localStorage.getItem(KEY); } catch (e) { return null; }
  }

  function systemDark() {
    return !!(window.matchMedia && matchMedia('(prefers-color-scheme: dark)').matches);
  }

  function loadCreamFonts() {
    if (document.getElementById('rt-cream-fonts')) return;
    var link = document.createElement('link');
    link.id = 'rt-cream-fonts';
    link.rel = 'stylesheet';
    link.href = CREAM_FONTS;
    document.head.appendChild(link);
  }

  // `chosen` is true when the visitor picked the theme (or had picked it before); until then the
  // theme-color meta tags keep following the system light/dark setting.
  function apply(mode, chosen) {
    if (!THEMES[mode]) mode = 'light';
    document.documentElement.setAttribute('data-theme', mode);
    if (mode === 'cream') loadCreamFonts();

    if (chosen) {
      document.querySelectorAll('meta[name="theme-color"]').forEach(function (m) {
        m.setAttribute('content', THEMES[mode]);
        m.removeAttribute('media');
      });
    }

    // Mark the matching option in the Settings picker (it may not exist yet when this first runs)
    document.querySelectorAll('[data-theme-choice]').forEach(function (b) {
      b.setAttribute('aria-pressed', b.getAttribute('data-theme-choice') === mode ? 'true' : 'false');
    });
  }

  var s = saved();
  var hasChoice = !!(s && THEMES[s]);
  apply(hasChoice ? s : (systemDark() ? 'dark' : 'light'), hasChoice);

  window.setTheme = function (mode) {
    if (!THEMES[mode]) return;
    try { localStorage.setItem(KEY, mode); } catch (e) {}
    apply(mode, true);
  };

  // The picker buttons are added by shared.js after this runs in <head>: sync them once the page is ready.
  document.addEventListener('DOMContentLoaded', function () {
    apply(document.documentElement.getAttribute('data-theme'), false);
  });
})();
