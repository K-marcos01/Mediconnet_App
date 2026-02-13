<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Espace Médecin</title>
    <link rel="stylesheet" href="Style_RDV.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <link rel="stylesheet" href="../Include/Header_médecin.css">
    <link rel="stylesheet" href="../Include/Footer_médecin.css">
</head>

<body>
    <?php include '../Include/Header_médecin.html'; ?>

    <h1 class="titre">Espace Médecin — Rendez-vous</h1>

    <div class="container">

        <section class="carte">
            <h2>Rendez-vous par médecin</h2>
            <select id="selectMedecin" class="select-medecin">
                <option value="yekola">Dr. Danielle YEKOLA</option>
                <option value="lombaka">Dr. Nick LOMBAKA</option>
                <option value="gomez">Dr. Claricia GOMEZ</option>
                <option value="nguie">Dr. Karim NGUIE</option>
            </select>
                <div class="rdv">
                <p><strong>Patient :</strong>Allegra OKEMBA </p>
                <p>15/06/2025 — 09h30</p>
                <p>Motif : Fièvre</p>
            </div>
            <div class="rdv">
                <p><strong>Patient :</strong>Marie DUBOIS </p>
                <p>02/12/2025 — 10h00</p>
                <p>Motif : Tension</p>
            </div>
            <div class="rdv">
                <p><strong>Patient :</strong>Jean LEROY</p>
                <p>05/07/2025 — 11h15</p>
                <p>Motif : Éruption cutanée</p>
            </div>
        </section>

    </div>
    <?php include '../Include/Footer_médecin.html'; ?>
</body>
</html>
