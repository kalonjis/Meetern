const OfferModel = require('../models/offer.model');
const CompanyModel = require('../models/company.model');
const StudentModel = require('../models/student.model');
const ObjectID = require('mongoose').Types.ObjectId;

module.exports.readOffer = (req, res) => {
    OfferModel.find((err, docs) => {
        if (!err) res.send(docs);
        else console.log('Error to get data ' + err)
    }).sort({ createdAt: -1 }); // permet de réorganiser du plus récent au plus ancien

}

module.exports.createOffer = async(req, res) => {
   

    const newOffer = new OfferModel({
        companyId: req.body.companyId,
        position: req.body.position,
        hardSkills: [],
        softSkills: [],
        description: req.body.description,
        hiringPossibility: req.body.hiringPossibility,
        internshipStart: req.body.internshipStart,
        internshipDuration: req.body.internshipDuration,
        internshipPlace: req.body.internshipPlace,
        faceToface: req.body.faceToface,        
        applicants: []
        
    });

    try{
        const offer = await newOffer.save();
        return res.status(201).json(offer);
    } catch (err){
        return res.status(400).send(err);
    }
};