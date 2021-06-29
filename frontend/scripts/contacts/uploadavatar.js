$(document).ready(function() {

    var readURL = function(input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();

            reader.onload = function(e) {
                $('.profile-pic').attr('src', e.target.result);
            }

            reader.readAsDataURL(input.files[0]);
        }
    }

    $(".file-upload").on('change', function() {
        readURL(this);
    });

    $(".upload-button").on('click', function() {
        $(".file-upload").click();
    });
});

const slider = document.getElementById("slider");
const output = document.getElementById("interestValue");
output.innerHTML = slider.value;

slider.oninput = function() {
    output.innerHTML = this.value;
}


async function createImage(event) {
    var image = document.getElementById('photoUpload');
    image.src = URL.createObjectURL(event.target.files[0]);

    console.log("createImage= " + document.getElementById('photoUpload').files);
    const [file] = document.getElementById('photoUpload').files;
    const url = URL.createObjectURL(file);
    console.log("createImage= " + url);

    const formData = new FormData();

    const arrayBuffer = await file.arrayBuffer()
    const myBlob = new Blob([new Uint8Array(arrayBuffer)], {
        type: file.type,
    })

    console.log(myBlob)
    formData.append('myBlob', myBlob, file.name)

    const options = {
        method: 'POST',
        body: formData,
        headers: {
            'Accept': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': '*'
        }
    }

    console.log(options)
    const response = await fetch('http://localhost:3000/uploadPhoto', options)
    const data = await response.json()
    console.log(data);
    if (response.status === 201) {
        console.log("Sucess!")
    }



}
var blobToBase64 = function(blob, callback) {
    var reader = new FileReader();
    reader.onload = function() {
        var dataUrl = reader.result;
        var base64 = dataUrl.split(',')[1];
        callback(base64);
    };
    reader.readAsDataURL(blob);
};