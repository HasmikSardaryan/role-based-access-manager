import HomePage from './Pages/HomePage/HomePage';
import Login from './Pages/LoginPage/LoginPage';
import NotFoundPafge from './Pages/NotFoundPage/NotFoundPafge';
import Reset from './Pages/ResetPage/ResetPage';
import Logout from './Pages/LogoutPage/LogoutPage';
import InviteUserPage from './Pages/InviteUser/InviteUser';
import { createBrowserRouter, RouterProvider} from 'react-router-dom'

const router = createBrowserRouter([
  { path: '/', element: <HomePage/> , errorElement: <NotFoundPafge/> },
  { path: '/login', element: <Login/>, errorElement:<NotFoundPafge/> },
  { path: '/forgot', element: <Reset/>, errorElement:<NotFoundPafge/> },
  { path: '/logout', element: <Logout/>, errorElement: <NotFoundPafge/> },
  { path: '/admin/invite-user', element: <InviteUserPage/>, errorElement: <NotFoundPafge/> },

]);

function App() {
  return (
    <>
    <RouterProvider router={router}/>
    </>
  )
}
export default App