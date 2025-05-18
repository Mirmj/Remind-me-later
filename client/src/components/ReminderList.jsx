import { useState } from "react";
import axios from "axios";

export default function ReminderList({ reminders, fetchReminders }) {
  const [loading, setLoading] = useState(false);

  const formatDate = (dateString) => {
    const options = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this reminder?")) return;
    
    setLoading(true);
    try {
      await axios.delete(`http://localhost:5000/api/reminders/${id}`);
      fetchReminders();
    } catch (err) {
      console.error("Error deleting reminder:", err);
      alert("Failed to delete reminder");
    } finally {
      setLoading(false);
    }
  };

  if (!reminders || reminders.length === 0) {
    return <p className="no-reminders">No reminders set yet.</p>;
  }

  return (
    <div className="reminder-list">
      <h2>Your Reminders</h2>
      <div className="reminders-container">
        {reminders.map((reminder) => (
          <div key={reminder._id} className="reminder-card">
            <div className="reminder-content">
              <p className="reminder-time">{formatDate(reminder.datetime)}</p>
              <p className="reminder-message">{reminder.message}</p>
              <p className="reminder-method">Via: {reminder.method}</p>
            </div>
            <button 
              onClick={() => handleDelete(reminder._id)} 
              className="delete-btn"
              disabled={loading}
            >
              Delete
            </button>
          </div>
        ))} 
      </div>
    </div>
  );//end of return
}// end of ReminderList
