const router = require('express').Router();
const authCompanyController = require('../controllers/auth.companyController')

router.post("/register", authCompanyController.signUp);

module.exports = router;