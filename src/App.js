import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Map from './components/Map';
import Location from './components/Location';
import Gallery from './components/Gallery';
import './styles.css';

const App = () => {
  // const [mapDraggable, setMapDraggable] = useState(true);
  // const [modalInfoId, setmodalInfoId] = useState(null);

  // Drag markers
  // const onMouseDown = () => {
  //   setMapDraggable(false);
  // };

  // const onMouseMove = (key, childProps, coords) => {
  //   const markers = this.state.markers;
  //   const index = this.state.markers.findIndex(
  //     (marker) => marker.id === childProps.id
  //   );
  //   markers[index].coords = {
  //     lat: coords.lat,
  //     lng: coords.lng,
  //   };
  //   setMarkers(markers);
  // };

  // const onMouseUp = (childKey, childProps, mouse) => {
  //   setMapDraggable(true);
  // };

  // when submitting comments you can add fields to the last element of the markers array and have a modal inside the marker component with the comments

  // const deleteMarker = (id) => {
  //   const newMarkers = this.state.markers.filter((marker) => {
  //     return marker.id !== id;
  //   });
  //   setMarkers(newMarkers);
  // };

  // const getModalInfo = (id) => {
  //   const index = this.state.markers.findIndex((marker) => marker.id === id);
  //   return this.state.markers[index];
  // };

  // const appendData = (comments, dateVisited, photos) => {
  //   const markers = this.state.markers;
  //   const index = markers.length - 1;
  //   markers[index].comments = comments;
  //   markers[index].dateVisited = dateVisited;
  //   markers[index].photos = photos;
  //   setMarkers(markers);
  //   console.log(this.state.markers);
  // };

  return (
    <Router>
      <div className='container'>
        <Routes>
          <Route path='/' element={<Map />} />
          <Route path='/gallery' element={<Gallery />} />
          <Route path='/location/:id' element={<Location />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
