import { Box, Heading, Text, HStack, VStack, Flex } from "@chakra-ui/react";

const SocialLink = ({ href, icon, label, gradient, glow }) => (
  <Box
    as="a"
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    position="relative"
    borderRadius="14px"
    p="1px"
    background={gradient}
    boxShadow={glow}
    transition="all 0.25s"
    _hover={{ transform: "translateY(-3px)", boxShadow: glow.replace("0.15", "0.4") }}
    _active={{ transform: "scale(0.97)" }}
    textDecoration="none"
    display="block"
  >
    <Flex
      borderRadius="13px"
      bg="rgba(6,4,14,0.97)"
      backdropFilter="blur(16px)"
      px={6} py={4}
      align="center"
      justify="space-between"
      gap={8}
      position="relative"
      overflow="hidden"
    >
      {/* bg glow blob */}
      <Box
        position="absolute"
        right="-20px" bottom="-20px"
        w="80px" h="80px"
        borderRadius="full"
        bg={gradient}
        opacity={0.08}
        filter="blur(20px)"
        pointerEvents="none"
      />

      <HStack spacing={3}>
        <Text fontSize="20px">{icon}</Text>
        <Text fontSize="14px" fontWeight="700" color="white" letterSpacing="0.3px">
          {label}
        </Text>
      </HStack>

      {/* Arrow circle */}
      <Box
        w="28px" h="28px"
        borderRadius="full"
        p="1px"
        background={gradient}
        flexShrink={0}
      >
        <Flex
          w="100%" h="100%"
          borderRadius="full"
          bg="rgba(6,4,14,0.9)"
          align="center"
          justify="center"
          fontSize="12px"
          color="white"
        >
          ↗
        </Flex>
      </Box>
    </Flex>
  </Box>
);

export default function CTA2() {
  const links = [
    {
      href: "https://github.com/ritesh-2008",
      icon: "🐙",
      label: "GitHub",
      gradient: "linear-gradient(135deg, rgba(168,85,247,0.8), rgba(99,102,241,0.8))",
      glow: "0 0 30px rgba(168,85,247,0.15)",
    },
    {
      href: "https://x.com/RVanivdekar",
      icon: "𝕏",
      label: "Twitter / X",
      gradient: "linear-gradient(135deg, rgba(255,255,255,0.4), rgba(148,163,184,0.4))",
      glow: "0 0 30px rgba(255,255,255,0.08)",
    },
    {
      href: "https://www.linkedin.com/in/ritesh-vanivdekar-364796336/",
      icon: "💼",
      label: "LinkedIn",
      gradient: "linear-gradient(135deg, rgba(59,130,246,0.8), rgba(6,182,212,0.7))",
      glow: "0 0 30px rgba(59,130,246,0.15)",
    },
  ];

  return (
    <Box maxW="680px" mx="auto" position="relative">

      <style>{`
        @keyframes shimmer-cta {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        @keyframes float-slow {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-12px); }
        }
      `}</style>

      {/* Outer glow border card */}
      <Box
        position="relative"
        borderRadius="24px"
        p="1px"
        background="linear-gradient(135deg, rgba(168,85,247,0.5), rgba(236,72,153,0.4), rgba(59,130,246,0.5))"
        boxShadow="0 0 80px rgba(168,85,247,0.1), 0 0 40px rgba(59,130,246,0.08)"
        overflow="hidden"
      >
        {/* Shimmer top line */}
        <Box
          position="absolute"
          top={0} left={0} right={0}
          h="1px"
          background="linear-gradient(90deg, transparent, rgba(168,85,247,0.8), rgba(236,72,153,0.8), rgba(59,130,246,0.8), transparent)"
          backgroundSize="200% auto"
          style={{ animation: "shimmer-cta 3s linear infinite" }}
          zIndex={2}
        />

        <Box
          borderRadius="23px"
          bg="rgba(6,4,14,0.98)"
          backdropFilter="blur(20px)"
          p={{ base: 6, md: 10 }}
          position="relative"
          overflow="hidden"
        >
          {/* Decorative orbs */}
          <Box
            position="absolute"
            top="-60px" right="-60px"
            w="200px" h="200px"
            borderRadius="full"
            bg="radial-gradient(circle, rgba(168,85,247,0.15), transparent)"
            filter="blur(40px)"
            pointerEvents="none"
            style={{ animation: "float-slow 7s ease-in-out infinite" }}
          />
          <Box
            position="absolute"
            bottom="-40px" left="-40px"
            w="160px" h="160px"
            borderRadius="full"
            bg="radial-gradient(circle, rgba(59,130,246,0.12), transparent)"
            filter="blur(30px)"
            pointerEvents="none"
            style={{ animation: "float-slow 9s ease-in-out infinite reverse" }}
          />

          <Flex
            direction={{ base: "column", md: "row" }}
            align={{ base: "flex-start", md: "center" }}
            justify="space-between"
            gap={8}
            position="relative"
            zIndex={1}
          >
            {/* Left — text */}
            <VStack align="flex-start" spacing={3} maxW="280px">
              <HStack spacing={2}>
                <Box w="24px" h="1px" bg="linear-gradient(90deg, transparent, rgba(168,85,247,0.7))" />
                <Text
                  fontSize="10px"
                  fontWeight="700"
                  letterSpacing="2px"
                  color="rgba(168,85,247,0.7)"
                  textTransform="uppercase"
                >
                  Let's Connect
                </Text>
              </HStack>

              <Heading
                fontSize={{ base: "26px", md: "32px" }}
                fontWeight="800"
                letterSpacing="-1px"
                lineHeight="1.15"
                bgGradient="linear(to-br, white 30%, rgba(255,255,255,0.5))"
                bgClip="text"
              >
                Let's Build Something Great
              </Heading>

              <Text fontSize="14px" color="rgba(255,255,255,0.4)" lineHeight="1.7">
                Open for collaboration, networking, or just a good chat. Find me across the web.
              </Text>

              {/* Status indicator */}
              <HStack spacing={2} mt={1}>
                <Box
                  w="7px" h="7px"
                  borderRadius="full"
                  bg="#22c55e"
                  boxShadow="0 0 8px rgba(34,197,94,0.8)"
                  style={{ animation: "float-slow 2s ease-in-out infinite" }}
                />
                <Text fontSize="12px" color="rgba(34,197,94,0.8)" fontWeight="600">
                  Available for opportunities
                </Text>
              </HStack>
            </VStack>

            {/* Right — links */}
            <VStack spacing={3} w={{ base: "100%", md: "300px" }} flexShrink={0}>
              {links.map((link) => (
                <SocialLink key={link.label} {...link} />
              ))}
            </VStack>
          </Flex>
        </Box>
      </Box>
    </Box>
  );
}