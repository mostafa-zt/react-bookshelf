const express = require('express');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const path = require('path');
const config = require('./config/config').get(process.env.NODE_ENV);

const userRoutes = require('./routes/user');
const bookRoutes = require('./routes/book');

const app = express();

mongoose.Promise = global.Promise;

app.use(express.json());
app.use(cookieParser());
app.use(express.static('client'));

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    next();
});

app.use('/api', userRoutes);
app.use('/api', bookRoutes);

if (process.env.NODE_ENV === 'production') {
    app.get('/*', (req, res) => {
        res.sendFile(path.join(__dirname, '../client', 'index.html'));
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
