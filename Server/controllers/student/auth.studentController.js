/* Controller file  for authentification*/

// On récupère le module StudentModel
const StudentModel = require('../../models/student.model');

// On instancie le module jsonwebtoken que l'on va utiliser pour l'authentification
const jwt = require('jsonwebtoken'); //npm i -s jsonwebtoken


//  On définit la fonction createToken qu'on appelle dans "signIN"
const maxAge = 3 * 24 * 60 * 60 * 1000;// On stock la durée de validité dans une variable car on va la réutiliser
const createToken = (id) => {
    return jwt.sign({id}, process.env.TOKEN_SECRET, {expiresIn: maxAge})
};

// Création d'un student
module.exports.signUp = async(req, res) =>{
    const {studentFirstname, studentLastname, email, password} = req.body

    try {
        const student = await StudentModel.create({studentFirstname, studentLastname, email, password});
        res.status(201).json({student: student._id})
    } catch (err) {
        console.log(err)
        res.status(200).send({err})
    }
};

// Fonction pour se logger
module.exports.signIn = async (req, res) => {
    const {email, password } = req.body; // On recupère les données encodées par le student

    try {
        const student = await StudentModel.login(email, password); //On check dans la db si cet utilisateur existe (voir student.model.js=>studentSchema.statics.login (ligne 100)), on le recupère et on stocke tt dans student
        const token = createToken(student._id); // On crée le token
        res.cookie('jwt', token, { httpOnly: true, maxAge});
        res.status(200).json({student: student._id})
    }

    catch (err){
        // const errors = signInErrors(err);
        // res.status(200).send({errors})
        res.status(200).json(err)
    }
};

// Fonctions pour se délogger
module.exports.logout = (req,res)=> {
    res.cookie('jwt', '', { maxAge: 1}); // On fixe la durée du token à 1ms =>expiration immédiate
    res.redirect('/'); //On redirige automatiquement
};
