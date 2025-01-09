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

const StepTwo: React.FC = () => {
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
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleData = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked, type } = e.target;
    setFormData((prev) => ({
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
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <div>Марка</div>
      </Grid>
      <Grid item xs={12} md={6}>
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
      </Grid>
      <Grid item xs={12} md={6}>
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
              <img src="https://flagcdn.com/w320/gb.png" alt="Европа" style={{ width: 20, marginRight: 8 }} />
              Европа
            </MenuItem>
            <MenuItem value="2">
              <img src="https://flagcdn.com/w320/us.png" alt="Америка" style={{ width: 20, marginRight: 8 }} />
              Америка
            </MenuItem>
          </Select>
        </FormControl>
      </Grid>
    </Grid>
    {/* Модификация */}
    <Grid item xs={12} md={6}>
        <div className="flex-row flex-row--spacebetween flex-row--wrap400">
          <div className="wid100proc">
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
                {/* Добавьте другие модели */}
              </Select>
            </FormControl>
          </div>
          <div className="fixed129 fixed129--submodel">
            <div id="mod_toggle" className="inline-block">
              <span
                className="link-n blue f13"
                onClick={toggleSubModelVisibility}
              >
                добавлять модификацию
              </span>
            </div>
            {isSubModelVisible && (
              <div id="mod_tr">
                <TextField
                  fullWidth
                  id="SubModelOther"
                  name="SubModelOther"
                  label="Модификация"
                  value={subModel}
                  onChange={(e) => setSubModel(e.target.value)}
                />
              </div>
            )}
          </div>
        </div>
      </Grid>
    {/* Год выпуска */}
    <Grid item xs={12}>
        <div>Год выпуска</div>
        <FormControl fullWidth>
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
    <Grid container spacing={2} id="engine-tr" className="req__row">
        <Grid item xs={12} md={3} className="b optout">Двигатель</Grid>
        <Grid item xs={12} md={9}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Топливо</InputLabel>
                <Select
                  label="Топливо"
                  name="fuelID"
                  value={formData.fuelID}
                  onChange={handleChange}
                >
                  <MenuItem value="">- выбрать -</MenuItem>
                  <MenuItem value="1">Бензин</MenuItem>
                  <MenuItem value="2">Дизель</MenuItem>
                  <MenuItem value="3">Гибрид</MenuItem>
                  <MenuItem value="4">Электро</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6} className="fixed129 fixed129--engine">
              <TextField
                label="Объем"
                name="engineSize"
                value={formData.engineSize}
                onChange={handleData}
                fullWidth
                inputProps={{ maxLength: 20 }}
                placeholder="_._"
              />
              <span id="liter_lbl" className="inline-block mt10">литра</span>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      {/* Body Type Section */}
      <Grid container spacing={2} id="tr_bodytype" className="req__row body">
        <Grid item xs={12} md={3} className="b optout">Кузов</Grid>
        <Grid item xs={12} md={9}>
          <FormControl fullWidth>
            <InputLabel>Тип кузова</InputLabel>
            <Select
              label="Тип кузова"
              name="bodyTypeID"
              value={formData.bodyTypeID}
              onChange={handleChange}
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
      <Grid container spacing={2} id="trans-tr" className="req__row body">
        <Grid item xs={12} md={3}>Трансмиссия</Grid>
        <Grid item xs={12} md={9}>
          <RadioGroup
            name="transID"
            value={formData.transID}
            onChange={handleChange}
            row
          >
            <FormControlLabel value="101" control={<Radio />} label="Механика" />
            <FormControlLabel value="102" control={<Radio />} label="Автомат" />
          </RadioGroup>
        </Grid>
      </Grid>

      {/* Axle Section */}
      <Grid container spacing={2} id="axle-tr" className="req__row body">
        <Grid item xs={12} md={3}>Привод</Grid>
        <Grid item xs={12} md={9}>
          <RadioGroup
            name="axleID"
            value={formData.axleID}
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
                    value={formData.colorName}
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
                    control={<Checkbox name="colorMetallic" checked={formData.colorMetallic} onChange={handleChange} />}
                    label="металлик"
                  />
                </FormGroup>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      )}

      {/* VIN Section */}
      <Grid container spacing={2} id="vin-tr" className="req__row">
        <Grid item xs={12} md={3} className="optout optoutvin b">Номер кузова (VIN)</Grid>
        <Grid item xs={12} md={9}>
          <TextField
            label="VIN"
            name="vin"
            value={formData.vin}
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
