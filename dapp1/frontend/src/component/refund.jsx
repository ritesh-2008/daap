import { refundTicket, refundVipTicket } from "../interface/web3";
import { useState } from "react";
import {
  Box,
  Heading,
  Button,
  Text,
  VStack,
  HStack,
  useToast,
  Spinner,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";

export default function Refund() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const toast = useToast();

  const refundNormal = async (vip = false) => {
    setSuccess("");
    setErrorMessage("");
    setLoading(true);

    try {
      if (vip) {
        await refundVipTicket();
      } else {
        await refundTicket();
      }

      const msg = vip
        ? "VIP Ticket refunded successfully!"
        : "Normal Ticket refunded successfully!";

      setSuccess(msg);
      toast({
        title: "Refund successful",
        description: msg,
        status: "success",
        duration: 4000,
        isClosable: true,
        position: "top-right",
      });
    } catch (err) {
      const msg = err?.message || "An error occurred during the refund.";
      setErrorMessage(msg);
      toast({
        title: "Refund failed",
        description: msg,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top-right",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      maxW="480px"
      mx="auto"
      mt={6}
      p={6}
      bg="gray.800"
      color="white"
      borderRadius="lg"
      boxShadow="lg"
      marginBottom={5}
    >
      <VStack spacing={4} align="stretch">
        <Heading as="h3" size="md">
          REFUND TICKET
        </Heading>

        <Text fontSize="sm" color="gray.300">
          Click the button for the ticket type you want to refund. Refunds will be
          processed to your connected wallet.
        </Text>

        <HStack spacing={3}>
          <Button
            flex="1"
            colorScheme="red"
            onClick={() => refundNormal(false)}
            isLoading={loading}
            loadingText="Processing"
            disabled={loading}
          >
            Refund Normal Ticket
          </Button>

          <Button
            flex="1"
            colorScheme="orange"
            onClick={() => refundNormal(true)}
            isLoading={loading}
            loadingText="Processing"
            disabled={loading}
          >
            Refund VIP Ticket
          </Button>
        </HStack>

        {loading && (
          <HStack justify="center" pt={2}>
            <Spinner color="teal.300" />
            <Text color="gray.200">Processing your refund...</Text>
          </HStack>
        )}

        {success && (
          <Alert status="success" borderRadius="md">
            <AlertIcon />
            <Text>{success}</Text>
          </Alert>
        )}

        {errorMessage && (
          <Alert status="error" borderRadius="md">
            <AlertIcon />
            <Text>{errorMessage}</Text>
          </Alert>
        )}
      </VStack>
    </Box>
  );
}