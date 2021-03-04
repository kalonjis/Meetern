const router = require('express').Router();
const authStudentController = require('../controllers/student/auth.studentController') //for signUp, login and signOut
const studentController = require('../controllers/student/studentController') // read, update and delete

// auth
router.post("/register", authStudentController.signUp);
router.post("/login", authStudentController.signIn);

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

module.exports = router;