"use client";

import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { Box, Button, Typography, Paper } from '@mui/material';
import { request } from '@request/request';
import { useRouter } from 'next/navigation'; // ⚠️ В Next.js 13+ используем 'next/navigation'

interface FilterItem {
  category: string;
  values: string[];
}

type Data = {
  id: number;
  data: FilterItem[];
};

type BoxListProps = {
  items: Data[];
  onUpdate: () => void;
};

const BoxList: React.FC<BoxListProps> = ({ items, onUpdate }) => {
  const router = useRouter(); // ⚠️ используем 'next/navigation'
  
  const redirectToHomeWithFilters = (filters: FilterItem[]) => {
    const queryParams = filters
      .map(
        (filter) =>
          `${encodeURIComponent(filter.category)}=${encodeURIComponent(
            filter.values.join(',')
          )}`
      )
      .join('&');

    router.push(`/?${queryParams}`);
  };

  const deleteItem = async (id: number) => {
    try {
      const response = await request('delete', `/filters/${id}`);
      console.log('Удаление успешно:', response.data);
      onUpdate();
      return response.data;
    } catch (error) {
      console.error('Ошибка при удалении:', error);
      throw error;
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      {items.map((item) => (
        <Box key={item.id} sx={{ marginBottom: 2, mt: 5, width: '90%' }}>
          <Paper
            sx={{
              padding: 2,
              boxShadow: 3,
              display: 'flex',
              flexDirection: 'column',
              gap: 1,
            }}
          >
            {item.data.map((filter, idx) => (
              <div key={idx}>
                <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                  {filter.category || 'Нет данных'}
                </Typography>
                <Typography variant="body2">
                  {filter.values.length > 0 ? filter.values.join(', ') : 'Нет данных'}
                </Typography>
              </div>
            ))}
            <Box sx={{ display: 'flex', justifyContent: 'space-around', marginTop: 1, gap: 1 }}>
              <Button
                variant="contained"
                onClick={() => redirectToHomeWithFilters(item.data)}
                color="primary"
                sx={{ flex: 1 }}
              >
                Шукати
              </Button>
              <Button variant="outlined" color="secondary" sx={{ flex: 1 }}>
                Редагувати
              </Button>
              <Button variant="contained" onClick={() => deleteItem(item.id)} color="error" sx={{ flex: 1 }}>
                Видалити
              </Button>
            </Box>
          </Paper>
        </Box>
      ))}
    </div>
  );
};

// ⬇️ **Используем dynamic() для рендера только на клиенте**
export default dynamic(() => Promise.resolve(BoxList), { ssr: false });
