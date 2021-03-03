const StudentModel = require('../../models/student.model');
const ObjectId = require('mongoose').Types.ObjectId;

//Afficher(lire) les infos de tous les students avec la methode "GET"
module.exports.getAllStudents = async (req,res) => {
    const student = await StudentModel.find().select('-password'); //select('-password') permet de ne pas envoyer le password
    res.status(200).json(student);
};