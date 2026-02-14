// src/App.jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// 👇 CRITICAL: These imports must start with Capital Letters to match filenames!
import Layout from './components/layout';
import Login from './pages/sign-in';
import Signup from './pages/sign-up'; 
import Dashboard from './pages/dashboard';
import Inventory from './pages/Inventory';
import Production from './pages/production';
import Settings from './pages/settings'; // <--- Import the new page

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/inventory" element={<Inventory />} />
          <Route path="/production" element={<Production />} />
          <Route path="/settings" element={<Settings />} /> {/* <--- Add Route */}
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;