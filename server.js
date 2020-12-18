const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;
//const path = require('path')
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs')
const User = require('./models/user')
//const pbModel = require('./models/expense_schema.js');
let url = 'mongodb://localhost:27017/personal_budget_db';
/*mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
})*/


app.use(cors());
app.use(express.json());
//app.use('/', express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//const fs = require('fs');

//const path = require('path');


//app.post('/api/login', async (req, res) => {
//    res.json({ status: 'ok' })
//})

app.post('/login', async (req, res) => {
    const { username, password: plainTextPassword } = req.body

    if(!username || typeof username !== 'string') {
        return res.json({ status: 'error', error: 'Invalid username'})
    }

    if(!plainTextPassword || typeof plainTextPassword !== 'string') {
        return res.json({ status: 'error', error: 'Invalid password'})
    }

    if(plainTextPassword.length < 5) {
        return res.json({ status: 'error', error: 'Password too small, must be at least 6 characters'})
    }

    const password = await bcrypt.hash(plainTextPassword, 10)
    
    try {
        const response = await User.create({
            username,
            password
        })
        console.log('User created successfully', response)
    } catch(error) {
        if(error.code === 11000) {
            return res.json({ status: 'error', error: 'Username already in use'})
        }
        throw error
    }
    res.json({ status: 'ok' })
})

app.get('/login', (req, res) => {
    console.log('hmm')
})




//app.get('/budget', (req, res) => {
//    res.json(budget);
//});


app.listen(port, () => {
    console.log(`Example API listening at http://localhost:${port}`)
});