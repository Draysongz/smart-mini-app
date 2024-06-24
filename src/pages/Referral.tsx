import { Box, Flex, HStack, Image, Text } from "@chakra-ui/react"
import Navbar from "../components/Navbar"
import { useUserData } from "../hooks/useUserData"
// import Spinner from "../components/Spinner"

const referralData = [
  {
    name: "Phenomenal",
    status: "silver",
    earned: "6.3",
    referralEarnings: "3",
  },
  {
    name: "Knowledge",
    status: "gold",
    earned: "16.5",
    referralEarnings: "3",
  },
]

function Referral() {
  const { userData, name } = useUserData()
  // if (isLoading) {
  //   return <Spinner />
  // }
  return (
    userData && (
      <Flex h={"100%"} justify="center" align="center">
        <Box
          width={["100%", "360px"]}
          height="100%"
          bg={"gray.900"}
          position={"relative"}
          px={5}
          py={8}
          color={"white"}
        >
          <Box color={"white"}>
            <Box textAlign={"center"}>
              <Text as="h2" fontSize={"30px"} fontWeight={"bold"}>
                Invite Friends
              </Text>
              <Text as="p" fontSize={"small"} fontStyle={"italic"}>
                You and your friend will receive bonuses
              </Text>
            </Box>
          </Box>
          <Box mt={8}>
            <HStack bg="rgba(255, 255, 255, 0.1)" rounded={"20px"} p={3}>
              <Image alt="" w={"60px"} h={"60px"} src="/giftbox.png" />
              <Box>
                <Text fontWeight={"bold"}>Invite a friend</Text>
                <HStack color={"yellow.400"} fontSize={"small"}>
                  <Image alt="" src="/coin.png" w={"20px"} h={"20px"} />
                  <Text ml={"-2px"}>
                    +3000{" "}
                    <Text as={"span"} color={"white"}>
                      for you and yout friend
                    </Text>
                  </Text>
                </HStack>
              </Box>
            </HStack>
          </Box>

          <Box mt={"65px"} pb={"120px"}>
            <Box>
              <Text as={"h3"} fontWeight={"bold"} fontSize={"17px"}>
                Friend List (2)
              </Text>
            </Box>
            <Box mt={4}>
              {referralData.map((data) => (
                <Flex
                  justify={"space-between"}
                  align={"center"}
                  bg="rgba(255, 255, 255, 0.1)"
                  rounded={"20px"}
                  p={3}
                  mb={2}
                  key={data.name}
                >
                  <HStack>
                    <Image alt="" w={"35px"} h={"35px"} src="/TEDDY 1.0.png" />
                    <Box>
                      <Text fontWeight={"bold"}>{data.name}</Text>
                      <HStack align={"center"} fontSize={"small"} mt={"-2px"}>
                        {/* <Text>{data.status} </Text> */}
                        {/* <Icon as={GoDotFill} /> */}
                        <Text color={"yellow.400"}>+{data.earned}k</Text>
                      </HStack>
                    </Box>
                  </HStack>
                  <Text color={"yellow.400"}>+{data.referralEarnings}k</Text>
                </Flex>
              ))}
            </Box>
          </Box>
          <Navbar userId={userData.userId} name={name ? name : ""} />
        </Box>
      </Flex>
    )
  )
}

export default Referral
