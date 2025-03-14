'use client'
import React, { useState } from 'react';
import { Box, TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Typography } from '@mui/material';
import Item from '@/components/spares/Item';

export default function Story() {
  const mockData = [
    { id: '1', name: 'КПП на 1996 Mitsubishi Colt 1.5 бензин', user: 'John Doe', city: 'Мукачево', tyme: '2025-01-24T14:00:00', contact: ['viber', 'telegram'], phone: '+380123456789' },
  { id: '2', name: 'КПП на 2010 Honda Civic', user: 'Jane Doe', city: 'Киев', tyme: '2025-01-23T12:30:00', contact: ['whatsapp'], phone: '+380987654321' },
  { id: '3', name: 'КПП на 2005 Ford Focus', user: 'Alex Smith', city: 'Львов', tyme: '2025-01-22T09:00:00', contact: ['phone', 'telegram'], phone: '+380112233445' },
  { id: '4', name: 'КПП на 2015 Audi A3', user: 'Alice Johnson', city: 'Одесса', tyme: '2025-01-21T16:45:00', contact: ['viber', 'whatsapp'], phone: '+380334455667' }  ];

  

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
