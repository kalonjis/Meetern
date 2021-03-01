const CompanyModel = require('../models/company.model')

module.exports.signUp = async(req, res) =>{
    const {companyName, email, password} = req.body

    try {
        const company = await CompanyModel.create({companyName, email, password});
        res.status(201).json({company: company._id})
    } catch (err) {
        console.log(err)
        res.status(200).send({err})
    }
}