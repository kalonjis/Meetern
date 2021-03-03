const StudentModel = require('../../models/student.model');

module.exports.signUp = async(req, res) =>{
    const {studentFirstname, studentLastname, email, password} = req.body

    try {
        const student = await StudentModel.create({studentFirstname, studentLastname, email, password});
        res.status(201).json({student: student._id})
    } catch (err) {
        console.log(err)
        res.status(200).send({err})
    }
}