async function removeContact(contactId) {

  swal({
          title: "¿Está seguro?",
          text: "El contacto será eliminado del sistema",
          type: "warning",
          showCancelButton: true,
          confirmButtonClass: "btn-danger",
          confirmButtonText: "Si, eliminarlo!",
          closeOnConfirm: false
      },
      async function() {
          const options = {
              method: 'DELETE',
              headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json',
                  'Access-Control-Allow-Origin': '*',
                  'Access-Control-Allow-Headers': '*'
              }
          }

          const endpoint = `http://localhost:3000/contacts/removeContact/${contactId}`
          const response = await fetch(endpoint, options)
          const data = await response.json()
          if (response.status === 201) {

              swal({
                  title: "Contacto borrado existosamente",
                  text: "",
                  type: "success",
                  timer: 3000,
                  showConfirmButton: true
              }, function() {
                  window.location.href = "dashboard.html";
              });

          } else {
              swal({
                  title: "Error",
                  text: "Ha ocurrido un error. Contactase con el adminstrador",
                  type: "error",
                  timer: 3000,
                  showConfirmButton: true
              }, function() {
                  window.location.href = "dashboard.html";
              });
          }
      });


}