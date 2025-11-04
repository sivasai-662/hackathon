export default function BookingDetailsModal({ booking, onClose }) {
  if (!booking) return null;
  const item = booking.item ? booking.item : booking;
  const payment = booking.payment || null;

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <header className="modal-header">
          <h3>Booking details</h3>
          <button className="close" onClick={onClose}>✕</button>
        </header>
        <div className="modal-body">
          <div style={{ display: 'flex', gap: 12 }}>
            <img src={item.img || '/1.jpg'} alt={item.name || item.city} style={{ width: 120, height: 80, objectFit: 'cover', borderRadius: 8 }} />
            <div>
              <h4 style={{ margin: 0 }}>{item.name || item.title || item.city}</h4>
              <div style={{ fontSize: 13, color: '#666' }}>{item.desc || ''}</div>
            </div>
          </div>

          <div style={{ marginTop: 12 }}>
            {item.hotel && <div><strong>Hotel:</strong> {item.hotel}</div>}
            {item.vehicle && <div><strong>Vehicle:</strong> {item.vehicle}</div>}
            {item.pickupDate && <div><strong>Pickup:</strong> {item.pickupDate}</div>}
            {item.dropDate && <div><strong>Drop:</strong> {item.dropDate}</div>}
            {item.checkIn && <div><strong>Check-in:</strong> {item.checkIn}</div>}
            {item.checkOut && <div><strong>Check-out:</strong> {item.checkOut}</div>}
            {item.nights !== undefined && <div><strong>Nights:</strong> {item.nights}</div>}
            <div style={{ marginTop: 8 }}><strong>Price:</strong> ₹{item.finalPrice || item.price || item.rate || 0}</div>
          </div>

          {payment && (
            <div style={{ marginTop: 12 }}>
              <h4>Payment</h4>
              <div>Method: {payment.method}</div>
              {payment.summary && payment.summary.last4 && <div>Card •••• {payment.summary.last4}</div>}
              {payment.summary && payment.summary.upi && <div>UPI: {payment.summary.upi}</div>}
            </div>
          )}

          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 14 }}>
            <button className="btn" onClick={onClose}>Close</button>
          </div>
        </div>
      </div>
    </div>
  );
}
