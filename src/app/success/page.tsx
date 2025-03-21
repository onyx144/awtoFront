// components/SuccessMessage.tsx
import React from 'react';
import { Box, Typography, Checkbox } from '@mui/material';

const SuccessMessage: React.FC = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '90vh',
        flexDirection: 'column',
        textAlign: 'center',
        overflow: 'hidden', // Добавляем, чтобы избежать прокрутки
      }}
    >
      <Checkbox
        checked
        sx={{
          '& .MuiSvgIcon-root': {
            fontSize: 80,
            color: 'green',
          },
        }}
      />
      <Typography variant="h6" sx={{ mt: 2 }}>
  Дякуємо, ваша заявка створена, з вами зв&apos;яжуться за вашими контактними даними
</Typography>
    </Box>
  );
};

export default SuccessMessage;
