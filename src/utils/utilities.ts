export const calculateHoursDifference = (
  inHour: string,
  outHour: string,
  lunch: boolean,
) => {
  // 1. Convertir HH:MM a minutos totales desde la medianoche (00:00)
  const timeToMinutes = (timeString: string) => {
    const [hours, minutes] = timeString.split(":").map(Number);
    return hours * 60 + minutes;
  };

  const totalMinutesIn = timeToMinutes(inHour);
  const totalMinutesOut = timeToMinutes(outHour);

  // 2. Calcular la diferencia en minutos
  const differenceInMinutes =
    totalMinutesOut - totalMinutesIn - (lunch ? 30 : 0);

  // 3. Convertir la diferencia de minutos a horas decimales
  const differenceInHours = differenceInMinutes / 60;
  const roundedHours = Math.round(differenceInHours * 100) / 100;
  return roundedHours;
};
