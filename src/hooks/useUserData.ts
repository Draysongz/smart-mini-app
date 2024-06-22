import { useEffect, useState } from "react"
import { getUserData } from "../helper-functions/getUser"
import { useSearchParams } from "react-router-dom"
import { DocumentData } from "firebase/firestore"

function useUserData() {
  const [userData, setUserData] = useState<DocumentData>()
  const [params] = useSearchParams()
  const [isLoading, setIsLoading] = useState(true)
  useEffect(() => {
    // eslint-disable-next-line no-extra-semi
    ;(async () => {
      try {
        const userId = Number(params.get("userId"))
        const referralId = Number(params.get("referralId"))
        if (!userId) return
        const data = await getUserData(userId, referralId)
        if (!data) return
        setUserData(data)
        setIsLoading(false)
      } catch (error) {
        console.log("useUserData", error)
      }
    })()

    return () => {}
  }, [params])

  return { isLoading, userData }
}

export { useUserData }
