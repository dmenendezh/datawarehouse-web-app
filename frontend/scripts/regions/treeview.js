async function invoqueTreeView() {
    const options = {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': '*'
        }
    }

    const response = await fetch('http://localhost:3000/regions/treeView', options)
    const data = await response.json()
    if (response.status === 200) {
        return (data) = await Promise.resolve(data);
    }
};

async function armarArray() {
    const options = {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': '*'
        }
    }

    const response = await fetch('http://localhost:3000/regions/treeView', options)
    const data = await response.json()
    var arr = [];
    console.log(data)
    if (response.status === 200) {
        for (let i = 0; i < data.quantity; i++) {

            let region = data.treeview[i].region_name;
            let country = data.treeview[i].country_name;
            console.log("region" + region)
            console.log("country" + country)
            if (i == 0) {
                if (country != null) {
                    arr.push({
                        id: `${data.treeview[i].region_name}`,
                        parent: '#',
                        text: `${data.treeview[i].region_name}`,
                        type: 'region',
                        tipo: 'region'
                    }, {
                        id: `${data.treeview[i].country_name}`,
                        parent: `${data.treeview[i].region_name}`,
                        text: `${data.treeview[i].country_name}`,
                        type: 'country',
                        tipo: 'country'
                    }, {
                        id: `${data.treeview[i].city_name}`,
                        parent: `${data.treeview[i].country_name}`,
                        text: `${data.treeview[i].city_name}`,
                        type: 'city',
                        tipo: 'city'
                    });
                } else {
                    arr.push({
                        id: `${data.treeview[i].region_name}`,
                        parent: '#',
                        text: `${data.treeview[i].region_name}`,
                        type: 'region',
                        tipo: 'region'
                    });
                }


            } else {
                if (region == data.treeview[i - 1].region_name) {

                    if (country != null) {
                        if (country == data.treeview[i - 1].country_name) {
                            arr.push({
                                id: `${data.treeview[i].city_name}`,
                                parent: `${data.treeview[i].country_name}`,
                                text: `${data.treeview[i].city_name}`,
                                type: 'city',
                                tipo: 'city'
                            });
                        } else {
                            if (data.treeview[i].city_name != null) {
                                arr.push({
                                    id: `${data.treeview[i].country_name}`,
                                    parent: `${data.treeview[i].region_name}`,
                                    text: `${data.treeview[i].country_name}`,
                                    type: 'country',
                                    tipo: 'country'
                                }, {
                                    id: `${data.treeview[i].city_name}`,
                                    parent: `${data.treeview[i].country_name}`,
                                    text: `${data.treeview[i].city_name}`,
                                    type: 'city',
                                    tipo: 'city'
                                });

                            } else {
                                arr.push({
                                    id: `${data.treeview[i].country_name}`,
                                    parent: `${data.treeview[i].region_name}`,
                                    text: `${data.treeview[i].country_name}`,
                                    type: 'country',
                                    tipo: 'country'
                                });
                            }

                        }
                    } else {

                    }


                } else {

                    if (country != null) {

                        if (data.treeview[i].city_name != null) {
                            arr.push({
                                id: `${data.treeview[i].region_name}`,
                                parent: '#',
                                text: `${data.treeview[i].region_name}`,
                                type: 'region',
                                tipo: 'region'
                            }, {
                                id: `${data.treeview[i].country_name}`,
                                parent: `${data.treeview[i].region_name}`,
                                text: `${data.treeview[i].country_name}`,
                                type: 'country',
                                tipo: 'country'
                            }, {
                                id: `${data.treeview[i].city_name}`,
                                parent: `${data.treeview[i].country_name}`,
                                text: `${data.treeview[i].city_name}`,
                                type: 'city',
                                tipo: 'city'
                            });
                        } else {
                            arr.push({
                                id: `${data.treeview[i].region_name}`,
                                parent: '#',
                                text: `${data.treeview[i].region_name}`,
                                type: 'region',
                                tipo: 'region'
                            }, {
                                id: `${data.treeview[i].country_name}`,
                                parent: `${data.treeview[i].region_name}`,
                                text: `${data.treeview[i].country_name}`,
                                type: 'country',
                                tipo: 'country'
                            });
                        }

                    } else {
                        arr.push({
                            id: `${data.treeview[i].region_name}`,
                            parent: '#',
                            text: `${data.treeview[i].region_name}`,
                            type: 'region',
                            tipo: 'region'
                        });
                    }

                }
            }
        }
    }
    //console.log(arr)
    //return arr;
    return (arr) = await Promise.resolve(arr);
}

armarArray().then(arr => {
    var VAR_ARR = [];
    VAR_ARR = arr;
    $(function showTree() {

        $('#jstree').jstree({
            "core": {
                "check_callback": true,
                "data": VAR_ARR
            },
            "types": {
                "region": {
                    "icon": "fas fa-globe-americas"
                },
                "country": {
                    "icon": "far fa-flag"
                },
                "city": {
                    "icon": "fas fa-city"
                }
            },
            "plugins": ["types"]
        }).bind('ready.jstree', function(e, data) {
            $('#jstree').jstree('open_all')
        })
    });
});



$('#jstree').bind("select_node.jstree", function(event, data) {
    const SEL = data.node.original.text;
    const TYPE = data.node.original.tipo;
    const PARENT_SEL = data.node.parent;
    $flagType.setAttribute("value", TYPE);
    $flagValue.setAttribute("value", SEL);
    $flagParentValue.setAttribute("value", PARENT_SEL);
    console.log(PARENT_SEL)

    flagchildrens.setAttribute("value", data.node.children.length);
    console.log(data.node.children.length)

});

//Confirmar edicion
btnEditConfirmModal.addEventListener('click', async (event) => {

    const TYPE = document.getElementById('flagType').value;
    const PREVIOUS_VALUE = document.getElementById('inputEditHiddenValue').value;

    if (TYPE == 'country') {

        const condition = PREVIOUS_VALUE;
        const region = cmbEditRegion.value;
        const country_name = inputEditCountry.value;

        const data_region = {
            region_id: region,
            country_name: country_name
        }

        const options = {
            method: 'PUT',
            body: JSON.stringify(data_region),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': '*'
            }
        }

        const endpoint = `http://localhost:3000/regions/editCountry/${condition}`;
        const response = await fetch(endpoint, options)
        const dataresponse = await response.json();
        if (response.status === 201) {
            swal({
                title: "País editado existosamente",
                text: "",
                type: "success",
                timer: 3000,
                showConfirmButton: true
            }, function() {
                window.location.href = "regions.html";
            });
        } else {
            swal({
                title: "Error",
                text: "No ha podido editarse el país.",
                type: "error",
                timer: 3000,
                showConfirmButton: true
            }, function() {
                window.location.href = "regions.html";
            });
        }

    } else if (TYPE == 'city') {

        const region_id = cmbEditRegion.value;
        const country_id = cmbEditCountry.value;
        const city_name = inputEditCity.value;
        const condition = PREVIOUS_VALUE;

        const datacity = {
            region_id: region_id,
            country_id: country_id,
            city_name: city_name
        }

        const options = {
            method: 'PUT',
            body: JSON.stringify(datacity),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': '*'
            }
        }

        const endpoint = `http://localhost:3000/regions/editCity/${condition}`;
        const response = await fetch(endpoint, options)
        const data_r = await response.json();
        if (response.status === 201) {
            swal({
                title: "Ciudad editada existosamente",
                text: "",
                type: "success",
                timer: 3000,
                showConfirmButton: true
            }, function() {
                window.location.href = "regions.html";
            });
        }

    } else if (TYPE == 'region') {

        const condition = PREVIOUS_VALUE;
        const region_name = document.getElementById('inputEditRegion').value;

        const data = {
            region_name: region_name
        }

        const options = {
            method: 'PUT',
            body: JSON.stringify(data),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': '*'
            }
        }

        const endpoint = `http://localhost:3000/regions/editRegion/${condition}`;
        const response = await fetch(endpoint, options)
        const data_region = await response.json();
        if (response.status === 201) {
            swal({
                title: "Region editada existosamente",
                text: "",
                type: "success",
                timer: 3000,
                showConfirmButton: true
            }, function() {
                window.location.href = "regions.html";
            });
        }
    }
});


$btnBack.addEventListener('click', (event) => {
    window.location.href = 'regions.html';
});



cmbEditRegion.addEventListener('change', async (event) => {
    const options3 = {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': '*'
        }
    }
    limpiar(cmbEditCountry);

    const CMB = document.getElementById("cmbEditRegion");
    const SEL_REGIONNAME = CMB.options[CMB.selectedIndex].text;

    const response3 = await fetch(`http://localhost:3000/regions/listCountryByRegion/${SEL_REGIONNAME}`, options3)
    const data3 = await response3.json()
    if (response3.status === 200) {
        console.log("resultado");
        for (let i = 0; i < data3.quantity; i++) {

            const countryName2 = data3.countries[i].country_name;
            const countryId = data3.countries[i].country_id;

            const option = document.createElement('option');
            option.setAttribute('value', countryId);
            option.innerHTML = `${countryName2}`;
            cmbEditCountry.appendChild(option);

        }
    }
});

$cmbRegions.addEventListener('change', async (event) => {
    console.log("onchange");

    const options = {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': '*'
        }
    }

    limpiar($cmbCountrys);

    const regionId = document.getElementById('cmbRegions').value;

    const endpoint = `http://localhost:3000/regions/listCountries/${regionId}`
    const responseCountries = await fetch(endpoint, options)
    const dataCountries = await responseCountries.json()
    if (responseCountries.status === 200) {
        console.log("resultado");

        const optionCountry = document.createElement('option');
        optionCountry.setAttribute('value', "");
        optionCountry.innerHTML = ``;
        $cmbCountrys.appendChild(optionCountry);
        for (let i = 0; i < dataCountries.quantity; i++) {
            const countryName = dataCountries.countries[i].country_name;
            const countryId = dataCountries.countries[i].country_id;

            const optionCountry = document.createElement('option');
            optionCountry.setAttribute('value', countryId);
            optionCountry.innerHTML = `${countryName}`;
            $cmbCountrys.appendChild(optionCountry);
        }
    }
});

const limpiar = ($select) => {
    for (let i = $select.options.length; i >= 0; i--) {
        $select.remove(i);
    }
};

$btnConfirm.addEventListener('click', async (event) => {

    const TYPE = document.getElementById('flagType').value;

    console.log(TYPE);
    if (TYPE == 'region') {
        const regionName = document.getElementById('inputRegion');

        const dataRegion = {
            region_name: regionName.value
        }

        const options = {
            method: 'POST',
            body: JSON.stringify(dataRegion),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': '*'
            }
        }

        const response = await fetch('http://localhost:3000/regions/createRegion', options)
        const data = await response.json()
        if (response.status === 201) {
            swal({
                title: "Region creada existosamente",
                text: "",
                type: "success",
                timer: 3000,
                showConfirmButton: true
            }, function() {
                window.location.href = "regions.html";
            });
        }

    } else if (TYPE == 'country') {
        const regionId = document.getElementById('cmbRegions');
        const countryName = document.getElementById('inputCountry');

        const dataCountry = {
            region_id: regionId.value,
            country_name: countryName.value,
        }

        const options = {
            method: 'POST',
            body: JSON.stringify(dataCountry),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': '*'
            }
        }

        const response = await fetch('http://localhost:3000/regions/createCountry', options)
        const data = await response.json()
        if (response.status === 201) {
            swal({
                title: "País creado existosamente",
                text: "",
                type: "success",
                timer: 3000,
                showConfirmButton: true
            }, function() {
                window.location.href = "regions.html";
            });
        }
    } else if (TYPE == 'city') {
        const countryId = document.getElementById('cmbCountrys');
        const cityName = document.getElementById('inputCity');

        const dataCity = {
            country_id: countryId.value,
            city_name: cityName.value,
        }

        const options = {
            method: 'POST',
            body: JSON.stringify(dataCity),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': '*'
            }
        }
        console.log(options);

        const response = await fetch('http://localhost:3000/regions/createCity', options)
        const data = await response.json()
        console.log(data);
        if (response.status === 201) {
            swal({
                title: "Ciudad creada existosamente",
                text: "",
                type: "success",
                timer: 3000,
                showConfirmButton: true
            }, function() {
                window.location.href = "regions.html";
            });
        }
    }
});

async function fncCreateRegion() {
    $crud_buttons.setAttribute('hidden', true);
    $jstree.setAttribute('hidden', true);
    $crud_regionsCity.removeAttribute('hidden');

    $regionsCmbContainer.setAttribute('hidden', true);
    $countrysCmbContainer.setAttribute('hidden', true);
    $cityInputContainer.setAttribute('hidden', true);
    $regionInputContainer.removeAttribute('hidden');
    $countryInputContainer.setAttribute('hidden', true);

    $flagType.setAttribute("value", "region");

};

async function fncCreateCountry() {
    $crud_buttons.setAttribute('hidden', true);
    $jstree.setAttribute('hidden', true);
    $crud_regionsCity.removeAttribute('hidden');

    $regionsCmbContainer.removeAttribute('hidden');
    $countrysCmbContainer.setAttribute('hidden', true);
    $cityInputContainer.setAttribute('hidden', true);
    $regionInputContainer.setAttribute('hidden', true);
    $countryInputContainer.removeAttribute('hidden');
    $flagType.setAttribute("value", "country");


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
        console.log("resultado");
        for (let i = 0; i < data.quantity; i++) {
            console.log(data.regions[i].region_name);
            const regionName = data.regions[i].region_name;
            const regionId = data.regions[i].region_id;

            const option = document.createElement('option');
            option.setAttribute('value', regionId);
            option.innerHTML = `${regionName}`;
            $cmbRegions.appendChild(option);
        }
    }
};

async function fncCreateCity() {
    $crud_buttons.setAttribute('hidden', true);
    $jstree.setAttribute('hidden', true);
    $crud_regionsCity.removeAttribute('hidden');

    $regionsCmbContainer.removeAttribute('hidden');
    $countrysCmbContainer.removeAttribute('hidden');
    $cityInputContainer.removeAttribute('hidden');

    $cmbRegions.setAttribute('required', true);
    $cmbCountrys.setAttribute('required', true);
    $inputCity.setAttribute('required', true);

    $regionInputContainer.setAttribute('hidden', true);
    $countryInputContainer.setAttribute('hidden', true);
    $inputRegion.removeAttribute('required');
    $inputCountry.removeAttribute('required');
    $flagType.setAttribute("value", "city");



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

    let regionName_2 ="";
    if (response.status === 200) {
        console.log("resultado");
        for (let i = 0; i < data.quantity; i++) {
            if(i == 0){
                regionName_2 = data.regions[i].region_name;
            }
            console.log(data.regions[i].region_name);
            const regionName = data.regions[i].region_name;
            const regionId = data.regions[i].region_id;

            const option = document.createElement('option');
            option.setAttribute('value', regionId);
            option.innerHTML = `${regionName}`;
            $cmbRegions.appendChild(option);
        }
    }



    const options_2 = {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': '*'
        }
    }

    const response_2 = await fetch(`http://localhost:3000/regions/listCountryByRegion/${regionName_2}`, options)
    const data_2 = await response_2.json()
    if (response_2.status === 200) {
        console.log("resultado");
        for (let i = 0; i < data_2.quantity; i++) {
            console.log(data_2.countries[i].country_name);
            const countryName = data_2.countries[i].country_name;
            const countryId = data_2.countries[i].country_id;

            const option = document.createElement('option');
            option.setAttribute('value', countryId);
            option.innerHTML = `${countryName}`;
            $cmbCountrys.appendChild(option);
        }
    }

};

function fncEdit() {
    const TYPE = document.getElementById('flagType').value;
    console.log(TYPE);

    const SEL = document.getElementById('flagValue').value;
    console.log(SEL);

    const PARENT_SEL = document.getElementById('flagParentValue').value;
    console.log(PARENT_SEL);

    if (TYPE == 'region') {

        $editCmbRegionContainer.setAttribute('hidden', true);
        $editCmbCountryContainer.setAttribute('hidden', true);
        $editCityContainer.setAttribute('hidden', true);
        $editInputRegionContainer.removeAttribute('hidden');
        $editInputCountryContainer.setAttribute('hidden', true);

        $inputEditRegion.setAttribute('value', SEL);
        inputEditHiddenValue.setAttribute('value', SEL);
    } else if (TYPE == 'country') {

        $editCmbRegionContainer.removeAttribute('hidden');
        $editCmbCountryContainer.setAttribute('hidden', true);
        $editCityContainer.setAttribute('hidden', true);
        $editInputRegionContainer.setAttribute('hidden', true);
        $editInputCountryContainer.removeAttribute('hidden');


        $inputEditCountry.setAttribute('value', SEL);
        inputEditHiddenValue.setAttribute('value', SEL);

        loadRegionCombo(PARENT_SEL);


    } else if (TYPE == 'city') {

        $editCmbRegionContainer.removeAttribute('hidden');
        $editCmbCountryContainer.removeAttribute('hidden');
        $editCityContainer.removeAttribute('hidden');
        $editInputRegionContainer.setAttribute('hidden', true);
        $editInputCountryContainer.setAttribute('hidden', true);

        $inputEditCity.setAttribute('value', SEL);
        inputEditHiddenValue.setAttribute('value', SEL);

        loadCombosEditCity(SEL);
    } else {
        alert("Debe seleccionar un elemento del arbol jerarquico (Region / Pais / Ciudad)");
        window.location.href = 'regions.html';
    }

};

async function fncDelete() {
    const TYPE = document.getElementById('flagType').value;
    console.log(TYPE);

    const SEL = document.getElementById('flagValue').value;
    console.log(SEL);

    const PARENT_SEL = document.getElementById('flagParentValue').value;
    console.log(PARENT_SEL);

    const CHILDRENS_NODE = document.getElementById('flagchildrens').value;
    console.log(CHILDRENS_NODE);


    if (TYPE == 'region') {
        if (CHILDRENS_NODE > 0) {
            alert("La region no puede ser eliminada, tiene dependencias asociadas");
        } else {

            swal({
                title: "¿Está seguro?",
                text: "La región será eliminada del sistema",
                type: "warning",
                showCancelButton: true,
                confirmButtonClass: "btn-danger",
                confirmButtonText: "Si, eliminarla!",
                closeOnConfirm: false
              },
              async function(){
                const options = {
                    method: 'DELETE',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*',
                        'Access-Control-Allow-Headers': '*'
                    }
                }
    
                const endpoint = `http://localhost:3000/regions/deleteRegion/${SEL}`
                const response = await fetch(endpoint, options)
                const DEL_CONTACTS = await response.json()
                if (response.status === 201) {
                    swal({
                        title: "Region eliminada existosamente",
                        text: "",
                        type: "success",
                        timer: 3000,
                        showConfirmButton: true
                    }, function() {
                        window.location.href = 'regions.html';
                    });
                }
    
              });
        }
    } else if (TYPE == 'country') {
        if (CHILDRENS_NODE > 0) {
            alert("El país no puede ser eliminado, tiene dependencias asociadas");
        } else {

            swal({
                title: "¿Está seguro?",
                text: "El país será eliminado del sistema",
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
                        'Access-Control-Allow-Headers': '*'
                    }
                }
    
                const endpoint = `http://localhost:3000/regions/deleteCountry/${SEL}`
                const response = await fetch(endpoint, options)
                const DEL_CONTACTS = await response.json()
                if (response.status === 201) {
                    swal({
                        title: "Pais eliminado existosamente",
                        text: "",
                        type: "success",
                        timer: 3000,
                        showConfirmButton: true
                    }, function() {
                        window.location.href = 'regions.html';
                    });
                }
    
              });
        }
    } else if (TYPE == 'city') {
        if (CHILDRENS_NODE > 0) {
            alert("La ciudad no puede ser eliminado, tiene dependencias asociadas");
        } else {

            swal({
                title: "¿Está seguro?",
                text: "La ciudad será eliminada del sistema",
                type: "warning",
                showCancelButton: true,
                confirmButtonClass: "btn-danger",
                confirmButtonText: "Si, eliminarla!",
                closeOnConfirm: false
              },
              async function(){
                const options = {
                    method: 'DELETE',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*',
                        'Access-Control-Allow-Headers': '*'
                    }
                }
    
                const endpoint = `http://localhost:3000/regions/deleteCity/${SEL}`
                const response = await fetch(endpoint, options)
                const DEL_CONTACTS = await response.json()
                if (response.status === 201) {
                    swal({
                        title: "Ciudad eliminada existosamente",
                        text: "",
                        type: "success",
                        timer: 3000,
                        showConfirmButton: true
                    }, function() {
                        window.location.href = 'regions.html';
                    });
    
                    
                }

              });
        }
    } else {
        alert("Debe seleccionar un elemento del arbol jerarquico (Region / Pais / Ciudad)");
        window.location.href = 'regions.html';
    }
};



async function loadCombosEditCity(PARENT_SEL) {
    const options = {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': '*'
        }
    }

    limpiar($cmbEditRegion);
    limpiar(cmbEditCountry);

    console.log("PARENT_SEL:" + PARENT_SEL)
    const cityName = PARENT_SEL;

    const endpoint = `http://localhost:3000/regions/listRegionCountryByCity/${cityName}`
    const response = await fetch(endpoint, options);
    const data = await response.json();
    let regionName = "";
    let countryName = "";

    if (response.status === 200) {
        console.log("resultado");
        console.log(data);

        for (let i = 0; i < data.quantity; i++) {
            regionName = data.regioncountry[i].region_name;
            const regionId = data.regioncountry[i].region_id;

            const optionRegion = document.createElement('option');
            optionRegion.setAttribute('value', regionId);
            optionRegion.innerHTML = `${regionName}`;
            $cmbEditRegion.appendChild(optionRegion);

            /* ----------------------------------------------------- */

            countryName = data.regioncountry[i].country_name;
            const countryId = data.regioncountry[i].country_id;

            const optionCountry = document.createElement('option');
            optionCountry.setAttribute('value', countryId);
            optionCountry.innerHTML = `${countryName}`;
            cmbEditCountry.appendChild(optionCountry);
        }
    }


    const options2 = {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': '*'
        }
    }

    const response2 = await fetch('http://localhost:3000/regions/listRegion', options2)
    const data2 = await response2.json()
    if (response2.status === 200) {
        console.log("resultado");
        for (let i = 0; i < data2.quantity; i++) {
            if (regionName != data2.regions[i].region_name) {
                const regionName2 = data2.regions[i].region_name;
                const regionId = data2.regions[i].region_id;

                const option = document.createElement('option');
                option.setAttribute('value', regionId);
                option.innerHTML = `${regionName2}`;
                $cmbEditRegion.appendChild(option);
            }
        }
    }


    const options3 = {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': '*'
        }
    }

    const response3 = await fetch(`http://localhost:3000/regions/listCountryByRegion/${regionName}`, options3)
    const data3 = await response3.json()
    if (response3.status === 200) {
        console.log("resultado");
        for (let i = 0; i < data3.quantity; i++) {
            if (countryName != data3.countries[i].country_name) {
                const countryName2 = data3.countries[i].country_name;
                const countryId = data3.countries[i].country_id;

                const option = document.createElement('option');
                option.setAttribute('value', countryId);
                option.innerHTML = `${countryName2}`;
                cmbEditCountry.appendChild(option);
            }
        }
    }
}


async function loadRegionCombo(PARENT_SEL) {
    const options = {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': '*'
        }
    }

    limpiar($cmbEditRegion);
    console.log("PARENT_SEL:" + PARENT_SEL)
    const regionName = PARENT_SEL;

    const endpoint = `http://localhost:3000/regions/listRegionId/${regionName}`
    const responseCountries = await fetch(endpoint, options)
    const dataRegion = await responseCountries.json()
    if (responseCountries.status === 200) {
        console.log("resultado");
        console.log(dataRegion);

        for (let i = 0; i < dataRegion.quantity; i++) {
            const regionName = dataRegion.region[i].region_name;
            const regionId = dataRegion.region[i].region_id;
            const optionRegion = document.createElement('option');
            optionRegion.setAttribute('value', regionId);
            optionRegion.innerHTML = `${regionName}`;
            $cmbEditRegion.appendChild(optionRegion);
        }
    }


    const options2 = {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': '*'
        }
    }

    const response = await fetch('http://localhost:3000/regions/listRegion', options2)
    const data = await response.json()
    if (response.status === 200) {
        console.log("resultado");
        for (let i = 0; i < data.quantity; i++) {
            if (regionName != data.regions[i].region_name) {
                const regionName = data.regions[i].region_name;
                const regionId = data.regions[i].region_id;

                const option = document.createElement('option');
                option.setAttribute('value', regionId);
                option.innerHTML = `${regionName}`;
                $cmbEditRegion.appendChild(option);
            }


        }
    }
}

const isVisible = "is-visible";
const openEls = document.querySelectorAll("[data-open]");
for (const el of openEls) {
    el.addEventListener("click", function() {
        const modalId = this.dataset.open;
        document.getElementById(modalId).classList.add(isVisible);
    });
}




backModal.addEventListener("click", e => {
    window.location.href = 'regions.html';
});