import { useState, useEffect } from 'react';
import { Bell, ChevronRight, Heart, Plus } from 'lucide-react';
import AddHabitModal from './AddHabitModal';
import { Link, useNavigate } from "react-router-dom";
import Hamburger from 'hamburger-react'
import './Navbar.css'; // Importing the CSS file

function Navbar({ onHabitAdded, username }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(() => {
        // Initialize from localStorage or default to false
        const saved = localStorage.getItem('darkMode');
        return saved === 'true';
    });
    const navigate = useNavigate()
    const [isOpen, setOpen] = useState(false)

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
                    <ChevronRight onClick={() => navigate(-1)} />
                    <h1>Hey {username}!</h1>
                    <p>Did you completed todays task?</p>
                </div>
                <div className="icons">

                    <button
                        onClick={toggleDarkMode}
                        aria-label="Toggle Dark Mode"
                        className="dark-mode-toggle after-mobile-mode"

                    >
                        {isDarkMode ? <span title="Move to light mode">🌙</span> : <span title="Move to dark mode">☀️</span>}
                    </button>


                    <Plus onClick={openModal} style={{ cursor: 'pointer' }} className="icon-plus" />
                    <Bell className="icon-bell after-mobile-mode" />
                    <Heart className="icon-heart after-mobile-mode" />
                    <Link to={'/login'} className="logout-btn after-mobile-mode">Logout</Link>
                    <div className="hamburger-container">
                        <Hamburger toggled={isOpen} toggle={setOpen} />
                    </div>
                </div>
                <div className={`hamburger-menu ${isOpen ? 'open' : ''}`}>
                    <button
                        onClick={toggleDarkMode}
                        aria-label="Toggle Dark Mode"
                        className="dark-mode-toggle in-hamburger"

                    >
                        {isDarkMode ? <span title="Move to light mode">🌙</span> : <span title="Move to dark mode">☀️</span>}
                    </button>
                    <Bell />
                    <Heart />
                    <Link to={'/login'} className="logout-btn">Logout</Link>
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
