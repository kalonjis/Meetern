const router = require('express').Router();
const authCompanyController = require('../controllers/company/auth.companyController') //for signUp, login and signOut
const companyController = require('../controllers/company/companyController') // read, update and delete

// auth
router.post("/register", authCompanyController.signUp);

// company display block
router.get("/", companyController.getAllCompanies);
router.get("/:id", companyController.companyInfo);
router.put("/:id", companyController.updateCompany);
router.delete('/:id', companyController.deleteCompany);
router.patch('/addLocation/:id', companyController.addLocation);
router.patch('/removeLocation/:id', companyController.removeLocation);


module.exports = router;