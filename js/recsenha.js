const container = document.getElementById('container');
const registerBtn = document.getElementById('register');
const loginBtn = document.getElementById('login');

const signUp = document.querySelector('.sign-up');
const signIn = document.querySelector('.sign-in');

const emailField = document.querySelector('input');

emailField.addEventListener('input', () => {
  emailField.setCustomValidity('');
  emailField.checkValidity();
    console.log(emailField.checkValidity());

});

registerBtn.addEventListener('click', () => {
    container.classList.add("active");
});

loginBtn.addEventListener('click', () => {
    container.classList.remove("active");
});
