// import { useAuth } from 'wasp/client/auth';
// import { updateCurrentUser } from 'wasp/client/operations';
// import AppNavBar from './components/AppNavBar';
// import { useMemo, useEffect, ReactNode } from 'react';
// import { useLocation } from 'react-router-dom';
// import './Main.css';
import { useState, useEffect } from 'react'
// import { Note } from 'wasp/entities'
import { getNotes, useQuery, createNote, updateNote, deleteNote } from 'wasp/client/operations'

// import { noteServices } from './services/noteServices'
import './components/css/App.css'
import { BiTask } from 'react-icons/bi'



const App = (_children) => {
  const { data: notes, isLoading, error } = useQuery(getNotes)

  return (
    <div>
      <h1> Ascending Notes </h1>
      <NewNoteForm />

      {notes && <NotesList notes={notes} />}

      {isLoading && 'Loading...'}
      {error && 'Error: ' + error}
    </div>
  )
}

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
    <ul>
      <li id={String(note.id)}>
        {note.content}
        <div>
          <button className="impbtn" onClick={handleIsImportant}>{isNoteImportant}</button>
        </div>
        <div>
          <button className="delbtn" onClick={handleDelete}>Delete Note</button>
        </div>
      </li>
    </ul>
  )
}

const NotesList = ({ notes }) => {
  const [showAll, setShowAll] = useState(true)

  const notesToShow = showAll
    ? notes
    : notes.filter(note => note.isImportant)

  console.log(notesToShow)

  if (!notes?.length) return <div>No notes</div>

  return (
    <div>
      <div>
        <button id="shwbtn" onClick={() => setShowAll(!showAll)}> show {showAll ? 'important' : 'all'}</button>
      </div>
      {notesToShow.map((note, idx) => (
        <NoteView note={note} key={idx} />
      ))}
    </div>
  )
}

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
    <form onSubmit={handleSubmit}>
      <input id="content" name="content" type="text" defaultValue="" />
      <input id="submit-note" type="submit" value="Create Note" />
    </form>
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
