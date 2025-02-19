import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  Grid,
  Typography,
  TextareaAutosize,
  IconButton,
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import DeleteIcon from '@mui/icons-material/Delete';


type Part = {
  partName: string;
  partGroup: string;
  partSide: string;
  partType: string;
  partCondition: string;
  partNumber: string;
  partPhotos: (File  | null)[];
  partDescription: string;
  partPrice: string;
};

type StepOneProps = {
  parts: Part[];
  setParts: React.Dispatch<React.SetStateAction<Part[]>>;
};
const StepOne: React.FC<StepOneProps> = ({ parts, setParts }) => {
  const [previewUrls, setPreviewUrls] = useState<string[][]>(
    parts.map(part =>
      part.partPhotos.map(photo =>
        photo instanceof File ? URL.createObjectURL(photo) : ""
      )
    )
  );


  const handleInputChange = (index: number, field: string, value: any) => {
    const updatedParts = [...parts];
    console.log('value:' , value);

    updatedParts[index] = { ...updatedParts[index], [field]: value };
    console.log('updatedParts:' , updatedParts);

    setParts(updatedParts);
  };
 const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>, photoIndex: number) => {
    if (event.target.files) {
      const file = event.target.files[0];

      // Проверяем, что файл допустимого формата
      if (!file.type.startsWith('image/')) {
        alert('Можно загружать только изображения!');
        return;
      }

      const updatedPhotos = [...part.partPhotos];
      updatedPhotos[photoIndex] = file;
      handleInputChange(index, 'partPhotos', updatedPhotos);

      // Обновляем превью
      const updatedPreviews = [...previewUrls];
      updatedPreviews[photoIndex] = URL.createObjectURL(file);
      setPreviewUrls(updatedPreviews);
    }
  };
  

  const addPart = () => {
    setParts([
      ...parts,
      {
        partName: '',
        partGroup: '',
        partSide: '',
        partType: '0',
        partCondition: '0',
        partNumber: '',
        partPhotos: [null],
        partDescription: '',
        partPrice: '',
      },
    ]);
  };

  const removePart = (index: number) => {
    console.log(index , 'parts' , parts);
    setParts((prevParts) => prevParts.filter((_, i) => i !== index));
  };
  return (
    <Box>
      {parts.map((part, index) => (
        <Box key={index} sx={{ mb: 4, border: '1px solid #ccc', p: 2, borderRadius: '8px' }}>
          <Typography variant="h6" gutterBottom>
            Запчасть {index + 1}
          </Typography>

          <TextField
            fullWidth
            label="Название запчасти"
            value={part.partName}
            onChange={(e) => handleInputChange(index, 'partName', e.target.value)}
            margin="normal"
          />
          <Grid item xs={12} >
          <FormControl fullWidth sx={{mt: 1}}margin="normal">
            <InputLabel id={`part-group-label-${index}`}>Группа запчасти</InputLabel>
            <Select
              labelId={`part-group-label-${index}`}
              id="YearID"
              label="Группа запчасти"
              value={part.partGroup}
              className="wid100proc"
              onChange={(e) => handleInputChange(index, 'partGroup', e.target.value)}
            >
              <MenuItem value="0">- выбрать -</MenuItem>
              <MenuItem value="1">Двигатель</MenuItem>
              <MenuItem value="2">Ременный привод</MenuItem>
              <MenuItem value="3">Коробка передач</MenuItem>
              {/* Добавьте остальные опции */}
            </Select>
          </FormControl>
          </Grid>
          <FormControl component="fieldset" margin="normal">
            <Typography>Тип запчасти</Typography>
            <RadioGroup
              row
              value={part.partType}
              onChange={(e) => handleInputChange(index, 'partType', e.target.value)}
            >
              <FormControlLabel value="0" control={<Radio />} label="Любая" />
              <FormControlLabel value="1" control={<Radio />} label="Оригинал" />
              <FormControlLabel value="2" control={<Radio />} label="Аналог" />
            </RadioGroup>
          </FormControl>

          <FormControl component="fieldset" margin="normal">
            <Typography>Состояние запчасти</Typography>
            <RadioGroup
              row
              value={part.partCondition}
              onChange={(e) => handleInputChange(index, 'partCondition', e.target.value)}
            >
              <FormControlLabel value="0" control={<Radio />} label="Любая" />
              <FormControlLabel value="1" control={<Radio />} label="Новая" />
              <FormControlLabel value="2" control={<Radio />} label="Б/У" />
            </RadioGroup>
          </FormControl>

          <TextField
            fullWidth
            label="Код запчасти"
            value={part.partNumber}
            onChange={(e) => handleInputChange(index, 'partNumber', e.target.value)}
            margin="normal"
          />

          <TextField
                    fullWidth
                    label="Описание запчасти"
                    multiline
                    rows={4}
                    value={part.partDescription}
                    onChange={(e) => handleInputChange(index, 'partDescription', e.target.value)}
                    margin="normal"
                  />

          

          <TextField
            fullWidth
            label="Желаемая цена (грн)"
            value={part.partPrice}
            onChange={(e) => handleInputChange(index, 'partPrice', e.target.value)}
            margin="normal"
          />

          <Box sx={{ mt: 2 }}>
            <Typography>Фото запчасти</Typography>
            {part.partPhotos.map((photo, photoIndex) => (
              <Box key={photoIndex} sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                <input
                  type="file"
                  accept=".png, .jpg, .jpeg, .webp" 
                  onChange={(e) => {
                    const files = e.target.files;
                    if (files) {
                      const updatedPhotos: (File | null)[] = [...part.partPhotos];
                      updatedPhotos[photoIndex] = files[0];
                      handleInputChange(index, 'partPhotos', updatedPhotos);
                    }
                  }}
                />
                <IconButton
                  onClick={() => {
                    const updatedPhotos = part.partPhotos.filter((_, i) => i !== photoIndex);
                    handleInputChange(index, 'partPhotos', updatedPhotos);
                  }}
                >
                  <DeleteIcon />
                </IconButton>
              </Box>
            ))}
            <Button
              variant="outlined"
              startIcon={<AddCircleOutlineIcon />}
              onClick={() =>
                handleInputChange(index, 'partPhotos', [...part.partPhotos, null])
              }
              sx={{ mt: 2 }}
            >
              Добавить фото
            </Button>
          </Box>
          
          <Button
            variant="outlined"
            onClick={() => addPart()}
            sx={{ mt: 2 , mr: 2 }}
          >
            Добавить запчасть
          </Button>
          {index > 0 && (
  <Button
    variant="contained"
    color="error"
    onClick={() => removePart(index)}
    sx={{ mt: 2 }}
  >
    Удалить запчасть {index}
  </Button>
)}
        </Box>
      ))}

    </Box>
  );
};


export default StepOne;
