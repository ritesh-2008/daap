import { useState } from "react";
import { purchaseTicket, buyVipSeat } from "../interface/web3";
import { Box, Button, Heading, Text } from "@chakra-ui/react";
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
    <Box p={6} bg="gray.900" color="white" borderRadius="xl" boxShadow="lg" maxW="400px" mx="auto">
      <Heading as="h3" size="lg" mb={4}>BUY TICKET</Heading>
      
      <Box marginBottom="15px">
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
      </Box>

      <Box display="flex" gap="10px" marginBottom="15px">
        <Button
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
        </Button>
        
        <Button
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
        </Button>
      </Box>

      {loading && (
        <Text color="blue" textAlign="center">
          Processing your purchase...
        </Text>
      )}
      
      {success && (
        <Text color="green" textAlign="center">
          ✅ {success}
        </Text>
      )}
      
      {errorMessage && (
        <Text color="red" textAlign="center"  >
          ❌ {errorMessage}
        </Text>
      )}
    </Box>
  );
}