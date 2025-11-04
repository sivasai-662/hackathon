import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import PaymentModal from "../components/PaymentModal.jsx";
import AuthModal from "../components/AuthModal.jsx";
import { useTravel } from "../context/TravelContext";
import Confetti from "../components/Confetti.jsx";

export default function CheckoutPage() {
  const { state } = useLocation();
  const item = state?.item || null;
  const navigate = useNavigate();
  const { user, confirmBooking } = useTravel();

  const [showAuth, setShowAuth] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [message, setMessage] = useState("");

  if (!item) return (
    <div className="container">
      <h2>Checkout</h2>
      <p>No item to checkout. Please select a service or homestay first.</p>
    </div>
  );

  const price = item.finalPrice ?? item.price ?? item.rate ?? 0;

  const handleProceed = () => {
    if (!user) { setShowAuth(true); return; }
    if (price === 0) {
      const booking = confirmBooking({ item, payment: { method: 'free', summary: null } });
      setMessage(`✅ ${booking.item.name || booking.item.city} booked`);
      setTimeout(() => { navigate('/bookings'); }, 900);
      return;
    }
    setShowPayment(true);
  };

  const onPaymentSuccess = (payment) => {
    const booking = confirmBooking({ item, payment });
    setShowPayment(false);
    setMessage(`✅ ${booking.item.name || booking.item.city} booked successfully!`);
    setTimeout(() => navigate('/bookings'), 900);
  };

  return (
    <div className="container">
      <h2>Review & Checkout</h2>
      <div className="card" style={{ padding: 16 }}>
        <div style={{ display: 'flex', gap: 12 }}>
          <img src={item.img || '/1.jpg'} alt={item.name || item.city} style={{ width: 160, height: 110, objectFit: 'cover', borderRadius: 8 }} />
          <div>
            <h3 style={{ margin: 0 }}>{item.name || item.title || item.city}</h3>
            <p style={{ color: '#666' }}>{item.desc}</p>
            {item.attractions && item.attractions.length > 0 && (
              <div>
                <strong>Included:</strong>
                <ul>
                  {item.attractions.map((a,i)=> <li key={i}>{a.name} {a.price ? `— ₹${a.price}` : '(Free)'}</li>)}
                </ul>
              </div>
            )}
            {item.nights !== undefined && <div><strong>Stay:</strong> {item.nights} {item.nights === 1 ? 'night' : 'nights'}</div>}
            <div style={{ marginTop: 8, fontWeight: 700 }}>Total: ₹{price}</div>
          </div>
        </div>

        <div style={{ marginTop: 14, display:'flex', justifyContent:'flex-end', gap:8 }}>
          <button className="btn" onClick={() => navigate(-1)}>Back</button>
          <button className="btn" onClick={handleProceed}>{price === 0 ? 'Confirm booking' : `Proceed to payment — ₹${price}`}</button>
        </div>
      </div>

      {showAuth && <AuthModal onClose={() => setShowAuth(false)} />}
      {showPayment && <PaymentModal item={item} onClose={() => setShowPayment(false)} onSuccess={onPaymentSuccess} />}

      {message && (
        <div style={{ marginTop: 12 }}>
          <div className="success-box">
            <div className="checkmark">✓</div>
            <div>{message}</div>
          </div>
        </div>
      )}

      <Confetti show={!!message} />
    </div>
  );
}
