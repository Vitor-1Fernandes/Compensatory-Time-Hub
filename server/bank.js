import mongoose from "mongoose";

const bankSchema = new mongoose.Schema({

    "id": String,
    "name": String,
    "date":String,
    "timeEntry":String,
    "timeExit":String,
    "project":String

});
 
export default mongoose.model('workTime', bankSchema)