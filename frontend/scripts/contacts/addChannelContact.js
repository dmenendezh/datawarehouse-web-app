btnConfirmModalContact.addEventListener("click", async (e) => {
    const channel = document.getElementById('cmbChannel').value;
    const preferences = document.getElementById('cmbPreferences').value;
    const account = document.getElementById('inputAccount').value;

    const datagridIndex = $("#tbody_channels tr").length;
    console.log("datagridIndex= " + datagridIndex);

    if (datagridIndex == 0) {
        const channelContainer = document.createElement('tr');
        channelContainer.classList.add("tr_0");
        channelContainer.innerHTML = `            
        <tr>
            <td>${channel}</td>
            <td>${account}</td>
            <td>${preferences}</td>
            <td><a onclick="editUser('${channel}')"><i class="fas fa-edit"></i></a> | <a onclick="removeUser('${channel}')"><i class="fas fa-user-times"></i></a></td>
        </tr>`;
        tbody_channels.appendChild(channelContainer);
    } else {
        const channelContainer = document.createElement('tr');

        const index = datagridIndex;
        channelContainer.classList.add("tr_" + index);
        channelContainer.innerHTML = `            
        <tr>
            <td>${channel}</td>
            <td>${account}</td>
            <td>${preferences}</td>
            <td><a onclick="editUser('${channel}')"><i class="fas fa-edit"></i></a> | <a onclick="removeUser('${channel}')"><i class="fas fa-user-times"></i></a></td>
        </tr>`;
        tbody_channels.appendChild(channelContainer);
    }
    const modal = document.getElementById("modal1");
    modal.classList.remove("is-visible");

});

btnSaveContact.addEventListener("click", async (e) => {
    const datagridIndex = $("#tbody_channels tr").length;
    console.log("datagridIndex= " + datagridIndex);
    const EMAIL = document.getElementById("inputContactEmail").value;

    const index = datagridIndex + 1;
    for (let i = 1; i < index; i++) {
        const CHANNEL = document.querySelectorAll("#tbody_channels")[0].childNodes[i].children[0].outerText;
        const ACCOUNT = document.querySelectorAll("#tbody_channels")[0].childNodes[i].children[1].outerText;
        const PREFERENCE = document.querySelectorAll("#tbody_channels")[0].childNodes[i].children[2].outerText;

        console.log(CHANNEL);
        console.log(ACCOUNT);
        console.log(PREFERENCE);
        console.log(EMAIL);


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
            console.log(data);
            window.location.href = 'dashboard.html';
        }

    }

});