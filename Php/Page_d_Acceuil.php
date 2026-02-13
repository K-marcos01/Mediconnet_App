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
  <!-- Header avec navigation -->
  <?php include '../Include/Header_patient.html'; ?>
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

  <?php include '../Include/Footer_patient.html'; ?>

  <!-- Scripts JavaScript (profil, avatar, notifications) -->
  <script src="../Script/profil-patient.js"></script>
  <script src="../Script/avatar.js"></script>
  <script src="../Script/notification.js"></script>
</body>
</html>
