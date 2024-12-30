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

interface AddFiltersProps {
  onClose: () => void;
  optionValue: { category: string; options: string[] }[];
  onSaveFilters: (filters: { category: string, value: string }[]) => void;
}

const AddFiltersPopup: React.FC<AddFiltersProps> = ({ onClose, optionValue, onSaveFilters }) => {
  const [selectedValues, setSelectedValues] = useState<string[]>([]);
  const [chosenValues, setChosenValues] = useState<{ category: string, value: string }[]>([]);

  const handleAdd = () => {
    setChosenValues((prev) => [
      ...prev,
      ...selectedValues.map((value) => ({ category: `Category ${prev.length + 1}`, value })),
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
    <Dialog open onClose={onClose} maxWidth="md" fullWidth sx={{ '& .MuiDialog-paper': { width: '90%', height: '90%' } }}>
      <DialogTitle>Add Filters</DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          {optionValue.map((category, index) => (
            <Grid item xs={6} key={index}>
              <Typography>{`Category ${index + 1}`}</Typography>
              <Paper style={{ maxHeight: 200, minHeight: 200, overflow: 'auto' }}>
              <List>
              {optionValue.map((item) => (
  item.options.map((value) => (
    <ListItem key={value} disablePadding>
      <ListItemButton
        onClick={(event) => handleSelectValue(value, event)}
        selected={selectedValues.includes(value)}
      >
        <ListItemText primary={value} />
      </ListItemButton>
    </ListItem>
  ))
))}
    </List>
              </Paper>
            </Grid>
          ))}
        </Grid>

        <Box display="flex" justifyContent="center" marginTop={2}>
          <Button variant="contained" onClick={handleAdd} disabled={!selectedValues.length}>
            &gt;&gt;
          </Button>
          <Button variant="contained" onClick={handleRemove} disabled={!selectedValues.length} style={{ marginLeft: 10 }}>
            &lt;&lt;
          </Button>
        </Box>
      </DialogContent>

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
