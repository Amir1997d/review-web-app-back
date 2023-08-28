const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();

const reviews = require('./api/review');
const comments = require('./api/comment');


app.use(cors());
app.use(bodyParser.json());

app.use('/api/reviews', reviews);
app.use('/api/comments', comments);

app.listen(5000, () => {
    console.log(`Express server is running on port 5000...`);
});