import { useEffect, useState } from "react"
import Modal from 'react-modal';
import { api } from "../utils/api";

const AddNoteModal = ({ isOpen, onClose, onNotesAdded, singleNote, forEdit }) => {
    const [content, setContent] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    useEffect(() => {
        if (forEdit && singleNote) {
            setContent(singleNote.content || '');
        } else {
            setContent('');
        }
    }, [forEdit, singleNote]);

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!content.trim()) {
            setError('Please fill the box')
            return;
        }
        setLoading(true)
        setError('');
        try {

            if (forEdit) {
                await api.put(`/notes/${singleNote.id}`, { content: content })
            } else {
                await api.post('/notes', { content: content.trim() });
                setContent('')
            }

        } catch (error) {
            setError('Failed to add note. Please try again');
            console.error('Error adding note:', error)
        } finally {
            setLoading(false);
            onNotesAdded();
            onClose();
        }
    }

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onClose}
            contentLabel="Create New Note"
            className="modal"
            overlayClassName="modal-overlay"
        >
            <h2>{forEdit ? 'Edit Note' : 'Create New Note'}</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <textarea
                        placeholder="Write your thoughts"
                        aria-required="true"
                        id="note-content"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                    ></textarea>
                    {error && <p className="error">{error}</p>}
                    <div>
                        <button type="submit" disabled={loading}>
                            {loading ? 'saving' : 'save'}
                        </button>
                        <button type="button" onClick={onClose}>Cancel</button>
                    </div>

                </div>
            </form>
        </Modal>
    )
}

export default AddNoteModal
