import Habit from "./Habit"
import './DailyTracker.css'

const DailyTracker = ({ selectedDate, habits, onHabitAdded, loading, error }) => {

    const filteredHabits = habits.filter(habit => {
        console.log("habit.created_at:", habit.created_at);
        const start = new Date(habit.created_at);
        console.log("start:", start);
        if (!habit.goal || habit.goal <= 0) return true;
        const end = new Date(start);
        end.setDate(start.getDate() + habit.goal);
        console.log("end:", end);
        const selected = new Date(selectedDate);
        selected.setHours(0, 0, 0, 0);
        start.setHours(0, 0, 0, 0);
        end.setHours(0, 0, 0, 0);
        return selected >= start && selected < end;
    });

    if (loading) {
        return (
            <div className="daily-tracker">
                <h1>Loading habits...</h1>
            </div>
        )
    }

    if (error) {
        return (
            <div className="daily-tracker">
                <h1>{error}</h1>
            </div>
        )
    }

    if (!habits || habits.length === 0) {
        return (
            <div className="daily-tracker">
                <h1>Create your first habit by clicking on + </h1>
            </div>
        )
    }

    return (
        <div className="daily-tracker">
            <ul>
                {filteredHabits.map((habit) => (
                    <li key={habit.id}>
                        <Habit habit={habit} selectedDate={selectedDate} onHabitAdded={onHabitAdded} />
                    </li>
                ))}
            </ul>
        </div>
    )



}

export default DailyTracker
