const express = require('express');
const path = require('path');
const morgan = require('morgan');
const mysql = require('mysql');
const myConnection = require('express-myconnection');

const app = express();

//importing routes
const productRoute = require('./routes/protuct');
const exp = require('constants');

//setting
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
//app.use('/public', express.static('public'))

//middlewares
app.use(morgan('dev'));
app.use(myConnection(mysql, {
    host: 'ec2-3-84-187-47.compute-1.amazonaws.com',
    user: 'newuser',
    password: 'password',
    port: 3306,
    database: 'data'
}, 'single'));

app.use(express.urlencoded({extended: false}));

//routes
app.use('/', productRoute);
//res.sendFile(path.resolve(__dirname,'index.html'));

// static files
app.use(express.static(path.join(__dirname, 'public')))

app.listen(app.get('port'), () => {
    console.log(`server on port ${app.get('port')}`);
})