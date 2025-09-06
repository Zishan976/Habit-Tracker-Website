import { useState, useEffect } from 'react';
import { Bell, ChevronRight, Heart, Plus } from 'lucide-react';
import AddHabitModal from './AddHabitModal';
import { Link } from "react-router-dom";
import './Navbar.css'; // Importing the CSS file

function Navbar({ onHabitAdded, username }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(() => {
        // Initialize from localStorage or default to false
        const saved = localStorage.getItem('darkMode');
        return saved === 'true';
    });

    useEffect(() => {
        if (isDarkMode) {
            document.body.classList.add('dark-mode');
        } else {
            document.body.classList.remove('dark-mode');
        }
        // Save preference to localStorage
        localStorage.setItem('darkMode', isDarkMode);
    }, [isDarkMode]);

    const toggleDarkMode = () => {
        setIsDarkMode(prevMode => !prevMode);
    };

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    return (
        <>
            <nav>
                <div className="nickname">
                    <ChevronRight />
                    <h1>Hey {username}!</h1>
                    <p>Did you completed todays task?</p>
                </div>
                <div className="icons">
                    <Link to={'/login'} className="logout-btn">Logout</Link>
                    <button
                        onClick={toggleDarkMode}
                        aria-label="Toggle Dark Mode"
                        className="dark-mode-toggle"

                    >
                        {isDarkMode ? <span title="Move to light mode">🌙</span> : <span title="Move to dark mode">☀️</span>}
                    </button>


                    <Plus onClick={openModal} style={{ cursor: 'pointer' }} />
                    <Bell />
                    <Heart />
                </div>
            </nav>
            <AddHabitModal
                isOpen={isModalOpen}
                onClose={closeModal}
                onHabitAdded={onHabitAdded}
                forEdit={false}
            />
        </>
    );
}

export default Navbar;
