import {
  FormControl,
  Stack,
} from '@mui/material';
import { useState } from 'react';
import { useValue } from '../../../context/ContextProvider';
import InfoField from './InfoField';

const AddDetails = () => {
  const {
    state: {
      details: { buisnessName, cuisineType, menu, contactInformation },
    },
    dispatch,
  } = useValue();
  
  return (
    <Stack
      sx={{
        alignItems: 'center',
        '& .MuiTextField-root': { width: '100%', maxWidth: 500, m: 1 },
      }}
    >
      <FormControl>
        
      </FormControl>
      <InfoField
        mainProps={{ name: 'buisnessName', label: 'Buisness Name', value: buisnessName }}
        minLength={2}
      />
      <InfoField
        mainProps={{ name: 'cuisineType', label: 'Cuisine Type', value: cuisineType }}
        minLength={2}
      />
      <InfoField
        mainProps={{ name: 'menu', label: 'Menu', value: menu }}
        minLength={2}
        optionalProps={{ multiline: true, rows: 5 }}
      />
      <InfoField
        mainProps={{ name: 'contactInformation', label: 'Contact Information', value: contactInformation }}
        minLength={2}
      />
    </Stack>
  );
};

export default AddDetails;
