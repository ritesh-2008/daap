import { useState } from "react";
import {init, EventContract, userAccount } from "../interface/web3.js";
import {
  Box,
  Heading,
  Button,
  useToast,
  Image,
  Spacer,
  HStack,
  Flex
} from "@chakra-ui/react";


export default function Navbar() {
 
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  async function connectWallet() {
    setLoading(true);

    try {
      await init();

      toast({
        title: "Wallet connected",
        description: userAccount,
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });

      console.log("Connected account:", userAccount);
      console.log("Contract:", EventContract);

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

  return (
    <Box
      as="header"
      position="sticky"
      top="0"
      zIndex="100"
      px={{ base: 4, md: 10 }}
      py={4}
      bg="rgba(0, 0, 10, 0.75)"
      backdropFilter="blur(12px)"
      borderBottom="1px solid"
      borderColor="whiteAlpha.200"
      borderRadius="3xl"
      boxShadow="0 4px 12px rgba(172, 9, 99, 0.25)"
      display="flex"
      alignItems="center"
      width="full"
    >
      <Flex align="center" width="full">
        <Heading
          size="lg"
          bgGradient="linear(to-r, green.400, teal.300)"
          bgClip="text"
          fontWeight="extrabold"
          letterSpacing="wide"
          mr={4}
        >
          Bookit
        </Heading>

        <Spacer />

        <HStack spacing={4} align="center" flexShrink={0}>
          <Button
            onClick={() => connectWallet()}
            isLoading={loading}
            loadingText="Connecting"
            bgGradient="linear(to-r, green.400, teal.400)"
            color="black"
            fontWeight="bold"
            px={6}
            rounded="full"
            _hover={{
              transform: "translateY(-1px)",
              boxShadow: "0 0 20px rgba(72,187,120,0.6)",
            }}
            _active={{
              transform: "scale(0.97)",
            }}
          >
            Connect Wallet
          </Button>

          <Image
            src="/golden-ticket.png"
            alt="Ticket"
            boxSize={{ base: "40px", md: "56px" }}
            objectFit="contain"
            ml={0}
            flexShrink={0}
          />
        </HStack>
      </Flex>
    </Box>
  );
}
