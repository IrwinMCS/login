const express = require('express');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const path = require('path');
const User = require('./models/user'); // Certifique-se de que o caminho esteja correto

const app = express();

app.use(bodyParser.json());

// Servir arquivos estáticos (login.js) na raiz
app.use(express.static(__dirname));

// Servir o arquivo login.html na raiz
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'login.html'));
});

// Rota de cadastro de usuário
app.post('/register', async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ message: 'Por favor, preencha todos os campos' });
    }

    // Hash da senha
    const hashedPassword = await bcrypt.hash(password, 10);

    // Inserir usuário no banco de dados
    db.query(
        'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
        [name, email, hashedPassword],
        (err, result) => {
            if (err) {
                console.error('Erro ao inserir usuário no banco de dados:', err);
                return res.status(500).json({ message: 'Erro ao cadastrar usuário' });
            }
            res.status(201).json({ message: 'Usuário cadastrado com sucesso' });
        }
    );
});

// Rota de login de usuário
app.post('/login', (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Por favor, preencha todos os campos' });
    }

    // Verificar se o usuário existe no banco de dados
    db.query('SELECT * FROM users WHERE email = ?', [email], async (err, results) => {
        if (err) {
            console.error('Erro ao buscar usuário no banco de dados:', err);
            return res.status(500).json({ message: 'Erro ao fazer login' });
        }

        if (results.length === 0) {
            return res.status(401).json({ message: 'E-mail ou senha incorretos' });
        }

        const user = results[0];

        // Verificar a senha
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'E-mail ou senha incorretos' });
        }

        res.status(200).json({ message: 'Login realizado com sucesso' });
    });
});

// Iniciar o servidor
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
