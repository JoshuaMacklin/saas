// import { useAuth } from 'wasp/client/auth';
// import { updateCurrentUser } from 'wasp/client/operations';
// import AppNavBar from './components/AppNavBar';
// import { useMemo, useEffect, ReactNode } from 'react';
// import { useLocation } from 'react-router-dom';
// import './Main.css';
import { useState, useEffect } from 'react'
import Notes from './components/Notes'
import Form from './components/Form'
// import { noteServices } from './services/noteServices'
import SuccessMessage from './components/SuccessMessage'
import ErrorMessage from './components/ErrorMessage'
import { FaSort } from "react-icons/fa6";
import { MdDeleteSweep } from "react-icons/md";
import './components/css/App.css'

// const {
//   get,
//   create,
//   update,
//   remove,
//   removeAll
// } = noteServices

const App = () => {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('')
  const [successMessage, setSuccessMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [disableFunction, setDisableFunction] = useState(false)
  const [isSorted, setIsSorted] = useState(false)

  //Get RQ
//   useEffect(() => {
//     get()
//     .then(notes => 
//       setNotes(notes)
//       )
//   }, [])

  //Sort Notes function top-bottom/ bottom-top
  const sortNotes = () => {
    const collection = [...notes]
    .sort((a, b) =>  (isSorted ? a.important - b.important : b.important - a.important))
    setNotes(collection)
    setIsSorted(!isSorted)
  }

  const addNewNote = (e) => {
    e.preventDefault()
    //random hex generator
    const hex = Math.floor(Math.random() * 0xffffff).toString(16).padEnd(6, "0")

    //Set up new note object
    noteObject = ({
      content: newNote,
      color: hex,
      important: false
    })

    //Post RQ
    if(newNote.length >= 5){
      create(noteObject)
      .then(newNotes => 
        setNotes(notes.concat(newNotes))
      ).catch(error => 
        console.log(error.response.data.error)
      )
    }else {
      setErrorMessage('Not enough characters for a note! : Minimum length - 5')

      setTimeout(() => {
        setErrorMessage(null)
      }, 1000)
    }
    setNewNote('')
  }

  const findNote = (id) => {
    return notes.find(note => note.id === id)
  }

  const toggleImportant = (id) => {
    const note = findNote(id)
    const updatedImportance = {...note, important: !note.important}
    //Update RQ
    update(id, updatedImportance)
    .then(
      setNotes(notes.map(n => n.id !== id ? n : updatedImportance))
    )
  }

  const updateNote = (id) => {
  const note = findNote(id)
  const notePrompt = window.prompt('Do you want to update this note?', note.content)

  if(notePrompt){
    if(notePrompt.length >= 5){
      const updatedContent = {...note, content: notePrompt}
      //Update RQ
      update(id, updatedContent)
      .then(
        setNotes(notes.map(n => n.id === id ? updatedContent : n)),
        setSuccessMessage('You Changed Your Note!'),
        setDisableFunction(true),
        setTimeout(() => {
          setSuccessMessage(null),
          setDisableFunction(false)
        }, 1000)
      )
      .catch(error => {
          console.log(error)
          setErrorMessage('This note does not currently exist on the server!'),
          setDisableFunction(true),
          setTimeout(() => {
            setErrorMessage(null)
            setDisableFunction(false)
          }, 1000)
      })
      } else {
        setErrorMessage('Not enough characters for a note! : Minimum length - 5')

        setTimeout(() => {
          setErrorMessage(null)
        }, 1500)
      }
    }   
  }
  // Delete RQ
  const deleteNote = (id) => {
    const filteredNote = notes.filter(note => id !== note.id)
    const confirmDelete = window.confirm('Would you want to remove this note?')

    if(confirmDelete){
      remove(id)
      .then(
        setNotes(filteredNote),
        setSuccessMessage('Successfully Removed Note.'),
        setDisableFunction(true),
        setTimeout(() => {
          setSuccessMessage(null),
          setDisableFunction(false)
        }, 1000)
      )
      .catch(error => {
        console.log(error)
        setErrorMessage('This Note has already been removed!'),
        setTimeout(() => {
          setErrorMessage(null)
        }, 1000)
      })
    }
  }
  //Delete All RQ
  const deleteAllNotes = () => {
    const confirmDeleteAll = window.confirm('Are you sure you want to remove all notes?')
    const removeNotes = []

    if(confirmDeleteAll){
      setNotes(removeNotes)
      removeAll()
      .then(() => {
        setNotes(removeNotes)
        setSuccessMessage('Removed All Notes!')
        setTimeout(() => {
          setSuccessMessage(null)
        }, 1500)
      }).catch((error) => {
        console.log(error)
      })
    }
  }

  return (
    <div>
      <div className='formContainer'>
        <h1>Ascend Notes</h1>
        <Form 
          onSubmit={addNewNote} 
          value={newNote} 
          onChange={(e) => setNewNote(e.target.value)}
        />
        <div className='noteOptions'>
          <button data-testid="deleteAll-icon" onClick={deleteAllNotes} >
            <MdDeleteSweep />
          </button>
          <button onClick={sortNotes}>
            <FaSort />
          </button>
        </div>
        <div className='NotificationMessages'>
          <ErrorMessage message={errorMessage} />
          <SuccessMessage message={successMessage}/>
        </div>
      </div>
      <div className='container'>
        {notes.map(note => 
          <Notes 
            key={note.id} 
            note={note}
            deactivate={disableFunction}
            toggleImportant={toggleImportant}
            updateNote={() => updateNote(note.id)}
            deleteNote={() => deleteNote(note.id)}
          />
        )}
      </div>
    </div>
  )
}

export default App





/**
 * use this component to wrap all child components
 * this is useful for templates, themes, and context
 */
// export default function App({ children }: { children: ReactNode }) {
//   const location = useLocation();
//   const { data: user } = useAuth();

//   const shouldDisplayAppNavBar = useMemo(() => {
//     return location.pathname !== '/' && location.pathname !== '/login' && location.pathname !== '/signup';
//   }, [location]);

//   const isAdminDashboard = useMemo(() => {
//     return location.pathname.startsWith('/admin');
//   }, [location]);

//   useEffect(() => {
//     if (user) {
//       const lastSeenAt = new Date(user.lastActiveTimestamp);
//       const today = new Date();
//       if (today.getTime() - lastSeenAt.getTime() > 5 * 60 * 1000) {
//         updateCurrentUser({ lastActiveTimestamp: today });
//       }
//     }
//   }, [user]);

//   useEffect(() => {
//     if (location.hash) {
//       const id = location.hash.replace('#', '');
//       const element = document.getElementById(id);
//       if (element) {
//         element.scrollIntoView();
//       }
//     }
//   }, [location]);

//   return (
//     <>
//       <div className='min-h-screen dark:text-white dark:bg-boxdark-2'>
//         {isAdminDashboard ? (
//           <>{children}</>
//         ) : (
//           <>
//             {shouldDisplayAppNavBar && <AppNavBar />}
//             <div className='mx-auto max-w-7xl sm:px-6 lg:px-8'>{children}</div>
//           </>
//         )}
//       </div>
//     </>
//   );
// }
