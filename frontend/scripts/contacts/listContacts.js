listAllContacts();

async function listAllContacts() {

    let token = sessionStorage.getItem('Tokenizer');


    const options = {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': '*',
            'Authorization': token
        }
    }

    const response = await fetch('http://localhost:3000/contacts/listContacts', options)
    const data = await response.json()

    if (response.status === 200) {
        for (let i = 0; i < data.quantity; i++) {
            const contactContainer = document.createElement('tr');
            contactContainer.classList.add("tr_" + i);
            contactContainer.innerHTML = `            
            <tr>
                <td><input onclick="checkContact(${i})" index=${i} type="checkbox"></td>
                <td><img id="avatar" src="${generateAvatar(data.contacts[i].contact_name + ";" + data.contacts[i].contact_surname, "white", "#009578")}" class="Avatar"> ${data.contacts[i].contact_name}  ${data.contacts[i].contact_surname}<span class="grid-contact">${data.contacts[i].contact_email}</span></td>
                <td>${data.contacts[i].country_name} <span class="grid-contact">${data.contacts[i].city_name}</span></td>
                <td>${data.contacts[i].company_name}</td>
                <td>${data.contacts[i].contact_charge}</td>
                <td>${data.contacts[i].contact_interest}% <progress class="contactprogress" id="file" max="100" value="${data.contacts[i].contact_interest}"></progress></td>
                <td><a onclick="editContact('${data.contacts[i].contact_id}')"><i class="fas fa-edit"></i></a> | <a onclick="removeContact('${data.contacts[i].contact_id}')"><i class="fas fa-trash"></i></a></td>
            </tr>`;
            $tbody_contacts.appendChild(contactContainer);
        }
        $('#dataTable').dataTable({
            pageLength: 50,
            "order": [ 5, 'desc' ]
        });

        document.querySelectorAll("#dataTable_length")[0].classList.add("hidden");
        document.querySelectorAll("#dataTable_filter")[0].classList.add("hidden");
        document.querySelectorAll("#dataTable_info")[0].classList.add("hidden");
        document.getElementById("btnselects").classList.remove("sorting_asc");
        document.getElementById("btns_actions").classList.remove("sorting");

        var progress = document.getElementById('file');
        progress.style.background = 'red';

    }else if(response.status === 403){
        window.location.href = "index.html";
    }
}

function checkContact(index) {}


function devuelveIniciales(text) {
    const separa = text.split(";");
    const iniciales = separa[0].charAt(0) + "" + separa[1].charAt(0)
    return iniciales;
}

function generateAvatar(text, foregroundColor, backgroundColor) {
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");

    console.log(devuelveIniciales(text));

    const iniciales = devuelveIniciales(text);

    canvas.width = 30;
    canvas.height = 30;


    // Draw background
    context.fillStyle = backgroundColor;
    context.fillRect(0, 0, canvas.width, canvas.height);

    // Draw text
    context.font = "bold 15px Assistant";
    context.fillStyle = foregroundColor;
    context.textAlign = "center";
    context.textBaseline = "middle";
    context.fillText(iniciales, canvas.width / 2, canvas.height / 2);

    return canvas.toDataURL("image/png");
}