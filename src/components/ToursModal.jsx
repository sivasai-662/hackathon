import { useState } from "react";
import citiesData from "../data/cities.js";

export default function ToursModal({ onClose, onProceed }) {
  const [step, setStep] = useState(1);
  const [city, setCity] = useState("");
  const [selected, setSelected] = useState([]); // multi-select attractions

  const cities = citiesData.map(c => c.city);

  const chooseCity = (c) => { setCity(c); setStep(2); setSelected([]); };

  const toggleAttraction = (a) => {
    const exists = selected.find(x=>x.name === a.name);
    if (exists) {
      setSelected(selected.filter(x=>x.name !== a.name));
    } else {
      if (selected.length >= 6) return alert('You can select up to 6 places');
      setSelected([...selected, a]);
    }
  };

  const proceed = () => {
    if (selected.length === 0) return alert('Select one or more attractions');
    const total = selected.reduce((s,a)=> s + (a.price||0),0);
    const item = {
      name: 'Sightseeing (' + selected.length + ' places) in ' + city,
      city,
      desc: selected.map(s => s.name).join(', '),
      price: total,
      attractions: selected,
    };
    onProceed && onProceed(item);
  };

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <header className="modal-header">
          <h3>Tours & Activities</h3>
          <button className="close" onClick={onClose}>✕</button>
        </header>
        <div className="modal-body">
          {step === 1 && (
            <div>
              <p>Select a city:</p>
              <div style={{ display:'flex', gap:8, flexWrap:'wrap' }}>
                {cities.map(c=> <button key={c} className="btn" onClick={()=>chooseCity(c)}>{c}</button>)}
              </div>
            </div>
          )}

          {step === 2 && (
            <div>
              <p>Attractions in <strong>{city}</strong>:</p>
              <div style={{ display:'grid', gap:10 }}>
                {(citiesData.find(x=>x.city === city)?.sightseeing || []).length === 0 ? (
                  <div style={{ padding: 8, color: '#666' }}>No activities listed for this city yet.</div>
                ) : (
                  (citiesData.find(x=>x.city === city).sightseeing || []).map((a,i)=> {
                    const isSelected = !!selected.find(s=>s.name===a.name);
                    return (
                      <div key={i} style={{ display:'flex', justifyContent:'space-between', alignItems:'center', padding:8, border:'1px solid #eee', borderRadius:6, gap:12 }}>
                        <div style={{ display:'flex', gap:10, alignItems:'center' }}>
                          {a.img && <img src={a.img} alt={a.name} style={{ width:84, height:64, objectFit:'cover', borderRadius:6 }} />}
                          <div>
                            <strong>{a.name}</strong>
                            <div style={{ fontSize:13, color:'#666' }}>{a.desc}</div>
                          </div>
                        </div>
                        <div style={{ textAlign:'right' }}>
                          <div style={{ fontSize:13, color:'#666', marginBottom:8 }}>{a.price ? '₹' + a.price : 'Free'}</div>
                          <div>
                            <button className="btn" onClick={()=>toggleAttraction(a)} style={{ marginRight:8 }}>{isSelected ? 'Remove' : 'Add'}</button>
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>

              <div style={{ marginTop: 12 }}>
                <strong>Selected ({selected.length})</strong>
                <div className="selected-list">
                  {selected.map((s,i)=> (
                    <div className="selected-pill" key={i}>
                      <div style={{ display:'flex', gap:8, alignItems:'center' }}>
                        {s.img && <img src={s.img} alt={s.name} style={{ width:48, height:36, objectFit:'cover', borderRadius:4 }} />}
                        <div style={{ fontSize:14 }}>{s.name}</div>
                      </div>
                      <div style={{ color:'#666' }}>{s.price ? `₹${s.price}` : 'Free'}</div>
                    </div>
                  ))}
                </div>
                <div style={{ marginTop:10, textAlign:'right', fontWeight:700 }}>
                  Total: ₹{selected.reduce((s,a)=> s + (a.price||0),0)}
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="modal-footer">
          <div style={{ marginRight: 'auto', alignSelf: 'center', paddingLeft: 8 }}>
            <strong>Selected:</strong> {selected.length}
          </div>
          <button className="btn" onClick={()=>setStep(1)} style={{ marginRight:8 }}>Back</button>
          <button className="btn" onClick={proceed}>Continue to payment</button>
        </div>
      </div>
    </div>
  );
}
