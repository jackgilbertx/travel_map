import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button, TextField, IconButton, dialogClasses } from '@mui/material';
import {
  useAuth,
  uploadImage,
  storage,
  uploadImages,
  db,
} from '../firebase/firesbase';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import 'photoswipe/dist/photoswipe.css';
import 'photoswipe/dist/default-skin/default-skin.css';
import { deleteMarker } from '../actions/markerActions';
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  getStorage,
} from 'firebase/storage';
import { arrayUnion, collection, doc, updateDoc } from 'firebase/firestore';
import { Gallery, Item } from 'react-photoswipe-gallery';

const Location = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const [isEdit, setIsEdit] = useState(false);
  const markers = useSelector((state) => state.markers);
  const marker = markers.find((mark) => mark.id === id);

  const [title, setTitle] = useState((marker && marker.title) || 'No title');
  const [notes, setNotes] = useState((marker && marker.notes) || 'No notes');
  const [files, setFiles] = useState([]);
  // const [urls, setUrls] = useState([]);

  const user = useAuth();

  useEffect(() => {
    console.log(marker);
    console.log(user && user.uid);
    if (!marker) {
      navigate('/');
    }
  }, []);

  const handleDelete = () => {
    // eslint-disable-next-line no-restricted-globals
    if (confirm('are you sure')) {
      console.log(id);
      dispatch(deleteMarker(user.uid, id));
    }
    navigate('/');
  };

  const editMarker = (e) => {
    e.preventDefault();
    console.log({ id, title, notes });
    dispatch({ type: 'EDIT_MARKER', payload: { id, title, notes } });
    setIsEdit(false);
  };

  const handleImageUpload = (e) => {
    console.log(Array.from(e.target.files));
    setFiles(Array.from(e.target.files));
    const files = e.target.files;
    const promises = [];
    Array.from(files).map((file) => {
      const storageRef = ref(
        storage,
        `${user.uid}/locations/${id}/${file.name}`
      );
      const uploadTask = uploadBytesResumable(storageRef, file);
      promises.push(uploadTask);
      uploadTask.on(
        'state_changed',
        null,
        (err) => console.log(err),
        async () => {
          const url = await getDownloadURL(
            ref(storage, `${user.uid}/locations/${id}/${file.name}`)
          );
          await updateDoc(doc(db, 'users', user.uid, 'locations', id), {
            photos: arrayUnion(url),
          });
        }
      );
    });
    Promise.all(promises);
  };

  const formEls = { margin: '12px 0' };

  return (
    <>
      <div className='location-page-nav'>
        <Link style={{ textDecoration: 'none' }} to='/'>
          <Button variant='outlined'>Back to Map</Button>
        </Link>
        <div className='edit-delete'>
          <Button variant='text' onClick={() => setIsEdit(true)}>
            Edit Text
          </Button>
          <Button variant='contained' color='error' onClick={handleDelete}>
            Delete
          </Button>
        </div>
      </div>
      <div className='location-container'>
        {isEdit ? (
          <form className='edit-form'>
            <TextField
              value={title}
              style={formEls}
              fullWidth
              id='title'
              label='Title'
              variant='outlined'
              onChange={(e) => setTitle(e.target.value)}
            />
            <TextField
              onChange={(e) => setNotes(e.target.value)}
              value={notes}
              style={formEls}
              className='edit-field'
              id='notes'
              label='Notes'
              variant='outlined'
              multiline
              fullWidth
              rows={2}
              rowsMax={4}
            />
            <div style={{ display: 'flex', width: '100%' }}>
              <Button
                fullWidth
                style={formEls}
                variant='text'
                onClick={() => setIsEdit(false)}
                color='error'
              >
                Cancel
              </Button>
              <Button
                fullWidth
                style={formEls}
                variant='contained'
                onClick={(e) => editMarker(e)}
              >
                Submit
              </Button>
            </div>
          </form>
        ) : (
          <>
            <div className='details'>
              <h1>{title}</h1>
              <h3>{notes}</h3>
            </div>

            <div className='image-upload'>
              <Button
                variant='contained'
                component='label'
                style={{ textAlign: 'center', margin: '20px 0' }}
              >
                <AddAPhotoIcon style={{ width: '20px', height: '20px' }} />
                <span style={{ marginLeft: '4px' }}>Add Photos</span>
                <input
                  onChange={handleImageUpload}
                  type='file'
                  accept='jpg, png, image/*;capture=camera'
                  hidden
                  multiple
                />
              </Button>
            </div>
          </>
        )}
        <div className='image-container'>
          <Gallery>
            {marker &&
              marker.photos &&
              marker.photos.map((photo) => (
                <Item
                  original={photo}
                  thumbnail={photo}
                  width={280}
                  height={420}
                >
                  {({ ref, open }) => (
                    <div>
                      <img ref={ref} onClick={open} src={photo} alt='herere' />
                    </div>
                  )}
                </Item>
              ))}
          </Gallery>
        </div>
      </div>
    </>
  );
};

export default Location;
