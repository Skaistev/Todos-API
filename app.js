const bodyParser = require('body-parser');
const pool = require('./db');
const express = require("express")

const app = express();

app.use(bodyParser.json());

app.post('/users', async (req, res) => {

    const {name} = req.body;

    try {
        const insertQuery =  `INSERT INTO users (name) VALUES ($1)`
     
        const values = [name];
        const newUser = await pool.query(insertQuery, values);
 
    return res.status(201).json({message: "user created"});
        

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error: ' + err.message);
    }
});

app.get('/users', async (req, res) => {
    try {
        const users = await pool.query('SELECT * FROM users');
        res.json(users.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error' + err.message);
    }
});


app.put('/users/:id', async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;

    try {
        const updatedUser = await pool.query(

            `UPDATE users SET name = $1 WHERE id = $2 RETURNING*`,
            [name, id]
        );
        res.json({ message: 'User updated' });
        
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error'+ err.message );
    }
});


app.delete('/users/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await pool.query('DELETE FROM users WHERE id = $1', [id]);
        res.json({ message: 'User deleted' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

app.post('/transactions', async (req, res) => {

    const { amount, userFrom, userTo} = req.body;

    try {
        const insertQuery =  `INSERT INTO transactions (amount, user_from, user_to) VALUES ($1, $2, $3)`
        const values = [amount, userFrom, userTo];
        const newTransaction = await pool.query(insertQuery, values);
 
    return res.status(201).json({message: "transaction done", amount, userFrom, userTo});
        

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error: ' + err.message);
    }
});

app.get('/transactions', async (req, res) => {
    try {
        const transactions = await pool.query('SELECT * FROM transactions');
        res.json(transactions.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = app;