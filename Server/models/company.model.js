const mongoose = require('mongoose');
const { isEmail } = require('validator') // npm i -s validator

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
            type:String,
            max: 30,
            trim: true
        },
        location: {
            type: [String]
        },
        phone: {
            type: String,
            minlength: 3,
            maxlength: 55,
            trim: true 
        },
        webSite :{
            type: String,
            minlength: 3,
            maxlength: 55,
            unique: true,
            trim: true 
        },
        corporateWear: {
            type: String,
        }
    },
    {
        timestamps: true
    }

)

// On instancie le companySchema et on définit la db dans laquelle on va l'utiliser ('companies')
const CompanyModel = mongoose.model('company', companySchema); 

// On exporte le CompanyModel qui sera recup par les controllers  
module.exports = CompanyModel;