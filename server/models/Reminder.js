import mongoose from "mongoose";

const ReminderSchema = new mongoose.Schema({
  datetime: { 
    type: Date,
    required: true 
  },
  message: {
    type: String,
    required: true 
  },
  method: { 
    type: String, 
    enum: ["SMS", "Email"], 
    required: true 
  },
  createdAt: {
    type: Date, 
    default: Date.now },
});

export default mongoose.model("Reminder", ReminderSchema);
