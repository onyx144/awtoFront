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
  Link ,
  TextField,
  Typography,
} from '@mui/material';
import { getToken , getRole , getEmail , getPhone} from '@request/request'

import { WhatsApp, Telegram, Vibration } from "@mui/icons-material";
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
  useEffect(() => {
    if (getRole() === 'buyer') {
      setContactInfo((prev) => ({
        ...prev,
        email: getEmail() || '',
        phone: getPhone() || '',
      }));
    }
  }, []);
  
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
      
      { !getToken() && (
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
      {(authType === '1' || getRole() == 'salesman') && (
        <Box>
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
        </Box>
      )}
         <Box
        sx={{
          mt: 2,
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
          flexWrap: 'wrap'
        }}
      >
        <Box className={'message-line'} sx={{ display: "flex", flexWrap: "nowrap", mr: 2 }}>
          <FormControlLabel
            control={
              <Checkbox
                checked={contactInfo.messageTypes.viber}
                onChange={() => handleCheckboxChange("viber")}
                icon={<ViberStep />}
                checkedIcon={<ViberStep color={'#8fad1c'} />}
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
