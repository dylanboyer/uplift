import { Route } from 'react-router-dom';

// Import layout
import MainLayout from './layouts/main-layout';

// Import all pages
import Home from './pages/Home';
import NotFound from './pages/NotFound';

export default function Routes() {
  return (
    <Route element={<MainLayout />}>
        <Route path='/' element={<Home />} />
        <Route path='*' element={<NotFound />} />
    </Route>
  );
}
