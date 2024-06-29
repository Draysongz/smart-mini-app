import { useEffect, useState } from "react"
import {
  Flex,
  Box,
  Image,
  Text,
  Progress,
  Icon,
  Spinner,
} from "@chakra-ui/react"
import { keyframes } from "@emotion/react"
// import WebApp from "@twa-dev/sdk"

import Navbar from "../components/Navbar"
import { useUserData } from "../hooks/useUserData"
import { updateUserData } from "../helper-functions/getUser"
import { FaUser } from "react-icons/fa6"
import { FcFlashOn } from "react-icons/fc"
import { Link, useSearchParams } from "react-router-dom"
import { IoIosArrowForward } from "react-icons/io"
import { TfiCup } from "react-icons/tfi"
const floatUpAndFadeOut = keyframes`
  0% {
    transform: translateY(0px);
    opacity: 1;
  }
  100% {
    transform: translateY(-100px);
    opacity: 0;
  }
`

const rotateCoinLeft = keyframes`
  0% {
    transform: rotateY(0deg)
  }
  100% {
    transform: rotateY(20deg)
  }
`

const rotateCoinRight = keyframes`
  0% {
    transform: rotateY(0deg)
  }
  100% {
    transform: rotateY(-20deg)
  }
`
function Home({
  userId,
  name,
}: {
  userId: number | undefined
  name: string | null
}) {
  const [floatingEnergy, setFloatingEnergy] = useState(0)
  const [coinsEarned, setCoinsEarned] = useState(0)
  const [tappingEnergy, setTappingEnergy] = useState(0)
  const [tappingPower, setTappingPower] = useState(0)
  const [params] = useSearchParams()
  const [rotateAnim, setRotateAnim] = useState("")

  // const userId = Number(params.get("userId"))
  const referralId = Number(params.get("referralId"))
  // const firstName = params.get("name")

  const { userData } = useUserData(userId, name, referralId)

  const [screenAxis, setScreenAxis] = useState<
    { x: number; y: number; id: number }[]
  >([])

  const handleTap = async (clientX: number, clientY: number) => {
    if (!userId) return
    if (floatingEnergy - tappingPower <= 0) return

    setFloatingEnergy((curr) => curr - tappingPower)
    setCoinsEarned((coins) => coins + tappingPower)
    setScreenAxis((prv) => [...prv, { x: clientX, y: clientY, id: Date.now() }])
    if (clientX < 170) {
      setRotateAnim(() => rotateCoinLeft)
    } else if (clientX > 230) {
      setRotateAnim(() => rotateCoinRight)
    }

    // update coins in db
    // const userId = userData.userId
    await updateUserData(userId, {
      coinsEarned: coinsEarned + tappingPower,
      floatingTapEnergy: floatingEnergy - tappingPower,
    })
  }

  const removeScreen = (id: number) => {
    setScreenAxis(screenAxis.filter((screen) => screen.id !== id))
  }

  useEffect(() => {
    if (!userData) return
    const timeLost = calculateLostTime()
    setCoinsEarned(() => userData.coinsEarned)
    setTappingEnergy(() => userData.tapEnergy)
    const energyPerSec = userData.refillEnergy / userData.refillTime
    const energyLost: number =
      userData.floatingTapEnergy + energyPerSec * timeLost
    if (timeLost >= 3) {
      if (Number(energyLost.toFixed(0)) >= userData.tapEnergy) {
        setFloatingEnergy(() => userData.tapEnergy)
      } else {
        setFloatingEnergy(() => Number(energyLost.toFixed(0)))
      }
    } else {
      setFloatingEnergy(() => userData.floatingTapEnergy)
    }
    //setFloatingEnergy(() => userData.floatingTapEnergy)
    // setRefillEnergy(userData.refilEnergy)
    setTappingPower(() => userData.tapPower)
    // setUserId(userData.userId)
    return () => {}
  }, [userData])

  useEffect(() => {
    if (!userData) return
    setInterval(() => {
      setFloatingEnergy((curr) => {
        if (curr + userData.refillEnergy >= userData.tapEnergy)
          return userData.tapEnergy
        return curr + userData.refillEnergy
      })
    }, 3000)
    return () => {}
  }, [userData])

  useEffect(() => {
    if (!userId) return
    ;(async () => {
      await updateUserData(userId, {
        floatingTapEnergy: floatingEnergy,
        lastUpdatedTime: Date.now() / 1000,
      })
    })()
    return () => {}
  }, [floatingEnergy, userId])

  const calculateLostTime = (): number => {
    const lastUpdate = userData?.lastUpdatedTime
    const timeNowInSeconds = Date.now() / 1000
    return timeNowInSeconds - lastUpdate
  }

  return !userData ? (
    <Flex height="100%" justify="center" overflow={"hidden"} align="center">
      <Spinner color="gray.500" />
    </Flex>
  ) : (
    <Flex height="100%" justify="center" overflow={"hidden"} align="center">
      <Box width={["100%", "360px"]} height="100%" bg={"black"}>
        <Box p={5} fontWeight="bold" color="white">
          {<Icon as={FaUser} />} {name ? name : ""}
        </Box>

        <Box
          bg="gray.900"
          h={"100%"}
          roundedTop={"30px"}
          px={5}
          py={8}
          pos={"relative"}
        >
          <Flex align={"center"} justify={"center"} gap={2}>
            <Image alt="coin" src="/coin.png" w={"40px"} h={"40px"} />
            <Text color={"white"} fontSize={"25px"}>
              {coinsEarned.toLocaleString()}
            </Text>
          </Flex>

          <Flex justify={"center"} align={"center"}>
            <Link to={"status"}>
              <Flex color={"#fff"} justify={"center"} align={"center"} mt={3}>
                <Icon as={TfiCup} mr={2} />
                <Text fontSize={"20px"} color={"gray.400"}>
                  Silver
                </Text>
                <Icon as={IoIosArrowForward} />
              </Flex>
            </Link>
          </Flex>

          <Flex align={"center"} justify={"center"} mt={"30px"} px={5}>
            <Box
              bgGradient="linear(to-t, blue.900, blue.600)"
              h={"280px"}
              w={"280px"}
              rounded={"full"}
              display={"flex"}
              justifyContent={"center"}
              alignItems={"center"}
              position={"relative"}
              onTouchStart={async (e) =>
                await handleTap(e.touches[0].clientX, e.touches[0].clientY)
              }
              animation={`${rotateAnim} 0.1s ease `}
              onAnimationEnd={() => setRotateAnim("")}
            >
              <Box
                bg={"rgba(0,0,0,0)"}
                rounded={"full"}
                h={"100%"}
                w={"100%"}
                pos={"absolute"}
                zIndex={"10"}
              ></Box>
              <Box
                bgGradient="radial(blue.600, blue.800, blue.900)"
                h={"90%"}
                w={"90%"}
                rounded={"full"}
              >
                <Image alt="" src="/mini.svg" />
              </Box>
            </Box>
          </Flex>
          {/* <Button onClick={showAlert}>Show alert</Button> */}
        </Box>

        {screenAxis.map((screen) => (
          <Text
            key={screen.id}
            position={"absolute"}
            left={`${screen.x - 10}px`}
            top={`${screen.y}px`}
            color={"white"}
            as={"p"}
            animation={`${floatUpAndFadeOut} 1s ease forwards`}
            onAnimationEnd={() => removeScreen(screen.id)}
            zIndex={"5"}
            fontSize={"30px"}
          >
            +{tappingPower}
          </Text>
        ))}

        <Flex justify={"center"}>
          <Box
            pos={"fixed"}
            display={"flex"}
            justifyContent={"center"}
            bg={"gray.900"}
            bottom={"0"}
            h={"135px"}
            w={["100%", "320px"]}
            overflowY={"hidden"}
          >
            <Box w={["90%", "100%"]}>
              <Flex justify={"center"} align={"center"}>
                <Icon boxSize={6} mr={"-4px"} as={FcFlashOn} />
                <Text fontWeight={"bold"} fontSize={"18px"} color={"#fff"}>
                  {floatingEnergy}/
                  <Text as={"span"} fontSize={"16px"}>
                    {tappingEnergy}
                  </Text>
                </Text>
              </Flex>
              <Progress
                rounded={"10px"}
                value={(floatingEnergy / tappingEnergy) * 100}
                min={0}
              />
            </Box>
          </Box>
        </Flex>
        <Navbar userId={userData.userId} name={name ? name : ""} />
      </Box>
    </Flex>
  )
}
export default Home
