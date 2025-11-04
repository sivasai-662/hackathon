import { useTravel } from "../context/TravelContext";
import { useState } from "react";
import PaymentModal from "../components/PaymentModal.jsx";
import AuthModal from "../components/AuthModal.jsx";
import TransferModal from "../components/TransferModal.jsx";
import ToursModal from "../components/ToursModal.jsx";
import Confetti from "../components/Confetti.jsx";
import { useNavigate } from "react-router-dom";
import citiesData from "../data/cities.js";

export default function Guide() {
  const { confirmBooking, user } = useTravel();
  const [msg, setMsg] = useState("");
  const [paymentItem, setPaymentItem] = useState(null);
  const [showPayment, setShowPayment] = useState(false);
  const [showAuth, setShowAuth] = useState(false);
  const [showTransfer, setShowTransfer] = useState(false);
  const [showTours, setShowTours] = useState(false);
  // checkout now handled via full-screen page (/checkout)
  const navigate = useNavigate();

  // compute starting prices dynamically where possible
  const flightStarting = 2000; // per user request: flights starting from ₹2000
  // tours starting price: minimum sightseeing price across cities
  const tourMin = Math.min(...citiesData.flatMap(c=> (c.sightseeing||[]).map(s=> s.price || 0))).toFixed(0);
  const transferStarting = 800; // base minimum for cars (matches TransferModal base)

  const guides = [
    { key: 'flight', title: "Flight Booking", desc: "Book domestic & international flights.", img: "/air.jpg", starting: flightStarting },
    { key: 'transfer', title: "Airport Transfers", desc: "Reliable taxi services from airport.", img: "https://images.unsplash.com/photo-1503376780353-7e6692767b70", starting: transferStarting },
    { key: 'tours', title: "Tours & Activities", desc: "Explore curated experiences.", img: "/7.jpg", starting: tourMin },
  ];

  const handleBook = (g) => {
    if (g.key === 'flight') {
      // Navigate to contact with prefilled message for flight booking
      navigate('/contact', { state: { prefill: { subject: 'Flight booking request', message: `I would like to book a flight. Please assist with schedules and fares.` } } });
      return;
    }

    if (g.key === 'transfer') {
      // open transfer modal
      setShowTransfer(true);
      return;
    }

    if (g.key === 'tours') {
      setShowTours(true);
      return;
    }

    if (!user) {
      setShowAuth(true);
      return;
    }
    setPaymentItem(g);
    setShowPayment(true);
  };

  const onPaymentSuccess = (payment) => {
    const booking = confirmBooking({ item: paymentItem, payment });
    setShowPayment(false);
    setPaymentItem(null);
    setMsg(`✅ ${booking.item.title || booking.item.city || booking.item.name} booked successfully!`);
    setTimeout(() => setMsg(""), 3000);
  };

  return (
    <div className="container">
      <h2>🌍 Local Guide Services</h2>
      {msg && <p style={{ color: "green" }}>{msg}</p>}
      <div className="grid">
        {guides.map((g, i) => (
          <div key={i} className="card">
            <img src={g.img} alt={g.title} />
            <div className="card-content">
              <h3>{g.title}</h3>
              <p>{g.desc}</p>
              <p><b>Starting from ₹{g.starting}</b></p>
              <button className="btn" onClick={() => handleBook(g)}>Book Now</button>
            </div>
          </div>
        ))}
      </div>

      {/* full-screen checkout page will handle review/payment */}

      {showPayment && paymentItem && (
        <PaymentModal item={paymentItem} onClose={() => setShowPayment(false)} onSuccess={onPaymentSuccess} />
      )}

      {showAuth && <AuthModal onClose={() => setShowAuth(false)} />}

  {showTransfer && <TransferModal onClose={() => setShowTransfer(false)} onProceed={(transferItem)=>{ setShowTransfer(false); navigate('/checkout', { state: { item: transferItem } }); }} />}

  {showTours && <ToursModal onClose={() => setShowTours(false)} onProceed={(tourItem)=>{ setShowTours(false); navigate('/checkout', { state: { item: tourItem } }); }} />}

      <Confetti show={!!msg} />
    </div>
  );
}
