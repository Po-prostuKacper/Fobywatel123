
fetch('/get/branding')
.then(response => response.json())
.then(result => {
    document.querySelectorAll('.name').forEach((element) => {
        element.innerHTML = result.name;
    })
    document.querySelectorAll('.name_caps').forEach((element) => {
        element.innerHTML = result.name.toUpperCase();
    })
    document.querySelectorAll('.logo').forEach((element) => {
        element.src = result.logo;
    })
    document.querySelectorAll('.icon').forEach((element) => {
        element.href = result.logo;
    })
})