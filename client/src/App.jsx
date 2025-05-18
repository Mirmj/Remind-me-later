import { useState, useEffect } from "react";
import axios from "axios";
import ReminderForm from "./components/ReminderForm";
import ReminderList from "./components/ReminderList";
import "./App.css";

export default function App() {
  const [reminders, setReminders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchReminders = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:5000/api/reminders");
      setReminders(response.data);
      setError(null);
    } catch (err) {
      console.error("Error fetching reminders:", err);
      setError("Failed to load reminders. Please try again later.");
    } finally {
      setLoading(false);
    }
  };//end of fetch reminders

  useEffect(() => {
    fetchReminders();
  }, []);

  return (
    <div className="app-container">
      <header>
        <h1>⏰ Remind-Me-Later</h1>
        <p>Never forget important tasks again!</p>
      </header>

      <main>
        <section className="form-section">
          <h2>Set a New Reminder</h2>
          <ReminderForm fetchReminders={fetchReminders} />
        </section> 

        <section className="list-section">
          {loading ? (
            <p className="loading">Loading reminders...</p>
          ) : error ? (
            <p className="error">{error}</p>
          ) : (
            <ReminderList reminders={reminders} fetchReminders={fetchReminders} />
          )}
        </section>
      </main>

      <footer>
        <p>&copy; {new Date().getFullYear()} Remind-Me-Later App</p>
      </footer>
    </div>
  );// end of return
}//end of app
