import { Paper } from '@mui/material';
import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import ImagesList from './ImagesList';
import ProgressList from './progressList/ProgressList';

const AddImages = () => {
  const [files, setFiles] = useState([]);
  const onDrop = useCallback((acceptedFiles) => {
    setFiles(acceptedFiles);
  }, []);
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: { 'image/*': [] },
  });

  return (
    <>
      <Paper
        sx={{
          cursor: 'pointer',
          background: '#FFAC1C',
          color: '#000000',
          justifyContent: 'center',
          alignItems: 'center',
          width: '150px', 
          margin: 'auto', 
        }}
      >
        <div style={{ padding: '16px' }} {...getRootProps()}>
          <input {...getInputProps()} />
          <p style={{ textAlign: 'center' }}>Click to Upload Images</p>
          <em></em>
        </div>
      </Paper>
      <ProgressList {...{ files }} />
      <ImagesList />
    </>
  );
};

export default AddImages;
