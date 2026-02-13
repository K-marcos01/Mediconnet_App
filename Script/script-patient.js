// SCRIPT PRINCIPAL POUR LE DOSSIER MEDICAL

document.addEventListener('DOMContentLoaded', function() {
    console.log('Dossier médical chargé');
    
    // 1. INITIALISATION
    initializePage();
    loadPatientData();
    loadMedicalData();
    
    // 2. GESTION DE LA SIDEBAR
    
    const sidebarItems = document.querySelectorAll('.sidebar-item');
    const contentSections = document.querySelectorAll('.content-section');
    
    // Gestion des clics sur la sidebar
    sidebarItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Retirer la classe active de tous les items
            sidebarItems.forEach(i => i.classList.remove('active'));
            
            // Ajouter la classe active à l'item cliqué
            this.classList.add('active');
            
            // Récupérer la section à afficher
            const sectionId = this.getAttribute('data-section');
            
            // Masquer toutes les sections
            contentSections.forEach(section => {
                section.classList.remove('active');
            });
            
            // Afficher la section correspondante
            const targetSection = document.getElementById(sectionId);
            if (targetSection) {
                targetSection.classList.add('active');
                
                // Faire défiler vers la section
                targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                
                console.log(`Section affichée: ${sectionId}`);
                
                // Charger les données spécifiques à la section
                loadSectionData(sectionId);
            }
        });
    });
    
    // 3. FONCTIONS D'INITIALISATION
    
    function initializePage() {
        // Initialiser les compteurs
        updateCounters();
        
        // Initialiser les alertes
        setupAlerts();
        
        // Initialiser les filtres de documents
        setupDocumentFilters();
        
        // Initialiser les événements des boutons
        setupButtonEvents();
    }
    
    function loadPatientData() {
        // Simuler le chargement des données du patient
        const patientData = {
            nom: "Votre nom",
            prenom: "Votre prénom",
            naissance: "00/00/0000",
            age: 0,
            sexe: "Indéfini",
            adresse: "Votre adresse",
            telephone: "+242 05 599 05 05",
            email: "allegra.okemba@email.cg",
            medecin: "Dr. Stevens LIKIBI",
            medecinTelephone: "+242 05 599 05 05",
            contactUrgence: "Jean OKEMBA (+242 06 123 45 67)"
        };
        
        // Mettre à jour les informations du patient
        document.getElementById('patient-nom').textContent = patientData.nom;
        document.getElementById('patient-prenom').textContent = patientData.prenom;
        document.getElementById('patient-naissance').textContent = `${patientData.naissance} (${patientData.age} ans)`;
        document.getElementById('patient-sexe').textContent = patientData.sexe;
        document.getElementById('patient-adresse').textContent = patientData.adresse;
        document.getElementById('patient-telephone').textContent = patientData.telephone;
        document.getElementById('patient-email').textContent = patientData.email;
        document.getElementById('medecin-traitant').textContent = patientData.medecin;
        document.getElementById('medecin-telephone').textContent = patientData.medecinTelephone;
        document.getElementById('contact-urgence').textContent = patientData.contactUrgence;
        
        // Mettre à jour les initiales
        const initials = patientData.prenom.charAt(0) + patientData.nom.charAt(0);
        document.getElementById('patientInitials').textContent = initials;
    }
    
    function loadMedicalData() {
        // Données médicales par défaut
        const medicalData = {
            groupeSanguin: "A+",
            allergies: [
                { nom: "Pollen", gravite: "Sévère", type: "Respiratoire" },
                { nom: "Pénicilline", gravite: "Modérée", type: "Médicamenteuse" }
            ],
            antecedents: [
                "Asthme (depuis l'enfance)",
                "Opération appendicite (2018)",
                "Varicelle (2005)"
            ],
            donneesPhysiques: [
                { label: "Poids", value: "65 kg", date: "01/10/2025" },
                { label: "Taille", value: "1.70 m", date: "01/10/2025" },
                { label: "IMC", value: "22.5", date: "01/10/2025" },
                { label: "Tension", value: "12/8", date: "01/10/2025" }
            ]
        };
        
        // Mettre à jour le groupe sanguin
        document.getElementById('blood-group-display').textContent = medicalData.groupeSanguin;
        document.getElementById('blood-type').textContent = medicalData.groupeSanguin;
        
        // Mettre à jour les allergies
        const allergiesContainer = document.getElementById('allergies-container');
        allergiesContainer.innerHTML = medicalData.allergies.map(allergie => `
            <div class="allergie-item">
                <strong>${allergie.nom}</strong> - ${allergie.type}
                <small>(${allergie.gravite})</small>
            </div>
        `).join('');
        
        // Mettre à jour le compteur d'allergies
        document.getElementById('allergies-count').textContent = medicalData.allergies.length;
        
        // Mettre à jour les antécédents
        const antecedentsContainer = document.getElementById('antecedents-container');
        antecedentsContainer.innerHTML = medicalData.antecedents.map(antecedent => `
            <li>${antecedent}</li>
        `).join('');
        
        // Mettre à jour les données physiques
        const physicalDataContainer = document.getElementById('physical-data-container');
        physicalDataContainer.innerHTML = medicalData.donneesPhysiques.map(data => `
            <div class="data-item">
                <div class="data-label">${data.label}</div>
                <div class="data-value">${data.value}</div>
                <div class="data-date">${data.date}</div>
            </div>
        `).join('');
    }
    
    function loadSectionData(sectionId) {
        switch(sectionId) {
            case 'consultations':
                loadConsultations();
                break;
            case 'traitements':
                loadTraitements();
                break;
            case 'vaccinations':
                loadVaccinations();
                break;
            case 'documents':
                loadDocuments();
                break;
            case 'analyses':
                loadAnalyses();
                break;
            case 'urgence':
                loadFicheUrgence();
                break;
        }
    }
    
    // 4. FONCTIONS DE CHARGEMENT PAR SECTION
    
    function loadConsultations() {
        const consultationsData = [
            {
                date: "10/10/2025",
                medecin: "Dr. Stevens LIKIBI",
                specialite: "Médecin généraliste",
                motif: "Consultation de routine",
                resume: "Examen général - Bon état de santé",
                documents: ["Ordonnance", "Compte rendu"]
            },
            {
                date: "15/09/2025",
                medecin: "Dr. Stéphane PANDY",
                specialite: "Cardiologue",
                motif: "Bilan cardiaque",
                resume: "Électrocardiogramme normal",
                documents: ["Résultats ECG", "Compte rendu"]
            },
            {
                date: "05/08/2025",
                medecin: "Dr. Danielle YEKOLA",
                specialite: "Pédiatre",
                motif: "Vaccination",
                resume: "Rappel vaccinal effectué",
                documents: ["Certificat de vaccination"]
            }
        ];
        
        const container = document.getElementById('consultations-container');
        container.innerHTML = consultationsData.map(consult => `
            <div class="consultation-item">
                <div class="consultation-date">
                    <div class="date-day">${consult.date.split('/')[0]}</div>
                    <div class="date-month">${getMonthName(parseInt(consult.date.split('/')[1]))}</div>
                </div>
                <div class="consultation-content">
                    <div class="consultation-header">
                        <h4>${consult.medecin} - ${consult.specialite}</h4>
                        <span class="consultation-motif">${consult.motif}</span>
                    </div>
                    <p class="consultation-resume">${consult.resume}</p>
                    <div class="consultation-documents">
                        ${consult.documents.map(doc => `<span class="doc-tag">${doc}</span>`).join('')}
                    </div>
                </div>
            </div>
        `).join('');
        
        // Mettre à jour le compteur
        document.getElementById('consultations-count').textContent = consultationsData.length;
        document.getElementById('consult-year-count').textContent = consultationsData.length;
    }
    
    function loadTraitements() {
        const traitementsData = [
            {
                medicament: "Ventoline",
                dosage: "100 mcg",
                frequence: "En cas de besoin",
                debut: "01/09/2025",
                fin: "Indéterminé",
                prescripteur: "Dr. Stevens LIKIBI"
            },
            {
                medicament: "Paracétamol",
                dosage: "500 mg",
                frequence: "1 comprimé toutes les 6h si besoin",
                debut: "10/10/2025",
                fin: "17/10/2025",
                prescripteur: "Dr. Stevens LIKIBI"
            }
        ];
        
        const container = document.getElementById('treatments-container');
        container.innerHTML = traitementsData.map(traitement => `
            <div class="treatment-card">
                <div class="treatment-header">
                    <h4>${traitement.medicament}</h4>
                    <span class="treatment-dosage">${traitement.dosage}</span>
                </div>
                <div class="treatment-details">
                    <div class="detail-row">
                        <span class="detail-label">Fréquence :</span>
                        <span class="detail-value">${traitement.frequence}</span>
                    </div>
                    <div class="detail-row">
                        <span class="detail-label">Période :</span>
                        <span class="detail-value">Du ${traitement.debut} au ${traitement.fin}</span>
                    </div>
                    <div class="detail-row">
                        <span class="detail-label">Prescripteur :</span>
                        <span class="detail-value">${traitement.prescripteur}</span>
                    </div>
                </div>
                <button class="btn-alert" onclick="configurerAlerte('${traitement.medicament}')">
                    <i class="fas fa-bell"></i> Rappel
                </button>
            </div>
        `).join('');
        
        // Mettre à jour le compteur
        document.getElementById('traitements-count').textContent = traitementsData.length;
    }
    
    function loadVaccinations() {
        const vaccinationsData = [
            {
                vaccin: "Tétanos",
                date: "15/09/2025",
                rappel: "15/09/2030",
                centre: "Centre de santé Pointe-Noire"
            },
            {
                vaccin: "COVID-19",
                date: "10/03/2024",
                rappel: "10/09/2025",
                centre: "Hôpital Général"
            },
            {
                vaccin: "Hépatite B",
                date: "05/06/2023",
                rappel: "Vaccin complet",
                centre: "Centre médical"
            }
        ];
        
        const container = document.getElementById('vaccinations-container');
        container.innerHTML = vaccinationsData.map(vaccin => `
            <div class="vaccination-card">
                <div class="vaccination-icon">
                    <i class="fas fa-syringe"></i>
                </div>
                <div class="vaccination-content">
                    <h4>${vaccin.vaccin}</h4>
                    <div class="vaccination-details">
                        <div class="detail">
                            <span class="detail-label">Date :</span>
                            <span class="detail-value">${vaccin.date}</span>
                        </div>
                        <div class="detail">
                            <span class="detail-label">Prochain rappel :</span>
                            <span class="detail-value">${vaccin.rappel}</span>
                        </div>
                        <div class="detail">
                            <span class="detail-label">Lieu :</span>
                            <span class="detail-value">${vaccin.centre}</span>
                        </div>
                    </div>
                </div>
                <button class="btn-download" onclick="telechargerCertificat('${vaccin.vaccin}')">
                    <i class="fas fa-download"></i>
                </button>
            </div>
        `).join('');
    }
    
    function loadDocuments() {
        const documentsData = [
            { type: "ordonnance", nom: "Ordonnance du 10/10/2025", date: "10/10/2025", taille: "250 KB" },
            { type: "resultat", nom: "Analyse sanguine", date: "15/09/2025", taille: "1.2 MB" },
            { type: "imagerie", nom: "Radiographie thoracique", date: "15/09/2025", taille: "3.5 MB" },
            { type: "compte-rendu", nom: "Compte rendu consultation", date: "10/10/2025", taille: "180 KB" },
            { type: "ordonnance", nom: "Ordonnance du 15/09/2025", date: "15/09/2025", taille: "210 KB" },
            { type: "resultat", nom: "ECG", date: "15/09/2025", taille: "2.1 MB" },
            { type: "compte-rendu", nom: "Bilan annuel", date: "05/08/2025", taille: "350 KB" }
        ];
        
        const container = document.getElementById('documents-list-container');
        container.innerHTML = documentsData.map(doc => `
            <div class="document-item" data-type="${doc.type}">
                <div class="document-icon">
                    <i class="fas fa-file-pdf"></i>
                </div>
                <div class="document-info">
                    <h5>${doc.nom}</h5>
                    <div class="document-meta">
                        <span class="document-date"><i class="far fa-calendar"></i> ${doc.date}</span>
                        <span class="document-size"><i class="fas fa-hdd"></i> ${doc.taille}</span>
                    </div>
                </div>
                <div class="document-actions">
                    <button class="btn-view" onclick="voirDocument('${doc.nom}')">
                        <i class="fas fa-eye"></i>
                    </button>
                    <button class="btn-download" onclick="telechargerDocument('${doc.nom}')">
                        <i class="fas fa-download"></i>
                    </button>
                </div>
            </div>
        `).join('');
        
        // Mettre à jour le compteur
        document.getElementById('documents-count').textContent = documentsData.length;
    }
    
    function loadAnalyses() {
        const analysesData = [
            {
                type: "Prise de sang",
                date: "15/09/2025",
                statut: "Complet",
                resultat: "Normal"
            },
            {
                type: "Électrocardiogramme",
                date: "15/09/2025",
                statut: "Complet",
                resultat: "Normal"
            },
            {
                type: "Analyse urinaire",
                date: "05/08/2025",
                statut: "Complet",
                resultat: "Normal"
            }
        ];
        
        const container = document.getElementById('analyses-container');
        container.innerHTML = analysesData.map(analyse => `
            <div class="analyse-card">
                <div class="analyse-header">
                    <h4>${analyse.type}</h4>
                    <span class="analyse-date">${analyse.date}</span>
                </div>
                <div class="analyse-body">
                    <div class="analyse-statut">
                        <span class="statut-badge ${analyse.statut.toLowerCase()}">${analyse.statut}</span>
                    </div>
                    <div class="analyse-resultat">
                        <strong>Résultat :</strong> ${analyse.resultat}
                    </div>
                </div>
                <div class="analyse-actions">
                    <button class="btn-view" onclick="voirResultat('${analyse.type}')">
                        <i class="fas fa-chart-line"></i> Voir graphiques
                    </button>
                    <button class="btn-download" onclick="telechargerResultat('${analyse.type}')">
                        <i class="fas fa-download"></i> PDF
                    </button>
                </div>
            </div>
        `).join('');
    }
    
    function loadFicheUrgence() {
        const emergencyContent = `
            <div class="emergency-info">
                <h3><i class="fas fa-user"></i> Identité</h3>
                <p><strong>Nom :</strong> OKEMBA Allegra</p>
                <p><strong>Date de naissance :</strong> 15/08/2000</p>
                <p><strong>Groupe sanguin :</strong> A+</p>
                
                <h3><i class="fas fa-exclamation-triangle"></i> Informations critiques</h3>
                <p><strong>Allergies :</strong> Pollen (sévère), Pénicilline</p>
                <p><strong>Antécédents :</strong> Asthme</p>
                <p><strong>Traitements :</strong> Ventoline 100 mcg</p>
                
                <h3><i class="fas fa-user-md"></i> Contacts médicaux</h3>
                <p><strong>Médecin traitant :</strong> Dr. Stevens LIKIBI (+242 05 599 05 05)</p>
                <p><strong>Contact urgence :</strong> Jean OKEMBA (+242 06 123 45 67)</p>
                
                <h3><i class="fas fa-phone"></i> Numéros d'urgence</h3>
                <p><strong>Samu :</strong> 15</p>
                <p><strong>Pompiers :</strong> 18</p>
                <p><strong>Police :</strong> 17</p>
            </div>
            <div class="qr-code-placeholder">
                <p>QR Code d'urgence</p>
                <div class="qr-code">[QR Code]</div>
                <small>Scannez pour accéder aux informations</small>
            </div>
        `;
        
        document.getElementById('emergency-content').innerHTML = emergencyContent;
    }
    
    // =============================
    // 5. FONCTIONS UTILITAIRES
    // =============================
    
    function updateCounters() {
        // Les compteurs sont mis à jour lors du chargement des données
    }
    
    function setupAlerts() {
        // Simuler la récupération des alertes
        document.getElementById('alert-title').textContent = "Allergie sévère : Pollen";
        document.getElementById('next-rdv-date').textContent = "15/11/2025";
        document.getElementById('next-rdv-doctor').textContent = "Dr. LIKIBI";
    }
    
    function setupDocumentFilters() {
        const filterButtons = document.querySelectorAll('.filter-btn');
        const documentItems = document.querySelectorAll('.document-item');
        
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Retirer la classe active de tous les boutons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                
                // Ajouter la classe active au bouton cliqué
                this.classList.add('active');
                
                // Récupérer le filtre
                const filter = this.getAttribute('data-filter');
                
                // Filtrer les documents
                documentItems.forEach(item => {
                    if (filter === 'all' || item.getAttribute('data-type') === filter) {
                        item.style.display = 'flex';
                    } else {
                        item.style.display = 'none';
                    }
                });
            });
        });
    }
    
    function setupButtonEvents() {
        // Les événements sont attachés via les attributs onclick dans le HTML
    }
    
    function getMonthName(monthNumber) {
        const months = [
            "Jan", "Fév", "Mar", "Avr", "Mai", "Jun",
            "Jul", "Aoû", "Sep", "Oct", "Nov", "Déc"
        ];
        return months[monthNumber - 1] || "";
    }
    
    // =============================
    // 6. FONCTIONS POUR LES BOUTONS (à appeler depuis le HTML)
    // =============================
    
    window.editerInfosPersonnelles = function() {
        showModal(`
            <h2><i class="fas fa-edit"></i> Modifier les informations personnelles</h2>
            <form id="edit-info-form">
                <div class="form-group">
                    <label>Nom :</label>
                    <input type="text" value="OKEMBA" required>
                </div>
                <div class="form-group">
                    <label>Prénom :</label>
                    <input type="text" value="Allegra" required>
                </div>
                <div class="form-group">
                    <label>Date de naissance :</label>
                    <input type="date" value="2000-08-15" required>
                </div>
                <div class="form-group">
                    <label>Téléphone :</label>
                    <input type="tel" value="+242 05 599 05 05" required>
                </div>
                <div class="form-group">
                    <label>Email :</label>
                    <input type="email" value="allegra.okemba@email.cg" required>
                </div>
                <div class="form-buttons">
                    <button type="button" class="btn-secondary" onclick="fermerModal()">Annuler</button>
                    <button type="submit" class="btn-primary">Enregistrer</button>
                </div>
            </form>
        `);
        
        // Gérer la soumission du formulaire
        document.getElementById('edit-info-form').addEventListener('submit', function(e) {
            e.preventDefault();
            showNotification('Informations mises à jour avec succès', 'success');
            fermerModal();
        });
    };
    
    window.declarerDonneeMedicale = function() {
        showModal(`
            <h2><i class="fas fa-plus"></i> Déclarer une information médicale</h2>
            <form id="add-medical-form">
                <div class="form-group">
                    <label>Type d'information :</label>
                    <select id="info-type">
                        <option value="allergie">Allergie</option>
                        <option value="antecedent">Antécédent médical</option>
                        <option value="traitement">Traitement en cours</option>
                        <option value="chirurgie">Chirurgie/Opération</option>
                    </select>
                </div>
                <div class="form-group">
                    <label>Description :</label>
                    <textarea rows="4" placeholder="Décrivez l'information médicale..." required></textarea>
                </div>
                <div class="form-group">
                    <label>Date de début :</label>
                    <input type="date" required>
                </div>
                <div class="form-group">
                    <label>Statut :</label>
                    <select>
                        <option value="actif">Actif</option>
                        <option value="resolu">Résolu</option>
                        <option value="chronique">Chronique</option>
                    </select>
                </div>
                <div class="form-group">
                    <label>Gravité :</label>
                    <select>
                        <option value="faible">Faible</option>
                        <option value="moderee">Modérée</option>
                        <option value="severe">Sévère</option>
                    </select>
                </div>
                <div class="form-buttons">
                    <button type="button" class="btn-secondary" onclick="fermerModal()">Annuler</button>
                    <button type="submit" class="btn-primary">Déclarer</button>
                </div>
            </form>
        `);
        
        document.getElementById('add-medical-form').addEventListener('submit', function(e) {
            e.preventDefault();
            showNotification('Information médicale déclarée avec succès', 'success');
            fermerModal();
        });
    };
    
    window.ajouterAllergie = function() {
        showModal(`
            <h2><i class="fas fa-exclamation-triangle"></i> Ajouter une allergie</h2>
            <form id="add-allergy-form">
                <div class="form-group">
                    <label>Substance/allergène :</label>
                    <input type="text" placeholder="Ex: Pollen, Pénicilline..." required>
                </div>
                <div class="form-group">
                    <label>Type d'allergie :</label>
                    <select>
                        <option value="respiratoire">Respiratoire</option>
                        <option value="alimentaire">Alimentaire</option>
                        <option value="medicamenteuse">Médicamenteuse</option>
                        <option value="contact">Contact</option>
                    </select>
                </div>
                <div class="form-group">
                    <label>Symptômes :</label>
                    <textarea rows="3" placeholder="Décrivez les symptômes..." required></textarea>
                </div>
                <div class="form-group">
                    <label>Gravité :</label>
                    <select>
                        <option value="moderee">Modérée</option>
                        <option value="severe">Sévère</option>
                        <option value="vitale">Vitale (risque d'anaphylaxie)</option>
                    </select>
                </div>
                <div class="form-group">
                    <label>Traitement d'urgence :</label>
                    <input type="text" placeholder="Ex: Ventoline, Adrénaline...">
                </div>
                <div class="form-buttons">
                    <button type="button" class="btn-secondary" onclick="fermerModal()">Annuler</button>
                    <button type="submit" class="btn-primary">Ajouter</button>
                </div>
            </form>
        `);
        
        document.getElementById('add-allergy-form').addEventListener('submit', function(e) {
            e.preventDefault();
            showNotification('Allergie ajoutée avec succès', 'success');
            fermerModal();
        });
    };
    
    window.ajouterAntecedent = function() {
        showModal(`
            <h2><i class="fas fa-history"></i> Ajouter un antécédent médical</h2>
            <form id="add-antecedent-form">
                <div class="form-group">
                    <label>Type d'antécédent :</label>
                    <select>
                        <option value="maladie">Maladie</option>
                        <option value="chirurgie">Chirurgie/Opération</option>
                        <option value="accident">Accident</option>
                        <option value="hospitalisation">Hospitalisation</option>
                    </select>
                </div>
                <div class="form-group">
                    <label>Description :</label>
                    <textarea rows="4" placeholder="Décrivez l'antécédent..." required></textarea>
                </div>
                <div class="form-group">
                    <label>Date de début :</label>
                    <input type="date">
                </div>
                <div class="form-group">
                    <label>Date de fin/résolution :</label>
                    <input type="date">
                </div>
                <div class="form-group">
                    <label>Statut actuel :</label>
                    <select>
                        <option value="resolu">Résolu</option>
                        <option value="chronique">Chronique</option>
                        <option value="en cours">En cours</option>
                    </select>
                </div>
                <div class="form-buttons">
                    <button type="button" class="btn-secondary" onclick="fermerModal()">Annuler</button>
                    <button type="submit" class="btn-primary">Ajouter</button>
                </div>
            </form>
        `);
        
        document.getElementById('add-antecedent-form').addEventListener('submit', function(e) {
            e.preventDefault();
            showNotification('Antécédent ajouté avec succès', 'success');
            fermerModal();
        });
    };
    
    window.ajouterDonneePhysique = function() {
        showModal(`
            <h2><i class="fas fa-weight"></i> Mettre à jour les données physiques</h2>
            <form id="update-physical-form">
                <div class="form-group">
                    <label>Poids (kg) :</label>
                    <input type="number" step="0.1" placeholder="Ex: 65.5" required>
                </div>
                <div class="form-group">
                    <label>Taille (cm) :</label>
                    <input type="number" placeholder="Ex: 170" required>
                </div>
                <div class="form-group">
                    <label>Tension artérielle :</label>
                    <input type="text" placeholder="Ex: 12/8">
                </div>
                <div class="form-group">
                    <label>Fréquence cardiaque (bpm) :</label>
                    <input type="number" placeholder="Ex: 72">
                </div>
                <div class="form-group">
                    <label>Date de mesure :</label>
                    <input type="date" required>
                </div>
                <div class="form-buttons">
                    <button type="button" class="btn-secondary" onclick="fermerModal()">Annuler</button>
                    <button type="submit" class="btn-primary">Mettre à jour</button>
                </div>
            </form>
        `);
        
        document.getElementById('update-physical-form').addEventListener('submit', function(e) {
            e.preventDefault();
            showNotification('Données physiques mises à jour', 'success');
            fermerModal();
        });
    };
    
    window.prendreRdv = function() {
        window.location.href = 'Formulaire.html';
    };
    
    window.demanderRenouvellement = function() {
        showModal(`
            <h2><i class="fas fa-redo"></i> Demander un renouvellement</h2>
            <form id="renewal-form">
                <div class="form-group">
                    <label>Médicament à renouveler :</label>
                    <select required>
                        <option value="">Sélectionnez un médicament</option>
                        <option value="ventoline">Ventoline 100 mcg</option>
                        <option value="paracetamol">Paracétamol 500 mg</option>
                    </select>
                </div>
                <div class="form-group">
                    <label>Quantité :</label>
                    <select required>
                        <option value="1">1 boîte</option>
                        <option value="2">2 boîtes</option>
                        <option value="3">3 boîtes</option>
                    </select>
                </div>
                <div class="form-group">
                    <label>Mode de réception :</label>
                    <select required>
                        <option value="pharmacie">En pharmacie</option>
                        <option value="domicile">Livraison à domicile</option>
                    </select>
                </div>
                <div class="form-group">
                    <label>Message pour le médecin :</label>
                    <textarea rows="4" placeholder="Décrivez vos besoins..."></textarea>
                </div>
                <div class="form-buttons">
                    <button type="button" class="btn-secondary" onclick="fermerModal()">Annuler</button>
                    <button type="submit" class="btn-primary">Envoyer la demande</button>
                </div>
            </form>
        `);
        
        document.getElementById('renewal-form').addEventListener('submit', function(e) {
            e.preventDefault();
            showNotification('Demande de renouvellement envoyée', 'success');
            fermerModal();
        });
    };
    
    window.demanderDocument = function() {
        showModal(`
            <h2><i class="fas fa-envelope"></i> Demander un document médical</h2>
            <form id="document-request-form">
                <div class="form-group">
                    <label>Type de document :</label>
                    <select required>
                        <option value="">Sélectionnez un type</option>
                        <option value="ordonnance">Ordonnance</option>
                        <option value="compte-rendu">Compte rendu médical</option>
                        <option value="certificat">Certificat médical</option>
                        <option value="resultats">Résultats d'analyses</option>
                        <option value="imagerie">Images médicales</option>
                    </select>
                </div>
                <div class="form-group">
                    <label>Période concernée :</label>
                    <input type="text" placeholder="Ex: Octobre 2025, 2024-2025...">
                </div>
                <div class="form-group">
                    <label>Raison de la demande :</label>
                    <textarea rows="4" placeholder="Ex: Assurance, changement de médecin..." required></textarea>
                </div>
                <div class="form-group">
                    <label>Format souhaité :</label>
                    <div class="checkbox-group">
                        <label><input type="checkbox" checked> PDF</label>
                        <label><input type="checkbox"> Papier</label>
                    </div>
                </div>
                <div class="form-buttons">
                    <button type="button" class="btn-secondary" onclick="fermerModal()">Annuler</button>
                    <button type="submit" class="btn-primary">Envoyer la demande</button>
                </div>
            </form>
        `);
        
        document.getElementById('document-request-form').addEventListener('submit', function(e) {
            e.preventDefault();
            showNotification('Demande de document envoyée', 'success');
            fermerModal();
        });
    };
    
    window.ajouterVaccination = function() {
        showModal(`
            <h2><i class="fas fa-syringe"></i> Ajouter une vaccination</h2>
            <form id="add-vaccination-form">
                <div class="form-group">
                    <label>Nom du vaccin :</label>
                    <input type="text" placeholder="Ex: Tétanos, COVID-19..." required>
                </div>
                <div class="form-group">
                    <label>Date de vaccination :</label>
                    <input type="date" required>
                </div>
                <div class="form-group">
                    <label>Numéro de lot :</label>
                    <input type="text" placeholder="Facultatif">
                </div>
                <div class="form-group">
                    <label>Centre de vaccination :</label>
                    <input type="text" placeholder="Ex: Centre de santé...">
                </div>
                <div class="form-group">
                    <label>Prochain rappel :</label>
                    <input type="date">
                </div>
                <div class="form-group">
                    <label>Certificat :</label>
                    <input type="file" accept=".pdf,.jpg,.png">
                </div>
                <div class="form-buttons">
                    <button type="button" class="btn-secondary" onclick="fermerModal()">Annuler</button>
                    <button type="submit" class="btn-primary">Ajouter</button>
                </div>
            </form>
        `);
        
        document.getElementById('add-vaccination-form').addEventListener('submit', function(e) {
            e.preventDefault();
            showNotification('Vaccination ajoutée avec succès', 'success');
            fermerModal();
        });
    };
    
    window.prendreRdvAnalyse = function() {
        window.location.href = 'Formulaire.html?type=analyse';
    };
    
    window.imprimerFicheUrgence = function() {
        showNotification('Génération de la fiche d\'urgence en cours...', 'info');
        setTimeout(() => {
            showNotification('Fiche d\'urgence prête à imprimer', 'success');
        }, 1500);
    };
    
    window.genererQRCode = function() {
        showModal(`
            <h2><i class="fas fa-qrcode"></i> Générer QR Code d'urgence</h2>
            <div class="qr-code-info">
                <p>Ce QR Code contiendra vos informations médicales essentielles pour les situations d'urgence.</p>
                <div class="qr-preview">
                    <div class="qr-placeholder">
                        [QR Code généré]
                    </div>
                </div>
                <div class="qr-actions">
                    <button class="btn-secondary" onclick="telechargerQRCode()">
                        <i class="fas fa-download"></i> Télécharger
                    </button>
                    <button class="btn-primary" onclick="partagerQRCode()">
                        <i class="fas fa-share"></i> Partager
                    </button>
                </div>
            </div>
        `);
    };
    
    // =============================
    // 7. FONCTIONS DE GESTION DES DOCUMENTS
    // =============================
    
    window.voirDocument = function(nomDocument) {
        showModal(`
            <h2><i class="fas fa-eye"></i> ${nomDocument}</h2>
            <div class="document-viewer">
                <div class="pdf-viewer">
                    <p><i class="fas fa-file-pdf"></i> Visualisation du document PDF</p>
                    <p class="document-meta">Document médical - Consultation du ${new Date().toLocaleDateString('fr-FR')}</p>
                </div>
                <div class="viewer-actions">
                    <button class="btn-primary" onclick="telechargerDocument('${nomDocument}')">
                        <i class="fas fa-download"></i> Télécharger
                    </button>
                    <button class="btn-secondary" onclick="fermerModal()">
                        <i class="fas fa-times"></i> Fermer
                    </button>
                </div>
            </div>
        `);
    };
    
    window.telechargerDocument = function(nomDocument) {
        showNotification(`Téléchargement de "${nomDocument}"...`, 'info');
        // Simulation de téléchargement
        setTimeout(() => {
            showNotification('Document téléchargé avec succès', 'success');
        }, 2000);
    };
    
    window.voirResultat = function(typeAnalyse) {
        showModal(`
            <h2><i class="fas fa-chart-line"></i> ${typeAnalyse}</h2>
            <div class="results-viewer">
                <div class="chart-container">
                    <div class="chart-placeholder">
                        <p><i class="fas fa-chart-bar"></i> Graphique des résultats</p>
                        <p>Visualisation des données médicales</p>
                    </div>
                </div>
                <div class="results-table">
                    <table>
                        <thead>
                            <tr>
                                <th>Paramètre</th>
                                <th>Valeur</th>
                                <th>Référence</th>
                                <th>Statut</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Hémoglobine</td>
                                <td>14.2 g/dL</td>
                                <td>12.0 - 16.0</td>
                                <td><span class="status-normal">Normal</span></td>
                            </tr>
                            <tr>
                                <td>Leucocytes</td>
                                <td>7.5 10³/µL</td>
                                <td>4.0 - 11.0</td>
                                <td><span class="status-normal">Normal</span></td>
                            </tr>
                            <tr>
                                <td>Glycémie</td>
                                <td>0.95 g/L</td>
                                <td>0.70 - 1.10</td>
                                <td><span class="status-normal">Normal</span></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        `);
    };
    
    window.telechargerResultat = function(typeAnalyse) {
        showNotification(`Téléchargement des résultats "${typeAnalyse}"...`, 'info');
        setTimeout(() => {
            showNotification('Résultats téléchargés avec succès', 'success');
        }, 2000);
    };
    
    window.telechargerCertificat = function(nomVaccin) {
        showNotification(`Téléchargement du certificat "${nomVaccin}"...`, 'info');
        setTimeout(() => {
            showNotification('Certificat téléchargé avec succès', 'success');
        }, 2000);
    };
    
    window.configurerAlerte = function(medicament) {
        showModal(`
            <h2><i class="fas fa-bell"></i> Configurer un rappel pour ${medicament}</h2>
            <form id="alert-config-form">
                <div class="form-group">
                    <label>Frequence des rappels :</label>
                    <select required>
                        <option value="quotidien">Quotidien</option>
                        <option value="hebdomadaire">Hebdomadaire</option>
                        <option value="mensuel">Mensuel</option>
                        <option value="personnalise">Personnalisé</option>
                    </select>
                </div>
                <div class="form-group">
                    <label>Heure du rappel :</label>
                    <input type="time" value="08:00" required>
                </div>
                <div class="form-group">
                    <label>Mode de notification :</label>
                    <div class="checkbox-group">
                        <label><input type="checkbox" checked> Notification push</label>
                        <label><input type="checkbox"> Email</label>
                        <label><input type="checkbox"> SMS</label>
                    </div>
                </div>
                <div class="form-group">
                    <label>Message personnalisé :</label>
                    <textarea rows="3" placeholder="Ex: N'oubliez pas votre traitement...">Prendre ${medicament}</textarea>
                </div>
                <div class="form-buttons">
                    <button type="button" class="btn-secondary" onclick="fermerModal()">Annuler</button>
                    <button type="submit" class="btn-primary">Configurer le rappel</button>
                </div>
            </form>
        `);
        
        document.getElementById('alert-config-form').addEventListener('submit', function(e) {
            e.preventDefault();
            showNotification('Rappel configuré avec succès', 'success');
            fermerModal();
        });
    };
    
    // =============================
    // 8. FONCTIONS DE GESTION MODALE
    // =============================
    
    window.showModal = function(content) {
        const modal = document.getElementById('modal-container');
        const modalBody = document.getElementById('modal-body');
        
        modalBody.innerHTML = content;
        modal.style.display = 'flex';
        
        // Empêcher le défilement du body
        document.body.style.overflow = 'hidden';
        
        // Ajouter des styles pour les formulaires dans la modal
        const style = document.createElement('style');
        style.textContent = `
            .form-group {
                margin-bottom: 20px;
            }
            .form-group label {
                display: block;
                margin-bottom: 8px;
                font-weight: 600;
                color: var(--text-dark);
            }
            .form-group input,
            .form-group select,
            .form-group textarea {
                width: 100%;
                padding: 12px;
                border: 1px solid var(--border);
                border-radius: 6px;
                font-size: 1rem;
                transition: border 0.3s;
            }
            .form-group input:focus,
            .form-group select:focus,
            .form-group textarea:focus {
                outline: none;
                border-color: var(--primary);
            }
            .form-buttons {
                display: flex;
                gap: 15px;
                margin-top: 30px;
            }
            .btn-secondary {
                padding: 12px 25px;
                background-color: var(--white);
                border: 1px solid var(--border);
                border-radius: 6px;
                color: var(--text-dark);
                cursor: pointer;
                font-weight: 600;
                transition: all 0.3s;
            }
            .btn-secondary:hover {
                background-color: var(--light-bg);
            }
            .checkbox-group {
                display: flex;
                flex-wrap: wrap;
                gap: 15px;
                margin-top: 8px;
            }
            .checkbox-group label {
                display: flex;
                align-items: center;
                gap: 8px;
                font-weight: normal;
                cursor: pointer;
            }
        `;
        modalBody.appendChild(style);
    };
    
    window.fermerModal = function() {
        const modal = document.getElementById('modal-container');
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    };
    
    // Fermer la modal en cliquant à l'extérieur
    document.getElementById('modal-container').addEventListener('click', function(e) {
        if (e.target === this) {
            fermerModal();
        }
    });
    
    // =============================
    // 9. NOTIFICATIONS
    // =============================
    
    function showNotification(message, type = 'info') {
        // Supprimer les notifications existantes
        const existingNotifications = document.querySelectorAll('.custom-notification');
        existingNotifications.forEach(n => n.remove());
        
        const notification = document.createElement('div');
        notification.className = `custom-notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas fa-${type === 'success' ? 'check-circle' : 'info-circle'}"></i>
                <span>${message}</span>
                <button class="notification-close" onclick="this.parentElement.parentElement.remove()">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        `;
        
        // Styles pour la notification
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? '#2ecc71' : type === 'error' ? '#e74c3c' : '#3498db'};
            color: white;
            padding: 15px 20px;
            border-radius: 8px;
            box-shadow: var(--shadow-lg);
            z-index: 10000;
            animation: slideIn 0.3s ease;
            max-width: 400px;
        `;
        
        document.body.appendChild(notification);
        
        // Ajouter le style d'animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes slideIn {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            @keyframes fadeOut {
                from { opacity: 1; }
                to { opacity: 0; }
            }
            .notification-content {
                display: flex;
                align-items: center;
                gap: 15px;
            }
            .notification-close {
                background: none;
                border: none;
                color: white;
                cursor: pointer;
                font-size: 1rem;
                margin-left: 10px;
                padding: 0;
            }
        `;
        document.head.appendChild(style);
        
        // Supprimer automatiquement après 5 secondes
        setTimeout(() => {
            if (notification.parentNode) {
                notification.style.animation = 'fadeOut 0.3s ease';
                setTimeout(() => {
                    if (notification.parentNode) {
                        notification.remove();
                    }
                }, 300);
            }
        }, 5000);
    }
    
    // Exposer la fonction aux événements onclick
    window.showNotification = showNotification;
    
    // =============================
    // 10. STYLES COMPLÉMENTAIRES POUR LES SECTIONS
    // =============================
    
    // Ajouter des styles CSS dynamiquement pour les sections
    const dynamicStyles = document.createElement('style');
    dynamicStyles.textContent = `
        /* Styles pour les consultations */
        .consultation-item {
            display: flex;
            gap: 20px;
            background: var(--white);
            padding: 20px;
            border-radius: 10px;
            margin-bottom: 15px;
            border-left: 5px solid var(--primary);
            box-shadow: var(--shadow);
            transition: all 0.3s;
        }
        
        .consultation-item:hover {
            transform: translateY(-3px);
            box-shadow: var(--shadow-hover);
        }
        
        .consultation-date {
            background: var(--primary);
            color: white;
            padding: 15px;
            border-radius: 8px;
            text-align: center;
            min-width: 70px;
        }
        
        .date-day {
            font-size: 1.8rem;
            font-weight: 700;
            line-height: 1;
        }
        
        .date-month {
            font-size: 0.9rem;
            opacity: 0.9;
        }
        
        .consultation-content {
            flex: 1;
        }
        
        .consultation-header {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            margin-bottom: 10px;
            flex-wrap: wrap;
            gap: 10px;
        }
        
        .consultation-header h4 {
            margin: 0;
            color: var(--primary-dark);
            font-size: 1.1rem;
        }
        
        .consultation-motif {
            background: var(--light-bg);
            padding: 5px 12px;
            border-radius: 15px;
            font-size: 0.85rem;
            color: var(--text-light);
        }
        
        .consultation-resume {
            color: var(--text-dark);
            margin-bottom: 15px;
            line-height: 1.5;
        }
        
        .consultation-documents {
            display: flex;
            gap: 10px;
            flex-wrap: wrap;
        }
        
        .doc-tag {
            background: var(--primary-light);
            color: white;
            padding: 4px 10px;
            border-radius: 12px;
            font-size: 0.8rem;
            font-weight: 500;
        }
        
        /* Styles pour les traitements */
        .treatment-card {
            background: var(--white);
            padding: 20px;
            border-radius: 10px;
            margin-bottom: 15px;
            box-shadow: var(--shadow);
            border-top: 4px solid var(--accent);
        }
        
        .treatment-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 15px;
        }
        
        .treatment-header h4 {
            margin: 0;
            color: var(--primary-dark);
            font-size: 1.2rem;
        }
        
        .treatment-dosage {
            background: var(--accent);
            color: white;
            padding: 5px 12px;
            border-radius: 15px;
            font-size: 0.9rem;
            font-weight: 600;
        }
        
        .detail-row {
            display: flex;
            margin-bottom: 8px;
            padding-bottom: 8px;
            border-bottom: 1px solid var(--light-bg);
        }
        
        .detail-row:last-child {
            margin-bottom: 0;
            padding-bottom: 0;
            border-bottom: none;
        }
        
        .detail-label {
            font-weight: 600;
            color: var(--primary-dark);
            min-width: 120px;
        }
        
        .detail-value {
            color: var(--text-dark);
            flex: 1;
        }
        
        .btn-alert {
            margin-top: 15px;
            padding: 8px 15px;
            background: var(--warning);
            color: white;
            border: none;
            border-radius: 6px;
            cursor: pointer;
            display: inline-flex;
            align-items: center;
            gap: 8px;
            font-weight: 600;
            transition: all 0.3s;
        }
        
        .btn-alert:hover {
            background: #e67e22;
        }
        
        /* Styles pour les vaccinations */
        .vaccination-card {
            display: flex;
            align-items: center;
            gap: 20px;
            background: var(--white);
            padding: 20px;
            border-radius: 10px;
            margin-bottom: 15px;
            box-shadow: var(--shadow);
            border-left: 5px solid var(--accent);
        }
        
        .vaccination-icon {
            background: var(--accent);
            color: white;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 1.5rem;
        }
        
        .vaccination-content {
            flex: 1;
        }
        
        .vaccination-content h4 {
            margin: 0 0 10px 0;
            color: var(--primary-dark);
        }
        
        .vaccination-details {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
            gap: 15px;
        }
        
        .detail {
            display: flex;
            flex-direction: column;
        }
        
        .detail-label {
            font-size: 0.85rem;
            color: var(--text-light);
            margin-bottom: 2px;
        }
        
        .detail-value {
            font-weight: 600;
            color: var(--text-dark);
        }
        
        .btn-download {
            background: none;
            border: 1px solid var(--border);
            color: var(--primary);
            width: 40px;
            height: 40px;
            border-radius: 50%;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.3s;
        }
        
        .btn-download:hover {
            background: var(--primary);
            color: white;
            border-color: var(--primary);
        }
        
        /* Styles pour les documents */
        .document-item {
            display: flex;
            align-items: center;
            gap: 20px;
            background: var(--white);
            padding: 15px 20px;
            border-radius: 8px;
            margin-bottom: 10px;
            box-shadow: var(--shadow);
            transition: all 0.3s;
        }
        
        .document-item:hover {
            transform: translateY(-3px);
            box-shadow: var(--shadow-hover);
            border-left: 4px solid var(--primary);
        }
        
        .document-icon {
            color: var(--danger);
            font-size: 1.5rem;
        }
        
        .document-info {
            flex: 1;
        }
        
        .document-info h5 {
            margin: 0 0 5px 0;
            color: var(--primary-dark);
        }
        
        .document-meta {
            display: flex;
            gap: 15px;
            font-size: 0.85rem;
            color: var(--text-light);
        }
        
        .document-actions {
            display: flex;
            gap: 10px;
        }
        
        .btn-view {
            background: var(--secondary);
            color: white;
            border: none;
            width: 35px;
            height: 35px;
            border-radius: 50%;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.3s;
        }
        
        .btn-view:hover {
            background: var(--primary);
        }
        
        /* Styles pour les analyses */
        .analyse-card {
            background: var(--white);
            padding: 20px;
            border-radius: 10px;
            margin-bottom: 15px;
            box-shadow: var(--shadow);
        }
        
        .analyse-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 15px;
            padding-bottom: 10px;
            border-bottom: 1px solid var(--light-bg);
        }
        
        .analyse-header h4 {
            margin: 0;
            color: var(--primary-dark);
        }
        
        .analyse-date {
            color: var(--text-light);
            font-size: 0.9rem;
        }
        
        .analyse-body {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 15px;
        }
        
        .statut-badge {
            padding: 5px 15px;
            border-radius: 15px;
            font-size: 0.85rem;
            font-weight: 600;
        }
        
        .statut-badge.complet {
            background: rgba(46, 204, 113, 0.2);
            color: var(--accent);
        }
        
        .analyse-resultat {
            color: var(--text-dark);
            font-weight: 500;
        }
        
        .analyse-actions {
            display: flex;
            gap: 10px;
        }
        
        /* Styles pour la modal */
        .modal {
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.5);
            z-index: 1000;
            justify-content: center;
            align-items: center;
            padding: 20px;
        }
        
        .modal-content {
            background: var(--white);
            padding: 30px;
            border-radius: 12px;
            max-width: 600px;
            width: 100%;
            max-height: 90vh;
            overflow-y: auto;
            position: relative;
            box-shadow: var(--shadow-lg);
        }
        
        .close-modal {
            position: absolute;
            top: 15px;
            right: 15px;
            font-size: 1.5rem;
            cursor: pointer;
            color: var(--text-light);
            transition: color 0.3s;
        }
        
        .close-modal:hover {
            color: var(--danger);
        }
        
        /* Responsive */
        @media (max-width: 768px) {
            .consultation-item {
                flex-direction: column;
            }
            
            .consultation-date {
                align-self: flex-start;
            }
            
            .consultation-header {
                flex-direction: column;
                align-items: flex-start;
            }
            
            .vaccination-card {
                flex-direction: column;
                text-align: center;
            }
            
            .document-item {
                flex-wrap: wrap;
            }
            
            .modal-content {
                padding: 20px;
            }
        }
    `;
    document.head.appendChild(dynamicStyles);
    
    // =============================
    // 11. INITIALISATION FINALE
    // =============================
    
    console.log('Script patient initialisé');
    
    // Charger la première section
    loadSectionData('infos');
});