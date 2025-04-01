'use client'
import React, { useState , useEffect } from 'react';
import { Box, IconButton , InputAdornment , Autocomplete , Button , TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import Item from '@/components/spares/Item';

import {request} from '@request/request';
import select from '@json/select.json'
import SearchIcon from "@mui/icons-material/Search";
import CircularProgress from '@mui/material/CircularProgress';
import { getRole } from '@request/request';

export default function Archive() {
    interface SpareData {
        id: string;
      name: string;
      city: string;
      tyme: string;
      phone: string;
      fullName: string;
      date: string; // Дата в формате ISO
      story?: boolean;
      mark?: string;
      modelId?: string;
      partPhoto?: string[];
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
      additionalDetails: Story[];
      parts: Part[];
    }
    interface Part {
        partName: string;
        partGroup: string;
        partType: string;
        partCondition: string;
        partNumber: string;
        partDescription?: string;
        partPrice: string;
        partPhotos?: string[];
      }
    interface Story {
        condition?: string;
    type?: string;
    warranty?: number;
    mileage?: number;
    mileageUnit?: string;
    availability?: string;
    price?: number;
    currency?: string;
    inform?: string;
    salesmanId: string;
    }
    const cellStyle = {
        backgroundColor: '#d1f5d1',
        border: '1px solid #ccc',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
        padding: '8px',
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '12px',
        lineHeight: '1.8',
      };
      
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [error, setError] = useState('');
    const [spare, setSpare] = useState<SpareData[]>();
    const [firstSearch , setFirstSearch] = useState<boolean>(false);
    const handleSearch = async() => {
        if (!searchQuery) {
          setError("Будь ласка, введіть код");
          return;
        }
        setFirstSearch(true);
        try {
              const response = await request('get', `/spares/findVin/${searchQuery}`);
              const formattedData = response.data.flatMap((spare: SpareData) =>
                spare.parts.map((part) => ({
                  ...spare,
                  partName: part.partName,
                  partGroup: part.partGroup,
                  partType: part.partType,
                  partCondition: part.partCondition,
                  partNumber: part.partNumber,
                  partDescription: part.partDescription,
                  partPrice: part.partPrice,
                  photo: part.partPhotos?.[0] ?? null, // Берём первую фото, если есть
                }))
              );
              
              setSpare(formattedData);
            } catch (error) {
              console.error("Ошибка при получении пользователей:", error);
            }
    };
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
        if (error) setError("");
      };
    return (
    <Box sx={{ padding: 2 }}>
      <Typography variant='h4' sx={{ marginBottom: 1 }}>
              Архів заявок 
    </Typography>
             
    <TextField
      fullWidth
      className="search"
      sx={{padding: 0}}
      variant="outlined"
      label="Введіть vin код"
      value={searchQuery}
      onChange={handleChange}
      error={!!error}
      helperText={error}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <Button onClick={handleSearch} variant="contained" color="primary">
              Пошук
            </Button>
          </InputAdornment>
        ),
      }}
    />
    {firstSearch && (
  spare && Object.keys(spare || {}).length > 0 ? (
    <TableContainer sx={{mt: 2}}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={cellStyle}>Марка<br />Модель<br />Рік</TableCell>
              <TableCell sx={cellStyle}>Об'єм двигуна<br />Паливо<br />Тип кузова<br />Привід</TableCell>
              <TableCell sx={cellStyle}>Група запчастини<br />Тип запчастини<br />Стан</TableCell>
              <TableCell sx={cellStyle}>Назва запчастини</TableCell>
              <TableCell sx={cellStyle}>Код запчастини</TableCell>
              <TableCell sx={cellStyle}>Фото</TableCell>
              <TableCell sx={cellStyle}>Вінкод</TableCell>
              <TableCell sx={cellStyle}>Додаткова інформація</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {spare.map((item, index) => (
              <Item
                key={index}
                {...(item.partPhoto && item.partPhoto[0] && item.partPhoto[0].length > 0 ? { photo: item.partPhoto[0] } : {})}
                id={item.id}
                name={item.partName}
                city={item.city}
                email={item.email}
                phone={item.phone}
                mark={item.mark}
                storyArchive={item.additionalDetails}
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
  ) : (
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
        По вашому VIN-коду не знайдено деталей в архіві
      </Typography>
    </Box>
  )
)}
        </Box>
    
)}