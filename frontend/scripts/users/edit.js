async function editUser (usuario) {
    $layoutAuthentication_content.classList.remove('hidden');
    $cardHeader.classList.add('hidden');
    
    console.log('editando: '+ usuario);
    const options = {
        method: 'GET',
        headers: {    
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': '*'}
    }

    const endpoint = `http://localhost:3000/users/searchUser/${usuario}`;
    const response = await fetch(endpoint, options)
    const data = await response.json()
    
    if (response.status === 200) {
        console.log(data);

        for (let i = 0; i < data.quantity; i++) {
            console.log("recorriendo");          
            console.log(data.usr[i].usr_login);         
            console.log(data.usr[i].usr_name);          
            console.log(data.usr[i].usr_surname);          
            console.log(data.usr[i].usr_email);            
            console.log();          

            $inputUsrLogin.setAttribute("value", data.usr[i].usr_login);
            $inputUsrName.setAttribute("value", data.usr[i].usr_name);
            $inputUsrSurname.setAttribute("value", data.usr[i].usr_surname);
            $inputUsrEAddress.setAttribute("value", data.usr[i].usr_email);
            if(data.usr[i].usr_admin_flag == 0){
                $comboNo.setAttribute("selected", "true");
            }else{
                $comboSi.setAttribute("selected", "true");
            }
            
            $inputPassword.setAttribute("value", data.usr[i].usr_password);
        } 
        
    }
}