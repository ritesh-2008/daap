import { useState, useEffect } from "react";
import Refund from "./component/refund.jsx";
import Stats from "./component/stats.jsx";
import Admin from "./component/admin.jsx";
import Buyticket from "./component/buyticket.jsx";
import Navbar from "./component/navbar.jsx";
import CTA1 from "./component/footer.jsx";
import { getCurrentAccount, getOwnerAccount } from "./interface/web3.js";
import { Box, Container, VStack } from "@chakra-ui/react";
import Spline from "@splinetool/react-spline";

export default function App() {
  const [isowner, setowner] = useState("");

  useEffect(() => {
    async function checkowner() {
      try {
        const owner = await getOwnerAccount();
        const useracc =  await getCurrentAccount();
        if (!owner || !useracc) return;

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
      
    >
      <Container maxW="6xl" px={{ base: 4, md: 6 }}>
        <VStack spacing={8} align="stretch">
          <Navbar />

       <Box position="relative">
  <Box
    display="flex"
    flexDirection={{ base: "column", md: "row" }}
    alignItems="center"
    justifyContent="center"
    gap={{ base: 6, md: 10 }}
  >
    {/* Spline Robot */}
<Box
  w={{ base: "100%", md: "500px" }}
  h={{ base: "300px", md: "500px" }}
  position="relative"
>
  <Spline
    style={{ width: "100%", height: "100%" }}
    scene="https://prod.spline.design/iuqkAeos0DEDPTGg/scene.splinecode" />

         
</Box>




    {/* Buyticket form */}
    <Box w={{ base: "100%", md: "420px" }}>
      <Buyticket />
    </Box>
  </Box>
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