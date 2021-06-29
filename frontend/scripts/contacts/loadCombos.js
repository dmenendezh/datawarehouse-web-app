loadCompanies();
loadRegions();

async function loadCompanies() {
    const options = {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': '*'
        }
    }

    const response = await fetch('http://localhost:3000/companies/listCompanies', options)
    const data = await response.json();

    if (response.status === 200) {
        const optionCompanies = document.createElement('option');
        optionCompanies.setAttribute('value', "");
        optionCompanies.innerHTML = ``;
        cmbContactCompany.appendChild(optionCompanies);

        for (let i = 0; i < data.quantity; i++) {
            const companyName = data.companies[i].company_name;
            const companyId = data.companies[i].company_id;

            const optionCompanies = document.createElement('option');
            optionCompanies.setAttribute('value', companyId);
            optionCompanies.innerHTML = `${companyName}`;
            cmbContactCompany.appendChild(optionCompanies);
        }
    }
}

async function loadRegions() {
    const options = {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': '*'
        }
    }



    const response = await fetch('http://localhost:3000/regions/listRegion', options)
    const data = await response.json()
    if (response.status === 200) {
        const option = document.createElement('option');
        option.setAttribute('value', "");
        option.innerHTML = ``;
        contactCmbRegion.appendChild(option);

        for (let i = 0; i < data.quantity; i++) {
            console.log(data.regions[i].region_name);
            const regionName = data.regions[i].region_name;
            const regionId = data.regions[i].region_id;

            const option = document.createElement('option');
            option.setAttribute('value', regionId);
            option.innerHTML = `${regionName}`;
            contactCmbRegion.appendChild(option);
        }
    }
}


contactCmbRegion.addEventListener('change', async (event) => {
    const options = {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': '*'
        }
    }

    limpiar(contactCmbCountry);

    const regionId = document.getElementById('contactCmbRegion').value;

    const endpoint = `http://localhost:3000/regions/listCountries/${regionId}`
    const responseCountries = await fetch(endpoint, options)
    const dataCountries = await responseCountries.json()
    if (responseCountries.status === 200) {
        console.log("resultado");

        const optionCountry = document.createElement('option');
        optionCountry.setAttribute('value', "");
        optionCountry.innerHTML = ``;
        contactCmbCountry.appendChild(optionCountry);
        for (let i = 0; i < dataCountries.quantity; i++) {
            const countryName = dataCountries.countries[i].country_name;
            const countryId = dataCountries.countries[i].country_id;

            const optionCountry = document.createElement('option');
            optionCountry.setAttribute('value', countryId);
            optionCountry.innerHTML = `${countryName}`;
            contactCmbCountry.appendChild(optionCountry);
        }
    }
});


contactCmbCountry.addEventListener('change', async (event) => {
    const options = {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': '*'
        }
    }

    limpiar(contactCmbCity);

    const countryId = document.getElementById('contactCmbCountry').value;

    const endpoint = `http://localhost:3000/regions/listCitiesCountryId/${countryId}`
    const responseCities = await fetch(endpoint, options)
    const dataCities = await responseCities.json()
    if (responseCities.status === 200) {
        const option = document.createElement('option');
        option.setAttribute('value', "");
        option.innerHTML = ``;
        contactCmbCity.appendChild(option);
        for (let i = 0; i < dataCities.quantity; i++) {
            const countryName = dataCities.cities[i].city_name;
            const countryId = dataCities.cities[i].city_id;

            const option = document.createElement('option');
            option.setAttribute('value', countryId);
            option.innerHTML = `${countryName}`;
            contactCmbCity.appendChild(option);
        }
    }
});


const limpiar = ($select) => {
    for (let i = $select.options.length; i >= 0; i--) {
        $select.remove(i);
    }
};