async function editContact(contactId) {
    document.getElementById("layoutEditNewContact").removeAttribute("hidden");
    document.getElementById("cardHeader").setAttribute("hidden", true);
    document.getElementById("layoutAddNewContact").setAttribute("hidden", true);
    document.getElementById("edit_ContactId").setAttribute("value", contactId);


    const options = {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': '*'
        }
    }

    const endpoint = `http://localhost:3000/contacts/listContactById/${contactId}`;
    const response = await fetch(endpoint, options)
    const data = await response.json()

    if (response.status === 200) {
        console.log(data);
        console.log(data.contact[0].contact_name);


        document.getElementById("edit_inputContactName").setAttribute("value", data.contact[0].contact_name);
        document.getElementById("edit_inputContactSurName").setAttribute("value", data.contact[0].contact_surname)
        document.getElementById("edit_inputCargo").setAttribute("value", data.contact[0].contact_charge)
        document.getElementById("edit_inputContactEmail").setAttribute("value", data.contact[0].contact_email)

        /*load combo compañia */
        const companyName = data.contact[0].company_name;
        const companyId = data.contact[0].company_id;

        const option_company = document.createElement('option');
        option_company.setAttribute('value', companyId);
        option_company.innerHTML = `${companyName}`;
        edit_cmbContactCompany.appendChild(option_company);

        /*load combo region */
        const regionName = data.contact[0].region_name;
        const regionId = data.contact[0].region_id;

        const option_region = document.createElement('option');
        option_region.setAttribute('value', regionId);
        option_region.innerHTML = `${regionName}`;
        edit_contactCmbRegion.appendChild(option_region);

        /*load combo pais */
        const countryName = data.contact[0].country_name;
        const countryId = data.contact[0].country_id;

        const option_country = document.createElement('option');
        option_country.setAttribute('value', countryId);
        option_country.innerHTML = `${countryName}`;
        edit_contactCmbCountry.appendChild(option_country);

        /*load combo ciudad */
        const cityName = data.contact[0].city_name;
        const cityId = data.contact[0].city_id;

        const option_city = document.createElement('option');
        option_city.setAttribute('value', cityId);
        option_city.innerHTML = `${cityName}`;
        edit_contactCmbCity.appendChild(option_city);

        document.getElementById("edit_inputContactAddress").setAttribute("value", data.contact[0].contact_address)
        document.getElementById("edit_slider").setAttribute("value", data.contact[0].contact_interest)
        loadCompanies(companyId);
        loadRegions(regionId);

        loadContactChannells(contactId);
    }

}



async function loadContactChannells(contactId) {
    const options = {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': '*'
        }
    }

    const response = await fetch(`http://localhost:3000/contacts/listChannellsByContact/${contactId}`, options)
    const data = await response.json();

    if (response.status === 200) {

        for (let i = 0; i < data.quantity; i++) {
            const channel_id = data.channel[i].channel_id;
            const edit_channell = data.channel[i].channel_name;
            const edit_account = data.channel[i].channel_account;
            const edit_preferences = data.channel[i].channel_preferences;

            const channelContainer = document.createElement('tr');
            channelContainer.classList.add("tr_0");
            channelContainer.innerHTML = `            
            <tr>
                <td>${edit_channell}</td>
                <td>${edit_account}</td>
                <td>${edit_preferences}</td>
                <td id="${i}"><a onclick="removeChannel('${i}')"><i class="fas fa-trash"></i></a></td>
            </tr>`;
            edit_tbody_channels.appendChild(channelContainer);

        }
    }

    $('#edit_dataTable').dataTable({
        pageLength: 50,
        "ordering": false
    });

    document.getElementById("edit_dataTable_length").setAttribute("hidden", "true");
    document.getElementById("edit_dataTable_filter").setAttribute("hidden", "true");
    document.getElementById("edit_dataTable_info").setAttribute("hidden", "true");
    document.getElementById("edit_dataTable_paginate").setAttribute("hidden", "true");

}


edit_btnGoBack.addEventListener("click", e => {
    window.location.reload();
});




async function loadCompanies(companyId) {
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
            const edit_companyName = data.companies[i].company_name;
            const edit_companyId = data.companies[i].company_id;

            if (companyId != edit_companyId) {
                const optionCompanies = document.createElement('option');
                optionCompanies.setAttribute('value', edit_companyId);
                optionCompanies.innerHTML = `${edit_companyName}`;
                edit_cmbContactCompany.appendChild(optionCompanies);
            }
        }
    }
}

async function loadRegions(regionId) {
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

        for (let i = 0; i < data.quantity; i++) {
            const edit_regionName = data.regions[i].region_name;
            const edit_regionId = data.regions[i].region_id;

            if (regionId != edit_regionId) {
                const option = document.createElement('option');
                option.setAttribute('value', edit_regionId);
                option.innerHTML = `${edit_regionName}`;
                edit_contactCmbRegion.appendChild(option);
            }
        }
    }
}



edit_btnSaveContact.addEventListener('click', async (event) => {
    const contact_id = edit_ContactId.value;

    const name = document.getElementById('edit_inputContactName');
    const surname = document.getElementById('edit_inputContactSurName');
    const charge = document.getElementById('edit_inputCargo');
    const email = document.getElementById('edit_inputContactEmail');
    const company_id = document.getElementById('edit_cmbContactCompany');
    const region_id = document.getElementById('edit_contactCmbRegion');
    const country_id = document.getElementById('edit_contactCmbCountry');
    const city_id = document.getElementById('edit_contactCmbCity');
    const address = document.getElementById('edit_inputContactAddress');
    const interest = document.getElementById('edit_slider');

    const contactData = {
        contact_name: name.value,
        contact_surname: surname.value,
        contact_charge: charge.value,
        contact_email: email.value,
        company_id: company_id.value,
        region_id: region_id.value,
        country_id: country_id.value,
        city_id: city_id.value,
        contact_address: address.value,
        contact_interest: interest.value
    }

    const options = {
        method: 'PUT',
        body: JSON.stringify(contactData),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': '*'
        }
    }

    const endpoint = `http://localhost:3000/contacts/editContact/${contact_id}`;
    const response = await fetch(endpoint, options)
    const data = await response.json();
    if (response.status === 201) {

        const options = {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': '*'
            }
        }

        const endpoint = `http://localhost:3000/contacts/channels/removeContactChannels/${contact_id}`
        const response = await fetch(endpoint, options)
        const data = await response.json()
        if (response.status === 201) {
            const datagridIndex = $("#edit_tbody_channels tr").length;
            const EMAIL = document.getElementById("edit_inputContactEmail").value;

            const index = datagridIndex + 1;
            for (let i = 1; i < index; i++) {
                const CHANNEL = document.querySelectorAll("#edit_tbody_channels")[0].childNodes[i].children[0].outerText;
                const ACCOUNT = document.querySelectorAll("#edit_tbody_channels")[0].childNodes[i].children[1].outerText;
                const PREFERENCE = document.querySelectorAll("#edit_tbody_channels")[0].childNodes[i].children[2].outerText;
                const dataChannelContact = {
                    channel_name: CHANNEL,
                    channel_account: ACCOUNT,
                    channel_preferences: PREFERENCE,
                    contact_email: EMAIL
                }

                const options = {
                    method: 'POST',
                    body: JSON.stringify(dataChannelContact),
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*',
                        'Access-Control-Allow-Headers': '*'
                    }
                }
                const response = await fetch('http://localhost:3000/contacts/addContactChannel', options)
                const data = await response.json()
                console.log(data);
                if (response.status === 201) {
                    swal({
                        title: "Contacto actualizado existosamente",
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

            }

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

edit_contactCmbRegion.addEventListener('change', async (event) => {
    const options = {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': '*'
        }
    }

    limpiarcombos(edit_contactCmbCountry);
    limpiarcombos(edit_contactCmbCity);

    const regionId = document.getElementById('edit_contactCmbRegion').value;


    const endpoint = `http://localhost:3000/regions/listCountries/${regionId}`
    const responseCountries = await fetch(endpoint, options)
    const dataCountries = await responseCountries.json()
    if (responseCountries.status === 200) {
        const optionCountry = document.createElement('option');
        optionCountry.setAttribute('value', "");
        optionCountry.innerHTML = ``;
        edit_contactCmbCountry.appendChild(optionCountry);
        for (let i = 0; i < dataCountries.quantity; i++) {
            const countryName = dataCountries.countries[i].country_name;
            const countryId = dataCountries.countries[i].country_id;

            const optionCountry = document.createElement('option');
            optionCountry.setAttribute('value', countryId);
            optionCountry.innerHTML = `${countryName}`;
            edit_contactCmbCountry.appendChild(optionCountry);
        }
    }
});


edit_contactCmbCountry.addEventListener('change', async (event) => {
    const options = {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': '*'
        }
    }

    limpiarcombos(edit_contactCmbCity);

    const countryId = document.getElementById('edit_contactCmbCountry').value;

    const endpoint = `http://localhost:3000/regions/listCitiesCountryId/${countryId}`
    const responseCities = await fetch(endpoint, options)
    const dataCities = await responseCities.json()
    if (responseCities.status === 200) {
        const option = document.createElement('option');
        option.setAttribute('value', "");
        option.innerHTML = ``;
        edit_contactCmbCity.appendChild(option);
        for (let i = 0; i < dataCities.quantity; i++) {
            const countryName = dataCities.cities[i].city_name;
            const countryId = dataCities.cities[i].city_id;

            const option = document.createElement('option');
            option.setAttribute('value', countryId);
            option.innerHTML = `${countryName}`;
            edit_contactCmbCity.appendChild(option);
        }
    }
});


const limpiarcombos = ($select) => {
    for (let i = $select.options.length; i >= 0; i--) {
        $select.remove(i);
    }
};


$('#edit_dataTable tbody').on('click', 'tr > td', function(e) {
    const table = $('#edit_dataTable').DataTable();
    const index = table.row(this).index();
    if (index == $(this).attr('id')) {
        //alert( 'Row index: '+ index);
        table.row(`:eq(${index})`).remove().draw();

    }
});


backModalContactedit.addEventListener("click", e => {
    document.querySelectorAll("#modaledit")[0].classList.remove(isVisible);
});


btnConfirmModalContactedit.addEventListener("click", async (e) => {
    const channel = document.getElementById('cmbChannel_edit').value;
    const preferences = document.getElementById('cmbPreferences_edit').value;
    const account = document.getElementById('inputAccount_edit').value;

    const datagridIndex = $("#edit_tbody_channels tr").length;

    if (datagridIndex == 0) {
        const channelContainer = document.createElement('tr');
        channelContainer.classList.add("tr_0");
        channelContainer.innerHTML = `            
        <tr>
            <td>${channel}</td>
            <td>${account}</td>
            <td>${preferences}</td>
            <td><a onclick="removeUser('${channel}')"><i class="fas fa-trash"></i></a></td>
        </tr>`;
        edit_tbody_channels.appendChild(channelContainer);
    } else {
        const channelContainer = document.createElement('tr');

        const index = datagridIndex;
        channelContainer.classList.add("tr_" + index);
        channelContainer.innerHTML = `            
        <tr>
            <td>${channel}</td>
            <td>${account}</td>
            <td>${preferences}</td>
            <td><a onclick="removeUser('${channel}')"><i class="fas fa-trash"></i></a></td>
        </tr>`;
        edit_tbody_channels.appendChild(channelContainer);
    }
    const modal = document.getElementById("modaledit");
    modal.classList.remove("is-visible");

});