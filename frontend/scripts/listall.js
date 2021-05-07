listallUsers();

async function listallUsers() {
   
    const options = {
        method: 'GET',
        headers: {    
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': '*'}
    }

    const response = await fetch('http://localhost:3000/users/listall', options)
    const data = await response.json()
    if (response.status === 200) {
        console.log("resultado");
       // console.log(data);
       // console.log(data.quantity);

        for (let i = 0; i < data.quantity; i++) {
            console.log(data.usr[i].usr_login);
            let profile = "";
            if(data.usr[i].usr_admin_flag == 1){
                profile = "Administrador";
            }else{
                profile = "Básico";
            }
			const usrContainer = document.createElement('tbody');
			usrContainer.innerHTML = `            
            <tr>
                <td><input type="checkbox"></td>
                <td>${data.usr[i].usr_login}</td>
                <td>${data.usr[i].usr_name}</td>
                <td>${data.usr[i].usr_surname}</td>
                <td>${data.usr[i].usr_email}</td>
                <td>${profile}</td>                
            </tr>
			`;
			$dataTable.appendChild(usrContainer);
		}


    }
}