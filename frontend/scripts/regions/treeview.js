var treeDataSource = [    
    { id: 'America', parent: '#', text: 'America', type: 'folder',tipo: 'region' }, 
        { id: 'Argentina', parent: 'America', text: 'Argentina', type: 'folder',tipo: 'country'}, 
            { id: 'Buenos Aires', parent: 'Argentina', text: 'Buenos Aires', type: 'folder',tipo: 'city' },    
            { id: 'Cordoba', parent: 'Argentina', text: 'Cordoba', type: 'folder', tipo: 'city'},       
        { id: 'Colombia', parent: 'America', text: 'Colombia', type: 'folder',tipo: 'country'}, 
            { id: 'Bogota', parent: 'Colombia', text: 'Bogota', type: 'folder', tipo: 'city' },    
        { id: 'Uruguay', parent: 'America', text: 'Uruguay', type: 'folder',tipo: 'country' },
            { id: 'Montevideo', parent: 'Uruguay', text: 'Montevideo', type: 'folder',tipo: 'city' },    
            { id: 'Paysandu', parent: 'Uruguay', text: 'Paysandu', type: 'folder',tipo: 'city' },    

    { id: 'Europa', parent: '#', text: 'Europa', type: 'folder',tipo: 'region' },    
    { id: 'Francia', parent: 'Europa', text: 'Francia', type: 'folder',tipo: 'country'},
    { id: 'Paris', parent: 'Francia', text: 'Paris', type: 'folder',tipo: 'city' }];
     
$(function () { $('#jstree').jstree({
    "core": {   
        "check_callback": true, 
        "data": treeDataSource    
    },    
    "types": {    
        "folder": {    
            "icon": "fa fa-folder"    
        },    
        "file": {    
            "icon": "fa fa-file"    
        }    
    },    
    "plugins": ["types"]   
}).bind('ready.jstree', function (e, data) {    
    $('#jstree').jstree('open_all')    
})    

});
 
$('#jstree').bind("select_node.jstree", function (event,data) {    
    const SEL = data.node.original.text; 
    const TYPE = data.node.original.tipo; 
    $flagType.setAttribute("value", TYPE);
 });


$btnBack.addEventListener('click', (event) => {
    window.location.href = 'regions.html';
});



$btnConfirm.addEventListener('click', async (event) => {
    
    const TYPE = document.getElementById('flagType').value;

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

function fncCreateCity() {
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
};

function fncEdit() {
var ref = $('#jstree').jstree(true),
    sel = ref.get_selected();
if(!sel.length) { return false; }
sel = sel[0];
ref.edit(sel);
};

function fncDelete() {
var ref = $('#jstree').jstree(true),
    sel = ref.get_selected();
if(!sel.length) { return false; }
ref.delete_node(sel);
};
