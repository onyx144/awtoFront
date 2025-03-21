// Profile.
"use client";
import React, { useState , useEffect } from "react";
import {
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  TextField,
  Button,
  Grid,
  Select,
  MenuItem,
  InputLabel,
  FormHelperText,
  Box,
  Typography,
  SelectChangeEvent ,
} from "@mui/material";
//import select from '@json/select.json'
import {request} from '@request/request'

type User = {
  additionalInfo: string | null;
  city: string | null;
  city_company: string | null;
  companyAddress: string | null;
  companyName: string | null;
  email: string;
  email_company: string | null;
  name: string;
  password: string;
  paymentMethod: string | null;
  phone: string;
  phoneNumbers: { number: string; name: string }[] | null;
  region: string | null;
  region_company: string | null;
  role: string;
  secondPhone: string | null;
  verification: boolean;
  website: string | null;
};
// Моковые данные для заполнения формы


const Profile = () => {
  const [selectedOption, setSelectedOption] = useState<string>("user");
  const [formData, setFormData] = useState<User | null>(null);
  const [currentPassword, setcurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const updatePassword = async (e: React.FormEvent) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      alert('Пароли не совпадают');
      return;
    }

    try {
      const response = await request('put', '/users/change-password', {
        currentPassword,
        newPassword,
      });
      alert('Пароль успешно изменен');
      console.log('Пароль успешно изменен', response.data);
    } catch (error) {
      console.error('Ошибка при смене пароля:', error);
      alert(error);
    }
  };
  const updateUser = async (updateData: Partial<User>) => {
    try {
      const response = await request('put', `/users/update`, updateData);
      return response.data;
    } catch (error) {
      console.error('Ошибка при обновлении пользователя:', error);
      throw error;
    }
  };

  const getUser = async () => {
    try {
      const response = await request('get', '/users');
      console.log(response.data); 
      setFormData(response.data);

    } catch (error) {
      console.error("Ошибка при получении пользователей:", error);
    }
  };
  const handleSave = async () => {
    if(formData)
    updateUser(formData);
  }

  useEffect(() => {
   getUser(); 
      }, []);
  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedOption(event.target.value);
  };

  const handleInputChange = (event: SelectChangeEvent<string>) => {
    const { name, value } = event.target;
    setFormData((prevData) => 
      prevData ? { ...prevData, [name]: value } : ({} as User) // Приведение типов
    );
  };
  
  const handleTextFieldChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevData) => 
      prevData ? { ...prevData, [name]: value } : ({} as User) // Приведение типов
    );
  };
  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom>
        Профиль пользователя
      </Typography>

      <FormControl component="fieldset" sx={{ marginBottom: 3 }}>
        <FormLabel component="legend">Настройки</FormLabel>
        <RadioGroup
          aria-label="settings"
          name="settings"
          value={selectedOption}
          onChange={handleRadioChange}
          row
        >
          <FormControlLabel value="user" control={<Radio />} label="Информация о пользователе" />
          <FormControlLabel value="company" control={<Radio />} label="Информация о компании" />
          <FormControlLabel value="password" control={<Radio />} label="Сменить пароль" />
        </RadioGroup>
      </FormControl>

      {/* Форма для "Информация о пользователе" */}
      {selectedOption === "user" && (
        <form>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Полное имя"
                variant="outlined"
                fullWidth
                name="name"
                value={formData?.name ?? ''}
                onChange={handleTextFieldChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="E-mail"
                variant="outlined"
                fullWidth
                name="email"
                value={formData?.email ?? ''}
                onChange={handleTextFieldChange}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Регион</InputLabel>
                <Select
                  label="Регион"
                  name="region"
                  value={formData?.region ?? ''}
                  onChange={handleInputChange}
                >
                  <MenuItem value="Кировоградская область">Кировоградская область</MenuItem>
                  <MenuItem value="Днепропетровская область">Днепропетровская область</MenuItem>
                  {/* Дополните списком областей */}
                </Select>
                <FormHelperText>Выберите регион</FormHelperText>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Город</InputLabel>
                <Select
                  label="Город"
                  name="city"
                  value={formData?.city ?? ''}
                  onChange={handleInputChange}
                >
                  <MenuItem value="Кропивницкий">Кропивницкий</MenuItem>
                  <MenuItem value="Запорожье">Запорожье</MenuItem>
                  {/* Дополните списком городов */}
                </Select>
                <FormHelperText>Выберите город</FormHelperText>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Телефон"
                variant="outlined"
                fullWidth
                name="phone"
                value={formData?.phone ?? ''}
                onChange={handleTextFieldChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Телефон #2"
                variant="outlined"
                fullWidth
                name="secondPhone"
                value={formData?.secondPhone  ?? ''}
                onChange={handleTextFieldChange}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Способ оплаты</InputLabel>
                <Select
                  label="Способ оплаты"
                  name="paymentMethod"
                  value={formData?.paymentMethod  ?? ''}
                  onChange={handleInputChange}
                >
                  <MenuItem value="Наличный (банковский перевод)">
                    Наличный (банковский перевод)
                  </MenuItem>
                  <MenuItem value="Безналичный">Безналичный</MenuItem>
                </Select>
                <FormHelperText>Выберите способ оплаты</FormHelperText>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <Button variant="contained" onClick={handleSave} color="primary" type="button">
                Зберегти
              </Button>
            </Grid>
          </Grid>
        </form>
      )}

      {/* Здесь будет информация о компании (заполняется позже) */}
      {selectedOption === "company" && (
  <div>
    <TextField
      name="companyName"
      label="Название компании"
      value={formData?.companyName ?? ''}
      onChange={handleTextFieldChange}
      fullWidth
      style={{ marginBottom: '10px' }}
    />

    <TextField
      name="companyAddress"
      label="Адрес компании"
      value={formData?.companyAddress ?? ''}
      onChange={handleTextFieldChange}
      fullWidth
      style={{ marginBottom: '10px' }}
    />

    <Select
      name="region_company"
      value={formData?.region_company ?? ''}
      onChange={handleInputChange}
      fullWidth
      displayEmpty
      style={{ marginBottom: '10px' }}
      renderValue={(selected) => selected || "Регион"}
    >
      <MenuItem value="Львовская область">Львовская область</MenuItem>
      <MenuItem value="Киевская область">Киевская область</MenuItem>
      <MenuItem value="Днепропетровская область">Днепропетровская область</MenuItem>
    </Select>

    <Select
      name="city_company"
      value={formData?.city_company ?? ''}
      onChange={handleInputChange}
      fullWidth
      displayEmpty
      style={{ marginBottom: '15px' }}
      renderValue={(selected) => selected || "Город"}
    >
      <MenuItem value="Стрый">Стрый</MenuItem>
      <MenuItem value="Львов">Львов</MenuItem>
      <MenuItem value="Киев">Киев</MenuItem>
    </Select>

    <TextField
      name="email_company"
      label="E-mail"
      value={formData?.email_company  ?? ''}
      onChange={handleTextFieldChange}
      fullWidth
      style={{ marginBottom: '15px' }}
    />

    {/*formData?.phoneNumbers?.map((phone, index) => (
      <div key={index} style={{ marginBottom: '15px' }}>
        <TextField
          name={`phone-${index}`}
          label={`Телефон ${index + 1}`}
          value={phone.number}
          onChange={(e) => {
            const updatedPhones = [...formData.phoneNumbers];
            updatedPhones[index].number = e.target.value;
            setFormData({ ...formData, phoneNumbers: updatedPhones });
          }}
          fullWidth
          InputProps={{
            startAdornment: <InputAdornment position="start">+38</InputAdornment>,
          }}
          style={{ marginBottom: '15px' }}
        />
        <TextField
          name={`phoneName-${index}`}
          label="Комментарий к номеру"
          value={phone.name}
          onChange={(e) => {
            const updatedPhones = [...formData?.phoneNumbers  ?? ''];
            updatedPhones[index].name = e.target.value;
            setFormData({ ...formData, phoneNumbers: updatedPhones });
          }}
          fullWidth
        />
      </div>
    ))*/}

    <TextField
      name="website"
      label="Сайт компании"
      value={formData?.website  ?? ''}
      onChange={handleTextFieldChange}
      fullWidth
      style={{ marginBottom: '20px' }}
    />

    <TextField
      name="additionalInfo"
      label="Дополнительная информация"
      value={formData?.additionalInfo  ?? ''}
      onChange={handleTextFieldChange}
      fullWidth
      multiline
      rows={3}
      style={{ marginBottom: '10px' }}
    />
     <Button variant="contained" onClick={handleSave} color="primary" type="submit">
                Зберегти
      </Button>
  </div>
)}




      {/* Форма для смены пароля */}
      {selectedOption === "password" && (
        <form>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Старый пароль"
                variant="outlined"
                type="password"
                fullWidth
                onChange={(e) => setcurrentPassword(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Новый пароль"
                variant="outlined"
                type="password"
                fullWidth
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Подтверждение пароля"
                variant="outlined"
                type="password"
                fullWidth
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <Button onClick={updatePassword} variant="contained" color="primary" type="submit">
                Сменить пароль
              </Button>
            </Grid>
          </Grid>
        </form>
      )}
    </Box>
  );
};

export default Profile;
