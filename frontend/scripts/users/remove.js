async function removeUser (usuario) {
    swal({
        title: "¿Está seguro?",
        text: "El usuario será eliminado del sistema",
        type: "warning",
        showCancelButton: true,
        confirmButtonClass: "btn-danger",
        confirmButtonText: "Si, eliminarlo!",
        closeOnConfirm: false
      },
      async function(){
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
      });
}

