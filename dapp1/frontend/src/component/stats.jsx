import {
  checkticket,
  checkvipticket,
  soldticket,
  soldvipticket
} from "../interface/web3";
import { useState, useEffect } from "react";
import {
  Box,
  Button,
  Heading,
  Text,
  VStack,
  HStack,
  Stat,
  StatLabel,
  StatNumber,
  StatGroup,
  useColorModeValue,
  Spinner,
  Center
} from "@chakra-ui/react";


export default function Stats() {
  const [data, setData] = useState({});
  const [showStats, setShowStats] = useState(false);
  const [loading, setLoading] = useState(false);

  const cardBg = useColorModeValue("whiteAlpha.800", "blackAlpha.400");

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
    } catch (err) {
      console.error("Failed to fetch stats:", err);
      setData({});
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Box maxW="720px" mx="auto" mt={6} bottomMargin={4} px={4}>
      <HStack justify="space-between" mb={4}>
        <Heading size="md"color={"blue"} >Event Stats</Heading>
        <Button
          onClick={() => {
            setShowStats(!showStats);
            if (!showStats) fetchData();
          }}
          colorScheme="purple"
          size="sm"
        >
          {showStats ? "Hide" : "Show"} Stats
        </Button>
      </HStack>

      {showStats && (
        <Box
          bg={cardBg}
          borderRadius="lg"
          p={5}
          boxShadow="md"
        >
          {loading ? (
            <Center py={6}>
              <Spinner size="lg" color="purple.400" />
            </Center>
          ) : (
            <VStack spacing={4} align="stretch">
              <StatGroup>
                <Stat>
                  <StatLabel>Sold Normal Tickets</StatLabel>
                  <StatNumber>{data.soldNormalTickets ?? "-"}</StatNumber>
                </Stat>

                <Stat>
                  <StatLabel>Sold VIP Tickets</StatLabel>
                  <StatNumber>{data.soldVipTickets ?? "-"}</StatNumber>
                </Stat>
              </StatGroup>

              <HStack spacing={6} pt={2}>
                <Box flex="1">
                  <Text fontSize="sm" color="gray.400">Your Normal Tickets</Text>
                  <Text fontWeight="semibold" fontSize="lg">{data.userNormalTicket ?? 0}</Text>
                </Box>

                <Box flex="1">
                  <Text fontSize="sm" color="gray.400">Your VIP Tickets</Text>
                  <Text fontWeight="semibold" fontSize="lg">{data.userVipTicket ?? 0}</Text>
                </Box>
              </HStack>

              <HStack pt={3} justify="flex-end">
                <Button size="sm" onClick={fetchData} colorScheme="teal" variant="outline">
                  Refresh
                </Button>
              </HStack>
            </VStack>
          )}
        </Box>
      )}
    </Box>
  );
}
