import React, { useState } from 'react';
import { TextField, Box, Button, Typography, InputAdornment } from '@mui/material';
import HeightIcon from '@mui/icons-material/Height';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';

const IMTInputs: React.FC = () => {
  const [height, setHeight] = useState<string>('170'); // Значение по умолчанию для роста
  const [weight, setWeight] = useState<string>('70'); // Значение по умолчанию для веса
  const [bmi, setBmi] = useState<number | null>(null);
  const [interpretation, setInterpretation] = useState<string>('');

  const handleHeightChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setHeight(event.target.value);
  };

  const handleWeightChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setWeight(event.target.value);
  };

  const calculateBMI = () => {
    const heightInMeters = parseFloat(height) / 100;
    const weightInKg = parseFloat(weight);

    if (heightInMeters > 0 && weightInKg > 0) {
      const bmiValue = weightInKg / (heightInMeters * heightInMeters);
      setBmi(parseFloat(bmiValue.toFixed(2)));

      // Интерпретация результата
      if (bmiValue < 16) {
        setInterpretation("Выраженный дефицит массы тела");
      } else if (bmiValue < 17) {
        setInterpretation("Умеренный дефицит массы тела");
      } else if (bmiValue < 18.5) {
        setInterpretation("Незначительный дефицит массы тела");
      } else if (bmiValue < 25) {
        setInterpretation("Норма");
      } else if (bmiValue < 30) {
        setInterpretation("Избыточная масса тела");
      } else if (bmiValue < 35) {
        setInterpretation("Ожирение I степени");
      } else if (bmiValue < 40) {
        setInterpretation("Ожирение II степени");
      } else {
        setInterpretation("Ожирение III степени (морбидное)");
      }
    } else {
      setBmi(null);
      setInterpretation('');
    }
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
      <TextField
        label="Рост (см)"
        variant="outlined"
        value={height}
        onChange={handleHeightChange}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <HeightIcon />
            </InputAdornment>
          ),
        }}
        InputLabelProps={{ style: { color: '#ffffff' } }}
        sx={{ '& .MuiInputBase-input': { color: '#ffffff' } }}
      />
      <TextField
        label="Вес (кг)"
        variant="outlined"
        value={weight}
        onChange={handleWeightChange}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <FitnessCenterIcon />
            </InputAdornment>
          ),
        }}
        InputLabelProps={{ style: { color: '#ffffff' } }}
        sx={{ '& .MuiInputBase-input': { color: '#ffffff' } }}
      />
      <Button variant="contained" color="primary" onClick={calculateBMI}>
        Рассчитать ИМТ
      </Button>
      {bmi !== null && (
        <Typography variant="h6" sx={{ color: '#ffffff' }}>
          Ваш ИМТ: {bmi} ({interpretation})
        </Typography>
      )}
    </Box>
  );
};

export default IMTInputs;
