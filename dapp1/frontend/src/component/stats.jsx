import { checkticket, checkvipticket, soldticket, soldvipticket } from "../interface/web3";
import { useState, useEffect } from "react";
import { Box, Button, Heading, Text, VStack, HStack, Grid, GridItem } from "@chakra-ui/react";

const StatCard = ({ label, value, icon, gradient, glow, delay = "0s" }) => (
  <Box
    position="relative"
    borderRadius="16px"
    p="1px"
    background={gradient}
    boxShadow={glow}
    style={{ animationDelay: delay }}
  >
    <Box
      borderRadius="15px"
      bg="rgba(8,6,18,0.95)"
      backdropFilter="blur(16px)"
      p={5}
      h="100%"
      position="relative"
      overflow="hidden"
    >
      {/* Background glow blob */}
      <Box
        position="absolute"
        bottom="-20px" right="-20px"
        w="80px" h="80px"
        borderRadius="full"
        bg={gradient}
        opacity={0.08}
        filter="blur(20px)"
        pointerEvents="none"
      />

      <Text fontSize="24px" mb={3}>{icon}</Text>

      <Text
        fontSize="11px"
        fontWeight="700"
        letterSpacing="1.5px"
        textTransform="uppercase"
        color="rgba(255,255,255,0.4)"
        mb={1}
      >
        {label}
      </Text>

      <Text
        fontSize="32px"
        fontWeight="800"
        bgGradient={gradient.replace("linear-gradient", "linear").replace("(", "(to-r, ").replace("135deg,", "")}
        bgClip="text"
        lineHeight="1"
      >
        {value ?? "—"}
      </Text>
    </Box>
  </Box>
);

export default function Stats() {
  const [data, setData] = useState({});
  const [showStats, setShowStats] = useState(false);
  const [loading, setLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(null);

  async function fetchData() {
    setLoading(true);
    try {
      const snt = await soldticket();
      const svt = await soldvipticket();
      const cnt = await checkticket();
      const cvt = await checkvipticket();
      setData({
        soldNormalTickets: snt,
        soldVipTickets: svt,
        userNormalTicket: cnt,
        userVipTicket: cvt,
      });
      setLastUpdated(new Date().toLocaleTimeString());
    } catch (err) {
      console.error("Failed to fetch stats:", err);
      setData({});
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { fetchData(); }, []);

  const stats = [
    {
      label: "Sold Normal Tickets",
      value: data.soldNormalTickets,
      icon: "🎟️",
      gradient: "linear-gradient(135deg, rgba(168,85,247,0.8), rgba(99,102,241,0.8))",
      glow: "0 0 30px rgba(168,85,247,0.15)",
    },
    {
      label: "Sold VIP Tickets",
      value: data.soldVipTickets,
      icon: "⭐",
      gradient: "linear-gradient(135deg, rgba(245,158,11,0.8), rgba(239,68,68,0.7))",
      glow: "0 0 30px rgba(245,158,11,0.15)",
    },
    {
      label: "Your Normal Tickets",
      value: data.userNormalTicket,
      icon: "👤",
      gradient: "linear-gradient(135deg, rgba(59,130,246,0.8), rgba(6,182,212,0.8))",
      glow: "0 0 30px rgba(59,130,246,0.15)",
    },
    {
      label: "Your VIP Tickets",
      value: data.userVipTicket,
      icon: "💎",
      gradient: "linear-gradient(135deg, rgba(236,72,153,0.8), rgba(168,85,247,0.8))",
      glow: "0 0 30px rgba(236,72,153,0.15)",
    },
  ];

  return (
    <Box maxW="680px" mx="auto">

      <style>{`
        @keyframes fadeSlideIn {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
      `}</style>

      {/* Header */}
      <HStack justify="space-between" align="center" mb={6}>
        <VStack align="flex-start" spacing={0}>
          <HStack spacing={2} mb={1}>
            <Box w="24px" h="1px" bg="linear-gradient(90deg, transparent, rgba(168,85,247,0.6))" />
            <Text fontSize="10px" fontWeight="700" letterSpacing="2px" color="rgba(168,85,247,0.7)" textTransform="uppercase">
              Live Data
            </Text>
          </HStack>
          <Heading
            fontSize="22px"
            fontWeight="800"
            letterSpacing="-0.5px"
            bgGradient="linear(to-r, white, rgba(255,255,255,0.6))"
            bgClip="text"
          >
            Event Statistics
          </Heading>
        </VStack>

        <HStack spacing={3}>
          {showStats && (
            <Button
              onClick={fetchData}
              size="sm"
              h="36px"
              px={4}
              borderRadius="10px"
              bg="rgba(255,255,255,0.05)"
              border="1px solid rgba(255,255,255,0.1)"
              color="rgba(255,255,255,0.6)"
              fontSize="13px"
              _hover={{ bg: "rgba(255,255,255,0.08)", color: "white" }}
              _active={{ transform: "scale(0.97)" }}
              isLoading={loading}
            >
              ↺ Refresh
            </Button>
          )}

          {/* Toggle button */}
          <Box
            position="relative"
            borderRadius="12px"
            p="1px"
            background="linear-gradient(135deg, rgba(168,85,247,0.7), rgba(59,130,246,0.7))"
            cursor="pointer"
            onClick={() => { setShowStats(!showStats); if (!showStats) fetchData(); }}
          >
            <Button
              h="36px"
              px={5}
              borderRadius="11px"
              bg="rgba(10,8,20,0.95)"
              color="white"
              fontSize="13px"
              fontWeight="600"
              _hover={{ bg: "rgba(168,85,247,0.15)" }}
              _active={{ transform: "scale(0.97)" }}
            >
              {showStats ? "Hide ↑" : "Show Stats ↓"}
            </Button>
          </Box>
        </HStack>
      </HStack>

      {/* Stats panel */}
      {showStats && (
        <Box
          animation="fadeSlideIn 0.3s ease-out"
          style={{ animationName: "fadeSlideIn" }}
        >
          {loading ? (
            <Box
              borderRadius="20px"
              p="1px"
              background="linear-gradient(135deg, rgba(168,85,247,0.3), rgba(59,130,246,0.3))"
            >
              <Box
                borderRadius="19px"
                bg="rgba(8,6,18,0.95)"
                py={12}
                display="flex"
                flexDirection="column"
                alignItems="center"
                gap={4}
              >
                <Box
                  w="36px" h="36px"
                  border="2px solid transparent"
                  borderTopColor="rgba(168,85,247,0.8)"
                  borderRightColor="rgba(59,130,246,0.8)"
                  borderRadius="full"
                  style={{ animation: "spin 0.8s linear infinite" }}
                />
                <Text fontSize="14px" color="rgba(255,255,255,0.4)" letterSpacing="1px">
                  Fetching on-chain data...
                </Text>
              </Box>
            </Box>
          ) : (
            <VStack spacing={4}>
              <Grid templateColumns="1fr 1fr" gap={4} w="100%">
                {stats.map((s, i) => (
                  <StatCard key={i} {...s} />
                ))}
              </Grid>

              {/* Footer */}
              {lastUpdated && (
                <HStack w="100%" justify="center">
                  <Text fontSize="11px" color="rgba(255,255,255,0.2)">
                    Last updated at {lastUpdated} · Data from blockchain
                  </Text>
                </HStack>
              )}
            </VStack>
          )}
        </Box>
      )}
    </Box>
  );
}
