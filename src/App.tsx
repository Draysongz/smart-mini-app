import { lazy } from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

import Ref from "./components/Ref"
import { useStaticUserData } from "./hooks/useUserData"
import Spinner from "./components/Spinner"
import { ContextProvdider } from "./context/ContextProvider"
// import WebApp from "@twa-dev/sdk"
// import { useEffect, useState } from "react"
import Level from "./components/Level"
import Stats from "./pages/Stats"
import Boost from "./pages/Boost"

const data = JSON.stringify({
  eventType: 'web_app_setup_back_button',
  eventData: {
    is_visible: true,
  },
});

window.parent.postMessage(data, 'https://web.telegram.org');

const Home = lazy(() => import("./pages/Home"))
function App() {
  // const [userId, setUserId] = useState<number | 0>()
  // const [firstName, setFirstName] = useState<string | null>(null)
  // const params = new URLSearchParams(location.search)
  // const referralId = Number(params.get("referralId"))

  const userId = 2146305061
  const firstName = "habibilord"
  const referralId = 123
  // const firstName = params.get("name")

  const { isLoading, name } = useStaticUserData(userId, firstName, referralId)

  // useEffect(() => {
  //   WebApp.expand()
  //   const id = WebApp.initDataUnsafe.user?.id
  //   const name = WebApp.initDataUnsafe.user?.first_name || null
  //   if (!id && !name) return
  //   setUserId(id)
  //   setFirstName(name)
  // }, [])

  if (isLoading) {
    return <Spinner />
  }
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
            element={<Ref userId={userId} name={name} />}
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
            path="/airdrop"
            element={<Stats userId={userId} name={name} />}
          />
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </ContextProvdider>
  )
}

export default App
