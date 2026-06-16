import { useState, useEffect } from "react";
import Refund from "./component/refund.jsx";
import Stats from "./component/stats.jsx";
import Admin from "./component/admin.jsx";
import Buyticket from "./component/buyticket.jsx";
import Navbar from "./component/navbar.jsx";
import CTA1 from "./component/footer.jsx";
import { getCurrentAccount, getOwnerAccount } from "./interface/web3.js";
import { Box, Container, VStack, Divider } from "@chakra-ui/react";

export default function App() {
  const [isowner, setowner] = useState(false);

  useEffect(() => {
    async function checkowner() {
      try {
        const owner = await getOwnerAccount();
        const useracc = await getCurrentAccount();
        if (!owner || !useracc) return;
        setowner(owner.toLowerCase() === useracc.toLowerCase());
      } catch (err) {
        console.error(err);
      }
    }
    checkowner();
  }, []);

  return (
    <Box minH="100vh" position="relative" overflow="hidden" bg="#050508">

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(40px) rotate(3deg); }
        }
        @keyframes pulse-glow {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 0.8; }
        }
        @keyframes scanline {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100vh); }
        }
        @keyframes shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }

        /* Sexy scrollbar */
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: #0a0a12; }
        ::-webkit-scrollbar-thumb {
          background: linear-gradient(180deg, #a855f7, #3b82f6);
          border-radius: 3px;
        }
      `}</style>

      {/* ── Deep space base ── */}
      <Box
        position="absolute" inset={0} zIndex={-4}
        bg="radial-gradient(ellipse at 20% 20%, #0d0720 0%, #050508 50%, #020410 100%)"
      />

      {/* ── Purple orb top-left ── */}
      <Box
        position="absolute"
        w="700px" h="700px"
        top="-300px" left="-250px"
        zIndex={-3}
        borderRadius="full"
        bg="radial-gradient(circle, rgba(168,85,247,0.25) 0%, transparent 70%)"
        filter="blur(80px)"
        animation="float 8s ease-in-out infinite"
        style={{ animationName: "pulse-glow" }}
      />

      {/* ── Blue orb bottom-right ── */}
      <Box
        position="absolute"
        w="600px" h="600px"
        bottom="-200px" right="-200px"
        zIndex={-3}
        borderRadius="full"
        bg="radial-gradient(circle, rgba(59,130,246,0.22) 0%, transparent 70%)"
        filter="blur(70px)"
        animation="float 11s ease-in-out infinite reverse"
      />

      {/* ── Pink orb center ── */}
      <Box
        position="absolute"
        w="400px" h="400px"
        top="40%" left="50%"
        transform="translate(-50%, -50%)"
        zIndex={-3}
        borderRadius="full"
        bg="radial-gradient(circle, rgba(236,72,153,0.1) 0%, transparent 70%)"
        filter="blur(60px)"
        animation="float 13s ease-in-out infinite"
      />

      {/* ── Fine grid ── */}
      <Box
        position="absolute" inset={0} zIndex={-2}
        backgroundImage={`
          linear-gradient(rgba(168,85,247,0.05) 1px, transparent 1px),
          linear-gradient(90deg, rgba(168,85,247,0.05) 1px, transparent 1px)
        `}
        backgroundSize="32px 32px"
        pointerEvents="none"
      />

      {/* ── Dot grid overlay ── */}
      <Box
        position="absolute" inset={0} zIndex={-1}
        backgroundImage="radial-gradient(rgba(168,85,247,0.15) 1px, transparent 1px)"
        backgroundSize="64px 64px"
        pointerEvents="none"
      />

      {/* ── Top shimmer bar ── */}
      <Box
        position="absolute" top={0} left={0} right={0}
        height="1px" zIndex={10}
        background="linear-gradient(90deg, transparent 0%, rgba(168,85,247,0.8) 30%, rgba(236,72,153,0.8) 50%, rgba(59,130,246,0.8) 70%, transparent 100%)"
        backgroundSize="200% auto"
        animation="shimmer 4s linear infinite"
      />

      {/* ── Bottom shimmer bar ── */}
      <Box
        position="fixed" bottom={0} left={0} right={0}
        height="1px" zIndex={10}
        background="linear-gradient(90deg, transparent 0%, rgba(59,130,246,0.6) 40%, rgba(168,85,247,0.6) 60%, transparent 100%)"
      />

      {/* ── Content ── */}
      <Container maxW="6xl" px={{ base: 4, md: 8 }} position="relative" zIndex={1}>
        <VStack spacing={0} align="stretch" py={{ base: 6, md: 12 }}>

          <Navbar />

          <Box h="2px" my={8}
            background="linear-gradient(90deg, transparent, rgba(168,85,247,0.4), rgba(59,130,246,0.4), transparent)"
          />

          {/* Buy Ticket — hero section */}
          <Box
            position="relative"
            borderRadius="24px"
            p="1px"
            background="linear-gradient(135deg, rgba(168,85,247,0.5), rgba(59,130,246,0.5), rgba(236,72,153,0.3))"
            boxShadow="0 0 60px rgba(168,85,247,0.15), 0 0 120px rgba(59,130,246,0.1)"
            mb={8}
          >
            <Box
              borderRadius="24px"
              bg="rgba(10,8,20,0.95)"
              backdropFilter="blur(20px)"
              p={{ base: 6, md: 8 }}
            >
              <Buyticket />
            </Box>
          </Box>

          {/* Stats */}
          <Box
            position="relative"
            borderRadius="20px"
            p="1px"
            background="linear-gradient(135deg, rgba(59,130,246,0.3), rgba(168,85,247,0.3))"
            boxShadow="0 0 40px rgba(59,130,246,0.08)"
            mb={8}
          >
            <Box
              borderRadius="20px"
              bg="rgba(8,10,20,0.92)"
              backdropFilter="blur(16px)"
              p={{ base: 5, md: 7 }}
            >
              <Stats />
            </Box>
          </Box>

          {/* Refund */}
          <Box
            position="relative"
            borderRadius="20px"
            p="1px"
            background="linear-gradient(135deg, rgba(236,72,153,0.3), rgba(168,85,247,0.3))"
            boxShadow="0 0 40px rgba(236,72,153,0.08)"
            mb={8}
          >
            <Box
              borderRadius="20px"
              bg="rgba(8,10,20,0.92)"
              backdropFilter="blur(16px)"
              p={{ base: 5, md: 7 }}
            >
              <Refund />
            </Box>
          </Box>

          <CTA1 />

          {/* Admin — only for owner */}
          {isowner && (
            <Box
              position="relative"
              borderRadius="20px"
              p="1px"
              mt={8}
              background="linear-gradient(135deg, rgba(234,179,8,0.5), rgba(239,68,68,0.4))"
              boxShadow="0 0 60px rgba(234,179,8,0.15)"
            >
              <Box
                borderRadius="20px"
                bg="rgba(12,8,4,0.95)"
                backdropFilter="blur(20px)"
                p={{ base: 5, md: 7 }}
              >
                {/* Admin badge */}
                <Box
                  display="inline-flex"
                  alignItems="center"
                  gap={2}
                  mb={4}
                  px={3} py={1}
                  borderRadius="full"
                  bg="rgba(234,179,8,0.1)"
                  border="1px solid rgba(234,179,8,0.3)"
                  fontSize="12px"
                  fontWeight="600"
                  color="yellow.400"
                  letterSpacing="2px"
                >
                  ⚡ OWNER PANEL

                </Box>
                {isowner && (
                  <Box>
                    <Admin />
                  </Box>
                )}

              </Box>

            </Box>
          )}

          <Box h="2px" my={10}
            background="linear-gradient(90deg, transparent, rgba(59,130,246,0.3), rgba(168,85,247,0.3), transparent)"
          />

        </VStack>
      </Container>
    </Box>
  );
}