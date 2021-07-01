let SELECTED_CONTACTS = [];

$(document).on('change', 'input[type="checkbox"]', function(e) {
    const index = this.attributes[1].value;
    const checked = this.checked;

    if (checked) {
        document.querySelectorAll(".tr_" + index)[0].classList.add("selectRowTable");
        SELECTED_CONTACTS.push(index);
    } else {
        document.querySelectorAll(".tr_" + index)[0].classList.remove("selectRowTable");
        SELECTED_CONTACTS.splice(index);
    }


    let cont = 0;
    jQuery("td").each( //selecciono las td con id que comience por "columna_"
    function(){ 
        checks = $(this).find(':checkbox').length  //por cada una de las columnas busco los checkboxs q tienen dentro
        if(checks == 1){
            if($(this).find(':checkbox')[0].checked){
                cont++;
            }
        }
    });

    if (cont >= 2) {
        document.querySelectorAll(".remove-selected-users")[0].classList.remove("hidden");
    } else {
        document.querySelectorAll(".remove-selected-users")[0].classList.add("hidden");
    }

  

    document.getElementById("txtCountContacts").innerHTML = "Contactos seleccionados: "+ cont; 

});

async function removeUsersSelected() {
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
        for (let i = 0; i < SELECTED_CONTACTS.length; i++) {
            let index = SELECTED_CONTACTS[i];
            const EMAIL_USER = document.querySelectorAll(".tr_" + index)[0].childNodes[3].children[1].innerText;
    
            const options = {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Headers': '*'
                }
            }
    
            const endpoint = `http://localhost:3000/contacts/deleteSelectedContacts/${EMAIL_USER}`
            const response = await fetch(endpoint, options)
            const DEL_CONTACTS = await response.json()
            if (response.status === 200) {
                console.log("resultado");
                console.log(DEL_CONTACTS);
            }
        }
        window.location.href = 'dashboard.html';

      });



}