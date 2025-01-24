import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Grid,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
} from '@mui/material';
import ModelBox from './modelBox'
type NestedCategory = {
  [key: string]: 
    | string 
    | string[] 
    | string[][] 
    | NestedCategory;
};

interface AddFiltersProps {
  onClose: () => void;
  optionValue: { category: string; options?: string[]; minCategory?: NestedCategory };
  onSaveFilters: (filters: { category: string; value: string }[]) => void;
  
}

const AddFiltersPopup: React.FC<AddFiltersProps> = ({ onClose, optionValue, onSaveFilters }) => {
  const [selectedValues, setSelectedValues] = useState<string[]>([]);
  const [chosenValues, setChosenValues] = useState<{ category: string; value: string }[]>([]);

  const handleAdd = () => {
    setChosenValues((prev) => [
      ...prev,
      ...selectedValues.map((value) => ({ category: optionValue.category, value })),
    ]);
    setSelectedValues([]); // Очищаем выбранные
  };

  const handleRemove = () => {
    setChosenValues((prev) =>
      prev.filter((filter) => !selectedValues.includes(filter.value))
    );
    setSelectedValues([]); // Очищаем выбранные
  };

  const handleSelectValue = (value: string, event: React.MouseEvent) => {
    if (event.ctrlKey) {
      setSelectedValues((prev) =>
        prev.includes(value)
          ? prev.filter((v) => v !== value)
          : [...prev, value]
      );
    } else {
      setSelectedValues([value]); // Без Ctrl выбираем только одно значение
    }
  };

  const handleSave = () => {
    onSaveFilters(chosenValues); // Передаем выбранные фильтры в родительский компонент
    onClose(); // Закрываем диалог
  };

  return (
    <Dialog open onClose={onClose} maxWidth="lg" fullWidth>
      <DialogTitle>Фильтр по моделям</DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          {/* Левая колонка - Доступные фильтры */}
          <Grid item xs={6}>
            <Typography variant="h6">{optionValue.category}</Typography>
            <Paper style={{ maxHeight: 300, minHeight: 300, overflow: 'auto' }}>
            {optionValue.options && (
 
              <List>
             
             
             {optionValue.options?.map((value) => (
                  <ListItem key={value} disablePadding>
                    <ListItemButton
                      onClick={(event) => handleSelectValue(value, event)}
                      selected={selectedValues.includes(value)}
                    >
                      <ListItemText primary={value} />
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
            )}
            {optionValue.minCategory && (
              <ModelBox/>
            )}
            </Paper>
          </Grid>

          {/* Правая колонка - Выбранные фильтры */}
          <Grid item xs={6}>
            <Typography variant="h6">Selected Filters</Typography>
            <Paper style={{ maxHeight: 300, minHeight: 300, overflow: 'auto' }}>
              <List>
                {chosenValues.map((filter, index) => (
                  <ListItem key={index}>
                    <ListItemText primary={`${filter.value}`} />
                  </ListItem>
                ))}
              </List>
            </Paper>
          </Grid>
        </Grid>

        {/* Кнопки управления */}
        <Box display="flex" justifyContent="center" marginTop={2}>
          <Button
            variant="contained"
            onClick={handleAdd}
            disabled={!selectedValues.length}
            style={{ marginRight: 10 }}
          >
            &gt;&gt;
          </Button>
          <Button
            variant="contained"
            onClick={handleRemove}
            disabled={!selectedValues.length}
          >
            &lt;&lt;
          </Button>
        </Box>
      </DialogContent>

      {/* Действия внизу диалога */}
      <DialogActions>
        <Button onClick={handleSave} color="primary" disabled={!chosenValues.length}>
          Зберегти фільтр
        </Button>
        <Button onClick={onClose} color="primary">
          Закрити
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddFiltersPopup;
