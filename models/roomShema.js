const mongoose = require("mongoose");
const moment = require('moment');    

const groupSchema = new mongoose.Schema(
  {
    groupName: {
      type: String,
      required: [true, "Name is required"],
    },
    groupTeacher:{
      type:String
    },
    pricePerDay: {
      type: Number,
      required: [true, "Price per day is required"],
    },
    numberRoom: {
      type: String,
      required: [true, "Category is required"],
    },
    lessonTime: {
      start:{type:String},
      end:{type:String}
    },
    oddNumbers:{
      type: String
    },
    created: {
      createdGroup: { type: String, default: moment().format("DD.MM.YYYY") },//gruppa yaratilgan kun
      startGroup: {type:String}, // bu start goup darslar boshlangan sanasi
      endedGroup: {type:String},
      status:{type:Boolean, default: true}, // Gruppa yopilgan

    },
    acive:{
      type: Boolean, default: false // faoliyat (Student yigilganda)
    },
    texnology: {
      type: String,
    },
    capacity: {
      type: Array,
    }
  },
);


const groupModel = mongoose.model("Room", groupSchema);
module.exports = groupModel;
