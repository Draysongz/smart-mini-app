import Navbar from "./Navbar";
import { useUserData } from "../hooks/useUserData";
import { useSearchParams } from "react-router-dom";
import { updateUserData } from "../helper-functions/getUser";
import { toast } from 'react-toastify';

interface LevelProps {
  userId: number | undefined;
  name: string | null;
}

const Level = ({ userId, name }: LevelProps) => {
  const [params] = useSearchParams();
  const referralId = Number(params.get("referralId"));

  const { userData } = useUserData(userId, name, referralId);

  const levels = [
    { level: 2, coinsRequired: 1000 },
    { level: 3, coinsRequired: 3000 },
    { level: 4, coinsRequired: 6000 },
    { level: 5, coinsRequired: 9000 },
    { level: 6, coinsRequired: 12000 },
    { level: 7, coinsRequired: 15000 },
    { level: 8, coinsRequired: 18000 },
  ];

  const handleClaim = async (level: number, coins: number) => {
    if (userId === undefined || userData?.coinsEarned === undefined) {
      toast.error("User data not found!");
      return;
    }

    const levelData = levels.find(l => l.level === level);
    const coinsRequired = levelData?.coinsRequired ?? 0;

    if ((userData?.coinsEarned ?? 0) < coinsRequired) {
      toast.error("Insufficient coins to claim this level!");
      return;
    }

    if (userData.multitapLevel && userData.multitapLevel.includes(level)) {
      toast.error(`Level ${level} has already been claimed!`);
      return;
    }

    const newCoins = userData.coinsEarned + coins;
    const multi = userData.multitapLevel + 1;


    await updateUserData(userId, { coinsEarned: newCoins, multitapLevel: multi});
    toast.success(`Successfully claimed Level ${level} reward!`);
  };

  return (
    <div className={`bg-[#1d1d1d] h-full min-h-screen overflow-hidden text-white`}>
      <div className="mb-8 pt-8">
        <div className="coin border flex justify-between text-white border-[#1d1d1d] bg-[#282828] w-11/12 mx-auto px-2 py-2 mt-4 rounded-md">
          <h1 className="flex pl-4 text-4xl font-bold">
            <img src={"/coin.svg"} height={40} width={40} alt='coin' className="mr-1" />
            {userData?.coinsEarned}
          </h1>
          <div className="pr-6">
            <p className="text-sm font-normal">Level</p>
            <p className="text-sm font-semibold">{userData?.multitapLevel}</p>
          </div>
        </div>
      </div>
      <div className="levels" style={{ paddingBottom: '60px', overflowY: 'auto' }}>
        <div className="normal flex justify-between mb-4">
          <p className="pl-4">Levels</p>
          <p className="text-[#fbc347] underline pr-4">Claim all</p>
        </div>
        {levels.map(level => {
          const isClaimed = userData?.multitapLevel == level.level
          return (
            <div key={level.level} className="hello border flex justify-between bg-[#282828] border-[#1d1d1d] w-11/12 mx-auto px-2 py-2 rounded-md mb-3">
              <div className="pl-2">
                <p className="text-sm">Level {level.level}</p>
                <p className="flex gap-1 text-sm text-gray-400">
                  <span className="flex text-[#fbc347]">
                    <img src={"/coin.svg"} width={20} height={20} alt="coin" />
                    +{level.coinsRequired} SC
                  </span>
                  tokens earned
                </p>
              </div>
              <div className="button flex gap-2">
                <button
                  onClick={() => handleClaim(level.level, level.coinsRequired)}
                  disabled={userData?.coinsEarned < level.coinsRequired || isClaimed}
                  className={`text-black border px-3 py-1 border-[#282828] rounded-md ${userData?.coinsEarned < level.coinsRequired || isClaimed ? "bg-gray-600 opacity-50 cursor-not-allowed" : "bg-[#fbc347]"}`}
                >
                  {isClaimed ? "Claimed" : "Claim"}
                </button>
              </div>
            </div>
          );
        })}
      </div>
      <Navbar userId={userId} name={name} />
    </div>
  );
};

export default Level;
