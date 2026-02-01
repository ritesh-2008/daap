// admin dashboard to manage event

import { useState } from "react";
import { setticketprize, seteventdate, withdrawamount } from "../interface/web3";
import {
  Box,
  Heading,
  Input,
  Button,
  VStack,
 
  FormControl,
  FormLabel,
  useToast,
  Divider,
  Text,
} from "@chakra-ui/react";

export default function Admin() {
  const [ticketPrize, setTicketPrize] = useState("");
  const [vipPrize, setVipPrize] = useState("");
  const [eventdate, setEventDate] = useState("");
  const [loading, setLoading] = useState({
    prizes: false,
    date: false,
    withdraw: false,
  });
  const toast = useToast();

  const handleSetPrizes = async () => {
    if (!ticketPrize || !vipPrize) {
      toast({
        title: "Invalid input",
        description: "Please enter both ticket prices",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    setLoading(prev => ({ ...prev, prizes: true }));
    try {
      await setticketprize(ticketPrize, vipPrize);
      toast({
        title: "Success",
        description: "Ticket prices updated successfully",
        status: "success",
        duration: 4000,
        isClosable: true,
      });
      setTicketPrize("");
      setVipPrize("");
    } catch (err) {
      toast({
        title: "Error",
        description: err.message || "Failed to update prices",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setLoading(prev => ({ ...prev, prizes: false }));
    }
  };

  const handleSetDate = async () => {
    if (!eventdate) {
      toast({
        title: "Invalid input",
        description: "Please enter an event date",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    setLoading(prev => ({ ...prev, date: true }));
    try {
      await seteventdate(eventdate);
      toast({
        title: "Success",
        description: "Event date updated successfully",
        status: "success",
        duration: 4000,
        isClosable: true,
      });
      setEventDate("");
    } catch (err) {
      toast({
        title: "Error",
        description: err.message || "Failed to update event date",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setLoading(prev => ({ ...prev, date: false }));
    }
  };

  const handleWithdraw = async () => {
    setLoading(prev => ({ ...prev, withdraw: true }));
    try {
      await withdrawamount();
      toast({
        title: "Success",
        description: "Funds withdrawn successfully",
        status: "success",
        duration: 4000,
        isClosable: true,
      });
    } catch (err) {
      toast({
        title: "Error",
        description: err.message || "Failed to withdraw funds",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setLoading(prev => ({ ...prev, withdraw: false }));
    }
  };

  return (
    <Box
      maxW="600px"
      mx="auto"
      p={6}
      bg="gray.800"
      color="white"
      borderRadius="xl"
      boxShadow="lg"
      border="1px solid"
      borderColor="gray.700"
    >
      <Heading as="h3" size="lg" mb={6} textAlign="center" color="orange.300">
        Admin Controls
      </Heading>

      <VStack spacing={6} align="stretch">
        {/* Ticket Prices Section */}
        <Box>
          <Text fontSize="md" fontWeight="semibold" mb={3} color="gray.200">
            Set Ticket Prices (ETH)
          </Text>
          <VStack spacing={3}>
            <FormControl>
              <FormLabel fontSize="sm" color="gray.400">Normal Ticket Price</FormLabel>
              <Input
                placeholder="e.g. 0.001"
                value={ticketPrize}
                onChange={(e) => setTicketPrize(e.target.value)}
                bg="gray.700"
                border="1px solid"
                borderColor="gray.600"
                _focus={{ borderColor: "orange.400" }}
              />
            </FormControl>

            <FormControl>
              <FormLabel fontSize="sm" color="gray.400">VIP Ticket Price</FormLabel>
              <Input
                placeholder="e.g. 0.004"
                value={vipPrize}
                onChange={(e) => setVipPrize(e.target.value)}
                bg="gray.700"
                border="1px solid"
                borderColor="gray.600"
                _focus={{ borderColor: "orange.400" }}
              />
            </FormControl>

            <Button
              onClick={handleSetPrizes}
              isLoading={loading.prizes}
              loadingText="Updating..."
              colorScheme="orange"
              width="full"
            >
              Update Prices
            </Button>
          </VStack>
        </Box>

        <Divider borderColor="gray.600" />

        {/* Event Date Section */}
        <Box>
          <Text fontSize="md" fontWeight="semibold" mb={3} color="gray.200">
            Set Event Date
          </Text>
          <VStack spacing={3}>
            <FormControl>
              <FormLabel fontSize="sm" color="gray.400">Event Date</FormLabel>
              <Input
                placeholder="Enter event date"
                value={eventdate}
                onChange={(e) => setEventDate(e.target.value)}
                bg="gray.700"
                border="1px solid"
                borderColor="gray.600"
                _focus={{ borderColor: "blue.400" }}
              />
            </FormControl>

            <Button
              onClick={handleSetDate}
              isLoading={loading.date}
              loadingText="Setting..."
              colorScheme="blue"
              width="full"
            >
              Set Event Date
            </Button>
          </VStack>
        </Box>

        <Divider borderColor="gray.600" />

        {/* Withdraw Section */}
        <Box>
          <Text fontSize="md" fontWeight="semibold" mb={3} color="gray.200">
            Withdraw Funds
          </Text>
          <Button
            onClick={handleWithdraw}
            isLoading={loading.withdraw}
            loadingText="Withdrawing..."
            colorScheme="green"
            width="full"
            size="lg"
          >
            Withdraw All Funds
          </Button>
        </Box>
      </VStack>
    </Box>
  );
}