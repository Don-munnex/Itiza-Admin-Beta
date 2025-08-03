

import { useState, useEffect } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import PinkDiv from './components/PinkDiv';
import Footer from './components/Footer';
// import WalletContextProvider from './components/connection';
import LoginPage from "./components/Login";
import SignUpPage from "./components/SignUp";
import Dashboard from "./components/AdminDashboard";

function AppContent() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();

  // Optional: persist login
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) setIsLoggedIn(true);
  }, []);

  // Check if current route is admin
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <div className="min-h-screen">
      {/* Only show header for non-admin routes */}
      {!isAdminRoute && <PinkDiv />}

      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<LoginPage setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route
          path="/admin"
          element={isLoggedIn ? <Dashboard setIsLoggedIn={setIsLoggedIn} /> : <Navigate to="/login" replace />}
        />
        <Route path="*" element={<p className="text-center mt-10">Page not found</p>} />
      </Routes>

      {/* Only show footer for non-admin routes */}
      {!isAdminRoute && <Footer />}
    </div>
  );
}

function App() {
  return (
    <>
      <AppContent />
    </>
  );
}

export default App;