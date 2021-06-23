async function editCompany(companyId){
    document.getElementById("layoutEdit_Company").removeAttribute("hidden");
    document.getElementById("cardHeader").setAttribute("hidden",true);

    const options = {
        method: 'GET',
        headers: {    
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': '*'}
    }

    const endpoint = `http://localhost:3000/companies/listCompanyById/${companyId}`;
    const response = await fetch(endpoint, options)
    const data = await response.json()
    
    if (response.status === 200) {
        console.log(data);
        console.log(data.company[0].company_id);
        console.log( data.company[0].company_name);
        console.log(data.company[0].company_address);
        console.log(data.company[0].company_email);
        console.log(data.company[0].city_id);


        document.getElementById("hiddenIdCompany").setAttribute("value", data.company[0].company_id);
        document.getElementById("inputEditNombre").setAttribute("value", data.company[0].company_name)
        document.getElementById("inputEditDireccion").setAttribute("value", data.company[0].company_address)
        document.getElementById("inputEditMail").setAttribute("value", data.company[0].company_email)

        
        const options3 = {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': '*'
            }
        }
        limpiar(cmbEditCiudad);

        const response3 = await fetch(`http://localhost:3000/regions/listCityById/${data.company[0].city_id}`, options3)
        const data3 = await response3.json()
        if (response3.status === 200) {
            console.log("resultado");
            for (let i = 0; i < data3.quantity; i++) {
                        const cityName = data3.cities[i].city_name;
                        const cityId = data3.cities[i].city_id;
            
                        const option = document.createElement('option');
                        option.setAttribute('value',cityId);
                        option.innerHTML = `${cityName}`;
                        cmbEditCiudad.appendChild(option);
                                  
            }
        }

        const options_cities = {
            method: 'GET',
            headers: {    
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': '*'}
        }
            
        const endpoint_cities = `http://localhost:3000/regions/listCities`
        const response_cities = await fetch(endpoint_cities, options_cities)
        const data_cities = await response_cities.json()
        if (response_cities.status === 200) {
            
            for (let i = 0; i < data_cities.quantity; i++) {
                const cityName_2 = data_cities.cities[i].city_name;
                const cityId_2 = data_cities.cities[i].city_id;
    
                if(cityId_2 != data.company[0].city_id){
                    const option = document.createElement('option');
                    option.setAttribute('value',cityId_2);
                    option.innerHTML = `${cityName_2}`;
                    cmbEditCiudad.appendChild(option);
                }

            }

            
        }
    }
    
}

btnBackEdit.addEventListener("click", e => {   
    window.location.reload();   
});


btnEditCompany.addEventListener("click", async (event) => {   
    const company_id = hiddenIdCompany.value;

    const dataUser = {
        company_name: inputEditNombre.value,
        company_address: inputEditDireccion.value,
        company_email: inputEditMail.value,
        city_id: cmbEditCiudad.value        
    }

    const options = {
        method: 'PUT',
        body: JSON.stringify(dataUser),
        headers: {    
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': '*'}
    }

    const endpoint = `http://localhost:3000/companies/editCompany/${company_id}`;
    const response = await fetch(endpoint, options)
    const data = await response.json();    
    if (response.status === 201) {
        window.location.href = 'companys.html';
    }
});