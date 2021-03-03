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