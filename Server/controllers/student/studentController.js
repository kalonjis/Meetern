const StudentModel = require('../../models/student.model');
const ObjectId = require('mongoose').Types.ObjectId;

//Afficher(lire) les infos de tous les students avec la methode "GET"
module.exports.getAllStudents = async (req,res) => {
    const student = await StudentModel.find().select('-password'); //select('-password') permet de ne pas envoyer le password
    res.status(200).json(student);
};

//Afficher(lire) les infos d'un student en particulier avec la methode "GET"
module.exports.studentInfo = (req, res) => {
    if(!ObjectId.isValid(req.params.id)){
        return res.status(400).send('Id unknown : '+ req.params.id); // req.params = paramètres dans l'url
    }

    StudentModel.findById(req.params.id, (err, docs) =>{
        if(!err) res.send(docs);
        else console.log('Id unknown : ' + err);
    }).select('-password');
}

// Update du profil du student
module.exports.updateStudent = async (req, res) =>{
    if(!ObjectId.isValid(req.params.id)){
        return res.status(400).send('Id unknown : '+ req.params.id); // req.params = paramètres dans l'url
    }

    try {
        await StudentModel.findOneAndUpdate(
          {_id: req.params.id},
          {
              $set: {
                  bio: req.body.bio,
                  internshipStart: req.body.internshipStart,
                  internshipDuration: req.body.internshipDuration,
                  school: req.body.school,
                  studyOption: req.body.studyOption,
                  currentStudyLevel: req.body.currentStudyLevel,                 
                  portfolio: req.body.portfolio   
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