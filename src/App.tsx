import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import Referral from "./pages/Referral"
import { useUserData } from "./hooks/useUserData"
// import Spinner from "./components/Spinner"
import { ContextProvdider } from "./context/ContextProvider"
import WebApp from "@twa-dev/sdk"
import { useEffect, useState } from "react"
import Boost from "./components/Boost"
import Level from "./components/Level"
import Stats from "./pages/Stats"
function App() {
  // const [userId, setUserId] = useState<number>()
  // const [firstName, setFirstName] = useState<string | null>(null)
  const params = new URLSearchParams(location.search)
  // const userId = Number(params.get("userId"))
  const referralId = Number(params.get("referralId"))
  const userId = 1
  const firstName = 'habibilord'
  // const firstName = params.get("name")

 

  const { isLoading, name } = useUserData(userId, firstName, referralId)

  // useEffect(() => {
  //   WebApp.expand()
  //   const id = WebApp.initDataUnsafe.user?.id
  //   const name = WebApp.initDataUnsafe.user?.first_name || null
  //   if (!id && !name) return
  //   setUserId(id)
  //   setFirstName(name)
  // }, [])

  // if (isLoading) {
  //   return <Spinner />
  // }
  return (
    <ContextProvdider
      userId={userId}
      firstName={firstName}
      referralId={referralId}
    >
      <BrowserRouter>
        <Routes>
          <Route index element={<Home userId={userId} name={name} />} />
          <Route
            path="/referral"
            element={<Referral userId={userId} name={name} />}
          />
          <Route
            path="/boost"
            element={<Boost userId={userId} name={name} />}
          />
          <Route
            path="/tasks"
            element={<Level userId={userId} name={name} />}
          />
          <Route
            path="/status"
            element={<Stats userId={userId} name={name} />}
          />
        </Routes>
      </BrowserRouter>
    </ContextProvdider>
  )
}

export default App
