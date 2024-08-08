// import { BsThreeDotsVertical } from "react-icons/bs";
import { useState } from "react"
import Navbar from "../components/Navbar"
import { ImCoinEuro } from "react-icons/im"
import Technology from "../components/Technology"
import Lifestyle from "../components/Lifestyle"
import Business from "../components/Business"
import { useRealtimeUserData } from "../hooks/useUserData";
// import { useSearchParams } from "react-router-dom";


interface BoostProps {
  userId: number | undefined
  name: string | null
}

const tabs = ["Technology", "Lifestyle", "Business"]

const Boost = ({ userId, name }: BoostProps) => {
    const { userData } = useRealtimeUserData(userId, name)
  const [activeTab, setActiveTab] = useState(0)


  return (
    <div className={`bg-[#204d3d] min-h-screen pt-12 px-4 text-white`}>
      <h1 className="flex text-3xl font-semibold items-center justify-center">
        <ImCoinEuro className="w-8 h-8 text-yellow-500 mr-1.5 font-bold" />{" "}
        <p>{userData && userData.coinsEarned}</p>
      </h1>
      <div className="flex gap-2 justify-center items-center text-yellow-500 font-semibold text-lg mt-1 text-center">
        <p>Earn per hour</p>
        <div className=" flex justify-center items-center gap-2">
          <ImCoinEuro className="w-8 h-8 text-yellow-500  font-bold" />
          <p className="text-white text-xl">+{userData && userData.coinsPerHour}</p>
        </div>
      </div>

      {/** tabs */}
      <div className="bg-green-700 mt-10 h-16 p-1 rounded-xl">
        <div className="flex gap-3 justify-between bg-[rgba(0,0,0,0.4)] h-full rounded-xl">
          {tabs.map((tab, index) => (
            <button
              className={`${
                activeTab == index ? "bg-slate-950/50" : ""
              } px-2 text-sm font-bold rounded-xl w-32`}
              onClick={() => setActiveTab(index)}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/** cards */}
      {activeTab == 0 && <Technology userId={userId} name={name} />}
      {activeTab == 1 && <Lifestyle />}
      {activeTab == 2 && <Business />}

      <Navbar userId={userId} name={name} />
    </div>
  )
}

export default Boost
