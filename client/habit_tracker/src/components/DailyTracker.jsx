import Habit from "./Habit"
import './DailyTracker.css'

const DailyTracker = ({ selectedDate, habits, onHabitAdded, loading, error }) => {

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
    } else {
        return (
            <div className="daily-tracker">
                <ul>
                    {habits.map((habit) => (
                        <li key={habit.id}>
                            <Habit habit={habit} selectedDate={selectedDate} onHabitAdded={onHabitAdded} />
                        </li>
                    ))}
                </ul>
            </div>
        )
    }


}

export default DailyTracker
