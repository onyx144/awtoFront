import React, { useState , useEffect } from 'react';
import {
  Box,
  TextField,
  Button,
  Select,
  MenuItem,
  Autocomplete,
  InputLabel,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  Grid,
  Typography,
  FormHelperText,
  IconButton,
} from '@mui/material';
import { useSearchParams } from 'next/navigation';
import { forwardRef, useImperativeHandle } from "react";
import select from '@json/select.json'
import DeleteIcon from '@mui/icons-material/Delete';
type Part = {
  partName: string;
  partGroup: string;
  partSide: string;
  partType: string;
  partCondition: string;
  partNumber: string;
  partPhotos: (File  | null | string)[];
  partDescription: string;
  partPrice: string;
};

type StepOneProps = {
  parts: Part[];
  setParts: React.Dispatch<React.SetStateAction<Part[]>>;
};
export type StepOneRef = {
  validate: () => boolean;
};
const StepOne = forwardRef<StepOneRef, StepOneProps>(({ parts, setParts }, ref) => {
  const [previewUrls, setPreviewUrls] = useState<string[][]>(
    parts.map(part =>
      part.partPhotos.map(photo =>
        photo instanceof File ? URL.createObjectURL(photo) : ""
      )
    )
  );
  useImperativeHandle(ref, () => ({
    validate: () => {
      const newErrors: Record<string, boolean> = {};
    
    parts.forEach((part, index) => {
      if (!part.partName) newErrors[`partName-${index}`] = true;
      if (!part.partGroup) newErrors[`partGroup-${index}`] = true;
      if (!part.partType) newErrors[`partType-${index}`] = true;
      if (!part.partCondition) newErrors[`partCondition-${index}`] = true;
      if (!part.partNumber) newErrors[`partNumber-${index}`] = true;
      if (!part.partPrice) newErrors[`partPrice-${index}`] = true;
    });

    setErrors(newErrors);
    const isValid = Object.keys(newErrors).length === 0;
    
    return isValid;
    },
  }));
  
  
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get('search');
  useEffect(() => {
    console.log('check ,e');
    if (searchQuery) {
      setParts((prevParts) =>
        prevParts.map((part, index) =>
          index === 0 ? { ...part, partName: searchQuery } : part
        )
      );
    }
  }, [searchQuery, setParts]);
// eslint-disable-next-line
  const handleInputChange = (index: number, field: string, value: any) => {
    const updatedParts = [...parts];

    updatedParts[index] = { ...updatedParts[index], [field]: value };

    setParts(updatedParts);

    if (errors[`${field}-${index}`]) {
      const updatedErrors = { ...errors };
      delete updatedErrors[`${field}-${index}`];
      setErrors(updatedErrors);
    }
  
  };
  const generateRandomFilename = () => {
    return Math.random().toString().slice(2, 12); // Генерация случайных 10 цифр
  };
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>, partIndex: number, photoIndex: number) => {
    if (event.target.files) {
      const file = event.target.files[0];
  
      // Проверка формата
      if (!file.type.startsWith("image/")) {
        alert("Можно загружать только изображения!");
        return;
      }
  
      // Генерация случайного имени для файла
      const randomFilename = generateRandomFilename();
      const renamedFile = new File([file], randomFilename + '.' + file.name.split('.').pop(), {
        type: file.type,
      });
  
      // Обновляем `partPhotos` внутри `parts`
      setParts(prevParts => {
        return prevParts.map((part, pIndex) => {
          if (pIndex !== partIndex) return part; // Оставляем остальные части без изменений
  
          // Копируем массив `partPhotos`
          const updatedPhotos = [...part.partPhotos];
          updatedPhotos[photoIndex] = renamedFile; // Обновляем нужное фото с новым именем
  
          return { ...part, partPhotos: updatedPhotos }; // Возвращаем обновленный объект
        });
      });
  
      // Обновляем `previewUrls`
      setPreviewUrls(prev => {
        return prev.map((previewRow, pIndex) => {
          if (pIndex !== partIndex) return previewRow; // Оставляем остальные превью без изменений
  
          const updatedPreviews = [...previewRow]; // Копируем текущий массив превью
          updatedPreviews[photoIndex] = URL.createObjectURL(renamedFile); // Создаем ссылку для превью
  
          return updatedPreviews; // Возвращаем обновленный массив превью
        });
      });
    }
  };
  const [errors, setErrors] = useState<Record<string, boolean>>({});
  const handleRemovePhoto = (partIndex: number, photoIndex: number) => {
    console.log('part1' , parts);
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
    setParts((prevParts) => prevParts.filter((_, i) => i !== index));
  };
  return (
    <Box>
      {parts.map((part, index) => (
        <Box key={index} sx={{ mb: 4, border: '1px solid #ccc', p: 2, borderRadius: '8px' }}>
          <Typography variant="h6" gutterBottom>
            Запчасть {index + 1}
          </Typography>

          <Autocomplete
  options={select.names.options}
  getOptionLabel={(option) => option.name}
  value={part.partName ? { id: part.partName, name: part.partName } : null}
  onChange={(_, newValue) => {
    handleInputChange(index, "partName", newValue?.name || "");
    
  }}
  renderInput={(params) => (
    <TextField
      {...params}
      label="Назва запчастини"
      fullWidth
      margin="normal"
      error={!!errors[`partName-${index}`]} // Ошибка показывается, если есть в errors
      helperText={errors[`partName-${index}`] ? "Поле обов`&apos;`язкове" : ""}    />
  )}
/>

          <Grid item xs={12} >
          <FormControl fullWidth sx={{ mt: 1 }} margin="normal" error={!!errors[`partGroup-${index}`]}>
  <InputLabel id={`part-group-label-${index}`}>Группа запчасти</InputLabel>
  <Select
    labelId={`part-group-label-${index}`}
    id="YearID"
    label="Группа запчасти"
    value={part.partGroup}
    className="wid100proc"
    onChange={(e) => handleInputChange(index, "partGroup", e.target.value)}
  >
    <MenuItem value="0">- выбрать -</MenuItem>
    <MenuItem value="1">Двигатель</MenuItem>
    <MenuItem value="2">Ременный привод</MenuItem>
    <MenuItem value="3">Коробка передач</MenuItem>
    {/* Добавьте остальные опции */}
  </Select>
  {errors[`partGroup-${index}`] && (
    <FormHelperText>Поле обов`&apos;`язкове</FormHelperText>
  )}
</FormControl>
          </Grid>
          <Box sx={{ display: "flex", flexDirection: "column"}}>
  <FormControl error={!!errors[`partType-${index}`]} className='message-line' sx={{ alignItems: "center" , margin: 0 , display: "flex", flexDirection: "row", gap: 2 }} component="fieldset" margin="normal">
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
    {errors[`partType-${index}`] && (
    <FormHelperText>Поле обов`&apos;`язкове</FormHelperText>
  )}

  </FormControl>

  <FormControl className='message-line' sx={{ margin: 0 , alignItems: "center" , display: "flex", flexDirection: "row", gap: 2 }} component="fieldset" margin="normal">
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
            error={!!errors[`partNumber-${index}`]} // Ошибка показывается, если есть в errors
            helperText={errors[`partNumber-${index}`] ? "Поле обов`&apos;`язкове" : ""}
          />

          <TextField
                    fullWidth
                    label="Описание запчасти"
                    value={part.partDescription}
                    onChange={(e) => handleInputChange(index, 'partDescription', e.target.value)}
                    margin="normal"
          />

          

          <TextField
            fullWidth
            label="Бажана ціна (грн)"
            type='number'
            value={part.partPrice}
            onChange={(e) => handleInputChange(index, 'partPrice', e.target.value)}
            margin="normal"
            error={!!errors[`partPrice-${index}`]} // Ошибка показывается, если есть в errors
            helperText={errors[`partPrice-${index}`] ? "Поле обов`&apos;`язкове" : ""}
      
          />

<Box>
        <Box sx={{ mt: 2 }}>
          <Typography>Фото запчасти</Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
               <input
      type="file"
      accept=".png, .jpg, .jpeg, .webp"
      onChange={(e) => handleFileChange(e, index, 0)}
      style={{ display: 'none' }}
      id={`file-upload-${index}-new`}
    />
    <label htmlFor={`file-upload-${index}-new`}>
      <Button variant="contained" component="span">
        Загрузить фото
      </Button>
    </label>
    {part.partPhotos.map((photo, photoIndex) => (
  previewUrls[index] && previewUrls[index][photoIndex] && (
    <Box key={`${index}-${photoIndex}`} sx={{ display: 'flex', alignItems: 'center'}}>
      <img
        src={previewUrls[index][photoIndex]}
        alt="Превью"
        style={{ width: 50, height: 50, marginLeft: 10, objectFit: 'cover' }}
      />
      <IconButton onClick={() => handleRemovePhoto(index, photoIndex)}>
        <DeleteIcon />
      </IconButton>
    </Box>
  )
))}

          
  </Box>
          {/*
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
          */}
        </Box>
    </Box>
          
          <Button
            variant="outlined"
            onClick={() => addPart()}
            sx={{ mt: 2 , mr: 2 }}
          >
            Додати запчастину
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
});

StepOne.displayName  = 'StepOne';
export default StepOne;
