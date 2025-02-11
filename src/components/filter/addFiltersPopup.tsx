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
import { getToken } from '@request/request'

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
  const [selectedChosenValues, setSelectedChosenValues] = useState<string[]>([]);
  const [chosenValues, setChosenValues] = useState<{ category: string; value: string }[]>([]);

  
  const handleAdd = (value?: string) => {
    if (value && value.length > 1) {
      console.log('test');
      setChosenValues((prev) => {
        // Проверяем, если это значение уже есть в prev, то не добавляем
        if (prev.some((item) => item.category === optionValue.category && item.value === value)) {
          return prev; // Возвращаем prev без изменений
        }
  
        // Если такого значения нет, добавляем его
        return [
          ...prev,
          {
            category: optionValue.category,
            value,
          },
        ];
      });
    }
    else {
    setChosenValues((prev) => [
      ...prev,
      ...selectedValues
        .filter((value) => !prev.some((item) => item.category === optionValue.category && item.value === value)) // Фильтруем дубликаты
        .map((value) => ({
          category: optionValue.category,
          value,
        })),
    ]);
    }
    setSelectedValues([]); // Очищаем выбранные
  };

  const handleRemove = (value?: string) => {
    if (value && value.length > 1) {
      setChosenValues((prev) =>
        prev.filter((filter) => filter.value !== value)      
    );
    }
    else {
    setChosenValues((prev) =>
      prev.filter((filter) => !selectedChosenValues.includes(filter.value))
    );
    }
    
    setSelectedChosenValues([]); // Очищаем выбранные
  };

  const handleSelectValue = (value: string, event: React.MouseEvent<HTMLDivElement> , secondBoxItems: string[],) => {
    if (selectedValues.includes(value)) {
      handleAdd(value);
      return;
    }
  
    if (event.shiftKey && selectedValues.length > 0) {
      const startIndex = secondBoxItems.indexOf(selectedValues[selectedValues.length - 1]);
      const endIndex = secondBoxItems.indexOf(value);
  
      if (startIndex !== -1 && endIndex !== -1) {
        const range = secondBoxItems.slice(
          Math.min(startIndex, endIndex),
          Math.max(startIndex, endIndex) + 1
        );
  
        setSelectedValues((prev) => Array.from(new Set([...prev, ...range])));
      }
    } else if (event.ctrlKey) {
      setSelectedValues((prev) =>
        prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
      );
    } else {
      setSelectedValues([value]); // Без Ctrl выбираем только одно значение
    }
  };

  const handleRemoveSelectValue = (
    value: string,
    event: React.MouseEvent<HTMLDivElement>,
    secondBoxItems: string[]
  ) => {
    if (selectedChosenValues.includes(value)) {
      handleRemove(value); // Вызываем handleAdd для обработки выбранного значения
      return;
    }
  
    if (event.shiftKey && selectedChosenValues.length > 0) {
      const startIndex = secondBoxItems.indexOf(selectedChosenValues[selectedChosenValues.length - 1]);
      const endIndex = secondBoxItems.indexOf(value);
  
      if (startIndex !== -1 && endIndex !== -1) {
        const range = secondBoxItems.slice(
          Math.min(startIndex, endIndex),
          Math.max(startIndex, endIndex) + 1
        );
  
        setSelectedChosenValues((prev) => Array.from(new Set([...prev, ...range])));
      }
    } else if (event.ctrlKey) {
      setSelectedChosenValues((prev) =>
        prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
      );
    } else {
      setSelectedChosenValues([value]); // Без Ctrl выбираем только одно значение
    }
  };

  const handleSave = () => {
    console.log('token' , getToken());
    onSaveFilters(chosenValues);
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
                      onClick={(event) => handleSelectValue(value, event , optionValue.options ?? [])}
                      selected={selectedValues.includes(value)}
                    >
                      <ListItemText primary={value} />
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
            )}
            {optionValue.minCategory && (
              <ModelBox onSelectValue={handleSelectValue}/>
            )}
            </Paper>
          </Grid>

          {/* Правая колонка - Выбранные фильтры */}
          <Grid item xs={6}>
            <Typography variant="h6">Обрані фільтри:</Typography>
            <Paper style={{ maxHeight: 300, minHeight: 300, overflow: 'auto' }}>
            <List >
            {chosenValues.map((filter, index) => (
              <ListItem key={index} sx={{padding: 0}} >
                <ListItemButton
                
                  onClick={(event) => handleRemoveSelectValue(filter.value, event , chosenValues.map(item => item.value) ?? [])}
                  selected={selectedChosenValues.includes(filter.value)}
                  sx={{ padding: '10px', margin: 0 }}
                >
                  <ListItemText primary={`${filter.value}`} />
                </ListItemButton>
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
            onClick={() => handleAdd()}
            disabled={!selectedValues.length}
            style={{ marginRight: 10 }}
          >
            &gt;&gt;
          </Button>
          <Button
            variant="contained"
            onClick={() => handleRemove()}
            disabled={!selectedChosenValues.length}
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
