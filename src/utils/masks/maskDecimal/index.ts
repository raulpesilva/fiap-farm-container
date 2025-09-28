export const maskDecimal = (value: string) => {
  if (!value) return '';

  const onlyNumbers = value.replace(/\D/g, '');
  if (!onlyNumbers) return '';

  return String(Number(onlyNumbers));
};
