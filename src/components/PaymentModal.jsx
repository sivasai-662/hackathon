import { useState } from "react";

export default function PaymentModal({ item, onClose, onSuccess }) {
  const [method, setMethod] = useState("card");
  const [processing, setProcessing] = useState(false);
  const [card, setCard] = useState({ number: "", name: "", exp: "", cvv: "" });
  const [upi, setUpi] = useState("");
  const [error, setError] = useState("");

  const price = item.finalPrice || item.price || item.rate || 0;

  const validateCard = () => {
    const digits = (card.number || "").replace(/\s+/g, "");
    if (!/^\d{12}$/.test(digits)) return "Card number must be 12 digits";
    if (!card.name || card.name.length < 3) return "Enter name on card";
    if (!/^((0[1-9])|(1[0-2]))\/\d{2}$/.test(card.exp)) return "Expiry must be in MM/YY";
    if (!/^\d{3}$/.test(card.cvv)) return "CVV must be 3 digits";
    return null;
  };

  const validateUpi = () => {
    // simple UPI pattern: local@bank where bank is 2-4 letters to mimic axl/ybl etc
    if (!/@/.test(upi)) return "UPI must contain '@' (e.g. you@bank)";
    if (!/^[\w.\-]{2,}@[a-z]{2,4}$/i.test(upi)) return "Enter a valid-looking UPI ID (e.g. you@axl)";
    return null;
  };

  const submit = (e) => {
    e.preventDefault();
    setError("");
    if (method === 'card') {
      const v = validateCard();
      if (v) return setError(v);
    } else {
      const v = validateUpi();
      if (v) return setError(v);
    }

    setProcessing(true);
    // Simulate network/payment processing
    setTimeout(() => {
      const payment = {
        method,
        summary: method === "card" ? { last4: (card.number || "").replace(/\s+/g, "").slice(-4), name: card.name } : { upi: upi }
      };
      setProcessing(false);
      onSuccess && onSuccess(payment);
    }, 1300);
  };

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <header className="modal-header">
          <h3>Complete Payment</h3>
          <button className="close" onClick={onClose}>✕</button>
        </header>

        <div className="modal-body">
          <p><strong>{item.city || item.title || item.name}</strong> — ₹{price}</p>

          <div className="pay-methods">
            <label style={{ marginRight: 12 }}>
              <input type="radio" name="method" checked={method === 'card'} onChange={() => setMethod('card')} /> Card
            </label>
            <label>
              <input type="radio" name="method" checked={method === 'upi'} onChange={() => setMethod('upi')} /> UPI
            </label>
          </div>

          <form onSubmit={submit}>
            {method === 'card' ? (
              <div className="card-form">
                <label>Card number</label>
                <input required value={card.number} onChange={e => setCard({ ...card, number: e.target.value })} placeholder="1234 5678 9012" />
                <label>Name on card</label>
                <input required value={card.name} onChange={e => setCard({ ...card, name: e.target.value })} placeholder="Full name" />
                <div style={{ display: 'flex', gap: '8px' }}>
                  <div style={{ flex: 1 }}>
                    <label>Expiry (MM/YY)</label>
                    <input required value={card.exp} onChange={e => setCard({ ...card, exp: e.target.value })} placeholder="MM/YY" />
                  </div>
                  <div style={{ width: 120 }}>
                    <label>CVV</label>
                    <input required value={card.cvv} onChange={e => setCard({ ...card, cvv: e.target.value })} placeholder="123" />
                  </div>
                </div>
              </div>
            ) : (
              <div className="upi-form">
                <label>UPI ID</label>
                <input required value={upi} onChange={e => setUpi(e.target.value)} placeholder="you@bank (e.g. you@axl)" />
              </div>
            )}

            {error && <p style={{ color: 'red', marginTop: 8 }}>{error}</p>}

            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 12 }}>
              <button type="button" className="btn" onClick={onClose}>Cancel</button>
              <button className="btn" disabled={processing} type="submit">{processing ? 'Processing...' : `Pay ₹${price}`}</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
