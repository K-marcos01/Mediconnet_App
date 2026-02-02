// Date actuelle
        const now = new Date();
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        document.getElementById('currentDate').textContent = now.toLocaleDateString('fr-FR', options);
        
        // Initialisation menu burger
        const menuToggle = document.querySelector('.menu-toggle');
        const doctorNav = document.querySelector('.doctor-nav');
        
        if (menuToggle && doctorNav) {
            menuToggle.addEventListener('click', function() {
                doctorNav.classList.toggle('active');
                const icon = this.querySelector('i');
                icon.className = doctorNav.classList.contains('active') ? 'fas fa-times' : 'fas fa-bars';
            });
        }