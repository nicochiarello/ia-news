export const normalizeString = (str: string) => {
  // Normalizamos la cadena y eliminamos los caracteres diacríticos
  const cleanedString = str.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

  return cleanedString;
};
