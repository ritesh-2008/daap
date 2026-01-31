import { Box, Heading, Text, Stack, HStack, Button, Flex } from "@chakra-ui/react";

export default function CTA2() {
  return (
    <Box
      position="relative"
      w="full"
      maxW="4xl"
      mx="auto"
      overflow="hidden"
      borderRadius="2xl"
      bgGradient="linear(to-r, orange.500, orange.400)"
      p={{ base: 6, sm: 8, md: 12 }}
    >
      {/* Decorative circles */}
      <Box
        position="absolute"
        right="-10%"
        top="50%"
        transform="translateY(-50%)"
        pointerEvents="none"
      >
        <Box
          position="absolute"
          right="0"
          top="0"
          w={{ base: "200px", md: "420px", lg: "520px" }}
          h={{ base: "200px", md: "420px", lg: "520px" }}
          borderRadius="full"
          bg="rgba(255,255,255,0.06)"
          filter="blur(40px)"
        />
        <Box
          position="absolute"
          right="30px"
          top="40px"
          w={{ base: "140px", md: "320px", lg: "380px" }}
          h={{ base: "140px", md: "320px", lg: "380px" }}
          borderRadius="full"
          bg="rgba(255,255,255,0.04)"
          filter="blur(24px)"
        />
      </Box>

      {/* Content */}
      <Flex direction="column" zIndex="1">
        <Heading
          as="h2"
          color="white"
          fontSize={{ base: "2xl", md: "3xl", lg: "4xl" }}
          mb={{ base: 3, md: 4 }}
          fontWeight="bold"
        >
          Let&apos;s Get In Touch.
        </Heading>

        <Text color="whiteAlpha.900" maxW={{ base: "full", md: "60%" }} mb={{ base: 4, md: 6 }}>
          Your laboratory instruments should serve you, not the other way around. We&apos;re happy to help you.
        </Text>

        <Stack direction={{ base: "column", sm: "row" }} spacing={{ base: 3, sm: 4 }} mt={2}>
          <Button
            bg="black"
            color="white"
            rounded="full"
            px={6}
            py={4}
            _hover={{ bg: "gray.800" }}
            minW={{ sm: "240px" }}
            justifyContent="space-between"
            as="a"
            href="https://github.com/ritesh-2008"
            target="_blank"
          >
            <Box as="span" fontWeight="medium">
              Github
            </Box>
            <Box ml={3} w="6" h="6" borderRadius="full" bg="white" />
          </Button>

          <Button
            bg="black"
            color="white"
            rounded="full"
            px={6}
            py={4}
            _hover={{ bg: "gray.800" }}
            minW={{ sm: "240px" }}
            justifyContent="space-between"
            as="a"
            href="https://x.com/RVanivdekar"
            target="_blank"
          >
            <Box as="span" fontWeight="medium">
              Twitter(x)
            </Box>
            <Box ml={3} w="6" h="6" borderRadius="full" bg="white" />
          </Button>
              <Button
            bg="black"
            color="white"
            rounded="full"
            px={6}
            py={4}
            _hover={{ bg: "gray.800" }}
            minW={{ sm: "240px" }}
            justifyContent="space-between"
            as="a"
            href="https://www.linkedin.com/in/ritesh-vanivdekar-364796336/"
            target="_blank"
          >
            <Box as="span" fontWeight="medium">
              LinkedIn
            </Box>
            <Box ml={3} w="6" h="6" borderRadius="full" bg="white" />
          </Button>
        </Stack>
      </Flex>
    </Box>
  );
}
