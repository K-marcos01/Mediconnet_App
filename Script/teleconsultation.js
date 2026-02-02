// ===============================================
// 1. DONNÉES DES RÉSULTATS (Source de vérité)
// Chaque objet doit contenir la spécialité pour le filtrage
// ===============================================
const ALL_RESULTS = [
    // --- Liste des Médecins Généralistes / Pharmacies, dentiste (pour test) ---
    { id: 1, name: "Dr. Lamy (Généraliste)", specialty: "Médecin généraliste", status: "Ouvert | Ferme à 19:00", closed: false, address: "12 Rue de la Santé, P-N", phone: "05-123-45-67"},
    { id: 2, name: "Pharmacie Saint Pierre", specialty: "Pharmacie", status: "Ouvert | Ferme à 22:00", closed: false, address: "187 Avenue Taty Loutard", phone: "06-243-23-83"},
    { id: 3, name: "Pharmacie Chateau d'eau", specialty: "Pharmacie", status: "Ouvert | Ferme à 00:00", closed: false, address: " Avenue Marien Ngouabi", phone: "05-732-65-28"},
    { id: 4, name: "Pharmacie Foyer Tie-Tie	2", specialty: "Pharmacie", status: "Ouvert | Ferme à 23:00", closed: false, address: " Avenue de independance", phone: "05-374-76-72"},
    { id: 5, name: "Pharmacie Saint Pierre", specialty: "Pharmacie", status: "Ouvert | Ferme à 22:00", closed: false, address: "187 Avenue Taty Loutard", phone: "04-276-54-29"},
    { id: 6, name: "Pharmacie Nuptia", specialty: "Pharmacie", status: "Ouvert | Ferme à 22:00", closed: false, address: "Avenue de la révolution, Grand-marché,Pointe-Noire", phone: "05-374-76-72"},
    { id: 7, name: "Dr. Dubois (Généraliste)", specialty: "Médecin généraliste", status: "Fermé | Ouvre à 09:00", closed: true, address: "45 Rue de la Paix, P-N", phone: "05-777-77-77"},
    { id: 8, name: "Dr. Pandy  (Généraliste)", specialty: "Médecin généraliste", statuts: "ouvert | Fermé à 20:00", closed: false, address: "137 Av.Dr Denis loemba, P-N", phone:"06-453-34-89"},
    { id: 9, name: "Dr. Winner  (Généraliste)", specialty: "Médecin généraliste", statuts: "ouvert | Fermé à 20:00", closed: false, address: "1212 Av. charles de Gaulles, P-N", phone:"06-999-99-99"},
    { id: 10, name: "Dr. Stevens (Généraliste)", specialty: "Médecin généraliste", statuts: "ouvert | Fermé à 20:00", closed: false, address: "54 boulevard du général de Gaulle, P-N", phone:"06-987-65-66"},
    { id: 11, name: "Dr. Allegra (dentiste)", specialty: "dentiste", statuts: "ouvert | Fermé à 20:00", closed: false, address: "Bd du Peuple, P-N", phone:"06-000-89-56"},
    { id: 12, name: "Dr. DAREL (dentiste)", specialty: "dentiste", statuts: "ouvert | Fermé à 22:00", closed: false, address: "Av.Fayette Tchitembo, P-N", phone:"06-000-00-00"},
    { id: 14, name: "Dr. MARCO (dentiste)", specialty: "dentiste", statuts: "ouvert | Fermé à 20:00", closed: false, address: "venue de la révolution, Grand-marché, P-N", phone:"06-111-11-11"},
    { id: 15, name: "Dr. MOUHAMED (dentiste)", specialty: "dentiste", statuts: "ouvert | Fermé à 20:00", closed: false, address: "187 Avenue Taty Loutard, Grand-marché, P-N", phone:"06-155-33-22"},
    
    
    // --- Liste des Ophtalmologistes, dermatologiste (Ceci est la liste que vous voulez voir apparaître) ---
    { id: 16, name: "Dr. Marie Dupont (Ophtalmologiste)", specialty: "Ophtalmologiste", status: "Ouvert | Ferme à 18:00", closed: false, address: "12 Av. Charles de Gaulle, P-N", phone: "01-987-65-43"},
    { id: 17, name: "Dr. marcelo", specialty: "Ophtalmologiste", status: "Ouvert | Ferme à 19:00", closed: false, address: "Centre Ville, P-N", phone: "05-555-55-55"},
    { id: 18, name: "Dr. ronaldo", specialty: "Ophtalmologiste", status: "Fermé | Ouvre à 08:30", closed: true, address: "Bd du Peuple, P-N", phone: "05-444-44-44"},
    { id: 19, name: "Dr. messi", specialty: "Ophtalmologiste", status: "Fermé | OuvreT à 07:30", closed: true, address: "Av.Fayette Tchitembo, P-N", phone: "05-339-19-00"},
    { id: 20, name: "Dr. alar", specialty: "Ophtalmologiste", status: " OuvreT 24h24", closed: true, address: "2 rue owando, P-N", phone: "06-659-22-22"},
    { id: 21, name: "Dr syvie Kengue PN", specialty: "dermatologiste", status: " OuvreT 24h24", closed: false, address: "de la mangue, P-N", phone: "06-659-00-88"},
    { id: 22, name: "Dr. ZOBA", specialty: "dermatologiste", status: "Fermé | Ouvre à 08:30", closed: false, address: "2 rue owando, P-N", phone: "05-050-23-00"},
    { id: 23, name: "Dr. ELOGA", specialty: "dermatologiste", status: "Fermé | Ouvre à 08:30", closed: false, address: "Av djouari, P-N", phone: "06-807-30-25" },

    // Ajoutez plus de résultats ici, en changeant la spécialité (specialty)
];
// ===============================================
// 2. FONCTION DE MISE À JOUR DES RÉSULTATS
// ===============================================

/**
 * Filtre les résultats et génère les cartes HTML pour la spécialité donnée.
 * @param {string} selectedSpecialty La spécialité à afficher.
 */
function updateResults(selectedSpecialty) {
    const resultsList = document.querySelector('.results-list');
    
    // Vider la liste actuelle
    resultsList.innerHTML = ''; 

    // 1. Filtrer les données basées sur la spécialité
    const filteredResults = ALL_RESULTS.filter(item => 
        item.specialty === selectedSpecialty
    );

    // 2. Gérer le cas où aucun résultat n'est trouvé
    if (filteredResults.length === 0) {
        resultsList.innerHTML = '<p class="no-results">Aucun professionnel trouvé pour **' + selectedSpecialty + '**.</p>';
        return;
    }

    // 3. Générer le HTML pour chaque résultat filtré
    filteredResults.forEach(item => {
        // Déterminer l'état (Ouvert/Fermé) pour le style
        const isClosed = item.closed;
        const statusClass = isClosed ? 'status-closed' : 'status-open';
        const statusIcon = isClosed ? 'fa-times-circle' : 'fa-check-circle';
        
        // Le HTML de la carte de résultat (injection des données)
        const cardHTML = `
            <div class="result-card ${isClosed ? 'closed-card' : ''}" data-id="${item.id}">
                <h3>${item.name}</h3>
                <div class="status ${statusClass}">
                    <i class="fas ${statusIcon}"></i>
                    <span>${item.status}</span>
                </div>
                <p class="address">${item.address}</p>
                <div class="info-link">
                    <i class="fas fa-info-circle"></i>
                    <span>Plus d'informations</span>
                </div>
                
                <div class="actions">
                    <button class="action-button call-button">
                        <i class="fas fa-phone"></i> ${item.phone}
                    </button>
                </div>
                <button class="appointment-button">
                    <i class="fas fa-calendar-check"></i> Rendez-vous
                </button>
            </div>
        `;
        resultsList.innerHTML += cardHTML;
    });
}
// ===============================================
// 3. GESTION DES ÉVÉNEMENTS (Démarrage de l'application)
// ===============================================
document.addEventListener('DOMContentLoaded', function() {
    // 1. Gestion du Menu Burger (Laissez votre code ici)
    // ...

    // 2. Gestion des Filtres (Le code clé pour donner vie aux boutons)
    const filterInputs = document.querySelectorAll('.filter-pills input[type="checkbox"]');

    filterInputs.forEach(input => {
        input.addEventListener('change', function() {
            const currentLabel = this.closest('.pill-button');
            const specialty = this.getAttribute('data-specialty'); 
            
            // Logique de sélection unique
            filterInputs.forEach(inp => {
                const parentLabel = inp.closest('.pill-button');
                if (inp !== this) {
                    inp.checked = false;
                    parentLabel.classList.remove('active');
                }
            });

            // Gérer l'état actif et appeler le filtrage
            if (this.checked) {
                currentLabel.classList.add('active');
                updateResults(specialty); // Appelle la fonction de mise à jour !
            } else {
                // Maintenir le dernier actif (empêche un état sans filtre)
                this.checked = true;
                currentLabel.classList.add('active');
            }
        });
    });
    
    // 4. Lancement initial au chargement de la page
    const initialActiveInput = document.querySelector('.filter-pills input[type="checkbox"]:checked');
    if (initialActiveInput) {
        const initialSpecialty = initialActiveInput.getAttribute('data-specialty');
        initialActiveInput.closest('.pill-button').classList.add('active');
        // Affiche la liste initiale
        updateResults(initialSpecialty); 
    } else {
        // Si aucun n'est sélectionné par défaut, affichez le premier
        if (filterInputs.length > 0) {
            filterInputs[0].checked = true;
            filterInputs[0].closest('.pill-button').classList.add('active');
            updateResults(filterInputs[0].getAttribute('data-specialty'));
        }
    }
});

// ===============================================
// MESSAGERIE INTERACTIVE AVEC SAUVEGARDE
// ===============================================

document.addEventListener('DOMContentLoaded', () => {

    const STORAGE_KEY = 'teleconsultation_messages';

    const viewer = document.querySelector('.message-viewer');
    if (!viewer) return;

    const conversation = viewer.querySelector('.conversation');
    const replyInput = viewer.querySelector('.reply-input');
    const replyBtn = viewer.querySelector('.reply-btn');
    const closeBtn = viewer.querySelector('.close-viewer');
    const deleteBtn = viewer.querySelector('.delete-btn');

    let activeMessageId = null;

    const loadData = () =>
        JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};

    const saveData = data =>
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));

    let messagesData = loadData();

    document.querySelectorAll('.message-item').forEach(msg => {
        const id = msg.dataset.id;
        if (messagesData[id]?.read) {
            msg.classList.remove('unread');
        }

        msg.addEventListener('dblclick', () => {

            activeMessageId = id;
            conversation.innerHTML = '';

            if (!messagesData[id]) {
                messagesData[id] = {
                    read: true,
                   conversation: [{
    type: 'received',
    text: msg.querySelector('.message-text')?.textContent || ''
}]

                };
            }

            messagesData[id].read = true;
            saveData(messagesData);
            msg.classList.remove('unread');

            messagesData[id].conversation.forEach(m => {
                const div = document.createElement('div');
                div.className = `chat-message ${m.type}`;
                div.textContent = m.text;
                conversation.appendChild(div);
            });

            viewer.classList.remove('hidden');
            conversation.scrollTop = conversation.scrollHeight;
        });
    });

    replyBtn.addEventListener('click', () => {
        const text = replyInput.value.trim();
        if (!text || !activeMessageId) return;

        const msg = { type: 'sent', text };
        messagesData[activeMessageId].conversation.push(msg);
        saveData(messagesData);

        const div = document.createElement('div');
        div.className = 'chat-message sent';
        div.textContent = text;
        conversation.appendChild(div);

        replyInput.value = '';
        conversation.scrollTop = conversation.scrollHeight;
    });

    closeBtn.addEventListener('click', () => {
        viewer.classList.add('hidden');
        conversation.innerHTML = '';
        replyInput.value = '';
        activeMessageId = null;
    });

    deleteBtn.addEventListener('click', () => {
        if (!activeMessageId) return;

        delete messagesData[activeMessageId];
        saveData(messagesData);

        document
          .querySelector(`.message-item[data-id="${activeMessageId}"]`)
          ?.remove();

        viewer.classList.add('hidden');
        activeMessageId = null;
    });
});