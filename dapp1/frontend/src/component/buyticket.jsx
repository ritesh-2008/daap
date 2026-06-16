import { useState } from "react";
import { purchaseTicket, buyVipSeat } from "../interface/web3";
import { Box, Button, Heading, Text, useToast, VStack, HStack, Badge } from "@chakra-ui/react";

export default function Buyticket() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [focusedField, setFocusedField] = useState("");
  const toast = useToast();

  const inputStyle = (field) => ({
    width: "100%",
    padding: "14px 16px",
    background: "rgba(255,255,255,0.04)",
    border: focusedField === field
      ? "1px solid rgba(168,85,247,0.8)"
      : "1px solid rgba(255,255,255,0.1)",
    borderRadius: "12px",
    color: "white",
    fontSize: "15px",
    outline: "none",
    transition: "all 0.2s",
    boxShadow: focusedField === field
      ? "0 0 20px rgba(168,85,247,0.2), inset 0 0 10px rgba(168,85,247,0.05)"
      : "none",
    fontFamily: "inherit",
  });

  const labelStyle = {
    display: "block",
    fontSize: "11px",
    fontWeight: "600",
    letterSpacing: "1.5px",
    color: "rgba(168,85,247,0.8)",
    textTransform: "uppercase",
    marginBottom: "6px",
  };

  const validateInputs = () => {
    if (!name.trim()) {
      const msg = "Please enter your name";
      setErrorMessage(msg);
      toast({ title: "Validation error", description: msg, status: "warning", duration: 3000, isClosable: true, position: "top-right" });
      return false;
    }
    if (!email.trim() || !email.includes("@")) {
      const msg = "Please enter a valid email";
      setErrorMessage(msg);
      toast({ title: "Validation error", description: msg, status: "warning", duration: 3000, isClosable: true, position: "top-right" });
      return false;
    }
    if (!phone.trim()) {
      const msg = "Please enter your phone number";
      setErrorMessage(msg);
      toast({ title: "Validation error", description: msg, status: "warning", duration: 3000, isClosable: true, position: "top-right" });
      return false;
    }
    return true;
  };

  const handleBuy = async (vip = false) => {
    setSuccess("");
    setErrorMessage("");
    if (!validateInputs()) return;
    setLoading(true);
    try {
      if (vip) {
        await buyVipSeat(name, email, phone);
      } else {
        await purchaseTicket(name, email, phone);
      }
      const successMsg = vip ? "VIP Ticket purchased successfully!" : "Normal Ticket purchased successfully!";
      setSuccess(successMsg);
      toast({ title: "Purchase successful 🎉", description: successMsg, status: "success", duration: 4000, isClosable: true, position: "top-right" });
      setName(""); setEmail(""); setPhone("");
    } catch (err) {
      console.error("Purchase error:", err);
      const msg = err?.message || "An error occurred during the purchase.";
      setErrorMessage(msg);
      toast({ title: "Purchase failed", description: msg, status: "error", duration: 5000, isClosable: true, position: "top-right" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box maxW="480px" mx="auto" position="relative">

      <style>{`
        @keyframes ticket-glow {
          0%, 100% { box-shadow: 0 0 30px rgba(168,85,247,0.15); }
          50% { box-shadow: 0 0 60px rgba(168,85,247,0.3); }
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        input::placeholder { color: rgba(255,255,255,0.2); }
        input:-webkit-autofill {
          -webkit-box-shadow: 0 0 0px 1000px rgba(15,10,30,1) inset !important;
          -webkit-text-fill-color: white !important;
        }
      `}</style>

      {/* Header */}
      <VStack spacing={1} mb={8} align="center">
        <HStack spacing={2} mb={2}>
          <Box w="40px" h="1px" bg="linear-gradient(90deg, transparent, rgba(168,85,247,0.6))" />
          <Text fontSize="11px" fontWeight="700" letterSpacing="3px" color="rgba(168,85,247,0.7)" textTransform="uppercase">
            Web3 Ticketing
          </Text>
          <Box w="40px" h="1px" bg="linear-gradient(90deg, rgba(168,85,247,0.6), transparent)" />
        </HStack>

        <Heading
          fontSize={{ base: "28px", md: "36px" }}
          fontWeight="800"
          letterSpacing="-1px"
          bgGradient="linear(to-r, #a855f7, #ec4899, #3b82f6)"
          bgClip="text"
          textAlign="center"
        >
          Secure Your Seat
        </Heading>
        <Text fontSize="14px" color="rgba(255,255,255,0.4)" textAlign="center">
          Purchase your ticket on the blockchain
        </Text>
      </VStack>

      {/* Form */}
      <VStack spacing={5} mb={6}>

        {/* Name */}
        <Box w="100%">
          <label style={labelStyle}>Full Name</label>
          <Box position="relative">
            <Box position="absolute" left="14px" top="50%" transform="translateY(-50%)" fontSize="16px" zIndex={1} pointerEvents="none">
              👤
            </Box>
            <input
              type="text"
              placeholder="Satoshi Nakamoto"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onFocus={() => setFocusedField("name")}
              onBlur={() => setFocusedField("")}
              disabled={loading}
              style={{ ...inputStyle("name"), paddingLeft: "44px" }}
            />
          </Box>
        </Box>

        {/* Email */}
        <Box w="100%">
          <label style={labelStyle}>Email Address</label>
          <Box position="relative">
            <Box position="absolute" left="14px" top="50%" transform="translateY(-50%)" fontSize="16px" zIndex={1} pointerEvents="none">
              ✉️
            </Box>
            <input
              type="email"
              placeholder="satoshi@crypto.io"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onFocus={() => setFocusedField("email")}
              onBlur={() => setFocusedField("")}
              disabled={loading}
              style={{ ...inputStyle("email"), paddingLeft: "44px" }}
            />
          </Box>
        </Box>

        {/* Phone */}
        <Box w="100%">
          <label style={labelStyle}>Phone Number</label>
          <Box position="relative">
            <Box position="absolute" left="14px" top="50%" transform="translateY(-50%)" fontSize="16px" zIndex={1} pointerEvents="none">
              📱
            </Box>
            <input
              type="tel"
              placeholder="+1 234 567 8900"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              onFocus={() => setFocusedField("phone")}
              onBlur={() => setFocusedField("")}
              disabled={loading}
              style={{ ...inputStyle("phone"), paddingLeft: "44px" }}
            />
          </Box>
        </Box>
      </VStack>

      {/* Divider */}
      <Box h="1px" mb={6} bg="linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent)" />

      {/* Buttons */}
      <HStack spacing={3} mb={4}>

        {/* Normal Ticket */}
        <Box flex={1} position="relative" borderRadius="14px" p="1px"
          background="linear-gradient(135deg, rgba(168,85,247,0.6), rgba(59,130,246,0.6))"
          _hover={{ background: "linear-gradient(135deg, rgba(168,85,247,0.9), rgba(59,130,246,0.9))" }}
          transition="all 0.2s"
        >
          <Button
            onClick={() => handleBuy(false)}
            isDisabled={loading}
            isLoading={loading}
            loadingText="Processing..."
            w="100%"
            h="52px"
            borderRadius="13px"
            bg="rgba(10,8,20,0.95)"
            color="white"
            fontSize="14px"
            fontWeight="600"
            _hover={{ bg: "rgba(168,85,247,0.15)", transform: "translateY(-1px)" }}
            _active={{ transform: "scale(0.98)" }}
            _disabled={{ opacity: 0.5, cursor: "not-allowed", transform: "none" }}
            transition="all 0.2s"
          >
            🎟️ Normal Ticket
          </Button>
        </Box>

        {/* VIP Ticket */}
        <Box flex={1} position="relative" borderRadius="14px" p="1px"
          background="linear-gradient(135deg, #f59e0b, #ef4444, #f59e0b)"
          boxShadow={!loading ? "0 0 30px rgba(245,158,11,0.3)" : "none"}
          transition="all 0.2s"
        >
          <Button
            onClick={() => handleBuy(true)}
            isDisabled={loading}
            isLoading={loading}
            loadingText="Processing..."
            w="100%"
            h="52px"
            borderRadius="13px"
            bg="rgba(20,10,4,0.95)"
            color="#f59e0b"
            fontSize="14px"
            fontWeight="700"
            _hover={{ bg: "rgba(245,158,11,0.15)", transform: "translateY(-1px)" }}
            _active={{ transform: "scale(0.98)" }}
            _disabled={{ opacity: 0.5, cursor: "not-allowed", transform: "none" }}
            transition="all 0.2s"
          >
            ⭐ VIP Ticket
          </Button>
        </Box>
      </HStack>

      {/* Status messages */}
      {loading && (
        <HStack justify="center" spacing={3} py={3}
          bg="rgba(59,130,246,0.08)" borderRadius="12px"
          border="1px solid rgba(59,130,246,0.2)"
        >
          <Box fontSize="18px" animation="spin-slow 1s linear infinite" style={{ animationName: "spin-slow" }}>⚡</Box>
          <Text fontSize="14px" color="rgba(59,130,246,0.9)" fontWeight="500">
            Confirming on blockchain...
          </Text>
        </HStack>
      )}

      {success && (
        <HStack justify="center" spacing={3} py={3}
          bg="rgba(16,185,129,0.08)" borderRadius="12px"
          border="1px solid rgba(16,185,129,0.3)"
        >
          <Text fontSize="18px">✅</Text>
          <Text fontSize="14px" color="rgba(16,185,129,0.9)" fontWeight="500">{success}</Text>
        </HStack>
      )}

      {errorMessage && (
        <HStack justify="center" spacing={3} py={3}
          bg="rgba(239,68,68,0.08)" borderRadius="12px"
          border="1px solid rgba(239,68,68,0.3)"
        >
          <Text fontSize="18px">❌</Text>
          <Text fontSize="14px" color="rgba(239,68,68,0.9)" fontWeight="500">{errorMessage}</Text>
        </HStack>
      )}

      {/* Footer note */}
      <Text fontSize="12px" color="rgba(255,255,255,0.2)" textAlign="center" mt={5}>
        🔒 Secured by smart contract · Gas fees apply
      </Text>

    </Box>
  );
}