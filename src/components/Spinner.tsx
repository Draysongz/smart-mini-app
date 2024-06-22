import { Flex } from "@chakra-ui/react"
import { ClimbingBoxLoader } from "react-spinners"

function Spinner() {
  return (
    <Flex
      bg={"gray.900"}
      h={"100%"}
      overflow={"hidden"}
      justify={"center"}
      align={"center"}
    >
      <ClimbingBoxLoader color="#3182CE" />
    </Flex>
  )
}

export default Spinner
