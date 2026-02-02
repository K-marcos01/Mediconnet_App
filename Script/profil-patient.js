// Gestion des formulaires d'édition
document.addEventListener('DOMContentLoaded', function() {
    // Édition des informations personnelles
    const editPersonalBtn = document.getElementById('editPersonalInfo');
    const cancelPersonalBtn = document.getElementById('cancelPersonalEdit');
    const personalInfoDisplay = document.getElementById('personalInfoDisplay');
    const personalInfoForm = document.getElementById('personalInfoForm');
    
    if (editPersonalBtn) {
        editPersonalBtn.addEventListener('click', function() {
            personalInfoDisplay.style.display = 'none';
            personalInfoForm.style.display = 'block';
            editPersonalBtn.style.display = 'none';
        });
    }
    
    if (cancelPersonalBtn) {
        cancelPersonalBtn.addEventListener('click', function() {
            personalInfoDisplay.style.display = 'block';
            personalInfoForm.style.display = 'none';
            editPersonalBtn.style.display = 'flex';
        });
    }
    
    // Édition des coordonnées
    const editContactBtn = document.getElementById('editContactInfo');
    const cancelContactBtn = document.getElementById('cancelContactEdit');
    const contactInfoDisplay = document.getElementById('contactInfoDisplay');
    const contactInfoForm = document.getElementById('contactInfoForm');
    
    if (editContactBtn) {
        editContactBtn.addEventListener('click', function() {
            contactInfoDisplay.style.display = 'none';
            contactInfoForm.style.display = 'block';
            editContactBtn.style.display = 'none';
        });
    }
    
    if (cancelContactBtn) {
        cancelContactBtn.addEventListener('click', function() {
            contactInfoDisplay.style.display = 'block';
            contactInfoForm.style.display = 'none';
            editContactBtn.style.display = 'flex';
        });
    }
    
    // Soumission des formulaires
    if (personalInfoForm) {
        personalInfoForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Récupérer les valeurs
            const firstName = document.getElementById('firstName').value;
            const lastName = document.getElementById('lastName').value;
            const birthDate = document.getElementById('birthDate').value;
            const gender = document.getElementById('gender').value;
            const socialSecurity = document.getElementById('socialSecurity').value;
            const bloodType = document.getElementById('bloodType').value;
            
            // Mettre à jour l'affichage
            document.getElementById('displayFullName').textContent = `${firstName} ${lastName}`;
            document.getElementById('displayBirthDate').textContent = formatDate(birthDate);
            document.getElementById('displayGender').textContent = getGenderText(gender);
            document.getElementById('displaySocialSecurity').textContent = socialSecurity;
            document.getElementById('displayBloodType').textContent = bloodType;
            
            // Mettre à jour le header
            document.getElementById('patientHeaderName').textContent = `${firstName} ${lastName}`;
            
            // Afficher message de succès
            showNotification('Informations personnelles mises à jour avec succès !', 'success');
            
            // Revenir à l'affichage
            personalInfoDisplay.style.display = 'block';
            personalInfoForm.style.display = 'none';
            editPersonalBtn.style.display = 'flex';
        });
    }
    
    if (contactInfoForm) {
        contactInfoForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Récupérer les valeurs
            const email = document.getElementById('email').value;
            const phone = document.getElementById('phone').value;
            const address = document.getElementById('address').value;
            const city = document.getElementById('city').value;
            const postalCode = document.getElementById('postalCode').value;
            
            // Mettre à jour l'affichage
            document.getElementById('displayEmail').textContent = email;
            document.getElementById('displayPhone').textContent = phone;
            document.getElementById('displayAddress').textContent = address;
            document.getElementById('displayCity').textContent = city;
            document.getElementById('displayPostalCode').textContent = postalCode;
            
            // Afficher message de succès
            showNotification('Coordonnées mises à jour avec succès !', 'success');
            
            // Revenir à l'affichage
            contactInfoDisplay.style.display = 'block';
            contactInfoForm.style.display = 'none';
            editContactBtn.style.display = 'flex';
        });
    }
    
    // Gestion de la photo de profil
    const changePhotoBtn = document.getElementById('changePhotoBtn');
    const removePhotoBtn = document.getElementById('removePhotoBtn');
    const photoUpload = document.getElementById('photoUpload');
    const profilePhoto = document.getElementById('profilePhoto');
    
    if (changePhotoBtn) {
        changePhotoBtn.addEventListener('click', function() {
            photoUpload.click();
        });
    }
    
    if (photoUpload) {
        photoUpload.addEventListener('change', function(e) {
            const file = e.target.files[0];
            if (file) {
                if (file.size > 5 * 1024 * 1024) { // 5MB max
                    showNotification('La photo est trop volumineuse (max 5MB)', 'error');
                    return;
                }
                
                if (!file.type.startsWith('image/')) {
                    showNotification('Veuillez sélectionner une image', 'error');
                    return;
                }
                
                const reader = new FileReader();
                reader.onload = function(event) {
                    // Créer l'image
                    const img = document.createElement('img');
                    img.src = event.target.result;
                    img.alt = 'Photo de profil';
                    
                    // Vider le contenu et ajouter l'image
                    profilePhoto.innerHTML = '';
                    profilePhoto.appendChild(img);
                    
                    showNotification('Photo de profil mise à jour avec succès !', 'success');
                };
                reader.readAsDataURL(file);
            }
        });
    }
    
    if (removePhotoBtn) {
        removePhotoBtn.addEventListener('click', function() {
            if (confirm('Voulez-vous vraiment supprimer votre photo de profil ?')) {
                profilePhoto.innerHTML = '<i class="fas fa-user"></i>';
                showNotification('Photo de profil supprimée', 'info');
            }
        });
    }
    
    // Gestion du changement de mot de passe
    const changePasswordBtn = document.getElementById('changePasswordBtn');
    const passwordModal = document.getElementById('passwordModal');
    const closePasswordModal = document.getElementById('closePasswordModal');
    const cancelPasswordChange = document.getElementById('cancelPasswordChange');
    const passwordForm = document.getElementById('passwordForm');
    const newPasswordInput = document.getElementById('newPassword');
    const strengthBar = document.querySelector('.strength-bar');
    const strengthText = document.querySelector('.strength-text');
    
    if (changePasswordBtn) {
        changePasswordBtn.addEventListener('click', function() {
            passwordModal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        });
    }
    
    if (closePasswordModal) {
        closePasswordModal.addEventListener('click', closeModal);
    }
    
    if (cancelPasswordChange) {
        cancelPasswordChange.addEventListener('click', closeModal);
    }
    
    function closeModal() {
        passwordModal.style.display = 'none';
        document.body.style.overflow = 'auto';
        if (passwordForm) passwordForm.reset();
    }
    
    // Fermer modal en cliquant en dehors
    passwordModal.addEventListener('click', function(e) {
        if (e.target === passwordModal) {
            closeModal();
        }
    });
    
    // Vérification de la force du mot de passe
    if (newPasswordInput && strengthBar && strengthText) {
        newPasswordInput.addEventListener('input', function() {
            const password = newPasswordInput.value;
            const strength = checkPasswordStrength(password);
            
            // Mettre à jour la barre et le texte
            strengthBar.style.width = `${strength.percentage}%`;
            strengthBar.style.backgroundColor = strength.color;
            strengthText.textContent = `Force : ${strength.text}`;
        });
    }
    
    if (passwordForm) {
        passwordForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const currentPassword = document.getElementById('currentPassword').value;
            const newPassword = document.getElementById('newPassword').value;
            const confirmPassword = document.getElementById('confirmPassword').value;
            
            // Validation basique
            if (newPassword !== confirmPassword) {
                showNotification('Les mots de passe ne correspondent pas', 'error');
                return;
            }
            
            if (newPassword.length < 8) {
                showNotification('Le mot de passe doit contenir au moins 8 caractères', 'error');
                return;
            }
            
            // Simulation de changement de mot de passe
            // Dans une vraie application, vous enverriez cela au serveur
            
            showNotification('Mot de passe changé avec succès !', 'success');
            closeModal();
        });
    }
    
    // Gestion de la suppression du compte
    const deleteAccountBtn = document.getElementById('deleteAccountBtn');
    if (deleteAccountBtn) {
        deleteAccountBtn.addEventListener('click', function() {
            if (confirm('Êtes-vous sûr de vouloir supprimer votre compte ? Cette action est irréversible.')) {
                if (prompt('Tapez "SUPPRIMER" pour confirmer la suppression :') === 'SUPPRIMER') {
                    showNotification('Votre compte sera supprimé dans 24 heures. Un email de confirmation vous a été envoyé.', 'warning');
                    // Ici, vous enverriez la demande au serveur
                } else {
                    showNotification('Suppression annulée', 'info');
                }
            }
        });
    }
    
    // Mettre à jour les préférences en temps réel
    const twoFactorAuth = document.getElementById('twoFactorAuth');
    const emailNotifications = document.getElementById('emailNotifications');
    const smsNotifications = document.getElementById('smsNotifications');
    const languageSelect = document.getElementById('languageSelect');
    
    [twoFactorAuth, emailNotifications, smsNotifications].forEach(toggle => {
        if (toggle) {
            toggle.addEventListener('change', function() {
                const status = this.checked ? 'activées' : 'désactivées';
                const setting = this.id === 'twoFactorAuth' ? 'Authentification à deux facteurs' :
                              this.id === 'emailNotifications' ? 'Notifications email' : 'Notifications SMS';
                showNotification(`${setting} ${status}`, 'info');
            });
        }
    });
    
    if (languageSelect) {
        languageSelect.addEventListener('change', function() {
            showNotification(`Langue changée en ${this.options[this.selectedIndex].text}`, 'info');
        });
    }
    
    // Fonctions utilitaires
    function formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('fr-FR');
    }
    
    function getGenderText(genderValue) {
        const genders = {
            'female': 'Féminin',
            'male': 'Masculin',
            'other': 'Autre'
        };
        return genders[genderValue] || 'Non spécifié';
    }
    
    function checkPasswordStrength(password) {
        let strength = 0;
        
        if (password.length >= 8) strength++;
        if (/[A-Z]/.test(password)) strength++;
        if (/[0-9]/.test(password)) strength++;
        if (/[^A-Za-z0-9]/.test(password)) strength++;
        
        const levels = [
            { text: 'Très faible', color: '#e74c3c', percentage: 25 },
            { text: 'Faible', color: '#e67e22', percentage: 50 },
            { text: 'Moyen', color: '#f1c40f', percentage: 75 },
            { text: 'Fort', color: '#2ecc71', percentage: 100 }
        ];
        
        return levels[strength - 1] || levels[0];
    }
    
    function showNotification(message, type = 'info') {
        // Créer la notification
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <span>${message}</span>
            <button class="notification-close">&times;</button>
        `;
        
        // Style de la notification
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            padding: 15px 20px;
            border-radius: 8px;
            color: white;
            font-weight: 600;
            z-index: 10000;
            display: flex;
            align-items: center;
            gap: 15px;
            min-width: 300px;
            max-width: 400px;
            animation: slideInRight 0.3s ease;
            box-shadow: 0 4px 15px rgba(0,0,0,0.2);
        `;
        
        // Couleurs selon le type
        const colors = {
            success: '#2ecc71',
            error: '#e74c3c',
            warning: '#f39c12',
            info: '#3498db'
        };
        
        notification.style.backgroundColor = colors[type] || colors.info;
        
        // Bouton de fermeture
        const closeBtn = notification.querySelector('.notification-close');
        closeBtn.style.cssText = `
            background: none;
            border: none;
            color: white;
            font-size: 1.5rem;
            cursor: pointer;
            padding: 0;
            line-height: 1;
        `;
        
        closeBtn.addEventListener('click', function() {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        });
        
        // Ajouter au body
        document.body.appendChild(notification);
        
        // Supprimer automatiquement après 5 secondes
        setTimeout(() => {
            if (notification.parentNode) {
                notification.style.animation = 'slideOutRight 0.3s ease';
                setTimeout(() => {
                    if (notification.parentNode) {
                        notification.parentNode.removeChild(notification);
                    }
                }, 300);
            }
        }, 5000);
        
        // Ajouter les animations CSS si elles n'existent pas
        if (!document.getElementById('notification-styles')) {
            const style = document.createElement('style');
            style.id = 'notification-styles';
            style.textContent = `
                @keyframes slideInRight {
                    from { transform: translateX(100%); opacity: 0; }
                    to { transform: translateX(0); opacity: 1; }
                }
                @keyframes slideOutRight {
                    from { transform: translateX(0); opacity: 1; }
                    to { transform: translateX(100%); opacity: 0; }
                }
            `;
            document.head.appendChild(style);
        }
    }
});