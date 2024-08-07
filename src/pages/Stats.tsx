import Navbar from "../components/Navbar"

interface StatsProps {
  userId: number | undefined
  name: string | null
}
function Stats({ userId, name }: StatsProps) {
  return (
    <div className={` min-h-screen bg-[#1d1d1d] text-white`}>
      <div className="mb-8 pt-8">
        <h1 className="pl-4">Statistics</h1>
        <div className="coin border text-white border-[#1d1d1d] bg-[#282828] w-11/12 mx-auto px-2 pt-3 pb-4 mt-4 rounded-md">
          <h1 className="pl-4 pb-2">Total share balance:</h1>
          <h1 className="flex pl-4 text-4xl font-bold">
            <img
              src={"/coin.svg"}
              height={40}
              width={40}
              className="mr-1"
              alt="done"
            />
            6122
          </h1>
        </div>
      </div>
      <div className="images mb-6 flex justify-center gap-2">
        <div className="yellow">
          <p className="text-sm text-center">
            <span className="text-center">Total</span>
            <br />
            <span className="text-center">touches</span>
          </p>
          <img src={"/yellow.svg"} width={65} height={65} />
        </div>
        <div className="yellow pt-12">
          <p className="text-sm text-center">
            <span className="text-center">Total</span>
            <br />
            <span className="text-center">players</span>
          </p>
          <div className="border py-14 border-[#1d1d1d] bg-[#ba993b] rounded-md"></div>
        </div>
        <div className="yellow pt-20">
          <p className="text-sm text-center">
            <span className="text-center">Daily</span>
            <br />
            <span className="">users</span>
          </p>
          <div className="border py-10 px-3 border-[#1d1d1d] bg-[#60522a] rounded-md"></div>
        </div>
        <div className="yellow pt-28">
          <p className="text-sm text-center">
            <span className="text-center">Online</span>
            <br />
            <span className="text-center">players</span>
          </p>
          <div className="border py-6 border-[#1d1d1d] bg-[#332f21] rounded-md"></div>
        </div>
      </div>
      {/* The Last part */}
      <div className="last overflow-y-auto pb-28">
        <div className="first mb-3 flex border w-11/12 border-[#1d1d1d] bg-[#282828] px-2 py-2 rounded-md mx-auto">
          <div className="mr-3 border py-2 px-6 bg-[#fdcf48] rounded-md border-[#282828]"></div>
          <div>
            <h1 className="font-light">Total touches:</h1>
            <p className="font-medium">6,54,65,454</p>
          </div>
        </div>
        <div className="first mb-3 flex border w-11/12 border-[#1d1d1d] bg-[#282828] px-2 py-2 rounded-md mx-auto">
          <div className="mr-3 border py-2 px-6 bg-[#ba993b] rounded-md border-[#282828]"></div>
          <div>
            <h1 className="font-light">Total players:</h1>
            <p className="font-medium">10</p>
          </div>
        </div>
        <div className="first mb-3 flex border w-11/12 border-[#1d1d1d] bg-[#282828] px-2 py-2 rounded-md mx-auto">
          <div className="mr-3 border py-2 px-6 bg-[#60522a] rounded-md border-[#282828]"></div>
          <div>
            <h1 className="font-light">Daily users:</h1>
            <p className="font-medium">6,54,65,454</p>
          </div>
        </div>
        <div className="first flex border w-11/12 border-[#1d1d1d] bg-[#282828] px-2 py-2 rounded-md mx-auto">
          <div className="mr-3 border py-2 px-6 bg-[#332f21] rounded-md border-[#282828]"></div>
          <div>
            <h1 className="font-light">Onllne players:</h1>
            <p className="font-medium">6,54,65,454</p>
          </div>
        </div>
      </div>
      <Navbar userId={userId} name={name} />
    </div>
  )
}

export default Stats
