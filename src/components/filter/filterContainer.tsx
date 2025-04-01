"use client";
import React  from 'react';

import { Button , Box } from "@mui/material";
import AddFilters from "./addFilters";
import { BASE_URL , request} from "@/request/request";
interface FilterContainerProps {
  isAddFiltersVisible: boolean;

  setIsAddFiltersVisible: React.Dispatch<React.SetStateAction<boolean>>;
}


const FiltersContainer: React.FC<FilterContainerProps> = ({ isAddFiltersVisible , setIsAddFiltersVisible }) => {

  const handleAddFilterClick = () => setIsAddFiltersVisible(true);
  const handleSaveFilter = () => setIsAddFiltersVisible(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;

    if (file && file.type === 'text/csv') {
      handleAddCsvFile(file);
    } else {
      alert('Будь ласка, виберіть файл CSV');
    }
  };

  const handleAddCsvFile = async (file: File) => {
    
    if (!file) {
      alert ('Виберіть файл перед завантаженням.');      
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await request('post', '/users/csv-file' , formData);
      if (response.status === 201) {
        alert('Файл завантажено')
      }
    } catch {
      alert('Помилка завантаження файлу' );
    }
  };
  return (
    <div>
      {isAddFiltersVisible ? (
        <AddFilters onSave={handleSaveFilter} />
      ) : (
        <Box sx={{display: 'flex' , gap: 2}}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleAddFilterClick}
          sx={{mt: 5}}
        >
          Додати новий фільтр
        </Button>
        <div>
      <input
        type="file"
        accept=".csv"
        style={{ display: 'none' }}
        onChange={handleFileChange}
        id="csv-upload"
      />
      <label htmlFor="csv-upload">
        <Button
          variant="contained"
          color="primary"
          sx={{ mt: 5 }}
          component="span"
        >
          Додати csv файл
        </Button>
      </label>
    </div>
       
      <Button
          variant="contained"
          color="info"
          sx={{ mt: 5 }}
          component="span"
          onClick={() => {
            const link = document.createElement('a');
            link.href = `${BASE_URL}/uploads/example.csv`; // Путь к вашему CSV файлу
            link.download = 'example.csv'; // Имя файла при скачивании
            link.click();
          }} // Загружаем файл при изменении
        >
          Завантажити приклад CSV
        </Button>
        </Box>
      )}
    </div>
  );
};

export default FiltersContainer;
