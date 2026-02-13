<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Gestion des Dossiers - Mediconnect Médecin</title>
    <link rel="stylesheet" href="../Css/style-medecin.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <link rel="stylesheet" href="../Include/Header_médecin.css">
    <link rel="stylesheet" href="../Include/Footer_médecin.css">
</head>
<body>
    <?php include '../Include/Header_médecin.html'; ?>
    <!-- Container principal -->
    <div class="doctor-container">
        <!-- Sidebar pour la gestion des dossiers -->
        <aside class="dossier-sidebar">
            <div class="sidebar-header">
                <h2><i class="fas fa-folder"></i> Dossiers patients</h2>
                <button class="btn-new" onclick="nouveauDossier()">
                    <i class="fas fa-plus"></i> Nouveau
                </button>
            </div>
            
            <div class="filters">
                <div class="filter-group">
                    <h3><i class="fas fa-filter"></i> Filtres</h3>
                    <select class="filter-select" id="filterStatus">
                        <option value="all">Tous les statuts</option>
                        <option value="active">Actifs</option>
                        <option value="recent">Récent</option>
                        <option value="urgent">Urgent</option>
                    </select>
                    <select class="filter-select" id="filterSpecialty">
                        <option value="all">Toutes spécialités</option>
                        <option value="general">Généraliste</option>
                        <option value="cardio">Cardiologie</option>
                        <option value="pneumo">Pneumologie</option>
                    </select>
                </div>
                
                <div class="filter-group">
                    <h3><i class="fas fa-sort"></i> Trier par</h3>
                    <select class="filter-select" id="sortBy">
                        <option value="date">Date de consultation</option>
                        <option value="name">Nom du patient</option>
                        <option value="status">Statut</option>
                    </select>
                </div>
            </div>
            
            <div class="patients-list" id="patientsList">
                <!-- Liste des patients chargée dynamiquement -->
            </div>
            
            <div class="sidebar-stats">
                <div class="stat">
                    <div class="stat-number">42</div>
                    <div class="stat-label">Patients actifs</div>
                </div>
                <div class="stat">
                    <div class="stat-number">15</div>
                    <div class="stat-label">Consultations aujourd'hui</div>
                </div>
                <div class="stat">
                    <div class="stat-number">3</div>
                    <div class="stat-label">Urgences</div>
                </div>
            </div>
        </aside>

        <!-- Zone d'édition principale -->
        <main class="dossier-main">
            <!-- En-tête du dossier en cours -->
            <div class="dossier-header" id="currentDossierHeader" style="display: none;">
                <div class="dossier-info">
                    <h2 id="currentPatientName">Chargement...</h2>
                    <div class="dossier-meta">
                        <span class="patient-id" id="currentPatientId">ID: --</span>
                        <span class="patient-age" id="currentPatientAge">Âge: --</span>
                        <span class="last-visit" id="currentLastVisit">Dernière consultation: --</span>
                    </div>
                </div>
                <div class="dossier-actions">
                    <button class="btn-action" onclick="imprimerDossier()">
                        <i class="fas fa-print"></i> Imprimer
                    </button>
                    <button class="btn-action" onclick="exporterDossier()">
                        <i class="fas fa-download"></i> Exporter
                    </button>
                    <button class="btn-action" onclick="partagerDossier()">
                        <i class="fas fa-share-alt"></i> Partager
                    </button>
                    <button class="btn-action danger" onclick="fermerDossier()">
                        <i class="fas fa-times"></i> Fermer
                    </button>
                </div>
            </div>

            <!-- Onglets du dossier -->
            <div class="dossier-tabs" id="dossierTabs" style="display: none;">
                <button class="tab active" data-tab="resume">
                    <i class="fas fa-home"></i> Résumé
                </button>
                <button class="tab" data-tab="consultations">
                    <i class="fas fa-stethoscope"></i> Consultations
                </button>
                <button class="tab" data-tab="traitements">
                    <i class="fas fa-pills"></i> Traitements
                </button>
                <button class="tab" data-tab="documents">
                    <i class="fas fa-files"></i> Documents
                </button>
                <button class="tab" data-tab="historique">
                    <i class="fas fa-history"></i> Historique complet
                </button>
                <button class="tab" data-tab="notes">
                    <i class="fas fa-edit"></i> Notes cliniques
                </button>
            </div>

            <!-- Contenu des onglets -->
            <div class="dossier-content">
                <!-- Message d'accueil -->
                <div class="welcome-message" id="welcomeMessage">
                    <div class="welcome-content">
                        <i class="fas fa-folder-open"></i>
                        <h2>Gestion des dossiers médicaux</h2>
                        <p>Sélectionnez un patient dans la liste pour accéder à son dossier complet</p>
                        <p>ou créez un nouveau dossier patient.</p>
                        
                        <div class="quick-stats">
                            <div class="stat-card">
                                <i class="fas fa-users"></i>
                                <div>
                                    <div class="number">42</div>
                                    <div class="label">Patients suivis</div>
                                </div>
                            </div>
                            <div class="stat-card">
                                <i class="fas fa-calendar-check"></i>
                                <div>
                                    <div class="number">8</div>
                                    <div class="label">RDV aujourd'hui</div>
                                </div>
                            </div>
                            <div class="stat-card">
                                <i class="fas fa-file-prescription"></i>
                                <div>
                                    <div class="number">15</div>
                                    <div class="label">Ordonnances en attente</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Onglet Résumé -->
                <div class="tab-content active" id="tab-resume">
                    <div class="tab-header">
                        <h3><i class="fas fa-user-chart"></i> Résumé patient</h3>
                        <button class="btn-edit" onclick="editerResume()">
                            <i class="fas fa-edit"></i> Modifier
                        </button>
                    </div>
                    
                    <div class="resume-grid">
                        <div class="resume-card">
                            <div class="card-header">
                                <h4><i class="fas fa-info-circle"></i> Informations vitales</h4>
                            </div>
                            <div class="card-body">
                                <table class="info-table">
                                    <tr>
                                        <td>Groupe sanguin:</td>
                                        <td><strong class="blood-type">A+</strong></td>
                                    </tr>
                                    <tr>
                                        <td>Poids/Taille:</td>
                                        <td><strong>62 kg / 1.68 m</strong></td>
                                    </tr>
                                    <tr>
                                        <td>IMC:</td>
                                        <td><strong>22.0 (Normal)</strong></td>
                                    </tr>
                                    <tr>
                                        <td>Tension:</td>
                                        <td><strong>120/80 mmHg</strong></td>
                                    </tr>
                                    <tr>
                                        <td>Allergies:</td>
                                        <td><strong class="allergy">Pollen (sévère)</strong></td>
                                    </tr>
                                </table>
                            </div>
                        </div>
                        
                        <div class="resume-card">
                            <div class="card-header">
                                <h4><i class="fas fa-history"></i> Dernières consultations</h4>
                            </div>
                            <div class="card-body">
                                <div class="last-consultations">
                                    <div class="consultation-item">
                                        <div class="date">15/06/2025</div>
                                        <div class="doctor">Dr. PANDY</div>
                                        <div class="reason">Contrôle tension</div>
                                    </div>
                                    <div class="consultation-item">
                                        <div class="date">10/05/2025</div>
                                        <div class="doctor">Dr. SIASSIA</div>
                                        <div class="reason">Bilan annuel</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div class="resume-card">
                            <div class="card-header">
                                <h4><i class="fas fa-pills"></i> Traitements actuels</h4>
                            </div>
                            <div class="card-body">
                                <div class="treatments-list">
                                    <div class="treatment-item">
                                        <div class="medicament">Lisinopril 10mg</div>
                                        <div class="duration">Jusqu'au 15/09/2025</div>
                                    </div>
                                    <div class="treatment-item">
                                        <div class="medicament">Ventoline</div>
                                        <div class="duration">Traitement continu</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div class="resume-card full-width">
                            <div class="card-header">
                                <h4><i class="fas fa-stethoscope"></i> Antécédents médicaux</h4>
                            </div>
                            <div class="card-body">
                                <div class="antecedents">
                                    <p><strong>Asthme</strong> - Diagnostiqué en 2015, suivi régulier</p>
                                    <p><strong>Appendicectomie</strong> - 2018, sans complication</p>
                                    <p><strong>Antécédents familiaux</strong> - Hypertension maternelle</p>
                                    <p><strong>Suivi</strong> - Consultation annuelle depuis 2020</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Onglet Consultations -->
                <div class="tab-content" id="tab-consultations">
                    <div class="tab-header">
                        <h3><i class="fas fa-calendar-check"></i> Gestion des consultations</h3>
                        <button class="btn-primary" onclick="nouvelleConsultation()">
                            <i class="fas fa-plus"></i> Nouvelle consultation
                        </button>
                    </div>
                    
                    <div class="consultations-manager">
                        <div class="consultation-form">
                            <h4><i class="fas fa-edit"></i> Saisie de consultation</h4>
                            <form id="consultationForm">
                                <div class="form-group">
                                    <label for="consultDate">Date de consultation</label>
                                    <input type="date" id="consultDate" required>
                                </div>
                                
                                <div class="form-group">
                                    <label for="consultReason">Motif de consultation</label>
                                    <textarea id="consultReason" rows="3" required></textarea>
                                </div>
                                
                                <div class="form-group">
                                    <label for="consultExamen">Examen clinique</label>
                                    <textarea id="consultExamen" rows="4"></textarea>
                                </div>
                                
                                <div class="form-group">
                                    <label for="consultDiagnostic">Diagnostic</label>
                                    <textarea id="consultDiagnostic" rows="3"></textarea>
                                </div>
                                
                                <div class="form-group">
                                    <label for="consultExamenCompl">Examens complémentaires</label>
                                    <textarea id="consultExamenCompl" rows="2"></textarea>
                                </div>
                                
                                <div class="form-actions">
                                    <button type="button" class="btn-secondary" onclick="genererOrdonnance()">
                                        <i class="fas fa-prescription"></i> Créer ordonnance
                                    </button>
                                    <button type="submit" class="btn-primary">
                                        <i class="fas fa-save"></i> Enregistrer
                                    </button>
                                </div>
                            </form>
                        </div>
                        
                        <div class="consultations-history">
                            <h4><i class="fas fa-history"></i> Historique des consultations</h4>
                            <div class="history-list">
                                <!-- Liste des consultations chargée dynamiquement -->
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Onglet Traitements -->
                <div class="tab-content" id="tab-traitements">
                    <div class="tab-header">
                        <h3><i class="fas fa-prescription-bottle"></i> Gestion des traitements</h3>
                        <button class="btn-primary" onclick="nouveauTraitement()">
                            <i class="fas fa-plus"></i> Nouveau traitement
                        </button>
                    </div>
                    
                    <div class="treatments-manager">
                        <!-- Formulaire de prescription -->
                        <div class="prescription-form">
                            <h4><i class="fas fa-prescription"></i> Prescrire un traitement</h4>
                            <form id="prescriptionForm">
                                <div class="form-row">
                                    <div class="form-group">
                                        <label for="medicament">Médicament</label>
                                        <input type="text" id="medicament" required>
                                    </div>
                                    <div class="form-group">
                                        <label for="posologie">Posologie</label>
                                        <input type="text" id="posologie" required>
                                    </div>
                                </div>
                                
                                <div class="form-row">
                                    <div class="form-group">
                                        <label for="duree">Durée</label>
                                        <input type="text" id="duree" required>
                                    </div>
                                    <div class="form-group">
                                        <label for="renouvellement">Renouvellement</label>
                                        <select id="renouvellement">
                                            <option value="0">Non renouvelable</option>
                                            <option value="1">1 fois</option>
                                            <option value="2">2 fois</option>
                                            <option value="3">3 fois</option>
                                        </select>
                                    </div>
                                </div>
                                
                                <div class="form-group">
                                    <label for="instructions">Instructions particulières</label>
                                    <textarea id="instructions" rows="3"></textarea>
                                </div>
                                
                                <div class="form-actions">
                                    <button type="submit" class="btn-primary">
                                        <i class="fas fa-save"></i> Enregistrer l'ordonnance
                                    </button>
                                </div>
                            </form>
                        </div>
                        
                        <!-- Liste des traitements -->
                        <div class="treatments-list">
                            <h4><i class="fas fa-list"></i> Traitements en cours</h4>
                            <table class="treatments-table">
                                <thead>
                                    <tr>
                                        <th>Médicament</th>
                                        <th>Posologie</th>
                                        <th>Début</th>
                                        <th>Fin</th>
                                        <th>Statut</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody id="treatmentsTableBody">
                                    <!-- Rempli dynamiquement -->
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                <!-- Onglet Documents -->
                <div class="tab-content" id="tab-documents">
                    <div class="tab-header">
                        <h3><i class="fas fa-file-upload"></i> Gestion des documents</h3>
                        <button class="btn-primary" onclick="ouvrirUpload()">
                            <i class="fas fa-upload"></i> Ajouter un document
                        </button>
                    </div>
                    
                    <div class="documents-manager">
                        <!-- Zone d'upload -->
                        <div class="upload-zone" id="uploadZone">
                            <i class="fas fa-cloud-upload-alt"></i>
                            <p>Glissez-déposez vos documents ici</p>
                            <p class="upload-info">Formats acceptés: PDF, JPG, PNG, DOC (max 10MB)</p>
                            <button class="btn-secondary" onclick="declencherUpload()">
                                <i class="fas fa-folder-open"></i> Parcourir les fichiers
                            </button>
                            <input type="file" id="fileInput" multiple style="display: none;">
                        </div>
                        
                        <!-- Liste des documents -->
                        <div class="documents-list">
                            <h4><i class="fas fa-files"></i> Documents du dossier</h4>
                            <table class="documents-table">
                                <thead>
                                    <tr>
                                        <th>Type</th>
                                        <th>Nom</th>
                                        <th>Date</th>
                                        <th>Taille</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody id="documentsTableBody">
                                    <!-- Rempli dynamiquement -->
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                <!-- Onglet Notes cliniques -->
                <div class="tab-content" id="tab-notes">
                    <div class="tab-header">
                        <h3><i class="fas fa-notes-medical"></i> Notes cliniques</h3>
                        <button class="btn-primary" onclick="nouvelleNote()">
                            <i class="fas fa-plus"></i> Nouvelle note
                        </button>
                    </div>
                    
                    <div class="notes-manager">
                        <!-- Éditeur de notes -->
                        <div class="note-editor">
                            <div class="form-group">
                                <label for="noteTitle">Titre de la note</label>
                                <input type="text" id="noteTitle">
                            </div>
                            
                            <div class="form-group">
                                <label for="noteContent">Contenu</label>
                                <textarea id="noteContent" rows="10"></textarea>
                            </div>
                            
                            <div class="form-group">
                                <label for="noteType">Type de note</label>
                                <select id="noteType">
                                    <option value="observation">Observation clinique</option>
                                    <option value="evolution">Évolution</option>
                                    <option value="communication">Communication</option>
                                    <option value="suivi">Suivi</option>
                                </select>
                            </div>
                            
                            <div class="form-actions">
                                <button class="btn-secondary" onclick="effacerNote()">
                                    <i class="fas fa-trash"></i> Effacer
                                </button>
                                <button class="btn-primary" onclick="enregistrerNote()">
                                    <i class="fas fa-save"></i> Enregistrer
                                </button>
                            </div>
                        </div>
                        
                        <!-- Liste des notes -->
                        <div class="notes-list">
                            <h4><i class="fas fa-history"></i> Notes précédentes</h4>
                            <div class="notes-timeline">
                                <!-- Notes chargées dynamiquement -->
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    </div>
    <?php include '../Include/Footer_médecin.html'; ?>
    <script src="../Script/script-medecin.js"></script>
</body>
</html>