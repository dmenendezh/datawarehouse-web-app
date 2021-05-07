$userSearcher.addEventListener('keyup', (event) => {
        getSearch();
});

const getSearch = async () => {
    const value = $userSearcher.value;

	event.preventDefault();
    const options = {
        method: 'GET',
        headers: {    
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': '*'}
    }

    let endpoint = `http://localhost:3000/users/searchUser/${value}`;
    if(value == ''){
        endpoint = `http://localhost:3000/users/listall`;
    }

    const response = await fetch(endpoint, options);
    const data = await response.json()

    if (response.status === 200) {
        console.log("resultado");
        console.log(data);      
        console.log(data.quantity);       
    }

    //const matchedArray = findMatches(searchValue, data);
    //console.log(matchedArray);

};
/*
function search(e) {
    console.log("escribiendo....")

    const nombre_txt = document.getElementById('inputPassword');
    const name = {
        nombre: nombre_txt.value   
    }
    const options = {
        method: 'GET',
        body: JSON.stringify(name),
        headers: {    
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': '*'}
    }
    const response = await fetch('http://localhost:3000/users/searchUser', options)
    console.log(response);

    const cities = [];

    const data = await response.json();
    if (response.status === 200) {
        console.log("resultado");
        console.log(data);
        console.log(data.quantity);
        cities.push(data);
    }

    const matchedArray = findMatches(e.target.value, cities);
    console.log(matchedArray);
}
*/

//const searchUser = callSearchUser();
/*
function callSearchUser() {
    const nombre_txt = document.getElementById('inputPassword');
    const name = {
        nombre: nombre_txt.value   
    }
    const options = {
        method: 'POST',
        body: JSON.stringify(name),
        headers: {    
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': '*'}
    }

    const response = await fetch('http://localhost:3000/users/searchUser', options);
    const data = await response.json()
    if (response.status === 200) {
        console.log("resultado");
        console.log(data);
        console.log(data.quantity);
    }
}*/


function findMatches(wordToMatch, cities) {
    console.log("place.quantity:"+ cities.quantity);
    let persons = [];
    const regex = new RegExp(wordToMatch, 'gi');
    for (let index = 0; index < cities.quantity; index++) {
        console.log(cities.usr[index].usr_name);
        persons.push(cities.usr[index].usr_name);        
    }
    return persons.match(regex);
}