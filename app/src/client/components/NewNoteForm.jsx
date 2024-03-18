import { createNote } from 'wasp/client/operations'
import '../css/App.css'

const NewNoteForm = () => {
    const handleSubmit = async (event) => {
        event.preventDefault()
        try {
            const target = event.target
            const content = target.content.value
            target.reset()
            await createNote({ content })
        } catch (err) {
            window.alert('Error: ' + err.message)
        }
    }

    return (
        <form className="formContainer" onSubmit={handleSubmit}>
            <input id="content" name="content" type="text" defaultValue="" />
            <button id="submit-note" type="submit">Add Note</button>
        </form>
    )
}

export default NewNoteForm