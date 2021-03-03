const router = require('express').Router();
const authStudentController = require('../controllers/student/auth.studentController') //for signUp, login and signOut
const studentController = require('../controllers/student/studentController') // read, update and delete

// auth
router.post("/register", authStudentController.signUp);

// student display block
router.get("/", studentController.getAllStudents);
// router.get("/:id", companyController.companyInfo);
// router.put("/:id", companyController.updateCompany);
// router.delete('/:id', companyController.deleteCompany);
// router.patch('/addLocation/:id', companyController.addLocation);
// router.patch('/removeLocation/:id', companyController.removeLocation);


module.exports = router;