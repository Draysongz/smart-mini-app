import { Box, Flex, HStack, Icon, Image, Text, Spinner } from "@chakra-ui/react"
import Navbar from "../components/Navbar"
import { useUserData } from "../hooks/useUserData"
import { getQuerySnapshot } from "../helper-functions/getUser"
import { useEffect, useState } from "react"
import { DocumentData } from "firebase/firestore"
import { FaRegCopy } from "react-icons/fa6"
import { useSearchParams } from "react-router-dom"
// import Spinner from "../components/Spinner"

// const referralData = [
//   {
//     name: "Phenomenal",
//     status: "silver",
//     earned: "6.3",
//     referralEarnings: "3",
//   },
//   {
//     name: "Knowledge",
//     status: "gold",
//     earned: "16.5",
//     referralEarnings: "3",
//   },
// ]

async function getRef(userId: number) {
  const qs = await getQuerySnapshot(userId)
  if (qs.empty) {
    console.log("User does not exist")
    return
  }
  const data = qs.docs[0].data()
  return data
}

function Referral() {
  const [params] = useSearchParams()
  const userId = Number(params.get("userId"))
  const referralId = Number(params.get("referralId"))
  const firstName = params.get("name")
  const { userData, name } = useUserData(userId, firstName, referralId)
  const [referredUsers, setReferredUsers] = useState<DocumentData[]>()

  useEffect(() => {
    async function getReferredUsers() {
      if (!userData) return
      const qs = await getQuerySnapshot(Number(userData.userId))
      if (qs.empty) {
        console.log("User does not exist")
        return
      }
      const data = qs.docs[0].data()
      const referrals = data.referrals
      setReferredUsers(() => [])
      referrals.forEach(async (refId: number) => {
        const data = await getRef(refId)
        if (data) {
          setReferredUsers((ref) => {
            if (ref) {
              return [...ref, data]
            }
            return [data]
          })
        }
      })
    }

    getReferredUsers()

    return () => {}
  }, [userData])

  function handleCopy() {
    try {
      navigator.clipboard.writeText(
        `https://t.me/barnicoin_bot/?start=${userId}`
      )
    } catch (err) {
      console.log(err)
    }
  }

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
                      for you and your frien
                    </Text>
                  </Text>
                </HStack>
              </Box>
            </HStack>

            <Flex justify={"space-between"} gap={2} mt={"10px"}>
              <Box
                rounded={"15px"}
                p={3}
                bg="blue.800"
                textAlign={"center"}
                fontWeight={"bold"}
                w={"100%"}
              >
                <Text>Invite a friend</Text>
              </Box>
              <Box
                w={"60px"}
                bg={"blue.800"}
                display={"flex"}
                justifyContent={"center"}
                alignItems={"center"}
                rounded={"15px"}
                cursor={"pointer"}
                onClick={handleCopy}
                _hover={{ width: "70px" }}
                transition={"width 0.5s ease"}
              >
                <Icon as={FaRegCopy} />
              </Box>
            </Flex>
          </Box>

          <Box mt={"65px"} pb={"120px"}>
            <Box>
              <Text as={"h3"} fontWeight={"bold"} fontSize={"17px"}>
                Friend List ({referredUsers?.length})
              </Text>
            </Box>
            <Box mt={4}>
              {!referredUsers && (
                <Flex justify={"center"}>
                  <Spinner />
                </Flex>
              )}
              {referredUsers?.map((data) => (
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
                        <Image alt="" src="/coin.png" w={"20px"} h={"20px"} />
                        <Text color={"yellow.400"} ml={"-5px"}>
                          {Math.round(data.coinsEarned)}
                        </Text>
                      </HStack>
                    </Box>
                  </HStack>
                  <Text color={"yellow.400"}>+{3}k</Text>
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
