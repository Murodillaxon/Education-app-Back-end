const Teacher = require('../models/teachersChema');

// Создание нового учителя
exports.createTeacher = async (req, res) => {
  try {
    // Проверка на существование учителя
    const existingTeacher = await Teacher.findOne({ name: req.body.name, lastName: req.body.lastName });
    if (existingTeacher) {
      return res.status(400).send({ error: 'Учитель с таким именем и фамилией уже существует' });
    }

    const teacher = new Teacher(req.body);
    await teacher.save();
    res.status(201).send(teacher);
  } catch (error) {
    console.error('Ошибка при создании учителя:', error);
    res.status(400).send({ error: 'Ошибка при создании учителя' });
  }
};

// Получение всех учителей с пагинацией
exports.getAllTeachers = async (req, res) => {
  const { page = 1, pageSize = 10 } = req.query;

  const pageNum = parseInt(page, 10);
  const sizeNum = parseInt(pageSize, 10);

  try {
    const skip = (pageNum - 1) * sizeNum;
    const total = await Teacher.countDocuments();
    const teachers = await Teacher.find().skip(skip).limit(sizeNum);

    res.status(200).send({
      teachers,
      total,
      page: pageNum,
      pageSize: sizeNum,
    });
  } catch (error) {
    console.error('Ошибка при получении списка учителей:', error);
    res.status(500).send({ error: 'Ошибка при получении списка учителей' });
  }
};

// Получение учителя по ID
exports.getTeacherById = async (req, res) => {
  try {
    const teacher = await Teacher.findById(req.params.id);
    if (!teacher) {
      return res.status(404).send({ error: 'Учитель не найден' });
    }
    res.status(200).send(teacher);
  } catch (error) {
    console.error('Ошибка при получении учителя по ID:', error);
    res.status(500).send({ error: 'Ошибка при получении учителя по ID' });
  }
};

// Обновление учителя по ID
exports.updateTeacherById = async (req, res) => {
  try {
    const teacher = await Teacher.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!teacher) {
      return res.status(404).send({ error: 'Учитель не найден' });
    }
    res.status(200).send(teacher);
  } catch (error) {
    console.error('Ошибка при обновлении учителя по ID:', error);
    res.status(400).send({ error: 'Ошибка при обновлении учителя по ID' });
  }
};

// Удаление учителя по ID
exports.deleteTeacherById = async (req, res) => {
  try {
    const teacher = await Teacher.findByIdAndDelete(req.params.id);
    if (!teacher) {
      return res.status(404).send({ error: 'Учитель не найден' });
    }
    res.status(200).send('Учитель удален');
  } catch (error) {
    console.error('Ошибка при удалении учителя по ID:', error);
    res.status(500).send({ error: 'Ошибка при удалении учителя по ID' });
  }
};
