'use client'
import React, { useState , useEffect } from 'react';
import { Box, TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Typography } from '@mui/material';
import Item from '@/components/spares/Item';
import {request} from '@request/request'

export default function Home() {
  const mockData = [
    { id: '1', name: 'КПП на 1996 Mitsubishi Colt 1.5 бензин', user: 'John Doe', city: 'Мукачево', tyme: '2025-01-24T14:00:00', contact: ['viber', 'telegram'], phone: '+380123456789' },
  { id: '2', name: 'КПП на 2010 Honda Civic', user: 'Jane Doe', city: 'Киев', tyme: '2025-01-23T12:30:00', contact: ['whatsapp'], phone: '+380987654321' },
  { id: '3', name: 'КПП на 2005 Ford Focus', user: 'Alex Smith', city: 'Львов', tyme: '2025-01-22T09:00:00', contact: ['phone', 'telegram'], phone: '+380112233445' },
  { id: '4', name: 'КПП на 2015 Audi A3', user: 'Alice Johnson', city: 'Одесса', tyme: '2025-01-21T16:45:00', contact: ['viber', 'whatsapp'], phone: '+380334455667' }  ];

  
  interface SpareData {
    partName: string;
    partGroup: string;
    partType: string;
    partCondition: string;
    partId: string;
    partNumber: string;
    partDescription: string;
    partPrice: string;
    partPhotos: Record<string, unknown>[]; // Можно уточнить тип фото, если он известен
    id: string;
    city: string;
    phone: string;
    fullName: string;
    date: string; // Дата в формате ISO
    messageType: {
      viber: boolean;
      telegram: boolean;
      whatsapp: boolean;
      onlySms: boolean;
    };
  }
   
  // Состояние для хранения введенного поиска
  const [searchQuery, setSearchQuery] = useState('');
  const [spareList, setSpareList] = useState<SpareData[]>([]);

  const [filteredData, setFilteredData] = useState<SpareData[]>([]);


  const getSpares = async (page = 1, limit = 20) => {
    try {
      const response = await request('get', '/spares?page=${page}&limit=${limit}');
      console.log('Data:' , response.data)
      setFilteredData(response.data);

    } catch (error) {
      console.error("Ошибка при получении пользователей:", error);
    }
  };

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
const page = params.get("page") ? Number(params.get("page")) : 1;
const limit = params.get("limit") ? Number(params.get("limit")) : 20;
    getSpares(page , limit); 
        }, []);

  // Обработчик поиска
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);
    setFilteredData(
      spareList.filter(
        (item) =>
          item.partName.toLowerCase().includes(query.toLowerCase()) ||
          item.city.toLowerCase().includes(query.toLowerCase()) ||
          item.fullName.toLowerCase().includes(query.toLowerCase()) ||
          item.partNumber.includes(query) // Числовые значения можно фильтровать без `toLowerCase()`
      )
    );
  };

  return (
    <Box sx={{ padding: 2 }}>
      {/* Поисковая строка */}
      <Typography variant='h4' sx={{ marginBottom: 1 }}>
      Поиск любой автозапчасти в Украине
      </Typography>
      <TextField
        label="Поиск"
        variant="outlined"
        fullWidth
        value={searchQuery}
        onChange={handleSearch}
        sx={{ marginBottom: 2 }}
      />

      {/* Заголовок таблицы */}
      <Typography variant="h6" sx={{ marginBottom: 1 }}>
        Результаты поиска
      </Typography>

      {/* Таблица с данными */}
      {filteredData.length === 0 ? (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '60vh',
            flexDirection: 'column',
            textAlign: 'center',
          }}
        >
          <Typography variant="h6">
            Нажаль зараз ніхто не шукає запчастин
          </Typography>
        </Box>
      ) : (
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Название</TableCell>
                <TableCell>Город</TableCell>
                <TableCell>Отправлено</TableCell>
                <TableCell>Связь</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredData.map((item, index) => (
                <Item key={index} id={item.id} name={item.partName} city={item.city} tyme={item.date} phone={item.phone} contact={item.messageType} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  )
}
