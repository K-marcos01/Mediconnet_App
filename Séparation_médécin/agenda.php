<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Agenda - Mediconnect Médecin</title>
    <link rel="stylesheet" href="../Css/style-medecin.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <link rel="stylesheet" href="../Include/Header_médecin.css">
    <link rel="stylesheet" href="../Include/Footer_médecin.css">
</head>
<body>
    <?php include '../Include/Header_médecin.html'; ?>
    <!-- Contenu principal -->
    <div class="doctor-container">
        <main class="dossier-main">
            <div class="agenda-content">
                <!-- En-tête de l'agenda -->
                <div class="agenda-header">
                    <div class="header-left">
                        <h1><i class="fas fa-calendar-alt"></i> Agenda Médical</h1>
                    </div>
                    <aside>
                        <div class="header-right">
                        <div class="view-controls">
                            <button class="btn-view active" data-view="month">
                                <i class="fas fa-calendar"></i> Mois
                            </button>
                            <button class="btn-view" data-view="week">
                                <i class="fas fa-calendar-week"></i> Semaine
                            </button>
                            <button class="btn-view" data-view="day">
                                <i class="fas fa-calendar-day"></i> Jour
                            </button>
                        </div>
                        <div class="navigation-controls">
                            <button class="btn-nav" id="prevMonth">
                                <i class="fas fa-chevron-left"></i>
                            </button>
                            <button class="btn-nav today" id="todayBtn">
                                Aujourd'hui
                            </button>
                            <button class="btn-nav" id="nextMonth">
                                <i class="fas fa-chevron-right"></i>
                            </button>
                        </div>
                    </div>
                </div>

                <!-- Contrôles rapides -->
                <div class="quick-actions">
                    <button class="btn-primary" onclick="nouveauRendezVous()">
                        <i class="fas fa-plus"></i> Nouveau rendez-vous
                    </button>
                    <button class="btn-secondary" onclick="importerAgenda()">
                        <i class="fas fa-upload"></i> Importer agenda
                    </button>
                    <button class="btn-secondary" onclick="exporterAgenda()">
                        <i class="fas fa-download"></i> Exporter
                    </button>
                </div>
            </aside>

            <main>

                <!-- Calendrier mensuel -->
                <div class="calendar-container">
                    <div class="calendar-weekdays">
                        <div class="weekday">Lundi</div>
                        <div class="weekday">Mardi</div>
                        <div class="weekday">Mercredi</div>
                        <div class="weekday">Jeudi</div>
                        <div class="weekday">Vendredi</div>
                        <div class="weekday">Samedi</div>
                        <div class="weekday">Dimanche</div>
                    </div>
                    
                    <div class="calendar-grid" id="calendarGrid">
                        <!-- Les jours seront générés par JavaScript -->
                    </div>
                </div>

                <!-- Liste des rendez-vous du jour -->
                <div class="daily-appointments">
                    <div class="daily-header">
                        <h2><i class="fas fa-calendar-day"></i> Rendez-vous d'<span id="selectedDate">Aujourd'hui</span></h2>
                        <div class="stats">
                            <span class="stat"><i class="fas fa-user-md"></i> 8 consultations</span>
                            <span class="stat"><i class="fas fa-clock"></i> 4h30 total</span>
                        </div>
                    </div>
                    
                    <div class="appointments-timeline">
                        <!-- Timeline des rendez-vous -->
                        <div class="timeline-slot">
                            <div class="time-label">08:00</div>
                            <div class="timeline-content">
                                <div class="appointment-block" style="height: 60px; background-color: rgba(52, 152, 219, 0.1);">
                                    <div class="appointment-info">
                                        <div class="patient">Allegra OKEMBA</div>
                                        <div class="time">08:00 - 08:30</div>
                                        <div class="type">Consultation générale</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div class="timeline-slot">
                            <div class="time-label">09:00</div>
                            <div class="timeline-content">
                                <div class="appointment-block" style="height: 90px; background-color: rgba(46, 204, 113, 0.1);">
                                    <div class="appointment-info">
                                        <div class="patient">Marie DUBOIS</div>
                                        <div class="time">09:30 - 10:15</div>
                                        <div class="type">Cardiologie - Urgent</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div class="timeline-slot">
                            <div class="time-label">11:00</div>
                            <div class="timeline-content">
                                <div class="appointment-block" style="height: 120px; background-color: rgba(155, 89, 182, 0.1);">
                                    <div class="appointment-info">
                                        <div class="patient">Téléconsultation - Dr. GOMEZ</div>
                                        <div class="time">11:00 - 11:45</div>
                                        <div class="type">Visio conférence</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div class="timeline-slot">
                            <div class="time-label">14:00</div>
                            <div class="timeline-content">
                                <div class="appointment-block" style="height: 60px; background-color: rgba(52, 152, 219, 0.1);">
                                    <div class="appointment-info">
                                        <div class="patient">Jean LEROY</div>
                                        <div class="time">14:30 - 15:00</div>
                                        <div class="type">Dermatologie</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    </div>
<?php include '../Include/Footer_médecin.html'; ?>
<script src="../Script/script-agenda.js"></script>
<script src="../Script/script-tableau de bord.js"></script>
</body>
</html>