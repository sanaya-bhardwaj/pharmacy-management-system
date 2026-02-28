import { useState } from "react";
import Dashboard from "./Dashboard";
import Inventory from "./Inventory";
import Sales from "./Sales";
import Purchases from "./Purchases";

function App() {
  const [page, setPage] = useState("dashboard");

  return (
    <div style={outerWrapper}>
      <div style={containerStyle}>
        
        {/* TOP NAVIGATION TABS */}
        <div style={tabContainer}>
          <button
            style={page === "dashboard" ? activeTab : tabStyle}
            onClick={() => setPage("dashboard")}
          >
            Dashboard
          </button>

          <button
            style={page === "inventory" ? activeTab : tabStyle}
            onClick={() => setPage("inventory")}
          >
            Inventory
          </button>

          <button
            style={page === "sales" ? activeTab : tabStyle}
            onClick={() => setPage("sales")}
          >
            Sales
          </button>

          <button
            style={page === "purchases" ? activeTab : tabStyle}
            onClick={() => setPage("purchases")}
          >
            Purchases
          </button>
        </div>

        {/* PAGE CONTENT */}
        {page === "dashboard" && <Dashboard setPage={setPage} />}
        {page === "inventory" && <Inventory setPage={setPage} />}
        {page === "sales" && <Sales setPage={setPage} />}
        {page === "purchases" && <Purchases setPage={setPage} />}
      </div>
    </div>
  );
}

const outerWrapper = {
  backgroundColor: "#f1f5f9",
  minHeight: "100vh",
  padding: "40px",
  display: "flex",
  justifyContent: "center"
};

const containerStyle = {
  backgroundColor: "white",
  width: "1100px",
  borderRadius: "20px",
  boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
  padding: "30px"
};

const tabContainer = {
  display: "flex",
  gap: "20px",
  marginBottom: "30px",
  borderBottom: "1px solid #e2e8f0",
  paddingBottom: "10px"
};

const tabStyle = {
  background: "none",
  border: "none",
  cursor: "pointer",
  fontSize: "16px",
  padding: "5px 0",
  color: "#475569"
};

const activeTab = {
  ...tabStyle,
  color: "#2563eb",
  borderBottom: "3px solid #2563eb",
  fontWeight: "bold"
};

export default App;