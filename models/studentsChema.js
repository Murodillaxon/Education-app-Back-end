const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  Fullname: { type: String, required: true },
  PhoneNumber: { type: String, required: true },
  DateOfBirth: { type: Date, required: true },
  ParentFullName: { type: String, required: true },
  ParentPhoneNumber: { type: String, required: true }
});

const Student = mongoose.model('Student', studentSchema);
module.exports = Student;