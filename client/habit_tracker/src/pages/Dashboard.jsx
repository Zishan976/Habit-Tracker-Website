import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import DailyTracker from "../components/DailyTracker";
import { api } from "../utils/api";
import DateStrip from "../components/DateStrip";
import Notes from "../components/Notes";
import { ChevronLeft, ChevronRight } from "lucide-react";

const Dashboard = () => {
    const today = new Date();
    const [currentDate, setCurrentDate] = useState(today);
    const [habits, setHabits] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [username, setUsername] = useState("User");
    const formattedDate = currentDate.toLocaleDateString('en-US', {
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

    const handleToNextMonth = () => {
        const nextMonth = new Date(currentDate);
        nextMonth.setDate(currentDate.getDate() + 30);
        setCurrentDate(nextMonth)
    }

    const handleToPreviousMonth = () => {
        const previousMonth = new Date(currentDate);
        previousMonth.setDate(currentDate.getDate() - 30);
        setCurrentDate(previousMonth)
    }

    return (
        <div>
            <Navbar onHabitAdded={handleHabitAdded} username={username} />
            <div className="todays-date"><ChevronLeft className="navigate-date" onClick={handleToPreviousMonth} />{formattedDate}<ChevronRight className="navigate-date" onClick={handleToNextMonth} /></div>
            <DateStrip currentDate={currentDate} setCurrentDate={setCurrentDate} />
            <DailyTracker selectedDate={currentDate} habits={habits} onHabitAdded={handleHabitAdded} loading={loading} error={error} />
            <Notes />
        </div>
    )
}

export default Dashboard
