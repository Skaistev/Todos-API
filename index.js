const express = require('express');
// const bodyParser = require('body-parser');
const pool = require('./db');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());


app.post('/users', async (req, res) => {

    const {name} = req.body;

    try {
        const insertQuery =  `INSERT INTO users (name) VALUES ($1)`
     
        const values = [name];
        const newUser = await pool.query(insertQuery, values);
 
    return res.status(201).json(newUser.rows[0]);
        

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
        res.status(500).send('Server Error');
    }
});


app.put('/users/:id', async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;

    try {
        const updatedUser = await pool.query(

            `UPDATE users SET usertname = $1 WHERE id = $2 RETURNING*`,
            [name, id]
        );
        res.json(updatedUser.rows[0]);
        
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

app.post('/transaction', async (req, res) => {

    const { id, amount, userFrom, userTo} = req.body;

    try {
        const insertQuery =  `INSERT INTO transaction (id, amount, UserFrom, UserTo) VALUES ($1, $2, $3, $4)`
        const values = [id, amount, userFrom, userTo];
        const newTransaction = await pool.query(insertQuery, values);
 
    return res.status(201).json(newTransaction.rows[0]);
        

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


app.put('/users/:id', async (req, res) => {
    const { id } = req.params;
    const { title, description, category_id, user_id } = req.body;

    try {
        const updatedTodo = await pool.query(
            `UPDATE users SET title = $1, description = $2, category_id = $3, user_id = $4 WHERE id = $5 RETURNING *`,
            [title, description, category_id, user_id, id]
        );
        res.json(updatedTodo.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
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

app.listen(PORT, () => {
    console.log(`Server running on port http://localhost:${PORT}`);
});