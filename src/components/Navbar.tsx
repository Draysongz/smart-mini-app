import { Flex, Icon, Text,
  Menu,
  MenuList,
  Tooltip,
  MenuItem,


 } from "@chakra-ui/react"

import { Link } from "react-router-dom"
import { useEffect, useState } from "react"
import { GiMiner } from "react-icons/gi"
import { MdGroups } from "react-icons/md"
import { MdSpaceDashboard } from "react-icons/md"
import { IoMdWallet } from "react-icons/io"
import { BiCoin } from "react-icons/bi"
function Navbar({
  userId,
  name,
}: {
  userId: number | undefined
  name: string | null
}) {
  const [activeTab, setActiveTab] = useState("")
  console.log(name);
  console.log(userId);
  console.log(activeTab);
   const navData = [
    { icon: MdSpaceDashboard, title: "Home", link: "/" },
    { icon: GiMiner, title: "Mine", link: "/boost" },
    { icon: IoMdWallet, title: "Earn", link: "/tasks" },
         { icon: MdGroups, title: "Referrals", link: "/referral" },
          { icon: BiCoin, title: "Airdrop", link: "/airdrop" },
  ];
  useEffect(() => {
    const path = location.pathname
    if (path == "/") {
      setActiveTab("home")
    }
    if (path.includes("referral")) {
      setActiveTab("ref")
    }
    if (path.includes("boost")) {
      setActiveTab("boost")
    }
    if (path.includes("tasks")) {
      setActiveTab("tasks")
    }
  }, [])
  return (
    // <Flex justify={"center"}>
    //   <Box
    //     pos={"fixed"}
    //     display={"flex"}
    //     justifyContent={"center"}
    //     bg={"1d1d1d"}
    //     h={"90px"}
    //     w={"100%"}
    //   >
    //     <Box
    //       w={["90%", "320px"]}
    //       h={"60px"}
    //       rounded={"20px"}
    //       bg="#282828"
    //     >
    //       <Flex
    //         justify={"center"}
    //         align={"center"}
    //         gap={"5"}
    //         color={"white"}
    //         h={"100%"}
    //       >
    //         <Link
    //           to={`/?userId=${userId}&name=${name}`}
    //           onClick={() => setActiveTab("home")}
    //         >
    //           <Box
    //             textAlign={"center"}
    //             w={"50px"}
    //             bg={activeTab == "home" ? "#423c2c" : ""}
    //             rounded={"10px"}
    //             px={"8px"}
    //             py={"3px"}
    //           >
    //             <Box
    //               display={"flex"}
    //               alignItems={"center"}
    //               justifyContent={"center"}
    //             >
    //               <Image
    //                 alt=""
    //                 src="/coin.svg"
    //                 mt={"3px"}
    //                 w={"20px"}
    //                 h={"20px"}
    //               />
    //             </Box>
    //             <Text fontSize={""}>Tap</Text>
    //           </Box>
    //         </Link>
    //         <Link
    //           to={`/boost?userId=${userId}&name=${name}`}
    //           onClick={() => setActiveTab("boost")}
    //         >
    //           <Box
    //             textAlign={"center"}
    //             px={4}
    //             py={"3px"}
    //             bg={activeTab == "boost" ? "#423c2c" : ""}
    //             rounded={"10px"}
    //           >
    //             <Icon mb={"-5px"} as={FaFire} color={"gray"} />
    //             <Text fontSize={"small"}>Boost</Text>
    //           </Box>
    //         </Link>
    //         <Link
    //           to={`/tasks?userId=${userId}&name=${name}`}
    //           onClick={() => setActiveTab("earn")}
    //         >
    //           <Box
    //             textAlign={"center"}
    //             px={4}
    //             py={"3px"}
    //             bg={activeTab == "earn" ? "#423c2c" : ""}
    //             rounded={"10px"}
    //           >
    //             <Icon mb={"-5px"} as={BiCoinStack} color={"gray"} />
    //             <Text fontSize={"small"}>Earn</Text>
    //           </Box>
    //         </Link>
    //         <Link
    //           to={`/referral?userId=${userId}&name=${name}`}
    //           onClick={() => setActiveTab("ref")}
    //         >
    //           <Box
    //             textAlign={"center"}
    //             px={4}
    //             py={"3px"}
    //             bg={activeTab == "ref" ? "#423c2c" : ""}
    //             rounded={"10px"}
    //           >
    //             <Icon mb={"-5px"} as={FaUserGroup} color={"gray"} />
    //             <Text fontSize={""}>Ref</Text>
    //           </Box>
    //         </Link>
    //         <Link to="/status">
    //           <Box textAlign={"center"} px={4}>
    //             <Icon mb={"-5px"} as={BiCoinStack} color={"gray"} />
    //             <Text fontSize={""}>Stats</Text>
    //           </Box>
    //         </Link>
    //       </Flex>
    //     </Box>
    //   </Box>
    // </Flex>
      <Flex
          position="fixed"
          bottom={0}
          left={0}
          right={0}
          p={5}
          bg={"#204d3d"}
          justifyContent="space-around"
          zIndex={1}
           border={"2px solid #e7bd52"}
          borderBottomRadius={"10px"}
        >
          {navData.slice(0, 5).map((item, index) => (
            <Tooltip
              label={`${index == 1 ? "Coming soon" : ""}`}
              hasArrow={index == 1 ? true : false}
              placement="top"
            >
              <Flex
                key={item.title}
                flexDir="column"
                align="center"
                as={Link}
                to={item.link}
                
              >
                <Icon color={"white"} as={item.icon} boxSize={5} mb={2} />
                <Text color={"white"} fontSize={{ base: "xs", md: "md" }}>{item.title}</Text>
              </Flex>
              
            </Tooltip>
          ))}

          <Menu isLazy>
          
            <MenuList>
              <MenuItem as={Link} to={"/referrals"}>
                Referrals
              </MenuItem>

              <MenuItem as={Link} to={'/withdraw'}>
                Withdrawal
              </MenuItem>
              <MenuItem >

                </MenuItem>
            </MenuList>
          </Menu>
          
        </Flex>
  )
}
export default Navbar
