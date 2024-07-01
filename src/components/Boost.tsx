import { BsThreeDotsVertical } from "react-icons/bs";
import Navbar from "./Navbar"
import { useUserData } from "../hooks/useUserData";
import { useSearchParams } from "react-router-dom";
import { updateUserData } from "../helper-functions/getUser";


interface BoostProps{
    userId: number | undefined,
    name: string | null,
}

const Boost = ({ userId, name }: BoostProps) => {
    const [params] = useSearchParams();
    const referralId = Number(params.get("referralId"));

    const { userData } = useUserData(userId, name, referralId)

async function upgradeAttribute(userId: number, attribute: string) {
    let cost = 0;
    let level = 1;

    // Determine cost and level increment based on attribute
    switch (attribute) {
        case 'tapPower':
            cost = 200 * userData?.tapPower; // Example cost calculation, adjust as per your logic
            level = userData?.tapPower + 1;
            break;
        case 'energyLevel':
            cost = 200 * userData?.energyLevel; // Example cost calculation
            level = userData?.energyLevel + 1;
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

  
}

    return (
        <div className={`bg-[#1d1d1d] h-screen text-white`}>
            <div className="mb-8 pt-8 border-b rounded-md pb-4 border-[#fbce47]">
                <div className="flex justify-between">
                    <div className="text-white pl-6 cursor-pointer">
                        <h1 className="flex text-xl text-semibold">
                            <img src={"/left.svg"} height={9} width={9} className="mr-3" /> Home
                        </h1>
                    </div>
                    <div className="mr-4 text-white">
                        <BsThreeDotsVertical className="w-7 h-7" />
                    </div>
                </div>
                <div className="coin border flex justify-between text-white border-[#1d1d1d] bg-[#282828] w-11/12 mx-auto px-2 py-2 mt-4 rounded-md">
                    <h1 className="flex pl-4 text-4xl font-bold">
                        <img src={"/coin.svg"} height={40} width={40} className="mr-1" />
                        {userData?.coinsEarned}
                    </h1>
                    <div className="pr-6">
                        <p className="text-sm font-normal">Level</p>
                        <p className="text-sm font-semibold">{userData?.tapPower}</p>
                    </div>
                </div>
            </div>
            <div className="daily mb-6">
                <p className="pl-4 pb-4">Daily boosters:</p>
                <div className="flex">
                    <div className="1 flex border w-5/12 px-2 py-2 border-[#1d1d1d] bg-[#282828] ml-6 rounded-md mr-2">
                        <img src={"/touch.svg"} height={25} width={25} className="mr-1" />
                        <div>
                            <p className="text-sm">Tapping guru</p>
                            <p>3/3</p>
                        </div>
                    </div>
                    <div className='2 flex border w-5/12 px-2 py-2 border-[#1d1d1d] bg-[#282828] rounded-md'>
                        <img src={"/mark.svg"} width={22} height={22} className='mr-2' />
                        <div>
                            <p className="text-sm">Full tank</p>
                            <p>3/3</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="boosters">
                <h1 className='pl-4 pb-4'>Boosters:</h1>
                <div className="boooose">
                    <div
                        className="flex mb-2 justify-between border py-2 rounded-md px-2 w-11/12 mx-auto border-[#1d1d1d] bg-[#282828]"
                        onClick={() => upgradeAttribute(userId!, 'tapPower')}
                    >
                        <div className="first flex">
                            <img src={"/click.svg"} width={22} height={22} className="mr-2" />
                            <div>
                                <p className="text-sm">Multitap</p>
                                <p className="flex text-sm">
                                    <img src={"/coin.svg"} width={18} height={18} className="mr-1" />
                                    {200 * userData?.tapPower} | Level {userData?.tapPower}
                                </p>
                            </div>
                        </div>
                        <div className="second">
                            <img src={"/right.svg"} width={8} height={8} className="pt-3 mr-2" />
                        </div>
                    </div>
                    <div
                        className="flex mb-2 justify-between border py-2 rounded-md px-2 w-11/12 mx-auto border-[#1d1d1d] bg-[#282828]"
                        onClick={() => upgradeAttribute(userId!, 'energyLevel')}
                    >
                        <div className="first flex">
                            <img src={"/energy.svg"} width={22} height={22} className="mr-2" />
                            <div>
                                <p className="text-sm">Energy limit</p>
                                <p className="flex text-sm">
                                    <img src={"/coin.svg"} width={18} height={18} className="mr-1" />
                                    {200 * userData?.energyLevel} | Level {userData?.energyLevel}
                                </p>
                            </div>
                        </div>
                        <div className="second">
                            <img src={"/right.svg"} width={8} height={8} className="pt-3 mr-2" />
                        </div>
                    </div>
                    <div
                        className="flex mb-2 justify-between border py-2 rounded-md px-2 w-11/12 mx-auto border-[#1d1d1d] bg-[#282828]"
                       
                    >
                        <div className="first flex">
                            <img src={"/recharge.svg"} width={15} height={15} className="mr-2" />
                            <div>
                                <p className="text-sm">Recharging speed</p>
                                <p className="flex text-sm">
                                    <img src={"/coin.svg"} width={18} height={18} className="mr-1" />
                                    200 | Level {userData?.rechargeLevel}
                                </p>
                            </div>
                        </div>
                        <div className="second">
                            <img src={"/right.svg"} width={8} height={8} className="pt-3 mr-2" />
                        </div>
                    </div>
                    <div
                        className="flex justify-between border py-2 rounded-md px-2 w-11/12 mx-auto border-[#1d1d1d] bg-[#282828]"
                       
                    >
                        <div className="first flex">
                            <img src={"/bot.svg"} width={22} height={22} className="mr-2" />
                            <div>
                                <p className="text-sm">Tap bot</p>
                                <p className="flex text-sm">
                                    <img src={"/coin.svg"} width={18} height={18} className="mr-1" />
                                    200 | Level {userData?.tapbotLevel}
                                </p>
                            </div>
                        </div>
                        <div className="second">
                            <img src={"/right.svg"} width={8} height={8} className="pt-3 mr-2" />
                        </div>
                    </div>
                </div>
            </div>
            <Navbar userId={userId} name={name} />
        </div>
    );
};

export default Boost;