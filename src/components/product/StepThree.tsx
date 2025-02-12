import React, { useState , useEffect } from 'react';
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import { getToken } from '@request/request'

import { WhatsApp, Telegram, Vibration } from "@mui/icons-material";
import ViberIcon from '@/svg/vibericon';

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
const StepThree: React.FC<StepThreeProps> = ({ contactInfo, setContactInfo  }) => {
  
  const [authType, setAuthType] = useState('1');
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regPasswordConfirm, setRegPasswordConfirm] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [phone, setPhone] = useState('');
  const [additionalPhone, setAdditionalPhone] = useState('');
  const [fullName, setFullName] = useState('');
  const [cityName, setCityName] = useState('');
  const [comments, setComments] = useState('');
  const [token, setToken] = useState<string | null>(null);
  
  const [showAdditionalPhone, setShowAdditionalPhone] = useState(false);
  const [messageTypes, setMessageTypes] = useState({
    viber: false,
    telegram: false,
    whatsapp: false,
    onlySms: false,
  });
  const handleAuthTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAuthType(event.target.value);
  };
  const handleCheckboxChange = (type: keyof typeof messageTypes) => {
    setContactInfo((prev) => ({
      ...prev,
      messageTypes: {
        ...prev.messageTypes,
        [type]: !prev.messageTypes[type],  // Инвертируем значение текущего поля
      }
    }));
  };

  const handleInputChange = (field: keyof ContactInfo, value: string) => {
    setContactInfo((prev) => ({
      ...prev,
      [field]: value,  // Обновляем нужное поле в ContactInfo
    }));
  };
  
  useEffect(() => {
    setToken(getToken()); // Устанавливаем токен при загрузке компонента
  }, []);
  
  return (
    <Box sx={{ padding: 2 }}>
      { !token &&
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
      }
      {authType === '2' && (
        <Box mt={2}>
          <Typography variant="h6">Войти</Typography>
          <TextField
            fullWidth
            label="Ваш e-mail"
            value={loginEmail}
            onChange={(e) => setLoginEmail(e.target.value)}
            margin="normal"
            autoComplete="email"
          />
          <TextField
            fullWidth
            label="Пароль"
            type="password"
            value={loginPassword}
            onChange={(e) => setLoginPassword(e.target.value)}
            margin="normal"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
            }
            label="Запомнить меня"
          />
          <Button variant="text" onClick={() => alert('Сброс пароля')}>Забыли пароль?</Button>
        </Box>
      )}

      {authType === '2' && (
        <Box mt={2}>
          <Typography variant="h6">Регистрация</Typography>
          <TextField
            fullWidth
            label="Ваш e-mail"
            value={regEmail}
            onChange={(e) => setRegEmail(e.target.value)}
            margin="normal"
            autoComplete="email"
          />
          <TextField
            fullWidth
            label="Пароль"
            type="password"
            value={regPassword}
            onChange={(e) => setRegPassword(e.target.value)}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Еще раз пароль"
            type="password"
            value={regPasswordConfirm}
            onChange={(e) => setRegPasswordConfirm(e.target.value)}
            margin="normal"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
            }
            label="Запомнить меня"
          />
        </Box>
      )}

      <Box mt={2}>
        <Typography variant="h6">Контактная информация</Typography>
        <TextField
          fullWidth
          label="E-mail"
          value={contactInfo.email}
          onChange={(e) => handleInputChange('email', e.target.value)}
          margin="normal"
          autoComplete="email"
        />
        <TextField
          fullWidth
          label="Телефон"
          value={contactInfo.phone}
          onChange={(e) => handleInputChange('phone', e.target.value)}
          margin="normal"
          autoComplete="tel"
        />
         <Box
        sx={{
          mt: 2,
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
        }}
      >
        <Box sx={{ display: "flex", flexWrap: "nowrap", mr: 2 }}>
          <FormControlLabel
            control={
              <Checkbox
                checked={contactInfo.messageTypes.viber}
                onChange={() => handleCheckboxChange("viber")}
                icon={<ViberIcon />}
                checkedIcon={<ViberIcon color={'#8fad1c'} />}
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
          label="Только сообщение"
        />
      </Box>
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

        <TextField
          fullWidth
          label="Город"
          value={contactInfo.cityName}
          onChange={(e) => handleInputChange('cityName', e.target.value)} 
          margin="normal"
        />
        <TextField
          fullWidth
          label="Комментарии"
          multiline
          rows={4}
          value={contactInfo.comments}
          onChange={(e) => handleInputChange('comments', e.target.value)}
          margin="normal"
        />
      </Box>

    </Box>
  );
};

export default StepThree;
