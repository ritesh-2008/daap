import { useState, useEffect } from "react";
import Refund from "./component/refund.jsx";
import Stats from "./component/stats.jsx";
import Admin from "./component/admin.jsx";
import Buyticket from "./component/buyticket.jsx";
import Navbar from "./component/navbar.jsx";
import CTA1 from "./component/footer.jsx";
import { getCurrentAccount, getOwnerAccount } from "./interface/web3.js";
import { Box, Container, VStack, Text, HStack } from "@chakra-ui/react";

// ── Reusable section wrapper ──────────────────────────────────────────────────
const Section = ({ children, gradient, glow, mb = 6 }) => (
  <Box
    as="section"
    position="relative"
    borderRadius={{ base: "16px", md: "20px", lg: "24px" }}
    p="1px"
    background={gradient}
    boxShadow={glow}
    mb={mb}
    w="100%"
  >
    <Box
      borderRadius={{ base: "15px", md: "19px", lg: "23px" }}
      bg="rgba(8,6,18,0.94)"
      backdropFilter="blur(20px)"
      p={{ base: 4, sm: 5, md: 6, lg: 8 }}
      w="100%"
    >
      {children}
    </Box>
  </Box>
);

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
    <>
      {/* ── SEO / meta via plain HTML (Vite injects into index.html) ── */}
      <Box
        as="main"
        minH="100vh"
        position="relative"
        overflow="hidden"
        bg="#050508"
        // semantic landmark for screen readers
        aria-label="Bookit — Web3 Event Ticketing"
      >

        <style>{`
          /* ── Reset & base ── */
          *, *::before, *::after { box-sizing: border-box; }

          /* ── Responsive font scale ── */
          html { font-size: clamp(14px, 1.5vw, 16px); }

          /* ── Animations ── */
          @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50%       { transform: translateY(30px); }
          }
          @keyframes pulse-glow {
            0%, 100% { opacity: 0.35; }
            50%       { opacity: 0.75; }
          }
          @keyframes shimmer {
            0%   { background-position: -200% center; }
            100% { background-position:  200% center; }
          }
          @keyframes fadeUp {
            from { opacity: 0; transform: translateY(16px); }
            to   { opacity: 1; transform: translateY(0);    }
          }

          /* ── Scrollbar ── */
          ::-webkit-scrollbar       { width: 5px; }
          ::-webkit-scrollbar-track { background: #08060f; }
          ::-webkit-scrollbar-thumb {
            background: linear-gradient(180deg, #a855f7, #3b82f6);
            border-radius: 4px;
          }

          /* ── Smooth scroll ── */
          html { scroll-behavior: smooth; }

          /* ── Focus ring for a11y ── */
          :focus-visible {
            outline: 2px solid rgba(168,85,247,0.7);
            outline-offset: 3px;
            border-radius: 6px;
          }

          /* ── Prevent horizontal overflow on mobile ── */
          body { overflow-x: hidden; }

          /* ── Section fade-in ── */
          .fade-section {
            animation: fadeUp 0.5s ease-out both;
          }
          .fade-section:nth-child(2)  { animation-delay: 0.05s; }
          .fade-section:nth-child(3)  { animation-delay: 0.10s; }
          .fade-section:nth-child(4)  { animation-delay: 0.15s; }
          .fade-section:nth-child(5)  { animation-delay: 0.20s; }
          .fade-section:nth-child(6)  { animation-delay: 0.25s; }
        `}</style>

        {/* ── Background layers ── */}
        {/* Deep space radial */}
        <Box position="fixed" inset={0} zIndex={-4}
          bg="radial-gradient(ellipse at 20% 20%, #0d0720 0%, #050508 55%, #020410 100%)"
          pointerEvents="none" aria-hidden />

        {/* Purple orb — hidden on small screens for perf */}
        <Box display={{ base: "none", md: "block" }}
          position="fixed" w="600px" h="600px" top="-250px" left="-200px"
          zIndex={-3} borderRadius="full"
          bg="radial-gradient(circle, rgba(168,85,247,0.22) 0%, transparent 70%)"
          filter="blur(80px)"
          style={{ animation: "pulse-glow 8s ease-in-out infinite" }}
          pointerEvents="none" aria-hidden />

        {/* Blue orb */}
        <Box display={{ base: "none", md: "block" }}
          position="fixed" w="500px" h="500px" bottom="-180px" right="-160px"
          zIndex={-3} borderRadius="full"
          bg="radial-gradient(circle, rgba(59,130,246,0.18) 0%, transparent 70%)"
          filter="blur(70px)"
          style={{ animation: "float 11s ease-in-out infinite reverse" }}
          pointerEvents="none" aria-hidden />

        {/* Pink orb */}
        <Box display={{ base: "none", lg: "block" }}
          position="fixed" w="380px" h="380px" top="40%" left="50%"
          transform="translate(-50%, -50%)"
          zIndex={-3} borderRadius="full"
          bg="radial-gradient(circle, rgba(236,72,153,0.08) 0%, transparent 70%)"
          filter="blur(60px)"
          style={{ animation: "float 13s ease-in-out infinite" }}
          pointerEvents="none" aria-hidden />

        {/* Fine grid */}
        <Box position="fixed" inset={0} zIndex={-2}
          backgroundImage={`
            linear-gradient(rgba(168,85,247,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(168,85,247,0.04) 1px, transparent 1px)
          `}
          backgroundSize={{ base: "24px 24px", md: "32px 32px" }}
          pointerEvents="none" aria-hidden />

        {/* Top shimmer */}
        <Box position="fixed" top={0} left={0} right={0} h="1px" zIndex={20}
          background="linear-gradient(90deg, transparent 0%, rgba(168,85,247,0.8) 30%, rgba(236,72,153,0.7) 50%, rgba(59,130,246,0.8) 70%, transparent 100%)"
          backgroundSize="200% auto"
          style={{ animation: "shimmer 4s linear infinite" }}
          pointerEvents="none" aria-hidden />

        {/* Bottom shimmer */}
        <Box position="fixed" bottom={0} left={0} right={0} h="1px" zIndex={20}
          background="linear-gradient(90deg, transparent, rgba(59,130,246,0.5), rgba(168,85,247,0.5), transparent)"
          pointerEvents="none" aria-hidden />

        {/* ── Page content ── */}
        <Container
          maxW={{ base: "100%", sm: "540px", md: "768px", lg: "1024px", xl: "1200px" }}
          px={{ base: 3, sm: 4, md: 6, lg: 8 }}
          position="relative"
          zIndex={1}
        >
          <VStack
            spacing={0}
            align="stretch"
            pt={{ base: 4, md: 6, lg: 10 }}
            pb={{ base: 10, md: 14 }}
          >

            {/* ── Navbar ── */}
            <Box as="header" className="fade-section" mb={{ base: 5, md: 6, lg: 8 }}>
              <Navbar />
            </Box>

            {/* ── Divider ── */}
            <Box h="1px" mb={{ base: 5, md: 7 }} aria-hidden
              background="linear-gradient(90deg, transparent, rgba(168,85,247,0.35), rgba(59,130,246,0.35), transparent)" />

            {/* ── Hero label ── */}
            <Box className="fade-section" mb={{ base: 2, md: 3 }}>
              <HStack spacing={2} justify="center">
                <Box w="32px" h="1px" bg="linear-gradient(90deg, transparent, rgba(168,85,247,0.6))" />
                <Text
                  fontSize={{ base: "9px", md: "10px" }}
                  fontWeight="700"
                  letterSpacing="2px"
                  color="rgba(168,85,247,0.6)"
                  textTransform="uppercase"
                  textAlign="center"
                >
                  Web3 Event Ticketing
                </Text>
                <Box w="32px" h="1px" bg="linear-gradient(90deg, rgba(168,85,247,0.6), transparent)" />
              </HStack>
            </Box>

            {/* ── Buy Ticket ── */}
            <Box className="fade-section" id="buy-ticket" aria-label="Buy Ticket">
              <Section
                gradient="linear-gradient(135deg, rgba(168,85,247,0.45), rgba(59,130,246,0.45), rgba(236,72,153,0.25))"
                glow="0 0 50px rgba(168,85,247,0.12), 0 0 100px rgba(59,130,246,0.08)"
                mb={{ base: 4, md: 6 }}
              >
                <Buyticket />
              </Section>
            </Box>

            {/* ── Stats ── */}
            <Box className="fade-section" id="stats" aria-label="Event Statistics">
              <Section
                gradient="linear-gradient(135deg, rgba(59,130,246,0.3), rgba(168,85,247,0.25))"
                glow="0 0 40px rgba(59,130,246,0.07)"
                mb={{ base: 4, md: 6 }}
              >
                <Stats />
              </Section>
            </Box>

            {/* ── Refund ── */}
            <Box className="fade-section" id="refund" aria-label="Refund Ticket">
              <Section
                gradient="linear-gradient(135deg, rgba(236,72,153,0.28), rgba(168,85,247,0.25))"
                glow="0 0 40px rgba(236,72,153,0.07)"
                mb={{ base: 4, md: 6 }}
              >
                <Refund />
              </Section>
            </Box>

            {/* ── CTA / Footer ── */}
            <Box className="fade-section" id="contact" aria-label="Contact and Social">
              <CTA1 />
            </Box>

            {/* ── Admin panel ── */}
            {isowner && (
              <Box
                className="fade-section"
                id="admin"
                aria-label="Admin Panel"
                mt={{ base: 4, md: 6 }}
              >
                <Box
                  position="relative"
                  borderRadius={{ base: "16px", md: "20px" }}
                  p="1px"
                  background="linear-gradient(135deg, rgba(234,179,8,0.5), rgba(239,68,68,0.4))"
                  boxShadow="0 0 60px rgba(234,179,8,0.12)"
                >
                  <Box
                    borderRadius={{ base: "15px", md: "19px" }}
                    bg="rgba(10,6,2,0.96)"
                    backdropFilter="blur(20px)"
                    p={{ base: 4, sm: 5, md: 6, lg: 8 }}
                  >
                    {/* Admin badge */}
                    <Box
                      display="inline-flex"
                      alignItems="center"
                      gap={2}
                      mb={{ base: 4, md: 5 }}
                      px={3} py="6px"
                      borderRadius="full"
                      bg="rgba(234,179,8,0.08)"
                      border="1px solid rgba(234,179,8,0.25)"
                    >
                      <Box
                        w="6px" h="6px" borderRadius="full" bg="#eab308"
                        boxShadow="0 0 8px rgba(234,179,8,0.8)"
                      />
                      <Text
                        fontSize={{ base: "10px", md: "11px" }}
                        fontWeight="700"
                        color="rgba(234,179,8,0.85)"
                        letterSpacing="2px"
                        textTransform="uppercase"
                      >
                        Owner Panel
                      </Text>
                    </Box>

                    <Admin />
                  </Box>
                </Box>
              </Box>
            )}

            {/* ── Bottom divider ── */}
            <Box h="1px" mt={{ base: 8, md: 12 }} aria-hidden
              background="linear-gradient(90deg, transparent, rgba(59,130,246,0.25), rgba(168,85,247,0.25), transparent)" />

            {/* ── Footer credit ── */}
            <Text
              textAlign="center"
              fontSize={{ base: "10px", md: "11px" }}
              color="rgba(255,255,255,0.18)"
              mt={4}
              letterSpacing="0.5px"
            >
              ⚡ Bookit — Powered by Ethereum smart contracts
            </Text>

          </VStack>
        </Container>
      </Box>
    </>
  );
}