import HomePage from './Pages/HomePage/HomePage';
import Login from './Pages/LoginPage/LoginPage';
import Submit  from './Pages/Submit/Submit';
import NotFoundPafge from './Pages/NotFoundPage/NotFoundPafge';
import Reset from './Pages/ResetPage/ResetPage';
import MainContent from './Pages/Welcome/Welcome';
import JobsPage from './Pages/JobsPage/JobsPage';
import Logout from './Pages/LogoutPage/LogoutPage';
import UserPage from './Pages/UserPage/UserPage';
import Newest from './Pages/Newest/Newest';
import Comments from './Pages/HomePage/Comments/Comments';
import ReplyPage from './Pages/ReplyPage/Reply';
import UserPosts from './Pages/UserPage/UserPosts/UserPosts';
import AllComments from './Pages/AllComments/AllComments';
import Past from './Pages/Past/Past';
import { createBrowserRouter, RouterProvider} from 'react-router-dom'

const router = createBrowserRouter([
  { path: '/', element: <HomePage/> , errorElement: <NotFoundPafge/> },
  { path: '/login', element: <Login/>, errorElement:<NotFoundPafge/> },
  { path: '/submit', element: <Submit/>, errorElement:<NotFoundPafge/> },
  { path: '/forgot', element: <Reset/>, errorElement:<NotFoundPafge/> },
  { path: '/welcome', element: <MainContent/>, errorElement: <NotFoundPafge/>},
  { path: '/jobs', element: <JobsPage/>, errorElement: <NotFoundPafge/> },
  { path: '/logout', element: <Logout/>, errorElement: <NotFoundPafge/> },
  { path: '/user/:id', element: <UserPage/>, errorElement: <NotFoundPafge/> },
  { path: '/newest', element: <Newest/>, errorElement: <NotFoundPafge/> },
  { path: '/past', element: <Past/>, errorElement: <NotFoundPafge/> },
  { path: '/comments', element: <AllComments/>, errorElement: <NotFoundPafge/> },
  { path: '/reply/:id', element: <ReplyPage/>, errorElement: <NotFoundPafge/> },
  { path: '/user/:id/submissions', element: <UserPosts/>, errorElement: <NotFoundPafge/> },
  { path: '/comments/:postId', element: <Comments/>, errorElement: <NotFoundPafge/> }

]);

function App() {
  return (
    <>
    <RouterProvider router={router}/>
    </>
  )
}
export default App