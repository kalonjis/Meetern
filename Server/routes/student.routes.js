const router = require('express').Router();
const authStudentController = require('../controllers/student/auth.studentController') //for signUp, login and signOut
const studentController = require('../controllers/student/studentController') // read, update and delete

// auth
router.post("/register", authStudentController.signUp);

// student display block
router.get("/", studentController.getAllStudents);
router.get("/:id", studentController.studentInfo);
router.put("/:id", studentController.updateStudent);
router.delete('/:id', studentController.deleteStudent);
router.patch('/addLanguage/:id', studentController.addLanguage);
router.patch('/addHardSkills/:id', studentController.addHardSkills);
router.patch('/addSoftSkills/:id', studentController.addSoftSkills);

module.exports = router;