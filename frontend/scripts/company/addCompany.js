const isVisible = "is-visible";
const openEls = document.querySelectorAll("[data-open]");
for (const el of openEls) {
    el.addEventListener("click", function() {
        const modalId = this.dataset.open;
        document.getElementById(modalId).classList.add(isVisible);
    });
}


backModalCompany.addEventListener("click", e => {
    document.querySelectorAll("#modal1")[0].classList.remove(isVisible);
});

$btnCreateCompany.addEventListener("click", e => {
    loadCityCombo();
});

$btnConfirmModalCompany.addEventListener("click", async (e) => {
    const companyName = document.getElementById('inputCompanyName');
    const companyAddress = document.getElementById('inputcompanyAddress');
    const companyEmail = document.getElementById('inputcompanyEmail');
    const companyCity = document.getElementById('cmbcompanyCity');

    const dataCompany = {
        company_name: companyName.value,
        company_address: companyAddress.value,
        company_email: companyEmail.value,
        city_id: companyCity.value
    }

    const options = {
        method: 'POST',
        body: JSON.stringify(dataCompany),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': '*'
        }
    }

    const response = await fetch('http://localhost:3000/companies/createCompany', options)
    const data = await response.json()
    if (response.status === 201) {
        swal({
            title: "Compañia agregada existosamente",
            text: "",
            type: "success",
            timer: 3000,
            showConfirmButton: true
        }, function() {
            window.location.href = "companys.html";
        });
    }
});


const loadCityCombo = async () => {
    const options = {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': '*'
        }
    }

    limpiar($cmbcompanyCity);

    const endpoint = `http://localhost:3000/regions/listCities`
    const response = await fetch(endpoint, options)
    const dataCities = await response.json()
    if (response.status === 200) {
        console.log("resultado");

        const option = document.createElement('option');
        option.setAttribute('value', "");
        option.innerHTML = ``;
        $cmbcompanyCity.appendChild(option);

        for (let i = 0; i < dataCities.quantity; i++) {
            const cityName = dataCities.cities[i].city_name;
            const cityId = dataCities.cities[i].city_id;

            const option = document.createElement('option');
            option.setAttribute('value', cityId);
            option.innerHTML = `${cityName}`;
            $cmbcompanyCity.appendChild(option);
        }
    }
};

const limpiar = ($select) => {
    for (let i = $select.options.length; i >= 0; i--) {
        $select.remove(i);
    }
};