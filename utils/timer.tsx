'use client'

import { useEffect, useState } from 'react';
import { Typography } from '@material-tailwind/react';

function padTo2Digits(num: number) {
  return num.toString().padStart(2, '0');
}

function formatDate(date: Date) {
  return (
    [
      date.getFullYear(),
      padTo2Digits(date.getMonth() + 1),
      padTo2Digits(date.getDate()),
    ].join('-') +
    ' ' +
    [
      padTo2Digits(date.getHours()),
      padTo2Digits(date.getMinutes()),
      padTo2Digits(date.getSeconds()),
    ].join(':')
  );
}

const Timer = () => {
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    const countDate = setInterval(() => {
      setDate(new Date())
    }, 1000);
    return () => clearInterval(countDate);
  }, []);

  return <Typography color="indigo">{formatDate(date)}</Typography>;
}

export default Timer;
