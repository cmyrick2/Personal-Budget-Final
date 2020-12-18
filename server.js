const express = require('express');
const app = express();
const port = 3000;
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const secretKey = "My secret key";
const jwt = require('jsonwebtoken');
//const exjwt = require("express-jwt");
const User = require('./models/user');
const Chart = require('./models/expense_schema');
let url = 'mongodb://localhost:27017/personal_budget_final';
mongoose.set("useCreateIndex", true);
const upsert = { upsert: true };
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// Add headers
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', `http://localhost:${port}`);

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'Content-type,Authorization');

    // Pass to next layer of middleware
    next();
});





app.post("/api/signup", (req, res) => {
    const { email, password } = req.body;

    if(!email || typeof email !== 'string') {
        return res.json({ status: 'error', ok: 0, error: 'Invalid email'});
    }

    if(email.length < 6) {
        return res.json({ status: 'error', ok: 0, error: 'email is too short, must be at least 6 characters'});
    }

    if(!password || typeof password !== 'string') {
        return res.json({ status: 'error', ok: 0, error: 'Invalid password'});
    }

    if(password.length < 6) {
        return res.json({ status: 'error', ok: 0, error: 'Password too small, must be at least 6 characters'});
    }

    mongoose
        .connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => {
            User.findOne({
                email: email
            }, function(error, user) {
                if (error != null) {
                    mongoose.connection.close();
                    return res.json({ status: 'error', ok: 0, error: error});
                }

                if (user != null) {
                    mongoose.connection.close();
                    return res.json({ status: 'error', ok: 0, error: "Must choose different email"});
                }

                bcrypt.genSalt(10, function (err, salt ) {
                    bcrypt.hash(password, salt, function(err, hash) {
                        const token = jwt.sign({ email: email }, secretKey, { expiresIn: "1d" });

                        const user = new User ({
                            email: email,
                            password: hash,
                            salt: salt,
                            expense: []
                        });

                        User.updateOne({ email: email}, user, upsert)
                            .then((data) => {
                                mongoose.connection.close();
                                data.token = token;
                                res.json(data);
                            })
                            .catch((connectionError) => {
                                console.log(connectionError);
                            });
                    });
                });
            });
    })
    .catch((connectionError) => {
        console.log(connectionError);
    });
});

app.post('/api/login', async (req, res) => {
    const { email, password: plainTextPassword } = req.body

    mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
            .then(() => {
                User.findOne({
                    email: email
                }, function (error, user) {
                    mongoose.connection.close();

                    if (error != null) {
                        return res.json({status: 'error', ok: 0, error: error});
                    }

                    if (user == null) {
                        return res.json({status: 'error', ok: 0, error: "User is not within database"});
                    }

                    bcrypt.hash(plainTextPassword, user.salt, function (err, hash) {
                        if (hash !== user.password) {
                            return res.json({status: 'error', ok: 0, error: "Password does not match email in database"});
                        }

                        let token = jwt.sign({ email: email}, secretKey, {expiresIn: "1d"});

                        res.json({token: token, status: 'ok'});
                    });
                });
            })
            .catch((connectionError) => {
                console.log(connectionError);
            })

        })




app.listen(port, () => {
    console.log(`Example API listening at http://localhost:${port}`)
});
