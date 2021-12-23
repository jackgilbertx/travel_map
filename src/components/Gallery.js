import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button, TextField, IconButton } from '@mui/material';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  LightgalleryProvider,
  LightgalleryItem,
  withLightgallery,
  useLightgallery,
} from 'react-lightgallery';

const PhotoItem = ({ image, thumb, group }) => (
  <div
    className='module-vishal'
    style={{ maxWidth: '250px', width: '200px', padding: '5px' }}
  >
    <LightgalleryItem group={group} src={image} thumb={thumb}>
      <img src={image} style={{ width: '100%' }} alt='1' />
    </LightgalleryItem>
  </div>
);

const Gallery = () => {
  const photos = [
    'https://images.unsplash.com/photo-1594818898109-44704fb548f6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80',
    'https://images.unsplash.com/photo-1594818896795-35ad7bcf3c6a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80',
    'https://images.unsplash.com/photo-1594818896744-57eca4d47b07?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80',
    'https://images.unsplash.com/photo-1594818897077-aec41f55241f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1951&q=80',
  ];
  return (
    <div>
      <LightgalleryProvider>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {photos.map((p, idx) => (
            <PhotoItem key={idx} image={p} group='group2' />
          ))}
        </div>
      </LightgalleryProvider>
    </div>
  );
};

export default Gallery;
