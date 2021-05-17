var treeDataSource = [    
    { id: 'America', parent: '#', text: 'America', type: 'region',tipo: 'region' }, 
        { id: 'Argentina', parent: 'America', text: 'Argentina', type: 'country',tipo: 'country'}, 
            { id: 'Buenos Aires', parent: 'Argentina', text: 'Buenos Aires', type: 'city',tipo: 'city' },    
            { id: 'Cordoba', parent: 'Argentina', text: 'Cordoba', type: 'city', tipo: 'city'},       
        { id: 'Colombia', parent: 'America', text: 'Colombia', type: 'country',tipo: 'country'}, 
            { id: 'Bogota', parent: 'Colombia', text: 'Bogota', type: 'city', tipo: 'city' },    
        { id: 'Uruguay', parent: 'America', text: 'Uruguay', type: 'country',tipo: 'country' },
            { id: 'Montevideo', parent: 'Uruguay', text: 'Montevideo', type: 'city',tipo: 'city' },    
            { id: 'Paysandu', parent: 'Uruguay', text: 'Paysandu', type: 'city',tipo: 'city' },    

    { id: 'Europa', parent: '#', text: 'Europa', type: 'region',tipo: 'region' },    
    { id: 'Francia', parent: 'Europa', text: 'Francia', type: 'country',tipo: 'country'},
    { id: 'Paris', parent: 'Francia', text: 'Paris', type: 'city',tipo: 'city' }];


    async function invoqueTreeView (){
        const options = {
            method: 'GET',
            headers: {    
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': '*'}
        }
    
        const response = await fetch('http://localhost:3000/regions/treeView', options)
        const data = await response.json()
        if (response.status === 200) {
            return(data) = await Promise.resolve(data);
        }
    };
    
async function armarArray(){
        const options = {
            method: 'GET',
            headers: {    
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': '*'}
        }
    
        const response = await fetch('http://localhost:3000/regions/treeView', options)
        const data = await response.json()
        var arr = [];
        if (response.status === 200) {
            for (let i = 0; i < data.quantity; i++) {
                
                let region = data.treeview[i].region_name;
                let country = data.treeview[i].country_name;

                if(i == 0){
                    arr.push({id: `${data.treeview[i].region_name}`, parent: '#', text: `${data.treeview[i].region_name}`, type: 'region',tipo: 'region'},
                    {id: `${data.treeview[i].country_name}`, parent: `${data.treeview[i].region_name}`, text: `${data.treeview[i].country_name}`, type: 'country',tipo: 'country'},
                    { id: `${data.treeview[i].city_name}`, parent: `${data.treeview[i].country_name}`, text: `${data.treeview[i].city_name}`, type: 'city',tipo: 'city' }
                    );
                    
                }else{
                    if(region == data.treeview[i-1].region_name){
        
                        if(country == data.treeview[i-1].country_name){
                            arr.push(
                            { id: `${data.treeview[i].city_name}`, parent: `${data.treeview[i].country_name}`, text: `${data.treeview[i].city_name}`, type: 'city',tipo: 'city' }
                            );
                        }else{
                            arr.push(
                            {id: `${data.treeview[i].country_name}`, parent: `${data.treeview[i].region_name}`, text: `${data.treeview[i].country_name}`, type: 'country',tipo: 'country'},
                            { id: `${data.treeview[i].city_name}`, parent: `${data.treeview[i].country_name}`, text: `${data.treeview[i].city_name}`, type: 'city',tipo: 'city' }
                            );
                        }
                        
                    }else{
                        arr.push({id: `${data.treeview[i].region_name}`, parent: '#', text: `${data.treeview[i].region_name}`, type: 'region',tipo: 'region'},
                        {id: `${data.treeview[i].country_name}`, parent: `${data.treeview[i].region_name}`, text: `${data.treeview[i].country_name}`, type: 'country',tipo: 'country'},
                        { id: `${data.treeview[i].city_name}`, parent: `${data.treeview[i].country_name}`, text: `${data.treeview[i].city_name}`, type: 'city',tipo: 'city' }
                        );
                    }
                }
            }
        }
        //console.log(arr)
        //return arr;
        return(arr) = await Promise.resolve(arr);
    }

//let treeVIEW = invoqueTreeView();
//var ArrayJSON = armarArray();
console.log("prue");

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
            "region":{
                "icon": "fas fa-globe-americas"
            },
            "country":{
                "icon": "far fa-flag"
            },
            "city":{
                "icon": "fas fa-city"
            }    
        },    
        "plugins": ["types"]   
    }).bind('ready.jstree', function (e, data) {    
        $('#jstree').jstree('open_all')
        //armarTreeJSON(); 
    })});
});


 
$('#jstree').bind("select_node.jstree", function (event,data) {    
    const SEL = data.node.original.text; 
    const TYPE = data.node.original.tipo;
    const PARENT_SEL = data.node.parent;
    $flagType.setAttribute("value", TYPE);
    $flagValue.setAttribute("value", SEL);
    $flagParentValue.setAttribute("value", PARENT_SEL);
    console.log(PARENT_SEL)
 });


$btnBack.addEventListener('click', (event) => {
    window.location.href = 'regions.html';
});


$cmbRegions.addEventListener('change', async (event) => {
    console.log("onchange");

    const options = {
        method: 'GET',
        headers: {    
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': '*'}
    }

    limpiar($cmbCountrys);

    const regionId = document.getElementById('cmbRegions').value;

    const endpoint = `http://localhost:3000/regions/listCountries/${regionId}`
    const responseCountries = await fetch(endpoint, options)
    const dataCountries = await responseCountries.json()
    if (responseCountries.status === 200) {
        console.log("resultado");

        const optionCountry = document.createElement('option');
            optionCountry.setAttribute('value',"");
            optionCountry.innerHTML = ``;
            $cmbCountrys.appendChild(optionCountry);
        for (let i = 0; i < dataCountries.quantity; i++) {
            const countryName = dataCountries.countries[i].country_name;
            const countryId = dataCountries.countries[i].country_id;

            const optionCountry = document.createElement('option');
            optionCountry.setAttribute('value',countryId);
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
    if(TYPE == 'region'){
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
                'Access-Control-Allow-Headers': '*'}
        }
        console.log(options);

        const response = await fetch('http://localhost:3000/regions/createRegion', options)
        const data = await response.json()
        console.log(data);
        if (response.status === 201) {
            console.log(data);
            window.location.href = 'regions.html';
        }

    }else if(TYPE == 'country'){
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
                'Access-Control-Allow-Headers': '*'}
        }
        console.log(options);

        const response = await fetch('http://localhost:3000/regions/createCountry', options)
        const data = await response.json()
        console.log(data);
        if (response.status === 201) {
            console.log(data);
            window.location.href = 'regions.html';
        }
    }else if(TYPE == 'city'){
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
                'Access-Control-Allow-Headers': '*'}
        }
        console.log(options);

        const response = await fetch('http://localhost:3000/regions/createCity', options)
        const data = await response.json()
        console.log(data);
        if (response.status === 201) {
            console.log(data);
            window.location.href = 'regions.html';
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
            'Access-Control-Allow-Headers': '*'}
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
            option.setAttribute('value',regionId);
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
        'Access-Control-Allow-Headers': '*'}
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
            option.setAttribute('value',regionId);
            option.innerHTML = `${regionName}`;
            $cmbRegions.appendChild(option);
        }
    }
};

function fncEdit() {
    const TYPE = document.getElementById('flagType').value;
    console.log(TYPE);
   
    const SEL =  document.getElementById('flagValue').value;
    console.log(SEL);

    const PARENT_SEL =  document.getElementById('flagParentValue').value;
    console.log(SEL);

    if(TYPE == 'region'){
   
        $editCmbRegionContainer.setAttribute('hidden', true);
        $editCmbCountryContainer.setAttribute('hidden', true);
        $editCityContainer.setAttribute('hidden', true);
        $editInputRegionContainer.removeAttribute('hidden');
        $editInputCountryContainer.setAttribute('hidden', true);
        
        $inputEditRegion.setAttribute('value',SEL);
    }else if(TYPE == 'country'){
   
        $editCmbRegionContainer.removeAttribute('hidden');
        $editCmbCountryContainer.setAttribute('hidden', true);
        $editCityContainer.setAttribute('hidden', true);
        $editInputRegionContainer.setAttribute('hidden', true);
        $editInputCountryContainer.removeAttribute('hidden');


        $inputEditCountry.setAttribute('value',SEL);


        loadRegionCombo(PARENT_SEL);


    }else if(TYPE == 'city'){
        
        $editCmbRegionContainer.removeAttribute('hidden');
        $editCmbCountryContainer.removeAttribute('hidden');
        $editCityContainer.removeAttribute('hidden');
        $editInputRegionContainer.setAttribute('hidden', true);
        $editInputCountryContainer.setAttribute('hidden', true);
       
        $inputEditCity.setAttribute('value',SEL);

    }else{
        alert("Debe seleccionar un elemento del arbol jerarquico (Region / Pais / Ciudad)");
        window.location.href = 'regions.html';
    }
  
};

function fncDelete() {

};

async function loadRegionCombo(PARENT_SEL) {
    const options = {
        method: 'GET',
        headers: {    
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': '*'}
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
            optionRegion.setAttribute('value',regionId);
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
            'Access-Control-Allow-Headers': '*'}
    }

    const response = await fetch('http://localhost:3000/regions/listRegion', options2)
    const data = await response.json()
    if (response.status === 200) {
        console.log("resultado");
        for (let i = 0; i < data.quantity; i++) {
            if(regionName != data.regions[i].region_name){
                const regionName = data.regions[i].region_name;
                const regionId = data.regions[i].region_id;
    
                const option = document.createElement('option');
                option.setAttribute('value',regionId);
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

