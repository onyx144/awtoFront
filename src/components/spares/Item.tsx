import { Box, Button, Typography, 
  MenuItem,
  Select,
  FormControl,
  InputLabel,TableRow, TableHead , TableBody , Table , FormHelperText,
  TextField,
  List,
  ListItem,
  ListItemText,
   TableCell, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import React, { useState , useEffect } from 'react';
import WhatsAppIcon from '@/svg/WhatsAppIcon';
import ViberIcon from '@/svg/vibericon';
import Link from 'next/link';
import Cookies from 'js-cookie';
import { getRole } from '@/request/request';
import { request } from '@/request/request';
import TelegramLogo from '@/svg/TelegramIcon';
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
  time: string;
  phone: string;
  storyArchive?: Story[]; 
  contact?: {
    viber: boolean;
    telegram: boolean;
    whatsapp: boolean;
    onlySms: boolean;
  };
  email?: string;
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
  archive?: boolean;
  vin?: string;
  partDescription?: string;
}

interface Story {
  condition?: string;
type?: string;
warranty?: number;
mileage?: number;
mileageUnit?: string;
availability?: string;
price?: number;
currency?: string;
inform?: string;
salesmanId: string;
}
/*const getInitialValues = (): FormValues => ({
  condition: Cookies.get("condition") || "",
  type: Cookies.get("type") || "",
  warranty: "",
  mileage: "",
  mileageUnit: Cookies.get("mileageUnit") || "",
  availability: Cookies.get("availability") || "",
  price: "",
  inform: "",
  currency: Cookies.get("currency") || "",
});*/

const Item: React.FC<ItemProps> = ({
  id,
  name,
  city,
  time,
  email,
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
  partCondition,
  partNumber,
  photo,
  vin,
  storyArchive,
  partDescription,
  archive,
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
  const [archiveState , setArchiveState] = useState(archive);
  const [errors, setErrors] = useState<Record<string, boolean>>({});
  const [contactData , setContactData] = useState<string[]>();
  const [showContact , setShowContact] = useState(false);

  const salesman_contact = async(id: string) => {
    try {
      const response = await request('get' , `/users/contact/${id}`);
      if (response.status === 200) {
        setContactData(response.data);
        setShowContact(true)
      }
    } catch (error: unknown) {
      // Проверяем, есть ли у ошибки response и message
      if (error instanceof Error && (error as any).response?.status == '401') {
        alert('Будь ласка, зареєструйтесь для перегляду контактів.');
      } else {
        alert('Сталася помилка при оновленні користувача. Спробуйте ще раз.' );
      }
  
    }
  }
  const handleChange = (field: keyof FormValues, value: string) => {
    if (errors[field] && value !== "") {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [field]: false,
      }));
    }
    if (["condition", "type", "mileageUnit", "availability", "currency"].includes(field)) {
      Cookies.set(field, value);
    }
    setFormValues((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  useEffect(() => {
    console.log('id' , id);
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
  
  const toggleArchive = async (id: string, currentArchive: boolean) => {
    try {
      const response = await request('put' , `/spares/${id}/toggle-archive`);
      if (response.status === 200) {
        setArchiveState(!currentArchive);
      }
    } catch (error) {
      console.error("Ошибка при изменении статуса архива:", error);
    }
  };

  const handleNext = () => {
    const newErrors = {
      condition: !formValues.condition,
      type: !formValues.type,
      warranty: !formValues.warranty,
      price: !formValues.price,
      currency: !formValues.currency,
    };
  
    setErrors(newErrors);
  
    // Если есть ошибки, не отправляем форму
    if (Object.values(newErrors).includes(true)) {
      return;
    }
    handleCopy();
    storySend();
    setIsSubmitted(true);
  };
  const handleCopy = async () => {
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
      try {
        const response = await request('post', '/spares/send', { 
          email: email, 
          text: textToCopy 
        });
    
        console.log('Успешный ответ:', response.data);
      } catch (error) {
        console.error('Ошибка при выполнении запроса:', error);
      }
  };
const storySend = async () => {
  try {
    const response = await request('put', `/spares/${id}/add-story`, { 
      salesmanStoryDto: formValues,
    });

    console.log('Успешный ответ:', response.data);
  } catch (error:unknown) {
    console.error('Ошибка при выполнении запроса:', error);
    if (error instanceof Error && (error as any).response?.data?.message) {
      alert((error as any).response.data.message);
    } else {
      alert('Помилка');
    }
  }
  };

  return (
    <>
      <TableRow sx={{ '& td, & th': { textAlign: 'center', verticalAlign: 'middle' } }}>

        <TableCell>{mark} <br /> {modelId} <br /> {years}</TableCell>
        <TableCell>{engineSize} <br/> {fuelID} <br/> {bodyTypeID} <br/>{axleID}</TableCell>
        <TableCell>{partGroup} <br/> {bodyTypeID} <br/> {partCondition} </TableCell>
        <TableCell>{name}</TableCell>
        <TableCell>{partNumber}</TableCell>
        <TableCell> {photo ? (
    <a href={photo} target="_blank" rel="noopener noreferrer">
      <img src={photo} alt="Фото" width={50} height={50} style={{ borderRadius: '5px' }} />
    </a>
  ) : (
    ""
  )}</TableCell>
        <TableCell>{vin}</TableCell>
        <TableCell>{partDescription}</TableCell>
        { (!story && getRole()=="salesman") &&
        <TableCell>
          <Button variant="contained" color="primary" onClick={handleClickOpen}>Звя&apos;затися</Button>
        </TableCell>
        }
        {archiveState !== undefined && archiveState !== null && id !== undefined && (
  <TableCell>
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <Typography
        sx={{
          backgroundColor: !archiveState ? "#d1f5d1" : "#f5d1d1", // Светло-зеленый для активного, светло-красный для неактивного
          color: !archiveState ? "#2e7d32" : "#c62828", // Темно-зеленый и темно-красный текст
          padding: "8px 16px",
          borderRadius: "4px",
          display: "inline-block",
          fontWeight: "bold",
        }}
      >
        {!archiveState ? "Активна" : "Неактивна"}
      </Typography>
      <Button onClick={() => toggleArchive(id, archiveState)} sx={{ textTransform: "none" }}>
        {!archiveState ? "Додати в архів" : "Активувати"}
      </Button>
    </Box>
  </TableCell>
)}
      </TableRow>
      {storyArchive && storyArchive.length > 0 && (
  <TableRow>
    <TableCell colSpan={8}>
      <Table sx={{ width: "100%", backgroundColor: "#f9f9f9" }}>
        <TableHead>
          <TableRow>
            <TableCell>Стан</TableCell>
            <TableCell>Тип</TableCell>
            <TableCell>Гарантія</TableCell>
            <TableCell>Пробіг</TableCell>
            <TableCell>Ціна</TableCell>
            <TableCell>Валюта</TableCell>
            <TableCell>Інформація</TableCell>
            <TableCell>Продавець</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {storyArchive.map((story, index) => (
            <TableRow key={index}>
              <TableCell>{story.condition || "-"}</TableCell>
              <TableCell>{story.type || "-"}</TableCell>
              <TableCell>{story.warranty ? `${story.warranty} міс.` : "-"}</TableCell>
              <TableCell>{story.mileage ? `${story.mileage} ${story.mileageUnit || ''}` : "-"}</TableCell>
              <TableCell>{story.price ? `${story.price}` : "-"}</TableCell>
              <TableCell>{story.currency || "-"}</TableCell>
              <TableCell>{story.inform || "-"}</TableCell>
              <TableCell><Button onClick={() => salesman_contact(story.salesmanId)}>
               Зв'язатися  
              </Button></TableCell>

            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableCell>
  </TableRow>
)}

<>
      {/* Условие для открытия модального окна */}
      {contactData && contactData.length > 0 && showContact && (
        <Dialog open={showContact} onClose={() => setShowContact(false)} maxWidth="sm" fullWidth>
          <DialogTitle>Номери телефонів для зв'язку з продавцем</DialogTitle>
          <DialogContent>
            {/* Список номеров телефонов */}
            <List>
              {contactData.map((contact, index) => (
                <ListItem key={index}>
                  <ListItemText primary={contact} />
                </ListItem>
              ))}
            </List>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setShowContact(false)} color="primary">
              Закрити
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </>

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
  <FormControl fullWidth margin="normal" required>
  <InputLabel>Стан</InputLabel>
  <Select
    value={formValues.condition}
    onChange={(e) => handleChange('condition', e.target.value)}
    error={!formValues.condition}
  >
    <MenuItem value="нова">Нова</MenuItem>
    <MenuItem value="бу">БУ</MenuItem>
  </Select>
  {!errors.condition && <FormHelperText>Це поле обов'язкове для заповнення</FormHelperText>}
</FormControl>

        <FormControl fullWidth margin="normal" variant="outlined" required>
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
  {!errors.type && <FormHelperText>Це поле обов'язкове для заповнення</FormHelperText>}

</FormControl>

        <TextField
          fullWidth
          label="Гарантія (днів)*"
          type="number"
          margin="normal"
          value={formValues.warranty}
          onChange={(e) => handleChange('warranty', e.target.value)}
          error={!!errors.warranty} // Ошибка показывается, если есть в errors
          helperText={errors.warranty ? "Це поле обов'язкове для заповнення" : ""}
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
  required
  error={!!errors.price}
  helperText={errors.price ? 'Це поле обов\'язкове для заповнення' : ''}
/>

        <FormControl fullWidth margin="normal" required>
          <InputLabel>Валюта</InputLabel>
          <Select
            value={formValues.currency}
            onChange={(e) => handleChange('currency', e.target.value)}
          >
            <MenuItem value="₴">Грн</MenuItem>
            <MenuItem value="$">Дол</MenuItem>
            <MenuItem value="€">Євро</MenuItem>
          </Select>
          {!errors.condition && <FormHelperText>Це поле обов'язкове для заповнення</FormHelperText>}
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
          <Typography variant="body1">Опубликовано: {timeAgo(time)}</Typography>
          
          {/* Контакты */}
          <Typography variant="body1">Контакты: <Link  href={`tel:${phone}`}>{phone}</Link></Typography>
          { contact && !contact.onlySms &&
          <Box display="flex" gap={2} mt={2}>
                {contact.viber && (
                  <a href={`viber://chat?number=${phone}`} target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center' }}>
                    <ViberIcon /> 
                  </a>
                )}
                {contact.telegram && (
                  <a href={`https://t.me/${phone}`} target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center' }}>
                    <TelegramLogo /> 
                  </a>
                )}
                {contact.whatsapp && (
                  <a href={`https://wa.me/${phone}`} target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center' }}>
                    <WhatsAppIcon /> 
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
      position: 'fixed' as const,
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
