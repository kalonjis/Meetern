// On charge le router d'express
const router = require('express').Router();

// On importe les contollers
const authStudentController = require('../controllers/student/auth.studentController') //for signUp, login and signOut
const studentController = require('../controllers/student/studentController') // read, update and delete
const uploadController = require('../controllers/student/upload.student.controller');

// On charge multer: module qui permet de gérer les fichiers entrants dans les requêtes HTTP
const multer = require('multer');  // (npm i -s multer@2.0.0-rc.1)
const upload = multer();

// auth
router.post("/register", authStudentController.signUp);
router.post("/login", authStudentController.signIn);
router.get("/logout", authStudentController.logout);

// student display block
router.get("/", studentController.getAllStudents);
router.get("/:id", studentController.studentInfo);
router.put("/:id", studentController.updateStudent);
router.delete('/:id', studentController.deleteStudent);
router.patch('/addLanguage/:id', studentController.addLanguage);
router.patch('/removeLanguage/:id', studentController.removeLanguage);
router.patch('/addHardSkills/:id', studentController.addHardSkills);
router.patch('/removeHardSkills/:id', studentController.removeHardSkills);
router.patch('/addSoftSkills/:id', studentController.addSoftSkills);
router.patch('/removeSoftSkills/:id', studentController.removeSoftSkills);

// upload
router.post('/upload', upload.single('file'), uploadController.uploadProfil);

module.exports = router;