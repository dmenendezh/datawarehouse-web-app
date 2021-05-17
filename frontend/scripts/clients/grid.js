const isVisible = "is-visible";
const openEls = document.querySelectorAll("[data-open]");
for (const el of openEls) {
    el.addEventListener("click", function() {
        const modalId = this.dataset.open;
        document.getElementById(modalId).classList.add(isVisible);
    });
}


backModalContact.addEventListener("click", e => {   
    document.querySelectorAll("#modal1")[0].classList.remove(isVisible);
});

btnCreateContact.addEventListener("click", e => {   
    $cardHeader.setAttribute('hidden', true);
    $layoutAddNewContact.removeAttribute('hidden');
});

$btnGoBack.addEventListener("click", e => {   
    window.location.href = 'dashboard.html';
});

$btnAddContact.addEventListener("click", e => {
    window.location.href = 'dashboard.html';
});