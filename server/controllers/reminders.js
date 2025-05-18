import Reminder from "../models/Reminder.js";

// Create a new reminder
export const createReminder = async (req, res) => {
  try {
    const { datetime, message, method } = req.body;
    const reminder = new Reminder({ datetime, message, method });
    await reminder.save();
    res.status(201).json(reminder);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all reminders
export const getReminders = async (req, res) => {
  try {
    const reminders = await Reminder.find().sort({ datetime: 1 });
    res.json(reminders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete a reminder
export const deleteReminder = async (req, res) => {
  try {
    const reminder = await Reminder.findByIdAndDelete(req.params.id);
    if (!reminder) {
      return res.status(404).json({ error: "Reminder not found" });
    }
    res.json({ message: "Reminder deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update a reminder
export const updateReminder = async (req, res) => {
  try {
    const { datetime, message, method } = req.body;
    const reminder = await Reminder.findByIdAndUpdate(
      req.params.id,
      { datetime, message, method },
      { new: true, runValidators: true }
    );
    if (!reminder) {
      return res.status(404).json({ error: "Reminder not found" });
    }
    res.json(reminder);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
