
document.getElementById('signIn-btn').addEventListener('click',function () {

    const userInput = document.getElementById('input-user');
    const userName = userInput.value
    console.log(userName)

    const passInput = document.getElementById('input-password');
    const password = passInput.value
    console.log(password)

    if (userName == 'admin' && password == 'admin123') {
        alert('Sign In Successful')
        window.location.assign("home.html")
    } else {
        alert('Sign In Failed')
        return
    }

});

