<?php
session_start();
require_once 'Config.php';
header('Content-Type: application/json');

$nom = $_POST['nom'] ?? '';
$prenom = $_POST['prenom'] ?? '';
$email = $_POST['email'] ?? '';
$pass = password_hash($_POST['password'] ?? '', PASSWORD_DEFAULT);
$code = strtoupper($_POST['code_invite'] ?? '');

$role = 'patient';
$spec = null;
$redirect = '../Php/Page_d_Acceuil.php';

if ($code === 'MED123') {
    $role = 'medecin';
    $spec = $_POST['specialite'] ?? 'Généraliste';
    $redirect = '../Php/dashboard.php';
}

try {
    $stmt = $pdo->prepare("INSERT INTO utilisateurs (nom, prenom, email, mot_de_passe, role, specialite) VALUES (?,?,?,?,?,?)");
    $stmt->execute([$nom, $prenom, $email, $pass, $role, $spec]);
    
    
    // Connexion automatique
    $_SESSION['user'] = ['nom' => $nom, 'prenom' => $prenom, 'role' => $role, 'specialite' => $spec];
    
    echo json_encode(['status' => 'success', 'redirect' => $redirect]);
} catch (Exception $e) {
    echo json_encode(['status' => 'error', 'message' => 'Email déjà utilisé']);
}
?>