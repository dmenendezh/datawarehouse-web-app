async function removeCompany(companyId) {
  swal({
          title: "¿Está seguro?",
          text: "La compañia será eliminada del sistema",
          type: "warning",
          showCancelButton: true,
          confirmButtonClass: "btn-danger",
          confirmButtonText: "Si, eliminarla!",
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

          const endpoint = `http://localhost:3000/companies/removeCompany/${companyId}`
          const response = await fetch(endpoint, options)
          const data = await response.json()
          if (response.status === 201) {

              swal({
                  title: "Compañia borrada existosamente",
                  text: "",
                  type: "success",
                  timer: 3000,
                  showConfirmButton: true
              }, function() {
                  window.location.href = "companys.html";
              });

          } else {
              swal({
                  title: "Error",
                  text: "La compañia posee dependencias activas.",
                  type: "error",
                  timer: 3000,
                  showConfirmButton: true
              }, function() {
                  window.location.href = "companys.html";
              });
          }
      });
}