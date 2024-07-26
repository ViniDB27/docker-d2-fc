const express = require('express');
const mysql = require('mysql');
const { faker } = require('@faker-js/faker'); 

const app = express();
const port = 3000;

const config = {
    host: 'db',
    user: 'root',
    password: 'root',
    database: 'nodedb'
};

const setName = () => {
    return new Promise((resolve, reject) => {
        const connection = mysql.createConnection(config);
        const nome = faker.person.fullName();
        const insert = `INSERT INTO people(nome) values('${nome}')`;

        connection.query(insert, function (error, results) {
            if (error) return reject(error);
            connection.end();
            resolve();
        });
    });
}

const getNames = () => {
    return new Promise((resolve, reject) => {
        const connection = mysql.createConnection(config);
        const select = `SELECT * FROM people`;
        const nomes = [];

        connection.query(select, function (error, results) {
            if (error) return reject(error);

            results.map((result) => {
                nomes.push(result.nome);
            });

            connection.end();
            resolve(nomes);
        });
    });
}

app.get('/', async (req, res) => {
    try {
        await setName();
        const nomes = await getNames();
        res.send(`<h1>Full Cycle Rocks!</h1><ul>${nomes.map(nome => `<li>${nome}</li>`).join('')}</ul>`);
    } catch (error) {
        res.status(500).send('Erro ao acessar o banco de dados');
    }
});

app.listen(port, () => {
    console.log(`Rodando na porta ${port}`);
});