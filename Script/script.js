function toggleForm(type) {
    const loginForm = document.getElementById('form-login');
    const signupForm = document.getElementById('form-signup');
    const tabLogin = document.getElementById('tab-login');
    const tabSignup = document.getElementById('tab-signup');

    if (type === 'login') {
        loginForm.style.display = 'flex';
        signupForm.style.display = 'none';
        tabLogin.classList.add('active');
        tabSignup.classList.remove('active');
    } else {
        loginForm.style.display = 'none';
        signupForm.style.display = 'flex';
        tabLogin.classList.remove('active');
        tabSignup.classList.add('active');
    }
}

function detectRole() {
    const code = document.getElementById('code_invite').value.toUpperCase();
    const specGroup = document.getElementById('spec-group');
    specGroup.style.display = (code === 'MED123') ? 'block' : 'none';
}

document.querySelectorAll('form').forEach(form => {
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // URL pointant vers le dossier Php depuis le dossier Html
        const isLogin = form.id === 'form-login';
        const url = isLogin ? '../Php/Connexion_process.php' : '../Php/Inscription_process.php';
        
        try {
            const response = await fetch(url, {
                method: 'POST',
                body: new FormData(form)
            });

            const result = await response.json();
            
            if (result.status === 'success') {
                // Redirection vers le fichier indiqué par le PHP
                window.location.href = result.redirect;
            } else {
                alert(result.message);
            }
        } catch (error) {
            console.error("Erreur:", error);
            alert("Impossible de contacter le serveur.");
        }
    });
});