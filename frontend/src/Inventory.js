import React, { useEffect, useState } from "react";
import axios from "axios";

function Inventory({ setActiveTab }) {
  const [medicines, setMedicines] = useState([]);

  useEffect(() => {
    fetchMedicines();
  }, []);

  const fetchMedicines = async () => {
    const res = await axios.get("http://127.0.0.1:8000/medicines");
    setMedicines(res.data);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Inventory</h2>

      <button
        onClick={() => setActiveTab("dashboard")}
        style={{ marginBottom: "20px" }}
      >
        Back to Dashboard
      </button>

      <table width="100%" border="0" cellPadding="10">
        <thead style={{ background: "#f5f5f5" }}>
          <tr>
            <th align="left">ID</th>
            <th align="left">Name</th>
            <th align="left">Stock</th>
            <th align="left">Price</th>
          </tr>
        </thead>
        <tbody>
          {medicines.map((med) => (
            <tr key={med.id} style={{ borderBottom: "1px solid #eee" }}>
              <td>{med.id}</td>
              <td>{med.name}</td>
              <td style={{ color: med.stock <= 5 ? "red" : "black" }}>
                {med.stock}
              </td>
              <td>₹{med.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Inventory;