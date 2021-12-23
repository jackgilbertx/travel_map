import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button, TextField, IconButton } from '@mui/material';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import 'photoswipe/dist/photoswipe.css';
import 'photoswipe/dist/default-skin/default-skin.css';

import { Gallery, Item } from 'react-photoswipe-gallery';

const Location = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const [isEdit, setIsEdit] = useState(false);
  const markers = useSelector((state) => state.markers);
  const marker = markers.find((mark) => mark.id === id);

  const [title, setTitle] = useState(
    (marker && marker.title) || 'No description'
  );
  const [description, setDescription] = useState(
    (marker && marker.description) || 'No title'
  );

  useEffect(() => {
    if (!marker) {
      navigate('/');
    }
  }, []);

  const handleDelete = () => {
    // eslint-disable-next-line no-restricted-globals
    if (confirm('are you sure')) {
      console.log(id);
      dispatch({ type: 'DELETE_MARKER', payload: id });
    }
    navigate('/');
  };

  const editMarker = (e) => {
    e.preventDefault();
    console.log({ id, title, description });
    dispatch({ type: 'EDIT_MARKER', payload: { id, title, description } });
    setIsEdit(false);
  };

  const formEls = { margin: '12px 0', width: '50%' };

  const photos = [
    'https://images.unsplash.com/photo-1594818898109-44704fb548f6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80',
    'https://images.unsplash.com/photo-1594818896795-35ad7bcf3c6a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80',
    'https://images.unsplash.com/photo-1594818896744-57eca4d47b07?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80',
    'https://images.unsplash.com/photo-1594818897077-aec41f55241f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1951&q=80',
  ];

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
          <form>
            <TextField
              value={title}
              style={formEls}
              id='title'
              label='Title'
              variant='outlined'
              onChange={(e) => setTitle(e.target.value)}
            />
            <TextField
              onChange={(e) => setDescription(e.target.value)}
              value={description}
              style={formEls}
              id='description'
              label='Description'
              variant='outlined'
              multiline
              rows={2}
              rowsMax={4}
            />
            <Button
              type='submit'
              style={formEls}
              variant='contained'
              onClick={(e) => editMarker(e)}
            >
              Submit
            </Button>
            <Button
              type='submit'
              style={formEls}
              variant='contained'
              onClick={() => setIsEdit(false)}
            >
              Cancel
            </Button>
          </form>
        ) : (
          <>
            <>
              <h1>{title}</h1>
              <h3>{description}</h3>
            </>

            <div className='image-upload'>
              <Button variant='text' component='label'>
                <AddAPhotoIcon />{' '}
                <input
                  type='file'
                  accept='jpg, png, image/*;capture=camera'
                  hidden
                />
              </Button>
            </div>
            <div className='image-container'>
              <Gallery>
                {marker &&
                  marker.images &&
                  marker.images.map((image) => (
                    <Item
                      original={image.src}
                      thumbnail={image.src}
                      width='1024'
                      height='768'
                    >
                      {({ ref, open }) => (
                        <img ref={ref} onClick={open} src={image.src} />
                      )}
                    </Item>
                  ))}
                <Item
                  original='https://placekitten.com/1024/768?image=1'
                  thumbnail='https://placekitten.com/80/60?image=1'
                  width='1024'
                  height='768'
                >
                  {({ ref, open }) => (
                    <img
                      ref={ref}
                      onClick={open}
                      src='https://placekitten.com/80/60?image=1'
                    />
                  )}
                </Item>
                <Item
                  original='https://placekitten.com/1024/768?image=2'
                  thumbnail='https://placekitten.com/80/60?image=2'
                  width='1024'
                  height='768'
                >
                  {({ ref, open }) => (
                    <img
                      ref={ref}
                      onClick={open}
                      src='https://placekitten.com/80/60?image=2'
                    />
                  )}
                </Item>
              </Gallery>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Location;
