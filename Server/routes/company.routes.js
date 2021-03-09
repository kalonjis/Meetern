// On charge le router d'express
const router = require('express').Router();

// On importe les contollers
const authCompanyController = require('../controllers/company/auth.companyController') //for signUp, login and signOut
const companyController = require('../controllers/company/companyController') // read, update and delete
const uploadController = require('../controllers/company/upload.controller');
// On charge multer: module qui permet de gérer les fichiers entrants dans les requêtes HTTP
const multer = require('multer');  // (npm i -s multer@2.0.0-rc.1)
const upload = multer();

// auth
router.post("/register", authCompanyController.signUp);
router.post("/login", authCompanyController.signIn);
router.get("/logout", authCompanyController.logout);


// company display block
router.get("/", companyController.getAllCompanies);
router.get("/:id", companyController.companyInfo);
router.put("/:id", companyController.updateCompany);
router.delete('/:id', companyController.deleteCompany);
router.patch('/addLocation/:id', companyController.addLocation);
router.patch('/removeLocation/:id', companyController.removeLocation);

// upload
router.post('/upload', upload.single('file'), uploadController.uploadProfil);

module.exports = router;