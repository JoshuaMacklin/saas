// import { useAuth } from 'wasp/client/auth';
// import { updateCurrentUser } from 'wasp/client/operations';
// import AppNavBar from './components/AppNavBar';
// import { useMemo, useEffect, ReactNode } from 'react';
// import { useLocation } from 'react-router-dom';
// import './Main.css';
import { useState, useEffect } from 'react'
// import { Note } from 'wasp/entities'
import { getNotes, useQuery } from 'wasp/client/operations'

// import { noteServices } from './services/noteServices'
import './components/css/App.css'



const App = () => {
  const { data: notes, isLoading, error } = useQuery(getNotes)

  return (
    <div>
      {notes && <NotesList notes={notes} />}

      {isLoading && 'Loading...'}
      {error && 'Error: ' + error}
    </div>
  )
}

const NoteView = ({ note }) => {
  return (
    <ul>
      <li id={String(note.id)}>
      {note.content}
      </li>
    </ul>
  )
}

const NotesList = ({ notes }) => {
  if (!notes?.length) return <div>No notes</div>

  return (
    <div>
      {notes.map((note, idx) => (
        <NoteView note={note} key={idx} />
      ))}
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
