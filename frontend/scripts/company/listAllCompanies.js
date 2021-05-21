listAllCompanies();

async function listAllCompanies() {   
    const options = {
        method: 'GET',
        headers: {    
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': '*'}
    }

    const response = await fetch('http://localhost:3000/companies/listCompanies', options)
    const data = await response.json()
    if (response.status === 200) {
        for (let i = 0; i < data.quantity; i++) {
          
          
            const companyContainer = document.createElement('tbody');
            const endPointRemove = `http://localhost:3000/companies/removeCompany/${data.companies[i].company_id}`
            const endPointEdit = `http://localhost:3000/companies/editCompany/${data.companies[i].company_id}`

			companyContainer.innerHTML = `            
            <tr>
                <td>${data.companies[i].company_name}</td>
                <td>${data.companies[i].country_name}</td>
                <td>${data.companies[i].city_name}</td>
                <td>${data.companies[i].company_address}</td>
                <td>${data.companies[i].company_email}</td>
                <td><a onclick="editUser('${data.companies[i].company_id}')"><i class="fas fa-edit"></i></a> | <a onclick="removeUser('${data.companies[i].company_id}')"><i class="fas fa-user-times"></i></a></td>

            </tr>
			`;
			$dataTable.appendChild(companyContainer);
		}


    }
}
