"use client";
import React, { useState } from 'react';
import { Box, Button, Step, StepLabel, Stepper, Typography, StepIconProps } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import StepOne from './StepOne';
import StepTwo from './StepTwo';
import StepThree from './StepThree';
const steps = ['Шаг 1', 'Шаг 2', 'Шаг 3'];

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

const StepContent = ({ step }: { step: number }) => (
  <Box>
    <Box
      sx={{ display: step === 0 ? 'block' : 'none' }}
    >
      <StepOne />
    </Box>
    <Box
      sx={{ display: step === 1 ? 'block' : 'none' }}
    >
      <StepTwo />
    </Box>
    <Box
      sx={{ display: step === 2 ? 'block' : 'none' }}
    >
      <StepThree/>
    </Box>
  </Box>
);


const StepperComponent = () => {
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    if (activeStep < steps.length - 1) setActiveStep((prev) => prev + 1);
  };
  const handleSubmit = () => {
    alert('Товар загружен')
  }
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
        <StepContent step={activeStep} />
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
