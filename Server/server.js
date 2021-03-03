const express = require('express');
const companyRoutes= require('./routes/company.routes');
const studentRoutes= require('./routes/student.routes');
require('dotenv').config({path:'./config/.env'});
require('./config/db')

const app = express();

/* Middleware (fonctions qui peuvent accéder à l’objet Request (req), l’objet response (res)) */


app.use(express.json()) //(remplace body-parser)// for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded


// routes (en avant derrnier!!!)
app.use('/api/company/', companyRoutes);
app.use('/api/student/', studentRoutes);

// server (tjs en dernier!!!)
app.listen(process.env.PORT, ()=>{
    console.log(`listening on port ${process.env.PORT}`)
})