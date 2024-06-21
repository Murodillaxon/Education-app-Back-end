const Student = require('../models/studentsChema');  // To'g'ri yo'lni tekshiring

// Add a new student
const addStudent = async (req, res) => {
  const allData = req.body;
  try {
    const newStudent = new Student(allData);
    const savedStudent = await newStudent.save();
    res.status(201).json(savedStudent);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all students
const getAllStudents = async (req, res) => {
  const { page = 1, pageSize = 10 } = req.query;

  const pageNum = parseInt(page, 10);
  const sizeNum = parseInt(pageSize, 10);

  try {
    const skip = (pageNum - 1) * sizeNum;
    const total = await Student.countDocuments();
    const students = await Student.find().skip(skip).limit(sizeNum);

    res.status(200).json({
      students,
      total,
      page: pageNum,
      pageSize: sizeNum,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Get a student by ID
const getStudentById = async (req, res) => {
  const { id } = req.params;
  try {
    const student = await Student.findById(id);
    if (student) {
      res.status(200).json(student);
    } else {
      res.status(404).json({ message: 'Student not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a student by ID
const updateStudent = async (req, res) => {
  const { id } = req.params;
  const { Fullname, PhoneNumber, DateOfBirth, ParentFullName, ParentPhoneNumber } = req.body;
  try {
    const updatedStudent = await Student.findByIdAndUpdate(id, { Fullname, PhoneNumber, DateOfBirth, ParentFullName, ParentPhoneNumber }, { new: true });
    if (updatedStudent) {
      res.status(200).json(updatedStudent);
    } else {
      res.status(404).json({ message: 'Student not found' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a student by ID
const deleteStudent = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedStudent = await Student.findByIdAndDelete(id);
    if (deletedStudent) {
      res.status(200).json({ message: 'Student deleted successfully' });
    } else {
      res.status(404).json({ message: 'Student not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  addStudent,
  getAllStudents,
  getStudentById,
  updateStudent,
  deleteStudent
};