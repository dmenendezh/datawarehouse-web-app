$btnEditUser.addEventListener('click', async (event) => {
    const usuario = inputUsuLoginHidden.value;
    const dataUser = {
        usr_login: inputEditUser.value,
        usr_name: inputEditUserName.value,
        usr_surname: inputEditUsrSurname.value,
        usr_email: inputEditUsrEAddress.value,
        usr_admin_flag: cmbEditPerfil.value,
        usr_password: inputEditPassword.value
    }

    let token = sessionStorage.getItem('Tokenizer');

    const options = {
        method: 'PUT',
        body: JSON.stringify(dataUser),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': '*',
            'Authorization': token
        }
    }

    const endpoint = `http://localhost:3000/users/editUser/${usuario}`;
    const response = await fetch(endpoint, options)
    const data = await response.json();
    if (response.status === 201) {
        swal({
            title: "Usuario modificado existosamente",
            text: "",
            type: "success",
            timer: 3000,
            showConfirmButton: true
        }, function() {
            window.location.href = "users.html";
        });
    }else if (response.status === 403) {
        swal({
            title: "Error",
            text: "No tiene los permisos necesarios para realizar esta acción",
            type: "error",
            timer: 5000,
            showConfirmButton: true
        }, function() {
            window.location.href = "index.html";
        });

    }
});

async function editUser(usuario) {
    layoutEdit_Users.classList.remove('hidden');
    $cardHeader.classList.add('hidden');

    let token = sessionStorage.getItem('Tokenizer');

    const options = {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': '*',
            'Authorization': token

        }
    }

    const endpoint = `http://localhost:3000/users/searchUser/${usuario}`;
    const response = await fetch(endpoint, options)
    const data = await response.json()

    if (response.status === 200) {
        console.log(data);

        for (let i = 0; i < data.quantity; i++) {
            inputEditUser.setAttribute("value", data.usr[i].usr_login);
            inputUsuLoginHidden.setAttribute("value", data.usr[i].usr_login);
            inputEditUserName.setAttribute("value", data.usr[i].usr_name);
            inputEditUsrSurname.setAttribute("value", data.usr[i].usr_surname);
            inputEditUsrEAddress.setAttribute("value", data.usr[i].usr_email);
            if (data.usr[i].usr_admin_flag == 0) {
                optioneditno.setAttribute("selected", "true");
            } else {
                optionedityes.setAttribute("selected", "true");
            }

            inputEditPassword.setAttribute("value", data.usr[i].usr_password);
        }

    }
}