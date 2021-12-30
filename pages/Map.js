import React, { useState, useEffect } from 'react';
import GoogleMapReact from 'google-map-react';
import Marker from '../components/Marker';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useAuth, storage } from '../firebase/firesbase';
import { arrayUnion, doc, updateDoc } from 'firebase/firestore';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Modal, SwipeableDrawer } from '@mui/material';
import TextField from '@mui/material/TextField';
import Navbar from '../components/Navbar';
import { listMarkers, addMarker } from '../actions/markerActions';

const Map = (props) => {
  const navigate = useNavigate();
  const [mapDraggable, setMapDraggable] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentMarker, setCurrentMarker] = useState({});
  const [title, setTitle] = useState('');
  const [notes, setNotes] = useState('');
  const [photos, setPhotos] = useState([]);
  const user = useAuth();
  const markers = useSelector((state) => state.markers);
  const dispatch = useDispatch();
  console.log(user && user.uid);

  const closeModal = () => {
    setModalOpen(false);
  };

  const handleClick = (obj) => {
    setModalOpen(true);
    const newMarker = {
      coords: {
        lat: obj.lat,
        lng: obj.lng,
      },
    };
    setCurrentMarker(newMarker);
  };

  const createNewMarker = () => {
    const payload = { ...currentMarker, title, notes, photos };
    dispatch(addMarker(user.uid, payload));
    setModalOpen(false);
  };

  // const handleImageUpload = (e) => {
  //   console.log(Array.from(e.target.files));
  //   // setFiles(Array.from(e.target.files));
  //   const files = e.target.files;
  //   const promises = [];
  //   Array.from(files).map((file) => {
  //     const storageRef = ref(
  //       storage,
  //       `${user.uid}/locations/${id}/${file.name}`
  //     );
  //     const uploadTask = uploadBytesResumable(storageRef, file);
  //     promises.push(uploadTask);
  //     uploadTask.on(
  //       'state_changed',
  //       null,
  //       (err) => console.log(err),
  //       async () => {
  //         const url = await getDownloadURL(
  //           ref(storage, `${user.uid}/locations/${id}/${file.name}`)
  //         );
  //         await updateDoc(doc(db, 'users', user.uid, 'locations', id), {
  //           photos: arrayUnion(url),
  //         });
  //       }
  //     );
  //   });
  //   Promise.all(promises);
  // };

  useEffect(() => {
    if (user) {
      dispatch(listMarkers(user.uid));
    }
  }, [dispatch, user]);

  // const mouseDown = () => {
  //   props.onMouseDown();
  // };
  // const mouseMove = (key, childProps, coords) => {
  //   props.onMouseMove(key, childProps, coords);
  // };
  // const mouseUp = () => {
  //   props.onMouseUp();
  // };

  const createMapOptions = () => {
    return {
      fullscreenControl: false,
      clickableIcons: false,
      gestureHandling: 'greedy',
    };
  };

  const toggleDrawer = (open) => (event) => {
    setModalOpen(open);
  };

  return (
    // Important! Always set the container height explicitly
    <>
      <SwipeableDrawer
        anchor='bottom'
        open={modalOpen}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
      >
        <Box className='' sx={{ padding: '24px' }}>
          <Typography id='modal-modal-title' variant='h6' component='h2'>
            Add location!
          </Typography>

          <TextField
            fullWidth
            style={{ display: 'block', margin: '8px 0' }}
            id='title'
            label='Title'
            variant='outlined'
            onChange={(e) => setTitle(e.target.value)}
          />
          <TextField
            fullWidth
            style={{ display: 'block', margin: '4px 0' }}
            id='notes'
            label='Notes'
            variant='outlined'
            onChange={(e) => setNotes(e.target.value)}
            multiline
            rows={2}
            rowsMax={4}
          />
          {/* <Button variant='text' component='label'>
            <AddAPhotoIcon />
            <span style={{ marginLeft: '4px' }}>Add Photos</span>
            <input
              onChange={() => console.log('sdf')}
              type='file'
              accept='jpg, png, image/*;capture=camera'
              hidden
              multiple
            />
          </Button> */}
          <div style={{ marginTop: '24px', textAlign: 'right' }}>
            <Button color='error' onClick={closeModal}>
              Cancel
            </Button>
            <Button variant='contained' onClick={createNewMarker}>
              Submit
            </Button>
          </div>
        </Box>{' '}
      </SwipeableDrawer>
      <div className='map-container' style={{ height: '100vh', width: '100%' }}>
        <Navbar />
        <GoogleMapReact
          options={createMapOptions}
          draggable={true}
          // onChildMouseDown={props.mouseDown}
          // onChildMouseMove={props.mouseMove}
          // onChildMouseUp={props.mouseUp}
          bootstrapURLKeys={{ key: 'AIzaSyBrp8EpsSs69F9SM6NC6hJklZLsbU7rQa4' }}
          defaultCenter={props.center}
          defaultZoom={props.zoom}
          yesIWantToUseGoogleMapApiInternals
          onClick={(obj) => handleClick(obj)}
        >
          {markers &&
            markers.length > 0 &&
            markers.map((marker) => {
              return (
                <Marker
                  draggable={true}
                  $hover={false}
                  key={marker.id}
                  id={marker.id}
                  lat={marker.coords.lat}
                  lng={marker.coords.lng}
                  // loadIndex={loadIndex}
                />
              );
            })}
        </GoogleMapReact>
      </div>
    </>
  );
};

Map.defaultProps = {
  center: {
    lat: 44.99,
    lng: -93.22,
  },
  zoom: 8,
};

export default Map;
