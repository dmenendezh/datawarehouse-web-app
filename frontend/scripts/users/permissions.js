window.addEventListener("load", function(event) {    
    let token = sessionStorage.getItem('Token');
    const headerData = parseJwt(token);

    if(headerData.admin == 1){//is admin
        usr_link.removeAttribute("hidden");
    }else{
        usr_link.setAttribute("hidden","true");
    }
    usrName.appendChild(document.createTextNode(headerData.usr_name + " " +  headerData.usr_surname));
    
});

function parseJwt(token) {
    try {
      const base64HeaderUrl = token.split(',')[1];
      const base64Header = base64HeaderUrl.replace('-', '+').replace('_', '/');

      let tw = base64Header.split(':')[1];
      tw = tw.slice(1,tw.length)
      tw = tw.slice(0,tw.length -2)

      const token_part = tw.split('.')[1];
      const headerData = JSON.parse(window.atob(token_part));
      return headerData;

    } catch (err) {
      return false;
    }
  }

// window.addEventListener('storage', function(e) {  
//   console.log("Key: " + e.key);
//   console.log("Old value: " + e.oldValue);
//  console.log("New value: " + e.newValue);
//   console.log("Url: " + e.url);
//   console.log("Storage area: " + JSON.stringify(e.storageArea));
//});