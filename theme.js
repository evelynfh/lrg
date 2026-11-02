// Ringing Tracker theme: applies saved/system theme immediately (load in <head>
// to avoid a flash), and exposes toggleTheme() for the Settings menu.
(function () {
  var KEY = 'rt-theme';

  function saved() {
    try { return localStorage.getItem(KEY); } catch (e) { return null; }
  }

  function systemDark() {
    return !!(window.matchMedia && matchMedia('(prefers-color-scheme: dark)').matches);
  }

  function apply(mode) {
    document.documentElement.setAttribute('data-theme', mode);
    var btn = document.getElementById('theme-toggle');
    if (btn) btn.textContent = 'Dark mode: ' + (mode === 'dark' ? 'on' : 'off');
  }

  var s = saved();
  apply(s === 'dark' || s === 'light' ? s : (systemDark() ? 'dark' : 'light'));

  window.toggleTheme = function () {
    var next = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    try { localStorage.setItem(KEY, next); } catch (e) {}
    apply(next);
  };

  // The button doesn't exist yet when this runs in <head>; sync its label later.
  document.addEventListener('DOMContentLoaded', function () {
    apply(document.documentElement.getAttribute('data-theme'));
  });
})();
