const form = document.getElementById('form');
const userName = document.getElementById('userName');
const email = document.getElementById('email');
const password1 = document.getElementById('password1');
const password2 = document.getElementById('password2');

form.onsubmit = (e) => {
    e.preventDefault();
    validateInputs();
    let user = {
        userName: userName.value.trim(),
        email: email.value.trim(),
        password1: password1.value.trim(),
        password2: password2.value.trim()
    }
    let jsonData = JSON.stringify(user);
    localStorage.setItem('userInfo', jsonData);
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
    const userNameValue = userName.value.trim();
    const emailValue = email.value.trim();
    const password1Value = password1.value.trim();
    const password2Value = password2.value.trim();

    if(userNameValue === ''){
        setError(userName, 'User name must not be empty');
    }
    else{
        setSuccess(userName);
    };

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

    if(password2Value === ''){
        setError(password2, 'Confirm password must not be empty');
    }
    else if(password1Value !== password1Value){
        setError(password2, 'Password did not match');
    }
    else{
        setSuccess(password2)
    }
};