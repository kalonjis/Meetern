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
        userType: {
            type: String,
            default:"company"
        },
        picture: {
            type: String,
            default: "./uploads/company/profil/random-company.png"
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

// fonction pour contrôler la correspondance du password crypté lors du signIN (UserModel.login)
companySchema.statics.login = async function(email, password){
    const company = await this.findOne({ email });
    if (company) {
        const auth = await bcrypt.compare(password, company.password)
        if (auth) {
            return company;
        }
        throw Error('incorrect password');
    }
    throw Error('incorrect email');
};

// On instancie le companySchema et on définit la db dans laquelle on va l'utiliser ('companies'-mongoDB l'accorde au pluriel automatiquement)
const CompanyModel = mongoose.model('company', companySchema); 

// On exporte le CompanyModel qui sera recup par les controllers  
module.exports = CompanyModel;