sessionStorage.clear();
const mail = document.getElementById('inputEmailAddress');
const pwd = document.getElementById('inputPassword');

$btnLogin.addEventListener('click', (event) => {
    event.preventDefault();
    loginUser();
});

async function loginUser() {
    const user = {
        usrmail: mail.value,
        password: pwd.value,
    }
    const options = {
        method: 'POST',
        body: JSON.stringify(user),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': '*'
        }
    }

    const response = await fetch('http://localhost:3000/users/login', options)
    const data = await response.json()
    if (response.status === 200) {
        console.log(data);
        saveToken(data);
        window.location.href = 'dashboard.html';
    }else{
        swal({
            title: "Acceso denegado",
            text: "Usuario o contraseña ingresada son incorrectos.",
            type: "error",
            timer: 3000,
            showConfirmButton: true
        }, function() {
            window.location.reload;
        });
    }
}


function saveToken(data) {
    console.log(data)
    console.log(JSON.stringify(data))

    sessionStorage.setItem('Token', JSON.stringify(data))
    sessionStorage.setItem('Tokenizer', data.token)
}