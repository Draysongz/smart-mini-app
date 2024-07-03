import { useState } from "react";
import Navbar from "./Navbar"
import Airdrop from "./Airdrop";
import Referral from "../pages/Referral";
import { useRealtimeUserData } from "../hooks/useUserData"


const tabs = [
    { name: "Airdrop", tab: "airdrop", href: "/umbrella.svg" },
    { name: "Referral", tab: "referral", href: "/gift.svg" },
  ];


const Ref = ({
    userId,
    name,
  }: {
    userId: number | undefined
    name: string | null
  }) => {
    const [currentTab, setCurrentTab] = useState("airdrop");
    const { userData } = useRealtimeUserData(userId, name)

    const renderContent = () => {
        switch (currentTab) {
          case "airdrop":
            return <Airdrop key={"airdrop"}/>
          case "referral":
            return <Referral key={"referral"} userId={userId} name={name} />;
          default:
            return null;
        }
      };

    return(
        userData && (
        <div className={`bg-[#1d1d1d] h-screen overflow-hidden`}>
        <div className="mb-8 pt-8 border-b rounded-md pb-4 border-[#fbce47] shadow-lg">
            <div className="coin border flex justify-between text-white border-[#1d1d1d] bg-[#282828] w-11/12 mx-auto px-2 py-2 mt-4 rounded-md">
                <h1 className="flex pl-4 text-4xl font-bold"><img src={"/coin.svg"} height={40} width={40} className="mr-1" />{userData?.coinsEarned}</h1>
                <div className="pr-6">
                    <p className="text-sm font-normal">Level</p>
                    <p className="text-sm font-semibold">{userData?.tapPower}</p>
                </div>
            </div>
            <div className="button mt-4 flex justify-center gap-3">
              {tabs.map((tab, index) => (
                <button key={index} onClick={() => setCurrentTab(tab.tab)} className={`flex border border-[#1d1d1d] px-2 py-1 rounded-md ${currentTab === tab.tab ? "bg-[#423c2c] text-[#fbce47]" : "bg-[#282828] text-gray-400"}`}><img src={tab.href} height={20} width={20} className="mr-1" />{tab.name}</button>
              ))}
            </div>
        </div>
        <div>{renderContent()}</div>
        <Navbar userId={userData.userId} name={name ? name : ""} />
    </div>
        )
    )
}

export default Ref