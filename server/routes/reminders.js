import express from "express";
import { createReminder, getReminders, deleteReminder, updateReminder } from "../controllers/reminders.js";

const router = express.Router();

router.post("/", createReminder);
router.get("/", getReminders);
router.delete("/:id", deleteReminder);
router.put("/:id", updateReminder);

export default router;
