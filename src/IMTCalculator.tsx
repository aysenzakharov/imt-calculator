import React, { useState, useEffect, useCallback } from 'react';
import { Box, Typography, Slider } from '@mui/material';
import HeightIcon from '@mui/icons-material/Height';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';

const IMTInputs: React.FC = () => {
  const [height, setHeight] = useState<number>(170); // Default height in cm
  const [weight, setWeight] = useState<number>(70); // Default weight in kg
  const [bmi, setBmi] = useState<number | null>(null);
  const [interpretation, setInterpretation] = useState<string>('');

  const handleHeightChange = (event: Event, newValue: number | number[]) => {
    setHeight(newValue as number);
  };

  const handleWeightChange = (event: Event, newValue: number | number[]) => {
    setWeight(newValue as number);
  };

  const calculateBMI = useCallback(() => {
    const heightInMeters = height / 100;
    const weightInKg = weight;

    if (heightInMeters > 0 && weightInKg > 0) {
      const bmiValue = weightInKg / (heightInMeters * heightInMeters);
      setBmi(parseFloat(bmiValue.toFixed(2)));
      setInterpretation(getInterpretation(bmiValue));
    } else {
      setBmi(null);
      setInterpretation('');
    }
  }, [height, weight]);

  useEffect(() => {
    calculateBMI();
  }, [height, weight, calculateBMI]); // Recalculate BMI when height or weight changes

  const getInterpretation = (bmiValue: number): string => {
    if (bmiValue < 16) return "Выраженный дефицит массы тела";
    if (bmiValue < 17) return "Умеренный дефицит массы тела";
    if (bmiValue < 18.5) return "Незначительный дефицит массы тела";
    if (bmiValue < 25) return "Норма";
    if (bmiValue < 30) return "Избыточная масса тела";
    if (bmiValue < 35) return "Ожирение I степени";
    if (bmiValue < 40) return "Ожирение II степени";
    return "Ожирение III степени (морбидное)";
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center" gap={1}>
      <Box display="flex" alignItems="center">
        <HeightIcon />
        <Typography variant="h6" sx={{ color: '#ffffff', marginLeft: 1 }}>
          Рост: {height} см
        </Typography>
      </Box>
      <Slider
        value={height}
        min={100}
        max={250}
        step={1}
        onChange={handleHeightChange}
        valueLabelDisplay="auto"
        sx={{ color: '#ffffff', width: 300 }}
      />
      
      <Box display="flex" alignItems="center">
        <FitnessCenterIcon />
        <Typography variant="h6" sx={{ color: '#ffffff', marginLeft: 1 }}>
          Вес: {weight} кг
        </Typography>
      </Box>
      <Slider
        value={weight}
        min={30}
        max={200}
        step={1}
        onChange={handleWeightChange}
        valueLabelDisplay="auto"
        sx={{ color: '#ffffff', width: 300 }}
      />
      
      {bmi !== null && (
        <Typography variant="h6" sx={{ color: '#ffffff' }}>
          Ваш ИМТ: {bmi} ({interpretation})
        </Typography>
      )}
    </Box>
  );
};

export default IMTInputs;
