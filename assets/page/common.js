
validate();
function validate(){
    if (!token){
        sendToError();
    }else{
        fetch('/validate', {
            'method': 'POST',
            'body': JSON.stringify({
                'token': token
            })
        })
        .then(response => response.json())
        .then(result => {
            if (result.status != 4){
                sendToError();
            }
        })
    }
}

function sendToError(){
    localStorage.removeItem('token');
    location.href = '/login';
}