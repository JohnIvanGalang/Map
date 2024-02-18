// login or Sign Up

const loginButton = document.getElementById('goto-main');
const signUpButton = document.getElementById('goto-signup');

const log_Username = document.getElementById('display-username');
const log_Password = document.getElementById('display-password');

const sign_Email = document.getElementById('user-email-input');
const sign_Username = document.getElementById('user-username-input');
const sign_Password = document.getElementById('user-password-input');


// login onclick function
const logIn = () => {
    const userData = {
        username: log_Username.value,
        password: log_Password.value
    };
    saveDataToLocalStorage(userData);
    
}

// signup onclick function
const signUp = () => {
    const userData = {
        email: sign_Email.value,
        username: sign_Username.value,
        password: sign_Password.value
    };
    saveDataToLocalStorage(userData);
}

// save to local storage function
// saved as objects
function saveDataToLocalStorage(inputs) {
    const inputData = JSON.parse(localStorage.getItem('userData')) || [];
    inputData.push(inputs);

    localStorage.setItem('userData', JSON.stringify(inputData));

    console.log("Recorded Data:", inputs);
}




loginButton.addEventListener('click', logIn);
signUpButton.addEventListener('click', signUp);