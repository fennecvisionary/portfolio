document.addEventListener('DOMContentLoaded', () => {
    const modeToggle = document.getElementById('mode-toggle');
    const body = document.body;

    // Check for saved mode preference
    const savedMode = localStorage.getItem('mode');
    if (savedMode) {
        body.classList.add(savedMode);
        if (savedMode === 'dark-mode') {
            modeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        }
    }

    modeToggle.addEventListener('click', () => {
        if (body.classList.contains('light-mode')) {
            body.classList.replace('light-mode', 'dark-mode');
            modeToggle.innerHTML = '<i class="fas fa-sun"></i>';
            localStorage.setItem('mode', 'dark-mode');
        } else {
            body.classList.replace('dark-mode', 'light-mode');
            modeToggle.innerHTML = '<i class="fas fa-moon"></i>';
            localStorage.setItem('mode', 'light-mode');
        }
    });
});
