const CompanyModel = require('../models/company.model')

module.exports.signUp = async(req, resp) =>{
    const {companyName, email, password} = req.body;

    try {
        const company = await CompanyModel.create({companyName, email, password});
        resp.status(201).json({company: company._id})
    } catch (err) {
        res.status(200).send({err})
    }
}