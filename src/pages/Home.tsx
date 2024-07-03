import { useEffect, useState } from "react"
import {
  Flex,
  Box,
  Image,
  Text,
  Icon,
  Spinner,
} from "@chakra-ui/react"
import { keyframes } from "@emotion/react"
// import WebApp from "@twa-dev/sdk"

import Navbar from "../components/Navbar"
import { useStaticUserData } from "../hooks/useUserData"
import { updateUserData } from "../helper-functions/getUser"
import { FaUser } from "react-icons/fa6"
import { Link, useSearchParams } from "react-router-dom"

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

  const { userData } = useStaticUserData(userId, name, referralId)

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
          bg="#1d1d1d"
          h={"100%"}
          roundedTop={"30px"}
          px={5}
          py={8}
          pos={"relative"}
        >
          <Flex align={"center"} justify={"center"} gap={2} pb={2}>
            <Image alt="coin" src="/coin.svg" w={"40px"} h={"40px"} />
            <Text color={"white"} fontSize={"25px"}>
              {coinsEarned.toLocaleString()}
            </Text>
          </Flex>

          <Flex justify={"center"} align={"center"}>
          <Image alt="coin" src="/speedometer.svg" w={"30px"} h={"30px"} mr={"1"} />
                <Text fontWeight={"bold"} fontSize={"18px"} color={"#fff"}>
                  {floatingEnergy}/
                  <Text as={"span"} fontSize={"16px"}>
                    {tappingEnergy}
                  </Text>
                </Text>
          </Flex>

          <Flex align={"center"} justify={"center"} mt={"30px"} px={5}>
            <Box
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
                h={"120%"}
                w={"120%"}
                rounded={"full"}
              >
                <Image alt="" src="/mini.svg" width={480} height={480} />
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
            bg={"#1d1d1d"}
            bottom={"20"}
            h={"135px"}
            w={["100%", "320px"]}
            overflowY={"hidden"}
          >
            <Link to={"/boost"}>
            <Box w={["90%", "100%"]}>
              <Flex justify={"center"} align={"center"}>
                <Text fontWeight={"bold"} fontSize={"18px"} color={"#000"} bgColor={"#fbce47"} border={"1"} borderColor={"#1d1d1d"} px={"8"} py={"3"} rounded={"full"}>
                  Boost
                </Text>
              </Flex>
              {/* <Progress
                rounded={"10px"}
                value={(floatingEnergy / tappingEnergy) * 100}
                min={0}
              /> */}
            </Box>
            </Link>
          </Box>
        </Flex>
        <Navbar userId={userData.userId} name={name ? name : ""} />
      </Box>
    </Flex>
  )
}
export default Home
