import React, { useState } from 'react';
import { Box, FormControl , FormControlLabel , Radio , RadioGroup ,Button, Grid, Typography, Paper } from '@mui/material';
import AddFiltersPopup from './addFiltersPopup';
import {request , saveToken} from '@request/request'
import {extractIdNamePairs , createReverseMap} from '@request/function'
import select from '@json/select.json'
interface AddFiltersProps {
  onSave: () => void;
}
interface CreateFilterDto {
  data: Record<string, any>; // Теперь data — это объект
}
type FilterOption = { id: string; name: string };
type FilterCategory = { category: string; options: FilterOption[] };

const AddFilters: React.FC<AddFiltersProps> = ({ onSave }) => {
  const [isDialogOpen, setIsDialogOpen] = useState<number | null>(null);
  const [chosenFilters, setChosenFilters] = useState<{ category: string; value: string }[]>([]);

  const parseFiltersData = (data: Record<string, any>): FilterCategory[] => {
    return Object.entries(data).map(([_, value]) => {
      let options: FilterOption[] = [];
  
      if (Array.isArray(value.type)) {
        options = value.type as FilterOption[];
      } else if (Array.isArray(value.options)) {
        options = value.options as FilterOption[];
      } else {
        options = Object.values(value)
          .filter((v): v is FilterOption[] => Array.isArray(v))
          .flat();
      }
  
      return {
        category: value.category as string,
        options
      };
    });
  };
  
  const filtersData = parseFiltersData(select);
  
  //console.log(filtersData);
  const groupFilters = (
    filters: { category: string; value: string }[]
  ) => {
    console.log('Filter:' , filters);
    // Создаем Map для быстрого поиска id по name
    const nameToIdMap =  extractIdNamePairs(select);
  
    return filters.reduce<{ category: string; values: string[] }[]>((acc, { category, value }) => {
      const idReverse = createReverseMap(nameToIdMap); 
      const id = idReverse.get(value) || value; 
      if (!id) return acc; // Если name нет в JSON, пропускаем
  
      const existingCategory = acc.find(item => item.category === category);

        if (existingCategory) {
            existingCategory.values.push(id);
        } else {
            acc.push({ category, values: [id] });
        }
  
      return acc;
    }, []);
  };
  const handleRadioChange = (category: string, value: string) => {
    setChosenFilters(prevFilters => {
      const updatedFilters = prevFilters.filter(filter => filter.category !== category);
      return [...updatedFilters, { category, value }];
    });
  };
  const handleOpen = (index: number) => 
    {
      setIsDialogOpen(index);
    }
  const handleAll = (index: string) => {
    
    setChosenFilters((prev) => {
      // Фильтруем выбранные фильтры, исключая тот, у которого категория совпадает с index
      const updatedFilters = prev.filter((filter) => filter.category !== index);
      return updatedFilters;
    });
  };
  const handleClose = () => setIsDialogOpen(null);
  const createFilter = async (filterData: CreateFilterDto): Promise<void> => {
     try {
      const response = await request('post', '/filters/create', filterData);
      console.log('Фильтр создан:', response.data);
      onSave();
    } catch (error) {
      console.error('Ошибка при создании фильтра:', error);
    }
  };
  const handleSave = () => {
    const filterData = { data: groupFilters(chosenFilters) };
    createFilter(filterData);
  };
  const onClose = () => {
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
              <Typography variant="h6"> {filter.category}</Typography>
              <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
              <Button variant="contained" sx={{ marginTop: 2 }} onClick={() => handleAll(filter.category)}>
    Всі
  </Button>
  <Button variant="contained" sx={{ marginTop: 2 }} onClick={() => handleOpen(index)}>
    Вибрати
  </Button>
</Box>
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
        <Grid item xs={12} sm={6} md={6}>
        <Paper
          sx={{
            padding: 2,
            border: "1px solid #ccc",
            backgroundColor: "#f5f5f5",
            textAlign: "center",
            width: { xs: "90%", sm: "90%" },
            margin: "auto",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 2, justifyContent: "center" }}>
            <Typography variant="h6">Состояние запчастей</Typography>
            <FormControl component="fieldset">
            <RadioGroup
          row
          defaultValue="all"
          onChange={(e) => handleRadioChange("Состояние запчастей", e.target.value)}
        >
                <FormControlLabel value="state_all" control={<Radio />} label="Все" />
                <FormControlLabel value="new" control={<Radio />} label="Новые" />
                <FormControlLabel value="used" control={<Radio />} label="Подержанные" />
              </RadioGroup>
            </FormControl>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: 2, justifyContent: "center", marginTop: 2 }}>
            <Typography variant="h6">Типы запчастин</Typography>
            <FormControl component="fieldset">
            <RadioGroup
          row
          defaultValue="all"
          onChange={(e) => handleRadioChange("Типы запчастин", e.target.value)}
        >
                <FormControlLabel value="type_all" control={<Radio />} label="Все" />
                <FormControlLabel value="original" control={<Radio />} label="Оригинал" />
                <FormControlLabel value="nonoriginal" control={<Radio />} label="Неоригинал" />
              </RadioGroup>
            </FormControl>
          </Box>
        </Paper>
      </Grid> 
<Box className={'button-center'}>
      <Button onClick={handleSave} color="primary" sx={{ margin: 'auto' }}>
        Зберегти фільтр
      </Button>  
      <Button onClick={onClose} color="primary">
        Закрити
      </Button>
      </Box>
      </Grid>
    </div>
  );
};

export default AddFilters;
