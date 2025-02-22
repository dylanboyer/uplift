import { Route } from 'react-router-dom';

// Import all pages
import Home from "./pages/home";
import NotFound from './pages/404';
import Login from './pages/login';
import SignUp from './pages/signup';

export default function Routes() {
  return (
    // <Route element={<MainLayout />}>
    <Route>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='*' element={<NotFound />} />
    </Route>
    // </Route>
  );
}
