import { useState, useEffect } from "react";
import Refund from "./component/refund.jsx";
import Stats from "./component/stats.jsx";
import Admin from "./component/admin.jsx";
import Buyticket from "./component/buyticket.jsx";
import Navbar from "./component/navbar.jsx";
import CTA1 from "./component/footer.jsx";
import { getCurrentAccount, getOwnerAccount } from "./interface/web3.js";
import { Box, Container, VStack, Grid } from "@chakra-ui/react";
import Spline from "@splinetool/react-spline";

export default function App() {
  const [isowner, setowner] = useState("");

  useEffect(() => {
    async function checkowner() {
      try {
        const owner = await getOwnerAccount();
        const useracc = getCurrentAccount();

        setowner(owner.toLowerCase() === useracc.toLowerCase());
      } catch (err) {
        console.error(err);
      }
    }
    checkowner();
  }, []);

  // dark gradient overlay + background image (gradient.png in public/)
  const backgroundCombined = `linear-gradient(135deg, rgba(0, 0, 0, 1), rgba(2, 4, 10, 0.86)), url('/gradient.png')`;

  return (
    <Box
      minH="100vh"
      bg={backgroundCombined}
      bgSize="cover"
      bgPosition="center"
      bgRepeat="no-repeat"
      py={{ base: 6, md: 10 }}
      position="relative"
      overflow="hidden"
    >
      <Container maxW="6xl">
        <VStack spacing={8} align="stretch">
          <Navbar />

                      
                
            

            {/* right: Buyticket content — kept above Spline */}
            <Box position="relative" >
              <Buyticket />
              <Spline left={10000} display="block" zIndex={-1} scene="https://prod.spline.design/iuqkAeos0DEDPTGg/scene.splinecode" />
            </Box>
         

          <Box>
            <Stats />
          </Box>

          <Box>
            <Refund />
          </Box>

          <Box>
            <CTA1 />
          </Box>

          {isowner && (
            <Box>
              <Admin />
            </Box>
          )}
        </VStack>
      </Container>
    </Box>
  );
}