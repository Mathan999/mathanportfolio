import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './App.css';
import Home from './components/Home';
import AdminLogin from './components/AdminLogin';
import AdminDashboard from './components/AdminDashboard';


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  // Check if user is logged in from localStorage on component mount
  useEffect(() => {
    const loggedInStatus = localStorage.getItem('adminLoggedIn');
    if (loggedInStatus === 'true') {
      setIsLoggedIn(true);
    }
  }, []);

  // Protected route component to check authentication
  const ProtectedRoute = ({ children }) => {
    if (!isLoggedIn) {
      return <Navigate to="/admin/login" />;
    }
    return children;
  };

  return (
    <BrowserRouter>
      <div className="portfolio-container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin/login" element={<AdminLogin setIsLoggedIn={setIsLoggedIn} />} />
          <Route 
            path="/admin" 
            element={
              <ProtectedRoute>
                <AdminDashboard setIsLoggedIn={setIsLoggedIn} />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;