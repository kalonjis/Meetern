/**Module de configuration pour accéder à la db */

const mongoose = require('mongoose'); //npm i -s mongoose

mongoose.connect(
        // On récupère le cluster créer dans mongo Atlas depuis mongo Compass 
        'mongodb+srv://' + process.env.DB_USER_PASS +'@cluster0.2xbdx.mongodb.net/meetern', 
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        }
    )
    .then(()=> console.log('Connected to MongoDB'))
    .catch( (err) => console.log('Failed to connect to MongoDB: error ' + err));