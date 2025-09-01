import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import DailyTracker from "../components/DailyTracker";
import { api } from "../utils/api";
import DateStrip from "../components/DateStrip";

const Dashboard = () => {
    const today = new Date();
    const [currentDate, setCurrentDate] = useState(today);
    const [habits, setHabits] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [username, setUsername] = useState("User");
    const formattedDate = today.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    const fetchHabits = async () => {
        setLoading(true);
        setError(null);
        try {
            const result = await api.get("/habits");
            setHabits(result.data);
        } catch (error) {
            console.error("Error fetching habits:", error);
            setError("Failed to load habits. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const fetchUser = async () => {
        try {
            const result = await api.get("/auth/user");
            setUsername(result.data.username);
        } catch (error) {
            console.error("Error fetching user:", error);
            setUsername("User");
        }
    };

    useEffect(() => {
        fetchHabits();
        fetchUser();
    }, []);

    const handleHabitAdded = () => {
        fetchHabits(); // Refresh habits after adding a new one
    };

    return (
        <div>
            <Navbar onHabitAdded={handleHabitAdded} username={username} />
            <div className="todays-date">{formattedDate}</div>
            <DateStrip currentDate={currentDate} setCurrentDate={setCurrentDate} />
            <DailyTracker selectedDate={currentDate} habits={habits} onHabitAdded={handleHabitAdded} loading={loading} error={error} />

        </div>
    )
}

export default Dashboard
