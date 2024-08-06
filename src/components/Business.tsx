import { ImCoinEuro } from "react-icons/im"

const businessCards = [
  {
    name: "Suit",
    perHr: 95,
    price: 750,
  },
  {
    name: "Shoes",
    perHr: 115,
    price: 500,
  },
  {
    name: "Tie",
    perHr: 51,
    price: 2000,
  },
  {
    name: "Briefcase",
    perHr: 150,
    price: 3500,
  },

  {
    name: "Watch",
    perHr: 217,
    price: 1750,
  },
]

export default function Business() {
  return (
    <div className="grid grid-cols-3 justify-between gap-4 pb-32">
      {businessCards.map((card) => (
        <BusinessCard
          key={card.name}
          name={card.name}
          perHr={card.perHr}
          price={card.price}
        />
      ))}
    </div>
  )
}

type PropType = {
  name: string
  perHr: number
  price: number
}

function BusinessCard({ name, perHr, price }: PropType) {
  return (
    <div className="mt-4">
      <div className="bg-[rgba(0,0,0,0.4)] w-auto rounded-xl">
        <div className="px-2 py-1 flex flex-col justify-center items-center">
          <p className="font-bold text-sm text-center pb-2 border-b-[1px] w-full">
            {name}
          </p>
          <p className="w-full mt-2 font-semibold text-sm text-right">0 lvl</p>
          <ImCoinEuro className="w-16 h-16 mt-[-5px]" />
          <p className="font-semibold text-[12px] mt-3">Earn per hour</p>
          <div className="flex items-center gap-1 mt-1">
            <ImCoinEuro className="text-yellow-400 font-bold text-16" />
            <p className="text-yellow-400 font-bold text-sm">+{perHr}</p>
          </div>
        </div>

        <div className="bg-[rgba(0,0,0,0.5)] rounded-xl h-14 flex justify-center items-center gap-2">
          <ImCoinEuro className="text-yellow-400 font-bold " />
          <button className="text-yellow-400 font-bold text-sm">{price}</button>
        </div>
      </div>
    </div>
  )
}
