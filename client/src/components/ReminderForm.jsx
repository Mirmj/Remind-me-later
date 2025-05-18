import { useState } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function ReminderForm({ fetchReminders }) {
  const [datetime, setDatetime] = useState(new Date());
  const [message, setMessage] = useState("");
  const [method, setMethod] = useState("SMS");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post("http://localhost:5000/api/reminders", {
        datetime,
        message,
        method,
      });
      alert("✅ Reminder set successfully!");
      setMessage("");
      
      if (fetchReminders) fetchReminders();
    } catch (err) {
      alert(" Failed to set reminder.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="reminder-form">
      <div className="form-group">
        <label>Date & Time:</label>
        <DatePicker
          selected={datetime}
          onChange={(date) => setDatetime(date)}
          showTimeSelect
          dateFormat="MMMM d, yyyy h:mm aa"
          className="date-picker"
        />
      </div>
      <div className="form-group">
        <label>Message:</label>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
          className="form-control"
          placeholder="Enter your reminder message"
        />
      </div>
      <div className="form-group">
        <label>Method:</label>
        <select 
          value={method} 
          onChange={(e) => setMethod(e.target.value)}
          className="form-control"
        >
          <option value="SMS">SMS</option>
          <option value="Email">Email</option>
        </select>
      </div>
      <button type="submit" className="submit-btn" disabled={loading}>
        {loading ? "Setting Reminder..." : "Set Reminder"}
      </button>
    </form>
  );
}
