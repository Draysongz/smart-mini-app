import { ImCoinEuro } from "react-icons/im"
import { updateUserData } from "../helper-functions/getUser";
import { toast } from 'react-toastify';
import { useRealtimeUserData } from "../hooks/useUserData";
import { useState } from 'react';

const businessCards = [
  {
    name: "Splitting 1.0",
    perHr: 95,
    price: 750,
    level: 0
  },
  {
    name: "Splitting 2.0",
    perHr: 115,
    price: 500,
    level: 0
  },
  {
    name: "Splitting 3.0",
    perHr: 51,
    price: 2000,
    level: 0
  },
  {
    name: "SPLIT",
    perHr: 150,
    price: 3500,
    level: 0
  },

  {
    name: "Freezing",
    perHr: 217,
    price: 1750,
    level: 0
  },
]

interface TechProps {
  userId: number | any;
  name: string | null;
}

export default function Business({ userId, name }: TechProps) {

  const { userData } = useRealtimeUserData(userId, name);
  const [bizCards, setBizCards] = useState(businessCards);

  const updateCoinsPerHour = async (price: number, perHr: number, index: number) => {
    if (price > userData?.coinsEarned) {
      toast.error("Insufficient coins");
      return;
    }

    const newCoinsPerHour = userData?.coinsPerHour + perHr;
    await updateUserData(userId, {
      coinsPerHour: newCoinsPerHour,
      coinsEarned: userData?.coinsEarned - price,
    });

    const updatedTechCards = [...bizCards];
    updatedTechCards[index].level += 1;
    setBizCards(updatedTechCards);
    toast.success("card purchased")
  };
  return (
    <div className="grid grid-cols-3 justify-between gap-2 mt-4 pb-32">
      {businessCards.map((card, index) => (
        <BusinessCard
          key={card.name}
          name={card.name}
          perHr={card.perHr}
          price={card.price}
          level={card.level}
          onClick={() => updateCoinsPerHour(card.price, card.perHr, index)}
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
  onClick: () => void;
}

function BusinessCard({ name, perHr, price, level, onClick }: PropType) {
  return (
    <div onClick={onClick} className="cursor-pointer">
      <div className="bg-[rgba(0,0,0,0.4)] w-auto rounded-xl">
        <div className="px-2 py-1 flex flex-col justify-center items-center">
          <p className="font-bold text-sm text-center pb-2 border-b-[1px] w-full">
            {name}
          </p>
          <p className="w-full mt-2 font-semibold text-sm text-right">{level} lvl</p>
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
