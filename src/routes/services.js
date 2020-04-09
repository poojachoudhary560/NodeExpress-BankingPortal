const express = require('express');

const router = express.Router();
const { accounts, writeJSON } = require('../data');

router.get('/transfer', (req, res) => {
    res.render('transfer');

});

router.post('/transfer', (req, res) => {
    const { from, to, amount } = req.body;

    accounts[from].balance = accounts[from].balance - parseInt(amount);
    accounts[to].balance = parseInt(accounts[to].balance) + parseInt(amount);
    //const accountsJSON = JSON.stringify(accounts);
    //fs.writeFileSync(path.join(__dirname, 'json/accounts.json'), accountsJSON,'UTF8');
    writeJSON();
    res.render('transfer', {
        message: "Transfer Completed"
    });
});

router.get('/payment', (req, res) => {
    res.render('payment', {
        account: accounts.credit
    });
});

router.post('/payment', (req, res) => {
    const { amount } = req.body;
    accounts.credit.balance -= parseInt(amount);
    accounts.credit.available += parseInt(amount);
    //const accountsJSON = JSON.stringify(accounts);
    writeJSON();
    //fs.writeFileSync(path.join(__dirname, 'json/accounts.json'), accountsJSON,'UTF8');

    res.render('payment', {
        message: "Payment Successful", account: accounts.credit
    })
})

module.exports = router;