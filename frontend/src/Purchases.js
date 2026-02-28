import React, { useEffect, useState } from "react";
import axios from "axios";

function Purchases({ setPage }) {
  const [medicines, setMedicines] = useState([]);
  const [purchases, setPurchases] = useState([]);
  const [medicineId, setMedicineId] = useState("");
  const [quantity, setQuantity] = useState("");
  const [supplier, setSupplier] = useState("");
  const [cost, setCost] = useState("");

  const API = process.env.REACT_APP_API_URL;

  useEffect(() => {
    fetchMedicines();
    fetchPurchases();
  }, []);

  const fetchMedicines = async () => {
    const res = await axios.get(`${API}/medicines`);
    setMedicines(res.data);
  };

  const fetchPurchases = async () => {
    const res = await axios.get(`${API}/purchases`);
    setPurchases(res.data);
  };

  const handlePurchase = async () => {
    if (!medicineId || !quantity || !supplier || !cost) {
      alert("Please fill all fields");
      return;
    }

    await axios.post(`${API}/purchases`, {
      medicine_id: parseInt(medicineId),
      quantity: parseInt(quantity),
      supplier: supplier,
      cost: parseFloat(cost),
    });

    setMedicineId("");
    setQuantity("");
    setSupplier("");
    setCost("");

    fetchPurchases();
    fetchMedicines();
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Purchases</h2>

      {/* Purchase Form */}
      <div style={{ marginBottom: "20px" }}>
        <select
          value={medicineId}
          onChange={(e) => setMedicineId(e.target.value)}
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
          style={{ marginLeft: "10px" }}
        />

        <input
          type="text"
          placeholder="Supplier"
          value={supplier}
          onChange={(e) => setSupplier(e.target.value)}
          style={{ marginLeft: "10px" }}
        />

        <input
          type="number"
          placeholder="Cost"
          value={cost}
          onChange={(e) => setCost(e.target.value)}
          style={{ marginLeft: "10px" }}
        />

        <button
          onClick={handlePurchase}
          style={{ marginLeft: "10px" }}
        >
          Add Purchase
        </button>
      </div>

      {/* Purchase Table */}
      <table width="100%" cellPadding="10">
        <thead style={{ background: "#f5f5f5" }}>
          <tr>
            <th align="left">Supplier</th>
            <th align="left">Medicine</th>
            <th align="left">Quantity</th>
            <th align="left">Cost</th>
            <th align="left">Date</th>
          </tr>
        </thead>
        <tbody>
          {purchases.map((p) => (
            <tr key={p.id} style={{ borderBottom: "1px solid #eee" }}>
              <td>{p.supplier}</td>
              <td>{p.medicine_name}</td>
              <td>{p.quantity}</td>
              <td>₹{p.cost}</td>
              <td>{p.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Purchases;