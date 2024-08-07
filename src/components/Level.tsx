import Navbar from "./Navbar"
// import { useRealtimeUserData } from "../hooks/useUserData";
import { useSearchParams } from "react-router-dom"
// import { updateUserData } from "../helper-functions/getUser";
import { ImCoinEuro } from "react-icons/im"
import { FaTwitter } from "react-icons/fa"
import { FaCoins, FaTelegram } from "react-icons/fa6"
import { FaGift } from "react-icons/fa6"
import { RiHandCoinFill } from "react-icons/ri"
// import { FaTelegramPlane } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa"

interface LevelProps {
  userId: number | undefined
  name: string | null
}

const Level = ({ userId, name }: LevelProps) => {
  const [params] = useSearchParams()
  const referralId = Number(params.get("referralId"))
  console.log(referralId)

  return (
    <div className="bg-[#204d3d] text-white min-h-screen px-4">
      <div className="flex flex-col items-center pt-16 pb-8">
        <ImCoinEuro className="text-[#f0b732] w-24 h-24" />
        <p className="pt-2 text-3xl font-semibold">Earn more coins</p>
      </div>
      <div>
        <p className=" text-lg font-medium">Daily tasks</p>
        <div className="flex items-center px-5 py-4 gap-4 rounded-[10px] bg-[rgba(0,0,0,0.4)]">
          <FaGift className="w-8 h-8" />
          <div>
            <p className="font-semibold">Daily reward</p>
            <p>
              <span className="text-yellow-500 font-semibold">+35,000</span>
            </p>
          </div>
        </div>
      </div>
      <div className="mt-4 pb-24">
        <p className="text-lg font-medium">Tasks list</p>
        <div className="flex items-center px-5 py-4 gap-4 rounded-[10px] bg-[rgba(0,0,0,0.4)]">
          <FaGift className="w-8 h-8" />
          <div>
            <p className="font-semibold">Activate Promo Code</p>
            <p>
              <span className="text-yellow-500 font-semibold">+35,000</span>
            </p>
          </div>
        </div>
        <div className="flex items-center px-5 py-4 gap-4 rounded-[10px] bg-[rgba(0,0,0,0.4)] mt-3">
          <FaCoins className="w-8 h-8" />
          <div>
            <p className="font-semibold">Add 10 new friends (0/10)</p>
            <p>
              <span className="text-yellow-500 font-semibold">+35,000</span>
            </p>
          </div>
        </div>
        <div className="flex items-center px-5 py-4 gap-4 rounded-[10px] bg-[rgba(0,0,0,0.4)] mt-3">
          <RiHandCoinFill className="w-8 h-8" />
          <div>
            <p className="font-semibold">Subscribe to X</p>
            <p>
              <span className="text-yellow-500 font-semibold">+35,000</span>
            </p>
          </div>
        </div>
        <div className="flex items-center px-5 py-4 gap-4 rounded-[10px] bg-[rgba(0,0,0,0.4)] mt-3">
          <FaTwitter className="w-8 h-8" />
          <div>
            <p className="font-semibold">Invite to Twitter</p>
            <p>
              <span className="text-yellow-500 font-semibold">+35,000</span>
            </p>
          </div>
        </div>
        <div className="flex items-center px-5 py-4 gap-4 rounded-[10px] bg-[rgba(0,0,0,0.4)] mt-3">
          <FaInstagram className="w-8 h-8" />
          <div>
            <p className="font-semibold">Invite to Instagram</p>
            <p>
              <span className="text-yellow-500 font-semibold">+35,000</span>
            </p>
          </div>
        </div>
        <div className="flex items-center px-5 py-4 gap-4 rounded-[10px] bg-[rgba(0,0,0,0.4)] mt-3">
          <FaTelegram className="w-8 h-8" />
          <div>
            <p className="font-semibold">Join us on telegram</p>
            <p>
              <span className="text-yellow-500 font-semibold">+35,000</span>
            </p>
          </div>
        </div>
        <div className="flex items-center px-5 py-4 gap-4 rounded-[10px] bg-[rgba(0,0,0,0.4)] mt-3">
          <FaGift className="w-8 h-8" />
          <div>
            <p className="font-semibold">Add 10 new friends (0/10)</p>
            <p>
              <span className="text-yellow-500 font-semibold">+35,000</span>
            </p>
          </div>
        </div>
      </div>
      <Navbar userId={userId} name={name} />
    </div>
  )
}

export default Level
