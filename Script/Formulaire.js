// ===========================================
// JAVASCRIPT POUR LA PAGE DE PRISE DE RDV
// ===========================================

document.addEventListener('DOMContentLoaded', function() {
    console.log('Page de prise de rendez-vous chargée');
    
    // =============================
    // 1. INITIALISATION
    // =============================
    const form = document.getElementById('rdv-form');
    const formSteps = document.querySelectorAll('.form-step');
    const progressSteps = document.querySelectorAll('.step');
    const stepLabels = document.querySelectorAll('.step-label');
    const nextButtons = document.querySelectorAll('.next-step');
    const prevButtons = document.querySelectorAll('.prev-step');
    const confirmBtn = document.getElementById('confirmBtn');
    const descriptionTextarea = document.getElementById('description');
    const charCount = document.getElementById('char-count');
    const dateInput = document.getElementById('date-rdv');
    
    let currentStep = 1;
    const totalSteps = 6;
    
    // =============================
    // 2. CONFIGURATION INITIALE
    // =============================
    
    // Définir la date minimum (demain)
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    const minDate = tomorrow.toISOString().split('T')[0];
    dateInput.min = minDate;
    
    // Initialiser la date par défaut (demain)
    dateInput.value = minDate;
    
    // Initialiser le compteur de caractères pour la description
    if (descriptionTextarea && charCount) {
        charCount.textContent = descriptionTextarea.value.length;
        
        descriptionTextarea.addEventListener('input', function() {
            charCount.textContent = this.value.length;
        });
    }
    
    // =============================
    // 3. GESTION DES CHAMPS DÉTAILS ALLERGIES/MALADIES
    // =============================
    
    // Allergies
    const allergiesOui = document.getElementById('allergies-oui');
    const allergiesNon = document.getElementById('allergies-non');
    const allergiesDetails = document.getElementById('allergies-details');
    const allergiesDescription = document.getElementById('allergies-description');
    const allergiesCharCount = document.getElementById('allergies-char-count');
    
    if (allergiesDescription && allergiesCharCount) {
        allergiesCharCount.textContent = allergiesDescription.value.length;
        
        allergiesDescription.addEventListener('input', function() {
            allergiesCharCount.textContent = this.value.length;
        });
    }
    
    allergiesOui.addEventListener('change', function() {
        if (this.checked) {
            allergiesDetails.style.display = 'block';
        }
    });
    
    allergiesNon.addEventListener('change', function() {
        if (this.checked) {
            allergiesDetails.style.display = 'none';
            if (allergiesDescription) {
                allergiesDescription.value = '';
                allergiesCharCount.textContent = '0';
            }
        }
    });
    
    // Maladies chroniques
    const maladiesOui = document.getElementById('maladies-oui');
    const maladiesNon = document.getElementById('maladies-non');
    const maladiesDetails = document.getElementById('maladies-details');
    const maladiesDescription = document.getElementById('maladies-description');
    const maladiesCharCount = document.getElementById('maladies-char-count');
    
    if (maladiesDescription && maladiesCharCount) {
        maladiesCharCount.textContent = maladiesDescription.value.length;
        
        maladiesDescription.addEventListener('input', function() {
            maladiesCharCount.textContent = this.value.length;
        });
    }
    
    maladiesOui.addEventListener('change', function() {
        if (this.checked) {
            maladiesDetails.style.display = 'block';
        }
    });
    
    maladiesNon.addEventListener('change', function() {
        if (this.checked) {
            maladiesDetails.style.display = 'none';
            if (maladiesDescription) {
                maladiesDescription.value = '';
                maladiesCharCount.textContent = '0';
            }
        }
    });
    
    // =============================
    // 4. GESTION DES ÉTAPES
    // =============================
    
    /**
     * Affiche une étape spécifique
     * @param {number} stepNumber - Numéro de l'étape à afficher
     */
    function showStep(stepNumber) {
        // Masquer toutes les étapes
        formSteps.forEach(step => {
            step.classList.remove('active');
        });
        
        // Afficher l'étape courante
        const currentStepElement = document.querySelector(`.form-step[data-step="${stepNumber}"]`);
        if (currentStepElement) {
            currentStepElement.classList.add('active');
            currentStep = stepNumber;
            updateProgressBar();
            updateRecap();
        }
        
        console.log(`Étape ${stepNumber} affichée`);
    }
    
    /**
     * Met à jour la barre de progression
     */
    function updateProgressBar() {
        // Mettre à jour les cercles
        progressSteps.forEach(step => {
            const stepNum = parseInt(step.getAttribute('data-step'));
            step.classList.remove('active', 'completed');
            
            if (stepNum < currentStep) {
                step.classList.add('completed');
            } else if (stepNum === currentStep) {
                step.classList.add('active');
            }
        });
        
        // Mettre à jour les labels
        stepLabels.forEach((label, index) => {
            label.classList.remove('active');
            if (index === currentStep - 1) {
                label.classList.add('active');
            }
        });
        
        // Mettre à jour la ligne de progression
        const progressLine = document.querySelector('.progress-bar::after');
        if (progressLine) {
            const percentage = ((currentStep - 1) / (totalSteps - 1)) * 100;
            document.documentElement.style.setProperty('--progress-width', `${percentage}%`);
        }
    }
    
    // =============================
    // 5. GESTION DES BOUTONS
    // =============================
    
    // Boutons "Suivant"
    nextButtons.forEach(button => {
        button.addEventListener('click', function() {
            if (validateStep(currentStep)) {
                if (currentStep < totalSteps) {
                    showStep(currentStep + 1);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                }
            }
        });
    });
    
    // Boutons "Précédent"
    prevButtons.forEach(button => {
        button.addEventListener('click', function() {
            if (currentStep > 1) {
                showStep(currentStep - 1);
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        });
    });
    
    // =============================
    // 6. VALIDATION DES ÉTAPES
    // =============================
    
    /**
     * Valide l'étape courante
     * @param {number} stepNumber - Numéro de l'étape à valider
     * @returns {boolean} - True si l'étape est valide
     */
    function validateStep(stepNumber) {
        let isValid = true;
        let errorMessage = '';
        
        switch(stepNumber) {
            case 1:
                // Valider le téléphone et email
                const telephone = document.getElementById('telephone').value;
                const email = document.getElementById('email').value;
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                
                if (!telephone || telephone.trim() === '' || telephone === '00 000 00 00') {
                    errorMessage = 'Veuillez saisir votre numéro de téléphone';
                    isValid = false;
                } else if (!email || email.trim() === '' || email === 'nom@exemple.com') {
                    errorMessage = 'Veuillez saisir votre adresse email';
                    isValid = false;
                } else if (!emailRegex.test(email)) {
                    errorMessage = 'Veuillez saisir une adresse email valide';
                    isValid = false;
                }
                break;
                
            case 2:
                // Valider la sélection du médecin
                const specialite = document.getElementById('specialite').value;
                const medecin = document.getElementById('medecin').value;
                const lieu = document.getElementById('lieu').value;
                
                if (!specialite) {
                    errorMessage = 'Veuillez sélectionner une spécialité';
                    isValid = false;
                } else if (!medecin) {
                    errorMessage = 'Veuillez sélectionner un médecin';
                    isValid = false;
                } else if (!lieu) {
                    errorMessage = 'Veuillez sélectionner un lieu de consultation';
                    isValid = false;
                }
                break;
                
            case 3:
                // Valider la date et l'heure
                const date = document.getElementById('date-rdv').value;
                const heure = document.getElementById('heure-rdv').value;
                
                if (!date) {
                    errorMessage = 'Veuillez sélectionner une date';
                    isValid = false;
                } else if (!heure) {
                    errorMessage = 'Veuillez sélectionner une heure';
                    isValid = false;
                }
                break;
                
            case 4:
                // Valider le motif
                const motif = document.getElementById('motif-principal').value;
                
                if (!motif) {
                    errorMessage = 'Veuillez sélectionner un motif de consultation';
                    isValid = false;
                }
                break;
                
            case 6:
                // Valider la confirmation
                const confirmation = document.getElementById('confirmation');
                if (!confirmation.checked) {
                    errorMessage = 'Veuillez confirmer l\'exactitude des informations';
                    isValid = false;
                }
                break;
        }
        
        if (!isValid && errorMessage) {
            showError(errorMessage);
        }
        
        return isValid;
    }
    
    /**
     * Met à jour le récapitulatif
     */
    function updateRecap() {
        // Récupérer toutes les valeurs
        const nom = document.getElementById('nom').value;
        const medecinSelect = document.getElementById('medecin');
        const medecin = medecinSelect.options[medecinSelect.selectedIndex]?.text || '';
        const lieuSelect = document.getElementById('lieu');
        const lieu = lieuSelect.options[lieuSelect.selectedIndex]?.text || '';
        const date = document.getElementById('date-rdv').value;
        const heureSelect = document.getElementById('heure-rdv');
        const heure = heureSelect.options[heureSelect.selectedIndex]?.text || '';
        const motifSelect = document.getElementById('motif-principal');
        const motif = motifSelect.options[motifSelect.selectedIndex]?.text || '';
        const urgenceSelect = document.getElementById('urgence-level');
        const urgence = urgenceSelect.options[urgenceSelect.selectedIndex]?.text || 'Normal';
        
        // Formater la date
        let formattedDate = 'Non spécifiée';
        if (date) {
            const dateObj = new Date(date);
            const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
            formattedDate = dateObj.toLocaleDateString('fr-FR', options);
        }
        
        // Allergies
        let allergies = 'Non';
        let allergiesDesc = '';
        if (document.getElementById('allergies-oui').checked) {
            allergies = 'Oui';
            allergiesDesc = document.getElementById('allergies-description').value;
            if (allergiesDesc.trim() !== '') {
                allergies += ' : ' + (allergiesDesc.length > 50 ? allergiesDesc.substring(0, 47) + '...' : allergiesDesc);
            }
        }
        
        // Maladies chroniques
        let maladies = 'Non';
        let maladiesDesc = '';
        if (document.getElementById('maladies-oui').checked) {
            maladies = 'Oui';
            maladiesDesc = document.getElementById('maladies-description').value;
            if (maladiesDesc.trim() !== '') {
                maladies += ' : ' + (maladiesDesc.length > 50 ? maladiesDesc.substring(0, 47) + '...' : maladiesDesc);
            }
        }
        
        // Mettre à jour les éléments du récapitulatif
        document.getElementById('recap-nom').textContent = nom;
        document.getElementById('recap-medecin').textContent = medecin;
        document.getElementById('recap-lieu').textContent = lieu;
        document.getElementById('recap-date').textContent = formattedDate;
        document.getElementById('recap-heure').textContent = heure;
        document.getElementById('recap-motif').textContent = motif;
        document.getElementById('recap-allergies').textContent = allergies;
        document.getElementById('recap-maladies').textContent = maladies;
        document.getElementById('recap-urgence').textContent = urgence;
    }
    
    // =============================
    // 7. GESTION DU SUBMIT (REDIRECTION VERS rdv.html)
    // =============================
    
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        
        // Valider la dernière étape
        if (!validateStep(6)) {
            return;
        }
        
        // Soumettre le rendez-vous (avec redirection immédiate)
        submitAppointment();
    });
    
    /**
     * Soumet le rendez-vous et redirige vers rdv.html
     */
    function submitAppointment() {
        // Récupérer toutes les données
        const formData = {
            patient: document.getElementById('nom').value,
            patientId: document.getElementById('id-patient').value,
            telephone: document.getElementById('telephone').value,
            email: document.getElementById('email').value,
            specialite: document.getElementById('specialite').value,
            medecin: document.getElementById('medecin').value,
            medecinText: document.getElementById('medecin').options[document.getElementById('medecin').selectedIndex]?.text,
            lieu: document.getElementById('lieu').value,
            lieuText: document.getElementById('lieu').options[document.getElementById('lieu').selectedIndex]?.text,
            date: document.getElementById('date-rdv').value,
            heure: document.getElementById('heure-rdv').value,
            heureText: document.getElementById('heure-rdv').options[document.getElementById('heure-rdv').selectedIndex]?.text,
            motif: document.getElementById('motif-principal').value,
            motifText: document.getElementById('motif-principal').options[document.getElementById('motif-principal').selectedIndex]?.text,
            description: document.getElementById('description').value,
            allergies: document.querySelector('input[name="allergies"]:checked')?.value,
            allergiesDescription: document.getElementById('allergies-description').value,
            maladies: document.querySelector('input[name="maladies"]:checked')?.value,
            maladiesDescription: document.getElementById('maladies-description').value,
            urgence: document.getElementById('urgence-level').value,
            urgenceText: document.getElementById('urgence-level').options[document.getElementById('urgence-level').selectedIndex]?.text,
            timestamp: new Date().toISOString(),
            status: 'upcoming'
        };
        
        // Formater la date pour l'affichage
        const dateObj = new Date(formData.date);
        const formattedDate = dateObj.toLocaleDateString('fr-FR', { day: 'numeric', month: 'numeric', year: 'numeric' });
        
        // Créer un ID unique pour le rendez-vous
        const appointmentId = 'RDV-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9);
        
        // Créer l'objet rendez-vous
        const newAppointment = {
            id: appointmentId,
            doctor: formData.medecinText,
            date: formattedDate,
            heure: formData.heureText,
            motif: formData.motifText,
            lieu: formData.lieuText,
            status: 'upcoming',
            timestamp: formData.timestamp,
            details: formData
        };
        
        // Enregistrer dans le localStorage
        const appointments = JSON.parse(localStorage.getItem('mediconnect_appointments') || '[]');
        appointments.unshift(newAppointment); // Ajouter au début
        localStorage.setItem('mediconnect_appointments', JSON.stringify(appointments));
        
        // Afficher un message de confirmation rapide
        showSuccess('Rendez-vous confirmé !');
        
        // Rediriger VERS rdv.html après un court délai
        setTimeout(() => {
            window.location.href = 'rdv.html';
        }, 800); // Court délai pour voir le message
    }
    
    // =============================
    // 8. FONCTIONS UTILITAIRES
    // =============================
    
    /**
     * Affiche un message d'erreur
     * @param {string} message - Message d'erreur
     */
    function showError(message) {
        // Supprimer les messages existants
        const existingMessages = document.querySelectorAll('.error-message, .success-message');
        existingMessages.forEach(msg => msg.remove());
        
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.innerHTML = `
            <i class="fas fa-exclamation-circle"></i>
            <span>${message}</span>
            <button class="message-close">×</button>
        `;
        
        document.body.appendChild(errorDiv);
        
        // Gérer la fermeture
        const closeBtn = errorDiv.querySelector('.message-close');
        closeBtn.addEventListener('click', function() {
            errorDiv.style.animation = 'fadeOut 0.3s ease';
            setTimeout(() => {
                if (errorDiv.parentNode) {
                    errorDiv.remove();
                }
            }, 300);
        });
        
        // Supprimer après 5 secondes
        setTimeout(() => {
            if (errorDiv.parentNode) {
                errorDiv.style.animation = 'fadeOut 0.3s ease';
                setTimeout(() => {
                    if (errorDiv.parentNode) {
                        errorDiv.remove();
                    }
                }, 300);
            }
        }, 5000);
    }
    
    /**
     * Affiche un message de succès
     * @param {string} message - Message de succès
     */
    function showSuccess(message) {
        // Supprimer les messages existants
        const existingMessages = document.querySelectorAll('.error-message, .success-message');
        existingMessages.forEach(msg => msg.remove());
        
        const successDiv = document.createElement('div');
        successDiv.className = 'success-message';
        successDiv.innerHTML = `
            <i class="fas fa-check-circle"></i>
            <span>${message}</span>
        `;
        
        document.body.appendChild(successDiv);
        
        // Le message disparaîtra automatiquement lors de la redirection
    }
    
    // =============================
    // 9. ÉVÉNEMENTS DIVERS
    // =============================
    
    // Mettre à jour le récapitulatif quand les valeurs changent
    const inputsToWatch = [
        'specialite', 'medecin', 'lieu', 'date-rdv', 'heure-rdv', 'motif-principal',
        'description', 'allergies-oui', 'allergies-non', 'allergies-description',
        'maladies-oui', 'maladies-non', 'maladies-description', 'urgence-level'
    ];
    
    inputsToWatch.forEach(inputId => {
        const input = document.getElementById(inputId);
        if (input) {
            if (input.type === 'radio' || input.type === 'checkbox') {
                input.addEventListener('change', updateRecap);
            } else {
                input.addEventListener('input', updateRecap);
            }
        }
    });
    
    // Écouter les changements sur les sélecteurs
    document.querySelectorAll('select').forEach(select => {
        select.addEventListener('change', updateRecap);
    });
    
    // =============================
    // 10. INITIALISATION FINALE
    // =============================
    
    // Mettre à jour la barre de progression
    updateProgressBar();
    
    // Mettre à jour le récapitulatif
    updateRecap();
    
    console.log('Formulaire de rendez-vous initialisé');
});