const usrlogin = document.getElementById('inputUsrLogin');
const usrname = document.getElementById('inputUsrName');
const usr_surname = document.getElementById('inputUsrSurname');
const usr_email = document.getElementById('inputUsrEAddress');
const usr_profile = document.getElementById('cmbPerfil');
const password = document.getElementById('inputPassword');
const repeatPwd = document.getElementById('inputRepeatPwd');


$btnCreate.addEventListener('click', (event) =>{
    $layoutAuthentication_content.classList.remove('hidden');
    $cardHeader.classList.add('hidden');
});

$btnRegister.addEventListener('click', (event) =>{
    event.preventDefault();
    registerUser();
});

async function registerUser() {
    const user = {
        usr_login: usrlogin.value,
        usr_name: usrname.value,
        usr_surname: usr_surname.value,
        usr_email: usr_email.value,
        usr_admin_flag: usr_profile.value,
        usr_password: password.value
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

    const response = await fetch('http://localhost:3000/users/register', options)
    const data = await response.json()
    console.log(data);
    if (response.status === 201) {
        swal({
            title: "Usuario registrado existosamente",
            text: "",
            type: "success",
            timer: 3000,
            showConfirmButton: true
          }, function(){
                window.location.href = "users.html";
          });
    }else{
        swal({
            title: "Error",
            text: "Ha ocurrido un error. Contactese con el adminitrador del sistema",
            type: "error",
            timer: 3000,
            showConfirmButton: true
          }, function(){
                window.location.href = "users.html";
          });
    }
}
