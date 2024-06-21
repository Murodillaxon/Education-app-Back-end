const mongoose = require("mongoose");

const teacherSchema = new mongoose.Schema({
  name: { type: String, required: true },
  lastName: { type: String, required: true },
  Patronymic: { type: String, required: true },
  idNumber: { type: String, required: true },
  PhoneNumber: { type: String, required: true },
  BirthDate: { type: Date, required: true },
  Address: { type: String, required: true },
  Sex: { type: String, required: true },
  Percent: { type: String, required: true },
  Profession: { type: String, required: true },
});

const Teacher = mongoose.model("Teacher", teacherSchema);
module.exports = Teacher;
