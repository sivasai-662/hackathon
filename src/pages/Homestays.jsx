import { useTravel } from "../context/TravelContext";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthModal from "../components/AuthModal.jsx";
import Confetti from "../components/Confetti.jsx";
import citiesData from "../data/cities.js";

export default function Homestays() {
  const { confirmBooking, user } = useTravel();
  const [expanded, setExpanded] = useState(null);
  const [showAuth, setShowAuth] = useState(false);
  const [success, setSuccess] = useState(null);
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const navigate = useNavigate();

  const cities = citiesData;

  const handleView = (city) => {
    setExpanded(expanded === city ? null : city);
  };

  const handleBookClick = (hotel, city) => {
    if (!checkIn || !checkOut) {
      return alert('Please choose check-in and check-out dates before booking');
    }
    const nights = Math.max(0, Math.round((new Date(checkOut) - new Date(checkIn)) / (1000*60*60*24)));
    const totalPrice = (hotel.rate || hotel.price || 0) * nights;
    const item = { ...hotel, city, img: hotel.img, checkIn, checkOut, nights, finalPrice: totalPrice };
    if (!user) {
      setShowAuth(true);
      return;
    }
    // navigate to full-screen checkout page
    navigate('/checkout', { state: { item } });
  };

  const onPaymentSuccess = (payment) => {
    const booking = confirmBooking({ item: paymentItem, payment });
    setShowPayment(false);
    setPaymentItem(null);
    setSuccess(booking);
    setTimeout(() => setSuccess(null), 3000);
  };

  return (
    <div className="container">
      <div style={{ display:'flex', gap:12, justifyContent:'center', marginBottom:16, alignItems:'center' }}>
        <label style={{ display:'flex', flexDirection:'column', alignItems:'flex-start' }}>
          <div style={{ fontWeight:700, color:'#024' }}>Check-in</div>
          <input type="date" value={checkIn} onChange={e=>setCheckIn(e.target.value)} style={{ padding:8, borderRadius:6, border:'1px solid #ddd' }} />
        </label>
        <label style={{ display:'flex', flexDirection:'column', alignItems:'flex-start' }}>
          <div style={{ fontWeight:700, color:'#024' }}>Check-out</div>
          <input type="date" value={checkOut} onChange={e=>setCheckOut(e.target.value)} style={{ padding:8, borderRadius:6, border:'1px solid #ddd' }} />
        </label>
        <div style={{ display:'flex', alignItems:'center', paddingLeft:8, color:'#0077b6', fontWeight:700 }}>
          Nights: {checkIn && checkOut ? Math.max(0, Math.round((new Date(checkOut) - new Date(checkIn)) / (1000*60*60*24))) : 0}
        </div>
      </div>
      <h2>🏡 Homestays & Hotels</h2>

      {success && (
        <div className="success-box">
          <div className="checkmark">✓</div>
          <div>
            <strong>Booking confirmed</strong>
            <div>{success.item.name || success.item.city} — ₹{success.item.rate || success.item.price}</div>
          </div>
        </div>
      )}

      <div className="grid">
        {cities.map((c) => (
          <div key={c.city} className="card">
            <img src={c.hotels[0].img} alt={c.city} />
            <div className="card-content">
              <h3>{c.city}</h3>
              <p>{c.desc}</p>
              <button className="btn" onClick={() => handleView(c.city)}>{expanded === c.city ? 'Hide Hotels' : 'View Hotels'}</button>

              {expanded === c.city && (
                <div style={{ marginTop: 12 }}>
                  {c.hotels.map((h, i) => (
                    <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'center', marginTop: 12 }}>
                      <img src={h.img} alt={h.name} style={{ width: 90, height: 60, objectFit: 'cover', borderRadius: 6 }} />
                      <div style={{ flex: 1 }}>
                        <strong>{h.name}</strong>
                        <div style={{ fontSize: 13, color: '#666' }}>{h.rating} ★ — ₹{h.rate}/night</div>
                      </div>
                      <div>
                        <button className="btn" onClick={() => handleBookClick(h, c.city)}>Book</button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

            </div>
          </div>
        ))}
      </div>

      {showAuth && <AuthModal onClose={() => setShowAuth(false)} />}

      <Confetti show={!!success} />
    </div>
  );
}
