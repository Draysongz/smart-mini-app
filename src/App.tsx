import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import Referral from "./pages/Referral"
import { useUserData } from "./hooks/useUserData"
import Spinner from "./components/Spinner"
import { ContextProvdider } from "./context/ContextProvider"
import ComingSoon from "./components/ComingSoon"

function App() {
  const params = new URLSearchParams(location.search)
  const userId = Number(params.get("userId"))
  const referralId = Number(params.get("referralId"))
  const firstName = params.get("name")

  const { isLoading, userData, name } = useUserData(
    userId,
    firstName,
    referralId
  )

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
          <Route index element={<Home />} />
          <Route
            path="/referral"
            element={
              <Referral userId={userId} name={name} userData={userData} />
            }
          />
          <Route
            path="/boost"
            element={<ComingSoon userId={userId} name={name} />}
          />
          <Route
            path="/tasks"
            element={<ComingSoon userId={userId} name={name} />}
          />
        </Routes>
      </BrowserRouter>
    </ContextProvdider>
  )
}

export default App
