const OfferModel = require('../models/offer.model');
const CompanyModel = require('../models/company.model');
const StudentModel = require('../models/student.model');
const ObjectID = require('mongoose').Types.ObjectId;

module.exports.getAllOffers = (req, res) => {
    OfferModel.find((err, docs) => {
        if (!err) res.send(docs);
        else console.log('Error to get data ' + err)
    }).sort({ createdAt: -1 }); // permet de réorganiser du plus récent au plus ancien

};

module.exports.offerInfo = (req,res) => {
    if (!ObjectID.isValid(req.params.id)) 
      res.status(400).send('ID unknown : ' + req.params.id);
    
    OfferModel.findById(req.params.id, (err, docs) => {
        if(!err) res.send(docs);
        else console.log('ID unknown : ' + err)
    })
};

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

module.exports.updateOffer = (req, res) => {
    if (!ObjectID.isValid(req.params.id)) 
      res.status(400).send('ID unknown : ' + req.params.id);
    
    const updatedRecord = {
        position: req.body.position,
        description: req.body.description,
        hiringPossibility: req.body.hiringPossibility,
        internshipStart: req.body.internshipStart,
        internshipDuration: req.body.internshipDuration,
        internshipPlace: req.body.internshipPlace,
        faceToface: req.body.faceToface,
    };

    OfferModel.findByIdAndUpdate(
        req.params.id,
        { $set: updatedRecord },
        { new: true },
        (err, docs) => {
            if(!err) res.send(docs);
            else console.log('Update error: '+ err);
        }
    ) 
};

module.exports.deleteOffer = (req, res) => {
    if (!ObjectID.isValid(req.params.id)) 
        res.status(400).send('ID unknown : ' + req.params.id);

    OfferModel.findByIdAndRemove(
      req.params.id,
      (err, docs) => {
          if(!err) res.status(200).json({message: "Offer successfully deleted. "});
          else console.log('Delete error: '+ err);
      }
  ) 
};

module.exports.applyOffer = async (req, res) => {
    if (!ObjectID.isValid(req.params.id)) 
        res.status(400).send('ID unknown : ' + req.params.id);
    
    try{
        await OfferModel.findByIdAndUpdate(
            req.params.id,
            {
                $addToSet: { applicants: req.body.studentId }
            },
            { new: true},
            (err, docs)=>{
                if (err) res.status(400).send(err);
            }
        );
   
        await StudentModel.findByIdAndUpdate(
            req.body.studentId,
            {
                $addToSet : { applications: req.params.id }
            },
            { new: true },
            (err, docs) => {
                if (err) res.status(400).send(err);
                else res.status(201).json({message: "you've just apply to this offer! "});
            }
        );

    } catch (err) {
        return res.status(400).send(err);
    }
};