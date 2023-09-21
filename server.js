// Secret Key for check api middleware: 3a39ca2369b287d3872daa21e5f807a019f43f99fb2f675065e141cbdda468ac

require("dotenv").config();
const passport = require('passport');
const session = require('express-session');
const passportSetup = require('./passport');
const authRoute = require('./routes/auth');

const express = require('express');
const cors = require("cors");
const bodyParser = require('body-parser');
const app = express();

const reviews = require('./api/review');
const comments = require('./api/comment');
const users = require('./api/user');
const groups = require('./api/group');
const tags = require('./api/tag');
const userLikes = require('./api/userLike');
const userRatings = require('./api/userReviewRate');

app.use(
    session({
        secret: 'cyberwolv',
        resave: false,
        saveUninitialized: true,
    })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(
    cors({
        // origin: "http://localhost:3000",
        // origin: "https://reviewer-6vyp.onrender.com",
        origin: "185.220.205.86:3000",
        methods: "GET,POST,PUT,DELETE",
        credentials: true,
    })
);

app.use('/auth', authRoute);

app.use(bodyParser.json());
app.use(express.json());

app.use('/api/users', users);
app.use('/api/reviews', reviews);
app.use('/api/comments', comments);
app.use('/api/groups', groups);
app.use('/api/tags', tags);
app.use('/api/likes', userLikes);
app.use('/api/ratings', userRatings);

app.listen(process.env.PORT, () => {
    console.log(`Express server is running on port 5000...`);
});
