/** Model des posts / messages  */

// On importe le module mongoose (npm i -s mongoose)
const mongoose = require('mongoose');

// création d'un schema des posts dans mongodb
const OfferSchema = new mongoose.Schema(
    {
        companyId: {
            type: String,
            required: true
        },
        position:{
            type:String,
            required: true
        },
        hardSkills:{
            type:[String],
            maxlength:3
        },
        softSkills:{
            type:[String],
            maxlength:3
        },
        description: {
            type:String,
            trim: true,
            maxlength: 160
        },
        hiringPossibility:{
            type:Boolean
        },
        internshipStart: {
            type: String
        },
        internshipDuration: {
            type: String
        },
        internshipPlace:{
            type:String
        },
        faceToface: {
            type:Boolean
        },
        applications: {
            type: [
                {
                    studentId: String,
                    status: String,
                    timestamp: Number
                }
            ],
            required: true
        }
    },
    {
        timestamps: true
    }
);


const OfferModel = mongoose.model('offer',OfferSchema);

// On exporte le PostModel qui sera recup par les controllers  
module.exports = OfferModel;