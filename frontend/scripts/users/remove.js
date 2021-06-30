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

        let token = sessionStorage.getItem('Tokenizer');


        const options = {
            method: 'DELETE',
            headers: {    
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': '*',
                'Authorization': token
              }
        }   
    
        const endpoint = `http://localhost:3000/users/deleteUser/${usuario}`
        const response = await fetch(endpoint, options)
        const DEL_CONTACTS = await response.json()
        if (response.status === 201) {
            swal({
                title: "Usuario eliminado existosamente",
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
}

