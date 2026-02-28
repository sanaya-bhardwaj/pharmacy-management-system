function Sidebar({ setPage }) {
  return (
    <div style={sidebarStyle}>
      <h2 style={{ color: "white" }}>Pharmacy</h2>
      <button onClick={() => setPage("dashboard")} style={buttonStyle}>
        Dashboard
      </button>
      <button onClick={() => setPage("inventory")} style={buttonStyle}>
        Inventory
      </button>
    </div>
  );
}

const sidebarStyle = {
  width: "200px",
  height: "100vh",
  backgroundColor: "#1e293b",
  padding: "20px",
  display: "flex",
  flexDirection: "column",
  gap: "15px"
};

const buttonStyle = {
  padding: "10px",
  border: "none",
  backgroundColor: "#334155",
  color: "white",
  cursor: "pointer",
  borderRadius: "5px"
};

export default Sidebar;