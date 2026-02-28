import React, { useEffect, useState } from "react";
import axios from "axios";

function Sales({ setActiveTab }) {
  const [sales, setSales] = useState([]);

  useEffect(() => {
    fetchSales();
  }, []);

  const fetchSales = async () => {
    const res = await axios.get("http://127.0.0.1:8000/sales");
    setSales(res.data);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Sales</h2>

      <button
        onClick={() => setActiveTab("dashboard")}
        style={{ marginBottom: "20px" }}
      >
        Back to Dashboard
      </button>

      <table width="100%" cellPadding="10">
        <thead style={{ background: "#f5f5f5" }}>
          <tr>
            <th align="left">Invoice</th>
            <th align="left">Medicine</th>
            <th align="left">Amount</th>
            <th align="left">Date</th>
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
    </div>
  );
}

export default Sales;