import { useTravel } from "../context/TravelContext";
import { useState } from "react";
import BookingDetailsModal from "../components/BookingDetailsModal.jsx";

export default function MyBookings() {
  const { bookings, clearBookings } = useTravel();
  const [confirmClear, setConfirmClear] = useState(false);
  const [viewBooking, setViewBooking] = useState(null);

  const renderBooking = (b, i) => {
    // support two shapes: legacy (plain hotel/service) or new ({item,payment,...})
    const item = b.item ? b.item : b;
    const img = item.img || item.image || "/1.jpg";
    const title = item.name || item.city || item.title || "Booking";
    const desc = item.desc || item.city || "";
  const price = item.finalPrice || item.price || item.rate || b.price || null;
    const payment = b.payment || null;

    return (
      <div key={i} className="card">
        <img src={img} alt={title} />
        <div className="card-content">
          <h3>{title}</h3>
          {desc && <p style={{ color: '#666' }}>{desc}</p>}
          {price && <p><b>₹{price}</b></p>}
          {payment && (
            <div style={{ marginTop: 8, fontSize: 13 }}>
              <div>Payment: {payment.method.toUpperCase()}</div>
              <div style={{ color: '#666' }}>{payment.summary ? (payment.summary.last4 ? `Card •••• ${payment.summary.last4}` : `UPI ${payment.summary.upi}`) : ''}</div>
            </div>
          )}
          <div style={{ marginTop: 10 }}>
            <button className="btn" onClick={() => setViewBooking(b)}>View</button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="container">
      <h2>🧾 My Bookings</h2>
      {bookings.length === 0 ? (
        <p>No bookings yet.</p>
      ) : (
        <>
          <div className="grid">
            {bookings.map((b, i) => renderBooking(b, i))}
          </div>

          {viewBooking && <BookingDetailsModal booking={viewBooking} onClose={()=>setViewBooking(null)} />}

          {!confirmClear ? (
            <button className="btn" onClick={() => setConfirmClear(true)} style={{ marginTop: 20 }}>
              Clear All Bookings
            </button>
          ) : (
            <div style={{ marginTop: 12 }}>
              <span>Are you sure?</span>
              <div style={{ marginTop: 8 }}>
                <button className="btn" onClick={() => { clearBookings(); setConfirmClear(false); }} style={{ marginRight: 8 }}>Yes, clear</button>
                <button className="btn" onClick={() => setConfirmClear(false)}>Cancel</button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
