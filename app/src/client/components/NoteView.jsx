
import '../css/App.css'
import { updateNote, deleteNote } from 'wasp/client/operations'



const NoteView = ({ note }) => {
    const handleIsImportant = async (event) => {
        try {
            await updateNote({
                id: note.id,
                isImportant: !note.isImportant
            })
        } catch (error) {
            window.alert('Error while updating note:' + error.message)
        }
    }

    const handleDelete = async (event) => {
        try {
            await deleteNote({
                id: note.id,
            })
        } catch (error) {
            window.alert('Error while deleting note:' + error.message)
        }
    }

    const isNoteImportant = note.isImportant ? "Mark as Not Important" : "Mark as Important"
    
    return (
            <li className="note" data-testid="content" id={String(note.id)}>
                <div className="content">{note.content}</div>
                <div className="buttons">
                    <button data-testid="important" className="impbtn" onClick={handleIsImportant}>{isNoteImportant}</button>
                    <button data-testid="delete" className="delbtn" onClick={handleDelete}>Delete Note</button>
                </div>
            </li>
    )
}

export default NoteView