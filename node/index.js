const express = require('express')
const app = express()
const port = 3000

const config = {
    host: 'db',
    user: 'root',
    password: 'root',
    database:'nodedb'
};
const mysql = require('mysql')


app.get('/', async (req,res) => {

    const connection = await mysql.createConnection(config)

    const sql = `INSERT INTO people(nome) values('viniciosdb')`

    await connection.query(sql)
    await connection.end()

    res.send('<h1>Full Cycle Rocks!</h1>')
})

app.listen(port, ()=> {
    console.log('Rodando na porta ' + port)
})