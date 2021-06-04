async function removeUser (usuario) {
    const opcion = confirm("¿Está seguro de que desea eliminar el usuario?");
    
    if(opcion === true){//doy de baja
        const options = {
            method: 'DELETE',
            headers: {    
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': '*'}
        }   
    
        const endpoint = `http://localhost:3000/users/deleteUser/${usuario}`
        const response = await fetch(endpoint, options)
        const DEL_CONTACTS = await response.json()
        if (response.status === 201) {
            window.location.href = 'users.html';
        }    
    }else{//no hago nada
        window.location.href = 'users.html';
    }
}

