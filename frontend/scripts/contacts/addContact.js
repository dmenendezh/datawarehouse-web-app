btnSaveContact.addEventListener("click",  async (e) => {   
    const name = document.getElementById('inputContactName');
    const surname = document.getElementById('inputContactSurName');
    const charge = document.getElementById('inputCargo');
    const email = document.getElementById('inputContactEmail');
    const company_id = document.getElementById('cmbContactCompany');
    const region_id = document.getElementById('contactCmbRegion');
    const country_id = document.getElementById('contactCmbCountry');
    const city_id = document.getElementById('contactCmbCity');
    const address = document.getElementById('inputContactAddress');
    const interest = document.getElementById('slider');
    const photo = document.getElementById('photo');
    
    const dataContact = {
        contact_name: name.value,
        contact_surname: surname.value,
        contact_charge: charge.value,
        contact_email: email.value,
        company_id: company_id.value,
        region_id: region_id.value,
        country_id: country_id.value,
        city_id: city_id.value,
        contact_address: address.value,
        contact_interest:  interest.value
        
    }  
    

    const options = {
        method: 'POST',
        body: JSON.stringify(dataContact),
        headers: {    
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': '*'}
    }
    
    const response = await fetch('http://localhost:3000/contacts/createContact', options)
    const data = await response.json()
    console.log(data);
    if (response.status === 201) {
        swal({
            title: "Contacto agregado existosamente",
            text: "",
            type: "success",
            timer: 3000,
            showConfirmButton: true
          }, function(){
                window.location.href = "dashboard.html";
          });

    }else{
        swal({
            title: "Error",
            text: "Ha ocurrido un error. Contactase con el adminstrador",
            type: "error",
            timer: 3000,
            showConfirmButton: true
          }, function(){
                window.location.href = "dashboard.html";
          });
    }
});

