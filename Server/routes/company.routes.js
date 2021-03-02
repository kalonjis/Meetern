const router = require('express').Router();
const authCompanyController = require('../controllers/auth.companyController') //for signUp, login and signOut
const companyController = require('../controllers/companyController') // read, update and delete

// auth
router.post("/register", authCompanyController.signUp);


router.get("/", companyController.getAllCompanies);

module.exports = router;