import React, { useState } from 'react';
import { Box, Button, Grid, Typography, Paper } from '@mui/material';
import AddFiltersPopup from './addFiltersPopup';
interface AddFiltersProps {
  onSave: () => void;
}

const AddFilters: React.FC<AddFiltersProps> = ({ onSave }) => {
  const [isDialogOpen, setIsDialogOpen] = useState<number | null>(null);
  const [chosenFilters, setChosenFilters] = useState<{ category: string; value: string }[]>([]);
  const filtersData = [
    { category: 'Тип техники:', options: ['Option 1', 'Option 2', 'Option 3', 'Option 4'] },
    { category: 'Годы выпуска	', options: ['Option A', 'Option B', 'Option C'] },
    { category: 'Марки:', options: ['Option X', 'Option Y', 'Option Z', 'Option W', 'Option V'] },
    { category: 'Модели:', options: ['Option 10', 'Option 20'] },
    { category: 'Группы запчастей:', options: ['Filter 1', 'Filter 2', 'Filter 3'] },
    { category: 'Названия запчастей:', options: ['Choice 1', 'Choice 2'] },
    { category: 'Регионы:', options: ['Selection 1', 'Selection 2', 'Selection 3'] },
    { category: 'Дополнительно:', options: ['Item 1', 'Item 2', 'Item 3', 'Item 4'] },
  ];

  const handleOpen = (index: number) => setIsDialogOpen(index);
  const handleClose = () => setIsDialogOpen(null);
  const handleSave = () => {
    onSave(); 
  };

  const handleSaveFilters = (selectedFilters: { category: string; value: string }[]) => {
    setChosenFilters((prev) => {
      // Удаляем предыдущие фильтры для текущей категории
      const category = selectedFilters[0]?.category;
      const updatedFilters = prev.filter((filter) => filter.category !== category);
      return [...updatedFilters, ...selectedFilters];
    });
    setIsDialogOpen(null); // Закрываем диалог
  };

  const getSelectedFiltersForCategory = (category: string) => {
    const filtersForCategory = chosenFilters
      .filter((filter) => filter.category === category)
      .map((filter) => filter.value);
    return filtersForCategory.length > 0 ? filtersForCategory.join(', ') : 'Всі';
  };

  return (
    <div>
      <Grid container spacing={2} sx={{ marginTop: 0 }}>
        {filtersData.map((filter, index) => (
          <Grid item xs={12} sm={6} md={6} key={index}>
            <Paper
              sx={{
                padding: 2,
                border: '1px solid #ccc',
                backgroundColor: '#f5f5f5',
                textAlign: 'center',
                width: { xs: '90%', sm: '90%' },
                margin: 'auto',
              }}
            >
              <Typography variant="h6">Block {index + 1}</Typography>
              <Button variant="contained" sx={{ marginTop: 2 }} onClick={() => handleOpen(index)}>
                Open Filters
              </Button>
              {isDialogOpen === index && (
                <AddFiltersPopup
                  onClose={handleClose}
                  optionValue={filter} // Передаём конкретный фильтр
                  onSaveFilters={handleSaveFilters}
                />
              )}
              {/* Вывод выбранных фильтров или "Всі" */}
              <Typography variant="body2" sx={{ marginTop: 2, color: 'gray' }}>
                {getSelectedFiltersForCategory(filter.category)}
              </Typography>
            </Paper>
          </Grid>
        ))}
      <Button onClick={handleSave} color="primary" sx={{ margin: 'auto' }}>
        Зберегти фільтр
      </Button>  
      </Grid>
    </div>
  );
};

export default AddFilters;
