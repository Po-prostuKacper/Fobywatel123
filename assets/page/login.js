
var params = new URLSearchParams(location.search);
var noLicense = "Wygląda na to, że nie zakupiłeś fObywatela, możesz to zrobić na naszym discordzie.";
var rateLimited = "Zaczekaj chwilę przed ponowna próbą zalogowania się.";
var requestError = "Serwer nie mógł przetworzyć podanych informacji.";
var errorBox = document.querySelector(".error_box");
var errorBoxOpened = "error_box_shown";
var input = document.querySelector('.input');
var errorShown = "error_shown";

var access = new URLSearchParams(window.location.hash.slice(1));
if (access.has('access_token')){
    access = access.get('access_token');
    fetch('/validate', {
        method: 'POST',
        body: JSON.stringify({
            'access': access 
        })
    })
    .then(response => response.json())
    .then(result => {
        var status = result.status;
        if (status == 1){
            openErrorBox(rateLimited);
        }else if (status == 2){
            openErrorBox(noLicense);
        }else if (status == 3){
            openErrorBox(requestError)
        }else{
            localStorage.setItem('token', result.token);
            location.href = '/dashboard'
        }
    })
}

document.querySelector('.login_button').addEventListener('click', () => {
    var value = input.value;
    if (value === ""){
        input.classList.add(errorShown);
    }else{
        fetch('/validate', {
            method: 'POST',
            body: JSON.stringify({
                'token': value
            })
        })
        .then(response => response.json())
        .then(result => {
            var status = result.status;
            if (status == 1){
                openErrorBox(rateLimited);
            }else if (status == 2){
                openErrorBox(noLicense);
            }else if (status == 3){
                openErrorBox(requestError)
            }else{
                localStorage.setItem('token', value)
                location.href = '/dashboard'
            }
        });

    }
})

if (localStorage.getItem('token')){
    location.href = '/dashboard'
}

input.addEventListener('click', () => {
    input.classList.remove(errorShown);
})

function openErrorBox(text){
    errorBox.classList.add(errorBoxOpened);
    errorBox.innerHTML = text;
}