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
// router.patch('/addLocation/:id', companyController.addLocation);
// router.patch('/removeLocation/:id', companyController.removeLocation);


module.exports = router;