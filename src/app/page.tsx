'use client'
import React, { useState , useEffect } from 'react';
import { Box, InputAdornment , Autocomplete , Button , TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import Item from '@/components/spares/Item';
import {request} from '@request/request';
import select from '@json/select.json'
import CircularProgress from '@mui/material/CircularProgress';
import { getRole } from '@request/request';

export default function Home() {

  
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
  partFile: Record<string, unknown>[]; // Можно уточнить тип фото, если он известен

  messageType: {
    viber: boolean;
    telegram: boolean;
    whatsapp: boolean;
    onlySms: boolean;
  };
  }
  interface Option {
    id: string;
    name: string;
  }
  // Состояние для хранения введенного поиска
  const [searchQuery, setSearchQuery] = useState<Option | null>(null);

  const [spareList] = useState<SpareData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  const [filteredData, setFilteredData] = useState<SpareData[]>([]);

  const handleSearch = () => {
    if (!searchQuery) {
      setError("Будь ласка, оберіть деталь");
      return;
    }
  
    setError('');
    window.location.href = `/spares?search=${encodeURIComponent(searchQuery.name)}`;
  };
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

  const getSpares = async () => {
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
    
    //const params = new URLSearchParams(window.location.search);
//const page = params.get("page") ? Number(params.get("page")) : 1;
//const limit = params.get("limit") ? Number(params.get("limit")) : 20;
    getSpares(); 
        }, []);

  // Обработчик поиска
  

  return (
    <Box sx={{ padding: 2 }}>
      <Box>
      {/* Поисковая строка */}
      <Typography variant='h4' sx={{ marginBottom: 1 }}>
        Пошук автозапчастин в Україні
      </Typography>
      <Autocomplete
        className="search"
        sx={{ padding: 0, minHeight: "40px" }}
        options={select.names.options}
        getOptionLabel={(option) => option.name}
        value={searchQuery}
        onChange={(_, newValue) => setSearchQuery(newValue)}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Пошук"
            variant="outlined"
            sx={{ padding: 0, minHeight: "40px" }} 
            fullWidth
            InputLabelProps={{
              shrink: true , // Поднимаем label, если есть значение
              sx: { transition: "all 0.2s ease-in-out" , }
              //top: (params.focused) ? '-6px' : '0px' , }
               // Настройка позиции
            }}
            InputProps={{
              sx: { height: "40px", padding: "0 10px" }, 
              ...params.InputProps,
              endAdornment: (
                <InputAdornment position="end">
                  <Button variant="contained" onClick={handleSearch} sx={{ minWidth: 48, height: "100%" }}>
                    Пошук
                  </Button>
                </InputAdornment>
              ),
            }}
            error={!!error}
            helperText={error}
          />
        )}
      />
    </Box>

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
  {getRole()=="salesman" &&
  <TableCell sx={cellStyle}>Звязатися</TableCell>
  }
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

