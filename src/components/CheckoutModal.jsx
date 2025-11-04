import React from 'react';

export default function CheckoutModal({ item, onClose, onConfirm }) {
  if (!item) return null;

  // if this is a homestay/hotel item we allow check-in/check-out
  const isHotel = !!item.rate || !!item.city && !!item.rate;
  const [checkIn, setCheckIn] = React.useState(item.checkIn || '');
  const [checkOut, setCheckOut] = React.useState(item.checkOut || '');

  const parseDate = (v) => v ? new Date(v) : null;
  const calcNights = () => {
    const a = parseDate(checkIn);
    const b = parseDate(checkOut);
    if (!a || !b) return 0;
    const diff = (b - a) / (1000 * 60 * 60 * 24);
    return diff > 0 ? Math.round(diff) : 0;
  };

  const nights = calcNights();
  const baseRate = item.rate || item.price || 0;
  const finalPrice = isHotel && nights > 0 ? baseRate * nights : (item.price || baseRate);
  const invalidDates = isHotel && nights <= 0;

  return (
    <div className="modal-backdrop">
      <div className="modal small">
        <header className="modal-header">
          <h3>Review & Checkout</h3>
          <button className="close" onClick={onClose}>✕</button>
        </header>
        <div className="modal-body">
          <div style={{ display: 'flex', gap: 12 }}>
            <img src={item.img || '/1.jpg'} alt={item.name || item.title || item.city} style={{ width: 110, height: 80, objectFit: 'cover', borderRadius: 8 }} />
            <div>
              <h4 style={{ margin: 0 }}>{item.name || item.title || item.city}</h4>
              <div style={{ fontSize: 13, color: '#666' }}>{item.desc || item.city || ''}</div>
            </div>
          </div>

          {isHotel && (
            <div style={{ marginTop: 12 }}>
              <label>Check-in</label>
              <input type="date" value={checkIn} onChange={(e)=>setCheckIn(e.target.value)} />
              <label>Check-out</label>
              <input type="date" value={checkOut} onChange={(e)=>setCheckOut(e.target.value)} />
              {nights > 0 && <div style={{ marginTop:8 }}><strong>Stay:</strong> {nights} {nights === 1 ? 'night' : 'nights'}</div>}
            </div>
          )}

          <div style={{ marginTop: 12 }}>
            <div><strong>Price:</strong> ₹{finalPrice}</div>
            {item.vehicle && <div><strong>Vehicle:</strong> {item.vehicle}</div>}
            {item.hotel && <div><strong>Hotel:</strong> {item.hotel}</div>}
            {item.pickupDate && <div><strong>Pickup:</strong> {item.pickupDate}</div>}
            {item.dropDate && <div><strong>Drop:</strong> {item.dropDate}</div>}
          </div>

            <div style={{ marginTop: 12 }}>
              {invalidDates && <div style={{ color: 'red', marginBottom: 8 }}>Please select valid check-in and check-out dates (check-out must be after check-in).</div>}
            </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8, marginTop: 14 }}>
            <button className="btn" onClick={onClose}>Cancel</button>
            <button className="btn" disabled={invalidDates} onClick={() => {
              const updated = { ...item };
              if (isHotel) {
                updated.checkIn = checkIn;
                updated.checkOut = checkOut;
                updated.nights = nights;
                updated.finalPrice = finalPrice;
              }
              onConfirm && onConfirm(updated);
            }}>Continue to Payment</button>
          </div>
        </div>
      </div>
    </div>
  );
}
