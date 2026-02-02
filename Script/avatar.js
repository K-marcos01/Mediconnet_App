/**
 * Gestionnaire global pour l'avatar de profil
 * S'assure que le clic sur l'avatar redirige toujours vers le profil
 */

(function() {
    'use strict';
    
    // Fonction pour rediriger vers le profil
    function redirectToProfile(e) {
        // Si ce n'est pas un clic gauche ou avec une touche spéciale, on ne fait rien
        if (e.button !== 0 || e.ctrlKey || e.shiftKey || e.altKey || e.metaKey) {
            return;
        }
        
        // Annuler l'événement par défaut
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
        
        // Fermer tous les popups/modal éventuels
        closeAllPopups();
        
        // Rediriger vers le profil
        window.location.href = 'profil-patient.html';
        
        return false;
    }
    
    // Fonction pour fermer tous les popups
    function closeAllPopups() {
        // Sélecteurs de popups courants
        const popupSelectors = [
            '.popup', '.modal', '.modal-overlay', 
            '.modal-backdrop', '[class*="popup"]', '[class*="modal"]',
            '.overlay', '.dialog', '.lightbox'
        ];
        
        popupSelectors.forEach(selector => {
            document.querySelectorAll(selector).forEach(element => {
                element.style.display = 'none';
                element.classList.remove('active', 'show', 'open');
            });
        });
        
        // Fermer aussi les éléments avec display: block ou flex
        document.querySelectorAll('*').forEach(element => {
            const style = window.getComputedStyle(element);
            if (style.position === 'fixed' || style.position === 'absolute') {
                if (style.display !== 'none' && 
                    (element.className.includes('popup') || 
                     element.className.includes('modal') ||
                     element.hasAttribute('data-modal'))) {
                    element.style.display = 'none';
                }
            }
        });
    }
    
    // Fonction pour initialiser l'avatar
    function initAvatar() {
        const avatar = document.querySelector('.patient-avatar');
        
        if (!avatar) return;
        
        // S'assurer que c'est un lien
        if (avatar.tagName !== 'A') {
            const link = document.createElement('a');
            link.href = 'profil-patient.html';
            link.className = 'patient-avatar';
            link.innerHTML = avatar.innerHTML;
            
            // Remplacer l'ancien avatar par le nouveau lien
            avatar.parentNode.replaceChild(link, avatar);
            
            // Ajouter l'écouteur sur le nouveau lien
            link.addEventListener('click', redirectToProfile, true);
        } else {
            // S'assurer que le href est correct
            avatar.href = 'profil-patient.html';
            
            // Ajouter/remplacer l'écouteur
            avatar.removeEventListener('click', redirectToProfile, true);
            avatar.addEventListener('click', redirectToProfile, true);
        }
        
        // Ajouter un attribut pour identifier l'avatar
        avatar.setAttribute('data-avatar-redirect', 'true');
    }
    
    // Initialiser au chargement
    document.addEventListener('DOMContentLoaded', initAvatar);
    
    // Ré-initialiser si le DOM change (pour les SPA)
    if (typeof MutationObserver !== 'undefined') {
        const observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                if (mutation.addedNodes.length) {
                    const avatar = document.querySelector('.patient-avatar:not([data-avatar-redirect])');
                    if (avatar) {
                        setTimeout(initAvatar, 100);
                    }
                }
            });
        });
        
        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    }
})();