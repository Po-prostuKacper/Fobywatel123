
var left = 0;
var leftMax = 180;
var loading = document.querySelector('.loading_bar');
var timer = document.querySelector('.expire_highlight');
var numbers = document.querySelector('.numbers');
var qrImage = document.querySelector(".qr_image");

var secret;
var privateKey;
var publicKey;
var sessionUuid;
var qrCode;

setLeft();
function setLeft(){
    if (left == 0){
        generateQR();
        left = leftMax;
    }
    var min = parseInt(left/60);
    var sec = parseInt(left - min*60);
    if (min == 0){
        timer.innerHTML = sec + " sek."
    }else{
        timer.innerHTML = min + " min " + sec + " sek."
    }
    loading.style.width = (left/leftMax)*100 + "%"
    left--;
    delay(1000).then(() => {
        setLeft()
    })
}

function generateQR(){

    fetch('/qr/generate?' + params)
    .then(response => response.json())
    .then(result => {
        
        qrCode = result.qrCode;

        qrImage.innerHTML = "";
        qr = new QRCode(qrImage, {
            text: qrCode,
            width: 300,
            height: 300,
            correctLevel: QRCode.CorrectLevel.M
        });

        numbers.innerHTML = result.code

        secret = result.secret;
        publicKey = result.encodedPublicKey;
        privateKey = result.encodedPrivateKey;
        sessionUuid = result.sessionUuid;

        awaitResponse();
    })

}

function awaitResponse(){

    fetch('/qr/check?' + params, {
        method: 'POST',
        body: JSON.stringify({
            'secret': secret,
            'encodedPublicKey': publicKey,
            'encodedPrivateKey': privateKey,
            'sessionUuid': sessionUuid,
            'qrCode': qrCode
        })
    })
    .then(response => {
        if (response.status == 204){
            return delay(5000).then(() => {
                awaitResponse();
                return null
            })
        }else{
            return response.json()
        }
    })
    .then(result => {
        if (result){
            saveTemporaryData(result);
        }
    })
}

async function saveTemporaryData(data) {
    var db = await getDb();

    data['data'] = 'temp';
    await saveData(db, data);

    sendTo('display');
}