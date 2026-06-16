import { refundTicket, refundVipTicket } from "../interface/web3";
import { useState } from "react";
import { Box, Heading, Button, Text, VStack, HStack, useToast } from "@chakra-ui/react";

const RefundCard = ({ icon, label, sublabel, gradient, glow, onClick, loading, disabled }) => (
  <Box
    flex="1"
    position="relative"
    borderRadius="16px"
    p="1px"
    background={loading || disabled ? "rgba(255,255,255,0.08)" : gradient}
    boxShadow={loading || disabled ? "none" : glow}
    transition="all 0.3s"
    _hover={!loading && !disabled ? { transform: "translateY(-2px)" } : {}}
    cursor={loading || disabled ? "not-allowed" : "pointer"}
    onClick={!loading && !disabled ? onClick : undefined}
  >
    <Box
      borderRadius="15px"
      bg="rgba(8,6,18,0.97)"
      p={5}
      display="flex"
      flexDirection="column"
      alignItems="center"
      gap={2}
      position="relative"
      overflow="hidden"
    >
      {/* Subtle bg glow */}
      <Box
        position="absolute"
        bottom="-30px" left="50%"
        transform="translateX(-50%)"
        w="100px" h="100px"
        borderRadius="full"
        bg={gradient}
        opacity={0.07}
        filter="blur(24px)"
        pointerEvents="none"
      />

      <Text fontSize="28px">{icon}</Text>
      <Text fontSize="14px" fontWeight="700" color="white">{label}</Text>
      <Text fontSize="11px" color="rgba(255,255,255,0.35)" textAlign="center">{sublabel}</Text>

      {/* Gradient bottom bar */}
      <Box
        position="absolute"
        bottom={0} left={0} right={0}
        h="2px"
        background={gradient}
        opacity={loading || disabled ? 0.2 : 0.6}
        borderRadius="0 0 15px 15px"
      />
    </Box>
  </Box>
);

export default function Refund() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [activeType, setActiveType] = useState("");
  const toast = useToast();

  const handleRefund = async (vip = false) => {
    setSuccess("");
    setErrorMessage("");
    setLoading(true);
    setActiveType(vip ? "vip" : "normal");

    try {
      if (vip) {
        await refundVipTicket();
      } else {
        await refundTicket();
      }

      const msg = vip ? "VIP Ticket refunded successfully!" : "Normal Ticket refunded successfully!";
      setSuccess(msg);
      toast({ title: "Refund successful ✅", description: msg, status: "success", duration: 4000, isClosable: true, position: "top-right" });
    } catch (err) {
      const msg = err?.message || "An error occurred during the refund.";
      setErrorMessage(msg);
      toast({ title: "Refund failed", description: msg, status: "error", duration: 5000, isClosable: true, position: "top-right" });
    } finally {
      setLoading(false);
      setActiveType("");
    }
  };

  return (
    <Box maxW="480px" mx="auto" position="relative">

      <style>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes pulse-warn {
          0%, 100% { box-shadow: 0 0 0 0 rgba(239,68,68,0.15); }
          50% { box-shadow: 0 0 0 8px rgba(239,68,68,0); }
        }
      `}</style>

      {/* Header */}
      <VStack align="flex-start" spacing={0} mb={6}>
        <HStack spacing={2} mb={1}>
          <Box w="24px" h="1px" bg="linear-gradient(90deg, transparent, rgba(239,68,68,0.6))" />
          <Text fontSize="10px" fontWeight="700" letterSpacing="2px" color="rgba(239,68,68,0.7)" textTransform="uppercase">
            Refund Center
          </Text>
        </HStack>
        <Heading
          fontSize="22px"
          fontWeight="800"
          letterSpacing="-0.5px"
          bgGradient="linear(to-r, white, rgba(255,255,255,0.6))"
          bgClip="text"
        >
          Request Refund
        </Heading>
      </VStack>

      {/* Warning notice */}
      <Box
        mb={6}
        p={4}
        borderRadius="12px"
        bg="rgba(245,158,11,0.06)"
        border="1px solid rgba(245,158,11,0.2)"
        display="flex"
        alignItems="flex-start"
        gap={3}
      >
        <Text fontSize="18px" mt="1px">⚠️</Text>
        <Text fontSize="13px" color="rgba(245,158,11,0.8)" lineHeight="1.6">
          Refunds are processed directly to your connected wallet via smart contract. This action cannot be undone.
        </Text>
      </Box>

      {/* Refund Cards */}
      <HStack spacing={3} mb={5}>
        <RefundCard
          icon="🎟️"
          label="Normal Ticket"
          sublabel="Standard seat refund"
          gradient="linear-gradient(135deg, rgba(239,68,68,0.8), rgba(168,85,247,0.6))"
          glow="0 0 30px rgba(239,68,68,0.15)"
          onClick={() => handleRefund(false)}
          loading={loading && activeType === "normal"}
          disabled={loading && activeType !== "normal"}
        />
        <RefundCard
          icon="⭐"
          label="VIP Ticket"
          sublabel="Premium seat refund"
          gradient="linear-gradient(135deg, rgba(245,158,11,0.8), rgba(239,68,68,0.7))"
          glow="0 0 30px rgba(245,158,11,0.2)"
          onClick={() => handleRefund(true)}
          loading={loading && activeType === "vip"}
          disabled={loading && activeType !== "vip"}
        />
      </HStack>

      {/* Loading state */}
      {loading && (
        <HStack
          justify="center" spacing={3} py={3} mb={3}
          bg="rgba(239,68,68,0.06)"
          borderRadius="12px"
          border="1px solid rgba(239,68,68,0.2)"
          animation="fadeIn 0.3s ease-out"
          style={{ animationName: "fadeIn" }}
        >
          <Box
            w="18px" h="18px"
            border="2px solid transparent"
            borderTopColor="rgba(239,68,68,0.8)"
            borderRightColor="rgba(168,85,247,0.6)"
            borderRadius="full"
            style={{ animation: "spin 0.8s linear infinite" }}
          />
          <Text fontSize="13px" color="rgba(239,68,68,0.8)" fontWeight="500">
            Processing {activeType === "vip" ? "VIP" : "Normal"} refund on-chain...
          </Text>
        </HStack>
      )}

      {/* Success */}
      {success && (
        <HStack
          justify="center" spacing={3} py={3} mb={3}
          bg="rgba(16,185,129,0.07)"
          borderRadius="12px"
          border="1px solid rgba(16,185,129,0.25)"
          style={{ animation: "fadeIn 0.3s ease-out", animationName: "fadeIn" }}
        >
          <Text fontSize="18px">✅</Text>
          <Text fontSize="13px" color="rgba(16,185,129,0.9)" fontWeight="500">{success}</Text>
        </HStack>
      )}

      {/* Error */}
      {errorMessage && (
        <HStack
          justify="center" spacing={3} py={3} mb={3}
          bg="rgba(239,68,68,0.07)"
          borderRadius="12px"
          border="1px solid rgba(239,68,68,0.25)"
          style={{ animation: "fadeIn 0.3s ease-out", animationName: "fadeIn" }}
        >
          <Text fontSize="18px">❌</Text>
          <Text fontSize="13px" color="rgba(239,68,68,0.9)" fontWeight="500">{errorMessage}</Text>
        </HStack>
      )}

      {/* Footer */}
      <Text fontSize="11px" color="rgba(255,255,255,0.2)" textAlign="center" mt={4}>
        🔒 Funds returned to your connected wallet · Gas fees apply
      </Text>
    </Box>
  );
}