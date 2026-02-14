import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/layout';
import LandingPage from './pages/landing-page';  
import Login from './pages/sign-in';
import Signup from './pages/sign-up';
import Dashboard from './pages/dashboard';
import Inventory from './pages/Inventory';
import Production from './pages/production';
import Settings from './pages/settings';

// Helper component to wrap protected routes
const AppLayout = ({ children }) => <Layout>{children}</Layout>;

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* PUBLIC ROUTES */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/sign-in" element={<Login />} />
        <Route path="/sign-up" element={<Signup />} />

        {/* PROTECTED APP ROUTES (Wrapped in Layout) */}
        <Route path="/dashboard" element={<AppLayout><Dashboard /></AppLayout>} />
        <Route path="/inventory" element={<AppLayout><Inventory /></AppLayout>} />
        <Route path="/production" element={<AppLayout><Production /></AppLayout>} />
        <Route path="/settings" element={<AppLayout><Settings /></AppLayout>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;