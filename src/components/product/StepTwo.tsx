import React, { useState  } from 'react';
import { RadioGroup , FormHelperText , Checkbox , FormControlLabel , Radio ,  FormGroup , TextField , FormControl, Grid , InputLabel, MenuItem, Select, SelectChangeEvent, Typography, Box } from "@mui/material";
import select from '@json/select.json'
import { forwardRef, useImperativeHandle } from "react";
/*interface FormData {
    fuelID: string;
    engineSize: string;
    bodyTypeID: string;
    transID: string;
    axleID: string;
    colorName: string;
    colorMetallic: boolean;
    vin: string;
  }*/
  type CarData = {
    modelId: string;//
    carType: string;//
    mark: string;//
    makeRegionId: string;//
    subModel: string;
    isSubModelVisible: boolean;
    years: string;//
    fuelID: string;//
    engineSize: string;
    bodyTypeID: string;
    transID: string;
    axleID: string;
    colorName: string;
    colorMetallic: boolean;
    vin: string;//
  };
  
  type StepTwoProps = {
    carData: CarData;
    setCarData: React.Dispatch<React.SetStateAction<CarData>>;
  };

  export type StepTwoRef = {
    validate: () => boolean;
  };
const StepTwo = forwardRef<StepTwoRef, StepTwoProps>(({ carData, setCarData } , ref) => {
  const [errors, setErrors] = useState<Record<string, boolean>>({});
  const [isSubModelVisible, setSubModelVisible] = useState<boolean>(false);
   useImperativeHandle(ref, () => ({
       validate: () => {
         const newErrors: Record<string, boolean> = {};
       
      
        // if (!carData.modelId) newErrors.modelId = true;
         if (!carData.carType) newErrors.carType = true;
         if (!carData.mark) newErrors.mark = true;
         if (!carData.makeRegionId) newErrors.makeRegionId = true;
         if (!carData.years) newErrors.years = true;
         if (!carData.fuelID) newErrors.fuelID = true;
         if (!carData.vin) newErrors.vin = true;
         if (!carData.engineSize) newErrors.engineSize = true;
         if (!carData.bodyTypeID) newErrors.bodyTypeID = true;

   
       setErrors(newErrors);
       const isValid = Object.keys(newErrors).length === 0;
       //setIsValid(() => isValid);
       
       return isValid;
       },
     }));
   const models =
   (select.models[carData.makeRegionId as keyof typeof select.models] &&
   typeof select.models[carData.makeRegionId as keyof typeof select.models] === "object" &&
   Array.isArray(
     select.models[carData.makeRegionId as keyof typeof select.models]?.[
       carData.mark as keyof typeof select.models[keyof typeof select.models]
     ]
   )
     ? select.models[carData.makeRegionId as keyof typeof select.models]?.[
         carData.mark as keyof typeof select.models[keyof typeof select.models]
       ]
     : []) as { id: string; name: string }[];


  const [formData] = useState<CarData>({
    modelId: "",
    carType: "",
    mark: "",
    makeRegionId: "",
    subModel: "",
    isSubModelVisible: false,
    years: "",
    fuelID: "",
    engineSize: "",
    bodyTypeID: "",
    transID: "",
    axleID: "",
    colorName: "",
    colorMetallic: false,
    vin: "",
  });
  
  const handleSelectChange = (field: keyof CarData) => (event: SelectChangeEvent<string>) => {
    setCarData(prev => ({
      ...prev,
      [field]: event.target.value
    }));
    if (errors[field]) {
      const updatedErrors = { ...errors };
      delete updatedErrors[field];
      setErrors(updatedErrors);
    }
  };
const handleInputChange = (field: keyof CarData) => (event: React.ChangeEvent<{ value: unknown }>) => {
  setCarData(prev => ({
    ...prev,
    [field]: event.target.value as string
  }));
  if (errors[field]) {
    const updatedErrors = { ...errors };
    delete updatedErrors[field];
    setErrors(updatedErrors);
  }
};
  const handleData = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked, type } = e.target;
    setCarData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const toggleSubModelVisibility = () => {
    setSubModelVisible(!isSubModelVisible);
  };


  return (
    <Box>
    <Box display="flex" flexDirection="row" alignItems="center" gap={2}>
      <Typography variant="body1" fontWeight="bold">
        Тип
      </Typography>
      <FormControl error={!!errors.carType}  fullWidth>
        <InputLabel id="car-type-select-label">Выберите тип</InputLabel>
        <Select
          labelId="car-type-select-label"
          id="car-type-select"
          value={carData.carType}
          onChange={handleSelectChange('carType')}
          label="Тип"
        >
          {select.types.type.map((type) => (
          <MenuItem key={type.id} value={type.id}>
            {type.name}
          </MenuItem>
        ))}
        </Select>
        {errors.carType && (
    <FormHelperText>Поле обов`&apos;`язкове</FormHelperText>
  )}
      </FormControl>
    </Box>
    <Box sx={{ marginTop: '10px' }}>
      <Box sx={{ display: 'flex', gap: 2 }}>
        {/* Селект для марки */}
        <FormControl fullWidth error={!!errors.mark}>
          <InputLabel id="make-label">Марка</InputLabel>
          <Select
            labelId="make-label"
            id="mark"
            value={carData.mark}
            onChange={handleSelectChange("mark")}
            label="Марка"
          >
           {typeof select.marks[carData.carType as keyof typeof select.marks] === "object" &&
  (select.marks[carData.carType as keyof typeof select.marks] as { id: string; name: string }[]).map((mark) => (
    <MenuItem key={mark.id} value={mark.id}>
      {mark.name}
    </MenuItem>
  ))}

            {/* Дополните остальными элементами списка марки автомобилей */}
          </Select>
          {errors.mark && (
    <FormHelperText>Поле обов`&apos;`язкове</FormHelperText>
  )}
        </FormControl>

        {/* Селект для региона */}
        <FormControl fullWidth error={!!errors.makeRegionId}>
          <InputLabel id="region-label">Регион</InputLabel>
          <Select
            labelId="region-label"
            id="MakeRegionID"
            value={carData.makeRegionId}
            onChange={handleSelectChange("makeRegionId")}
            label="Регион"
          >
            <MenuItem value="eu">
  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
    <Box
      component="img"
      src="https://flagcdn.com/w320/gb.png"
      alt="Европа"
      sx={{ width: 20 }}
    />
    Европа
  </Box>
</MenuItem>
<MenuItem value="us">
  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
    <Box
      component="img"
      src="https://flagcdn.com/w320/us.png"
      alt="Америка"
      sx={{ width: 20 }}
    />
    Америка
  </Box>
</MenuItem>
          </Select>
          {errors.makeRegionId && (
    <FormHelperText>Поле обов`&apos;`язкове</FormHelperText>
  )}
        </FormControl>
      </Box>
    </Box>
    {/* Модификация */}
    <Grid item xs={12} md={6} sx={{ marginTop: '10px' }}>
  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
    {/* Селект для модели */}
    <FormControl fullWidth >
      <InputLabel id="model-label">Модель</InputLabel>
      <Select
        labelId="model-label"
        id="ModelID"
        value={carData.modelId}
        onChange={handleSelectChange("modelId")}
        label="Модель"
      >
        {models.length > 0  ? (
  models.map((model) => (
    <MenuItem key={model.id} value={model.id}>
      {model.name}
    </MenuItem>
  ))
) : (
  <MenuItem disabled>Немає доступных моделей</MenuItem>
)}
      </Select>
    </FormControl>

    {/* Блок с добавлением модификации */}
    {!isSubModelVisible ? (
      <Box
        sx={{
          color: 'blue',
          fontSize: '13px',
          cursor: 'pointer',
          textDecoration: 'underline',
        }}
        onClick={toggleSubModelVisibility}
      >
        добавлять модификацию
      </Box>
    ) : (
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        {/* Поле ввода для модификации */}
        <TextField
          fullWidth
          id="SubModelOther"
          name="SubModelOther"
          label="Модификация"
          value={carData.subModel}
          onChange={handleInputChange("subModel")}
          size="small"
        />
        {/* Кнопка с крестиком для отмены */}
        <Box
          sx={{
            color: 'red',
            fontSize: '20px',
            cursor: 'pointer',
            lineHeight: 1,
          }}
          onClick={toggleSubModelVisibility}
        >
          ✖
        </Box>
      </Box>
    )}
  </Box>
</Grid>
    {/* Год выпуска */}
    <Grid item xs={12} >
        <FormControl fullWidth error={!!errors.years} sx={{mt: 1}} >
          <InputLabel id="year-label">Год выпуска</InputLabel>
          <Select
            labelId="year-label"
            id="YearID"
            value={carData.years}
            onChange={handleSelectChange("years")}
            label="Год выпуска"
            className="wid100proc"
          >
            <MenuItem value="2024">2024</MenuItem>
            <MenuItem value="2023">2023</MenuItem>
            <MenuItem value="2022">2022</MenuItem>
            <MenuItem value="2021">2021</MenuItem>
            <MenuItem value="2020">2020</MenuItem>
            <MenuItem value="2019">2019</MenuItem>
            <MenuItem value="2018">2018</MenuItem>
            <MenuItem value="2017">2017</MenuItem>
            <MenuItem value="2016">2016</MenuItem>
            <MenuItem value="2015">2015</MenuItem>
            <MenuItem value="2014">2014</MenuItem>
            <MenuItem value="2013">2013</MenuItem>
            <MenuItem value="2012">2012</MenuItem>
            <MenuItem value="2011">2011</MenuItem>
            <MenuItem value="2010">2010</MenuItem>
            <MenuItem value="2009">2009</MenuItem>
            <MenuItem value="2008">2008</MenuItem>
            <MenuItem value="2007">2007</MenuItem>
            <MenuItem value="2006">2006</MenuItem>
            <MenuItem value="2005">2005</MenuItem>
            <MenuItem value="2004">2004</MenuItem>
            <MenuItem value="2003">2003</MenuItem>
            <MenuItem value="2002">2002</MenuItem>
            <MenuItem value="2001">2001</MenuItem>
            <MenuItem value="2000">2000</MenuItem>
            <MenuItem value="1999">1999</MenuItem>
            <MenuItem value="1998">1998</MenuItem>
            <MenuItem value="1997">1997</MenuItem>
            <MenuItem value="1996">1996</MenuItem>
            <MenuItem value="1995">1995</MenuItem>
            <MenuItem value="1994">1994</MenuItem>
            <MenuItem value="1993">1993</MenuItem>
            <MenuItem value="1992">1992</MenuItem>
            <MenuItem value="1991">1991</MenuItem>
            <MenuItem value="1990">1990</MenuItem>
            <MenuItem value="1989">1989</MenuItem>
            <MenuItem value="1988">1988</MenuItem>
            <MenuItem value="1987">1987</MenuItem>
            <MenuItem value="1986">1986</MenuItem>
            <MenuItem value="1985">1985</MenuItem>
            <MenuItem value="1984">1984</MenuItem>
            <MenuItem value="1983">1983</MenuItem>
            <MenuItem value="1982">1982</MenuItem>
            <MenuItem value="1981">1981</MenuItem>
            <MenuItem value="1980">1980</MenuItem>
            <MenuItem value="1979">1979</MenuItem>
            <MenuItem value="1978">1978</MenuItem>
            <MenuItem value="1977">1977</MenuItem>
            <MenuItem value="1976">1976</MenuItem>
            <MenuItem value="1975">1975</MenuItem>
            <MenuItem value="1974">1974</MenuItem>
            <MenuItem value="1973">1973</MenuItem>
            <MenuItem value="1972">1972</MenuItem>
            <MenuItem value="1971">1971</MenuItem>
            <MenuItem value="1970">1970</MenuItem>
            <MenuItem value="1969">1969</MenuItem>
            <MenuItem value="1968">1968</MenuItem>
            <MenuItem value="1967">1967</MenuItem>
            <MenuItem value="1966">1966</MenuItem>
            <MenuItem value="1965">1965</MenuItem>
            <MenuItem value="1964">1964</MenuItem>
            <MenuItem value="1963">1963</MenuItem>
            <MenuItem value="1962">1962</MenuItem>
            <MenuItem value="1961">1961</MenuItem>
            <MenuItem value="1960">1960</MenuItem>
            <MenuItem value="1959">1959</MenuItem>
            <MenuItem value="1958">1958</MenuItem>
            <MenuItem value="1957">1957</MenuItem>
            <MenuItem value="1956">1956</MenuItem>
            <MenuItem value="1955">1955</MenuItem>
            <MenuItem value="1954">1954</MenuItem>
            <MenuItem value="1953">1953</MenuItem>
            <MenuItem value="1952">1952</MenuItem>
            <MenuItem value="1951">1951</MenuItem>
            <MenuItem value="1950">1950</MenuItem>
          </Select>
          {errors.years && (
    <FormHelperText>Поле обов`&apos;`язкове</FormHelperText>
  )}
        </FormControl>
      </Grid>
    {/* Engine Section */}
  {/* Заголовок "Двигатель" */}

  {/* Секция с полями */}
  <Grid container spacing={2} sx={{ marginTop: '10px' , gap: 0 , display: 'flex' , flexDirection: 'column' , paddingLeft: '16px', }}>
  {/* Заголовок "Двигатель" */}
    Двигатель

  {/* Поля для выбора топлива и ввода объема */}
    {/* Селект для топлива */}
    <Box sx={{
       display: 'flex',
       paddingTop: '5px',
       justifyItems: 'center',
       gap: '15px',
    }}>
    <FormControl error={!!errors.fuelID} fullWidth sx={{ flex: '1 1 calc(50% - 16px)' ,  paddingTop: 0}}>
      <InputLabel>Топливо</InputLabel>
      <Select
        label="Топливо"
        name="fuelID"
        value={carData.fuelID}
        onChange={handleSelectChange("fuelID")}
      >
        <MenuItem value="">- выбрать -</MenuItem>
        <MenuItem value="1">Бензин</MenuItem>
        <MenuItem value="2">Дизель</MenuItem>
        <MenuItem value="3">Гібрид</MenuItem>
        <MenuItem value="4">Електро</MenuItem>
      </Select>
      {errors.fuelID && (
    <FormHelperText>Поле обов`&apos;`язкове</FormHelperText>
  )}
    </FormControl>

    {/* Поле для объема и текст "литра" */}
    <Box sx={{ display: 'flex', alignItems: 'center', flex: '1 1 calc(50% - 16px)', gap: 1 }}>
      <TextField
        label="Объем"
        name="engineSize"
        value={carData.engineSize}
        onChange={handleInputChange("engineSize")}
        fullWidth
        inputProps={{ maxLength: 20 }}
        placeholder="_._"
        error={!!errors.engineSize} // Ошибка показывается, если есть в errors
        helperText={errors.engineSize ? "Поле обов`&apos;`язкове" : ""}

      />
      <span style={{ whiteSpace: 'nowrap' }}>литра</span>
    </Box>
    </Box>
</Grid>


      {/* Body Type Section */}
      <Grid container spacing={2} sx={{ gap: 0 , marginTop: '5px' , paddingLeft: '16px' }}>
  {/* Заголовок "Кузов" */}
  
    Кузов

  {/* Селект для типа кузова */}
    <FormControl error={!!errors.bodyTypeID} fullWidth sx={{marginTop: '5px'}}>
      <InputLabel>Тип кузова</InputLabel>
      <Select
        label="Тип кузова"
        name="bodyTypeID"
        value={carData.bodyTypeID}
        onChange={handleSelectChange("bodyTypeID")}
      >
        <MenuItem value="">- выбрать -</MenuItem>
        <MenuItem value="1">Седан</MenuItem>
        <MenuItem value="2">Хэтчбек</MenuItem>
        <MenuItem value="3">Купе</MenuItem>
        <MenuItem value="4">Универсал</MenuItem>
        <MenuItem value="7">Внедорожник</MenuItem>
        <MenuItem value="8">Пикап</MenuItem>
        <MenuItem value="9">Кабриолет</MenuItem>
        <MenuItem value="10">Фургон</MenuItem>
      </Select>
      {errors.bodyTypeID && (
    <FormHelperText>Поле обов`&apos;`язкове</FormHelperText>
  )}
    </FormControl>
</Grid>


      {/* Transmission Section */}
      <Grid container spacing={2} sx={{ marginTop: '10px' , gap:0 , flexDirection: 'column' , paddingLeft: '16px'}}>
                  Трансмиссия
    
          <RadioGroup
            name="transID"
            value={carData.transID}
            onChange={handleData}
            row
          >
            <FormControlLabel value="Механіка" control={<Radio />} label="Механіка" />
            <FormControlLabel value="Автомат" control={<Radio />} label="Автомат" />
          </RadioGroup>
        </Grid>

      {/* Axle Section */}
      <Grid container spacing={2} sx={{ marginTop: '10px' , gap:0 , flexDirection: 'column' , paddingLeft: '16px'}} id="axle-tr" className="req__row body">
        Привод
          <RadioGroup
            name="axleID"
            value={carData.axleID}
            onChange={handleData}
            
            row
          >
            <FormControlLabel value="Передній" control={<Radio />} label="Передній" />
            <FormControlLabel value="Задній" control={<Radio />} label="Задній" />
            <FormControlLabel value="Повний" control={<Radio />} label="Повний" />
          </RadioGroup>
      </Grid>

      {/* Color Section */}
      {!carData.bodyTypeID && (
        <Grid container spacing={2} id="color_tr" className="req__row" style={{ display: formData.bodyTypeID ? 'block' : 'none' }}>
          <Grid item xs={12} md={3}>Цвет кузова</Grid>
          <Grid item xs={12} md={9}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                  <InputLabel>Цвет</InputLabel>
                  <Select
                    label="Цвет"
                    name="colorName"
                    value={carData.colorName}
                    onChange={handleSelectChange("colorName")}
                  >
                    <MenuItem value="">- выбрать -</MenuItem>
                    <MenuItem value="Бежевый">Бежевый</MenuItem>
                    <MenuItem value="Белый">Белый</MenuItem>
                    <MenuItem value="Бирюзовый">Бирюзовый</MenuItem>
                    <MenuItem value="Вишневый">Вишневый</MenuItem>
                    <MenuItem value="Голубой">Голубой</MenuItem>
                    <MenuItem value="Желтый">Желтый</MenuItem>
                    <MenuItem value="Зеленый">Зеленый</MenuItem>
                    <MenuItem value="Золотистый">Золотистый</MenuItem>
                    <MenuItem value="Коричневый">Коричневый</MenuItem>
                    <MenuItem value="Красный">Красный</MenuItem>
                    <MenuItem value="Малиновый">Малиновый</MenuItem>
                    <MenuItem value="Мокрый асфальт">Мокрый асфальт</MenuItem>
                    <MenuItem value="Оливковый">Оливковый</MenuItem>
                    <MenuItem value="Оранжевый">Оранжевый</MenuItem>
                    <MenuItem value="Розовый">Розовый</MenuItem>
                    <MenuItem value="Светло-зеленый">Светло-зеленый</MenuItem>
                    <MenuItem value="Серебристый">Серебристый</MenuItem>
                    <MenuItem value="Серый">Серый</MenuItem>
                    <MenuItem value="Синий">Синий</MenuItem>
                    <MenuItem value="Табак">Табак</MenuItem>
                    <MenuItem value="Темно-синий">Темно-синий</MenuItem>
                    <MenuItem value="Фиолетовый">Фиолетовый</MenuItem>
                    <MenuItem value="Хаки">Хаки</MenuItem>
                    <MenuItem value="Черный">Черный</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6} className="fixed129 fixed129--engine">
                <FormGroup>
                  <FormControlLabel
                    control={<Checkbox name="colorMetallic" checked={carData.colorMetallic} onChange={handleSelectChange("colorMetallic")} />}
                    label="металлик"
                  />
                </FormGroup>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      )}

      {/* VIN Section */}
      <Grid container spacing={2} sx={{mt:1 , gap: 0 , paddingLeft: '16px'}} id="vin-tr" className="req__row">
        Номер кузова (VIN)
        
          <TextField
            label="VIN"
            sx={{marginTop: '5px'}}
            name="vin"
            value={carData.vin}
            type='number'
            onChange={handleInputChange("vin")}
            fullWidth
            inputProps={{ maxLength: 50 }}
            error={!!errors.vin} // Ошибка показывается, если есть в errors
            helperText={errors.vin ? "Поле обов`&apos;`язкове" : ""}

          />
   
      </Grid>

    </Box>
  );
});
StepTwo.displayName = 'StepThree'; // ✅ Добавляем имя компонента

export default StepTwo;
