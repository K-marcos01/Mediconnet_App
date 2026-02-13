<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Mes rendez-vous - Mediconnect</title>
    <link rel="stylesheet" href="../Css/Style_Acceuil.css">
    <link rel="stylesheet" href="../Css/Style_RDV.css">
    <link rel="stylesheet" href="../Css/notification.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
</head>
<body>
    <!-- Header Patient   -->
    <?php include '../Include/Header_patient.html';?>

<!-- Popup des notifications (initialement cachée via CSS/JS) -->
    <div class="notifications-popup" id="notificationsPopup">
      <div class="notifications-header">
        <h3><i class="fas fa-bell"></i> Notifications</h3>
        <!-- Bouton pour fermer la popup -->
        <button class="btn-close-popup" onclick="closeNotifications()">×</button>
      </div>

      <!-- Liste dynamique des notifications (remplie par JS) -->
      <div class="notifications-list" id="notificationsList">
      </div>

      <div class="notifications-footer">
        <!-- Action pour marquer toutes les notifications comme lues -->
        <button class="btn-mark-all" onclick="markAllAsRead()">
          <i class="fas fa-check-double"></i> Tout marquer comme lu
        </button>
      </div>
    </div>

    <!-- Overlay pour fermer la popup en cliquant en dehors -->
    <div class="notifications-overlay" id="notificationsOverlay" onclick="closeNotifications()"></div>
    <!-- Remarque : il y avait deux overlays identiques dans l'original ; un seul suffit normalement -->
    <!-- Si vous souhaitez conserver deux overlays pour un effet particulier, laissez-les. -->
    <h1 style="text-align: center; margin-top: 20px; margin-bottom: 20px;" class="titre">Espace Patient — Vos rendez-vous</h1>

    <div class="container">
        <section class="carte rdv-section">
            <!-- Barre d'actions -->
            <div class="rdv-actions-bar">
                <input type="text" class="search-input" placeholder="Rechercher un rendez-vous…" id="searchRdv">
                <a href="../Html/Formulaire.html" class="btn-nouveau-rdv">
                    <i class="fas fa-plus"></i> Nouveau rendez-vous
                </a>
            </div>

            <!-- Filtres -->
            <div class="filters-container">
                <button class="filter-btn-rdv active" data-filter="all">Tous</button>
                <button class="filter-btn-rdv" data-filter="upcoming">À venir</button>
                <button class="filter-btn-rdv" data-filter="past">Passés</button>
            </div>

            <!-- Liste des rendez-vous -->
            <div class="rdv-grid-container" id="rdvGrid">
                <!-- Rendez-vous 1 -->
                <div class="rdv-card-custom upcoming">
                    <div class="rdv-card-header">
                        <span class="rdv-status status-upcoming">À venir</span>
                        <span class="rdv-date">📅 20/12/2025 — 10h00</span>
                    </div>
                    <h3 class="rdv-doctor">Dr. Martin — Médecin généraliste</h3>
                    <p class="rdv-motif">Motif : Consultation de suivi</p>
                    <p class="rdv-location">📍 Cabinet médical, Paris 15e</p>
                    <div class="rdv-actions">
                        <button class="btn-annuler-rdv">Annuler</button>
                        <button class="btn-details-rdv">Détails</button>
                    </div>
                </div>

                <!-- Rendez-vous 2 -->
                <div class="rdv-card-custom upcoming">
                    <div class="rdv-card-header">
                        <span class="rdv-status status-upcoming">À venir</span>
                        <span class="rdv-date">📅 28/12/2025 — 14h00</span>
                    </div>
                    <h3 class="rdv-doctor">Dr. Lemoine — Gynécologue</h3>
                    <p class="rdv-motif">Motif : Consultation annuelle</p>
                    <p class="rdv-location">📍 Hôpital Saint-Louis, Paris 10e</p>
                    <div class="rdv-actions">
                        <button class="btn-annuler-rdv">Annuler</button>
                        <button class="btn-details-rdv">Détails</button>
                    </div>
                </div>

                <!-- Rendez-vous 3 -->
                <div class="rdv-card-custom past">
                    <div class="rdv-card-header">
                        <span class="rdv-status status-past">Passé</span>
                        <span class="rdv-date">📅 10/11/2025 — 09h00</span>
                    </div>
                    <h3 class="rdv-doctor">Dr. Dupont — Cardiologue</h3>
                    <p class="rdv-motif">Motif : Bilan cardiaque</p>
                    <p class="rdv-location">📍 Centre cardiologique, Paris 16e</p>
                    <div class="rdv-actions">
                        <button class="btn-details-rdv">Voir dossier</button>
                    </div>
                </div>

                <!-- Rendez-vous 4 -->
                <div class="rdv-card-custom past">
                    <div class="rdv-card-header">
                        <span class="rdv-status status-past">Passé</span>
                        <span class="rdv-date">📅 30/12/2025 — 10h00</span>
                    </div>
                    <h3 class="rdv-doctor">Dr. Erwin SIASSIA — Médecin généraliste</h3>
                    <p class="rdv-motif">Motif : Consultation générale</p>
                    <p class="rdv-location">📍 Cabinet médical, Paris 5e</p>
                    <div class="rdv-actions">
                        <button class="btn-details-rdv">Voir dossier</button>
                    </div>
                </div>

                <!-- Rendez-vous 5 -->
                <div class="rdv-card-custom upcoming">
                    <div class="rdv-card-header">
                        <span class="rdv-status status-upcoming">À venir</span>
                        <span class="rdv-date">📅 02/12/2025 — 10h00</span>
                    </div>
                    <h3 class="rdv-doctor">Dr. Nick LOMBAKA — Cardiologie</h3>
                    <p class="rdv-motif">Motif : Douleur thoracique</p>
                    <p class="rdv-location">📍 Institut cardiovasculaire, Paris 7e</p>
                    <div class="rdv-actions">
                        <button class="btn-annuler-rdv">Annuler</button>
                        <button class="btn-details-rdv">Détails</button>
                    </div>
                </div>

                <!-- Rendez-vous 6 -->
                <div class="rdv-card-custom upcoming">
                    <div class="rdv-card-header">
                        <span class="rdv-status status-upcoming">À venir</span>
                        <span class="rdv-date">📅 05/12/2025 — 11h15</span>
                    </div>
                    <h3 class="rdv-doctor">Dr. Darel NSIKABAKA-SAMUEL — Dermatologie</h3>
                    <p class="rdv-motif">Motif : Éruption cutanée</p>
                    <p class="rdv-location">📍 Centre dermatologique, Paris 8e</p>
                    <div class="rdv-actions">
                        <button class="btn-annuler-rdv">Annuler</button>
                        <button class="btn-details-rdv">Détails</button>
                    </div>
                </div>
            </div>
        </section>
    </div>
<?php include '../Include/Footer_patient.html';?>

    <script src="../Script/Style_RDV.js"></script>
    <script src="../Script/avatar.js"></script>
    <script src="../Script/notification.js"></script>
</body>
</html>