'use client'
import React  from 'react';
import { Box, Table,  TableCell, TableContainer, TableHead, TableRow,Typography } from '@mui/material';

export default function Story() {

  

  const cellStyle = {
    backgroundColor: '#d1f5d1', // Светло-зеленый фон
  border: '1px solid #ccc', // Легкая граница
  boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)', // Легкая тень
  padding: '8px',
  textAlign: 'center', // Центрирование текста по горизонтали
  //display: 'flex', // Используем flex для вертикального выравнивания
  alignItems: 'center', // Выравнивание по вертикали
  justifyContent: 'center',
  fontSize: '12px', // Уменьшаем шрифт для маленьких экранов
  lineHeight: '1.8', 
  };

  return (
    <Box sx={{ padding: 2 }}>
      {/* Поисковая строка */}
      <Typography variant='h4' sx={{ marginBottom: 1 }}>
      Ітория ваших заявок
      </Typography>

      {/* Таблица с данными */}
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={cellStyle}>Название</TableCell>
              <TableCell sx={cellStyle}>Город</TableCell>
              <TableCell sx={cellStyle}>Стан</TableCell>
            </TableRow>
          </TableHead>
        
        </Table>
      </TableContainer>
    </Box>
  )
}
