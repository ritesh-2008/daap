import { useState } from "react";
import { purchaseTicket, buyVipSeat } from "../interface/web3";

export default function Buyticket() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const validateInputs = () => {
    if (!name.trim()) {
      setErrorMessage("Please enter your name");
      return false;
    }
    if (!email.trim() || !email.includes("@")) {
      setErrorMessage("Please enter a valid email");
      return false;
    }
    if (!phone.trim()) {
      setErrorMessage("Please enter your phone number");
      return false;
    }
    return true;
  };

  const Buyticket = async (vip = false) => {
    setSuccess("");
    setErrorMessage("");

    // Validate inputs before proceeding
    if (!validateInputs()) {
      return;
    }

    setLoading(true);
    try {
      if (vip) {
        await buyVipSeat(name, email, phone);
      } else {
        await purchaseTicket(name, email, phone);
      }
      
      setSuccess(
        vip
          ? "VIP Ticket purchased successfully!"
          : "Normal Ticket purchased successfully!"
      );
      
      // Clear form after successful purchase
      setName("");
      setEmail("");
      setPhone("");
      
    } catch (err) {
      console.error("Purchase error:", err);
      setErrorMessage(err.message || "An error occurred during the purchase.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "400px", margin: "0 auto" }}>
      <h3>BUY TICKET</h3>
      
      <div style={{ marginBottom: "15px" }}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          disabled={loading}
          style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
        />
        
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={loading}
          style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
        />
        
        <input
          type="tel"
          placeholder="Phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          disabled={loading}
          style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
        />
      </div>

      <div style={{ display: "flex", gap: "10px", marginBottom: "15px" }}>
        <button
          onClick={() => Buyticket(false)}
          disabled={loading}
          style={{
            flex: 1,
            padding: "10px",
            cursor: loading ? "not-allowed" : "pointer",
            opacity: loading ? 0.6 : 1
          }}
        >
          {loading ? "Processing..." : "Buy Normal Ticket"}
        </button>
        
        <button
          onClick={() => Buyticket(true)}
          disabled={loading}
          style={{
            flex: 1,
            padding: "10px",
            cursor: loading ? "not-allowed" : "pointer",
            opacity: loading ? 0.6 : 1,
            background: "#gold"
          }}
        >
          {loading ? "Processing..." : "Buy VIP Ticket"}
        </button>
      </div>

      {loading && (
        <p style={{ color: "blue", textAlign: "center" }}>
          Processing your purchase...
        </p>
      )}
      
      {success && (
        <p style={{ color: "green", textAlign: "center" }}>
          ✅ {success}
        </p>
      )}
      
      {errorMessage && (
        <p style={{ color: "red", textAlign: "center" }}>
          ❌ {errorMessage}
        </p>
      )}
    </div>
  );
}