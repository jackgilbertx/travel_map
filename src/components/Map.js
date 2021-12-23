import React, { useState, useEffect } from 'react';
import GoogleMapReact from 'google-map-react';
import Marker from './Marker';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import MarkerModal from './MarkerModal';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Navbar from '../components/Navbar';

const Map = (props) => {
  const [mapDraggable, setMapDraggable] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentMarker, setCurrentMarker] = useState({});
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [images, setImages] = useState([]);

  const closeModal = () => {
    setModalOpen(false);
  };

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '80%',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  const navigate = useNavigate();

  const markers = useSelector((state) => state.markers);
  const dispatch = useDispatch();

  const handleClick = (obj) => {
    setModalOpen(true);

    console.log(obj);
    const newMarker = {
      id: String(markers.length + 1),
      coords: {
        lat: obj.lat,
        lng: obj.lng,
      },
    };
    setCurrentMarker(newMarker);
    console.log(newMarker);
    // dispatch({
    //   type: 'ADD_MARKER',
    //   payload: newMarker,
    // });
  };

  const createNewMarker = () => {
    const payload = { ...currentMarker, title, description, images };
    console.log(payload);
    dispatch({
      type: 'ADD_MARKER',
      payload: payload,
    });
    setModalOpen(false);
  };

  const handleImageUpload = (e) => {
    console.log(e.target.files[0]);
    Array.from(e.target.files).forEach((image) => {
      let img = new Image();
      img.src = window.URL.createObjectURL(image);
      img.onload = () => {
        console.log(img, img.src, img.width, img.height);
        setImages((state) => [...state, img]);
      };
      // console.log(images)
    });

    // const img = new Image();
    // img.src = window.URL.createObjectURL(e.target.files[0]);
    // img.onload = () => {
    //   alert(img.width + ' ' + img.height);
    // };
    // const images = Array.from(e.target.files).map((image) =>
    //   URL.createObjectURL(image)
    // );
    // setImages(images);
  };

  useEffect(() => {
    if (markers) {
      console.log(markers);
    }
  }, [markers]);

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
    };
  };

  return (
    // Important! Always set the container height explicitly
    <>
      <Navbar />
      <Modal
        open={modalOpen}
        // onClose={closeModal}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box sx={style}>
          <Typography id='modal-modal-title' variant='h6' component='h2'>
            Add location!
          </Typography>
          {/* <Typography id='modal-modal-description' sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography> */}

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
            id='description'
            label='Description'
            variant='outlined'
            onChange={(e) => setDescription(e.target.value)}
            multiline
            rows={2}
            rowsMax={4}
          />
          <Button variant='text' component='label'>
            <AddAPhotoIcon />
            <span style={{ marginLeft: '4px' }}>Add Photos</span>
            <input
              onChange={handleImageUpload}
              type='file'
              accept='jpg, png, image/*;capture=camera'
              hidden
              multiple
            />
          </Button>
          <div style={{ marginTop: '24px', textAlign: 'right' }}>
            <Button color='error' onClick={closeModal}>
              Cancel
            </Button>
            <Button variant='contained' onClick={createNewMarker}>
              Submit
            </Button>
          </div>
        </Box>
      </Modal>
      <div style={{ height: '100vh', width: '100%' }}>
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
