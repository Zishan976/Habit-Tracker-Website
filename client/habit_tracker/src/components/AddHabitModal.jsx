import { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { api } from '../utils/api';

Modal.setAppElement('#root'); // Set the app element for accessibility

const AddHabitModal = ({ isOpen, onClose, onHabitAdded, forEdit, fetchSingleHabit }) => {
    const [title, setTitle] = useState('');
    const [goal, setGoal] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        if (forEdit && fetchSingleHabit) {
            setTitle(fetchSingleHabit.title || '');
            setGoal(fetchSingleHabit.goal || '');
        } else {
            setTitle('');
            setGoal('');
        }
    }, [forEdit, fetchSingleHabit]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!title.trim() || !goal) {
            setError('Please fill in all fields.');
            return;
        }
        setLoading(true);
        setError('');
        try {
            if (fetchSingleHabit) {
                await api.put(`/habits/${fetchSingleHabit.id}`, {
                    title: title,
                    goal: goal
                })
            } else {
                await api.post('/habits', { title: title.trim(), goal: parseInt(goal) });
                setTitle('');
                setGoal('');
            }

        } catch (err) {
            setError('Failed to add habit. Please try again.');
            console.error('Error adding habit:', err);
        } finally {
            setLoading(false);
            onHabitAdded(); // Callback to refresh habits
            onClose(); // Close the modal
        }
    };

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onClose}
            contentLabel="Add New Habit"
            className="modal"
            overlayClassName="modal-overlay"
        >
            <h2>{forEdit ? 'Update Habit' : 'Add New Habit'}</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="habit-title">Habit Name:</label>
                    <input
                        type="text"
                        id="habit-title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="e.g., Drink water"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="habit-goal">Goal (times per month):</label>
                    <input
                        type="number"
                        id="habit-goal"
                        value={goal}
                        onChange={(e) => setGoal(e.target.value)}
                        placeholder="e.g., 8"
                        min="1"
                        required
                    />
                </div>
                {error && <p className="error">{error}</p>}
                <button type="submit" disabled={loading}>
                    {loading ? 'Adding...' : (forEdit ? 'Update' : 'Add Habit')}
                </button>
                <button type="button" onClick={onClose}>Cancel</button>
            </form>
        </Modal>
    );
};

export default AddHabitModal;
