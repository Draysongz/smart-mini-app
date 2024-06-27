import { useEffect, useState } from "react"
import { getUserData } from "../helper-functions/getUser"
import { DocumentData } from "firebase/firestore"

function useUserData(
  userId: number | undefined,
  firstName: string | null,
  referralId?: number
) {
  const [userData, setUserData] = useState<DocumentData>()
  const [isLoading, setIsLoading] = useState(true)
  const [name, setName] = useState<string | null>(null)
  useEffect(() => {
    // eslint-disable-next-line no-extra-semi
    ;(async () => {
      try {
        // const userId = Number(params.get("userId"))
        // const referralId = Number(params.get("referralId"))
        // const firstName = params.get("name")
        if (!userId) return
        if (!firstName) return
        const data = await getUserData(userId, firstName, referralId)
        if (!data) return
        setUserData(data)
        setName(firstName)
        setIsLoading(false)
      } catch (error) {
        console.log("useUserData", error)
      }
    })()

    return () => {}
  }, [userId, firstName, referralId])

  return { isLoading, userData, name }
}

export { useUserData }
