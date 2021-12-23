import React from 'react';
import RoomSharpIcon from '@material-ui/icons/Room';
import { Link } from 'react-router-dom';
import '../styles.css';

const Marker = ({ id }) => {
  const handleClick = (e) => {
    // props.loadIndex(props.id);
    // props.toggleModal();
  };

  return (
    <div onClick={() => handleClick()} className='marker'>
      <Link to={`location/${id}`}>
        <RoomSharpIcon fontSize='large' color='secondary' />
      </Link>
    </div>
  );
};

export default Marker;
