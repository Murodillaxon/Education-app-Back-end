const express = require("express");
const router = express.Router();
const roomController = require("../controllers/rooms");

// Маршруты для товаров на складе

// Создание нового товара
router.post("/createGroup", roomController.createRoom);

router.get("/getgroupByid/:id", roomController.getRoomById)

// Получение всех товаров
router.get("/getAllGroup", roomController.getAllRooms);

// Обновление информации о товаре
router.put("/updateGroup/:id", roomController.updateRoom);

// Удаление товара по ID
router.delete("/deleteGroup/:id", roomController.deleteRoom);
  
module.exports = router;

