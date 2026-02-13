<!DOCTYPE html>
<html lang="fr">
<head>
  <!-- Métadonnées de la page -->
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Téléconsultation</title>

  <!-- Feuilles de style : spécifique à la téléconsultation puis styles globaux et notifications -->
  <link rel="stylesheet" href="../Css/teleconsultation.css">
  <link rel="stylesheet" href="../Css/Style_Acceuil.css">
  <link rel="stylesheet" href="../Css/notification.css">
  <!-- Icônes Font Awesome -->
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
  <!-- Feuille de style Leaflet pour la carte (si utilisée) -->
  <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/SVSLyojsaXkU7Z8L4=" crossorigin=""/>
</head>
<body>
  <!-- En-tête principal pour l'utilisateur patient -->
<?php include '../Include/Header_patient.html';?>

  <!-- Contenu principal de la page -->
  <div class="main-content">
    <div class="container">
      <h1 class="title">Téléconsultation médicale</h1>
      <p class="subtitle">Consultez vos médecins à distance</p>

      <!-- Grille d'actions rapides -->
      <div class="grid">
        <!-- Carte pour tester le matériel (redirection vers une page de test) -->
        <div class="card-start">
          <div class="icon">📷</div>
          <h2>Tester mon matériel</h2>
          <p>Vérifiez votre caméra et micro.</p>
          <a href="../Html/tester-materiel.html" class="btn">Tester</a>
        </div>

        <!-- Carte paramètres -->
        <div class="card-start">
          <div class="icon purple">⚙️</div>
          <h2>Paramètres</h2>
          <p>Configurez vos préférences.</p>
          <a href="../Html/parametres.html" class="btn">Configurer</a>
        </div>

        <!-- Contacter un médecin -->
        <div class="card-plan">
          <h2>Contacter un Médecin</h2>
          <p>Débutez votre téléconsultation avec votre Médecin</p>
          <a href="../Html/medecins.html" class="btn">Voir les médecins</a>
        </div>

        <!-- Lancer une consultation vidéo -->
        <div class="card-plan">
          <h2>Consultation vidéo</h2>
          <p>Lancez une vidéo en direct pour discuter avec votre médecin.</p>
          <a href="../Html/consultation-video.html" class="btn">Démarrer la vidéo</a>
        </div>
      </div>
    </div>

    <!-- Filtre par spécialités (interactif via JS) -->
    <div class="specialties-filter">
      <span class="filter-label">Spécialités</span>
      <div class="filter-pills">
        <!-- Chaque switch possède un attribut data-specialty pour être lu par le script -->
        <label class="pill-button">
          <span>Médecin généraliste</span>
          <label class="switch">
            <input type="checkbox" data-specialty="Médecin généraliste" checked>
            <span class="slider round"></span>
          </label>
        </label>

        <label class="pill-button">
          <span>Ophtalmologiste</span>
          <label class="switch">
            <input type="checkbox" data-specialty="Ophtalmologiste">
            <span class="slider round"></span>
          </label>
        </label>

        <label class="pill-button">
          <span>Dentiste</span>
          <label class="switch">
            <input type="checkbox" data-specialty="dentiste">
            <span class="slider round"></span>
          </label>
        </label>

        <label class="pill-button">
          <span>Dermatologiste</span>
          <label class="switch">
            <input type="checkbox" data-specialty="dermatologiste">
            <span class="slider round"></span>
          </label>
        </label>

        <label class="pill-button">
          <span>Pharmacie</span>
          <label class="switch">
            <input type="checkbox" data-specialty="Pharmacie">
            <span class="slider round"></span>
          </label>
        </label>
      </div>
    </div>

    <!-- Zone résultats + carte (si Leaflet est utilisée) -->
    <div class="results-map-grid">
      <!-- Liste des résultats (médecins) -->
      <div class="results-list">
        <div class="result-card">
          <h3>Dr. Martin Dupont</h3>
          <div class="status">
            <!-- Icône de statut (couleur via CSS) -->
            <i class="fas fa-circle"></i>
            <span>Disponible maintenant</span>
          </div>
          <p class="address">123 Rue de la Santé, 75000 Paris</p>

          <!-- Actions rapides : appeler ou obtenir l'itinéraire -->
          <div class="actions">
            <button class="action-button call-button">
              <i class="fas fa-phone"></i>
              <span>Appeler</span>
            </button>
            <button class="action-button itinerary-button">
              <i class="fas fa-map-marker-alt"></i>
              <span>Itinéraire</span>
            </button>
          </div>

          <!-- Bouton pour prendre rendez-vous -->
          <button class="appointment-button">
            <i class="fas fa-calendar-check"></i>
            <span>Prendre rendez-vous</span>
          </button>
        </div>
      </div>

      <!-- Colonne messages et viewer de message -->
      <div class="messages-container">
        <div class="messages-header">
          <h3>Messages</h3>
          <div class="messages-filters">
            <select>
              <option>Tous</option>
              <option>Non lus</option>
              <option>Importants</option>
            </select>
          </div>
        </div>

        <!-- Liste d'exemples de messages (peuvent être générés dynamiquement) -->
        <div class="messages-list">
          <div class="message-item unread" data-id="1">
            <span class="message-icon">🔔</span>
            <div class="message-content">
              <p class="message-title">Rappel : Rendez-vous</p>
              <p class="message-text">Consultation demain à 10h</p>
            </div>
            <span class="message-time">09:15</span>
          </div>

          <div class="message-item" data-id="2">
            <span class="message-icon">💬</span>
            <div class="message-content">
              <p class="message-title">Message de la clinique</p>
              <p class="message-text">Formulaire à compléter</p>
            </div>
            <span class="message-time">Hier</span>
          </div>

          <div class="message-item important" data-id="3">
            <span class="message-icon">⚠️</span>
            <div class="message-content">
              <p class="message-title">Consultation manquée</p>
              <p class="message-text">Téléconsultation du 10 février</p>
            </div>
            <span class="message-time">10/02</span>
          </div>
        </div>

        <!-- Viewer pour afficher la conversation complète d'un message sélectionné -->
        <div class="message-viewer hidden">
          <div class="viewer-header">
            <h4 class="viewer-title">Message</h4>
            <button class="close-viewer">✖</button>
          </div>
          <div class="viewer-body">
            <div class="conversation">
              <div class="chat-message received"> Bonjour, je vous confirme votre rendez-vous pour demain à 10h. </div>
              <div class="chat-message sent"> Merci, je serai présent. </div>
            </div>
          </div>

          <!-- Actions du viewer : répondre ou supprimer -->
          <div class="viewer-actions">
            <input type="text" class="reply-input" placeholder="Écrire une réponse...">
            <button class="reply-btn">Répondre</button>
            <button class="delete-btn">Supprimer</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Tableau des prochaines consultations -->
    <section class="section-table">
      <h2 class="section-title">Prochaines consultations</h2>
      <table class="table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Heure</th>
            <th>Patient</th>
            <th>Type de consultation</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>5 Nov 2025</td>
            <td>09:30</td>
            <td>Albert</td>
            <td>Consultation généraliste</td>
          </tr>
          <tr>
            <td>15 Nov 2025</td>
            <td>14:00</td>
            <td>Marie</td>
            <td>Consultation de suivi</td>
          </tr>
          <tr>
            <td>30 Nov 2025</td>
            <td>10:00</td>
            <td>Justin</td>
            <td>Consultation Ophtalmologiste</td>
          </tr>
          <tr>
            <td>10 Déc 2025</td>
            <td>16:00</td>
            <td>NGOMA</td>
            <td>Consultation de dentiste</td>
          </tr>
        </tbody>
      </table>
    </section>

    <!-- Tableau des consultations récentes -->
    <section class="section-table">
      <h2 class="section-title">Consultations récentes</h2>
      <table class="table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Durée</th>
            <th>Patient</th>
            <th>Type</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>12 Nov 2025</td>
            <td>30 min</td>
            <td>M. Albert</td>
            <td>Consultation générale</td>
          </tr>
          <tr>
            <td>15 Nov 2025</td>
            <td>20 min</td>
            <td>Mme Zola</td>
            <td>Consultation dermatologique</td>
          </tr>
          <tr>
            <td>20 Nov 2025</td>
            <td>35 min</td>
            <td>M. FRANKLIN</td>
            <td>Consultation générale</td>
          </tr>
          <tr>
            <td>30 Nov 2025</td>
            <td>45 min</td>
            <td>Mme Zola</td>
            <td>Consultation dermatologique</td>
          </tr>
        </tbody>
      </table>
    </section>
  </div>

  <!-- Pied de page -->
  <?php include '../Include/Footer_patient.html';?>
  <!-- Scripts externes -->
  <!-- Leaflet pour la carte (si utilisée pour l'itinéraire) -->
  <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js" integrity="sha256-20n6a9+T52E+GEz8cMDM4xclUqH9s+YyQ3yTqj4g5E8=" crossorigin=""></script>
  <!-- Scripts locaux : logique de la page, avatar et notifications -->
  <script src="../Script/teleconsultation.js"></script>
  <script src="../Script/avatar.js"></script>
  <script src="../Script/notification.js"></script>
</body>
</html>
