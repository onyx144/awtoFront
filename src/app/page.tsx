'use client'
import React, { useState , useEffect } from 'react';
import { Box, TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Typography } from '@mui/material';
import Item from '@/components/spares/Item';
import {request} from '@request/request'
import CircularProgress from '@mui/material/CircularProgress';

export default function Home() {
  const mockData = [
    { id: '1', name: 'КПП на 1996 Mitsubishi Colt 1.5 бензин', user: 'John Doe', city: 'Мукачево', tyme: '2025-01-24T14:00:00', contact: ['viber', 'telegram'], phone: '+380123456789' },
  { id: '2', name: 'КПП на 2010 Honda Civic', user: 'Jane Doe', city: 'Киев', tyme: '2025-01-23T12:30:00', contact: ['whatsapp'], phone: '+380987654321' },
  { id: '3', name: 'КПП на 2005 Ford Focus', user: 'Alex Smith', city: 'Львов', tyme: '2025-01-22T09:00:00', contact: ['phone', 'telegram'], phone: '+380112233445' },
  { id: '4', name: 'КПП на 2015 Audi A3', user: 'Alice Johnson', city: 'Одесса', tyme: '2025-01-21T16:45:00', contact: ['viber', 'whatsapp'], phone: '+380334455667' }  ];

  
  interface SpareData {
    id: string;
  name: string;
  user?: string;
  city: string;
  tyme: string;
  phone: string;
  fullName: string;
  date: string; // Дата в формате ISO
  story?: boolean;
  mark?: string;
  modelId?: string;
  years?: string;
  engineSize?: string;
  fuelID?: string;
  bodyTypeID?: string;
  axleID?: string;
  vin?: string;
  photo?: string;
  email: string;
  partName: string;
  partGroup: string;
  partType: string;
  partCondition: string;
  partId: string;
  partNumber: string;
  partDescription?: string;
  partPrice: string;
  partPhotos: Record<string, unknown>[]; // Можно уточнить тип фото, если он известен

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
  const [loading, setLoading] = useState(true);

  const [filteredData, setFilteredData] = useState<SpareData[]>([]);

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

  const getSpares = async (page = 1, limit = 20) => {
    try {const queryParams = window.location.search; 
      const response = await request('get', `/spares${queryParams}`);
      console.log('Data:' , response.data)
      setFilteredData(response.data);

    } catch (error) {
      console.error("Ошибка при получении пользователей:", error);
    }
  };
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);
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
      
      {loading ? (
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
          <CircularProgress />
          <Typography variant="h6" sx={{ mt: 2 }}>
            Завантаження...
          </Typography>
        </Box>
      ) : filteredData.length === 0 ? (
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
  <TableCell sx={cellStyle}>
    Марка
    <br />
    Модель
    <br />
    Рік
  </TableCell>
  <TableCell sx={cellStyle}>
    Обєм двигуна
    <br />
    Паливо
    <br />
    Тип кузова
    <br />
   
    Привід
  </TableCell>
  <TableCell sx={cellStyle}>
    Група запчастини
    <br />
    Тип запчастини
    <br />
    Стан
  </TableCell>
  <TableCell sx={cellStyle}>Назва запчастини</TableCell>
  <TableCell sx={cellStyle}>Код запчастини</TableCell>
  <TableCell sx={cellStyle}>Фото</TableCell>
  <TableCell sx={cellStyle}>Вінкод</TableCell>
  <TableCell sx={cellStyle}>Додаткова інформація</TableCell>
  <TableCell sx={cellStyle}>Звязатися</TableCell>
  </TableRow>
</TableHead>

            <TableBody>
              {filteredData.map((item, index) => (
                <Item
                key={index}
                id={item.id}
                name={item.partName}
                user={item.user}
                city={item.city}
                email={item.email}
                phone={item.phone}
                contact={item.messageType}
                story={item.story}
                mark={item.mark}
                modelId={item.modelId}
                years={item.years}
                engineSize={item.engineSize}
                fuelID={item.fuelID}
                bodyTypeID={item.bodyTypeID}
                axleID={item.axleID}
                partGroup={item.partGroup}
                partType={item.partType}
                partCondition={item.partCondition}
                partNumber={item.partNumber}
                photo={item.photo}
                vin={item.vin}
                time={item.date}
                partDescription={item.partDescription}
              />
              
              
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  )
}

