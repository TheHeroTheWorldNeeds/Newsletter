const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');

const app = express();

app.use(express.static('public'));

app.use(bodyParser.urlencoded({
    extended: true,
}));

app.get('/', (req, res) => res.sendFile(__dirname + '/signup.html'));

app.post('/', (req, res) => {
    var firstName = req.body.fn;
    var lastName = req.body.ln;
    var email = req.body.mail;

    var data = {
        members: [{
            email_address: email,
            status: "subscribed",
            merge_fields: {
                FNAME: firstName,
                LNAME: lastName
            }
        }]
    };
    var jsonData = JSON.stringify(data);

    var options = {
        url: 'https://us4.api.mailchimp.com/3.0/lists/bc44b628e4',
        method: 'POST',
        headers: {
            'Authorization': 'anvo 0658178cf0a4fee2b7fa2a75dbfd2a0f-us4',
        },
        body: jsonData
    }

    request(options, (error, response, body) => {
        if (error) {
            res.sendFile(__dirname + '/failure.html');
        } else {
            if (response.statusCode === 200) {
                res.sendFile(__dirname + '/success.html');
            } else {
                res.sendFile(__dirname + '/failure.html');
            }
        }
    });
});

app.post('/failure', (req, res) => res.redirect('/'));

app.listen(process.env.PORT || 3000, () => console.log("Server is running on port 3000."));

// 0658178cf0a4fee2b7fa2a75dbfd2a0f-us4  - API key
// bc44b628e4  -  audience id