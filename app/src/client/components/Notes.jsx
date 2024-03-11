import { FaTrashAlt } from "react-icons/fa";
import { TiPin, TiPinOutline } from "react-icons/ti";
import { FaPencilAlt } from "react-icons/fa";
// import { useState } from "react";
import Card from 'react-bootstrap/Card'
import '../components/css/Notes.css'

function Notes({note, toggleImportant, updateNote, deleteNote, deactivate}) {

  return (
    <div className="cardContainer">
      <div className="noteContainer">
        <Card className="noteCard" style={{ backgroundColor: `#${note.color}d5` }}>
          <div data-testid="change-importance" onClick={() => toggleImportant(note.id)} >
            { note.important ? (
              <TiPin data-testid="icon-important" className="pinStyle" />
            ) : (
              <TiPinOutline data-testid="icon-unImportant" className="pinStyle" />
            )}
          </div>
          <Card.Body>
            <Card.Text className="noteStyle">
              {note.content}
            </Card.Text>
          </Card.Body>
        <div className="updateDeleteContainer">
          <FaPencilAlt 
            data-testid="update-button" 
            onClick={() => updateNote(note.id)} 
            disabled={deactivate}
            className="hoverMode"
          >
          </FaPencilAlt>
          <div>
            <FaTrashAlt
              data-testid="delete-icon"
              style={{ visibility: note.important ? 'hidden' : 'visible' }} 
              onClick={() => deleteNote(note.id)}
              className="hoverMode" 
            />
          </div>
        </div>
      </Card>
      </div>
    </div>
  )
}

export default Notes;