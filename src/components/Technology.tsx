import { ImCoinEuro } from "react-icons/im"

const techCards = [
  {
    name: "Blockchain",
    perHr: 95,
    price: 750,
  },
  {
    name: "Coin",
    perHr: 115,
    price: 500,
  },
  {
    name: "Token",
    perHr: 51,
    price: 2000,
  },
  {
    name: "Hash",
    perHr: 150,
    price: 3500,
  },

  {
    name: "Mininig",
    perHr: 217,
    price: 1750,
  },
]

export default function Technology() {
  return (
    <div className="flex flex-wrap justify-between gap-5 pb-32">
      {techCards.map((card) => (
        <TechnologyCard
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

function TechnologyCard({ name, perHr, price }: PropType) {
  return (
    <div className="mt-4">
      <div className="bg-[rgba(0,0,0,0.4)] w-44  rounded-xl">
        <div className="px-2 py-1 flex flex-col justify-center items-center">
          <p className="font-bold text-[19px] text-center pb-2 border-b-[1px] w-full">
            {name}
          </p>
          <p className="w-full mt-2 font-bold text-lg text-right">0 lvl</p>
          <ImCoinEuro className="text-8xl mt-[-15px]" />
          <p className="font-bold text-lg mt-3">Earn per hour</p>
          <div className="flex items-center gap-1 mt-1">
            <ImCoinEuro className="text-yellow-400 font-bold text-xl" />
            <p className="text-yellow-400 font-bold text-xl">+{perHr}</p>
          </div>
        </div>

        <div className="bg-[rgba(0,0,0,0.5)] rounded-xl h-14 flex justify-center items-center gap-2">
          <ImCoinEuro className="text-yellow-400 font-bold text-3xl" />
          <button className="text-yellow-400 font-bold text-2xl">
            {price}
          </button>
        </div>
      </div>
    </div>
  )
}
