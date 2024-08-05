import Navbar from "../components/Navbar"
import { FaGift } from "react-icons/fa6";
import { FiRefreshCcw } from "react-icons/fi";
import { FaRegCopy } from "react-icons/fa6";
import { IoMdPersonAdd } from "react-icons/io";

const Ref = ({
  userId,
  name,
}: {
  userId: number | undefined
  name: string | null
}) => {
  return (
    <div className="bg-[#204d3d] text-white h-full min-h-screen">
      <h1 className="pt-16 text-center text-3xl font-semibold">Invite Friends</h1>
      <p className="pt-2 text-center pb-2">You and your friend will receive bonuses</p>
      <div className="cards">
        <div className="flex py-2 gap-4 border border-[#f0b732] rounded-md w-11/12 mx-auto bg">
            <FaGift className="w-8 h-8 mt-2 ml-2 text-gray-800" />
          <div>
            <p>Invite a friend</p>
            <p><span className="text-yellow-500">+5000</span> for you and your friend</p>
          </div>
        </div>
        <div className="flex py-2 gap-4 border border-[#f0b732] rounded-md w-11/12 mx-auto mt-3">
            <FaGift className="w-8 h-8 mt-2 ml-2" />
          <div>
            <p>Invite a friend with Telegram Premium</p>
            <p><span className="text-yellow-500">+5000</span> for you and your friend</p>
          </div>
        </div>
      </div>
      <div>
        <div className="flex justify-between mt-4">
          <h1 className="ml-2 font-semibold">Friend list</h1>
          <FiRefreshCcw className="w-5 h-5 mr-2" />
        </div>
        {/* For the API */}
        <div className="py-6 text-center mt-3 border w-11/12 rounded-md mx-auto border-[#f0b732]">
          You have not invited anyone yet
        </div>
        <div className="hidden border w-11/12 rounded-md mx-auto border-[#f0b732]">
          <p>Samad Olawale</p>
        </div>
      </div>
      <div className="flex mt-32">
        <button className="w-10/12 py-2 flex justify-center rounded-lg mx-auto border border-[#f0b732] "><IoMdPersonAdd className="w-5 h-5 mt-0.5 mr-2" />Invite a Friend</button>
        <div className="border mr-2 px-1 rounded-md border-[#f0b732]">
          <FaRegCopy className="mt-1.5 w-6 h-6" />
        </div>
      </div>
    <Navbar userId={userId} name={name} />
    </div>
  )
}

export default Ref