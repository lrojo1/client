// Responsible for loading every file into Firebase
import { CheckCircleOutline } from '@mui/icons-material';
import { Box, ImageListItem } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import uploadFileProgress from '../../../../firebase/uploadFileProgress';
import { useValue } from '../../../../context/ContextProvider';

const ProgressItem = ({ file }) => {
  const [progress, setProgress] = useState(0);
  const [imageURL, setImageURL] = useState(null);
  const {
    state: { currentUser },
    dispatch,
  } = useValue();

  useEffect(() => {
    const uploadImage = async () => {
      const imageName = uuidv4() + '.' + file.name.split('.').pop();
      try {
        const url = await uploadFileProgress(
          file,
          `vendors/${currentUser?.id}`,
          imageName,
          setProgress
        );

        dispatch({ type: 'UPDATE_IMAGES', payload: url });
        setImageURL(null);
      } catch (error) {
        dispatch({
          type: 'UPDATE_ALERT',
          payload: { open: true, severity: 'error', message: error.message },
        });
        console.log(error);
      }
    };
    setImageURL(URL.createObjectURL(file));
    uploadImage();
  }, [file]);

  return (
    imageURL && (
      <ImageListItem cols={1} rows={1}>
        <img src={imageURL} alt="gallery" loading="lazy" />
        <Box sx={backDrop}>
          {progress < 100 ? (
             null
          ) : (
            <CheckCircleOutline
              sx={{ width: 60, height: 60, color: 'lightgreen' }}
            />
          )}
        </Box>
      </ImageListItem>
    )
  );
};

export default ProgressItem;

const backDrop = {
  position: 'absolute',
};
