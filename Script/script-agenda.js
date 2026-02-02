
        // Variables globales
        let currentDate = new Date();
        let currentView = 'month';

        // Initialisation
        document.addEventListener('DOMContentLoaded', function() {
            updateCalendar();
            setupEventListeners();
            
            // Initialisation menu burger
            const menuToggle = document.querySelector('.menu-toggle');
            const doctorNav = document.querySelector('.doctor-nav');
            
            if (menuToggle && doctorNav) {
                menuToggle.addEventListener('click', function() {
                    doctorNav.classList.toggle('active');
                    const icon = this.querySelector('i');
                    icon.className = doctorNav.classList.contains('active') ? 'fas fa-times' : 'fas fa-bars';
                });
            }
        });

        function setupEventListeners() {
            // Navigation
            document.getElementById('prevMonth').addEventListener('click', function() {
                currentDate.setMonth(currentDate.getMonth() - 1);
                updateCalendar();
            });

            document.getElementById('nextMonth').addEventListener('click', function() {
                currentDate.setMonth(currentDate.getMonth() + 1);
                updateCalendar();
            });

            document.getElementById('todayBtn').addEventListener('click', function() {
                currentDate = new Date();
                updateCalendar();
            });

            // Changement de vue
            document.querySelectorAll('.btn-view').forEach(btn => {
                btn.addEventListener('click', function() {
                    document.querySelectorAll('.btn-view').forEach(b => b.classList.remove('active'));
                    this.classList.add('active');
                    currentView = this.dataset.view;
                    updateCalendar();
                });
            });
        }

        function updateCalendar() {
            updateMonthDisplay();
            generateCalendarGrid();
        }

        function updateMonthDisplay() {
            const monthNames = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin",
                "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"];
            const year = currentDate.getFullYear();
            const month = currentDate.getMonth();
            
            document.getElementById('currentMonth').textContent = 
                `${monthNames[month]} ${year}`;
            
            // Mettre à jour la date sélectionnée
            const today = new Date();
            if (today.toDateString() === currentDate.toDateString()) {
                document.getElementById('selectedDate').textContent = "Aujourd'hui";
            } else {
                document.getElementById('selectedDate').textContent = 
                    currentDate.toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' });
            }
        }

        function generateCalendarGrid() {
            const calendarGrid = document.getElementById('calendarGrid');
            calendarGrid.innerHTML = '';

            const year = currentDate.getFullYear();
            const month = currentDate.getMonth();
            const firstDay = new Date(year, month, 1);
            const lastDay = new Date(year, month + 1, 0);
            
            // Jours du mois précédent
            const firstDayOfWeek = firstDay.getDay() === 0 ? 6 : firstDay.getDay() - 1;
            const prevMonthLastDay = new Date(year, month, 0).getDate();
            
            // Jours du mois suivant
            const totalCells = 42; // 6 semaines
            const today = new Date();

            for (let i = 0; i < totalCells; i++) {
                const dayElement = document.createElement('div');
                dayElement.className = 'calendar-day';
                
                let day, isCurrentMonth, isToday, hasAppointment;
                
                if (i < firstDayOfWeek) {
                    // Jour du mois précédent
                    day = prevMonthLastDay - firstDayOfWeek + i + 1;
                    isCurrentMonth = false;
                    isToday = false;
                } else if (i < firstDayOfWeek + lastDay.getDate()) {
                    // Jour du mois courant
                    day = i - firstDayOfWeek + 1;
                    isCurrentMonth = true;
                    isToday = day === today.getDate() && 
                               month === today.getMonth() && 
                               year === today.getFullYear();
                    // Simuler des rendez-vous certains jours
                    hasAppointment = day % 3 === 0 || day % 5 === 0;
                } else {
                    // Jour du mois suivant
                    day = i - firstDayOfWeek - lastDay.getDate() + 1;
                    isCurrentMonth = false;
                    isToday = false;
                }

                dayElement.innerHTML = `
                    <div class="day-number ${!isCurrentMonth ? 'other-month' : ''} ${isToday ? 'today' : ''}">
                        ${day}
                    </div>
                    ${hasAppointment ? '<div class="appointment-dot"></div>' : ''}
                `;

                if (isCurrentMonth) {
                    dayElement.addEventListener('click', function() {
                        selectDay(day);
                    });
                }

                calendarGrid.appendChild(dayElement);
            }
        }

        function selectDay(day) {
            currentDate.setDate(day);
            updateMonthDisplay();
            
            // Ajouter un effet visuel de sélection
            document.querySelectorAll('.calendar-day').forEach(el => {
                el.classList.remove('selected');
            });
            
            // Dans une version réelle, on chargerait les rendez-vous du jour sélectionné
            alert(`Jour ${day} sélectionné - Chargement des rendez-vous...`);
        }

        // Fonctions d'action
        function nouveauRendezVous() {
            alert('Création d\'un nouveau rendez-vous');
        }

        function importerAgenda() {
            alert('Importation d\'agenda');
        }

        function exporterAgenda() {
            alert('Exportation de l\'agenda');
        }