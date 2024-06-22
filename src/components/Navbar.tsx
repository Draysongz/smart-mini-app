import { Flex, Box, Image, Icon, Text } from "@chakra-ui/react"
import { FaUserGroup } from "react-icons/fa6"
import { FaChartBar } from "react-icons/fa"
import { Link } from "react-router-dom"
function Navbar({ userId }: { userId: number }) {
  return (
    <Flex justify={"center"}>
      <Box
        pos={"fixed"}
        display={"flex"}
        justifyContent={"center"}
        bg={"gray.900"}
        bottom={"0"}
        h={"90px"}
        w={"100%"}
      >
        <Box
          w={["90%", "320px"]}
          h={"60px"}
          rounded={"20px"}
          bg="rgba(255, 255, 255, 0.1)"
        >
          <Flex
            justify={"center"}
            align={"center"}
            gap={"5"}
            color={"white"}
            h={"100%"}
          >
            <Link to={`/?userId=${userId}`}>
              <Box textAlign={"center"} w={"50px"}>
                <Box
                  display={"flex"}
                  alignItems={"center"}
                  justifyContent={"center"}
                >
                  <Image alt="" src="/coin.png" w={"20px"} h={"20px"} />
                </Box>
                <Text fontSize={"small"}>Tap</Text>
              </Box>
            </Link>
            <Link to={`/referral?userId=${userId}`}>
              <Box textAlign={"center"} px={4}>
                <Icon mb={"-5px"} as={FaUserGroup} color={"gray"} />
                <Text fontSize={"small"}>Ref</Text>
              </Box>
            </Link>
            {/* <Box textAlign={"center"} px={4}>
            <Icon mb={"-5px"} as={FaFire} color={"gray"} />
            <Text fontSize={"small"}>Boost</Text>
          </Box> */}
            <Link to="">
              <Box textAlign={"center"} px={4}>
                <Icon mb={"-5px"} as={FaChartBar} color={"gray"} />
                <Text fontSize={"small"}>Stats</Text>
              </Box>
            </Link>
          </Flex>
        </Box>
      </Box>
    </Flex>
  )
}
export default Navbar
