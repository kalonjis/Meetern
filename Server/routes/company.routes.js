const router = require('express').Router();
const authCompanyController = require('../controllers/auth.companyController') //for signUp, login and signOut
const companyController = require('../controllers/companyController') // read, update and delete

// auth
router.post("/register", authCompanyController.signUp);

// company display block
router.get("/", companyController.getAllCompanies);
router.get("/:id", companyController.companyInfo);
router.put("/:id", companyController.updateCompany);
router.delete('/:id', companyController.deleteCompany)


module.exports = router;