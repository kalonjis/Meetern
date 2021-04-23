const OfferModel = require('../models/offer.model');
const StudentModel = require('../models/student.model');
const ObjectId = require('mongoose').Types.ObjectId;

module.exports.getAllOffers = (req, res) => {
    OfferModel.find((err, docs) => {
        if (!err) res.send(docs);
        else console.log('Error to get data ' + err)
    }).sort({ createdAt: -1 }); // permet de réorganiser du plus récent au plus ancien

};

module.exports.offerInfo = (req,res) => {
    if (!ObjectId.isValid(req.params.id)) 
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
        applications: []
        
    });

    try{
        const offer = await newOffer.save();
        return res.status(201).json(offer);
    } catch (err){
        return res.status(400).send(err);
    }
};

module.exports.updateOffer = (req, res) => {
    if (!ObjectId.isValid(req.params.id)) 
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

module.exports.editOfferStatus = async(req, res) => {
    if (!ObjectId.isValid(req.params.id)) 
      res.status(400).send('ID unknown : ' + req.params.id);
    
    try {
        // replace the status (default : "open")
        await OfferModel.findByIdAndUpdate(
            req.params.id,
            { $set :{status : req.body.status}},
            { new: true, upsert: true},
            (err, docs) => {
                if (!err) res.status(201).json(docs)
                else return res.status(400).json(err);
            }
            );
    } catch (err){
        return res.status(500).json({ message: err})
    }
};

// Select the student avec la methode "PATCH"
module.exports.selectStudent = async (req, res) => {
    if (!ObjectId.isValid(req.params.id)) 
      res.status(400).send('ID unknown : ' + req.params.id);
    
    try {
        // add the studentId
        await OfferModel.findByIdAndUpdate(
            req.params.id,
            { $set: {companyChoice: req.body.companyChoice}},
            { new: true, upsert: true},
            (err, docs) => {
                if (!err) res.status(201).json(docs)
                else return res.status(400).json(err);
            }
            );
    } catch (err){
        return res.status(500).json({ message: err})
    }
};

// Unselect the student avec la methode PATCH
module.exports.unselectStudent = async (req, res) => {
    if (!ObjectId.isValid(req.params.id)) 
      res.status(400).send('ID unknown : ' + req.params.id);
    
    try {
        // empty companyChoice
        await OfferModel.findByIdAndUpdate(
            req.params.id,
            { $set: {companyChoice: null}},
            { new: true, upsert: true},
            (err, docs) => {
                if (!err) res.status(201).json(docs)
                else return res.status(400).json(err);
            }
            );
    } catch (err){
        return res.status(500).json({ message: err})
    }
};

module.exports.deleteOffer = (req, res) => {
    if (!ObjectId.isValid(req.params.id)) 
        res.status(400).send('ID unknown : ' + req.params.id);

    OfferModel.findByIdAndRemove(
      req.params.id,
      (err, docs) => {
          if(!err) res.status(200).json({message: "Offer successfully deleted. "});
          else console.log('Delete error: '+ err);
      }
  ) 
};

/**---------------------------- Applications------------------------------------ */

module.exports.apply = async (req, res) => {
    if (!ObjectId.isValid(req.params.id) || !ObjectId.isValid(req.body.studentId)) 
        res.status(400).send('ID unknown : ' + req.params.id);
    
    try{
        await OfferModel.findByIdAndUpdate(
            req.params.id,
            {
                $addToSet: {
                    applications:{
                        studentId: req.body.studentId,
                        status: "pending",
                        timestamp: new Date().getTime()
                    }
                }
            },
            { new: true},
            (err, docs)=>{
                if (!err) res.status(200).send(docs);
                else res.status(400).send('error: '+ err)

            }
        );
        // add to Student.applications list
        await StudentModel.findByIdAndUpdate(
            req.body.studentId,
            { $addToSet: { applications: req.params.id}},
            { new: true, upsert: true},
            (err, docs) => {
                // if (!err) res.status(201).json(docs);
                if (err) res.status(400).json(err);
            }
        );

    } catch (err) {
        return res.status(400).send(err);
    }
};

module.exports.deleteApplication = async (req, res) => {
    if (!ObjectId.isValid(req.params.id) || !ObjectId.isValid(req.body.applicationId) || !ObjectId.isValid(req.body.studentId)) 
        res.status(400).send('ID unknown : ' + req.params.id);
    
    try{
        await OfferModel.findByIdAndUpdate(
            req.params.id,
            {
                $pull: {
                    applications: {
                        _id: req.body.applicationId
                    }
                }
            },
            { new: true},
            (err, docs)=>{
                if (!err) res.status(200).send(docs);
                else res.status(400).send('error: '+ err)

            }
        )
        
        // remove from Student.applications list
        await StudentModel.findByIdAndUpdate(
            req.body.studentId,
            { $pull: { applications: req.params.id}},
            { new: true, upsert: true},
            (err, docs) => {
                // if (!err) res.status(201).json(docs);
                if (err) res.status(400).json(err);
            }
        );
        
    } catch (err) {
        return res.status(500).send(err);
    }
}

module.exports.editApplicationStatus = (req, res) => {
    if (!ObjectId.isValid(req.params.id)|| !ObjectId.isValid(req.body.applicationId)) 
        res.status(400).send('ID unknown : ' + req.params.id);

    try {
        return OfferModel.findById(
            req.params.id,
            (err, docs) => {
                const theApplication = docs.applications.find((application) =>
                    application._id.equals(req.body.applicationId)
                )

                if (!theApplication) res.status(404).send('application not found');
                else theApplication.status = req.body.status;

                return docs.save((err)=>{
                    if (!err) return res.status(200).send(docs);
                    else return res.status(500).send(err)
                })
            }
        )

    } catch (err) {
        res.status(500).send(err);
    }
};