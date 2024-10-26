import React, { useState, useEffect } from 'react';
import { LocalizationProvider, DatePicker, MobileDatePicker } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import moment from 'moment';
import 'moment/locale/ru';
// import 'moment/locale/en-gb';
import 'moment-precise-range-plugin';
import { IconButton, InputAdornment, TextField } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';

declare module 'moment' {
  function preciseDiff(start: string | Date | moment.Moment, end: string | Date | moment.Moment, convertToObject?: boolean): any;
}

const TimeDifferenceCalculator: React.FC = () => {
  const [startDate, setStartDate] = useState<moment.Moment | null>(moment(new Date(2024, 0, 1)));
  const [startDatapickerIsOpened, setStartDatapickerIsOpened] = useState<boolean>(false)
  const [endDate, setEndDate] = useState<moment.Moment | null>(moment()); // Дата окончания по умолчанию - текущее время
  const [endDatapickerIsOpened, setEndDatapickerIsOpened] = useState<boolean>(false)
  const [timeDifference, setTimeDifference] = useState<string>('')

  const handleStartDateChange = (date: moment.Moment | null) => {
    setStartDate(date);
    calculateTimeDifference(date, endDate);
  };

  const handleEndDateChange = (date: moment.Moment | null) => {
    setEndDate(date);
    calculateTimeDifference(startDate, date);
  };

  const calculateTimeDifference = (start: moment.Moment | null, end: moment.Moment | null) => {
    if (start && end) {
      const preciseDiff = (moment as any).preciseDiff(start, end, true);
      const formattedDifference = formatDifference(preciseDiff);
      setTimeDifference(formattedDifference);
    } else {
      setTimeDifference('');
    }
  };

  const formatDifference = (diff: any): string => {
    const years = diff.years;
    const months = diff.months;
    const days = diff.days;

    const yearString = years === 1 ? `${years} год` : (years > 1 && years < 5) ? `${years} года` : `${years} лет`;
    const monthString = months === 1 ? `${months} месяц` : (months > 1 && months < 5) ? `${months} месяца` : `${months} месяцев`;
    const dayString = days === 1 ? `${days} день` : (days > 1 && days < 5) ? `${days} дня` : `${days} дней`;

    return `${yearString}, ${monthString} и ${dayString}`;
  };

  useEffect(() => {
    calculateTimeDifference(startDate, endDate);
  }, [])

  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <div style={{ padding: '20px', maxWidth: '400px', margin: '0 auto' }}>
        <MobileDatePicker
          label="Дата начала"
          value={startDate}
          onChange={handleStartDateChange}
          open={startDatapickerIsOpened}
          onClose={() => setStartDatapickerIsOpened(false)}
          closeOnSelect
          disableOpenPicker={false}
          slotProps={{
            actionBar: {
              hidden: true,
              actions: []
            },
            toolbar: {
              hidden: true,
            },
            textField: {
              fullWidth: true,
              sx: {
                input: { color: 'white' },
                label: { color: 'white' },
              },
              InputProps: {
                readOnly: true, // Отключаем ввод с клавиатуры
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton>
                      <EditIcon htmlColor='white' />
                    </IconButton>
                  </InputAdornment>
                ),
              },
            },
            // openPickerButton: {
            //   sx: {
            //     color: 'orange', // Яркий цвет иконки
            //     '&:hover': {
            //       // color: 'red', // Цвет при наведении
            //       backgroundColor: 'rgba(255, 165, 0, 0.3)', // Яркий фон при наведении
            //       boxShadow: '0 0 10px rgba(255, 165, 0, 0.5)', // Добавление эффекта свечения
            //     },
            //   },
            // },
          }}
          slots={{
            textField: (params) => (
              <TextField
                {...params}
                onTouchStart={(e) => {
                  e.preventDefault()
                  setStartDatapickerIsOpened(true)
                }} // Отключаем выделение текста
                onMouseDown={(e) => {
                  e.preventDefault()
                  setStartDatapickerIsOpened(true)
                }} // Отключаем выделение текста
                InputProps={{
                  ...params.InputProps,
                  readOnly: true, // Отключаем ввод с клавиатуры
                }}
              />
            ),
          }}
        />
        <br />
        <hr />
        <MobileDatePicker
          label="Дата окончания"
          value={endDate}
          onChange={handleEndDateChange}open={endDatapickerIsOpened}
          onClose={() => setEndDatapickerIsOpened(false)}
          closeOnSelect={true}
          disableOpenPicker={false}
          slotProps={{
            actionBar: {
              hidden: true,
              actions: []
            },
            toolbar: {
              hidden: true,
            },
            textField: {
              fullWidth: true,
              sx: {
                input: { color: 'white' },
                label: { color: 'white' },
              },
              InputProps: {
                readOnly: true, // Отключаем ввод с клавиатуры
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton>
                      <EditIcon htmlColor='white' />
                    </IconButton>
                  </InputAdornment>
                ),
              },
            },
            // openPickerButton: {
            //   sx: {
            //     color: 'orange', // Яркий цвет иконки
            //     '&:hover': {
            //       // color: 'red', // Цвет при наведении
            //       backgroundColor: 'rgba(255, 165, 0, 0.3)', // Яркий фон при наведении
            //       boxShadow: '0 0 10px rgba(255, 165, 0, 0.5)', // Добавление эффекта свечения
            //     },
            //   },
            // },
          }}
          slots={{
            textField: (params) => (
              <TextField
                {...params}
                onTouchStart={(e) => {
                  e.preventDefault()
                  setEndDatapickerIsOpened(true)
                }} // Отключаем выделение текста
                onMouseDown={(e) => {
                  e.preventDefault()
                  setEndDatapickerIsOpened(true)
                }} // Отключаем выделение текста
                InputProps={{
                  ...params.InputProps,
                  readOnly: true, // Отключаем ввод с клавиатуры
                }}
              />
            ),
          }}
        />
        {timeDifference && (
          <div style={{ marginTop: '20px', fontSize: '18px' }}>
            <strong>Разница во времени:</strong> {timeDifference}
          </div>
        )}
      </div>
    </LocalizationProvider>
  );
};

export default TimeDifferenceCalculator;
