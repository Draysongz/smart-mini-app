import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import Referral from "./pages/Referral"
import { useUserData } from "./hooks/useUserData"
import Spinner from "./components/Spinner"
import { ContextProvdider } from "./context/ContextProvider"

function App() {
  const params = new URLSearchParams(location.search)
  const userId = Number(params.get("userId"))
  const referralId = Number(params.get("referralId"))
  const firstName = params.get("name")

  const { isLoading } = useUserData(userId, firstName, referralId)

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
          <Route path="/referral" element={<Referral />} />
        </Routes>
      </BrowserRouter>
    </ContextProvdider>
  )
}

export default App
