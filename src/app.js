const express = require('express');
const { engine } = require('express-handlebars');
const myconnection = require('express-myconnection');
const mysql = require('mysql');
const session = require('express-session');
const bodyParser = require('body-parser');
const loginRoutes = require ('./routes/login');
const { redirect } = require('express/lib/response');


const app = express();
app.set('port', 4000);

app.set('views', __dirname + '/views');
app.engine('.hbs', engine({
	extname: '.hbs',
}));
app.set('view engine', 'hbs');

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(bodyParser.json());

app.use (myconnection(mysql, {
  host: '127.0.0.1',
  user: 'devops',
  password: 'admin',
  port: 3306,
  database: 'inventario'
}, 'single'));

app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));

app.listen(app.get('port'), () =>{
    console.log('Estamos trabajndo sobre el puerto', app.get('port'));
});

app.use('/', loginRoutes);

/*
app.get('/', (req,res) =>{
    res.render('home');
});
*/

app.get('/', (req, res) => {
  if (req.session.loggedIn) {
    let name = req.session.nombre;
    res.render('home', {name});
   
    // user is logged in.
}
else {
  res.redirect('/login');
    // user is not logged in.
}
}
);
