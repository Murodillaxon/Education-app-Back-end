const Room = require("../models/roomShema");

// Создание новой комнаты
const createRoom = async (req, res) => {
    try {
        const Alldata = req.body;
        const newRoom = new Room(Alldata);
        await newRoom.save();
        res.status(201).json({ success: true, message: "Room created successfully", data: newRoom });
    } catch (err) {
        res.status(500).json({ success: false, message: "Server error", error: err.message });
    }
};

// Получение всех комнат с пагинацией
const getAllRooms = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        const totalRooms = await Room.countDocuments();
        const totalPages = Math.ceil(totalRooms / limit);

        const rooms = await Room.find()
            .skip(skip)
            .limit(limit);

        res.status(200).json({ success: true, data: rooms, totalPages });
    } catch (err) {
        res.status(500).json({ success: false, message: "Server error", error: err.message });
    }
};

// Получение одной комнаты по ID
const getRoomById = async (req, res) => {
    try {
        const roomId = req.params.id;
        const room = await Room.findById(roomId);
        if (!room) {
            return res.status(404).json({ success: false, message: "Room not found" });
        }
        res.status(200).json({ success: true, data: room });
    } catch (err) {
        res.status(500).json({ success: false, message: "Server error", error: err.message });
    }
};

// Обновление информации о комнате
const updateRoom = async (req, res) => {
    try {
        const roomId = req.params.id;
        const Alldata = req.body;
        const updatedRoom = await Room.findByIdAndUpdate(
            roomId,
            Alldata,
            { new: true }
        );
        if (!updatedRoom) {
            return res.status(404).json({ success: false, message: "Room not found or not updated" });
        }
        res.status(200).json({ success: true, message: "Room updated successfully", data: updatedRoom });
    } catch (err) {
        res.status(500).json({ success: false, message: "Server error", error: err.message });
    }
};

// Удаление комнаты по ID
const deleteRoom = async (req, res) => {
    try {
        const roomId = req.params.id;
        const deletedRoom = await Room.findByIdAndDelete(roomId);
        if (!deletedRoom) {
            return res.status(404).json({ success: false, message: "Room not found or not deleted" });
        }
        res.status(200).json({ success: true, message: "Room deleted successfully", data: deletedRoom });
    } catch (err) {
        res.status(500).json({ success: false, message: "Server error", error: err.message });
    }
};

module.exports = {
    createRoom,
    getAllRooms,
    getRoomById,
    updateRoom,
    deleteRoom
};
