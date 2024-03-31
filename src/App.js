import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  NavLink,
} from "react-router-dom";

const initialTickets = [];

const formStyle = {
  display: "flex",
  flexDirection: "column",
  width: "400px",
  margin: "20px auto",
  padding: "20px",
  boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
  borderRadius: "8px",
  backgroundColor: "#f9f9f9",
};

const ticketStyle = (status) => ({
  padding: "10px 20px",
  margin: "10px 0",
  boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
  borderRadius: "5px",
  backgroundColor:
    status === "new"
      ? "#f0f4f8"
      : status === "in progress"
      ? "#fffbea"
      : "#e3fcef",
  color: status === "new" ? "#034d01" : "#665c00", // Text color changes
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  width: "80%", // Increased width
  marginLeft: "auto",
  marginRight: "auto",
});

const adminPanelStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
};

const tabStyle = {
  display: "inline-block",
  padding: "10px",
  margin: "0 10px",
  textDecoration: "none",
  color: "#007bff",
  borderBottom: "2px solid transparent",
};

const activeTabStyle = {
  ...tabStyle,
  borderBottom: "2px solid #007bff",
};

const SubmitTicketForm = ({ onTicketSubmit }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onTicketSubmit({ name, email, description, status: "new", id: Date.now() });
    setName("");
    setEmail("");
    setDescription("");
  };

  return (
    <form onSubmit={handleSubmit} style={formStyle}>
      <h2>Submit a Support Ticket</h2>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        style={{ margin: "10px 0", padding: "8px" }}
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        style={{ margin: "10px 0", padding: "8px" }}
      />
      <textarea
        placeholder="Describe your issue"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
        style={{ margin: "10px 0", padding: "8px" }}
      ></textarea>
      <button
        type="submit"
        style={{
          cursor: "pointer",
          padding: "8px 16px",
          backgroundColor: "#007bff",
          color: "white",
          border: "none",
          borderRadius: "5px",
        }}
      >
        Submit
      </button>
    </form>
  );
};

const AdminPanel = ({ tickets, onUpdateStatus }) => {
  const handleRespond = () => {
    alert("Would normally respond here");
  };
  const [filter, setFilter] = useState("all");
  const filteredTickets = tickets.filter(
    (ticket) => filter === "all" || ticket.status === filter
  );

  return (
    <div style={adminPanelStyle}>
      <h2>Admin Panel</h2>
      {/* Filter Dropdown */}
      <div style={{ marginBottom: "20px" }}>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          style={{ padding: "4px" }}
        >
          <option value="all">All</option>
          <option value="new">New</option>
          <option value="in progress">In Progress</option>
          <option value="resolved">Resolved</option>
        </select>
      </div>
      {filteredTickets.map((ticket) => (
        <div key={ticket.id} style={ticketStyle(ticket.status)}>
          <h3>
            {ticket.name} - <small>{ticket.status}</small>
          </h3>
          <p>{ticket.description}</p>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            {" "}
            {/* Added flexbox styling for spacing */}
            <select
              value={ticket.status}
              onChange={(e) => onUpdateStatus(ticket.id, e.target.value)}
              style={{ padding: "4px" }}
            >
              <option value="new">New</option>
              <option value="in progress">In Progress</option>
              <option value="resolved">Resolved</option>
            </select>
            <button
              onClick={handleRespond}
              style={{
                cursor: "pointer",
                padding: "4px 8px",
                backgroundColor: "#007bff",
                color: "white",
                border: "none",
                borderRadius: "5px",
              }}
            >
              Respond
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

const App = () => {
  const [tickets, setTickets] = useState(initialTickets);

  const handleTicketSubmit = (ticket) => {
    setTickets([...tickets, ticket]);
  };

  const handleUpdateStatus = (id, newStatus) => {
    const updatedTickets = tickets.map((ticket) => {
      if (ticket.id === id) {
        return { ...ticket, status: newStatus };
      }
      return ticket;
    });
    setTickets(updatedTickets);
  };

  return (
    <Router>
      <nav style={{ marginBottom: "20px", textAlign: "center" }}>
        <NavLink
          to="/"
          style={({ isActive }) => (isActive ? activeTabStyle : tabStyle)}
        >
          Submit Ticket
        </NavLink>
        <NavLink
          to="/admin"
          style={({ isActive }) => (isActive ? activeTabStyle : tabStyle)}
        >
          Admin Panel
        </NavLink>
      </nav>
      <Routes>
        <Route
          path="/admin"
          element={
            <AdminPanel tickets={tickets} onUpdateStatus={handleUpdateStatus} />
          }
        />
        <Route
          path="/"
          element={<SubmitTicketForm onTicketSubmit={handleTicketSubmit} />}
        />
      </Routes>
    </Router>
  );
};

export default App;
