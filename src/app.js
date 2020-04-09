const fs = require('fs');
const path = require('path');
const express = require('express');
const { accounts, users, writeJSON } = require('./data');
const accountRoutes = require('./routes/accounts');
const servicesRoutes = require('./routes/services');

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use('/account', accountRoutes);
app.use('/services', servicesRoutes);

/*
const accountData = fs.readFileSync('src/json/accounts.json', 'UTF8');
const accounts = JSON.parse(accountData);
const userData = fs.readFileSync('src/json/users.json', 'UTF8');
const users = JSON.parse(userData); */

app.get('/', (req, res) => {
    res.render('index',{
        title: 'Account Summary',
        accounts: accounts

    });
})




app.get('/profile', (req, res) => {
    res.render('profile', {
        user: users[0]
    })
})
app.listen(3000, () => {
    console.log('PS Project Running on port 3000!');
})