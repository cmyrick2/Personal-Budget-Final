const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const pbModel = require('./models/expense_schema.js');
let url = 'mongodb://localhost:27017/personal_budget_db';


app.use(cors());
app.use(express.json());
app.use('/', express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

const fs = require('fs');

const path = require('path');




//const budget = JSON.parse(fs.readFileSync('budget-data.json', 'utf8'));



app.post('/api/login', (req, res) => {
    const { username, password } = req.body;
    console.log('This is me', username, password);
    res.json({data: 'it works'});
});


//app.get('/budget', (req, res) => {
//    res.json(budget);
//});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/login'))
})

app.listen(port, () => {
    console.log(`Example API listening at http://localhost:${port}`)
});