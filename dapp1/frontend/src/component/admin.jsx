import { useState } from "react";
import { setticketprize, seteventdate, withdrawamount } from "../interface/web3";
import { Box, Button, VStack, HStack, Text, useToast, Grid } from "@chakra-ui/react";

const labelStyle = {
  display: "block",
  fontSize: "10px",
  fontWeight: "700",
  letterSpacing: "1.5px",
  textTransform: "uppercase",
  marginBottom: "8px",
};

export default function Admin() {
  const [ticketPrize, setTicketPrize] = useState("");
  const [vipPrize, setVipPrize] = useState("");
  const [eventdate, setEventDate] = useState("");
  const [focused, setFocused] = useState("");
  const [confirmWithdraw, setConfirmWithdraw] = useState(false);
  const [loading, setLoading] = useState({ prizes: false, date: false, withdraw: false });
  const toast = useToast();

  const inp = (field, accent) => ({
    width: "100%",
    padding: "12px 16px",
    background: "rgba(255,255,255,0.04)",
    border: `1px solid ${focused === field ? accent : "rgba(255,255,255,0.1)"}`,
    borderRadius: "10px",
    color: "white",
    fontSize: "14px",
    outline: "none",
    fontFamily: "inherit",
    transition: "all 0.2s",
    boxShadow: focused === field ? `0 0 18px ${accent}30` : "none",
  });

  const handleSetPrizes = async () => {
    if (!ticketPrize || !vipPrize) {
      toast({ title: "Missing prices", status: "warning", duration: 3000, isClosable: true, position: "top-right" });
      return;
    }
    setLoading(p => ({ ...p, prizes: true }));
    try {
      await setticketprize(ticketPrize, vipPrize);
      toast({ title: "Prices updated ✅", status: "success", duration: 4000, isClosable: true, position: "top-right" });
      setTicketPrize(""); setVipPrize("");
    } catch (err) {
      toast({ title: "Failed", description: err.message, status: "error", duration: 5000, isClosable: true, position: "top-right" });
    } finally {
      setLoading(p => ({ ...p, prizes: false }));
    }
  };

  const handleSetDate = async () => {
    if (!eventdate) {
      toast({ title: "Missing date", status: "warning", duration: 3000, isClosable: true, position: "top-right" });
      return;
    }
    setLoading(p => ({ ...p, date: true }));
    try {
      await seteventdate(eventdate);
      toast({ title: "Date updated ✅", status: "success", duration: 4000, isClosable: true, position: "top-right" });
      setEventDate("");
    } catch (err) {
      toast({ title: "Failed", description: err.message, status: "error", duration: 5000, isClosable: true, position: "top-right" });
    } finally {
      setLoading(p => ({ ...p, date: false }));
    }
  };

  const handleWithdraw = async () => {
    if (!confirmWithdraw) { setConfirmWithdraw(true); return; }
    setLoading(p => ({ ...p, withdraw: true }));
    setConfirmWithdraw(false);
    try {
      await withdrawamount();
      toast({ title: "Withdrawn ✅", description: "Funds sent to your wallet", status: "success", duration: 4000, isClosable: true, position: "top-right" });
    } catch (err) {
      toast({ title: "Failed", description: err.message, status: "error", duration: 5000, isClosable: true, position: "top-right" });
    } finally {
      setLoading(p => ({ ...p, withdraw: false }));
    }
  };

  return (
    <Box w="100%" position="relative">

      <style>{`
        @keyframes fadeIn { from { opacity:0; transform:translateY(6px); } to { opacity:1; transform:translateY(0); } }
        input[type="datetime-local"]::-webkit-calendar-picker-indicator { filter: invert(0.4); cursor: pointer; }
        input::placeholder { color: rgba(255,255,255,0.18); }
        input:-webkit-autofill { -webkit-box-shadow: 0 0 0px 1000px rgba(8,6,18,1) inset !important; -webkit-text-fill-color: white !important; }
      `}</style>

      {/* ── Top row: 2 equal cards side by side ── */}
      <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap={4} mb={4}>

        {/* Ticket Prices card */}
        <Box borderRadius="18px" p="1px"
          background="linear-gradient(135deg, rgba(234,179,8,0.5), rgba(239,68,68,0.3))"
          boxShadow="0 0 40px rgba(234,179,8,0.08)">
          <Box borderRadius="17px" bg="rgba(8,6,18,0.98)" p={5} h="100%" position="relative" overflow="hidden"
            display="flex" flexDirection="column">
            <Box position="absolute" top="-40px" right="-40px" w="120px" h="120px" borderRadius="full"
              bg="radial-gradient(circle, rgba(234,179,8,0.12), transparent)" filter="blur(30px)" pointerEvents="none" />
            <Box position="absolute" bottom={0} left={0} right={0} h="1px"
              background="linear-gradient(90deg, transparent, rgba(234,179,8,0.4), transparent)" />

            <HStack spacing={3} mb={5}>
              <Box w="34px" h="34px" borderRadius="9px" bg="rgba(234,179,8,0.12)"
                border="1px solid rgba(234,179,8,0.3)" display="flex" alignItems="center" justifyContent="center" fontSize="16px">
                💰
              </Box>
              <VStack align="flex-start" spacing={0}>
                <Text fontSize="13px" fontWeight="700" color="white">Ticket Prices</Text>
                <Text fontSize="11px" color="rgba(234,179,8,0.6)">denominated in ETH</Text>
              </VStack>
            </HStack>

            <VStack spacing={3} flex={1}>
              <Box w="100%">
                <label style={{ ...labelStyle, color: "rgba(234,179,8,0.6)" }}>Normal Price</label>
                <input type="number" placeholder="e.g. 0.001" value={ticketPrize}
                  onChange={e => setTicketPrize(e.target.value)}
                  onFocus={() => setFocused("normal")} onBlur={() => setFocused("")}
                  disabled={loading.prizes} style={inp("normal", "rgba(234,179,8,0.8)")} />
              </Box>
              <Box w="100%">
                <label style={{ ...labelStyle, color: "rgba(234,179,8,0.6)" }}>VIP Price</label>
                <input type="number" placeholder="e.g. 0.004" value={vipPrize}
                  onChange={e => setVipPrize(e.target.value)}
                  onFocus={() => setFocused("vip")} onBlur={() => setFocused("")}
                  disabled={loading.prizes} style={inp("vip", "rgba(234,179,8,0.8)")} />
              </Box>
              <Box w="100%" borderRadius="11px" p="1px" mt="auto"
                background="linear-gradient(135deg, rgba(234,179,8,0.7), rgba(239,68,68,0.6))"
                boxShadow="0 0 20px rgba(234,179,8,0.15)">
                <Button onClick={handleSetPrizes} isLoading={loading.prizes} loadingText="Updating..."
                  w="100%" h="44px" borderRadius="10px" bg="rgba(8,6,18,0.95)" color="white"
                  fontSize="13px" fontWeight="600"
                  _hover={{ bg: "rgba(234,179,8,0.1)" }} _active={{ transform: "scale(0.98)" }}>
                  ⚡ Update Prices
                </Button>
              </Box>
            </VStack>
          </Box>
        </Box>

        {/* Event Date card */}
        <Box borderRadius="18px" p="1px"
          background="linear-gradient(135deg, rgba(59,130,246,0.5), rgba(6,182,212,0.3))"
          boxShadow="0 0 40px rgba(59,130,246,0.08)">
          <Box borderRadius="17px" bg="rgba(8,6,18,0.98)" p={5} h="100%" position="relative" overflow="hidden"
            display="flex" flexDirection="column">
            <Box position="absolute" top="-40px" right="-40px" w="120px" h="120px" borderRadius="full"
              bg="radial-gradient(circle, rgba(59,130,246,0.12), transparent)" filter="blur(30px)" pointerEvents="none" />
            <Box position="absolute" bottom={0} left={0} right={0} h="1px"
              background="linear-gradient(90deg, transparent, rgba(59,130,246,0.4), transparent)" />

            <HStack spacing={3} mb={5}>
              <Box w="34px" h="34px" borderRadius="9px" bg="rgba(59,130,246,0.12)"
                border="1px solid rgba(59,130,246,0.3)" display="flex" alignItems="center" justifyContent="center" fontSize="16px">
                📅
              </Box>
              <VStack align="flex-start" spacing={0}>
                <Text fontSize="13px" fontWeight="700" color="white">Event Date</Text>
                <Text fontSize="11px" color="rgba(59,130,246,0.6)">stored as on-chain timestamp</Text>
              </VStack>
            </HStack>

            <VStack spacing={3} flex={1}>
              <Box w="100%">
                <label style={{ ...labelStyle, color: "rgba(59,130,246,0.6)" }}>Date & Time</label>
                <input type="datetime-local" value={eventdate}
                  onChange={e => setEventDate(e.target.value)}
                  onFocus={() => setFocused("date")} onBlur={() => setFocused("")}
                  disabled={loading.date} style={inp("date", "rgba(59,130,246,0.8)")} />
              </Box>

              {/* Spacer keeps button flush to bottom — matches prices card height */}
              <Box flex={1} />

              <Box w="100%" borderRadius="11px" p="1px" mt="auto"
                background="linear-gradient(135deg, rgba(59,130,246,0.7), rgba(6,182,212,0.6))"
                boxShadow="0 0 20px rgba(59,130,246,0.15)">
                <Button onClick={handleSetDate} isLoading={loading.date} loadingText="Setting..."
                  w="100%" h="44px" borderRadius="10px" bg="rgba(8,6,18,0.95)" color="white"
                  fontSize="13px" fontWeight="600"
                  _hover={{ bg: "rgba(59,130,246,0.1)" }} _active={{ transform: "scale(0.98)" }}>
                  📌 Set Event Date
                </Button>
              </Box>
            </VStack>
          </Box>
        </Box>
      </Grid>

      {/* ── Full-width withdraw ── */}
      <Box borderRadius="18px" p="1px" transition="all 0.4s"
        background={confirmWithdraw
          ? "linear-gradient(135deg, rgba(239,68,68,0.8), rgba(234,179,8,0.6))"
          : "linear-gradient(135deg, rgba(34,197,94,0.4), rgba(6,182,212,0.3))"}
        boxShadow={confirmWithdraw ? "0 0 50px rgba(239,68,68,0.2)" : "0 0 40px rgba(34,197,94,0.06)"}>
        <Box borderRadius="17px" bg="rgba(8,6,18,0.98)" p={5} position="relative" overflow="hidden">
          <Box position="absolute" top="-40px" right="-40px" w="150px" h="150px" borderRadius="full"
            bg={`radial-gradient(circle, ${confirmWithdraw ? "rgba(239,68,68,0.1)" : "rgba(34,197,94,0.08)"}, transparent)`}
            filter="blur(30px)" pointerEvents="none" transition="all 0.4s" />
          <Box position="absolute" bottom={0} left={0} right={0} h="1px" transition="all 0.4s"
            background={confirmWithdraw
              ? "linear-gradient(90deg, transparent, rgba(239,68,68,0.6), transparent)"
              : "linear-gradient(90deg, transparent, rgba(34,197,94,0.4), transparent)"} />

          <HStack justify="space-between" align="center" flexWrap="wrap" gap={4}>
            <HStack spacing={3}>
              <Box w="34px" h="34px" borderRadius="9px" transition="all 0.3s"
                bg={confirmWithdraw ? "rgba(239,68,68,0.12)" : "rgba(34,197,94,0.12)"}
                border={`1px solid ${confirmWithdraw ? "rgba(239,68,68,0.3)" : "rgba(34,197,94,0.3)"}`}
                display="flex" alignItems="center" justifyContent="center" fontSize="16px">
                {confirmWithdraw ? "🔐" : "🏦"}
              </Box>
              <VStack align="flex-start" spacing={0}>
                <Text fontSize="13px" fontWeight="700" color="white">Withdraw Contract Funds</Text>
                <Text fontSize="11px" transition="all 0.3s"
                  color={confirmWithdraw ? "rgba(239,68,68,0.7)" : "rgba(34,197,94,0.6)"}>
                  {confirmWithdraw ? "⚠️ Confirm to proceed — irreversible!" : "Send all ETH to your wallet"}
                </Text>
              </VStack>
            </HStack>

            <HStack spacing={3} flexShrink={0}>
              {confirmWithdraw && (
                <Button onClick={() => setConfirmWithdraw(false)} h="44px" px={5}
                  borderRadius="10px" bg="rgba(255,255,255,0.05)"
                  border="1px solid rgba(255,255,255,0.1)"
                  color="rgba(255,255,255,0.4)" fontSize="13px"
                  _hover={{ color: "white", bg: "rgba(255,255,255,0.08)" }}
                  style={{ animation: "fadeIn 0.2s ease-out", animationName: "fadeIn" }}>
                  Cancel
                </Button>
              )}
              <Box borderRadius="11px" p="1px" transition="all 0.4s"
                background={confirmWithdraw
                  ? "linear-gradient(135deg, rgba(239,68,68,0.9), rgba(234,179,8,0.8))"
                  : "linear-gradient(135deg, rgba(34,197,94,0.7), rgba(6,182,212,0.6))"}
                boxShadow={confirmWithdraw ? "0 0 30px rgba(239,68,68,0.3)" : "0 0 20px rgba(34,197,94,0.15)"}>
                <Button onClick={handleWithdraw} isLoading={loading.withdraw} loadingText="Withdrawing..."
                  h="44px" px={7} borderRadius="10px" bg="rgba(8,6,18,0.95)" color="white"
                  fontSize="13px" fontWeight="700"
                  _hover={{ bg: confirmWithdraw ? "rgba(239,68,68,0.15)" : "rgba(34,197,94,0.1)" }}
                  _active={{ transform: "scale(0.98)" }}>
                  {confirmWithdraw ? "🔐 Confirm Withdraw" : "💸 Withdraw All Funds"}
                </Button>
              </Box>
            </HStack>
          </HStack>
        </Box>
      </Box>

      <Text fontSize="11px" color="rgba(255,255,255,0.18)" textAlign="center" mt={4}>
        🔒 Owner wallet required · All actions are on-chain and irreversible
      </Text>
    </Box>
  );
}