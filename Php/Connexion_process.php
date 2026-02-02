<?php
session_start();
require_once 'Config.php';
header('Content-Type: application/json');

$email = $_POST['email'] ?? '';
$pass = $_POST['password'] ?? '';

$stmt = $pdo->prepare("SELECT * FROM utilisateurs WHERE email = ?");
$stmt->execute([$email]);
$user = $stmt->fetch();

if ($user && password_verify($pass, $user['mot_de_passe'])) {
    $_SESSION['user'] = $user;
    
    $target = ($user['role'] === 'medecin') ? '../Php/dashboard.php' : '../Php/Page_d_Acceuil.php';
    
    echo json_encode(['status' => 'success', 'redirect' => $target]);
} else {
    echo json_encode(['status' => 'error', 'message' => 'Identifiants incorrects']);
}
?>