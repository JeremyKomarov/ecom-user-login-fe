import Navbar from "./components/Navbar/Navbar";
import Home from "./components/example/Home";
import Profile from "./components/example/Profile";
import About from "./components/example/About";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import { Route, Routes } from "react-router-dom";
import { AuthProvider } from "./components/context/AuthProvider";

function App() {
  return (
    <AuthProvider>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
    </AuthProvider>
  );
}

export default App;
