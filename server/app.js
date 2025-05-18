import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import reminderRoutes from "./routes/reminders.js";


dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;


app.use(cors());
app.use(express.json());


app.use("/api/reminders", reminderRoutes);


mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("✅ MongoDB Connected!"))
  .catch((err) => console.error(" MongoDB Error:", err));


app.listen(PORT, () => console.log(` Server running on http://localhost:${PORT}`));
