const express = require('express');
const router = express.Router();
const teacherController = require('../controllers/teacher');


router.post('/createTeacher', teacherController.createTeacher);
router.get('/getAllTeachers', teacherController.getAllTeachers);
router.get('/getTeacherById/:id', teacherController.getTeacherById);
router.put('/updateTeacher/:id', teacherController.updateTeacherById);
router.delete('/deleteTeacher/:id', teacherController.deleteTeacherById);
module.exports = router;
