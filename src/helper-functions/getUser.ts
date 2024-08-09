/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
  doc,
  updateDoc,
  addDoc,
  arrayUnion,
  FieldValue,
  increment,
  onSnapshot,
} from "firebase/firestore"
import { app } from "../firebase/firebase"

const db = getFirestore(app)

export type User = {
  coinsEarned: number
  floatingTapEnergy: number
  lastUpdatedTime: FieldValue
  name: string
  referralLink: string
  referrals: number[]
  refillEnergy: number
  refillTime: number
  status: string
  tapEnergy: number
  tapPower: number
  userId: number
  energyLevel: number
  rechargeLevel: number
  coinsPerHour: number
}

async function getQuerySnapshot(userId: number) {
  const q = query(collection(db, "smart"), where("userId", "==", userId))
  const qs = await getDocs(q)
  return qs
}

async function getUserData(userId: number, name: string, referralId?: number) {
  try {
    const userCollectionRef = collection(db, "smart")
    const userQuery = query(userCollectionRef, where("userId", "==", userId))

    // Query to get the user document snapshot
    const querySnapshot = await getDocs(userQuery)

    if (querySnapshot.empty) {
      // User does not exist, create it
      await createUser(userId, name)
      const newUserQuerySnapshot = await getDocs(userQuery)
      const newUserDoc = newUserQuerySnapshot.docs[0]
      if (referralId && referralId !== userId) {
        await updateReferralData(userId, referralId)
      }
      const newData = newUserDoc.data()
      return { data: newData, docId: newUserDoc.id }
    } else {
      // User exists, return initial data
      const userDoc = querySnapshot.docs[0]
      const userData = userDoc.data()
      return { data: userData, docId: userDoc.id }
    }
  } catch (err) {
    console.log(err)
    return null
  }
}

async function getUserLevelData(userId: number) {
  const userCollectionRef = collection(db, "smart")
  const userQuery = query(userCollectionRef, where("userId", "==", userId))
  const querySnapshot = await getDocs(userQuery)
  const userDoc = querySnapshot.docs[0]
  const userData = userDoc.data()
  return userData.cardLevels
}

function setupRealtimeListener(docId: string, callback: (data: any) => void) {
  const userDocRef = doc(db, "smart", docId)
  return onSnapshot(userDocRef, (docSnapshot) => {
    if (docSnapshot.exists()) {
      const data = docSnapshot.data()
      callback(data)
    }
  })
}

// eslint-disable-next-line @typescript-eslint/ban-types
async function updateUserData(userId: number, updates: {}) {
  const qs = await getQuerySnapshot(userId)
  if (qs.empty) {
    console.log("No user found with that ID.")
    return null // Or throw an error if preferred
  }
  const docRef = doc(db, "smart", qs.docs[0].id)
  await updateDoc(docRef, { ...updates })
}

async function createUser(userId: number, name: string) {
  const docRef = await addDoc(collection(db, "smart"), {
    coinsEarned: 1000,
    floatingTapEnergy: 1000,
    lastUpdatedTime: Date.now() / 1000,
    energyLevel: 1,
    rechargeLevel: 1,
    tapbotLevel: 1,
    name,
    referrals: [],
    refillEnergy: 5,
    refillTime: 3,
    status: "active",
    tapEnergy: 1000,
    tapPower: 1,
    userId: userId,
    referralLink: null,
    coinsPerHour: 0,
  })
  console.log("Document written with ID: ", docRef.id)
}

async function updateReferralData(userId: number, referralId: number) {
  try {
    const qs = await getQuerySnapshot(referralId)
    if (qs.empty) {
      console.log("No user found with that ID.")
      return null // Or throw an error if preferred
    }
    const docRef = doc(db, "smart", qs.docs[0].id)
    await updateDoc(docRef, {
      coinsEarned: increment(3000),
      referrals: arrayUnion(userId),
    })
  } catch (err) {
    console.log(err)
  }
}

export {
  getUserData,
  updateUserData,
  getQuerySnapshot,
  setupRealtimeListener,
  getUserLevelData,
}
