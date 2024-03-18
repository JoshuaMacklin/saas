import './css/App.css';
import { getNotes, useQuery } from 'wasp/client/operations'
import NotesList from './components/NotesList'
import NewNoteForm from './components/NewNoteForm';



const App = (_children) => {
  const { data: notes, isLoading, error } = useQuery(getNotes)

  return (
    <div className="container">
      <h1> Ascending Notes </h1>
      <h3>Type and add notes here!</h3>
      <NewNoteForm />

      {notes && <NotesList notes={notes} />}

      {isLoading && 'Loading...'}
      {error && 'Error: ' + error}
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
