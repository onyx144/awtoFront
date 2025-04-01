'use client';

import React, { useEffect, useState } from 'react';
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import { request } from '@request/request';
import Item from '@/components/spares/Item';
import { AxiosError } from 'axios';



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

interface SpareData {
    id: string;
  name: string;
  partPhoto?: string[];
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
  archive: boolean;
  partDescription?: string;
  partPrice: string;
  partFile: Record<string, unknown>[]; // Можно уточнить тип фото, если он известен

  messageType: {
    viber: boolean;
    telegram: boolean;
    whatsapp: boolean;
    onlySms: boolean;
  };
  parts: Part[];
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

export default function Story() {
  const [spare, setSpare] = useState<SpareData[]>([]);

  const getStory = async () => {
    try {
      const response = await request('get', '/spares/story');
      console.log(response.data);
      
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
      console.log(formattedData);
    } catch (error: unknown) {
      if (error instanceof AxiosError && error.response?.data?.message) {
              alert(error.response.data.message);
      } else {
        alert('Помилка');
      }
    }
  };

  useEffect(() => {
    getStory();
  }, []);

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant='h4' sx={{ marginBottom: 1 }}>
        Історія ваших заявок
      </Typography>

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={cellStyle}>Марка<br />Модель<br />Рік</TableCell>
              <TableCell sx={cellStyle}>Об`&apos;`єм двигуна<br />Паливо<br />Тип кузова<br />Привід</TableCell>
              <TableCell sx={cellStyle}>Група запчастини<br />Тип запчастини<br />Стан</TableCell>
              <TableCell sx={cellStyle}>Назва запчастини</TableCell>
              <TableCell sx={cellStyle}>Код запчастини</TableCell>
              <TableCell sx={cellStyle}>Фото</TableCell>
              <TableCell sx={cellStyle}>Вінкод</TableCell>
              <TableCell sx={cellStyle}>Додаткова інформація</TableCell>
              <TableCell sx={cellStyle}>Стан</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {spare.map((item, index) => (
              <Item
                key={index}
                {...(item.partPhoto && item.partPhoto[0] && item.partPhoto[0].length > 0 ? { photo: item.partPhoto[0] } : {})}
                id={item.id}
                name={item.partName}
                user={item.user}
                city={item.city}
                email={item.email}
                phone={item.phone}
                contact={item.messageType}
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
                archive={item.archive}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
