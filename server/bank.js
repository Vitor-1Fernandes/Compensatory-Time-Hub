import mongoose from "mongoose";

const bankSchema = new mongoose.Schema({


    "userID": String,
    "name": String,
    "date":String,
    "timeEntry":String,
    "timeExit":String,
    "project":String

});
 
export default mongoose.model('workTime', bankSchema)