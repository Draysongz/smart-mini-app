import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import Referral from "./pages/Referral"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Home />} />
        <Route path="/referral" element={<Referral />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
