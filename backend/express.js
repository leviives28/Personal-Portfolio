const https = require('https');
const express = require('express');
const fs = require('fs');
const database = require('./sql.js');
const responsePage = require('./responsePage.js');

const certs = {
    key: fs.readFileSync('path to ssl key file'),
    cert: fs.readFileSync('path to ssl certificate file')
}

const app = express();

app.use(express.urlencoded({ extended: true }));

https.createServer(certs, app).listen(3006);

app.post('/add_review', async (req, res) => {
    if(req.body.review_id.length !== 12 || !req.body.review_id.match(/^[a-zA-Z0-9]+$/)) {
        res.status(401).send(responsePage.createHtml('You provided invalid form data: Invalid review code'));
        return;
    }
    let valid_code = await database.check_code_validity(req.body.review_id);
    if (!valid_code) {
        res.status(401).send(responsePage.createHtml('You provided an invalid review code. Please check your emails for your review code'));
        return;
    }
    if (req.body.review.length < 25 || req.body.review.length > 255) {
        res.status(400).send(responsePage.createHtml('You provided invalid form data. Please provide a review with minimum 25 characters, and maximum 255 characters'));
        return;
    }
    let review_added = await database.add_review(req.body.review_id, req.body.review);
    if (!review_added) {
        res.status(500).send(responsePage.createHtml('An internal error occurred'));
        return;
    }
    res.status(200).send(await responsePage.createHtml('Thankyou for your review!'));
})

app.get('/get_reviews', async (req, res) => {
    let reviews = await database.get_reviews();
    if (reviews) res.status(200).send(reviews);
    else res.status(500).send('Internal error occurred');
})
