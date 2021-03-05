/* Controller file  for authentification*/

// On récupère le module CompanyModel
const CompanyModel = require('../../models/company.model');

// On instancie le module jsonwebtoken que l'on va utiliser pour l'authentification
const jwt = require('jsonwebtoken'); //npm i -s jsonwebtoken

//  On définit la fonction createToken qu'on appelle dans "signIN"
const maxAge = 3 * 24 * 60 * 60 * 1000;//(en milliseconde- jour * heure * min. * sec. * millisec.) On stock la durée de validité dans une variable car on va la réutiliser
const createToken = (id) => {
    return jwt.sign({id}, process.env.TOKEN_SECRET, {expiresIn: maxAge})
};

// On importe les modules qui vont gérer les erreurs
const {signUpErrors, signInErrors } = require('../../utils/errors.utils');

// Création d'une company
module.exports.signUp = async(req, res) =>{
    const {companyName, email, password} = req.body

    try {
        const company = await CompanyModel.create({companyName, email, password});
        res.status(201).json({company: company._id})
    } catch (err) {
        const errors = signUpErrors(err);
        res.status(200).send({errors})
    }
}

// Fonction pour se logger
module.exports.signIn = async (req, res) => {
    const {email, password } = req.body; // On recupère les données encodées par lacompany company

    try {
        const company = await CompanyModel.login(email, password); //On check dans la db si cet utilisateur existe (voir company.model.js=>companySchema.statics.login (ligne 100)), on le recupère et on stocke tt dans company
        const token = createToken(company._id); // On crée le token
        res.cookie('jwt', token, { httpOnly: true, maxAge});
        res.status(200).json({company: company._id})
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