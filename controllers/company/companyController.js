const CompanyModel = require('../../models/company.model');
const ObjectId = require('mongoose').Types.ObjectId;

//Afficher(lire) les infos de toutes les compagnies avec la methode "GET"
module.exports.getAllCompanies = async (req,res) => {
    const companies = await CompanyModel.find().select('-password'); //select('-password') permet de ne pas envoyer le password
    res.status(200).json(companies);
};

//Afficher(lire) les infos d'un student en particulier avec la methode "GET"
module.exports.companyInfo = (req, res) => {
    if(!ObjectId.isValid(req.params.id)){
        return res.status(400).send('Id unknown : '+ req.params.id); // req.params = paramètres dans l'url
    }

    CompanyModel.findById(req.params.id, (err, docs) =>{
        if(!err) res.send(docs);
        else console.log('Id unknown : ' + err);
    }).select('-password');
}

// Update du profil de la company
module.exports.updateCompany = async (req, res) =>{
    if(!ObjectId.isValid(req.params.id)){
        return res.status(400).send('Id unknown : '+ req.params.id); // req.params = paramètres dans l'url
    }

    try {
        await CompanyModel.findOneAndUpdate(
          {_id: req.params.id},
          {
              $set: {
                  bio: req.body.bio,
                  sector: req.body.sector,
                  companyType: req.body.companyType,
                  phone: req.body.phone,
                  webSite: req.body.webSite,
                  corporateWear: req.body.corporateWear                  
              }
          },
          { new: true, upsert: true, setDefaultsOnInsert: true},
          (err, docs) => {
             if (!err) res.send(docs);
             if (err) res.status(500).send({message: err}); 
          }
        )
    } catch (err){
        return res.status(500).json({ message: err})
    }
}

// Delete la company avec la methode "DELETE"
module.exports.deleteCompany = async (req, res) => {
    if (!ObjectId.isValid(req.params.id)) 
      res.status(400).send('ID unknown : ' + req.params.id);
    
    try {
        await CompanyModel.deleteOne({_id: req.params.id}).exec();
        res.status(200).json({message: "Successfully deleted. "})

    } catch (err){
        return res.status(500).json({ message: err})
    }
};

// Add location avec la methode "PATCH"
module.exports.addLocation = async (req, res) => {
    if (!ObjectId.isValid(req.params.id)) 
      res.status(400).send('ID unknown : ' + req.params.id);
    
    try {
        // add to the location list
        await CompanyModel.findByIdAndUpdate(
            req.params.id,
            { $addToSet: { location: req.body.location}},
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

// Remove location avec la methode "PATCH"
module.exports.removeLocation = async (req, res) => {
    if (!ObjectId.isValid(req.params.id)) 
      res.status(400).send('ID unknown : ' + req.params.id);
    
    try {
        // remove from the location list
        await CompanyModel.findByIdAndUpdate(
            req.params.id,
            { $pull: { location: req.body.location}},
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