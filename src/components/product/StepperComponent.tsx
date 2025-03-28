"use client";
import React, { useState , useRef } from 'react';
import { Box, Button, Step, StepLabel, Stepper, StepIconProps } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import StepOne , {StepOneRef} from './StepOne';
import StepTwo , {StepTwoRef} from './StepTwo';
import StepThree , {StepThreeRef} from './StepThree';
import {request } from '@request/request'
import { createTheme, ThemeProvider } from '@mui/material/styles';

const steps = ['Шаг 1', 'Шаг 2', 'Шаг 3'];

type Part = {
  partName: string;
  partGroup: string;
  partSide: string;
  partType: string;
  partCondition: string;
  partNumber: string;
  partPhotos: (File  | null)[];
  partDescription: string;
  partPrice: string;
};

// Определяем тип для carData
type CarData = {
  modelId: string;
  carType: string;
  mark: string;
  makeRegionId: string;
  subModel: string;
  isSubModelVisible: boolean;
  years: string;
  fuelID: string;
  engineSize: string;
  bodyTypeID: string;
  transID: string;
  axleID: string;
  colorName: string;
  colorMetallic: boolean;
  vin: string;
};

// Определяем тип для contactInfo
type ContactInfo = {
  phone: string;
  additionalPhone: string;
  email: string;
  fullName: string;
  cityName: string;
  comments: string;
  messageTypes: {
    viber: boolean;
    telegram: boolean;
    whatsapp: boolean;
    onlySms: boolean;
  };
};

type SpareData = {
  parts: Part[];
} & CarData & ContactInfo;

//Кастомные стили 
const theme = createTheme({
  palette: {
    primary: {
      main: "#8fad1c",
    },
    secondary: {
      main: "#ff4081",
    },
  },
  components: {
    MuiTextField: {
      defaultProps: {
        size: "small",
      },
      styleOverrides: {
        root: {
          "& .MuiInputBase-root": {
            height: "40px",
            fontSize: "0.875rem",
            padding: "4px 0px",
          },
        },
      },
    },
    MuiSelect: {
      defaultProps: {
        size: "small",
      },
      styleOverrides: {
        root: {
          height: "40px",
          fontSize: "0.875rem",
        },
      },
    },
    MuiGrid: {
      styleOverrides: {
        item: {
          paddingTop: "10px", // Уменьшает верхний отступ для Grid item
        },
      },
    },
    MuiFormControl: {
      styleOverrides: {
        root: {
          minHeight: "40px",
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          fontSize: "0.875rem",
          transform: "translate(14px, 9px) scale(1)", // Выравниваем по центру
        },
        shrink: {
          transform: "translate(14px, -8px) scale(0.75)", // Сдвигаем вверх при фокусе
        },
      },
    },
    MuiCheckbox: {
      styleOverrides: {
        root: {
          paddingTop: "4px", // Уменьшен паддинг сверху
        },
      },
    },
   
  },
});


// Кастомный компонент для иконки шага
function StepIcon(props: StepIconProps) {
  const { active, completed, className } = props;


  return completed ? (
    <CheckCircleIcon className={className} sx={{ color: 'green' }} />
  ) : (
    <RadioButtonUncheckedIcon
      className={className}
      sx={{ color: active ? 'green' : 'gray' }} />
  );
}
const StepperComponent = () => {
  const [parts, setParts] = useState<Part[]>([
    {
      partName: '',
      partGroup: '',
      partSide: '',
      partType: '0',
      partCondition: '0',
      partNumber: '',
      partPhotos: [null],
      partDescription: '',
      partPrice: '',
    },
  ]);
  const stepOneRef = useRef<StepOneRef>(null);
  const StepTwoRef = useRef<StepTwoRef>(null);
  const StepThreeRef = useRef<StepThreeRef>(null);
  const [carData, setCarData] = useState<CarData>({
    modelId: '',
    carType: '',
    mark: '',
    makeRegionId: '1',
    subModel: '',
    isSubModelVisible: false,
    years: '',
    fuelID: '',
    engineSize: '',
    bodyTypeID: '',
    transID: '',
    axleID: '',
    colorName: '',
    colorMetallic: false,
    vin: '',
  });

  const [contactInfo, setContactInfo] = useState<ContactInfo>({
    phone: '',
    additionalPhone: '',
    fullName: '',
    cityName: '',
    email: '',
    comments: '',
    messageTypes: {
      viber: false,
      telegram: false,
      whatsapp: false,
      onlySms: false,
    },
  });
  const createSpare = async (spareData: SpareData , files: File[]): Promise<void> => {
    console.log('Data:' , files );
    const formData = new FormData();

    files.forEach((file) => {
      formData.append('files', file); // Добавляем файлы
    });
  
    try {
      const response = await request('post', '/spares/create' , spareData);
      if (formData.has('files') && formData.getAll('files').length > 0) {
      await request('post', '/spares/image', formData);
      }  
      console.log('Запчасть создана:', response.data);
      window.location.href = '/success'
    } catch (error) {
      console.error('Ошибка при создании фильтра:', error);
    }
  };
  const handleSubmit = () => {
    const files: File[] = parts.flatMap((part) => part.partPhotos || []).filter((file): file is File => file !== null);
  
    const formData = {
      parts,
      ...carData,
      ...contactInfo
    };
  
    if (StepThreeRef.current)
      {
        const result = StepThreeRef.current.validate();
        if(result) {
          createSpare(formData, files);
        }
      }
    };
  const [activeStep, setActiveStep] = useState(0);
  const [validateStepOne, setValidateStepOne] = useState<() => boolean>(() => () => true);  
  const handleNext = () => {
    
    if (activeStep === 0 && stepOneRef.current) {
      const result = stepOneRef.current.validate();
      if(result) {
        setActiveStep((prev) => prev + 1);
      }
    }
    if (activeStep == 1 && StepTwoRef.current)
    {
      const result = StepTwoRef.current.validate();
      if(result) {
        setActiveStep((prev) => prev + 1);
      }
    }
    setActiveStep((prev) => prev + 1);

    //if (activeStep < steps.length - 1) setActiveStep((prev) => prev + 1);
  };

  const handleBack = () => {
    if (activeStep > 0) setActiveStep((prev) => prev - 1);
  };

  return (
   <ThemeProvider theme={theme}>
    <Box
      sx={{
        width: { xs: '100%', md: '80%' },
        margin: 'auto',
        padding: 2,
        backgroundColor: '#fff',
        border: '1px solid #c8c8c8',
        boxShadow: '0px 0 1px 1px #ededed',
        borderRadius: '4px',
      }}
    >
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label, index) => (
          <Step key={label} completed={activeStep > index}>
            <StepLabel StepIconComponent={StepIcon}>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <Box sx={{ mt: 4 }}>
      <Box>
    <Box
      sx={{ display: activeStep === 0 ? 'block' : 'none' }}
    >
      <StepOne ref={stepOneRef} parts={parts} setParts={setParts} setIsValid={(fn) => setValidateStepOne(() => fn)}/>
    </Box>
    <Box
      sx={{ display: activeStep === 1 ? 'block' : 'none' }}
    >
      <StepTwo ref={StepTwoRef} carData={carData} setCarData={setCarData} />
    </Box>
    <Box
      sx={{ display: activeStep === 2 ? 'block' : 'none' }}
    >
      <StepThree ref={StepThreeRef} contactInfo={contactInfo} setContactInfo={setContactInfo}/>
    </Box>
  </Box>
        {/*<StepContent 
        step={activeStep}
        parts={parts}
        validateStep={setValidateStepOne}
        setParts={setParts}
        carData={carData}
        setCarData={setCarData}
        contactInfo={contactInfo}
        setContactInfo={setContactInfo}
        />*/}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
          <Button
            variant="outlined"
            onClick={handleBack}
            disabled={activeStep === 0}
          >
            Назад
          </Button>
          {activeStep < 2 ? (
  <Button
    variant="contained"
    onClick={handleNext}
    disabled={activeStep === steps.length - 1}
  >
    Далее
  </Button>
) : (
  <Button
    variant="contained"
    onClick={handleSubmit} // Замените handleSubmit на вашу функцию обработки
  >
    Отправить запрос
  </Button>
)}

        </Box>
      </Box>
    </Box>

    </ThemeProvider>
  );
};


export default StepperComponent;
