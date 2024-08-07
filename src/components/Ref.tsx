import Navbar from "../components/Navbar"
import { FaGift } from "react-icons/fa6"
import { FiRefreshCcw } from "react-icons/fi"
import { FaRegCopy } from "react-icons/fa6"
import { IoMdPersonAdd } from "react-icons/io"

const Ref = ({
  userId,
  name,
}: {
  userId: number | undefined
  name: string | null
}) => {
  return (
    <div className="bg-[#204d3d] relative px-4 text-white h-full min-h-screen">
      <h1 className="pt-16 text-center text-3xl font-semibold">
        Invite Friends
      </h1>
      <p className="pt-2 text-center pb-2">
        You and your friend will receive bonuses
      </p>
      <div className="cards">
        <div className="flex items-center px-5 py-4 gap-4 rounded-md bg-[rgba(0,0,0,0.4)]">
          <FaGift className="w-8 h-8 " />
          <div className="text-sm">
            <p>Invite a friend</p>
            <p>
              <span className="text-yellow-500">+5000</span> for you and your
              friend
            </p>
          </div>
        </div>
        <div className="flex items-center px-5 py-4 gap-4 bg-[rgba(0,0,0,0.4)] rounded-md mt-3">
          <FaGift className="w-8 h-8 " />
          <div className="text-sm">
            <p>Invite a friend with Telegram Premium</p>
            <p>
              <span className="text-yellow-500">+5000</span> for you and your
              friend
            </p>
          </div>
        </div>
      </div>
      <div>
        <div className="flex justify-between mt-4">
          <h1 className="font-semibold">Friend list</h1>
          <FiRefreshCcw className="w-5 h-5" />
        </div>
        {/* For the API */}
        <div className="py-6 text-center mt-3 rounded-md mx-auto bg-[rgba(0,0,0,0.4)]">
          You have not invited anyone yet
        </div>
        <div className="hidden border w-11/12 rounded-md mx-auto border-[#f0b732]">
          <p>Samad Olawale</p>
        </div>
      </div>
      <div className="w-full animate-bounce left-0 bottom-24 absolute flex justify-center px-4">
        <div className="flex w-full gap-2">
          <button className="w-full py-2 flex justify-center rounded-lg mx-auto bg-[rgba(0,0,0,0.4)]">
            <IoMdPersonAdd className="w-5 h-5 mt-0.5" />
            Invite a Friend
          </button>
          <div className="px-3 rounded-md bg-[rgba(0,0,0,0.4)]">
            <FaRegCopy className="mt-1.5 w-6 h-6" />
          </div>
        </div>
      </div>
      <Navbar userId={userId} name={name} />
    </div>
  )
}

export default Ref
