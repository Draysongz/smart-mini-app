import { Box, Flex, Text } from "@chakra-ui/react"
import Navbar from "./Navbar"

function ComingSoon({
  userId,
  name,
}: {
  userId: number | undefined
  name: string | null
}) {
  return (
    <Box h={"100%"}>
      <Flex
        h={"100%"}
        bg={"gray.900"}
        color={"#fff"}
        justify={"center"}
        align={"center"}
      >
        <Text fontSize={"25px"} fontWeight={"bold"}>
          Coming soon...
        </Text>
      </Flex>

      <Navbar userId={userId} name={name} />
    </Box>
  )
}

export default ComingSoon
