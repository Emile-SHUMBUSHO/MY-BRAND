function register(e) {
    event.preventDefault();
    let userName = document.getElementById('userName').value;
    let email = document.getElementById('email').value;
    let password1 = document.getElementById('password1').value;
    let password2 = document.getElementById('password2').value;
    let user = {
        userName: userName,
        email: email,
        password1: password1,
        password2: password2
    }
    let jsonData = JSON.stringify(user);
    localStorage.setItem('userInfo', jsonData);
    window.location = 'http://127.0.0.1:5500/UI/pages/login.html';
}

function login(e){
    event.preventDefault();
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;
    let result = document.getElementById('result');
    let user = localStorage.getItem('userInfo');
    let data = JSON.parse(user);
    if(data == null){
        result.classList.add('error');
        result.innerHTML = 'user does not exist';
    }else if(email == data.email && password == data.password1){
        result.classList.add('success');
        result.innerHTML = 'user logged in successfully';
        window.location='http://127.0.0.1:5500/UI/pages/dashboard.html'
    }else{
        result.classList.add('error');
        result.innerHTML = 'unauthorized user';
    }
}

function logOut(){
    localStorage.removeItem('userInfo');
    window.location = 'http://127.0.0.1:5500/UI/pages/login.html';
}