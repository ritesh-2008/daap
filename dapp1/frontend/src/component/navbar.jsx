import { useState } from "react";
import { init, EventContract, userAccount } from "../interface/web3.js";
import { Box, Button, useToast, HStack, Flex, Text } from "@chakra-ui/react";

export default function Navbar() {
  const [loading, setLoading] = useState(false);
  const [connected, setConnected] = useState(false);
  const [account, setAccount] = useState("");
  const toast = useToast();

  async function connectWallet() {
    setLoading(true);
    try {
      await init();
      setConnected(true);
      setAccount(userAccount);
      toast({
        title: "Wallet connected ✅",
        description: `${userAccount.slice(0, 6)}...${userAccount.slice(-4)}`,
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });
    } catch (err) {
      toast({
        title: "Connection failed",
        description: err.message || "User rejected the request",
        status: "error",
        duration: 4000,
        isClosable: true,
        position: "top-right",
      });
    } finally {
      setLoading(false);
    }
  }

  const shortAddress = account
    ? `${account.slice(0, 6)}...${account.slice(-4)}`
    : "";

  return (
    <Box
      as="header"
      position="sticky"
      top="0"
      zIndex="100"
      width="full"
    >
      <style>{`
        @keyframes shimmer-nav {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        @keyframes pulse-dot {
          0%, 100% { box-shadow: 0 0 0 0 rgba(34,197,94,0.6); }
          50% { box-shadow: 0 0 0 5px rgba(34,197,94,0); }
        }
      `}</style>

      {/* Outer glow border */}
      <Box borderRadius="20px" p="1px"
        background="linear-gradient(135deg, rgba(168,85,247,0.35), rgba(59,130,246,0.2), rgba(236,72,153,0.2))"
        boxShadow="0 8px 40px rgba(168,85,247,0.1), 0 2px 0 rgba(255,255,255,0.04) inset">
        <Box
          px={{ base: 4, md: 6 }}
          py={3}
          bg="rgba(6,4,14,0.92)"
          backdropFilter="blur(20px)"
          borderRadius="19px"
          position="relative"
          overflow="hidden"
        >
          {/* Shimmer top line */}
          <Box position="absolute" top={0} left={0} right={0} h="1px"
            background="linear-gradient(90deg, transparent, rgba(168,85,247,0.7), rgba(236,72,153,0.5), transparent)"
            backgroundSize="200% auto"
            style={{ animation: "shimmer-nav 4s linear infinite" }} />

          {/* Subtle bg orb */}
          <Box position="absolute" top="-60px" left="30%" w="200px" h="200px" borderRadius="full"
            bg="radial-gradient(circle, rgba(168,85,247,0.07), transparent)"
            filter="blur(30px)" pointerEvents="none" />

          <Flex align="center" justify="space-between">

            {/* Logo */}
            <HStack spacing={3}>
              <Box
                w="34px" h="34px" borderRadius="10px" p="1px"
                background="linear-gradient(135deg, rgba(168,85,247,0.8), rgba(236,72,153,0.6))"
                boxShadow="0 0 20px rgba(168,85,247,0.3)"
                flexShrink={0}
              >
                <Box w="100%" h="100%" borderRadius="9px" bg="rgba(6,4,14,0.9)"
                  display="flex" alignItems="center" justifyContent="center" fontSize="16px">
                  🎟️
                </Box>
              </Box>
              <Box>
                <Text
                  fontSize="18px"
                  fontWeight="800"
                  letterSpacing="-0.5px"
                  bgGradient="linear(to-r, #a855f7, #ec4899)"
                  bgClip="text"
                  lineHeight="1"
                >
                  Bookit
                </Text>
                <Text fontSize="10px" color="rgba(255,255,255,0.3)" letterSpacing="1px" fontWeight="500">
                  WEB3 EVENTS
                </Text>
              </Box>
            </HStack>

            {/* Right side */}
            <HStack spacing={3}>

              {/* Connected address pill */}
              {connected && (
                <HStack
                  spacing={2} px={3} py={2}
                  borderRadius="10px"
                  bg="rgba(34,197,94,0.07)"
                  border="1px solid rgba(34,197,94,0.2)"
                >
                  <Box
                    w="7px" h="7px" borderRadius="full" bg="#22c55e"
                    style={{ animation: "pulse-dot 2s ease-in-out infinite" }}
                    flexShrink={0}
                  />
                  <Text fontSize="12px" color="rgba(34,197,94,0.9)" fontWeight="600" letterSpacing="0.3px">
                    {shortAddress}
                  </Text>
                </HStack>
              )}

              {/* Connect button */}
              <Box borderRadius="11px" p="1px"
                background={connected
                  ? "linear-gradient(135deg, rgba(34,197,94,0.5), rgba(6,182,212,0.4))"
                  : "linear-gradient(135deg, rgba(168,85,247,0.8), rgba(236,72,153,0.7))"}
                boxShadow={connected
                  ? "0 0 20px rgba(34,197,94,0.15)"
                  : "0 0 24px rgba(168,85,247,0.25)"}
                transition="all 0.3s">
                <Button
                  onClick={connectWallet}
                  isLoading={loading}
                  loadingText="Connecting..."
                  h="38px"
                  px={5}
                  borderRadius="10px"
                  bg="rgba(6,4,14,0.95)"
                  color="white"
                  fontSize="13px"
                  fontWeight="600"
                  letterSpacing="0.2px"
                  _hover={{
                    bg: connected ? "rgba(34,197,94,0.1)" : "rgba(168,85,247,0.15)",
                    transform: "translateY(-1px)",
                  }}
                  _active={{ transform: "scale(0.97)" }}
                  transition="all 0.2s"
                >
                  {connected ? "✓ Connected" : "Connect Wallet"}
                </Button>
              </Box>

              {/* Ticket icon */}
              <Box
                w="38px" h="38px" borderRadius="10px" p="1px"
                background="linear-gradient(135deg, rgba(234,179,8,0.5), rgba(239,68,68,0.4))"
                boxShadow="0 0 16px rgba(234,179,8,0.1)"
                flexShrink={0}
              >
                <Box w="100%" h="100%" borderRadius="9px" bg="rgba(6,4,14,0.95)"
                  display="flex" alignItems="center" justifyContent="center" fontSize="18px">
                  🏆
                </Box>
              </Box>
            </HStack>
          </Flex>
        </Box>
      </Box>
    </Box>
  );
}