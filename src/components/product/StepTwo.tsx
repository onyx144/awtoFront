import React, { useState } from "react";
import { RadioGroup , Checkbox , FormControlLabel , Radio ,  FormGroup , TextField , FormControl, Grid , InputLabel, MenuItem, Select, SelectChangeEvent, Typography, Box } from "@mui/material";

interface FormData {
    fuelID: string;
    engineSize: string;
    bodyTypeID: string;
    transID: string;
    axleID: string;
    colorName: string;
    colorMetallic: boolean;
    vin: string;
  }
  type CarData = {
    modelId: string;
    carType: string;
    makeId: string;
    makeRegionId: string;
    subModel: string;
    isSubModelVisible: boolean;
    year: string;
    fuelID: string;
    engineSize: string;
    bodyTypeID: string;
    transID: string;
    axleID: string;
    colorName: string;
    colorMetallic: boolean;
    vin: string;
  };
  
  type StepTwoProps = {
    carData: CarData;
    setCarData: React.Dispatch<React.SetStateAction<CarData>>;
  };

const StepTwo: React.FC<StepTwoProps> = ({ carData, setCarData }) => {
const [modelId, setModelId] = useState<string>('');
  const [carType, setCarType] = useState<string>("");
  const [makeId, setMakeId] = useState<string>('');
  const [makeRegionId, setMakeRegionId] = useState<string>('1');
  const [subModel, setSubModel] = useState<string>('');
  const [isSubModelVisible, setSubModelVisible] = useState<boolean>(false);
  const [year, setYear] = useState<string>('');
  const [formData, setFormData] = useState<FormData>({
    fuelID: "",
    engineSize: "",
    bodyTypeID: "",
    transID: "",
    axleID: "",
    colorName: "",
    colorMetallic: false,
    vin: "",
  });
  const handleSelect = (e: SelectChangeEvent<string>) => {
    const { name, value } = e.target;
    setCarData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleProps = (field: string, value: string) => {
    setCarData(prev => ({ ...prev, [field]: value }));
  };
  const handleData = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked, type } = e.target;
    setCarData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };
  const handleModelChange = (event: SelectChangeEvent) => {
    setModelId(event.target.value);
  };
  const handleMakeChange = (event: SelectChangeEvent) => {
    setMakeId(event.target.value);
  };
  const toggleSubModelVisibility = () => {
    setSubModelVisible(!isSubModelVisible);
  };
  const handleYearChange = (event: SelectChangeEvent) => {
    setYear(event.target.value);
  };
  const handleRegionChange = (event: SelectChangeEvent) => {
    setMakeRegionId(event.target.value);
  };
  const handleChange = (event: SelectChangeEvent) => {
    setCarType(event.target.value);
    console.log(carType);
  };

  return (
    <Box>
    <Box display="flex" flexDirection="row" alignItems="center" gap={2}>
      <Typography variant="body1" fontWeight="bold">
        Тип
      </Typography>
      <FormControl fullWidth>
        <InputLabel id="car-type-select-label">Выберите тип</InputLabel>
        <Select
          labelId="car-type-select-label"
          id="car-type-select"
          value={carType}
          onChange={handleChange}
          label="Тип"
        >
          <MenuItem value="1">Легковые</MenuItem>
          <MenuItem value="2">Мототехника</MenuItem>
          <MenuItem value="3">Грузовые</MenuItem>
          <MenuItem value="4">Автобусы</MenuItem>
          <MenuItem value="6">Спецтехника</MenuItem>
        </Select>
      </FormControl>
    </Box>
    <Box sx={{ marginTop: '10px' }}>
      <Box sx={{ display: 'flex', gap: 2 }}>
        {/* Селект для марки */}
        <FormControl fullWidth>
          <InputLabel id="make-label">Марка</InputLabel>
          <Select
            labelId="make-label"
            id="MakeID"
            value={makeId}
            onChange={handleMakeChange}
            label="Марка"
          >
            <MenuItem value="0">- выбрать -</MenuItem>
            <MenuItem value="1">Acura</MenuItem>
            <MenuItem value="2">Alfa Romeo</MenuItem>
            <MenuItem value="383">ARO</MenuItem>
            <MenuItem value="255">Asia</MenuItem>
            <MenuItem value="22">Aston Martin</MenuItem>
            {/* Дополните остальными элементами списка марки автомобилей */}
          </Select>
        </FormControl>

        {/* Селект для региона */}
        <FormControl fullWidth>
          <InputLabel id="region-label">Регион</InputLabel>
          <Select
            labelId="region-label"
            id="MakeRegionID"
            value={makeRegionId}
            onChange={handleRegionChange}
            label="Регион"
          >
            <MenuItem value="1">
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
<MenuItem value="2">
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
        </FormControl>
      </Box>
    </Box>
    {/* Модификация */}
    <Grid item xs={12} md={6} sx={{ marginTop: '10px' }}>
  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
    {/* Селект для модели */}
    <FormControl fullWidth>
      <InputLabel id="model-label">Модель</InputLabel>
      <Select
        labelId="model-label"
        id="ModelID"
        value={modelId}
        onChange={handleModelChange}
        label="Модель"
      >
        <MenuItem value="0">- выбрать -</MenuItem>
        <MenuItem value="1">- 1 -</MenuItem>
        <MenuItem value="2">- 2 -</MenuItem>
        <MenuItem value="3">- 3 -</MenuItem>
        {/* Добавьте другие модели */}
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
          value={subModel}
          onChange={(e) => setSubModel(e.target.value)}
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
        <FormControl fullWidth sx={{mt: 1}}>
          <InputLabel id="year-label">Год выпуска</InputLabel>
          <Select
            labelId="year-label"
            id="YearID"
            value={year}
            onChange={handleYearChange}
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
        </FormControl>
      </Grid>
    {/* Engine Section */}
  {/* Заголовок "Двигатель" */}

  {/* Секция с полями */}
  <Grid container spacing={2} sx={{ marginTop: '10px' }}>
  {/* Заголовок "Двигатель" */}
  <Grid item xs={12} md={3} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'start' }}>
    Двигатель
  </Grid>

  {/* Поля для выбора топлива и ввода объема */}
  <Grid item xs={12} md={9} sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
    {/* Селект для топлива */}
    <FormControl fullWidth sx={{ flex: '1 1 calc(50% - 16px)' }}>
      <InputLabel>Топливо</InputLabel>
      <Select
        label="Топливо"
        name="fuelID"
        value={carData.fuelID}
        onChange={handleSelect}
      >
        <MenuItem value="">- выбрать -</MenuItem>
        <MenuItem value="1">Бензин</MenuItem>
        <MenuItem value="2">Дизель</MenuItem>
        <MenuItem value="3">Гібрид</MenuItem>
        <MenuItem value="4">Електро</MenuItem>
      </Select>
    </FormControl>

    {/* Поле для объема и текст "литра" */}
    <Box sx={{ display: 'flex', alignItems: 'center', flex: '1 1 calc(50% - 16px)', gap: 1 }}>
      <TextField
        label="Объем"
        name="engineSize"
        value={carData.engineSize}
        onChange={handleData}
        fullWidth
        inputProps={{ maxLength: 20 }}
        placeholder="_._"
      />
      <span style={{ whiteSpace: 'nowrap' }}>литра</span>
    </Box>
  </Grid>
</Grid>


      {/* Body Type Section */}
      <Grid container spacing={2} sx={{ marginTop: '5px' }}>
  {/* Заголовок "Кузов" */}
  <Grid 
    item 
    xs={12} 
    md={3} 
    sx={{ display: 'flex', alignItems: 'center', justifyContent: 'start' }} 
    className="b optout"
  >
    Кузов
  </Grid>

  {/* Селект для типа кузова */}
  <Grid item xs={12} md={9}>
    <FormControl fullWidth>
      <InputLabel>Тип кузова</InputLabel>
      <Select
        label="Тип кузова"
        name="bodyTypeID"
        value={carData.bodyTypeID}
        onChange={handleSelect}
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
    </FormControl>
  </Grid>
</Grid>


      {/* Transmission Section */}
      <Grid container spacing={2} sx={{ marginTop: '5px' }}>
        <Grid item xs={12} md={3}
            sx={{ display: 'flex', alignItems: 'center', justifyContent: 'start' }} >
              Трансмиссия</Grid>
        <Grid item xs={12} md={9}>
          <RadioGroup
            name="transID"
            value={carData.transID}
            onChange={handleData}
            row
          >
            <FormControlLabel value="101" control={<Radio />} label="Механика" />
            <FormControlLabel value="102" control={<Radio />} label="Автомат" />
          </RadioGroup>
        </Grid>
      </Grid>

      {/* Axle Section */}
      <Grid container spacing={2} sx={{ marginTop: '5px' }} id="axle-tr" className="req__row body">
        <Grid item xs={12} md={3} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'start' }}>Привод</Grid>
        <Grid item xs={12} md={9}>
          <RadioGroup
            name="axleID"
            value={carData.axleID}
            onChange={handleData}
            row
          >
            <FormControlLabel value="1" control={<Radio />} label="Передний" />
            <FormControlLabel value="2" control={<Radio />} label="Задний" />
            <FormControlLabel value="3" control={<Radio />} label="Полный" />
          </RadioGroup>
        </Grid>
      </Grid>

      {/* Color Section */}
      {formData.bodyTypeID && (
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
                    onChange={handleSelect}
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
                    control={<Checkbox name="colorMetallic" checked={carData.colorMetallic} onChange={handleSelect} />}
                    label="металлик"
                  />
                </FormGroup>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      )}

      {/* VIN Section */}
      <Grid container spacing={2} sx={{mt:1}} id="vin-tr" className="req__row">
        <Grid item xs={12} md={3} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'start' }} className="optout optoutvin b">Номер кузова (VIN)</Grid>
        <Grid item xs={12} md={9}>
          <TextField
            label="VIN"
            name="vin"
            value={carData.vin}
            onChange={handleData}
            fullWidth
            inputProps={{ maxLength: 50 }}
          />
        </Grid>
      </Grid>

    </Box>
  );
};

export default StepTwo;
