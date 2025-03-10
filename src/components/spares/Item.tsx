import { Box, Button, Typography, 
  MenuItem,
  Select,
  FormControl,
  InputLabel,TableRow, 
  TextField, TableCell, Dialog, DialogActions, DialogContent, DialogTitle, IconButton } from '@mui/material';
import React, { useState , useEffect } from 'react';
import { CopyAll } from '@mui/icons-material'; // иконка для копирования в буфер
import { WhatsApp, Telegram, Vibration } from "@mui/icons-material";
import ViberColor from '@/svg/vibericon';
import Link from 'next/link';
import Cookies from 'js-cookie';

// Функция для преобразования времени в "Х минут назад"
const timeAgo = (datetime: string) => {
    const now = new Date();
    const time = new Date(datetime);
    const diffInSeconds = Math.floor((now.getTime() - time.getTime()) / 1000);
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    const diffInHours = Math.floor(diffInMinutes / 60);
    const diffInDays = Math.floor(diffInHours / 24);
  
    if (diffInMinutes < 1) return 'Тільки що';
    if (diffInMinutes === 1) return '1 хвилина назад';
    
    // Если больше 60 минут, переводим в часы и минуты
    if (diffInHours < 24) {
      const minutesLeft = diffInMinutes % 60; // Остаток минут
      if (diffInHours === 1) return `1 година ${minutesLeft} хвилин тому`;
      return `${diffInHours} години ${minutesLeft} хвилин тому`;
    }
  
    // Если больше 24 часов, переводим в дни и часы
    if (diffInDays === 1) return '1 день тому';
    return `${diffInDays} дні ${diffInHours % 24} години тому`;
};
interface FormValues {
  condition: string;
  type: string;
  warranty: string;
  mileage: string;
  mileageUnit: string;
  availability: string;
  price: string;
  inform: string;
  currency: string;
}
interface ItemProps {
  id?: string;
  name: string;
  user?: string;
  city: string;
  tyme: string;
  phone: string;
  contact: {
    viber: boolean;
    telegram: boolean;
    whatsapp: boolean;
    onlySms: boolean;
  };
  story?: boolean;
  mark?: string;
  modelId?: string;
  years?: string;
  engineSize?: string;
  fuelID?: string;
  bodyTypeID?: string;
  axleID?: string;
  partGroup?: string;
  partType?: string;
  partCondition?: string;
  partNumber?: string;
  photo?: string;
  vin?: string;
  partDescription?: string;
}

const getInitialValues = (): FormValues => ({
  condition: Cookies.get("condition") || "",
  type: Cookies.get("type") || "",
  warranty: "",
  mileage: "",
  mileageUnit: Cookies.get("mileageUnit") || "",
  availability: Cookies.get("availability") || "",
  price: "",
  inform: "",
  currency: Cookies.get("currency") || "",
});

const Item: React.FC<ItemProps> = ({
  id,
  name,
  user,
  city,
  tyme,
  phone,
  contact,
  story,
  mark,
  modelId,
  years,
  engineSize,
  fuelID,
  bodyTypeID,
  axleID,
  partGroup,
  partType,
  partCondition,
  partNumber,
  photo,
  vin,
  partDescription,
 }) => {
  const [open, setOpen] = useState(false); // Состояние для открытия модального окна
  const [showMessage, setShowMessage] = useState(false); // Состояние для отображения сообщения
  const [formValues, setFormValues] = useState<FormValues>({
    condition: Cookies.get('condition') || '',
    type: Cookies.get('type') || '',
    warranty: '',
    mileage: '',
    mileageUnit: Cookies.get('mileageUnit') || '',
    availability: Cookies.get('availability') || '',
    price: '',
    inform: '',
    currency: Cookies.get('currency') || '',
  });
  
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (field: keyof FormValues, value: string) => {
    if (["condition", "type", "mileageUnit", "availability", "currency"].includes(field)) {
      Cookies.set(field, value);
    }
    setFormValues((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  useEffect(() => {
    const globalStyles = `
      @keyframes fadeOut {
        0% {
          opacity: 1;
        }
        100% {
          opacity: 0;
        }
      }
    `;
    setFormValues({
      condition: Cookies.get('condition') || '',
      type: Cookies.get('type') || '',
      warranty: '',
      mileage: '',
      mileageUnit: Cookies.get('mileageUnit') || '',
      availability: Cookies.get('availability') || '',
      price: '',
      inform: '',
      currency: Cookies.get('currency') || '',
    });
    const styleSheet = document.styleSheets[0];
    styleSheet.insertRule(globalStyles, styleSheet.cssRules.length);
  }, []);

  const handleClickOpen = () => {
    setOpen(true); // Открываем модальное окно
  };

  const handleClose = () => {
    setOpen(false); // Закрываем модальное окно
  };
  
  const handleNext = () => {
    handleCopy();
    setIsSubmitted(true);
  };
  const handleCopy = () => {
    const informText = formValues.inform ? `Додаткова інформація: ${formValues.inform}\n` : '';
    const textToCopy = `
    Вітаю! Ви шукаєте ${name}, ось наша пропозиція!\n 
    Стан: ${formValues.condition}\n
    Тип: ${formValues.type}\n
    Гарантія (днів): ${formValues.warranty}\n
    Пробіг: ${formValues.mileage}\n
    Наявність: ${formValues.availability}\n
    Ціна: ${formValues.price}${formValues.currency}\n
    ${informText}`; // Текст, который нужно скопировать
    navigator.clipboard.writeText(textToCopy) // Копируем в буфер обмена
      .then(() => {
        setShowMessage(true); // Показываем сообщение
        setTimeout(() => setShowMessage(false), 3000); // Прячем сообщение через 3 секунды
      })
      .catch((err) => {
        console.error('Ошибка при копировании: ', err);
      });
  };

  return (
    <>
      <TableRow>

        <TableCell>{mark} <br /> {modelId} <br /> {years}</TableCell>
        <TableCell>{engineSize} <br/> {}</TableCell>
        <TableCell>{timeAgo(tyme)}</TableCell>
        { !story &&
        <TableCell>
          <Button variant="contained" color="primary" onClick={handleClickOpen}>Зв'язатися</Button>
        </TableCell>
        }
      </TableRow>

      {/* Модальное окно */}
      <Dialog open={open} onClose={handleClose}>
      {showMessage && (
        <div style={styles.toast}>
          Текст скопирован в буфер обмена
        </div>
      )}
  <DialogTitle>Детали объявления</DialogTitle>
  <DialogContent>
  {!isSubmitted ? (
    <>
  <FormControl fullWidth margin="normal">
          <InputLabel>Стан</InputLabel>
          <Select
            value={formValues.condition}
            onChange={(e) => handleChange('condition', e.target.value)}
          >
            <MenuItem value="нова">Нова</MenuItem>
            <MenuItem value="бу">БУ</MenuItem>
          </Select>
        </FormControl>

        <FormControl fullWidth margin="normal" variant="outlined">
  <InputLabel id="type-label">Тип</InputLabel>
  <Select
    labelId="type-label"
    value={formValues.type}
    onChange={(e) => handleChange('type', e.target.value)}
    label="Тип"
  >
    <MenuItem value="оригінальна">Оригінальна</MenuItem>
    <MenuItem value="замінник">Замінник</MenuItem>
  </Select>
</FormControl>

        <TextField
          fullWidth
          label="Гарантія (днів)"
          type="number"
          margin="normal"
          value={formValues.warranty}
          onChange={(e) => handleChange('warranty', e.target.value)}
        />

        <TextField
          fullWidth
          label="Пробіг"
          type="number"
          margin="normal"
          value={formValues.mileage}
          onChange={(e) => handleChange('mileage', e.target.value)}
        />

        <FormControl fullWidth margin="normal">
          <InputLabel>Одиниця пробігу</InputLabel>
          <Select
            value={formValues.mileageUnit}
            onChange={(e) => handleChange('mileageUnit', e.target.value)}
          >
            <MenuItem value="КМ">КМ</MenuItem>
            <MenuItem value="міль">Міль</MenuItem>
          </Select>
        </FormControl>

        <FormControl fullWidth margin="normal">
          <InputLabel>Наявність</InputLabel>
          <Select
            value={formValues.availability}
            onChange={(e) => handleChange('availability', e.target.value)}
          >
            <MenuItem value="у наявності">В наявності</MenuItem>
            <MenuItem value="під замовлення">Під замовлення</MenuItem>
          </Select>
        </FormControl>

        <TextField
          fullWidth
          label="Ціна"
          type="number"
          margin="normal"
          value={formValues.price}
          onChange={(e) => handleChange('price', e.target.value)}
        />

        <FormControl fullWidth margin="normal">
          <InputLabel>Валюта</InputLabel>
          <Select
            value={formValues.currency}
            onChange={(e) => handleChange('currency', e.target.value)}
          >
            <MenuItem value="₴">Грн</MenuItem>
            <MenuItem value="$">Дол</MenuItem>
            <MenuItem value="€">Євро</MenuItem>
          </Select>
        </FormControl>
        <TextField
          fullWidth
          label="Додаткова інформація"
          type="string"
          margin="normal"
          value={formValues.inform}
          onChange={(e) => handleChange('inform', e.target.value)}
        />
        <Box>
        <Button onClick={handleNext} color="primary">Відправити</Button>
        </Box>
        </> 
        ) : (
          <>
          <Typography>Ваша пропозиція була відправлена на емайл Покупцю та текст пропозиції був скопійований в буфер обміну і ви можете звязатися з клієнтом прямо зараз в месенджерах по кнопках нижче та вставити свою пропозицію в чат для відправки.</Typography>
          <Typography variant="body1">Місто: {city}</Typography>
          <Typography variant="body1">Опубликовано: {timeAgo(tyme)}</Typography>
          
          {/* Контакты */}
          <Typography variant="body1">Контакты: <Link  href={`tel:${phone}`}>{phone}</Link></Typography>
          { !contact.onlySms &&
          <Box display="flex" gap={2} mt={2}>
                {contact.viber && (
                  <a href={`viber://chat?number=${phone}`} target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center' }}>
                    <ViberColor /> Viber
                  </a>
                )}
                {contact.telegram && (
                  <a href={`https://t.me/${phone}`} target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center' }}>
                    <Telegram /> Telegram
                  </a>
                )}
                {contact.whatsapp && (
                  <a href={`https://wa.me/${phone}`} target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center' }}>
                    <WhatsApp /> WhatsApp
                  </a>
                )}
                
              </Box>
          }
          
          </>
        )}
  </DialogContent>
  <DialogActions>
    <Button onClick={handleClose} color="primary">Закрыть</Button>
  </DialogActions>
</Dialog>
    </>
  )
};
const styles = {
    toast: {
        position: 'fixed' as 'fixed',
      bottom: '20px',
      left: '50%',
      transform: 'translateX(-50%)',
      padding: '10px 20px',
      backgroundColor: '#4caf50',
      color: 'white',
      borderRadius: '5px',
      border: '1px solid #388e3c',
      opacity: 1,
      animation: 'fadeOut 3s forwards',
    },
  };

 
export default Item;
