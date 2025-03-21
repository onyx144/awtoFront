import React, { useState } from "react";
import {List , Select,ListItem , ListItemButton , ListItemText, MenuItem, FormControl, InputLabel, Box, Typography, SelectChangeEvent } from "@mui/material";

interface MinCategory {
  [key: string]: 
    | { [key: string]: { Модели: string[][] } }
    | string[][];
}

interface Data {
  category: string;
  minCategory: MinCategory;
}

interface ModelProps {
    minCategory?: MinCategory;
    onSelectValue: (value: string, event: React.MouseEvent<HTMLDivElement>, secondBoxItems: string[]) => void;
  }

const ModelBox: React.FC<ModelProps> = ({ onSelectValue}) => {
  const [selectedType, setSelectedType] = useState<string>("");
  const [firstBoxItems, setFirstBoxItems] = useState<string[]>([]);
  const [secondBoxItems, setSecondBoxItems] = useState<string[]>([]);
  const [selectedFirstBoxItem, setSelectedFirstBoxItem] = useState<string | null>(null);
  const [selectedValues] = useState<string[]>([]);

  const data: Data = {
    category: "Модели:",
    minCategory: {
      Легковые: {
        Access: {
          Модели: [["Bogatto", "DRR"]],
        },
        Acxa: {
          Модели: [["150", "ACX"]],
        },
      },
      Мототехника: [["Мототехника", "Квадроциклы"]],
    },
  };

  const handleTypeChange = (event: SelectChangeEvent<string>) => {
    const selected = event.target.value;
    setSelectedType(selected);

    if (typeof data.minCategory[selected] === "object" && !Array.isArray(data.minCategory[selected])) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      setFirstBoxItems(Object.keys(data.minCategory[selected] as { [key: string]: any }));
    } else if (Array.isArray(data.minCategory[selected])) {
      setFirstBoxItems((data.minCategory[selected] as string[][]).flat());
    } else {
      setFirstBoxItems([]);
    }

    setSecondBoxItems([]);
    setSelectedFirstBoxItem(null); // Сброс выбранного элемента при смене типа
  };


  const handleFirstBoxClick = (item: string) => {
    setSelectedFirstBoxItem(item);

    if (
      typeof data.minCategory[selectedType] === "object" &&
      !Array.isArray(data.minCategory[selectedType]) &&
      data.minCategory[selectedType][item]?.Модели
    ) {
      setSecondBoxItems((data.minCategory[selectedType][item].Модели as string[][]).flat());
    } else {
      setSecondBoxItems([]);
    }
  };

  return (
    <Box sx={{ p: 2 }}>
      {/* Селект для выбора типа техники */}
      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel id="type-select-label">Тип техники</InputLabel>
        <Select
          labelId="type-select-label"
          value={selectedType}
          onChange={handleTypeChange}
        >
          <MenuItem value="">
            <em>Не выбрано</em>
          </MenuItem>
          {Object.keys(data.minCategory).map((type) => (
            <MenuItem key={type} value={type}>
              {type}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Первый бокс: Марки или категории */}
      <Typography variant="subtitle1">Марки:</Typography>

      <Box
        sx={{
          border: "1px solid #ccc",
          borderRadius: 1,
          p: 2,
          minHeight: 100,
          mb: 2,
        }}
      >
        {firstBoxItems.map((item, index) => (
          <Typography
            key={index}
            sx={{
              cursor: "pointer",
              backgroundColor: item === selectedFirstBoxItem ? "#f0f0f0" : "transparent", // Подсветка выбранного элемента
              padding: "4px",
              borderRadius: "4px",
            }}
            onClick={() => handleFirstBoxClick(item)} // Однократный клик
          >
            {item}
          </Typography>
        ))}
      </Box>

      {/* Второй бокс: Модели */}
      <Typography variant="subtitle1">Модели:</Typography>

      <Box
        sx={{
          border: "1px solid #ccc",
          borderRadius: 1,
          p: 2,
          minHeight: 100,
          mb: 2,
        }}
      >
        <List>
        {secondBoxItems.map((item, index) => (
           <ListItem key={index} disablePadding>
           <ListItemButton
             onClick={(event) => onSelectValue(item, event , secondBoxItems)}
             selected={selectedValues.includes(item)}
           >
             <ListItemText primary={item} />
           </ListItemButton>
         </ListItem>
        
        ))}
        </List>
      </Box>
    </Box>
  );
};

export default ModelBox;
