// src/js/theme.js
export function initTheme() {
  const themeToggleBtn = document.getElementById('theme-toggle');
  const darkIcon = document.getElementById('theme-toggle-dark-icon');
  const lightIcon = document.getElementById('theme-toggle-light-icon');

  if (!themeToggleBtn) return;

  // ឆែកមើល state ដើមពី LocalStorage
  const isDark = localStorage.getItem('color-theme') === 'dark' ||
    (!('color-theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches);

  if (isDark) {
    document.documentElement.classList.add('dark');
    darkIcon?.classList.add('hidden');
    lightIcon?.classList.remove('hidden');
  } else {
    document.documentElement.classList.remove('dark');
    darkIcon?.classList.remove('hidden');
    lightIcon?.classList.add('hidden');
  }

  // Event ពេលចុច Toggle
  themeToggleBtn.addEventListener('click', () => {
    darkIcon?.classList.toggle('hidden');
    lightIcon?.classList.toggle('hidden');

    if (document.documentElement.classList.contains('dark')) {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('color-theme', 'light');
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('color-theme', 'dark');
    }
  });
}