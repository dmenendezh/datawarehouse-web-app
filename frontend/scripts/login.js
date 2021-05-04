sessionStorage.clear();
const username = document.getElementById('inputEmailAddress');
const password = document.getElementById('inputPassword');

$btnLogin.addEventListener('click', (event) =>{
    event.preventDefault();
    loginUser()
});

async function loginUser() {
    const user = {
        username: username.value,
        password: password.value,
    }
    const options = {
        method: 'POST',
        body: JSON.stringify(user),
        headers: {    
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': '*'}
    }

    console.log(user);

    const response = await fetch('http://localhost:3000/users/login', options)
    const data = await response.json()
    if (response.status === 200) {
        console.log(data);
        saveToken(data);
        window.location.href = 'dashboard.html';
    }
}


function saveToken(data) {
    sessionStorage.setItem('Token', JSON.stringify(data))
}
