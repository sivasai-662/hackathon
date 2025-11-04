import React, { useMemo, useState } from 'react';
import '../components/airport.css';
import citiesData from '../data/cities.js';
import { useNavigate } from 'react-router-dom';

export default function AirportTransfer({ onCancel, onProceed }) {
  const navigate = useNavigate();
  const [from] = useState('Airport');
  const [to, setTo] = useState('');
  const hotels = useMemo(() => {
    // create a light hotel list from cities data (fallbacks if structure differs)
    const list = [];
    (citiesData || []).forEach(c => {
      if (c.hotels && Array.isArray(c.hotels)) {
        c.hotels.forEach(h => list.push({ label: (h.name || (c.city + ' Hotel')), value: h.name || c.city }));
      } else {
        list.push({ label: c.city + ' Hotels', value: c.city });
      }
    });
    // dedupe
    return list.filter((v,i,arr)=> arr.findIndex(x=>x.value===v.value)===i);
  }, []);

  const vehicleOptions = [
    { id: 'sedan', label: 'Sedan — Up to 3 passengers', price: 1200 },
    { id: 'suv', label: 'SUV — Up to 5 passengers', price: 1800 },
    { id: 'tempo', label: 'Tempo Traveller — Up to 12 passengers', price: 3000 },
    { id: 'innova', label: 'Innova — Up to 6 passengers', price: 1400 }
  ];

  const [hotel, setHotel] = useState(hotels[0]?.value || '');
  const [vehicle, setVehicle] = useState(vehicleOptions[3].id);
  const [pickup, setPickup] = useState('');
  const [drop, setDrop] = useState('');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [errors, setErrors] = useState({});

  const selectedVehicle = vehicleOptions.find(v=>v.id===vehicle) || vehicleOptions[0];
  const estPrice = selectedVehicle?.price ?? 1400;

  function validate() {
    const e = {};
    if (!to) e.to = 'Please enter destination (city/area)';
    if (!hotel) e.hotel = 'Please select a hotel';
    if (!pickup) e.pickup = 'Please choose a pickup date & time';
    if (!drop) e.drop = 'Please choose a drop date & time';
    if (pickup && drop && new Date(pickup) >= new Date(drop)) e.drop = 'Drop must be after pickup';
    if (!checkIn) e.checkIn = 'Please choose check-in date';
    if (!checkOut) e.checkOut = 'Please choose check-out date';
    if (checkIn && checkOut && new Date(checkIn) >= new Date(checkOut)) e.checkOut = 'Check-out must be after check-in';
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function handleCancel(e) {
    e && e.preventDefault();
    onCancel ? onCancel() : navigate(-1);
  }

  function handleContinue(e) {
    e && e.preventDefault();
    if (!validate()) return;
    const item = {
      type: 'airport-transfer',
      name: selectedVehicle.label + ' from ' + from + ' to ' + to,
      from,
      to,
      hotel,
      vehicle: selectedVehicle,
      pickup,
      drop,
      checkIn,
      checkOut,
      nights: checkIn && checkOut ? Math.max(0, Math.round((new Date(checkOut) - new Date(checkIn)) / (1000*60*60*24))) : 0,
      price: estPrice,
      createdAt: new Date().toISOString()
    };

    if (onProceed) return onProceed(item);
    // fallback: navigate to checkout route and pass state
    navigate('/checkout', { state: { item } });
  }

  return (
    <div className="airport-bg">
      <div className="airport-panel">
        <header className="airport-header">
          <h2>Airport Transfer</h2>
          <p className="sub">Quick, comfortable rides from airport to hotel</p>
        </header>

        <form className="airport-form" onSubmit={handleContinue}>
          <div className="row">
            <label className="field">
              <span className="label">✈️ From</span>
              <input type="text" value={from} readOnly className="input" />
            </label>

            <label className="field">
              <span className="label">📍 To</span>
              <input placeholder="City / Area" className={"input" + (errors.to ? ' error' : '')} value={to} onChange={e=>setTo(e.target.value)} />
              {errors.to && <div className="errorMsg">{errors.to}</div>}
            </label>
          </div>

          <div className="row">
            <label className="field">
              <span className="label">🏨 Hotel</span>
              <select className={"input" + (errors.hotel ? ' error' : '')} value={hotel} onChange={e=>setHotel(e.target.value)}>
                {hotels.map(h => <option key={h.value} value={h.value}>{h.label}</option>)}
              </select>
              {errors.hotel && <div className="errorMsg">{errors.hotel}</div>}
            </label>

            <label className="field">
              <span className="label">🚗 Vehicle Type</span>
              <select className="input" value={vehicle} onChange={e=>setVehicle(e.target.value)}>
                {vehicleOptions.map(v => <option key={v.id} value={v.id}>{v.label + ' — ₹' + v.price}</option>)}
              </select>
            </label>
          </div>

          <div className="row">
            <label className="field">
              <span className="label">🕒 Pickup (arrival)</span>
              <input type="datetime-local" className={"input" + (errors.pickup ? ' error' : '')} value={pickup} onChange={e=>setPickup(e.target.value)} />
              {errors.pickup && <div className="errorMsg">{errors.pickup}</div>}
            </label>

            <label className="field">
              <span className="label">🕒 Drop (departure)</span>
              <input type="datetime-local" className={"input" + (errors.drop ? ' error' : '')} value={drop} onChange={e=>setDrop(e.target.value)} />
              {errors.drop && <div className="errorMsg">{errors.drop}</div>}
            </label>
          </div>

          <div className="row">
            <label className="field">
              <span className="label">🏁 Check-in</span>
              <input type="date" className={"input" + (errors.checkIn ? ' error' : '')} value={checkIn} onChange={e=>setCheckIn(e.target.value)} />
              {errors.checkIn && <div className="errorMsg">{errors.checkIn}</div>}
            </label>

            <label className="field">
              <span className="label">🏁 Check-out</span>
              <input type="date" className={"input" + (errors.checkOut ? ' error' : '')} value={checkOut} onChange={e=>setCheckOut(e.target.value)} />
              {errors.checkOut && <div className="errorMsg">{errors.checkOut}</div>}
            </label>
          </div>

          <div style={{ display:'flex', justifyContent:'flex-end', color:'#dff6ff', fontWeight:700 }}>
            Nights: {checkIn && checkOut ? Math.max(0, Math.round((new Date(checkOut) - new Date(checkIn)) / (1000*60*60*24))) : 0}
          </div>

          <div className="airport-actions">
            <button type="button" className="btn ghost" onClick={handleCancel}>Cancel</button>
            <button type="submit" className="btn primary">Continue to Payment ₹{estPrice}</button>
          </div>
        </form>
      </div>
    </div>
  );
}
