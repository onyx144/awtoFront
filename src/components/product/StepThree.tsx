import React, { useState , useEffect } from 'react';
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Radio,
  RadioGroup,
  Link ,
  InputLabel,
  Select,
  MenuItem,
  FormControl,
  FormHelperText,
  TextField,
  Typography,
} from '@mui/material';
import { getToken , getRole , getEmail , getPhone} from '@request/request'
import { forwardRef, useImperativeHandle } from "react";
import select from '@json/select.json'

import { WhatsApp, Telegram } from "@mui/icons-material";
import ViberStep from '@/svg/viberstep';

type ContactInfo = {
  phone: string;
  additionalPhone: string;
  fullName: string;
  email: string;
  cityName: string;
  comments: string;
  messageTypes: {
    viber: boolean;
    telegram: boolean;
    whatsapp: boolean;
    onlySms: boolean;
  };
};

type StepThreeProps = {
  contactInfo: ContactInfo;
  setContactInfo: React.Dispatch<React.SetStateAction<ContactInfo>>;
};
export type StepThreeRef = {
  validate: () => boolean;
};
const StepThree = forwardRef<StepThreeRef , StepThreeProps> (({ contactInfo, setContactInfo  } , ref) => {
  const [errors, setErrors] = useState<Record<string, boolean>>({});
     useImperativeHandle(ref, () => ({
         validate: () => {
           const newErrors: Record<string, boolean> = {};
           if(getRole()!= 'buyer') {
           if (!contactInfo.email) newErrors.email = true;
           if (!contactInfo.phone) newErrors.phone = true;
           }
           if (!Object.values(contactInfo.messageTypes).some(Boolean)) newErrors.messageTypes = true;
         setErrors(newErrors);
         const isValid = Object.keys(newErrors).length === 0;
         console.log('error' , newErrors);         
         return isValid;
         },
       }));
  const [authType, setAuthType] = useState('1');
  
  
  const [showAdditionalPhone, setShowAdditionalPhone] = useState(false);
  const [token, setToken] = useState<string | null>(null);
 

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setToken(getToken());
    if (getRole() === 'buyer') {
      setContactInfo((prev) => ({
        ...prev,
        email: getEmail() || '',
        phone: getPhone() || '',
      }));
    }
    }
  }, []);
  
  const handleAuthTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAuthType(event.target.value);
  };
  const handleCheckboxChange = (type: keyof ContactInfo['messageTypes']) => {
    setContactInfo((prev) => ({
      ...prev,
      messageTypes: {
        ...prev.messageTypes,
        [type]: !prev.messageTypes[type],  // Инвертируем значение текущего поля
      }
    }));
    if (errors['messageTypes']) {
      const updatedErrors = { ...errors };
      delete updatedErrors['messageTypes'];
      setErrors(updatedErrors);
    }
  };

  const handleInputChange = (field: keyof ContactInfo, value: string) => {
    setContactInfo((prev) => ({
      ...prev,
      [field]: value,  // Обновляем нужное поле в ContactInfo
    }));
    if (errors[field]) {
      const updatedErrors = { ...errors };
      delete updatedErrors[field];
      setErrors(updatedErrors);
    }
  };
  
 
  
  return (
    <Box sx={{ padding: 2 }}>
      
      { !token && (
      <Box>
        <Typography variant="h6">Выберите способ авторизации</Typography>
        <RadioGroup row value={authType} onChange={handleAuthTypeChange}>
          <FormControlLabel
            value="1"
            control={<Radio />}
            label="Отправить запрос без регистрации"
          />
          <FormControlLabel
            value="2"
            control={<Radio />}
            label="Войти или зарегистрироваться"
          />
        </RadioGroup>
      </Box>
      )}
      {authType === '2'  && (
         <Box display="flex" justifyContent="center" sx={{ gap: "10px" }}  mt={2}>
         <Button variant="contained" color="primary" component={Link} href="/sign-in">
           Увійти
         </Button>
         <Button variant="contained" color="primary" component={Link} href="/sign-up">
           Зареєструватись
         </Button>
       </Box>
      )}
      
      <Box mt={2}>
      {((authType === '1' || getRole() == 'salesman') && getRole() != 'buyer') && (
        <Box>
        <Typography variant="h6">Контактная информация</Typography>
        <TextField
          fullWidth
          label="E-mail"
          value={contactInfo.email}
          onChange={(e) => handleInputChange('email', e.target.value)}
          margin="normal"
          autoComplete="email"
          error={!!errors.email} // Ошибка показывается, если есть в errors
          helperText={errors.email ? "Поле обов'язкове" : ""}
        />
        <TextField
          fullWidth
          label="Телефон"
          value={contactInfo.phone}
          onChange={(e) => handleInputChange('phone', e.target.value)}
          margin="normal"
          autoComplete="tel"
          error={!!errors.phone} // Ошибка показывается, если есть в errors
          helperText={errors.phone ? "Поле обов'язкове" : ""}
        />
        </Box>
      )}
         <FormControl error={!!errors.messageTypes}>
  <Box className="message-line" sx={{ display: "flex", flexWrap: "nowrap", mr: 2 }}>
    <FormControlLabel
      control={
        <Checkbox
          checked={contactInfo.messageTypes.viber}
          onChange={() => handleCheckboxChange("viber")}
          icon={<ViberStep />}
          checkedIcon={<ViberStep color={"#8fad1c"} />}
        />
      }
      label="Viber"
    />
    <FormControlLabel
      control={
        <Checkbox
          checked={contactInfo.messageTypes.telegram}
          onChange={() => handleCheckboxChange("telegram")}
          icon={<Telegram />}
          checkedIcon={<Telegram />}
        />
      }
      label="Telegram"
    />
    <FormControlLabel
      control={
        <Checkbox
          checked={contactInfo.messageTypes.whatsapp}
          onChange={() => handleCheckboxChange("whatsapp")}
          icon={<WhatsApp />}
          checkedIcon={<WhatsApp />}
        />
      }
      label="WhatsApp"
    />
  </Box>

  <FormControlLabel
    control={
      <Checkbox
        checked={contactInfo.messageTypes.onlySms}
        onChange={() => handleCheckboxChange("onlySms")}
      />
    }
    label="Тільки повідомлення"
  />

  {errors.messageTypes && <FormHelperText>Оберіть хоч один варіант</FormHelperText>}
</FormControl>

        {showAdditionalPhone && (
          <TextField
            fullWidth
            label="Дополнительный телефон"
            value={contactInfo.additionalPhone}
            onChange={(e) => handleInputChange('additionalPhone', e.target.value)}
            margin="normal"
            autoComplete="tel"
          />
        )}
        <Button
          variant="text"
          onClick={() => setShowAdditionalPhone(!showAdditionalPhone)}
        >
          {showAdditionalPhone ? '- Убрать телефон' : '+ Еще телефон'}
        </Button>
      </Box>

      <Box mt={2}>
        <Typography variant="h6">Дополнительная информация</Typography>
        <TextField
          fullWidth
          label="Ваше имя"
          value={contactInfo.fullName}
          onChange={(e) => handleInputChange('fullName', e.target.value)}
          margin="normal"
          autoComplete="name"
        />

<FormControl fullWidth margin="normal">
   <InputLabel>Регіон</InputLabel>
  <Select
    labelId="city-label"
    label="Регіон"
    value={contactInfo.cityName}
    onChange={(e) => handleInputChange("cityName", e.target.value)}
  >
    {select.regions.options.map((region) => (
      <MenuItem key={region.id} value={region.id}>
        {region.name}
      </MenuItem>
    ))}
  </Select>
</FormControl>
        <TextField
          className='textArea'
          fullWidth
          label="Комментарі"
          multiline
          rows={4}
          value={contactInfo.comments}
          onChange={(e) => handleInputChange('comments', e.target.value)}
          margin="normal"
        />
      </Box>

    </Box>
  );
});
StepThree.displayName = 'StepThree'; // ✅ Добавляем имя компонента

export default StepThree;
