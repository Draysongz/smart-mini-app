import { useState } from "react"
import { ImCoinEuro } from "react-icons/im"
import { useRealtimeUserData } from "../hooks/useUserData"
import { useCards } from "../hooks/useCards"
import { ClipLoader } from "react-spinners"
import { useUpdateCoinsPerHour } from "../hooks/useUpdateCoinsPerHour"

// const techCardsData = [
//   {
//     name: "Blockchain",
//     perHr: 95,
//     price: 750,
//     level: 0,
//   },
//   {
//     name: "Coin",
//     perHr: 115,
//     price: 500,
//     level: 0,
//   },
//   {
//     name: "Token",
//     perHr: 51,
//     price: 2000,
//     level: 0,
//   },
//   {
//     name: "Hash",
//     perHr: 150,
//     price: 3500,
//     level: 0,
//   },
//   {
//     name: "Mining",
//     perHr: 217,
//     price: 1750,
//     level: 0,
//   },
// ]

interface TechProps {
  userId: number | undefined
  name: string | null
}

export default function Technology({ userId, name }: TechProps) {
  const { userData } = useRealtimeUserData(userId, name)
  const { isLoading, cards, setCards } = useCards("technology", userId)
  const { updateCoinsPerHour } = useUpdateCoinsPerHour()

  if (isLoading) {
    return (
      <div className="flex justify-center">
        <ClipLoader color="#fff" />
      </div>
    )
  }

  return (
    <div className="grid grid-cols-3 justify-between gap-2 pb-32 mt-4">
      {cards.map((card, index) => (
        <TechnologyCard
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

type TechnologyCardProps = {
  name: string
  perHr: number
  price: number
  level: number
  onClick: () => Promise<void>
}

function TechnologyCard({
  name,
  perHr,
  price,
  level,
  onClick,
}: TechnologyCardProps) {
  const [isLoading, setIsLoading] = useState(false)
  return (
    <div>
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
        <div
          className="bg-[rgba(0,0,0,0.5)] rounded-xl h-14 flex justify-center items-center gap-2"
          onClick={async () => {
            setIsLoading(true)
            await onClick()
            setIsLoading(false)
          }}
        >
          {isLoading ? (
            <ClipLoader color="#fff" />
          ) : (
            <>
              <ImCoinEuro className="text-yellow-400 font-bold" />
              <button className="text-yellow-400 font-bold text-sm">
                {price}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
