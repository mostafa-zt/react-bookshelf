const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const path = require('path');
const config = require('./config/config').get(process.env.NODE_ENV);

const userRoutes = require('./routes/user');
const bookRoutes = require('./routes/book');

const app = express();

mongoose.Promise = global.Promise;

app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static('client/build'));

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
});

app.use('/api', userRoutes);
app.use('/api', bookRoutes);


if (process.env.NODE_ENV === 'production') {
    app.get((req, res) => {
        res.sendFile(path.resolve(__dirname, '../client', 'build', 'index.html'));
    })
}

const port = process.env.PORT || 4000;
mongoose.connect(config.DATABASE)
    .then(result => {
        console.log('database connected...');
        app.listen(port, () => {
            console.log('server running...');
        })
    })
