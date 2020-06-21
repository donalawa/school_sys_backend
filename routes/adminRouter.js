const express = require('express');
const router = express.Router();

//My Imports
const adminController = require('../controllers/adminController');

//Admin Login Page Route
router.get('/',adminController.getLogin)

//Admin Login Post Request Route
router.post('/login',adminController.postLogin)

// get all students in all Levels
router.get('/students/', adminController.getAllStudents);

// get a single student
router.get('/student/', adminController.getStudent);

// get all students from course/level

router.get('/courses/:course/:level/', adminController.getStudentsByLevel);

// mark a student attendance  
router.post('/attendece/:id', adminController.postMarkAtendance);

// register student  
// router.post('/register/', adminController.postRegisterStudent);

// delete student  
router.delete('/register/:studId', adminController.deleteStudent);

module.exports = router;