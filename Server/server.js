/* Application entry point */

// On importe le module express - (npm i -s express)
const express = require('express');

// On importe le module cookie-parser (npm i -s cookie-parser) => permet de manipuler les cookies
const cookieParser = require('cookie-parser')

// On importe le module de route
const companyRoutes= require('./routes/company.routes');
const studentRoutes= require('./routes/student.routes');
const offerRoutes= require('./routes/offer.routes');

// On importe le module .env qui contient les variables d'environnement (il est repris dans .gitignore)
require('dotenv').config({path:'./config/.env'});

// On récupère le module db afin de lancer la connection à la db
require('./config/db')

// On importe le module checkUser et requireAuth
const {checkCompany, requireAuthCompany,} = require('./middleware/auth.company.middleware');
const {checkStudent, requireAuthStudent,} = require('./middleware/auth.student.middleware');

// On charge le module cors qui permet de gérer l'accessibilité à notre site depuis l'extérieur
const cors = require('cors'); // npm i -s cors

const corsOptions = {
    origin: process.env.CLIENT_URL,
    credentials: true,
    'allowedHeaders': ['sessionId', 'content-Type'],
    'exposedHeaders': ['sessionId'],
    'methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
    'preflightContinue': false
}

// On instancie express
const app = express();

/* Middleware (fonctions qui peuvent accéder à l’objet Request (req), l’objet response (res)) */

app.use(cors(corsOptions)); 
app.use(express.json()) //(remplace body-parser)// for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(cookieParser()); // pour lire les cookies

// jwt
app.get('*', checkCompany); // On check l'utilisateur "COMPANY" pour n'importe quelle route
app.get('*', checkStudent); // On check l'utilisateur "STUDENT" pour n'importe quelle route
app.get('/jwtCompanyId', requireAuthCompany, (req, res) =>{ // On check si l'utilisateur est déjà loggé en tant que COMPANY pour qu'il n'ai pas à devoir le refaire (1 seul x!)
    res.status(200).send(res.locals.company._id);
});
app.get('/jwtStudentId', requireAuthStudent, (req, res) =>{ // On check si l'utilisateur est déjà loggé en tant que STUDENT pour qu'il n'ai pas à devoir le refaire (1 seul x!)
    res.status(200).send(res.locals.student._id);
});


// routes (en avant derrnier!!!)
app.use('/api/company/', companyRoutes);
app.use('/api/student/', studentRoutes);
app.use('/api/offer/', offerRoutes);

// server (tjs en dernier!!!)
app.listen(process.env.PORT, ()=>{
    console.log(`listening on port ${process.env.PORT}`)
})