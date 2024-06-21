const express = require("express");
const cors = require("cors");
require("dotenv").config();
const mongoose = require('mongoose');
const roomRoutes = require("./routes/roomRoutes");
const Student = require("./routes/studentsRouter");
const Teacher = require("./routes/teachersRouter");

const app = express();

app.use(express.json());
app.use(cors());

// ----------- MongoDB ------------
async function connectToDb() {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("MongoDB connected successfully");
    } catch (error) {
        console.error("Failed to connect to MongoDB", error);
        process.exit(1); // Выход из процесса Node.js при ошибке подключения
    }
}

connectToDb();
app.get('/',(req,res)=>{
    res.json("Salom Node.js")
})

app.use("/group", roomRoutes);
app.use("/student", Student);
app.use("/teacher", Teacher);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
