import { Pencil } from "lucide-react";
import { useState } from "react";
import AddNoteModal from "./AddNoteModal";
import { api } from "../utils/api";


const Edit = ({ onNotesAdded, note }) => {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [singleNote, setSingleNote] = useState({})
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const fetchSingleNote = async () => {
        setLoading(true);
        setError(null);
        try {
            const result = await api.get(`/notes/${note.id}`)
            setSingleNote(result.data)
        } catch (error) {
            setError("Failed to load note. Please try again later.");
        } finally {
            setLoading(false);
        }
    }

    const handlePencilEdit = () => {
        openModal()
        fetchSingleNote()
    }

    return (
        <>
            <Pencil style={{ width: "18px", cursor: "pointer" }} onClick={handlePencilEdit} />
            {error && <p className="error-message">{error}</p>}
            {loading && <p>Loading note...</p>}
            <AddNoteModal
                isOpen={isModalOpen}
                onClose={closeModal}
                onNotesAdded={onNotesAdded}
                forEdit={true}
                singleNote={singleNote}
            />
        </>
    )
}

export default Edit
