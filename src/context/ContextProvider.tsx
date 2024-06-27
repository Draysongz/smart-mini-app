import { ReactNode, createContext, useContext, useState } from "react"
import { useUserData } from "../hooks/useUserData"
import { updateUserData } from "../helper-functions/getUser"

const Context = createContext({})

function ContextProvdider({
  userId,
  firstName,
  referralId,
  children,
}: {
  userId: number | undefined
  firstName: string | null
  referralId: number
  children: ReactNode
}) {
  const [floatingEnergy, setFloatingEnergy] = useState(0)
  const [coinsEarned, setCoinsEarned] = useState(0)
  const [tappingEnergy, setTappingEnergy] = useState(0)
  const [tappingPower, setTappingPower] = useState(0)

  const [screenAxis, setScreenAxis] = useState<
    { x: number; y: number; id: number }[]
  >([])
  const { isLoading, userData, name } = useUserData(
    userId,
    firstName,
    referralId
  )

  const handleTap = async (clientX: number, clientY: number) => {
    if (!userId) return
    if (floatingEnergy - tappingPower <= 0) return
    setFloatingEnergy((curr) => curr - tappingPower)
    setCoinsEarned((coins) => coins + tappingPower)
    setScreenAxis((prv) => [...prv, { x: clientX, y: clientY, id: Date.now() }])

    // update coins in db
    // const userId = userData.userId
    await updateUserData(userId, {
      coinsEarned: coinsEarned + 5,
      floatingTapEnergy: floatingEnergy - 5,
    })
  }

  return (
    <Context.Provider
      value={{
        isLoading,
        floatingEnergy,
        coinsEarned,
        tappingEnergy,
        tappingPower,
        userId,
        screenAxis,
        name,
        handleTap,
        userData,
        setTappingEnergy,
        setTappingPower,
        setScreenAxis,
      }}
    >
      {children}
    </Context.Provider>
  )
}

function useProvider() {
  const context = useContext(Context)

  return context
}

export { ContextProvdider, useProvider }
