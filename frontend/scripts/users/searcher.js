$userSearcher.addEventListener('keyup', (event) => {
    getSearch();
});

const getSearch = async () => {
    const value = $userSearcher.value;

    event.preventDefault();

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

    let endpoint = `http://localhost:3000/users/searchUser/${value}`;
    if (value == '') {
        endpoint = `http://localhost:3000/users/listall`;
    }

    const response = await fetch(endpoint, options);
    const data = await response.json()

    if (response.status === 200) {
        console.log("resultado");
        console.log(data);
        console.log(data.quantity);
        $dataTable.innerHTML = '';

        if (data.quantity == 0) {
            const usrContainer = document.createElement('div');
            usrContainer.innerHTML = `            
            No existen coincidencias con el nombre ingresado`;
            $dataTable.appendChild(usrContainer);
        }

        for (let i = 0; i < data.quantity; i++) {
            console.log(data.usr[i].usr_login);
            let profile = "";
            if (data.usr[i].usr_admin_flag == 1) {
                profile = "Administrador";
            } else {
                profile = "Básico";
            }

            const usrContainer = document.createElement('tbody');

            usrContainer.innerHTML = `            
            <tr>
                <td>${data.usr[i].usr_login}</td>
                <td>${data.usr[i].usr_name}</td>
                <td>${data.usr[i].usr_surname}</td>
                <td>${data.usr[i].usr_email}</td>
                <td>${profile}</td>
                <td><a onclick="editUser('${data.usr[i].usr_login}')"><i class="fas fa-edit"></i></a> | <a onclick="removeUser('${data.usr[i].usr_login}')"><i class="fas fa-user-times"></i></a></td>                
            </tr>
			`;
            $dataTable.appendChild(usrContainer);
        }
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
};