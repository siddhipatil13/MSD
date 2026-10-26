// Main App component: navigation bar, routed pages, footer.
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Academics from "./pages/Academics";
import Faculty from "./pages/Faculty";
import Activities from "./pages/Activities";
import Projects from "./pages/Projects";
import Contact from "./pages/Contact";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";

export default function App() {
  return (
    <div className="app-shell">
      <Navbar />
      <main className="app-main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/academics" element={<Academics />} />
          <Route path="/academics/:year" element={<Academics />} />
          <Route path="/faculty" element={<Faculty />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

// Simple 404 page using conditional rendering
function NotFoundPage() {
  return (
    <div style={{ textAlign: "center", padding: "60px 16px" }}>
      <h1>404 - Page Not Found</h1>
      <p>The page you are looking for does not exist.</p>
    </div>
  );
}
