import {
  addDoc,
  collection,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore"
import { app } from "../firebase/firebase"
import { getUserLevelData } from "./getUser"

const db = getFirestore(app)

const section = collection(db, "cards")

type Card = {
  name: string
  coinsPerHr: number
  price: number
  category: string
}

async function createCards(data: Card) {
  const exist = await checkCardExist(data.name)
  if (!exist) {
    const docRef = await addDoc(section, data)
    console.log("Document written with ID: ", docRef.id)
  }
}

async function checkCardExist(name: string) {
  const docQ = query(section, where("name", "==", name))
  const qs = await getDocs(docQ)
  if (qs.empty) {
    return false
  }
  return true
}

async function getCardsByCategory(category: string) {
  const docQ = query(section, where("category", "==", category))
  const qs = await getDocs(docQ)
  return qs
}

async function getCard(userId: number, documentId: string) {
  try {
    const data = await getUserLevelData(userId)
    const cardData = data.find(
      (card: { card: { id: string } }) => card.card.id == documentId
    )
    // console.log("level", cardData)
    return cardData
  } catch (err) {
    return
  }
}

export { createCards, getCardsByCategory, getCard }
