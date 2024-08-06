import { ImCoinEuro } from "react-icons/im"

export default function Lifestyle() {
  return (
    <div className="mt-4">
      <div className="bg-[rgba(0,0,0,0.4)] w-44  rounded-xl">
        <div className="px-2 py-1 flex flex-col justify-center items-center">
          <p className="font-bold text-[19px] text-center pb-2 border-b-[1px] w-full">
            Lifestyle
          </p>
          <p className="w-full mt-2 font-bold text-lg text-right">0 lvl</p>
          <ImCoinEuro className="text-8xl mt-[-15px]" />
          <p className="font-bold text-lg mt-3">Earn per hour</p>
          <div className="flex items-center gap-1 mt-1">
            <ImCoinEuro className="text-yellow-400 font-bold text-xl" />
            <p className="text-yellow-400 font-bold text-xl">+95</p>
          </div>
        </div>

        <div className="bg-[rgba(0,0,0,0.5)] rounded-xl h-14 flex justify-center items-center gap-2">
          <ImCoinEuro className="text-yellow-400 font-bold text-3xl" />
          <p className="text-yellow-400 font-bold text-2xl">750</p>
        </div>
      </div>
    </div>
  )
}
