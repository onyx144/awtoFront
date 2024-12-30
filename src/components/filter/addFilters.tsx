import React, { useState } from 'react';
import { Box, Button, Grid, Typography, Paper } from '@mui/material';
import AddFiltersPopup from './addFiltersPopup';

const FiltersContainer: React.FC = () => {
  const [isDialogOpen, setIsDialogOpen] = useState<number | null>(null);
  const [chosenFilters, setChosenFilters] = useState<{ category: string, value: string }[]>([]);
  const filtersData = [
    { category: 'Category 1', options: ["Option 1", "Option 2", "Option 3", "Option 4"] },
    { category: 'Category 2', options: ["Option A", "Option B", "Option C"] },
    { category: 'Category 3', options: ["Option X", "Option Y", "Option Z", "Option W", "Option V"] },
    { category: 'Category 4', options: ["Option 10", "Option 20"] },
    { category: 'Category 5', options: ["Filter 1", "Filter 2", "Filter 3"] },
    { category: 'Category 6', options: ["Choice 1", "Choice 2"] },
    { category: 'Category 7', options: ["Selection 1", "Selection 2", "Selection 3"] },
    { category: 'Category 8', options: ["Item 1", "Item 2", "Item 3", "Item 4"] },
  ];

  const handleOpen = (index: number) => setIsDialogOpen(index);
  const handleClose = () => setIsDialogOpen(null);
  const handleSaveFilters = (selectedFilters: { category: string, value: string }[]) => {
    setChosenFilters(selectedFilters); // Сохраняем выбранные фильтры
    setIsDialogOpen(null); // Закрываем диалог
  };
  return (
    <div>
      <Grid container spacing={2} sx={{ marginTop: 0 }}>
        {Array.from({ length: 8 }).map((_, index) => (
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
                optionValue={filtersData}
                onSaveFilters={handleSaveFilters}/>
              )}
            </Paper>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default FiltersContainer;
