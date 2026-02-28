import React, { useEffect, useState } from "react";
import axios from "axios";

function Dashboard() {
  const [medicines, setMedicines] = useState([]);
  const [sales, setSales] = useState([]);
  const [medicineId, setMedicineId] = useState("");
  const [quantity, setQuantity] = useState("");

  const API = "http://127.0.0.1:8000";

  useEffect(() => {
    fetchMedicines();
    fetchSales();
  }, []);

  const fetchMedicines = async () => {
    const res = await axios.get(`${API}/medicines`);
    setMedicines(res.data);
  };

  const fetchSales = async () => {
    const res = await axios.get(`${API}/sales`);
    setSales(res.data);
  };

  const handleSale = async (e) => {
    e.preventDefault();
    if (!medicineId || !quantity) return;

    await axios.post(`${API}/sales`, {
      medicine_id: parseInt(medicineId),
      quantity: parseInt(quantity),
    });

    setMedicineId("");
    setQuantity("");
    fetchMedicines();
    fetchSales();
  };

  const totalMedicines = medicines.length;
const totalSales = sales.reduce((sum, sale) => {
  const amount = Number(sale.amount) || 0;
  return sum + amount;
}, 0);

  const lowStockItems = medicines.filter((m) => m.stock < 5);

  return (
    <div style={{ padding: "30px", backgroundColor: "#f5f7fa", minHeight: "100vh" }}>
      <h2>Dashboard</h2>

      {/* Stats Cards */}
      <div style={{ display: "flex", gap: "20px", marginTop: "20px" }}>
        <div style={cardStyle}>
          <h4>Total Medicines</h4>
          <h2>{totalMedicines}</h2>
        </div>

        <div style={cardStyle}>
          <h4>Total Sales</h4>
          <h2>
  ₹{isNaN(totalSales) ? "0.00" : totalSales.toFixed(2)}
</h2>
        </div>
      </div>

      {/* Low Stock Section */}
      {lowStockItems.length > 0 && (
        <div style={{ ...cardStyle, marginTop: "30px", backgroundColor: "#fff3f3", borderLeft: "5px solid red" }}>
          <h4 style={{ color: "red" }}>⚠ Low Stock Alert</h4>
          <ul>
            {lowStockItems.map((item) => (
              <li key={item.id}>
                {item.name} — Stock: {item.stock}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Make Sale Form */}
      <div style={{ ...cardStyle, marginTop: "30px" }}>
        <h4>Make a Sale</h4>
        <form onSubmit={handleSale} style={{ display: "flex", gap: "15px", marginTop: "10px" }}>
          <select
            value={medicineId}
            onChange={(e) => setMedicineId(e.target.value)}
            style={inputStyle}
          >
            <option value="">Select Medicine</option>
            {medicines.map((med) => (
              <option key={med.id} value={med.id}>
                {med.name}
              </option>
            ))}
          </select>

          <input
            type="number"
            placeholder="Quantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            style={inputStyle}
          />

          <button type="submit" style={buttonStyle}>
            Create Sale
          </button>
        </form>
      </div>

      {/* Recent Sales */}
      <div style={{ ...cardStyle, marginTop: "30px" }}>
        <h4>Recent Sales</h4>

        {sales.length === 0 ? (
          <p>No sales yet.</p>
        ) : (
          <table width="100%" style={{ marginTop: "15px", borderCollapse: "collapse" }}>
            <thead>
  <tr style={{ textAlign: "left", borderBottom: "1px solid #ddd" }}>
    <th>Invoice</th>
    <th>Medicine</th>
    <th>Amount</th>
    <th>Date</th>
  </tr>
</thead>
<tbody>
  {sales.map((sale) => (
    <tr key={sale.id} style={{ borderBottom: "1px solid #eee" }}>
      <td>{sale.invoice}</td>
      <td>{sale.medicine_name}</td>
      <td>₹{sale.amount}</td>
      <td>{sale.date}</td>
    </tr>
  ))}
</tbody>
          </table>
        )}
      </div>
    </div>
  );
}

const cardStyle = {
  backgroundColor: "white",
  padding: "20px",
  borderRadius: "8px",
  boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
  flex: 1,
};

const inputStyle = {
  padding: "8px",
  borderRadius: "5px",
  border: "1px solid #ccc",
};

const buttonStyle = {
  padding: "8px 15px",
  borderRadius: "5px",
  border: "none",
  backgroundColor: "#007bff",
  color: "white",
  cursor: "pointer",
};

export default Dashboard;