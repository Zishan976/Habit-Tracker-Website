import { useEffect, useState } from "react";
import { api } from "../utils/api";
import './Notes.css';
import AddNoteModal from "./AddNoteModal";
import { Trash } from "lucide-react";
import Edit from "./Edit";

const Notes = () => {
    const [notes, setNotes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false)

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const onNotesAdded = () => {
        fetchNotes()
    }

    // Fetch notes from API
    const fetchNotes = async () => {
        try {
            const response = await api.get('/notes')
            setNotes(response.data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchNotes();
    }, []);

    // Format timestamp to readable string
    const formatTimestamp = (timestamp) => {
        const date = new Date(timestamp);
        return date.toLocaleString(undefined, {
            day: "numeric",
            month: "long",
            year: "numeric",
            hour: "numeric",
            minute: "2-digit",
            hour12: true,
        });
    };

    const handleDelete = async (noteId) => {
        if (window.confirm('Are you sure you want to delete this note')) {
            try {
                await api.delete(`/notes/${noteId}`);
                fetchNotes()

            } catch (error) {
                console.error("Failed to delete note:", error)
            }
        }
    }

    return (
        <div className="note-container">
            <div className="notes-header">
                <h2 className="notes-title">Notes</h2>
                <button className="notes-new-button" onClick={openModal}>+ New Note</button>
            </div>
            {loading ? (
                <p>Loading notes...</p>
            ) : (
                notes.map((note) => (
                    <div key={note.id} className="note-card">
                        <div className="note-timeTrash">
                            <p className="note-timestamp">{formatTimestamp(note.timestamp)}</p>
                            <div className="pencil-trash">

                                <Edit onNotesAdded={onNotesAdded} note={note} />
                                <Trash onClick={() => handleDelete(note.id)} style={{ width: "18px", cursor: "pointer" }} />
                            </div>

                        </div>
                        <p className="note-content">{note.content}</p>
                        <div className="note-actions">
                        </div>
                    </div>
                ))
            )}
            <AddNoteModal
                isOpen={isModalOpen}
                onClose={closeModal}
                onNotesAdded={onNotesAdded}
                forEdit={false}
            />
        </div>
    );
};

export default Notes;
