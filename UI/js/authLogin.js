const form = document.querySelector('form');
const email = document.getElementById('email');
const password1 = document.getElementById('password1');
let result = document.getElementById('result');

form.onsubmit = (e) => {
    e.preventDefault();
    validateInputs();
    let user = localStorage.getItem('userInfo');
    let data = JSON.parse(user);
    const emailValue = email.value.trim();
    const passwordValue = password1.value.trim();
    if(data == null){
        result.classList.add('error');
        result.innerHTML = 'user does not exist';
    }else if(emailValue == data.email && passwordValue == data.password1){
        result.classList.add('success');
        result.innerHTML = 'user logged in successfully';
    }else{
        result.classList.add('error');
        result.innerHTML = 'unauthorized user';
    }
};

const isValidEmail = (email) => {
    const rejex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return rejex.test(String(email).toLowerCase());
}

const setError = (element, message) => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');
    errorDisplay.innerText = message;
    inputControl.classList.add('error');
    inputControl.classList.remove('success');
}

const setSuccess = (element) => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');

    errorDisplay.innerText = '';
    inputControl.classList.add('success');
    inputControl.classList.remove('error');
}

const validateInputs = () =>  {
    const emailValue = email.value.trim();
    const password1Value = password1.value.trim();
    if(emailValue === ''){
        setError(email, 'Email must not be empty');
    }
    else if(!isValidEmail(emailValue)){
        setError(email, 'Invalid email');
    }
    else{
        setSuccess(email);
    }

    if(password1Value === ''){
        setError(password1, 'Password must not be empty');
    }
    else if(password1Value.length < 8){
        setError(password1, 'password must be at least 8 characters long');
    }
    else{
        setSuccess(password1);
    }
};


// function logOut(){
//     localStorage.removeItem('userInfo');
//     window.location = 'http://127.0.0.1:5500/UI/pages/login.html';
// }