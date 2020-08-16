import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyCS-YFBv2BUR9nSopf5E1e1TlMBo7SWFpo",
    authDomain: "crwn-db-4f59f.firebaseapp.com",
    databaseURL: "https://crwn-db-4f59f.firebaseio.com",
    projectId: "crwn-db-4f59f",
    storageBucket: "crwn-db-4f59f.appspot.com",
    messagingSenderId: "790307494721",
    appId: "1:790307494721:web:388e866d6976de72f55fc0",
    measurementId: "G-1MR2BWRHZD"
  };

  export const createUserProfileDocument = async (userAuth, additionalData ) => {
    if(!userAuth) return;
    
    const userRef = firestore.doc(`users/${userAuth.uid}`);

    const snapShot = await userRef.get();

    if(!snapShot.exists){
      const { displayName, email } = userAuth;
      const createAt = new Date();

      try{
        await userRef.set({
          displayName,
          email,
          createAt,
          ...additionalData
        })
      }catch(error){
        console.log('error creating user', error.message);
      }
    }

      return userRef;
  };




  firebase.initializeApp(config);

  export const auth = firebase.auth();
  export const firestore = firebase.firestore();

  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({ prompt: 'select_account'});
  export const signInWithGoogle = () => auth.signInWithPopup(provider);


  export default firebase; 



