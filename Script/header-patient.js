// ===========================================
// SCRIPT POUR LE HEADER PATIENT
// ===========================================

document.addEventListener('DOMContentLoaded', function() {
    console.log('Header patient chargé');
    
    // =============================
    // 1. GESTION DES NOTIFICATIONS
    // =============================
    
    const notificationsBtn = document.getElementById('notificationsBtn');
    if (notificationsBtn) {
        notificationsBtn.addEventListener('click', function() {
            showNotificationsModal();
        });
    }
    
    function showNotificationsModal() {
        const modalContent = `
            <h2><i class="fas fa-bell"></i> Notifications</h2>
            <div class="notifications-list">
                <div class="notification-item unread">
                    <div class="notification-icon">
                        <i class="fas fa-calendar-check"></i>
                    </div>
                    <div class="notification-content">
                        <h4>Rappel de rendez-vous</h4>
                        <p>Vous avez un rendez-vous demain à 10h00 avec Dr. LIKIBI</p>
                        <small>Il y a 2 heures</small>
                    </div>
                </div>
                <div class="notification-item unread">
                    <div class="notification-icon">
                        <i class="fas fa-file-medical"></i>
                    </div>
                    <div class="notification-content">
                        <h4>Nouveau document disponible</h4>
                        <p>Votre compte rendu médical est disponible</p>
                        <small>Il y a 1 jour</small>
                    </div>
                </div>
                <div class="notification-item">
                    <div class="notification-icon">
                        <i class="fas fa-pills"></i>
                    </div>
                    <div class="notification-content">
                        <h4>Rappel de traitement</h4>
                        <p>Pensez à prendre votre traitement</p>
                        <small>Il y a 3 jours</small>
                    </div>
                </div>
            </div>
            <div class="notifications-actions">
                <button class="btn-primary" onclick="markAllAsRead()">
                    <i class="fas fa-check-double"></i> Tout marquer comme lu
                </button>
                <button class="btn-secondary" onclick="fermerModal()">
                    <i class="fas fa-times"></i> Fermer
                </button>
            </div>
        `;
        
        // Utiliser la fonction showModal du script principal
        if (typeof showModal === 'function') {
            showModal(modalContent);
        }
    }
    
    window.markAllAsRead = function() {
        const notificationCount = document.querySelector('.notification-count');
        if (notificationCount) {
            notificationCount.textContent = '0';
            notificationCount.style.display = 'none';
        }
        
        if (typeof showNotification === 'function') {
            showNotification('Toutes les notifications ont été marquées comme lues', 'success');
        }
        
        fermerModal();
    };
    
    // =============================
    // 2. GESTION DU PROFIL UTILISATEUR
    // =============================
    
    const patientAvatar = document.getElementById('patientAvatar');
    if (patientAvatar) {
        patientAvatar.addEventListener('click', function() {
            showProfileModal();
        });
    }
    
    function showProfileModal() {
        const modalContent = `
            <h2><i class="fas fa-user"></i> Mon Profil</h2>
            <div class="profile-info">
                <div class="profile-avatar-large">
                    <span>AO</span>
                </div>
                <div class="profile-details">
                    <h3>Allegra OKEMBA</h3>
                    <p class="profile-id">ID: PAT-2025-OKEMBA</p>
                    <div class="profile-stats">
                        <div class="profile-stat">
                            <div class="stat-value">3</div>
                            <div class="stat-label">RDV cette année</div>
                        </div>
                        <div class="profile-stat">
                            <div class="stat-value">7</div>
                            <div class="stat-label">Documents</div>
                        </div>
                        <div class="profile-stat">
                            <div class="stat-value">A+</div>
                            <div class="stat-label">Groupe sanguin</div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="profile-actions">
                <button class="btn-primary" onclick="window.location.href='profil.html'">
                    <i class="fas fa-edit"></i> Modifier le profil
                </button>
                <button class="btn-secondary" onclick="fermerModal()">
                    <i class="fas fa-times"></i> Fermer
                </button>
            </div>
        `;
        
        if (typeof showModal === 'function') {
            showModal(modalContent);
        }
    }
    
    // =============================
    // 3. GESTION DE LA NAVIGATION
    // =============================
    
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            if (this.getAttribute('href') === 'Connexion.html') {
                e.preventDefault();
                confirmLogout();
            }
        });
    });
    
    function confirmLogout() {
        const modalContent = `
            <h2><i class="fas fa-sign-out-alt"></i> Déconnexion</h2>
            <div class="logout-confirmation">
                <p>Êtes-vous sûr de vouloir vous déconnecter ?</p>
                <div class="logout-actions">
                    <button class="btn-secondary" onclick="fermerModal()">
                        <i class="fas fa-times"></i> Annuler
                    </button>
                    <button class="btn-primary" onclick="performLogout()">
                        <i class="fas fa-sign-out-alt"></i> Se déconnecter
                    </button>
                </div>
            </div>
        `;
        
        if (typeof showModal === 'function') {
            showModal(modalContent);
        }
    }
    
    window.performLogout = function() {
        // Simulation de déconnexion
        if (typeof showNotification === 'function') {
            showNotification('Déconnexion réussie', 'success');
        }
        
        setTimeout(() => {
            window.location.href = 'Connexion.html';
        }, 1500);
        
        fermerModal();
    };
    
    // =============================
    // 4. FONCTIONS UTILITAIRES POUR LE HEADER
    // =============================
    
    function fermerModal() {
        // Cette fonction est définie dans le script principal
        if (typeof fermerModal === 'function') {
            window.fermerModal();
        }
    }
    
    // =============================
    // 5. AJOUT DE STYLES POUR LE HEADER
    // =============================
    
    const headerStyles = document.createElement('style');
    headerStyles.textContent = `
        .notifications-list {
            max-height: 400px;
            overflow-y: auto;
            margin: 20px 0;
        }
        
        .notification-item {
            display: flex;
            gap: 15px;
            padding: 15px;
            border-radius: 8px;
            margin-bottom: 10px;
            background: var(--light-bg);
            border-left: 4px solid transparent;
            transition: all 0.3s;
        }
        
        .notification-item.unread {
            background: rgba(52, 152, 219, 0.1);
            border-left-color: var(--secondary);
        }
        
        .notification-icon {
            color: var(--secondary);
            font-size: 1.2rem;
            min-width: 40px;
        }
        
        .notification-content {
            flex: 1;
        }
        
        .notification-content h4 {
            margin: 0 0 5px 0;
            color: var(--primary-dark);
            font-size: 1rem;
        }
        
        .notification-content p {
            margin: 0 0 5px 0;
            color: var(--text-dark);
            font-size: 0.9rem;
        }
        
        .notification-content small {
            color: var(--text-light);
            font-size: 0.8rem;
        }
        
        .notifications-actions {
            display: flex;
            gap: 15px;
            margin-top: 20px;
        }
        
        .profile-info {
            display: flex;
            gap: 25px;
            align-items: center;
            margin: 20px 0;
        }
        
        .profile-avatar-large {
            width: 100px;
            height: 100px;
            background: linear-gradient(135deg, var(--primary), var(--secondary));
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 2.5rem;
            color: white;
            font-weight: 700;
        }
        
        .profile-details h3 {
            margin: 0 0 5px 0;
            color: var(--primary-dark);
        }
        
        .profile-id {
            color: var(--text-light);
            margin-bottom: 20px;
        }
        
        .profile-stats {
            display: flex;
            gap: 20px;
        }
        
        .profile-stat {
            text-align: center;
            background: var(--light-bg);
            padding: 10px 15px;
            border-radius: 8px;
        }
        
        .profile-stat .stat-value {
            font-size: 1.2rem;
            font-weight: 700;
            color: var(--primary);
            margin-bottom: 3px;
        }
        
        .profile-stat .stat-label {
            font-size: 0.8rem;
            color: var(--text-light);
        }
        
        .profile-actions {
            display: flex;
            gap: 15px;
            margin-top: 30px;
        }
        
        .logout-confirmation {
            text-align: center;
            padding: 20px 0;
        }
        
        .logout-confirmation p {
            margin-bottom: 30px;
            font-size: 1.1rem;
            color: var(--text-dark);
        }
        
        .logout-actions {
            display: flex;
            gap: 15px;
            justify-content: center;
        }
    `;
    document.head.appendChild(headerStyles);
});