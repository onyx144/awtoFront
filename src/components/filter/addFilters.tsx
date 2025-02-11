import React, { useState } from 'react';
import { Box, FormControl , FormControlLabel , Radio , RadioGroup ,Button, Grid, Typography, Paper } from '@mui/material';
import AddFiltersPopup from './addFiltersPopup';
import {request , saveToken} from '@request/request'

interface AddFiltersProps {
  onSave: () => void;
}
interface CreateFilterDto {
  data: Record<string, any>; // Теперь data — это объект
}
const AddFilters: React.FC<AddFiltersProps> = ({ onSave }) => {
  const [isDialogOpen, setIsDialogOpen] = useState<number | null>(null);
  const [chosenFilters, setChosenFilters] = useState<{ category: string; value: string }[]>([]);
  const filtersData = [
    {
      category: 'Тип техники:',
      options: ['Легковые', 'Мототехника', 'Грузовые', 'Автобусы', 'Спецтехника']
    },
    {
      category: 'Годы выпуска',
      options: [
        '2024', '2023', '2022', '2021', '2020', 
        '2019', '2018', '2017', '2016', '2015', 
        '2014', '2013', '2012', '2011', '2010', 
        '2009', '2008', '2007', '2006', '2005', 
        '2004', '2003', '2002', '2001', '2000', 
        '1999', '1998', '1997', '1996', '1995', 
        '1994', '1993', '1992', '1991', '1990', 
        '1989', '1988', '1987', '1986', '1985', 
        '1984', '1983', '1982', '1981', '1980', 
        '1979', '1978', '1977', '1976', '1975', 
        '1974', '1973', '1972', '1971', '1970', 
        '1969', '1968', '1967', '1966', '1965', 
        '1964', '1963', '1962', '1961', '1960', 
        '1959', '1958', '1957', '1956', '1955', 
        '1954', '1953', '1952', '1951', '1950'
      ]
    },
        { category: 'Марки:', options: ['Option X', 'Option Y', 'Option Z', 'Option W', 'Option V'] },
    { category: 'Модели:', 
      minCategory: {
        Легковые: {
          Access: {
            Модели: [['Bogatto', 'DRR']]
          },
          Acxa: {
            Модели: [['150', 'ACX']]
          }
        },
        Мототехника: [['Мототехника', 'Квадроциклы']],
        
      }
     },
    {
      category: 'Группы запчастей:',
      options: [
        'Двигатель', 'Ременный привод', 'Коробка передач', 'Мост', 
        'Карданная передача', 'Привод колеса', 'Подвеска', 'Кузов', 
        'Сцепление', 'Рулевое управление', 'Тормозная система', 
        'Система зажигания', 'Система питания', 'Система выпуска', 
        'Система охлаждения и отопления', 'Кондиционер', 'Стекла и зеркала', 
        'Система очистки стекол', 'Фары / Освещение', 'Интерьер', 
        'Экстерьер', 'Электрика', 'Приборы и датчики', 'Системы безопасности', 
        'Вспомогательные системы', 'Фильтры', 'Масла', 'Шины и диски', 
        'Тюнинг', 'ГБО'
      ]
    },
    { 
      category: 'Названия запчастей:', 
      options: [
        'ECU', 
        'Акселерометр', 
        'Блок управления двигателем', 
        'Блок управления трансмиссией', 
        'Датчик температуры', 
        'Датчик давления', 
        'Модуль зажигания', 
        'Реле', 
        'Сенсор кислорода', 
        'Термостат', 
        'Фильтр топлива', 
        'Коммутатор', 
        'Компрессор кондиционера', 
        'Насос омывателя', 
        'Радиатор', 
        'Система впрыска', 
        'Система охлаждения', 
        'Электродвигатель стеклоподъемника', 
        'Фары', 
        'Генератор', 
        'Аккумулятор', 
        'Моторчик стеклоочистителя', 
        'Система зажигания', 
        'Глушитель', 
        'Тормозной диск', 
        'Тормозной суппорт', 
        'Шаровая опора', 
        'Рулевая рейка', 
        'Ремень ГРМ', 
        'Ремень генератора', 
        'Шкив', 
        'Маховик', 
        'Сцепление', 
        'Топливный насос', 
        'Дроссельная заслонка', 
        'Турбокомпрессор', 
        'Воздушный фильтр', 
        'Топливный фильтр', 
        'Система выпуска отработанных газов', 
        'Катализатор', 
        'Теплообменник', 
        'Подушка двигателя', 
        'Подушка коробки передач', 
        'Патрубок', 
        'Сальник', 
          ]
    },
    { category: 'Регионы:', options: ['Selection 1', 'Selection 2', 'Selection 3'] },
  ];
  //Фильтр груп
  const groupFilters = (filters: { category: string; value: string }[]) => {
    return filters.reduce<{ category: string; values: string[] }[]>((acc, { category, value }) => {
      const existingCategory = acc.find(item => item.category === category);
  
      if (existingCategory) {
        existingCategory.values.push(value);
      } else {
        acc.push({ category, values: [value] });
      }
  
      return acc;
    }, []);
  };
  const handleRadioChange = (category: string, value: string) => {
    setChosenFilters(prevFilters => {
      // Удаляем старое значение этой категории
      const updatedFilters = prevFilters.filter(filter => filter.category !== category);
      // Добавляем новое значение
      return [...updatedFilters, { category, value }];
    });
  };
  const handleOpen = (index: number) => setIsDialogOpen(index);
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
    console.log('Filter' , groupFilters(chosenFilters)); 
    createFilter(filterData);
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
                <FormControlLabel value="all" control={<Radio />} label="Все" />
                <FormControlLabel value="new" control={<Radio />} label="Новые" />
                <FormControlLabel value="used" control={<Radio />} label="Подержанные" />
              </RadioGroup>
            </FormControl>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: 2, justifyContent: "center", marginTop: 2 }}>
            <Typography variant="h6">Типы запчастей</Typography>
            <FormControl component="fieldset">
            <RadioGroup
          row
          defaultValue="all"
          onChange={(e) => handleRadioChange("Типы запчастей", e.target.value)}
        >
                <FormControlLabel value="all" control={<Radio />} label="Все" />
                <FormControlLabel value="original" control={<Radio />} label="Оригинал" />
                <FormControlLabel value="nonoriginal" control={<Radio />} label="Неоригинал" />
              </RadioGroup>
            </FormControl>
          </Box>
        </Paper>
      </Grid> 

      <Button onClick={handleSave} color="primary" sx={{ margin: 'auto' }}>
        Зберегти фільтр
      </Button>  
      </Grid>
    </div>
  );
};

export default AddFilters;
