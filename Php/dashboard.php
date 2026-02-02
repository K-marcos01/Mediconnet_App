<?php
session_start();

if (!isset($_SESSION['user'])) {
    header('Location: ../Html/Connexion_Inscription.html'); 
    exit();
}
?>
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Tableau de Bord - Mediconnect Médecin</title>
    <link rel="stylesheet" href="../Css/style-medecin.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
</head>
<body>
    <!-- Header Médecin (identique aux autres pages) -->
    <header class="doctor-header">
        <div class="header-container">
            <div class="doctor-brand">
                <a href="dashboard.html" style="display: flex; align-items: center; text-decoration: none;">
                    <img src="../Image/Logo Vf.jpg" alt="Mediconnect" class="header-logo">
                    <div>
                        <h1>Mediconnect <span class="professional">PROFESSIONNEL</span></h1>
                        <p class="subtitle">Plateforme médicale sécurisée</p>
                    </div>
                </a>
            </div>
            
            <button class="menu-toggle" aria-label="Menu">
                <i class="fas fa-bars"></i>
            </button>
            
            <div class="doctor-controls">
                <div class="search-bar">
                    <i class="fas fa-search"></i>
                    <input type="text" placeholder="Rechercher...">
                </div>
                
                <div class="doctor-profile">
                    <div class="doctor-info">
                        <span class="doctor-name">User</span>
                        <span class="doctor-specialty">Spécialité</span>
                    </div>
                    <div class="doctor-avatar">
                        <i class="fas fa-user-md"></i>
                    </div>
                    <div class="doctor-notifications">
                        <i class="fas fa-bell"></i>
                        <span class="notification-count">5</span>
                    </div>
                </div>
            </div>
        </div>
        
        <nav class="doctor-nav">
            <a href="../Php/dashboard.php" class="nav-link active"><i class="fas fa-tachometer-alt"></i> Tableau de bord</a>
            <a href="../Séparation_médécin/agenda.html" class="nav-link"><i class="fas fa-calendar-alt"></i> Agenda</a>
            <a href="../Séparation_médécin/dossier-medecin.html" class="nav-link"><i class="fas fa-folder-open"></i> Dossiers médicaux</a>
            <a href="../Séparation_médécin/Téléconsultation2.html" class="nav-link"><i class="fas fa-video"></i> Téléconsultations</a>
            <a href="../Html/Connexion_Inscription.html" class="nav-link"><i class="fas fa-sign-out-alt"></i> Déconnexion</a>
        </nav>
    </header>

    <!-- Contenu principal -->
    <div class="doctor-container">
        <main class="dossier-main">
            <div class="dashboard-content">
                <!-- En-tête du tableau de bord -->
                <div class="dashboard-header">
                    <h1><i class="fas fa-chart-line"></i> Tableau de Bord</h1>
                    <p class="dashboard-subtitle">Vue d'ensemble de votre activité médicale</p>
                </div>

                <!-- Statistiques en temps réel -->
                <div class="stats-grid">
                    <div class="stat-card large">
                        <div class="stat-icon">
                            <i class="fas fa-users"></i>
                        </div>
                        <div class="stat-info">
                            <div class="stat-number">142</div>
                            <div class="stat-label">Patients actifs</div>
                            <div class="stat-trend positive">
                                <i class="fas fa-arrow-up"></i> +12% ce mois
                            </div>
                        </div>
                    </div>

                    <div class="stat-card">
                        <div class="stat-icon urgent">
                            <i class="fas fa-calendar-check"></i>
                        </div>
                        <div class="stat-info">
                            <div class="stat-number">8</div>
                            <div class="stat-label">RDV aujourd'hui</div>
                            <div class="stat-next">Prochain: 09h30</div>
                        </div>
                    </div>

                    <div class="stat-card">
                        <div class="stat-icon warning">
                            <i class="fas fa-video"></i>
                        </div>
                        <div class="stat-info">
                            <div class="stat-number">3</div>
                            <div class="stat-label">Téléconsultations en attente</div>
                        </div>
                    </div>

                    <div class="stat-card">
                        <div class="stat-icon success">
                            <i class="fas fa-file-prescription"></i>
                        </div>
                        <div class="stat-info">
                            <div class="stat-number">24</div>
                            <div class="stat-label">Ordonnances ce mois</div>
                        </div>
                    </div>
                </div>

                <!-- Section RDV du jour -->
                <div class="dashboard-section">
                    <div class="section-header">
                        <h2><i class="fas fa-clock"></i> Rendez-vous du jour</h2>
                        <button class="btn-primary">
                            <i class="fas fa-plus"></i> Ajouter RDV
                        </button>
                    </div>
                    
                    <div class="appointments-list">
                        <div class="appointment-item urgent">
                            <div class="appointment-time">
                                <div class="time">09:30</div>
                                <div class="duration">30 min</div>
                            </div>
                            <div class="appointment-info">
                                <div class="patient-name">Allegra OKEMBA</div>
                                <div class="appointment-type">Consultation générale</div>
                                <div class="appointment-reason">Suivi fièvre</div>
                            </div>
                            <div class="appointment-actions">
                               <a href="Visio.html"> <button class="btn-small"><i class="fas fa-video"></i> Visio</button></a>
                                <button class="btn-small"><i class="fas fa-file-medical"></i> Dossier</button>
                            </div>
                        </div>

                        <div class="appointment-item">
                            <div class="appointment-time">
                                <div class="time">11:00</div>
                                <div class="duration">45 min</div>
                            </div>
                            <div class="appointment-info">
                                <div class="patient-name">Marie DUBOIS</div>
                                <div class="appointment-type">Cardiologie</div>
                                <div class="appointment-reason">Contrôle tension</div>
                            </div>
                            <div class="appointment-actions">
                                <a href="Visio.html"><button class="btn-small"><i class="fas fa-video"></i> Visio</button></a>
                                <button class="btn-small"><i class="fas fa-file-medical"></i> Dossier</button>
                            </div>
                        </div>

                        <div class="appointment-item">
                            <div class="appointment-time">
                                <div class="time">14:30</div>
                                <div class="duration">20 min</div>
                            </div>
                            <div class="appointment-info">
                                <div class="patient-name">Jean LEROY</div>
                                <div class="appointment-type">Dermatologie</div>
                                <div class="appointment-reason">Éruption cutanée</div>
                            </div>
                            <div class="appointment-actions">
                               <a href="Visio.html"> <button class="btn-small"><i class="fas fa-video"></i> Visio</button></a>
                                <button class="btn-small"><i class="fas fa-file-medical"></i> Dossier</button>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Section Patients récents -->
                <div class="dashboard-section">
                    <div class="section-header">
                        <h2><i class="fas fa-history"></i> Patients récemment consultés</h2>
                        <button class="btn-secondary">
                            <i class="fas fa-list"></i> Voir tous
                        </button>
                    </div>
                    
                    <div class="patients-grid">
                        <div class="patient-card">
                            <div class="patient-avatar">
                                <i class="fas fa-user"></i>
                            </div>
                            <div class="patient-details">
                                <div class="patient-name">Allegra OKEMBA</div>
                                <div class="patient-meta">
                                    <span><i class="fas fa-calendar"></i> 15/06/2025</span>
                                    <span><i class="fas fa-stethoscope"></i> Fièvre</span>
                                </div>
                            </div>
                            <a href="../Html/dossier-medecin.html?patient=okemba" class="btn-small">
                                <i class="fas fa-folder-open"></i> Dossier
                            </a>
                        </div>

                        <div class="patient-card">
                            <div class="patient-avatar">
                                <i class="fas fa-user"></i>
                            </div>
                            <div class="patient-details">
                                <div class="patient-name">Marie DUBOIS</div>
                                <div class="patient-meta">
                                    <span><i class="fas fa-calendar"></i> 10/07/2025</span>
                                    <span><i class="fas fa-heartbeat"></i> Cardiologie</span>
                                </div>
                            </div>
                            <a href="dossier-medecin.html?patient=dubois" class="btn-small">
                                <i class="fas fa-folder-open"></i> Dossier
                            </a>
                        </div>

                        <div class="patient-card">
                            <div class="patient-avatar">
                                <i class="fas fa-user"></i>
                            </div>
                            <div class="patient-details">
                                <div class="patient-name">Jean LEROY</div>
                                <div class="patient-meta">
                                    <span><i class="fas fa-calendar"></i> 05/07/2025</span>
                                    <span><i class="fas fa-allergies"></i> Dermatologie</span>
                                </div>
                            </div>
                            <a href="../Html/dossier-medecin.html?patient=leroy" class="btn-small">
                                <i class="fas fa-folder-open"></i> Dossier
                            </a>
                        </div>
                    </div>
                </div>

                <!-- Section Activité récente -->
                <div class="dashboard-section">
                    <div class="section-header">
                        <h2><i class="fas fa-chart-bar"></i> Activité mensuelle</h2>
                    </div>
                    
                    <div class="activity-chart">
                        <div class="chart-container">
                            <div class="chart-bar" style="height: 80%;" data-value="24">
                                <div class="bar-label">Lun</div>
                            </div>
                            <div class="chart-bar" style="height: 60%;" data-value="18">
                                <div class="bar-label">Mar</div>
                            </div>
                            <div class="chart-bar" style="height: 90%;" data-value="27">
                                <div class="bar-label">Mer</div>
                            </div>
                            <div class="chart-bar" style="height: 70%;" data-value="21">
                                <div class="bar-label">Jeu</div>
                            </div>
                            <div class="chart-bar" style="height: 85%;" data-value="25">
                                <div class="bar-label">Ven</div>
                            </div>
                            <div class="chart-bar" style="height: 40%;" data-value="12">
                                <div class="bar-label">Sam</div>
                            </div>
                            <div class="chart-bar" style="height: 20%;" data-value="6">
                                <div class="bar-label">Dim</div>
                            </div>
                        </div>
                        <div class="chart-legend">
                            <div class="legend-item">
                                <span class="legend-color" style="background-color: var(--doctor-primary);"></span>
                                <span>Consultations</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    </div>

    <!-- Footer (identique) -->
    <footer class="doctor-footer">
        <div class="footer-container">
            <div class="footer-content">
                <div class="footer-section">
                    <img src="../Image/Logo foot.jpg" alt="Mediconnect" class="footer-logo">
                    <p>Plateforme professionnelle pour les médecins</p>
                    <p class="footer-contact">Assistance technique : support@mediconnect.cg</p>
                </div>
                <div class="footer-section">
                    <h4>Accès rapide</h4>
                    <a href="#"><i class="fas fa-question-circle"></i> Aide en ligne</a>
                    <a href="#"><i class="fas fa-book"></i> Documentation</a>
                    <a href="#"><i class="fas fa-phone"></i> Support technique</a>
                </div>
            </div>
            <div class="footer-bottom">
                <p>&copy; 2025 Mediconnect Téléconsultation - Version Professionnelle 2.1</p>
                <p>Accès sécurisé et certifié</p>
            </div>
        </div>
    </footer>
<link rel="stylesheet" href="../Script/script-tableau de bord.js">
</body>
</html>