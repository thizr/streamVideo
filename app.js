const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const videoRoutes = require('./routes/video');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors({
    origin: '*',
    "Accept-Ranges": "bytes",
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: [ 'content-type, Authorization, X-Requested-With, Origin, accept'],
}));



app.use('/api/', videoRoutes);


app.use((req, res, next) => {
    res.send('Server Streamming run');
    next();
})

module.exports = app;
