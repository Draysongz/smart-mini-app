const Airdrop = () => {
    return(
        <div className="socials">
          <h1 className="mb-4 pl-2 text-white">Join our socials</h1>
          <div className="one border border-[#1d1d1d] bg-[#282828] w-11/12 px-2 py-3 mb-2 rounded-md mx-auto flex justify-between">
            <div className="flex">
              <img src={"/telegram.svg"} height={30} width={30} className="mr-2" />
              <div className="text">
                <p className="text-sm text-white">Telegram</p>
                <p className="flex gap-1 text-sm text-gray-400"><span className="flex text-[#fbc347]"><img src={"/coin.svg"} width={20} height={20} />+2 SC</span>tokens earned</p>
              </div>
            </div>
            <div className="icon">
              <img src={"/verified.svg"} width={20} height={20} className='mr-4 mt-3' />
            </div>
          </div>
          <div className="one border border-[#1d1d1d] bg-[#282828] w-11/12 px-2 py-3 mb-2 rounded-md mx-auto flex justify-between">
            <div className="flex">
              <img src={"/telegram.svg"} height={30} width={30} className="mr-2" />
              <div className="text">
                <p className="text-sm text-white">Telegram group</p>
                <p className="flex gap-1 text-sm text-gray-400"><span className="flex text-[#fbc347]"><img src={"/coin.svg"} width={20} height={20} />+2 SC</span>tokens earned</p>
              </div>
            </div>
            <div className="icon">
              <img src={"/verified.svg"} width={20} height={20} className='mr-4 mt-3' />
            </div>
          </div>
          <div className="one border border-[#1d1d1d] bg-[#282828] w-11/12 px-2 py-3 rounded-md mx-auto flex justify-between">
            <div className="flex">
              <img src={"/x.svg"} height={30} width={30} className="mr-2" />
              <div className="text">
                <p className="text-sm text-white">X</p>
                <p className="flex gap-1 text-sm text-gray-400"><span className="flex text-[#fbc347]"><img src={"/coin.svg"} width={20} height={20} />+2 SC</span>tokens earned</p>
              </div>
            </div>
            <div className="icon pt-2 hidden">
              <img src={"/verified.svg"} width={20} height={20} className='mr-4' />
            </div>
          </div>
        </div>
    )
}

export default Airdrop;