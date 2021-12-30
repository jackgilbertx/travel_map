import { useAuth, db, storage } from '../firebase/firesbase';
import {
  collection,
  getDocs,
  doc,
  getDoc,
  setDoc,
  addDoc,
  deleteDoc,
} from 'firebase/firestore';
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  getStorage,
} from 'firebase/storage';

export const addMarker = (uid, payload) => async (dispatch) => {
  try {
    const { id } = await addDoc(
      collection(db, 'users', uid, 'locations'),
      payload
    );
    dispatch({ type: 'ADD_MARKER', payload: { ...payload, id } });
  } catch (err) {
    console.log(err);
  }
};

export const listMarkers = (uid) => async (dispatch) => {
  try {
    const querySnapshot = await getDocs(
      collection(db, 'users', uid, 'locations')
    );
    const locations = [];
    querySnapshot.forEach((doc) => {
      locations.push({ id: doc.id, ...doc.data() });
    });
    dispatch({ type: 'LIST_MARKERS', payload: locations });
    // const querySnapshot = await getDoc(
    //   doc(db, 'users', 'user1', 'locations', 'location1')
    // );
    // console.log(querySnapshot.data().photos);
  } catch (err) {
    console.error(err);
  }
};

export const deleteMarker = (uid, id) => async (dispatch) => {
  console.log(uid, id);
  try {
    await deleteDoc(doc(db, 'users', uid, 'locations', id));
    dispatch({ type: 'DELETE_MARKER', payload: id });
  } catch (err) {
    console.log(err);
  }
};

// export const uploadImages = async (files, uid, locationId) => {
//   const storageRef = ref(
//     storage,
//     `${uid}/locations/${locationId}/${file.name}`
//   );
//   const uploadTask = uploadBytesResumable(storageRef, file);
//   uploadTask.on(
//     'state_changed',
//     null,
//     (err) => console.log(err),
//     async () => {
//       const url = await getDownloadURL(uploadTask.snapshot.ref);
//     }
//   );
// };
