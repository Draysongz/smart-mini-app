import { Box, Text } from "@chakra-ui/react"
import { ClipLoader } from "react-spinners"

function Spinner() {
  return (
    // <Flex
    //   bg={"url(/splash.jpg)"}
    //   bgRepeat={"no-repeat"}
    //   bgSize={"cover"}
    //   bgPos={"center"}
    //   h={"100%"}
    //   overflow={"hidden"}
    //   justify={"center"}
    //   align={"center"}
    // >
    //   <Box textAlign={"center"}>
    //     <ClipLoader color="#3182CE" size={70} />
    //     <Text color={"white"} fontSize={"25px"} fontWeight={"bold"}>
    //       Loading...
    //     </Text>
    //   </Box>
    // </Flex>

       <section className="relative h-screen w-full overflow-hidden">
        <video autoPlay loop muted playsInline className="absolute inset-0 h-full w-full object-cover">
          <source src="/celeb.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-[#333]/50" />
        <div className="relative z-10 flex h-full w-full flex-col items-center justify-center space-y-6 px-4 text-center text-white">
        <Box textAlign={"center"}>
        <ClipLoader color="#3182CE" size={70} />
        <Text color={"white"} fontSize={"25px"} fontWeight={"bold"}>
          Loading...
        </Text>
       </Box>
        </div>
      </section>
  )
}

export default Spinner
