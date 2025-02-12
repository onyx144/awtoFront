"use client";
import React, { useState } from 'react';
import { Box, Button, Step, StepLabel, Stepper, Typography, StepIconProps } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import StepOne from './StepOne';
import StepTwo from './StepTwo';
import StepThree from './StepThree';
import {request , saveToken} from '@request/request'

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

// Кастомный компонент для иконки шага
const StepIcon = (props: StepIconProps) => {
  const { active, completed, className } = props;
  

  return completed ? (
    <CheckCircleIcon className={className} sx={{ color: 'green' }} />
  ) : (
    <RadioButtonUncheckedIcon
      className={className}
      sx={{ color: active ? 'green' : 'gray' }}
    />
  );
};

const StepContent = ({
  step,
  parts,
  setParts,
  carData,
  setCarData,
  contactInfo,
  setContactInfo,
}: {
  step: number;
  parts: Part[];
  setParts: React.Dispatch<React.SetStateAction<Part[]>>;
  carData: CarData;
  setCarData: React.Dispatch<React.SetStateAction<CarData>>;
  contactInfo: ContactInfo;
  setContactInfo: React.Dispatch<React.SetStateAction<ContactInfo>>;
}) => {
  

   return (
  <Box>
    <Box
      sx={{ display: step === 0 ? 'block' : 'none' }}
    >
      <StepOne parts={parts} setParts={setParts}/>
    </Box>
    <Box
      sx={{ display: step === 1 ? 'block' : 'none' }}
    >
      <StepTwo carData={carData} setCarData={setCarData} />
    </Box>
    <Box
      sx={{ display: step === 2 ? 'block' : 'none' }}
    >
      <StepThree contactInfo={contactInfo} setContactInfo={setContactInfo}/>
    </Box>
  </Box>
   );
  };


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

  const [carData, setCarData] = useState<CarData>({
    modelId: '',
    carType: '',
    makeId: '',
    makeRegionId: '1',
    subModel: '',
    isSubModelVisible: false,
    year: '',
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
  const createSpare = async (spareData: SpareData): Promise<void> => {
    try {
      const response = await request('post', '/spares/create', spareData);
      console.log('Запчасть создана:', response.data);
    } catch (error) {
      console.error('Ошибка при создании фильтра:', error);
    }
  };
  const handleSubmit = () => {
    const formData = {
      parts,
      ...carData,
      ...contactInfo
    };
    createSpare(formData);
    console.log("Отправленные данные:", JSON.stringify(formData, null, 2));
  };
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    if (activeStep < steps.length - 1) setActiveStep((prev) => prev + 1);
  };

  const handleBack = () => {
    if (activeStep > 0) setActiveStep((prev) => prev - 1);
  };

  return (
    <Box
      sx={{
        width: { xs: '100%', md: '50%' },
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
        <StepContent 
        step={activeStep}
        parts={parts}
        setParts={setParts}
        carData={carData}
        setCarData={setCarData}
        contactInfo={contactInfo}
        setContactInfo={setContactInfo}
        />
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
  );
};


export default StepperComponent;
