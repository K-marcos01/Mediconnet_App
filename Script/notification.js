// ===== NOTIFICATIONS SIMPLES ===== 
let notifications = [ 
    { id: 1, title: "Rappel RDV", message: "Consultation avec Dr. Martin demain à 14h30", time: "Il y a 2 heures", read: false }, 
    { id: 2, title: "Résultats disponibles", message: "Vos analyses sanguines sont prêtes", time: "Hier, 16:45", read: false } 
]; 

// Fonction PRINCIPALE pour ouvrir/fermer 
function toggleNotifications(event) { 
    if (event) { 
        event.stopPropagation(); // IMPORTANT : empêche la propagation 
    } 
    const popup = document.getElementById('notificationsPopup'); 
    const overlay = document.getElementById('notificationsOverlay'); 
    if (!popup) { 
        console.error('Popup non trouvé ! Avez-vous ajouté le HTML ?'); 
        return; 
    } 
    if (popup.classList.contains('show')) { 
        closeNotifications(); 
    } else { 
        popup.classList.add('show'); 
        overlay.classList.add('show'); 
        renderNotifications(); 
    } 
} 

// Fonction pour fermer 
function closeNotifications() { 
    const popup = document.getElementById('notificationsPopup'); 
    const overlay = document.getElementById('notificationsOverlay'); 
    if (popup) popup.classList.remove('show'); 
    if (overlay) overlay.classList.remove('show'); 
} 

// Afficher les notifications 
function renderNotifications() { 
    const container = document.getElementById('notificationsList'); 
    if (!container) return; 
    if (notifications.length === 0) { 
        container.innerHTML = '<p style="text-align:center;color:#999;">Aucune notification</p>'; 
        return; 
    } 
    const html = notifications.map(notif => ` 
        <div class="notification-item" onclick="markAsRead(${notif.id})" style="background:${notif.read ? '#f5f5f5' : '#e8f4fd'}; padding:10px; margin-bottom:8px; border-radius:5px; border-left:3px solid ${notif.read ? '#ddd' : '#3498db'}; cursor:pointer;"> 
            <strong>${notif.title}</strong> 
            <p style="margin:5px 0;color:#666;font-size:14px;">${notif.message}</p> 
            <small style="color:#999;">${notif.time}</small> 
        </div> 
    `).join(''); 
    container.innerHTML = html; 
} 

// Marquer comme lu 
function markAsRead(id) { 
    const notif = notifications.find(n => n.id === id); 
    if (notif && !notif.read) { 
        notif.read = true; 
        updateNotificationCount(); 
        renderNotifications(); 
    } 
} 

// Marquer toutes comme lues 
function markAllAsRead() { 
    notifications.forEach(notif => notif.read = true); 
    updateNotificationCount(); 
    renderNotifications(); 
} 

// Mettre à jour le compteur 
function updateNotificationCount() { 
    const unreadCount = notifications.filter(n => !n.read).length; 
    const countElement = document.getElementById('notificationCount'); 
    if (countElement) { 
        countElement.textContent = unreadCount; 
        countElement.style.display = unreadCount > 0 ? 'flex' : 'none'; 
    } 
} 

// Ajouter une notification (pour tests) 
function addNotification(title, message) { 
    notifications.unshift({ id: Date.now(), title: title, message: message, time: 'À l\'instant', read: false }); 
    updateNotificationCount(); 
    renderNotifications(); 
} 

// ===== INITIALISATION ===== 
document.addEventListener('DOMContentLoaded', function() { 
    console.log('Initialisation des notifications...'); 
    // 1. S'assurer que le bouton fonctionne 
    const btn = document.getElementById('notificationsBtn'); 
    if (btn) { 
        console.log('Bouton trouvé, ajout de l\'événement'); 
        btn.addEventListener('click', toggleNotifications); 
    } else { 
        console.error('Bouton notificationsBtn non trouvé dans le header !'); 
    } 
    // 2. Mettre à jour le compteur 
    updateNotificationCount(); 
    // 3. Fermer avec ESC 
    document.addEventListener('keydown', function(e) { 
        if (e.key === 'Escape') closeNotifications(); 
    }); 
    // 4. Fermer en cliquant sur l'overlay 
    const overlay = document.getElementById('notificationsOverlay'); 
    if (overlay) { 
        overlay.addEventListener('click', closeNotifications); 
    } 
    // 5. Tester : ajouter un message d'erreur si popup manquant 
    if (!document.getElementById('notificationsPopup')) { 
        console.error('❌ ERREUR : Le popup HTML n\'est pas dans la page !'); 
        alert('Erreur : Le popup des notifications n\'est pas installé. Ajoutez le HTML avant </body>'); 
    } 
}); 

// Exposer les fonctions globalement 
window.toggleNotifications = toggleNotifications; 
window.closeNotifications = closeNotifications; 
window.markAllAsRead = markAllAsRead; 
window.addNotification = addNotification;