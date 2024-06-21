// routes/studentRoutes.js
const express = require('express');
const router = express.Router();
const {
  addStudent,
  getAllStudents,
  getStudentById,
  updateStudent,
  deleteStudent
} = require('../controllers/students');

// Define routes
router.post('/createStudent', addStudent);
router.get('/getAllStudents', getAllStudents);
router.get('/getStudentById/:id', getStudentById);
router.put('/updateStudent/:id', updateStudent);
router.delete('/deleteStudent/:id', deleteStudent);

module.exports = router;