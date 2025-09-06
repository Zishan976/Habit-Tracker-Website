import { useEffect, useState } from "react"
import { api } from "../utils/api"
import './Habit.css'
import { Pencil, Trash } from "lucide-react"
import AddHabitModal from "./AddHabitModal"
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import Confetti from 'react-confetti';

function Habit({ habit, selectedDate, onHabitAdded }) {
    const [todaysLog, setTodaysLog] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [fetchSingleHabit, setFetchSingleHabit] = useState({})
    const [completedDays, setCompletedDays] = useState(0)
    const [showConfetti, setShowConfetti] = useState(false)

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    async function handleFetchSingleHabit() {
        try {
            setLoading(true)
            const result = await api.get(`/habits/${habit.id}`);
            setFetchSingleHabit(result.data[0])
        } catch (error) {
            setError("Failed to fectch the habit details")
        } finally {
            setLoading(false)
        }

    }

    useEffect(() => {
        async function getTodaysLog() {
            try {
                setLoading(true)
                setError(null)
                const formattedDate = selectedDate.toISOString().split('T')[0]
                const response = await api.get(`/habits/${habit.id}/logs?date=${formattedDate}`)
                if (response.data.length > 0) {
                    setTodaysLog(response.data[0])
                } else {
                    setTodaysLog(null)
                }
            } catch (error) {
                console.error("Failed to fetch today's log:", error)
                setTodaysLog(null)
                setError("Failed to load habit status. Please try again.")
            } finally {
                setLoading(false)
            }
        }
        getTodaysLog()
    }, [habit.id, selectedDate,])

    useEffect(() => {
        async function getAllLogs() {
            try {
                const response = await api.get(`/habits/${habit.id}/logs`)
                const completedCount = response.data.filter(log => log.completed).length
                setCompletedDays(completedCount)
            } catch (error) {
                console.error("Failed to fetch all logs:", error)
            }
        }
        getAllLogs()
    }, [habit.id])

    const toggleComplete = async () => {
        setLoading(true);
        setError(null);
        try {
            const formattedDate = selectedDate.toISOString().split('T')[0]

            let newCompletedDays = completedDays;

            if (todaysLog) {
                // Update existing log
                const response = await api.put(`/habits/${habit.id}/logs/${todaysLog.id}`, {
                    completed: !todaysLog.completed
                })
                setTodaysLog(response.data[0])
                // Update completedDays
                newCompletedDays = completedDays + (response.data[0].completed ? 1 : -1)
                setCompletedDays(newCompletedDays)

            } else {
                // Create new log
                const response = await api.post(`/habits/${habit.id}/logs`, {
                    date: formattedDate
                })
                setTodaysLog(response.data[0])
                // Update completedDays
                newCompletedDays = completedDays + (response.data[0].completed ? 1 : 0)
                setCompletedDays(newCompletedDays)
            }

            if (habit.goal === newCompletedDays) {
                setShowConfetti(true)
                alert(`🎉 Congratulations! You have completed ${habit.title}! 🎉`)
                setTimeout(() => {
                    setShowConfetti(false)
                    if (window.confirm(`Would you like to delete the completed habit "${habit.title}"?`)) {
                        handleDelete()
                    }
                }, 5000) // Stop confetti after 5 seconds
            }
        } catch (error) {
            console.error("Failed to toggle habit completion:", error)
            setError("Failed to update habit. Please try again.")
        } finally {
            setLoading(false)
        }
    }


    const handleDelete = async () => {
        if (window.confirm(`Are you sure you want to delete the habit "${habit.title}"?`)) {
            try {
                await api.delete(`/habits/${habit.id}`)
                onHabitAdded() // Refresh the habits list
            } catch (error) {
                console.error("Failed to delete habit:", error)
            }
        }
    }

    const getButtonSymbol = () => {
        if (loading) return "⏳"
        if (todaysLog && todaysLog.completed) return "✔️"
        return "●"
    }

    const handlePencilClick = () => {
        openModal()
        handleFetchSingleHabit()
    }

    return (
        <div className="habit-item">
            {showConfetti && <Confetti width={window.innerWidth} height={window.innerHeight} />}
            <div className="statement">
                <Pencil className="pencil" onClick={handlePencilClick} />
                <Trash className="trash" onClick={handleDelete} />
                <span className="habit-title">{habit.title}</span>
            </div>
            <div className="circular-progress-bar">
                <CircularProgressbar value={(completedDays / habit.goal) * 100} text={`${completedDays}/${habit.goal}`} />
            </div>

            <button
                className={`habit-complete-btn ${todaysLog?.completed ? 'completed' : ''}`}
                onClick={toggleComplete}
                aria-label="Toggle Complete"
                disabled={loading}
            >
                {getButtonSymbol()}
            </button>
            {error && <p className="error">{error}</p>}
            <AddHabitModal
                isOpen={isModalOpen}
                onClose={closeModal}
                onHabitAdded={onHabitAdded}
                forEdit={true}
                fetchSingleHabit={fetchSingleHabit}
            />
        </div>
    )
}

export default Habit
