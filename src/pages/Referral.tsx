import { Flex, Spinner } from "@chakra-ui/react"
import Navbar from "../components/Navbar"
import { getQuerySnapshot } from "../helper-functions/getUser"
import { useEffect, useState } from "react"
import { DocumentData } from "firebase/firestore"
import { useRealtimeUserData } from "../hooks/useUserData"
// import Spinner from "../components/Spinner"

// const referralData = [
//   {
//     name: "Phenomenal",
//     status: "silver",
//     earned: "6.3",
//     referralEarnings: "3",
//   },
//   {
//     name: "Knowledge",
//     status: "gold",
//     earned: "16.5",
//     referralEarnings: "3",
//   },
// ]

async function getRef(userId: number | undefined) {
  if (!userId) return
  const qs = await getQuerySnapshot(userId)
  if (qs.empty) {
    console.log("User does not exist")
    return
  }
  const data = qs.docs[0].data()
  return data
}

function Referral({
  userId,
  name,
}: {
  userId: number | undefined
  name: string | null
}) {
  // const [params] = useSearchParams()
  // const userId = Number(params.get("userId"))
  // const referralId = Number(params.get("referralId"))
  // const firstName = params.get("name")
  const { isLoading, userData } = useRealtimeUserData(userId, name)
  const [referredUsers, setReferredUsers] = useState<DocumentData[]>()

  useEffect(() => {
    async function getReferredUsers() {
      setReferredUsers(() => [])
      if (!userData) return
      const qs = await getQuerySnapshot(Number(userData.userId))
      if (qs.empty) {
        console.log("User does not exist")
        return
      }
      const data = qs.docs[0].data()
      const referrals = data.referrals

      referrals.forEach(async (refId: number) => {
        const data = await getRef(refId)
        if (data) {
          setReferredUsers((ref) => {
            if (ref) {
              return [...ref, data]
            }
            return [data]
          })
        }
      })
    }

    getReferredUsers()

    return () => {}
  }, [userData])

  function handleCopy() {
    try {
      navigator.clipboard.writeText(
        `https://t.me/Greensmart_bot/?start=${userId}`
      )
    } catch (err) {
      console.log(err)
    }
  }

  // if (isLoading) {
  //   return <Spinner />
  // }
  return (
    userData && (
      <div className="h-full min-h-screen bg-[#1d1d1d] text-white">
          <h1 className="text-2xl text-center">{referredUsers?.length} Referrals</h1>
          <p className="pl-4 pb-4 pt-8">My referral link:</p>
          <div className="border px-2 py-2 w-11/12 border-[#1d1d1d] bg-[#282828] mx-auto flex justify-between rounded-md">
            <p className="text-gray-400 pt-2 pl-2">https://t.me/Greensmart_bot...</p>
            <button className="flex border border-[#282828] px-2 py-2 bg-[#fbc347] rounded-md mr-1 text-black" onClick={handleCopy}><img src={"/clip.svg"} width={18} height={18} className="mr-1 mt-1" />Copy</button>
          </div>
          <p className="pt-1 pl-4 text-gray-400 pb-12">How referral levels work? <a href={"/reflevel"} className="text-[#fbc347] underline">Check</a></p>
          <div style={{ paddingBottom: '80px', overflowY: 'auto' }}>
          <h1 className="pl-4 pb-4">My referrals:</h1>
              {isLoading || !referredUsers ? (
                <Flex justify={"center"}>
                  <Spinner color="gray.500" />
                </Flex>
              ) : (
                referredUsers.map((data) => (
                  <div>
                  <div className="mb-3 border border-[#1d1d1d] bg-[#282828] w-11/12 mx-auto flex rounded-md px-2 py-2" key={data.name}>
                    <img src={"/wilson.svg"} height={40} width={40} className="mr-2" />
                    <p className="pt-2">{data.name}</p>
                    <p>{Math.round(data.coinsEarned)}</p>
                </div>
                <div className="hidden justify-between gap-2">
                  <img src="/coin.svg" width={20} height={20} alt="coin" />
                  <p>{Math.round(data.coinsEarned)}</p>
                  <p className="text-md">+{3}k</p>
                </div>
                </div>
                ))
              )}
          </div>
          <Navbar userId={userData.userId} name={name ? name : ""} />
        </div>
    )
  )
}

export default Referral
