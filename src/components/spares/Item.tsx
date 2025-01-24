import { Box, Button, Typography, TableRow, TableCell, Dialog, DialogActions, DialogContent, DialogTitle, IconButton } from '@mui/material';
import React, { useState , useEffect } from 'react';
import { CopyAll } from '@mui/icons-material'; // иконка для копирования в буфер
import { WhatsApp, Telegram, Vibration } from "@mui/icons-material";
import ViberColor from '@/svg/vibericon';
import Link from 'next/link';
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

interface ItemProps {
  id?: string;
  name: string;
  user?: string;
  city: string;
  tyme: string;
  phone: string;
  contact: ('viber' | 'telegram' | 'whatsapp' | 'phone')[];
  story?: boolean;
}

const Item: React.FC<ItemProps> = ({ id, name, user, city, tyme, phone, contact , story }) => {
  const [open, setOpen] = useState(false); // Состояние для открытия модального окна
  const [showMessage, setShowMessage] = useState(false); // Состояние для отображения сообщения

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

    const styleSheet = document.styleSheets[0];
    styleSheet.insertRule(globalStyles, styleSheet.cssRules.length);
  }, []);

  const handleClickOpen = () => {
    setOpen(true); // Открываем модальное окно
  };

  const handleClose = () => {
    setOpen(false); // Закрываем модальное окно
  };

  const handleCopy = () => {
    const textToCopy = `Lorem ipsum ${user}, lorem ipsum ${name}`; // Текст, который нужно скопировать
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

        <TableCell>{name}</TableCell>
        <TableCell>{city}</TableCell>
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
    <Typography variant="h6">{name}</Typography>
    <Typography variant="body1">Город: {city}</Typography>
    <Typography variant="body1">Опубликовано: {timeAgo(tyme)}</Typography>
    
    {/* Контакты */}
    <Typography variant="body1">Контакты: <Link  href={`tel:${phone}`}>{phone}</Link></Typography>
    { !contact.includes('phone') &&
    <Box display="flex" gap={2} mt={2}>
          {contact.includes('viber') && (
            <a href={`viber://chat?number=${phone}`} target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center' }}>
              <ViberColor /> Viber
            </a>
          )}
          {contact.includes('telegram') && (
            <a href={`https://t.me/${phone}`} target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center' }}>
              <Telegram /> Telegram
            </a>
          )}
          {contact.includes('whatsapp') && (
            <a href={`https://wa.me/${phone}`} target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center' }}>
              <WhatsApp /> WhatsApp
            </a>
          )}
          
        </Box>
    }
    {/* Советуем начать общение */}
    <Box mt={2}>
      <Typography variant="body1">
        Советуем начать общение с:
        <span 
          style={{ fontWeight: 'bold', cursor: 'pointer', color: 'blue' }} 
          onClick={handleCopy}
        >
          Lorem ipsum {user}, lorem ipsum {name}
        </span>
      </Typography>
    </Box>
  </DialogContent>
  <DialogActions>
    <Button onClick={handleClose} color="primary">Закрыть</Button>
  </DialogActions>
</Dialog>
    </>
  );
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
