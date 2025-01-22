import { Routes, Route } from 'react-router-dom'; 
import Navbar from "./components/shared/Navbar";
import Footer from "./components/shared/Footer";
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-1"> 
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} /> 
        </Routes>
      </div>
      <Footer /> {/* Footer remains at the bottom */}
    </div>
  );
}
