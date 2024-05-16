import { Cancel } from '@mui/icons-material';
import {
  IconButton,
  ImageList,
  ImageListItem,
  ImageListItemBar,
} from '@mui/material';
import React from 'react';
import { useValue } from '../../../context/ContextProvider';
import deleteFile from '../../../firebase/deleteFile';

const ImagesList = () => {
  const {
    state: { images, currentUser },
    dispatch,
  } = useValue();

  const handleDelete = async (image) => {
    dispatch({ type: 'DELETE_IMAGE', payload: image });
    const imageName = image?.split(`${currentUser?.id}%2F`)[1]?.split('?')[0];
    try {
      await deleteFile(`vendors/${currentUser?.id}/${imageName}`);
    } catch (error) {
      console.log(error);
    }
  };
  
  return (
    <ImageList rowHeight={250} sx={{ gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))' }}>
      {images.map((image, index) => (
        <ImageListItem key={index} cols={1} rows={1}>
          <img
            src={image}
            alt="vendors"
            loading="lazy"
            style={{ height: '100%' }}
          />
          <ImageListItemBar
            position="top"
            actionIcon={
              <IconButton
                sx={{ color: 'white' }}
                onClick={() => handleDelete(image)}
              >
                <Cancel />
              </IconButton>
            }
          />
        </ImageListItem>
      ))}
    </ImageList>
  );
};

export default ImagesList;
