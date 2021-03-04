/* Model de notre STUDENT dans la DB  */

//On instancie le module 'mongoose' (si pas installé => npm i -s mongoose )
const mongoose = require('mongoose');

// On instancie {isEmail} du module validator pour valider l'email (npm i -s validator)
const { isEmail } = require('validator');

// On instancie bcrypt du module bcrypt pour crypter les passwords (npm i -s bcrypt)
const bcrypt = require('bcrypt');

// création Schema du user dans mongodb
const studentSchema = new mongoose.Schema(
    {
        studentFirstname:{
            type: String,
            required : true,
            minlength: 3,
            maxlength: 55,
            trim: true
        },
        studentLastname:{
            type: String,
            required : true,
            minlength: 3,
            maxlength: 55,
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
            default: "./uploads/student/profil/random-student.png"

        },
        bio : {
            type: String,
            max: 1024,
        },
        internshipStart: {
            type: String
        },
        internshipDuration: {
            type: String
        },
        school : {
            type: String,
            max: 1024,
        },
        studyOption: {
            type:String
        },
        currentStudyLevel: {
            type: String
        },
        language : {
            type: [Object]
        },
        hardSkills:{
            type:[String],
            maxlength:3
        },
        softSkills:{
            type:[String],
            maxlength:3
        },
        portfolio :{
            type: String,
            maxlength: 55,
            trim: true 
        }
    },
    {
        timestamps: true
    }

);

/* Fonction appelées par le controller*/
// Fonction pour crypter le password AVANT l'enregistrement dans la db
studentSchema.pre('save', async function(next){
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// fonction pour contrôler la correspondance du password crypté lors du signIN (UserModel.login)
studentSchema.statics.login = async function(email, password){
    const student = await this.findOne({ email });
    if (student) {
        const auth = await bcrypt.compare(password, student.password)
        if (auth) {
            return student;
        }
        throw Error('incorrect password');
    }
    throw Error('incorrect email');
}

// On instancie le StudentSchema et on définit la db dans laquelle on va l'utiliser ('students'- mongoDB l'accorde au pluriel automatiquement')
const StudentModel = mongoose.model('student', studentSchema); 

// On exporte le StudentModel qui sera recup par les controllers  
module.exports = StudentModel;