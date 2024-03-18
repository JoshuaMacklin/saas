
import { useState, useEffect } from 'react'
import NoteView from './NoteView'


const NotesList = ({ notes }) => {
    const [showAll, setShowAll] = useState(true)

    const notesToShow = showAll
        ? notes
        : notes.filter(note => note.isImportant)

    console.log(notesToShow)

    if (!notes?.length) return <h3 className="noNotes">No notes</h3>

    return (
        <div className="noteView">
            <div className="showBtn">
                <button id="shwbtn" onClick={() => setShowAll(!showAll)}> show {showAll ? 'important' : 'all'}</button>
            </div>
            <ul className="notesList">
            {notesToShow.map((note, idx) => (
                <NoteView note={note} key={idx} />
            ))}
            </ul>
        </div>
    )
}

export default NotesList