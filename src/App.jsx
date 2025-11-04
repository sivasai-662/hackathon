import "./styles.css";
import Navbar from "./components/Navbar.jsx";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Homestays from "./pages/Homestays.jsx";
import Guide from "./pages/Guide.jsx";
import Contact from "./pages/Contact.jsx";
import MyBookings from "./pages/MyBookings.jsx";
import CheckoutPage from "./pages/CheckoutPage.jsx";

export default function App() {
  return (
    <div className="app-root">
      <header>
        <h1>TravelNest</h1>
        <p>Your Gateway to Stays & Local Adventures</p>
      </header>

      <Navbar />

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/homestays" element={<Homestays />} />
          <Route path="/guide" element={<Guide />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/bookings" element={<MyBookings />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </main>

      <footer>
        <p>© {new Date().getFullYear()} TravelNest — SDP Review Project</p>
      </footer>
    </div>
  );
}
