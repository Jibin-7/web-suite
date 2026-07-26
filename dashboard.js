/**
 * ==========================================================================
 * Dashboard Interactive Enhancements
 * Handles theme switching, report modal display, and checklist toggling.
 * ==========================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
    // Theme Switcher Elements
    const themeBtn = document.getElementById('themeSwitchBtn');
    const root = document.documentElement;
    const themes = ['theme-cyber', 'theme-emerald', 'theme-gold'];
    let currentThemeIdx = 0;

    if (themeBtn) {
        themeBtn.addEventListener('click', () => {
            root.classList.remove(...themes);
            currentThemeIdx = (currentThemeIdx + 1) % themes.length;
            const newTheme = themes[currentThemeIdx];
            if (newTheme !== 'theme-cyber') {
                root.classList.add(newTheme);
            }
            
            const themeNames = ['Dark Violet', 'Matrix Emerald', 'Solar Gold'];
            const icons = ['fa-wand-magic-sparkles', 'fa-network-wired', 'fa-sun'];
            themeBtn.innerHTML = `<i class="fa-solid ${icons[currentThemeIdx]}"></i> <span>Theme: ${themeNames[currentThemeIdx]}</span>`;
        });
    }

    // Report Generator Modal
    const reportBtn = document.getElementById('generateReportBtn');
    const reportModal = document.getElementById('reportModal');
    const closeReportBtn = document.getElementById('closeReportBtn');
    const printReportBtn = document.getElementById('printReportBtn');

    if (reportBtn && reportModal) {
        reportBtn.addEventListener('click', () => {
            const timeEl = document.getElementById('reportTimestamp');
            if (timeEl) {
                timeEl.textContent = new Date().toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                });
            }
            reportModal.classList.add('show');
        });

        closeReportBtn.addEventListener('click', () => {
            reportModal.classList.remove('show');
        });

        printReportBtn.addEventListener('click', () => {
            window.print();
        });

        reportModal.addEventListener('click', (e) => {
            if (e.target === reportModal) {
                reportModal.classList.remove('show');
            }
        });
    }

    // Interactive Checklist Animation
    const evalItems = document.querySelectorAll('.eval-item');
    evalItems.forEach((item) => {
        item.style.cursor = 'pointer';
        item.setAttribute('title', 'Click to toggle status');
        item.addEventListener('click', () => {
            item.classList.toggle('verified');
            const icon = item.querySelector('i');
            if (item.classList.contains('verified')) {
                icon.className = 'fa-solid fa-circle-check';
            } else {
                icon.className = 'fa-regular fa-circle';
            }
        });
    });
});
