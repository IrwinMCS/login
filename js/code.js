const crypto = require('crypto');
const nodemailer = require('nodemailer');
const mysql = require('mysql');

// Configurações do banco de dados
const dbConfig = {
    host: '127.0.0.1',
    user: 'root',
    password: 'Irwinclaro!1',
    database: 'app'
};

// Configurações do e-mail
const emailConfig = {
    service: 'gmail',
    auth: {
        user: 'logint435@gmail.com',
        pass: 'Irwinclaro!1'
    }
};

// Criação de uma conexão com o banco de dados
const connection = mysql.createConnection(dbConfig);

// Função para gerar um código aleatório de 5 caracteres
function gerarCodigo() {
    return crypto.randomBytes(3).toString('hex').toUpperCase();
}

// Função para verificar se um e-mail existe no banco de dados
function verificarEmail(destinatario, callback) {
    const sql = 'SELECT COUNT(*) AS count FROM usuarios WHERE email = ?';
    connection.query(sql, [destinatario], (error, results, fields) => {
        if (error) {
            callback(error, null);
            return;
        }
        const count = results[0].count;
        callback(null, count > 0);
    });
}

// Função para atualizar o banco de dados com o código gerado
function atualizarBancoDeDados(codigo, callback) {
    const sql = 'UPDATE usuarios SET codigo = ?';
    connection.query(sql, [codigo], (error, results, fields) => {
        if (error) {
            callback(error);
            return;
        }
        callback(null);
    });
}

// Função para enviar o e-mail com o código
function enviarEmail(destinatario, codigo, callback) {
    const transporter = nodemailer.createTransport(emailConfig);

    const mailOptions = {
        from: emailConfig.auth.user,
        to: destinatario,
        subject: 'Código de Verificação',
        text: `Seu código de verificação é: ${codigo}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            callback(error);
            return;
        }
        callback(null);
    });
}

// Uso das funções para gerar o código, verificar o e-mail, atualizar o banco de dados e enviar o e-mail
document.addEventListener('DOMContentLoaded', function() {
    var enviarEmailButton = document.getElementById('register');

    enviarEmailButton.addEventListener('click', function() {
        var destinatario = document.getElementById('email').value;
        enviarEmail(destinatario);
    });
});

function enviarEmail(destinatario) {
    if (!destinatario) {
        console.error('Endereço de e-mail não foi fornecido.');
        return;
    }
    
    const codigo = gerarCodigo();
    verificarEmail(destinatario, (error, existe) => {
        if (error) {
            console.error('Erro ao verificar e-mail:', error);
            return;
        }
        if (existe) {
            atualizarBancoDeDados(codigo, (error) => {
                if (error) {
                    console.error('Erro ao atualizar o banco de dados:', error);
                    return;
                }
                enviarEmail(destinatario, codigo, (error) => {
                    if (error) {
                        console.error('Erro ao enviar o e-mail:', error);
                        return;
                    }
                    console.log('E-mail enviado com sucesso para', destinatario);
                });
            });
        } else {
            console.error('O e-mail não está cadastrado no banco de dados.');
        }
    });
}
