import { DocumentData } from "firebase/firestore"
import { useEffect, useState } from "react"
import { getCardsByCategory } from "../helper-functions/cards"
import { getUserLevelData } from "../helper-functions/getUser"

export function useCards(category: string, userId: number | undefined) {
  const [cards, setCards] = useState<DocumentData[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function getCards() {
      if (!userId) return
      setCards(() => [])
      try {
        const cardQs = await getCardsByCategory(category)

        for (const card of cardQs.docs) {
          const level = await cardLevel(userId, card.id)
          setCards((cards) => [
            ...cards,
            { ...card.data(), level: level ? level : 0, id: card.id },
          ])
        }
        setIsLoading(false)
      } catch (err) {
        console.log("Error from Business getCard func", err)
      }
    }
    getCards()
  }, [category, userId])

  return { isLoading, cards, setCards }
}

async function cardLevel(userId: number, documentId: string) {
  try {
    const data = await getUserLevelData(userId)
    const cardData = data.find(
      (card: { card: { id: string } }) => card.card.id == documentId
    )
    // console.log("level", cardData)
    return cardData.level
  } catch (err) {
    return
  }
}
