const nameField = document.querySelector('input');
const passwordField = document.querySelector('#password');
const senhaField = document.querySelector('#senha');

nameField.addEventListener('input', () => {
  nameField.setCustomValidity('');
  nameField.checkValidity();
  console.log(nameField.checkValidity());
});

passwordField.addEventListener('input', () => {
  const password = passwordField.value;
  const regexSpecialChar = /[!@#$%^&*(),.?":{}|<>]/;
  const regexNumber = /[0-9]/;
  const regexUpperCase = /[A-Z]/;

  let errorMessage = '';

  if (!password.trim()) {
    errorMessage = 'Senha não informada.\n';
  } else {
    if (!regexUpperCase.test(password)) {
      errorMessage += 'A senha deve conter pelo menos uma letra maiúscula.\n';
    }
    if (!regexSpecialChar.test(password)) {
      errorMessage += 'A senha deve conter pelo menos um caractere especial.\n';
    }

    if (!regexNumber.test(password)) {
      errorMessage += 'A senha deve conter pelo menos um número.\n';
    }
  }

  if (errorMessage === '') {
    passwordField.setCustomValidity('');
  } else {
    passwordField.setCustomValidity(errorMessage);
  }
  passwordField.checkValidity();
  console.log(passwordField.checkValidity());
});

nameField.addEventListener('invalid', () => {
  nameField.setCustomValidity('Nome não informado.');
});

passwordField.addEventListener('invalid', () => {
  if (!passwordField.value.trim()) {
    passwordField.setCustomValidity('Senha não informada.');
  }
});

// Faz a verificação para senha na parte de registro 
senhaField.addEventListener('input', () => {
  const password = senhaField.value;
  const regexSpecialChar = /[!@#$%^&*(),.?":{}|<>]/;
  const regexNumber = /[0-9]/;
  const regexUpperCase = /[A-Z]/;

  let errorMessage = '';

  if (!password.trim()) {
    errorMessage = 'Senha não informada.\n';
  } else {
    if (!regexUpperCase.test(password)) {
      errorMessage += 'A senha deve conter pelo menos uma letra maiúscula.\n';
    }
    if (!regexSpecialChar.test(password)) {
      errorMessage += 'A senha deve conter pelo menos um caractere especial.\n';
    }

    if (!regexNumber.test(password)) {
      errorMessage += 'A senha deve conter pelo menos um número.\n';
    }
  }

  if (errorMessage === '') {
    senhaField.setCustomValidity('');
  } else {
    senhaField.setCustomValidity(errorMessage);
  }
  senhaField.checkValidity();
  console.log(senhaField.checkValidity());
});

senhaField.addEventListener('invalid', () => {
  if (!senhaField.value.trim()) {
    senhaField.setCustomValidity('Senha não informada.');
  }
});

document.getElementById('loginForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const email = document.getElementById('email').value;
  const senha = document.getElementById('password').value;

  const response = await fetch('/login', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, senha })
  });

  if (response.ok) {
      window.location.href = 'index.html'; // Redireciona para a página de dashboard após login bem-sucedido
  } else {
      console.error('Erro ao fazer login');
      // Trate o erro aqui, exibindo uma mensagem de erro para o usuário, por exemplo.
  }
});
