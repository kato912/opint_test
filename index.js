const express = require('express');
const app = express();
const ejs = require('ejs');
const mongoose = require('mongoose');
const expressSession = require('express-session');
const flash = require('connect-flash');
const fs = require('fs');
const cookieParser = require('cookie-parser');


mongoose.connect('mongodb+srv://admin:adminadmin123@cluster0.teg5tvb.mongodb.net/?retryWrites=true&w=majority', {
    useNewUrlParser: true
});

global.loggedIn = null;

/// controllers
const Homenologin = require('./controllers/HomeNOloginCON');
const login = require('./controllers/loginCON');
const register = require('./controllers/registerCON');
const storeCON = require('./controllers/storeUser');
const Home = require('./controllers/HomeCON');
const loginsystem = require('./controllers/loginUserCON');
const logout = require('./controllers/logout');
const admin = require('./controllers/admin');
const qrcode = require('./controllers/qrcode');
const addpoint = require('./controllers/addpoint');
const adminn = require('./controllers/adminn');
const delqr = require('./controllers/delQR');
const genqrmiddl = require('./middleware/genqrmiddleware');
const delqrmiddl = require('./middleware/delqrmiddleware');
const Urlgen = require('./qrcodeGEN');
///
port = process.env.PORT || 4000;
//Middleware

const redire = require('./middleware/readire')
const redirenouser = require('./middleware/readireNouser');
const { error } = require('console');

app.use(express.static('public'));
app.use('/public/', express.static('./public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(flash());
app.use(cookieParser());

app.use(expressSession({
    secret: "node secret",
    resave: false,
    saveUninitialized: true,
}))

app.use("*" , (req,res,next)=>{
    loggedIn = req.session.userId;
    next()
})

app.use((req, res, next) => {
  const userCookie = req.cookies.user;

  // Attach user information to the request object
  req.user = userCookie || null;

  next();
});

app.set('view engine' , 'ejs');
app.get('/',redire,Homenologin);
app.get('/Home',redirenouser,Home,(req, res) => {
  const user = req.user;
  if (user) {
      res.send(`Welcome back, ${user.email}!`);
  } else {
      res.send('Welcome to the website!');
  }
});
app.get('/login',redire,login , (req,res)=>{
  const { email,password } = req.body;
  res.cookie('user', {email});
  res.send('Login successful');
});
app.get('/register',redire,register,);
app.post('/user/register',redire,storeCON);
app.post('/user/login',redire,loginsystem);
app.get('/logout',logout)
app.get('/admin',redirenouser,genqrmiddl,admin,(req, res) => {
  const user = req.user;
  if (user) {
      res.send(`Welcome back, ${user.email}!`);
  } else {
      res.send('Welcome to the website!');
  }
});
app.get('/adminn',redirenouser,delqrmiddl,adminn,(req, res) => {
  const user = req.user;
  if (user) {
      res.send(`Welcome back, ${user.email}!`);
  } else {
      res.send('Welcome to the website!');
  }
});
app.post('/getpoint',Urlgen,qrcode,(req, res) => {
  const user = req.user;
  if (user) {
      res.send(`Welcome back, ${user.email}!`);
  } else {
      res.send('Welcome to the website!');
  }
});

const { promisify } = require('util');
const readFileAsync = promisify(fs.readFile);
(async () => {
    try {
      const data = await readFileAsync("URL.json");
      const URL = JSON.parse(data);
      console.log(URL.URL);
    var realURL = URL.URL;
    } catch (error) {
      console.error(`Error reading URL.json: ${error}`);
    }
  })();

app.get(realURL, addpoint,(req, res) => {
  const user = req.user;
  if (user) {
      res.send(`Welcome back, ${user.email}!`);
  } else {
      res.send('Welcome to the website!');
  }
});

///
app.get('/dtqrcode' , delqr);

app.listen(port, () => {
console.log("Web run on port : " ,port);
});
