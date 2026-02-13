// 2. GESTION DE LA SIDEBAR
    
    const sidebarItems = document.querySelectorAll('.sidebar-item');
    const contentSections = document.querySelectorAll('.content-section');
    
    // Gestion des clics sur la sidebar
    sidebarItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Retirer la classe active de tous les items
            sidebarItems.forEach(i => i.classList.remove('active'));
            
            // Ajouter la classe active à l'item cliqué
            this.classList.add('active');
            
            // Récupérer la section à afficher
            const sectionId = this.getAttribute('data-section');
            
            // Masquer toutes les sections
            contentSections.forEach(section => {
                section.classList.remove('active');
            });
            
            // Afficher la section correspondante
            const targetSection = document.getElementById(sectionId);
            if (targetSection) {
                targetSection.classList.add('active');
                
                // Faire défiler vers la section
                targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                
                console.log(`Section affichée: ${sectionId}`);
                
                // Charger les données spécifiques à la section
                loadSectionData(sectionId);
            }
        });
    });