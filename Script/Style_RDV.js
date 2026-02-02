// ===========================================
// JAVASCRIPT POUR LA PAGE DES RENDEZ-VOUS
// ===========================================

document.addEventListener('DOMContentLoaded', function() {
    console.log('Page des rendez-vous chargée');
    
    // Initialisation des variables
    const filterButtons = document.querySelectorAll('.filter-btn-rdv');
    const rdvCards = document.querySelectorAll('.rdv-card-custom');
    const searchInput = document.getElementById('searchRdv');
    const cancelButtons = document.querySelectorAll('.btn-annuler-rdv');
    const detailButtons = document.querySelectorAll('.btn-details-rdv');
    
    // ====================
    // GESTION DES FILTRES
    // ====================
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Retirer la classe active de tous les boutons
            filterButtons.forEach(btn => {
                btn.classList.remove('active');
            });
            
            // Ajouter la classe active au bouton cliqué
            this.classList.add('active');
            
            // Récupérer le filtre sélectionné
            const filter = this.getAttribute('data-filter');
            
            // Appliquer le filtre
            filterRdvCards(filter);
        });
    });
    
    /**
     * Filtre les cartes de rendez-vous
     * @param {string} filter - Type de filtre (all, upcoming, past)
     */
    function filterRdvCards(filter) {
        rdvCards.forEach(card => {
            switch(filter) {
                case 'all':
                    card.style.display = 'block';
                    break;
                    
                case 'upcoming':
                    if (card.classList.contains('upcoming')) {
                        card.style.display = 'block';
                    } else {
                        card.style.display = 'none';
                    }
                    break;
                    
                case 'past':
                    if (card.classList.contains('past')) {
                        card.style.display = 'block';
                    } else {
                        card.style.display = 'none';
                    }
                    break;
            }
        });
    }
    
    // ====================
    // RECHERCHE EN TEMPS RÉEL
    // ====================
    
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase().trim();
            
            rdvCards.forEach(card => {
                // Récupérer le texte à rechercher
                const doctor = card.querySelector('.rdv-doctor').textContent.toLowerCase();
                const motif = card.querySelector('.rdv-motif').textContent.toLowerCase();
                const location = card.querySelector('.rdv-location').textContent.toLowerCase();
                const date = card.querySelector('.rdv-date').textContent.toLowerCase();
                
                // Vérifier si la carte correspond à la recherche
                const matches = doctor.includes(searchTerm) || 
                               motif.includes(searchTerm) || 
                               location.includes(searchTerm) ||
                               date.includes(searchTerm);
                
                // Afficher ou masquer la carte
                card.style.display = matches ? 'block' : 'none';
            });
        });
    }
    
    // ====================
    // ANNULATION DES RDV
    // ====================
    
    cancelButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Récupérer les informations du rendez-vous
            const card = this.closest('.rdv-card-custom');
            const doctor = card.querySelector('.rdv-doctor').textContent;
            const date = card.querySelector('.rdv-date').textContent;
            
            // Confirmer l'annulation
            if (confirm(`Êtes-vous sûr de vouloir annuler votre rendez-vous avec ${doctor} (${date}) ?`)) {
                annulerRendezVous(card, this);
            }
        });
    });
    
    /**
     * Annule un rendez-vous
     * @param {HTMLElement} card - La carte du rendez-vous
     * @param {HTMLElement} button - Le bouton d'annulation
     */
    function annulerRendezVous(card, button) {
        // Mettre à jour l'apparence de la carte
        card.style.opacity = '0.6';
        card.classList.add('cancelled');
        
        // Mettre à jour le statut
        const statusElement = card.querySelector('.rdv-status');
        statusElement.textContent = 'Annulé';
        statusElement.className = 'rdv-status';
        statusElement.style.backgroundColor = '#999';
        statusElement.style.color = 'white';
        
        // Désactiver le bouton d'annulation
        button.textContent = 'Annulé';
        button.disabled = true;
        button.style.backgroundColor = '#999';
        button.style.cursor = 'not-allowed';
        
        // Retirer le bouton Annuler pour les rendez-vous passés
        card.classList.remove('upcoming');
        
        // Afficher une notification
        showNotification('Rendez-vous annulé avec succès', 'success');
        
        // Ici, normalement, vous feriez un appel AJAX pour sauvegarder en base de données
        console.log('Rendez-vous annulé:', {
            doctor: card.querySelector('.rdv-doctor').textContent,
            date: card.querySelector('.rdv-date').textContent
        });
    }
    
    // ====================
    // AFFICHER LES DÉTAILS
    // ====================
    
    detailButtons.forEach(button => {
        button.addEventListener('click', function() {
            const card = this.closest('.rdv-card-custom');
            afficherDetailsRdv(card);
        });
    });
    
    /**
     * Affiche les détails d'un rendez-vous
     * @param {HTMLElement} card - La carte du rendez-vous
     */
    function afficherDetailsRdv(card) {
        // Récupérer toutes les informations
        const doctor = card.querySelector('.rdv-doctor').textContent;
        const date = card.querySelector('.rdv-date').textContent;
        const motif = card.querySelector('.rdv-motif').textContent;
        const location = card.querySelector('.rdv-location').textContent;
        const status = card.querySelector('.rdv-status').textContent;
        
        // Créer le message de détails
        let detailsMessage = `DÉTAILS DU RENDEZ-VOUS\n`;
        detailsMessage += `══════════════════════\n\n`;
        detailsMessage += `👨‍⚕️  ${doctor}\n`;
        detailsMessage += `📅  ${date}\n`;
        detailsMessage += `📝  ${motif}\n`;
        detailsMessage += `📍  ${location}\n`;
        detailsMessage += `📊  Statut : ${status}\n\n`;
        
        // Ajouter des options en fonction du statut
        if (status === 'À venir') {
            detailsMessage += `Actions disponibles :\n`;
            detailsMessage += `• Modifier le rendez-vous\n`;
            detailsMessage += `• Annuler le rendez-vous\n`;
            detailsMessage += `• Recevoir un rappel\n`;
        } else if (status === 'Passé') {
            detailsMessage += `Actions disponibles :\n`;
            detailsMessage += `• Consulter le compte-rendu\n`;
            detailsMessage += `• Télécharger les documents\n`;
            detailsMessage += `• Prendre un nouveau rendez-vous\n`;
        }
        
        // Afficher les détails (pour l'instant dans une alerte)
        // Plus tard, vous pourriez créer une modal
        alert(detailsMessage);
    }
    
    // ====================
    // FONCTION DE NOTIFICATION
    // ====================
    
    /**
     * Affiche une notification
     * @param {string} message - Le message à afficher
     * @param {string} type - Le type de notification (success, error, info)
     */
    function showNotification(message, type = 'info') {
        // Créer l'élément de notification
        const notification = document.createElement('div');
        notification.className = 'notification notification-' + type;
        
        // Déterminer l'icône en fonction du type
        let icon = 'info-circle';
        let bgColor = '#1a73e8';
        
        if (type === 'success') {
            icon = 'check-circle';
            bgColor = '#2e7d32';
        } else if (type === 'error') {
            icon = 'exclamation-circle';
            bgColor = '#c62828';
        }
        
        // Ajouter le contenu HTML
        notification.innerHTML = `
            <i class="fas fa-${icon}"></i>
            <span>${message}</span>
            <button class="notification-close"><i class="fas fa-times"></i></button>
        `;
        
        // Appliquer les styles
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${bgColor};
            color: white;
            padding: 15px 20px;
            border-radius: 8px;
            display: flex;
            align-items: center;
            gap: 12px;
            z-index: 10000;
            box-shadow: 0 4px 15px rgba(0,0,0,0.2);
            animation: notificationSlideIn 0.3s ease;
            max-width: 400px;
            font-size: 0.95rem;
        `;
        
        // Ajouter les styles d'animation si non présents
        if (!document.querySelector('#notification-styles')) {
            const style = document.createElement('style');
            style.id = 'notification-styles';
            style.textContent = `
                @keyframes notificationSlideIn {
                    from { transform: translateX(100%); opacity: 0; }
                    to { transform: translateX(0); opacity: 1; }
                }
                @keyframes notificationFadeOut {
                    from { opacity: 1; }
                    to { opacity: 0; }
                }
            `;
            document.head.appendChild(style);
        }
        
        // Ajouter la notification au body
        document.body.appendChild(notification);
        
        // Gérer la fermeture
        const closeBtn = notification.querySelector('.notification-close');
        closeBtn.addEventListener('click', function() {
            notification.style.animation = 'notificationFadeOut 0.3s ease';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.remove();
                }
            }, 300);
        });
        
        // Fermer automatiquement après 5 secondes
        setTimeout(() => {
            if (notification.parentNode) {
                notification.style.animation = 'notificationFadeOut 0.3s ease';
                setTimeout(() => {
                    if (notification.parentNode) {
                        notification.remove();
                    }
                }, 300);
            }
        }, 5000);
    }
    
    // ====================
    // INITIALISATION
    // ====================
    
    // Vérifier si des rendez-vous sont présents
    if (rdvCards.length === 0) {
        const rdvGrid = document.getElementById('rdvGrid');
        if (rdvGrid) {
            rdvGrid.innerHTML = `
                <div class="no-rdv-message">
                    <i class="fas fa-calendar-times"></i>
                    <h3>Aucun rendez-vous planifié</h3>
                    <p>Vous n'avez pas encore de rendez-vous médicaux.</p>
                    <a href="Formulaire.html" class="btn-nouveau-rdv">
                        <i class="fas fa-plus"></i> Prendre un rendez-vous
                    </a>
                </div>
            `;
        }
    }
});