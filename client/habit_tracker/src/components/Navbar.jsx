import { useState } from 'react';
import { Bell, ChevronRight, Heart, Plus } from 'lucide-react';
import AddHabitModal from './AddHabitModal';
import './Navbar.css'; // Importing the CSS file

function Navbar({ onHabitAdded, username }) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);



    return (
        <>
            <nav>
                <div className="nickname">
                    <ChevronRight />
                    <h1>Hey {username}!</h1>
                    <p>You missed two habits today, get to it?</p>
                </div>
                <div className="icons">
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

