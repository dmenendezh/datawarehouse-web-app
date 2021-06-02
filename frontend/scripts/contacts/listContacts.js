listAllContacts();

async function listAllContacts() {   
    const options = {
        method: 'GET',
        headers: {    
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': '*'}
    }

    const response = await fetch('http://localhost:3000/contacts/listContacts', options)
    const data = await response.json()
    if (response.status === 200) {
        for (let i = 0; i < data.quantity; i++) {
            const contactContainer = document.createElement('tr');
            contactContainer.classList.add("tr_"+i);
			contactContainer.innerHTML = `            
            <tr>
                <td><input onclick="checkContact(${i})" index=${i} type="checkbox"></td>
                <td><img src="http://localhost:5500/frontend/images/user.png" class="avatarImage"> ${data.contacts[i].contact_name}  ${data.contacts[i].contact_surname}<span class="grid-contact">${data.contacts[i].contact_email}</span></td>
                <td>${data.contacts[i].country_name} <span class="grid-contact">${data.contacts[i].city_name}</span></td>
                <td>${data.contacts[i].company_name}</td>
                <td>${data.contacts[i].contact_charge}</td>
                <td>${data.contacts[i].contact_interest}% <progress class="contactprogress" id="file" max="100" value="${data.contacts[i].contact_interest}"></progress></td>
                <td><a onclick="editUser('${data.contacts[i].company_id}')"><i class="fas fa-edit"></i></a> | <a onclick="removeUser('${data.contacts[i].company_id}')"><i class="fas fa-user-times"></i></a></td>
            </tr>`;
			$tbody_contacts.appendChild(contactContainer);
		}
        $('#dataTable').dataTable( {
            pageLength : 50 } );

        document.querySelectorAll("#dataTable_length")[0].classList.add("hidden");
        document.querySelectorAll("#dataTable_filter")[0].classList.add("hidden");
        document.querySelectorAll("#dataTable_info")[0].classList.add("hidden");
        document.getElementById("btnselects").classList.remove("sorting_asc");
        document.getElementById("btns_actions").classList.remove("sorting");
        

    }
}

function checkContact(index){}



