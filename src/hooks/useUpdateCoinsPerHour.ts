import { DocumentData, doc, arrayRemove, arrayUnion } from "firebase/firestore"
import { Dispatch, SetStateAction, useState } from "react"
import Toastify from "toastify-js"
import { db } from "../firebase/firebase"
import { getCard } from "../helper-functions/cards"
import { updateUserData } from "../helper-functions/getUser"

export function useUpdateCoinsPerHour() {
  const [isLoading, setIsLoading] = useState(true)

  const updateCoinsPerHour = async (
    userId: number | undefined,
    price: number,
    perHr: number,
    index: number,
    cards: DocumentData[],
    userData: DocumentData | undefined,
    setCards: Dispatch<SetStateAction<DocumentData[]>>
  ) => {
    if (!userId) return

    if (price > userData?.coinsEarned) {
      Toastify({
        text: "insufficient coins",
        duration: 3000,
        gravity: "top",
        position: "center",
        stopOnFocus: false,
        style: {
          background: "rgba(225,0,0,0.7)",
        },
      }).showToast()
      return
    }

    try {
      // update user levels
      await updateLevels(userId, cards, index)
      const newCoinsPerHour = userData?.coinsPerHour + perHr
      await updateUserData(userId, {
        coinsPerHour: newCoinsPerHour,
        coinsEarned: userData?.coinsEarned - price,
      })
    } catch (err) {
      console.log("Error from useUpdateCoinsPerHour", err)
    }

    const updateCards = [...cards]
    updateCards[index].level += 1
    setCards(updateCards)
    Toastify({
      text: "Card purchased",
      duration: 3000,
      gravity: "top",
      position: "center",
      stopOnFocus: false,
      style: {
        background: "rgba(0,0,0,0.5)",
      },
    }).showToast()
    setIsLoading(false)
  }

  return { isLoading, updateCoinsPerHour }
}

async function updateLevels(
  userId: number,
  cards: DocumentData[],
  index: number
) {
  const docRef = doc(db, "cards", cards[index].id)
  const data = await getCard(userId, cards[index].id)

  if (data !== undefined) {
    await updateUserData(userId, {
      cardLevels: arrayRemove({ card: docRef, level: cards[index].level }),
    })
    await updateUserData(userId, {
      cardLevels: arrayUnion({ card: docRef, level: cards[index].level + 1 }),
    })
  } else {
    await updateUserData(userId, {
      cardLevels: arrayUnion({ card: docRef, level: 1 }),
    })
  }
}
