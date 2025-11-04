import { useState } from "react";
import citiesData from "../data/cities.js";

export default function TransferModal({ onClose, onProceed }) {
  const [from, setFrom] = useState("Airport");
  const [to, setTo] = useState("");
  const [hotel, setHotel] = useState("");
  const [vehicle, setVehicle] = useState("Toyota Innova Crysta");
  const [pickupDate, setPickupDate] = useState("");
  const [dropDate, setDropDate] = useState("");

  const vehicles = [
    { name: 'Toyota Innova Crysta', base: 1400 },
    { name: 'Toyota Fortuner', base: 2000 },
    { name: 'Mahindra Thar', base: 1600 },
    { name: 'Maruti Suzuki Swift Dzire', base: 800 },
    { name: 'Tempo Traveller (12 seater)', base: 3400 },
    { name: 'Mini Bus (20 seater)', base: 4200 },
    { name: 'Chevrolet Tavera', base: 1100 },
  ];

  // build hotels list from cities data (keeps in sync)
  const hotels = Array.from(new Set(citiesData.flatMap(c => c.hotels.map(h => h.name))));

  const calcPrice = (v) => {
    const veh = vehicles.find(x => x.name === v) || vehicles[0];
    return veh.base;
  };

  const proceed = () => {
    if (!to || !hotel || !pickupDate) return alert('Please fill destination, hotel and pickup date');
    const price = calcPrice(vehicle);
    const item = {
      name: `${vehicle} transfer`,
      desc: `${from} → ${to} (${hotel})`,
      vehicle,
      hotel,
      from,
      to,
      pickupDate,
      dropDate,
      price,
    };
    onProceed && onProceed(item);
  };

  return (
    <div className="modal-backdrop">
      <div className="modal small">
        <header className="modal-header">
          <h3>Airport Transfer</h3>
          <button className="close" onClick={onClose}>✕</button>
        </header>
        <div className="modal-body">
          <label>From</label>
          <input value={from} onChange={e=>setFrom(e.target.value)} />

          <label>To (City / Area)</label>
          <input value={to} onChange={e=>setTo(e.target.value)} placeholder="Hotel area or city" />

          <label>Hotel</label>
          <select value={hotel} onChange={e=>setHotel(e.target.value)}>
            <option value="">Select hotel</option>
            {hotels.map(h=> <option key={h} value={h}>{h}</option>)}
          </select>

          <label>Vehicle</label>
          <select value={vehicle} onChange={e=>setVehicle(e.target.value)}>
            {vehicles.map(v=> <option key={v.name} value={v.name}>{v.name} — ₹{v.base}</option>)}
          </select>

          <div style={{ display: 'flex', gap: 8 }}>
            <div style={{ flex: 1 }}>
              <label>Pickup (arrival) date & time</label>
              <input type="datetime-local" value={pickupDate} onChange={e=>setPickupDate(e.target.value)} />
            </div>
            <div style={{ flex: 1 }}>
              <label>Drop (departure) date & time</label>
              <input type="datetime-local" value={dropDate} onChange={e=>setDropDate(e.target.value)} />
            </div>
          </div>

          <div style={{ display:'flex', justifyContent:'flex-end', marginTop:12 }}>
            <button className="btn" onClick={onClose} style={{ marginRight: 8 }}>Cancel</button>
            <button className="btn" onClick={proceed}>Continue to payment — ₹{calcPrice(vehicle)}</button>
          </div>
        </div>
      </div>
    </div>
  );
}
