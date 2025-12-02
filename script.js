// === Gestion du changement de thème ===

// Fonction pour appliquer le thème
function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    
    // Mettre à jour l'icône du bouton
    const themeIcon = document.querySelector('.theme-icon');
    if (themeIcon) {
        themeIcon.textContent = theme === 'light' ? '🌙' : '☀️';
    }
    
    console.log('Thème appliqué:', theme); // Pour debug
}

// Initialiser le thème IMMÉDIATEMENT (avant DOMContentLoaded)
const savedTheme = localStorage.getItem('theme') || 'dark';
if (document.documentElement) {
    document.documentElement.setAttribute('data-theme', savedTheme);
}

// Initialiser le reste au chargement de la page
document.addEventListener('DOMContentLoaded', function() {
    // Appliquer le thème sauvegardé
    applyTheme(savedTheme);
    
    // Ajouter l'écouteur d'événement sur le bouton de thème
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            applyTheme(newTheme);
            console.log('Changement de thème:', currentTheme, '->', newTheme); // Pour debug
        });
    } else {
        console.error('Bouton de thème non trouvé!'); // Pour debug
    }
    
    // Navigation smooth scroll (bonus)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Mettre à jour la classe active
                document.querySelectorAll('.nav-links a').forEach(link => {
                    link.classList.remove('active');
                });
                this.classList.add('active');
            }
        });
    });
    
    // Détecter la section active pendant le scroll
    window.addEventListener('scroll', function() {
        let current = '';
        const sections = document.querySelectorAll('section[id]');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });
        
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
});
