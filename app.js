const express = require('express');
const app = express();
const expressLayouts = require('express-ejs-layouts');
const bodyParser = require("body-parser");
var path = require('path');
var session = require('express-session');
app.use(bodyParser.urlencoded({extended: true}));


//session handling for HTTP requests
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false
}))


// static files
app.use(express.static(path.join(__dirname, 'public')));
app.use('/css', express.static(__dirname + '/public/css'))
app.use('/js', express.static(__dirname + '/public/js'))
app.use('/img', express.static(__dirname + '/public/img'))


//EJS
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.set('layout', 'layouts/layouts');
app.use(expressLayouts);


//Mongo Connection
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/mydb', { 
    useNewUrlParser: true, 
    useUnifiedTopology: true});
const db = mongoose.connection;
db.on('error', error => console.error(error));
db.once('open', () => console.log('MongoDB Connection Successful'));


//Routes
const indexRouter = require('./routes/index');
app.use('/', indexRouter);
const englishRouter = require('./routes/english');
app.use('/english', englishRouter);
const homeRouter = require('./routes/home');
app.use('/home', homeRouter);
const learningToolsRouter = require('./routes/learningtools');
app.use('/learningtools', learningToolsRouter);
const mathRouter = require('./routes/math');
app.use('/math', mathRouter);
const scienceRouter = require('./routes/science');
app.use('/science', scienceRouter);
const socialStudiesRouter = require('./routes/socialstudies');
app.use('/socialstudies', socialStudiesRouter);


//Create data schema for saving data from the login form
const loginSchema = {
    firstname: String,
    lastname: String,
    username: String,
    email: String,
    password: String
}

const login = mongoose.model("Login", loginSchema);

app.post("/", function (req, res) {
    let newUser = new login({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        username: req.body.username,
        email: req.body.address,
        password: req.body.password
    })
    newUser.save();
    res.redirect('/');
})

const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Server started on port ${PORT}`));