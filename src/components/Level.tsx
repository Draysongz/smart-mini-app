import Navbar from "./Navbar"

interface LevelProps{
    userId: number | undefined,
    name: string | null
}
const Level = ({ userId, name}: LevelProps) => {
    return (
        <div className={`bg-[#1d1d1d] h-full min-h-screen overflow-hidden text-white`}>
            <div className="mb-8 pt-8">
                <div className="coin border flex justify-between text-white border-[#1d1d1d] bg-[#282828] w-11/12 mx-auto px-2 py-2 mt-4 rounded-md">
                    <h1 className="flex pl-4 text-4xl font-bold"><img src={"/coin.svg"} height={40} width={40} alt='coin' className="mr-1" />6122</h1>
                    <div className="pr-6">
                        <p className="text-sm font-normal">Level</p>
                          <p className="text-sm font-semibold">1</p>
                    </div>
                </div>
            </div>
            <div className="levels" style={{ paddingBottom: '60px', overflowY: 'auto' }}>
                <div className="normal flex justify-between mb-4">
                    <p className="pl-4">Levels</p>
                    <p className="text-[#fbc347] underline pr-4">Claim all</p>
                </div>
                <div className="hello border flex justify-between bg-[#282828] border-[#1d1d1d] w-11/12 mx-auto px-2 py-2 rounded-md mb-3">
                    <div className="pl-2">
                        <p className="text-sm">Level 2</p>
                        <p className="flex gap-1 text-sm text-gray-400"><span className="flex text-[#fbc347]"><img src={"/coin.svg"} width={20} height={20} />+2 SC</span>tokens earned</p>
                    </div>
                    <div className="button flex gap-2">
                        <button className="text-[#fbc347] border px-3 py-1 border-[#fbc347] rounded-md mr-1">Buy</button>
                        <button className="text-black border px-3 py-1 border-[#282828] bg-[#fbc347] rounded-md">Claim</button>
                    </div>
                </div>
                <div className="hello border flex justify-between bg-[#282828] border-[#1d1d1d] w-11/12 mx-auto px-2 py-2 rounded-md mb-3">
                    <div className="pl-2">
                        <p className="text-sm">Level 3</p>
                        <p className="flex gap-1 text-sm text-gray-400"><span className="flex text-[#fbc347]"><img src={"/coin.svg"} width={20} height={20} alt='coin' />+3 SC</span>tokens earned</p>
                    </div>
                    <div className="button flex gap-2">
                        <button className="text-[#fbc347] border px-3 py-1 border-[#fbc347] rounded-md mr-1">Buy</button>
                        <button className="text-black border px-3 py-1 border-[#282828] bg-[#fbc347] rounded-md">Claim</button>
                    </div>
                </div>
                <div className="hello border flex justify-between bg-[#282828] border-[#1d1d1d] w-11/12 mx-auto px-2 py-2 rounded-md mb-3">
                    <div className="pl-2">
                        <p className="text-sm">Level 4</p>
                        <p className="flex gap-1 text-sm text-gray-400"><span className="flex text-[#fbc347]"><img src={"/coin.svg"} width={20} height={20} alt='coin' />+4 SC</span>tokens earned</p>
                    </div>
                    <div className="button flex gap-2">
                        <button className="text-[#fbc347] border px-3 py-1 border-[#fbc347] rounded-md mr-1">Buy</button>
                        <button className="text-black border px-3 py-1 border-[#282828] bg-[#fbc347] rounded-md">Claim</button>
                    </div>
                </div>
                <div className="hello border flex justify-between bg-[#282828] border-[#1d1d1d] w-11/12 mx-auto px-2 py-2 rounded-md mb-3">
                    <div className="pl-2">
                        <p className="text-sm">Level 5</p>
                        <p className="flex gap-1 text-sm text-gray-400"><span className="flex text-[#fbc347]"><img src={"/coin.svg"} width={20} height={20} alt='coin' />+5 SC</span>tokens earned</p>
                    </div>
                    <div className="button flex gap-2">
                        <button className="text-[#fbc347] border px-3 py-1 border-[#fbc347] rounded-md mr-1">Buy</button>
                        <button className="text-black border px-3 py-1 border-[#282828] bg-[#fbc347] rounded-md">Claim</button>
                    </div>
                </div>
                <div className="hello border flex justify-between bg-[#282828] border-[#1d1d1d] w-11/12 mx-auto px-2 py-2 rounded-md mb-3">
                    <div className="pl-2">
                        <p className="text-sm">Level 6</p>
                        <p className="flex gap-1 text-sm text-gray-400"><span className="flex text-[#fbc347]"><img src={"/coin.svg"} width={20} height={20} alt='coin' />+6 SC</span>tokens earned</p>
                    </div>
                    <div className="button flex gap-2">
                        <button className="text-[#fbc347] border px-3 py-1 border-[#fbc347] rounded-md mr-1">Buy</button>
                        <button className="text-black border px-3 py-1 border-[#282828] bg-[#fbc347] rounded-md">Claim</button>
                    </div>
                </div>
                <div className="hello border flex justify-between bg-[#282828] border-[#1d1d1d] w-11/12 mx-auto px-2 py-2 rounded-md mb-3">
                    <div className="pl-2">
                        <p className="text-sm">Level 7</p>
                        <p className="flex gap-1 text-sm text-gray-400"><span className="flex text-[#fbc347]"><img src={"/coin.svg"} width={20} height={20} alt='coin' />+7 SC</span>tokens earned</p>
                    </div>
                    <div className="button flex gap-2">
                        <button className="text-[#fbc347] border px-3 py-1 border-[#fbc347] rounded-md mr-1">Buy</button>
                        <button className="text-black border px-3 py-1 border-[#282828] bg-[#fbc347] rounded-md">Claim</button>
                    </div>
                </div>
                <div className="hello border flex justify-between bg-[#282828] border-[#1d1d1d] w-11/12 mx-auto px-2 py-2 rounded-md mb-3">
                    <div className="pl-2">
                        <p className="text-sm">Level 8</p>
                        <p className="flex gap-1 text-sm text-gray-400"><span className="flex text-[#fbc347]"><img src={"/coin.svg"} width={20} height={20} alt='coin' />+8 SC</span>tokens earned</p>
                    </div>
                    <div className="button flex gap-2">
                        <button className="text-[#fbc347] border px-3 py-1 border-[#fbc347] rounded-md mr-1" disabled={true}>Buy</button>
                        <button className="text-black border px-3 py-1 border-[#282828] bg-[#fbc347] rounded-md">Claim</button>
                    </div>
                </div>
            </div>
            <Navbar userId={userId} name={name} />
        </div>
      )
    }

export default Level