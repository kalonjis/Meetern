/* Model de notre COMPANY dans la DB  */

//On instancie le module 'mongoose' (si pas installé => npm i -s mongoose )
const mongoose = require('mongoose');

// On instancie {isEmail} du module validator pour valider l'email (npm i -s validator)
const { isEmail } = require('validator');

// On instancie bcrypt du module bcrypt pour crypter les passwords (npm i -s bcrypt)
const bcrypt = require('bcrypt');

// création Schema du user dans mongodb
const companySchema = new mongoose.Schema(
    {
        companyName:{
            type: String,
            required : true,
            minlength: 3,
            maxlength: 55,
            unique: true,
            trim: true
        },
        email:{
            type: String,
            required: true,
            unique: true,
            validate: [isEmail],
            lowercase: true,
            trim: true
        },
        password: {
          type: String,
          required: true,
          max: 1024,
          minlength: 6  
        },
        picture: {
            type: String,
            default: "./uploads/profil/random-company.png"

        },
        bio : {
            type: String,
            max: 1024,
        },
        sector: {
            type:String
        },
        companyType : {
            type: String
        },
        location: {
            type: [String]
        },
        phone: {
            type: String,
            maxlength: 55,
            trim: true 
        },
        webSite :{
            type: String,
            maxlength: 55,
            trim: true 
        },
        corporateWear: {
            type: String,
        }
    },
    {
        timestamps: true
    }

);

/* Fonction appelées par le controller*/
// Fonction pour crypter le password AVANT l'enregistrement dans la db
companySchema.pre('save', async function(next){
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// On instancie le companySchema et on définit la db dans laquelle on va l'utiliser ('companies')
const CompanyModel = mongoose.model('company', companySchema); 

// On exporte le CompanyModel qui sera recup par les controllers  
module.exports = CompanyModel;