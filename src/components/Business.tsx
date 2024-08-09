import { useState } from "react"
import { ImCoinEuro } from "react-icons/im"
import { ClipLoader } from "react-spinners"
import { useCards } from "../hooks/useCards"
import { useRealtimeUserData } from "../hooks/useUserData"
import { useUpdateCoinsPerHour } from "../hooks/useUpdateCoinsPerHour"

// const businessCards = [
//   {
//     name: "Splitting 1.0",
//     perHr: 95,
//     price: 750,
//   },
//   {
//     name: "Splitting 2.0",
//     perHr: 115,
//     price: 500,
//   },
//   {
//     name: "Splitting 3.0",
//     perHr: 51,
//     price: 2000,
//   },
//   {
//     name: "SPLIT",
//     perHr: 150,
//     price: 3500,
//   },

//   {
//     name: "Freezing",
//     perHr: 217,
//     price: 1750,
//   },
// ]

interface BusinessProps {
  userId: number | undefined
  name: string | null
}

export default function Business({ userId, name }: BusinessProps) {
  const { userData } = useRealtimeUserData(userId, name)
  const { isLoading, cards, setCards } = useCards("business", userId)
  const { updateCoinsPerHour } = useUpdateCoinsPerHour()
  if (isLoading) {
    return (
      <div className="flex justify-center">
        <ClipLoader color="#fff" />
      </div>
    )
  }
  return (
    <div className="grid grid-cols-3 justify-between gap-2 mt-4 pb-32">
      {cards.map((card, index) => (
        <BusinessCard
          key={card.name}
          name={card.name}
          perHr={card.coinsPerHr}
          price={card.price}
          level={card.level}
          onClick={async () =>
            await updateCoinsPerHour(
              userId,
              card.price,
              card.coinsPerHr,
              index,
              cards,
              userData,
              setCards
            )
          }
        />
      ))}
    </div>
  )
}

type PropType = {
  name: string
  perHr: number
  price: number
  level: number
  onClick: () => Promise<void>
}

function BusinessCard({ name, perHr, price, level, onClick }: PropType) {
  const [isLoading, setIsLoading] = useState(false)
  return (
    <div onClick={onClick} className="cursor-pointer">
      <div className="bg-[rgba(0,0,0,0.4)] w-auto rounded-xl">
        <div className="px-2 py-1 flex flex-col justify-center items-center">
          <p className="font-bold text-sm text-center pb-2 border-b-[1px] w-full">
            {name}
          </p>
          <p className="w-full mt-2 font-semibold text-sm text-right">
            {level} lvl
          </p>
          <ImCoinEuro className="w-16 h-16 mt-[-5px]" />
          <p className="font-semibold text-[12px] mt-3">Earn per hour</p>
          <div className="flex items-center gap-1 mt-1">
            <ImCoinEuro className="text-yellow-400 font-bold text-16" />
            <p className="text-yellow-400 font-bold text-sm">+{perHr}</p>
          </div>
        </div>

        <div className="bg-[rgba(0,0,0,0.5)] rounded-xl h-14 flex justify-center items-center gap-2">
          {isLoading ? (
            <ClipLoader color="#fff" />
          ) : (
            <>
              <ImCoinEuro className="text-yellow-400 font-bold" />
              <button
                onClick={async () => {
                  setIsLoading(true)
                  await onClick()
                  setIsLoading(false)
                }}
                className="text-yellow-400 font-bold text-sm"
              >
                {price}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
