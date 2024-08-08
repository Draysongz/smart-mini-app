import { useEffect, useState } from "react";
import { getUserData, setupRealtimeListener } from "../helper-functions/getUser";
import { DocumentData } from "firebase/firestore";

// Hook for real-time updates
function useRealtimeUserData(
  userId: number | undefined,
  firstName: string | null,
  referralId?: number
) {
  const [userData, setUserData] = useState<DocumentData>();
  const [isLoading, setIsLoading] = useState(true);
  const [name, setName] = useState<string | null>(null);
  let unsubscribe: (() => void) | undefined;

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!userId || !firstName) return;
        
        const result = await getUserData(userId, firstName, referralId);
        if (!result) return;
        
        const { data, docId } = result; // Destructure the result
        setUserData(data);
        setName(firstName);
        setIsLoading(false);

     
          unsubscribe = setupRealtimeListener(docId, (updatedData) => {
            setUserData(updatedData);
          
          })
      } catch (error) {
        console.log("useRealtimeUserData", error);
      }
    };

    fetchData();

    // Clean up the listener on unmount
    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, [userId, firstName, referralId]);

  return { isLoading, userData, name };
}

// Hook without real-time updates
function useStaticUserData(
  userId: number | undefined,
  firstName: string | null,
  referralId?: number
) {
  const [userData, setUserData] = useState<DocumentData>();
  const [isLoading, setIsLoading] = useState(true);
  const [name, setName] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!userId || !firstName) return;
        
        const result = await getUserData(userId, firstName, referralId);
        if (!result) return;
        
        const { data } = result; // Destructure the result
        setUserData(data);
        setName(firstName);
        setIsLoading(false);
      } catch (error) {
        console.log("useStaticUserData", error);
      }
    };

    fetchData();
  }, [userId, firstName, referralId]);

  return { isLoading, userData, name };
}

// Export both hooks
export { useRealtimeUserData, useStaticUserData };
