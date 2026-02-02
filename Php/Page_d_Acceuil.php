<?php
session_start();

// Vérifie si l'utilisateur est connecté
if (!isset($_SESSION['user'])) {
    // Si pas de session, on retourne au formulaire de connexion dans le dossier Html
    header('Location: ../Html/Connexion_Inscription.html'); 
    exit();
}
?>
<!DOCTYPE html>
<html lang="fr">
<head>
  <!-- Métadonnées de la page -->
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Plateforme de Téléconsultation</title>

  <!-- Feuilles de style -->
  <link rel="stylesheet" href="../Css/Style_Acceuil.css">
  <link rel="stylesheet" href="../Css/notification.css">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
</head>
<body>
  <!-- En-tête principal pour l'utilisateur patient -->
  <header class="patient-header">
    <div class="header-container">
      <!-- Bloc marque / logo -->
      <div class="patient-brand">
        <a href="Page_d_Acceuil.php" class="logo-link">
          <!-- Logo de l'application -->
          <img src="../Image/Logo Vf.jpg" alt="Mediconnect" class="header-logo">
          <div class="logo-text">
            <h1>Mediconnect <span class="patient-tag">PATIENT</span></h1>
            <p class="subtitle">Votre santé notre priorité</p>
          </div>
        </a>
      </div>

      <!-- Bouton pour basculer le menu (mobile) -->
      <button class="menu-toggle" aria-label="Menu">
        <i class="fas fa-bars"></i>
      </button>

      <!-- Zone des contrôles utilisateur (profil, notifications) -->
      <div class="patient-controls">
        <div class="patient-profile">
          <div class="patient-info">
            <!-- Nom et identifiant du patient (peuvent être remplis dynamiquement) -->
            <span class="patient-name" id="patientHeaderName">User</span>
            <span class="patient-id">ID: PAT-2026-...</span>
          </div>

          <!-- Lien vers la page de profil -->
          <a href="../Html/profil-patient.html"  class="patient-avatar" id="patientAvatar">
            <i class="fas fa-user"></i>
          </a>

          <!-- Bouton notifications avec compteur -->
          <div class="patient-notifications" id="notificationsBtn">
            <i class="fas fa-bell"></i>
            <span class="notification-count" id="notificationCount">2</span>
          </div>
        </div>
      </div>
    </div>

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

    <!-- Navigation principale du patient -->
    <nav class="patient-nav" id="mainNav">
      <a href="../Php/Page_d_Acceuil.php" class="nav-link active" data-page="dashboard">
        <i class="fas fa-home"></i> Accueil
      </a>
      <a href="../Html/dossier-patient.html" class="nav-link" data-page="dossier">
        <i class="fas fa-file-medical"></i> Mon dossier
      </a>
      <a href="../Html/Rdv.html" class="nav-link" data-page="rdv">
        <i class="fas fa-calendar-alt"></i> Mes rendez-vous
      </a>
      <a href="../Html/Téléconsultation.html" class="nav-link" data-page="teleconsultation">
        <i class="fas fa-video"></i> Téléconsultations
      </a>
      <a href="../Html/Connexion_Inscription.html" class="nav-link" data-page="connexion">
        <i class="fas fa-sign-out-alt"></i> Déconnexion
      </a>
    </nav>
  </header>

  <!-- Section héro (bannière principale) -->
  <section class="hero" >
    <div class="hero-left">
      <!-- Logo ou image d'illustration -->
      <img src="../Images/Logo Vf.jpg" alt="logo">
      <h1>Vivez en meilleure santé</h1>
      <p>Consultez votre dossier médical et prenez rendez-vous en ligne facilement.</p>
      <a href="../Html/Formulaire.html">
        <button class="cta-button">Prenez rendez-vous</button>
      </a>
    </div>
  </section>

  <!-- Section cartes présentant les actions principales -->
  <div class="card-section">
    <div class="card">
      <img src="../Image/10.jpg" alt="">
      <h2>Prise de rendez-vous</h2>
      <p>Choisissez un créneau horaire qui vous convient parmi les disponibilités des médecins.</p>
      <a href="../Html/Rdv.html">
        <button>Chercher</button>
      </a>
    </div>

    <div class="card">
      <img src="../Image/Psychiatrie.jpg" alt="">
      <h2>Consultation en ligne</h2>
      <p>Connectez-vous à la plateforme à l'heure du rendez-vous pour une consultation vidéo sécurisée.</p>
      <a href="../Html/Téléconsultation.html">
        <button>Téléconsulter</button>
      </a>
    </div>

    <div class="card">
      <img src="../Image/11.jpg" alt="">
      <h2>Accès au dossier médical</h2>
      <p>Consultez et gérez votre dossier médical en ligne, incluant ordonnances et résultats d'examens.</p>
      <a href="../Html/dossier-patient.html">
        <button>Découvrir</button>
      </a>
    </div>
  </div>

  <!-- Section expliquant le fonctionnement du service -->
  <div class="Fonctionnement">
    <div class="fonctionnement-content">
      <img src="../Image/12.jpg" alt="image fonctionnement" class="fonction-img">
      <div class="fonction-texte">
        <h1>Comment ça fonctionne ?</h1>
        <p>
          <!-- Texte descriptif du fonctionnement ; peut être raccourci ou mis en paragraphes -->
          Mediconnect simplifie votre accès aux soins médicaux grâce à une plateforme de téléconsultation conviviale et sécurisée.
          Plus besoin de se déplacer: vous pouvez consulter votre médecin depuis chez vous, en quelques clics, via une visioconférence sécurisée.
          Tout est pensé pour vous: prise de rendez-vous rapide, échanges fluides, et surtout, un dossier médical en ligne toujours accessible.
          Vous y retrouvez vos ordonnances, vos comptes rendus, vos résultats d'examens… bref, tout ce qu'il faut pour un suivi clair et personnalisé.
          Et bien sûr, vos données sont protégées comme un coffre-fort. Notre mission? Vous offrir des soins accessibles, humains et efficaces, où que vous soyez.
          Suivez ces étapes simples pour profiter de nos services.
        </p>
      </div>
    </div>
  </div>

  <!-- Section services proposés -->
  <div class="Services">
    <h1>Nos services</h1>
    <p>Avec Mediconnect, accédez à une gamme complète de services de téléconsultation pour votre santé.</p>
  </div>

  <!-- Grille de cartes de services -->
  <div class="container">
    <div class="card">
      <img src="../Image/Conseilles médicaux 4.jpg" alt="Image 1">
      <p>Téléconsultation médicale</p>
    </div>
    <div class="card">
      <img src="../Image/Pédiatrie 4.jpg" alt="Image 2">
      <p>Pédiatrie</p>
    </div>
    <div class="card">
      <img src="../Image/Téléconsultation 4.jpg" alt="Image 3">
      <p>Médecine générale</p>
    </div>
    <div class="card">
      <img src="../Image/Conseilles médicaux 6.jpg" alt="Image 4">
      <p>Santé mentale</p>
    </div>
    <div class="card">
      <img src="../Image/Formulaire 5.jpg" alt="Image 5">
      <p>Suivi médical (maladies chroniques)</p>
    </div>
    <div class="card">
      <img src="../Image/Biologie médicale.jpg" alt="Image 6">
      <p>Analyses médicales</p>
    </div>
    <div class="card">
      <img src="../Image/Suivi médical.jpg" alt="Image 7">
      <p>Assistance médicale</p>
    </div>
    <div class="card">
      <img src="../Image/Ordonnances électroniques.jpg" alt="Image 8">
      <p>Conseils pharmaceutiques</p>
    </div>
  </div>

  <!-- Footer Patient -->
     <footer>
        <div class="footer-container">
            <div class="footer-top">
                <div class="footer-section">
                    <img src="../Image/Logo foot.jpg" alt="Mediconnect" class="footer-logo">
                    <p>Votre plateforme de téléconsultation médicale fiable et sécurisée.</p>
                </div>
                <div class="footer-section">
                    <h3>Navigation</h3>
                    <ul class="footer-links">
                        <li><a href="../Php/Page_d_Acceuil.php">Accueil</a></li>
                        <li><a href="../Html/Rdv.html">Rendez-vous</a></li>
                        <li><a href="../Html/dossier-patient.html">Dossier Médical</a></li>
                        <li><a href="../Html/Téléconsultation.html">Téléconsultation</a></li>
                        <li><a href="../Html/Connexion_Inscription.html">Connexion</a></li>
                    </ul>
                </div>
                <div class="footer-section">
                    <h3>Contact</h3>
                    <ul class="footer-links">
                        <li><i class="fas fa-phone"></i> +242 05 599 05 05</li>
                        <li><i class="fas fa-envelope"></i> contact@mediconnect.cg</li>
                        <li><i class="fas fa-map-marker-alt"></i> Avenue Stephane TCHITCHELE, Centre-ville Pointe-noire</li>
                    </ul>
                </div>
                <div class="footer-section">
                    <h3>À propos</h3>
                    <ul class="footer-links">
                        <li><a href="#">Mentions légales</a></li>
                        <li><a href="#">Politique de confidentialité</a></li>
                        <li><a href="#">Conditions d'utilisation</a></li>
                        <li><a href="#">FAQ</a></li>
                    </ul>
                </div>
            </div>
            <div class="footer-bottom">
                <div class="copyright">
                    &copy; 2025 Mediconnect Téléconsultation. Tous droits réservés.
                </div>
                <div class="footer-bottom-links">
                    <a href="#">Mentions légales</a>
                    <a href="#">Politique de confidentialité</a>
                </div>
            </div>
        </div>
    </footer>

    <!-- Modal pour les formulaires -->
    <div id="modal-container" class="modal" style="display: none;">
        <div class="modal-content">
            <span class="close-modal" onclick="fermerModal()">&times;</span>
            <div id="modal-body">
                <!-- Contenu modal dynamique -->
            </div>
        </div>
    </div>
  </footer>
  <!-- Scripts JavaScript (profil, avatar, notifications) -->
  <script src="../Script/profil-patient.js"></script>
  <script src="../Script/avatar.js"></script>
  <script src="../Script/notification.js"></script>
</body>
</html>
