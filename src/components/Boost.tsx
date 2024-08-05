import { BsThreeDotsVertical } from "react-icons/bs";
import Navbar from "./Navbar"
import { ImCoinEuro } from "react-icons/im";
import { useRealtimeUserData } from "../hooks/useUserData";
import { useSearchParams } from "react-router-dom";
import { updateUserData } from "../helper-functions/getUser";
import {toast} from 'react-toastify'


interface BoostProps{
    userId: number | undefined,
    name: string | null,
}

const Boost = ({ userId, name }: BoostProps) => {
    const [params] = useSearchParams();
    const referralId = Number(params.get("referralId"));

    const { userData } = useRealtimeUserData(userId, name, referralId)

async function upgradeAttribute(userId: number, attribute: string) {
    let cost = 0;
    let level = 1;

    // Determine cost and level increment based on attribute
    switch (attribute) {
        case 'tapPower':
            cost = 200 * userData?.tapPower; // Example cost calculation, adjust as per your logic
            level = userData?.tapPower + 1;
            break;
        case 'tapEnergy':
            cost = 200 * (userData?.tapEnergy / 1000); // Example cost calculation
            level = userData?.tapEnergy * 2;
            break;
        // Add cases for other attributes as needed
        default:
            console.log('Invalid attribute');
            return;
    }

    // Check if user has enough coins
    if (userData?.coinsEarned < cost) {
        alert('Not enough coins to upgrade');
        return;
    }

    // Deduct the cost from user's coins
    const updates = {
        coinsEarned: userData?.coinsEarned - cost,
        [attribute]: level, // Dynamically update the attribute
    };

    // Update user data in the database
    await updateUserData(userId, updates);
    toast.success(`${attribute} upgrade successful`)

  
}

    return (
        <div className={`bg-[#204d3d] pt-12 h-full min-h-screen text-white`}>
            <h1 className="flex text-3xl font-semibold justify-center"><ImCoinEuro className="w-8 h-8 text-yellow-500 mt-1 mr-1.5 font-bold" /> 102</h1>
            <p className="text-yellow-500 font-semibold text-lg mt-1 text-center">Earn per hour <span className="text-white">+0</span></p>
            <div className="flex justify-center gap-2 mt-8 ml-2">
                <div className="card border-2 border-[#f0b732] rounded-md w-3.5/12 cursor-pointer">
                    <h1 className="text-lg text-center font-semibold pb-1.5">Blockchain</h1><hr/>
                    <p className="text-right font-medium pr-2">0 LvL</p>
                    <ImCoinEuro className="mx-auto text-yellow-600 w-16 h-16" />
                    <p className="px-1 text-center pt-2 font-semibold pb-2">Earn per hour</p>
                    <p className="border-t flex gap-1 justify-center text-lg pb-3 pt-2 font-semibold"><ImCoinEuro className="w-6 h-6 text-gray-800 mt-0.5" /> 750</p>
                </div>
                <div className="card border-2 border-[#f0b732] rounded-md w-3.5/12">
                    <h1 className="text-lg text-center font-semibold pb-1.5">Coin</h1><hr/>
                    <p className="text-right font-medium pr-2">0 LvL</p>
                    <ImCoinEuro className="mx-auto text-yellow-600 w-16 h-16" />
                    <p className="px-2 text-center pt-2 font-semibold pb-2">Earn per hour</p>
                    <p className="border-t flex gap-1 justify-center text-lg pb-3 pt-2 font-semibold"><ImCoinEuro className="w-6 h-6 text-gray-800 mt-0.5" /> 750</p>
                </div>
                <div className="card border-2 border-[#f0b732] rounded-md w-3.5/12">
                    <h1 className="text-lg text-center font-semibold pb-1.5">Token</h1><hr/>
                    <p className="text-right font-medium pr-2">0 LvL</p>
                    <ImCoinEuro className="mx-auto text-yellow-600 w-16 h-16" />
                    <p className="px-1.5 text-center pt-2 font-semibold pb-2">Earn per hour</p>
                    <p className="border-t flex gap-1 justify-center text-lg pb-3 pt-2 font-semibold"><ImCoinEuro className="w-6 h-6 text-gray-800 mt-0.5" /> 750</p>
                </div>
            </div>
            <div className="flex justify-center gap-2 mt-4 ml-2">
                <div className="card border-2 border-[#f0b732] rounded-md w-3.5/12">
                    <h1 className="text-lg text-center font-semibold pb-1.5">Hash</h1><hr/>
                    <p className="text-right font-medium pr-2">0 LvL</p>
                    <ImCoinEuro className="mx-auto text-yellow-600 w-16 h-16" />
                    <p className="px-1 text-center pt-2 font-semibold pb-2">Earn per hour</p>
                    <p className="border-t flex gap-1 justify-center text-lg pb-3 pt-2 font-semibold"><ImCoinEuro className="w-6 h-6 text-gray-800 mt-0.5" /> 750</p>
                </div>
                <div className="card border-2 border-[#f0b732] rounded-md w-3.5/12">
                    <h1 className="text-lg text-center font-semibold pb-1.5">Mining</h1><hr/>
                    <p className="text-right font-medium pr-2">0 LvL</p>
                    <ImCoinEuro className="mx-auto text-yellow-600 w-16 h-16" />
                    <p className="px-2 text-center pt-2 font-semibold pb-2">Earn per hour</p>
                    <p className="border-t flex gap-1 justify-center text-lg pb-3 pt-2 font-semibold"><ImCoinEuro className="w-6 h-6 text-gray-800 mt-0.5" /> 750</p>
                </div>
                <div className="card border-2 border-[#f0b732] rounded-md w-3.5/12">
                    <h1 className="text-lg text-center font-semibold pb-1.5">BTC</h1><hr/>
                    <p className="text-right font-medium pr-2">0 LvL</p>
                    <ImCoinEuro className="mx-auto text-yellow-600 w-16 h-16" />
                    <p className="px-1.5 text-center pt-2 font-semibold pb-2">Earn per hour</p>
                    <p className="border-t flex gap-1 justify-center text-lg pb-3 pt-2 font-semibold"><ImCoinEuro className="w-6 h-6 text-gray-800 mt-0.5" /> 750</p>
                </div>
            </div>
            <div className="flex justify-center gap-2 mt-4 mb-64 ml-2">
                <div className="card border-2 border-[#f0b732] rounded-md w-3.5/12">
                    <h1 className="text-lg text-center font-semibold pb-1.5">ETH</h1><hr/>
                    <p className="text-right font-medium pr-2">0 LvL</p>
                    <ImCoinEuro className="mx-auto text-yellow-600 w-16 h-16" />
                    <p className="px-1 text-center pt-2 font-semibold pb-2">Earn per hour</p>
                    <p className="border-t flex gap-1 justify-center text-lg pb-3 pt-2 font-semibold"><ImCoinEuro className="w-6 h-6 text-gray-800 mt-0.5" /> 750</p>
                </div>
                <div className="card border-2 border-[#f0b732] rounded-md w-3.5/12">
                    <h1 className="text-lg text-center font-semibold pb-1.5">Altcoins</h1><hr/>
                    <p className="text-right font-medium pr-2">0 LvL</p>
                    <ImCoinEuro className="mx-auto text-yellow-600 w-16 h-16" />
                    <p className="px-2 text-center pt-2 font-semibold pb-2">Earn per hour</p>
                    <p className="border-t flex gap-1 justify-center text-lg pb-3 pt-2 font-semibold"><ImCoinEuro className="w-6 h-6 text-gray-800 mt-0.5" /> 750</p>
                </div>
                <div className="card border-2 border-[#f0b732] rounded-md w-3.5/12">
                    <h1 className="text-lg text-center font-semibold pb-1.5">TON</h1><hr/>
                    <p className="text-right font-medium pr-2">0 LvL</p>
                    <ImCoinEuro className="mx-auto text-yellow-600 w-16 h-16" />
                    <p className="px-1.5 text-center pt-2 font-semibold pb-2">Earn per hour</p>
                    <p className="border-t flex gap-1 justify-center text-lg pb-3 pt-2 font-semibold"><ImCoinEuro className="w-6 h-6 text-gray-800 mt-0.5" /> 750</p>
                </div>
            </div>
            <Navbar userId={userId} name={name} />
        </div>
    );
};

export default Boost;