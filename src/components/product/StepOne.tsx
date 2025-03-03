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
import select from '@json/select.json'

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
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>, partIndex: number, photoIndex: number) => {
    if (event.target.files) {
      const file = event.target.files[0];

      // Проверка формата
      if (!file.type.startsWith("image/")) {
        alert("Можно загружать только изображения!");
        return;
      }

      setParts(prevParts => {
        const updatedParts = [...prevParts];
        const updatedPhotos = [...updatedParts[partIndex].partPhotos];
        updatedPhotos[photoIndex] = file;
        updatedParts[partIndex].partPhotos = updatedPhotos;
        return updatedParts;
      });

      // Обновляем превью
      setPreviewUrls(prev => {
        const updatedPreviews = [...prev];
        updatedPreviews[partIndex][photoIndex] = URL.createObjectURL(file);
        return updatedPreviews;
      });
    }
  };

  const handleRemovePhoto = (partIndex: number, photoIndex: number) => {
    setParts(prevParts => {
      const updatedParts = [...prevParts];
      updatedParts[partIndex].partPhotos = updatedParts[partIndex].partPhotos.filter((_, i) => i !== photoIndex);
      return updatedParts;
    });

    setPreviewUrls(prev => {
      const updatedPreviews = [...prev];
      updatedPreviews[partIndex] = updatedPreviews[partIndex].filter((_, i) => i !== photoIndex);
      return updatedPreviews;
    });
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
          <Box sx={{ display: "flex", flexDirection: "column"}}>
  <FormControl sx={{ alignItems: "center" , margin: 0 , display: "flex", flexDirection: "row", gap: 2 }} component="fieldset" margin="normal">
    <Typography>Тип запчасти</Typography>
    <RadioGroup
      value={part.partType}
      onChange={(e) => handleInputChange(index, "partType", e.target.value)}
      sx={{ alignItems: "center" , display: "flex", flexDirection: "row", gap: 2 }} 
    >
      <FormControlLabel value="type_all" control={<Radio />} label="Будь-яка" />
      <FormControlLabel value="original" control={<Radio />} label="Оригінал" />
      <FormControlLabel value="analog" control={<Radio />} label="Аналог" />
    </RadioGroup>
  </FormControl>

  <FormControl sx={{ margin: 0 , alignItems: "center" , display: "flex", flexDirection: "row", gap: 2 }} component="fieldset" margin="normal">
    <Typography>Состояние запчасти</Typography>
    <RadioGroup
      value={part.partCondition}
      onChange={(e) => handleInputChange(index, "partCondition", e.target.value)}
      sx={{ alignItems: "center" , display: "flex", flexDirection: "row", gap: 2 }} 
   >
      <FormControlLabel value="state_all" control={<Radio />} label="Будь-яка" />
      <FormControlLabel value="new" control={<Radio />} label="Новая" />
      <FormControlLabel value="used" control={<Radio />} label="Б/У" />
    </RadioGroup>
  </FormControl>
</Box>

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

<Box>
      {parts.map((part, partIndex) => (
        <Box key={partIndex} sx={{ mt: 2 }}>
          <Typography>Фото запчасти</Typography>
          {part.partPhotos.map((photo, photoIndex) => (
            <Box key={photoIndex} sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
              <input
                type="file"
                accept=".png, .jpg, .jpeg, .webp"
                onChange={(e) => handleFileChange(e, partIndex, photoIndex)}
                style={{ display: 'none' }}
                id={`file-upload-${partIndex}-${photoIndex}`}
              />
              <label htmlFor={`file-upload-${partIndex}-${photoIndex}`}>
                <Button variant="contained" component="span">
                  Загрузить фото
                </Button>
              </label>

              {previewUrls[partIndex] && previewUrls[partIndex][photoIndex] && (
                <img
                  src={previewUrls[partIndex][photoIndex]}
                  alt="Превью"
                  style={{ width: 50, height: 50, marginLeft: 10, objectFit: 'cover' }}
                />
              )}

              <IconButton onClick={() => handleRemovePhoto(partIndex, photoIndex)}>
                <DeleteIcon />
              </IconButton>
            </Box>
          ))}

          <Button
            variant="outlined"
            startIcon={<AddCircleOutlineIcon />}
            onClick={() => {
              setParts(prevParts => {
                const updatedParts = [...prevParts];
                updatedParts[partIndex].partPhotos.push(null);
                return updatedParts;
              });

              setPreviewUrls(prev => {
                const updatedPreviews = [...prev];
                updatedPreviews[partIndex] = [...updatedPreviews[partIndex], ''];
                return updatedPreviews;
              });
            }}
            sx={{ mt: 2 }}
          >
            Добавить фото
          </Button>
        </Box>
      ))}
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
    Удалить запчасть {index + 1}
  </Button>
)}
        </Box>
      ))}

    </Box>
  );
};


export default StepOne;
