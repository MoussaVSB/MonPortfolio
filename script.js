// Récupérer le thème sauvegardé (par défaut: dark)
const savedTheme = localStorage.getItem('theme') || 'dark';
document.documentElement.setAttribute('data-theme', savedTheme);

// Au chargement de la page
document.addEventListener('DOMContentLoaded', function() {
    // Mettre à jour l'icône
    const themeIcon = document.querySelector('.theme-icon');
    if (themeIcon) {
        themeIcon.textContent = savedTheme === 'light' ? '🌙' : '☀️';
    }

    // Gérer le clic sur le bouton
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            
            // Appliquer le nouveau thème
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            
            // Changer l'icône
            if (themeIcon) {
                themeIcon.textContent = newTheme === 'light' ? '🌙' : '☀️';
            }
        });
    }
});