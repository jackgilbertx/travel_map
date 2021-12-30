// Import the functions you need from the SDKs you need
import { useState, useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import {
  getFirestore,
  addDoc,
  updateDoc,
  collection,
  arrayUnion,
} from 'firebase/firestore';
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  getStorage,
} from 'firebase/storage';
import {
  getAuth,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from 'firebase/auth';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyBcbR6RRtywg6IS4VDN_QCZON6D5Epu0do',
  authDomain: 'travel-map-42391.firebaseapp.com',
  projectId: 'travel-map-42391',
  storageBucket: 'travel-map-42391.appspot.com',
  messagingSenderId: '662829661913',
  appId: '1:662829661913:web:d7e0cd5609a171defcc8c8',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();

export const db = getFirestore();

export const storage = getStorage();

export const signUp = (email, password) => {
  return createUserWithEmailAndPassword(auth, email, password);
};

export const logout = () => {
  return signOut(auth);
};

export const passwordResetEmail = (email) => {
  return sendPasswordResetEmail(auth, email);
};

export const signIn = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};

onAuthStateChanged(auth, (user) => console.log('USER:', user));

export const useAuth = () => {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const unSub = onAuthStateChanged(auth, (user) => setCurrentUser(user));
    return unSub;
  }, []);

  return currentUser;
};

export const uploadImage = (file, uid, locationId) => {
  if (file && uid && locationId) {
    const storageRef = ref(
      storage,
      `${uid}/locations/${locationId}/${file.name}`
    );
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      'state_changed',
      null,
      (err) => console.log(err),
      async () => {
        const url = await getDownloadURL(uploadTask.snapshot.ref);
        console.log(url);
      }
    );
  }
};

export const uploadImages = (files, uid, locationId) => {
  const promises = [];

  Array.from(files).map((file) => {
    const storageRef = ref(
      storage,
      `${uid}/locations/${locationId}/${file.name}`
    );
    const uploadTask = uploadBytesResumable(storageRef, file);
    promises.push(uploadTask);
    uploadTask.on(
      'state_changed',
      null,
      (err) => console.log(err),
      async () => {
        const url = await storageRef.getDownloadURL();
        await updateDoc(collection(db, 'users', uid, 'locations', locationId), {
          photos: arrayUnion(url),
        });
      }
    );
  });
  Promise.all(promises);
};
