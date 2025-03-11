import React, { useEffect } from 'react'
import { Slot, useRouter, useSegments } from 'expo-router'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '@/Firebase/firebaseSetup'

export default function _layout() {
  const segments = useSegments();
  const [userLoggedIn, setUserLoggedIn] = React.useState(false)
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
          setUserLoggedIn(true)
      } else {
          setUserLoggedIn(false)
     }
  });
    return () => {
        unsubscribe()
    } 
  });

const router = useRouter();

useEffect(() => {
  if (userLoggedIn && (segments[0] === '(auth)')) {
    router.replace("(protected)");
  } else if (!userLoggedIn && (segments[0] === '(protected)')) {
    router.replace("(auth)/login");
  }
}, [userLoggedIn]);

  // is user logged in?
  return <Slot />;
}


