listAllCompanies();

async function listAllCompanies() {
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
    const data = await response.json()
    if (response.status === 200) {
        tbody_company.innerHTML = '';

        for (let i = 0; i < data.quantity; i++) {
            const companyContainer = document.createElement('tr');
            companyContainer.classList.add("tr_" + i);

            companyContainer.innerHTML = `            
            <tr>
                <td>${data.companies[i].company_name}</td>
                <td>${data.companies[i].country_name}</td>
                <td>${data.companies[i].city_name}</td>
                <td>${data.companies[i].company_address}</td>
                <td>${data.companies[i].company_email}</td>
                <td>${data.companies[i].company_phone}</td>
                <td><a onclick="editCompany('${data.companies[i].company_id}')"><i class="fas fa-edit"></i></a> | <a onclick="removeCompany('${data.companies[i].company_id}')"><i class="fas fa-trash"></i></a></td>

            </tr>
			`;
            tbody_company.appendChild(companyContainer);
        }


    }
}