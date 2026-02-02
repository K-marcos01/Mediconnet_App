// Données de simulation
const patientsData = [
    {
        id: "PAT-2025-OKEMBA",
        name: "Allegra OKEMBA",
        age: "25 ans",
        lastVisit: "15/06/2025",
        status: "active",
        specialty: "general",
        urgent: false,
        bloodType: "A+",
        allergies: ["Pollen"],
        lastConsultation: "Cardiologie - Dr. PANDY",
        nextAppointment: "15/09/2025"
    },
    {
        id: "PAT-2025-DUBOIS",
        name: "Marie DUBOIS",
        age: "42 ans",
        lastVisit: "10/07/2025",
        status: "active",
        specialty: "cardio",
        urgent: true,
        bloodType: "O+",
        allergies: ["Pénicilline"],
        lastConsultation: "Suivi tension - Dr. MARTIN",
        nextAppointment: "25/08/2025"
    },
    {
        id: "PAT-2025-LEROY",
        name: "Jean LEROY",
        age: "68 ans",
        lastVisit: "05/07/2025",
        status: "active",
        specialty: "pneumo",
        urgent: false,
        bloodType: "B-",
        allergies: ["Aucune"],
        lastConsultation: "Bilan respiratoire - Dr. DUBOIS",
        nextAppointment: "10/09/2025"
    }
];

const documentsData = [
    { type: "Ordonnance", name: "Prescription Lisinopril.pdf", date: "15/06/2025", size: "250 KB" },
    { type: "Compte rendu", name: "CR Consultation cardiologie.pdf", date: "15/06/2025", size: "180 KB" },
    { type: "Radiographie", name: "Radio thoracique.jpg", date: "02/04/2025", size: "1.2 MB" },
    { type: "Analyse", name: "Bilan sanguin complet.pdf", date: "10/05/2025", size: "150 KB" }
];

const treatmentsData = [
    { medicament: "Lisinopril 10mg", posologie: "1 comp/jour", debut: "15/06/2025", fin: "15/09/2025", status: "actif" },
    { medicament: "Ventoline", posologie: "2 inh. si besoin", debut: "10/05/2025", fin: "-", status: "continu" }
];

// Initialisation
document.addEventListener('DOMContentLoaded', function() {
    chargerPatientsList();
    chargerDocumentsTable();
    chargerTraitementsTable();
    
    // Gestion des onglets
    const tabs = document.querySelectorAll('.tab');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            
            // Retirer active de tous
            tabs.forEach(t => t.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));
            
            // Activer l'onglet cliqué
            this.classList.add('active');
            document.getElementById(`tab-${tabId}`).classList.add('active');
        });
    });
    
    // Gestion de la recherche
    const searchInput = document.getElementById('searchPatient');
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            filtrerPatients(this.value);
        });
    }
    
    // Gestion des filtres
    const filterStatus = document.getElementById('filterStatus');
    const filterSpecialty = document.getElementById('filterSpecialty');
    const sortBy = document.getElementById('sortBy');
    
    if (filterStatus) filterStatus.addEventListener('change', filtrerPatientsList);
    if (filterSpecialty) filterSpecialty.addEventListener('change', filtrerPatientsList);
    if (sortBy) sortBy.addEventListener('change', trierPatientsList);
    
    // Gestion du formulaire de consultation
    const consultationForm = document.getElementById('consultationForm');
    if (consultationForm) {
        consultationForm.addEventListener('submit', function(e) {
            e.preventDefault();
            enregistrerConsultation();
        });
    }
    
    // Gestion du formulaire de prescription
    const prescriptionForm = document.getElementById('prescriptionForm');
    if (prescriptionForm) {
        prescriptionForm.addEventListener('submit', function(e) {
            e.preventDefault();
            enregistrerPrescription();
        });
    }
    
    // Gestion de l'upload
    const uploadZone = document.getElementById('uploadZone');
    const fileInput = document.getElementById('fileInput');
    
    if (uploadZone && fileInput) {
        uploadZone.addEventListener('click', function() {
            fileInput.click();
        });
        
        uploadZone.addEventListener('dragover', function(e) {
            e.preventDefault();
            this.style.borderColor = 'var(--doctor-secondary)';
            this.style.backgroundColor = 'rgba(52, 152, 219, 0.1)';
        });
        
        uploadZone.addEventListener('dragleave', function() {
            this.style.borderColor = 'var(--doctor-border)';
            this.style.backgroundColor = 'var(--doctor-white)';
        });
        
        uploadZone.addEventListener('drop', function(e) {
            e.preventDefault();
            this.style.borderColor = 'var(--doctor-border)';
            this.style.backgroundColor = 'var(--doctor-white)';
            
            const files = e.dataTransfer.files;
            traiterFichiersUpload(files);
        });
        
        fileInput.addEventListener('change', function() {
            traiterFichiersUpload(this.files);
        });
    }
    
    // Menu burger
    initMenuBurger();
});

// Fonctions du menu burger
function initMenuBurger() {
    const menuToggle = document.querySelector('.menu-toggle');
    const doctorNav = document.querySelector('.doctor-nav');
    const doctorControls = document.querySelector('.doctor-controls');
    const mobileOverlay = document.createElement('div');
    
    mobileOverlay.className = 'mobile-overlay';
    document.body.appendChild(mobileOverlay);
    
    if (menuToggle && doctorNav) {
        menuToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            doctorNav.classList.toggle('active');
            mobileOverlay.classList.toggle('active');
            
            // Toggle icon
            const icon = this.querySelector('i');
            if (icon) {
                if (doctorNav.classList.contains('active')) {
                    icon.className = 'fas fa-times';
                } else {
                    icon.className = 'fas fa-bars';
                }
            }
        });
        
        // Fermer le menu en cliquant sur l'overlay
        mobileOverlay.addEventListener('click', function() {
            doctorNav.classList.remove('active');
            mobileOverlay.classList.remove('active');
            
            const icon = menuToggle.querySelector('i');
            if (icon) {
                icon.className = 'fas fa-bars';
            }
        });
        
        // Fermer le menu en cliquant sur un lien
        const navLinks = document.querySelectorAll('.doctor-nav .nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                doctorNav.classList.remove('active');
                mobileOverlay.classList.remove('active');
                
                const icon = menuToggle.querySelector('i');
                if (icon) {
                    icon.className = 'fas fa-bars';
                }
            });
        });
    }
    
    // Toggle des contrôles sur mobile
    const doctorProfile = document.querySelector('.doctor-profile');
    if (doctorProfile && window.innerWidth <= 768) {
        doctorProfile.addEventListener('click', function(e) {
            e.stopPropagation();
            doctorControls.classList.toggle('active');
        });
        
        // Fermer les contrôles en cliquant ailleurs
        document.addEventListener('click', function() {
            doctorControls.classList.remove('active');
        });
        
        // Empêcher la fermeture en cliquant dans les contrôles
        doctorControls.addEventListener('click', function(e) {
            e.stopPropagation();
        });
    }
}

// Fonctions de gestion des patients
function chargerPatientsList() {
    const patientsList = document.getElementById('patientsList');
    if (!patientsList) return;
    
    patientsList.innerHTML = '';
    
    patientsData.forEach(patient => {
        const patientItem = document.createElement('div');
        patientItem.className = 'patient-item';
        patientItem.setAttribute('data-id', patient.id);
        
        patientItem.innerHTML = `
            <div class="patient-name">${patient.name}</div>
            <div class="patient-meta">
                <span>${patient.age}</span>
                <span class="${patient.urgent ? 'patient-urgent' : ''}">
                    ${patient.urgent ? 'URGENT' : `Dernier RDV: ${patient.lastVisit}`}
                </span>
            </div>
        `;
        
        patientItem.addEventListener('click', function() {
            selectionnerPatient(patient.id);
        });
        
        patientsList.appendChild(patientItem);
    });
}

function selectionnerPatient(patientId) {
    // Retirer la sélection de tous les patients
    document.querySelectorAll('.patient-item').forEach(item => {
        item.classList.remove('selected');
    });
    
    // Ajouter la sélection au patient cliqué
    const selectedItem = document.querySelector(`.patient-item[data-id="${patientId}"]`);
    if (selectedItem) {
        selectedItem.classList.add('selected');
    }
    
    // Charger les données du patient
    const patient = patientsData.find(p => p.id === patientId);
    if (patient) {
        chargerDossierPatient(patient);
    }
}

function chargerDossierPatient(patient) {
    // Afficher l'en-tête du dossier
    const dossierHeader = document.getElementById('currentDossierHeader');
    const dossierTabs = document.getElementById('dossierTabs');
    const welcomeMessage = document.getElementById('welcomeMessage');
    
    if (dossierHeader) dossierHeader.style.display = 'flex';
    if (dossierTabs) dossierTabs.style.display = 'flex';
    if (welcomeMessage) welcomeMessage.style.display = 'none';
    
    // Mettre à jour les informations
    const currentPatientName = document.getElementById('currentPatientName');
    const currentPatientId = document.getElementById('currentPatientId');
    const currentPatientAge = document.getElementById('currentPatientAge');
    const currentLastVisit = document.getElementById('currentLastVisit');
    
    if (currentPatientName) currentPatientName.textContent = patient.name;
    if (currentPatientId) currentPatientId.textContent = `ID: ${patient.id}`;
    if (currentPatientAge) currentPatientAge.textContent = `Âge: ${patient.age}`;
    if (currentLastVisit) currentLastVisit.textContent = `Dernière consultation: ${patient.lastVisit}`;
    
    // Mettre à jour le résumé
    mettreAJourResume(patient);
}

function mettreAJourResume(patient) {
    // Ici, on mettrait à jour toutes les informations du résumé
    console.log('Mise à jour du résumé pour:', patient.name);
    // Ajouter la logique de mise à jour des détails du patient ici
}

function filtrerPatients(searchTerm) {
    const patients = document.querySelectorAll('.patient-item');
    
    patients.forEach(patient => {
        const patientName = patient.querySelector('.patient-name').textContent.toLowerCase();
        if (patientName.includes(searchTerm.toLowerCase())) {
            patient.style.display = 'block';
        } else {
            patient.style.display = 'none';
        }
    });
}

function filtrerPatientsList() {
    const statusFilter = document.getElementById('filterStatus');
    const specialtyFilter = document.getElementById('filterSpecialty');
    
    if (!statusFilter || !specialtyFilter) return;
    
    console.log('Filtrage par:', statusFilter.value, specialtyFilter.value);
    // Implémentation du filtrage
}

function trierPatientsList() {
    const sortBy = document.getElementById('sortBy');
    if (!sortBy) return;
    
    console.log('Tri par:', sortBy.value);
    // Implémentation du tri
}

// Fonctions pour les documents
function chargerDocumentsTable() {
    const tbody = document.getElementById('documentsTableBody');
    if (!tbody) return;
    
    tbody.innerHTML = '';
    
    documentsData.forEach(doc => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${doc.type}</td>
            <td>${doc.name}</td>
            <td>${doc.date}</td>
            <td>${doc.size}</td>
            <td>
                <button class="btn-small" onclick="voirDocument('${doc.name}')">
                    <i class="fas fa-eye"></i>
                </button>
                <button class="btn-small" onclick="telechargerDocument('${doc.name}')">
                    <i class="fas fa-download"></i>
                </button>
                <button class="btn-small danger" onclick="supprimerDocument('${doc.name}')">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

function traiterFichiersUpload(files) {
    if (files.length > 0) {
        alert(`${files.length} fichier(s) sélectionné(s) pour l'upload`);
        // Ici, on enverrait les fichiers au serveur
    }
}

// Fonctions pour les traitements
function chargerTraitementsTable() {
    const tbody = document.getElementById('treatmentsTableBody');
    if (!tbody) return;
    
    tbody.innerHTML = '';
    
    treatmentsData.forEach(traitement => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${traitement.medicament}</td>
            <td>${traitement.posologie}</td>
            <td>${traitement.debut}</td>
            <td>${traitement.fin}</td>
            <td><span class="status ${traitement.status}">${traitement.status}</span></td>
            <td>
                <button class="btn-small" onclick="modifierTraitement('${traitement.medicament}')">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="btn-small" onclick="arreterTraitement('${traitement.medicament}')">
                    <i class="fas fa-stop"></i>
                </button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

// Fonctions d'action
function nouveauDossier() {
    alert('Création d\'un nouveau dossier patient');
}

function fermerDossier() {
    const dossierHeader = document.getElementById('currentDossierHeader');
    const dossierTabs = document.getElementById('dossierTabs');
    const welcomeMessage = document.getElementById('welcomeMessage');
    
    if (dossierHeader) dossierHeader.style.display = 'none';
    if (dossierTabs) dossierTabs.style.display = 'none';
    if (welcomeMessage) welcomeMessage.style.display = 'flex';
    
    // Retirer la sélection
    document.querySelectorAll('.patient-item').forEach(item => {
        item.classList.remove('selected');
    });
}

function imprimerDossier() {
    alert('Impression du dossier en cours...');
}

function exporterDossier() {
    alert('Export du dossier en cours...');
}

function partagerDossier() {
    alert('Partage du dossier avec un confrère...');
}

function editerResume() {
    alert('Édition du résumé patient');
}

function nouvelleConsultation() {
    // Réinitialiser le formulaire
    const consultationForm = document.getElementById('consultationForm');
    if (consultationForm) {
        consultationForm.reset();
        alert('Préparation d\'une nouvelle consultation');
    }
}

function enregistrerConsultation() {
    const consultDate = document.getElementById('consultDate');
    const consultReason = document.getElementById('consultReason');
    
    if (!consultDate || !consultReason) return;
    
    const date = consultDate.value;
    const raison = consultReason.value;
    
    if (date && raison) {
        alert('Consultation enregistrée avec succès');
        // Ici, on enverrait les données au serveur
    } else {
        alert('Veuillez remplir les champs obligatoires');
    }
}

function genererOrdonnance() {
    alert('Génération d\'une ordonnance');
}

function nouveauTraitement() {
    const prescriptionForm = document.getElementById('prescriptionForm');
    if (prescriptionForm) {
        prescriptionForm.reset();
        alert('Nouvelle prescription');
    }
}

function enregistrerPrescription() {
    const medicament = document.getElementById('medicament');
    const posologie = document.getElementById('posologie');
    
    if (!medicament || !posologie) return;
    
    if (medicament.value && posologie.value) {
        alert('Prescription enregistrée avec succès');
        // Ici, on enverrait les données au serveur
    } else {
        alert('Veuillez remplir les champs obligatoires');
    }
}

function ouvrirUpload() {
    const fileInput = document.getElementById('fileInput');
    if (fileInput) {
        fileInput.click();
    }
}

function voirDocument(nom) {
    alert(`Ouverture du document: ${nom}`);
}

function telechargerDocument(nom) {
    alert(`Téléchargement du document: ${nom}`);
}

function supprimerDocument(nom) {
    if (confirm(`Voulez-vous vraiment supprimer ${nom} ?`)) {
        alert(`Document ${nom} supprimé`);
    }
}

function modifierTraitement(medicament) {
    alert(`Modification du traitement: ${medicament}`);
}

function arreterTraitement(medicament) {
    if (confirm(`Arrêter le traitement ${medicament} ?`)) {
        alert(`Traitement ${medicament} arrêté`);
    }
}

function nouvelleNote() {
    const noteTitle = document.getElementById('noteTitle');
    const noteContent = document.getElementById('noteContent');
    
    if (noteTitle && noteContent) {
        noteTitle.value = '';
        noteContent.value = '';
        alert('Nouvelle note clinique');
    }
}

function enregistrerNote() {
    const noteTitle = document.getElementById('noteTitle');
    const noteContent = document.getElementById('noteContent');
    
    if (!noteTitle || !noteContent) return;
    
    const titre = noteTitle.value;
    const contenu = noteContent.value;
    
    if (contenu) {
        alert('Note clinique enregistrée');
        // Ici, on enverrait la note au serveur
    } else {
        alert('Veuillez saisir le contenu de la note');
    }
}

function effacerNote() {
    const noteTitle = document.getElementById('noteTitle');
    const noteContent = document.getElementById('noteContent');
    
    if (!noteTitle || !noteContent) return;
    
    if (confirm('Effacer le contenu de la note ?')) {
        noteTitle.value = '';
        noteContent.value = '';
    }
}

// Gestion du redimensionnement de la fenêtre
window.addEventListener('resize', function() {
    // Réinitialiser le menu burger sur desktop
    if (window.innerWidth > 768) {
        const doctorNav = document.querySelector('.doctor-nav');
        const menuToggle = document.querySelector('.menu-toggle');
        const mobileOverlay = document.querySelector('.mobile-overlay');
        const doctorControls = document.querySelector('.doctor-controls');
        
        if (doctorNav) doctorNav.classList.remove('active');
        if (mobileOverlay) mobileOverlay.classList.remove('active');
        if (doctorControls) doctorControls.classList.remove('active');
        
        if (menuToggle) {
            const icon = menuToggle.querySelector('i');
            if (icon) {
                icon.className = 'fas fa-bars';
            }
        }
    }
});