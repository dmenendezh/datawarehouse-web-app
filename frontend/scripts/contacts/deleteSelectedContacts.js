let SELECTED_CONTACTS = [];

$(document).on('change', 'input[type="checkbox"]', function(e) {
    const index = this.attributes[1].value;
    const checked = this.checked;

    if (checked) {
        document.querySelectorAll(".tr_" + index)[0].classList.add("selectRowTable");
        SELECTED_CONTACTS.push(index);
    } else {
        document.querySelectorAll(".tr_" + index)[0].classList.remove("selectRowTable");
        SELECTED_CONTACTS.splice(index);
    }
    console.log(SELECTED_CONTACTS.length);
    if (SELECTED_CONTACTS.length >= 2) {
        document.querySelectorAll(".remove-selected-users")[0].classList.remove("hidden");
    } else {
        document.querySelectorAll(".remove-selected-users")[0].classList.add("hidden");
    }

});

async function removeUsersSelected() {
    for (let i = 0; i < SELECTED_CONTACTS.length; i++) {
        let index = SELECTED_CONTACTS[i];
        const EMAIL_USER = document.querySelectorAll(".tr_" + index)[0].childNodes[3].children[1].innerText;

        const options = {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': '*'
            }
        }

        const endpoint = `http://localhost:3000/contacts/deleteSelectedContacts/${EMAIL_USER}`
        const response = await fetch(endpoint, options)
        const DEL_CONTACTS = await response.json()
        if (response.status === 200) {
            console.log("resultado");
            console.log(DEL_CONTACTS);
        }
    }
    window.location.href = 'dashboard.html';

}