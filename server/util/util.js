/**
 * Formatea un texto numérico a formato moneda.
 * @param {string} value Texto que contiene el valor numérico a convertir.
 * @param {number} decimalPlaces Cantidad de caracteres decimales a conservar.
 */
export const formatNumber =  (value, decimalPlaces) => {
  let decimals = decimalPlaces || 2;
  let convertedValue = parseFloat(value.replace(".", "").replace(",", "."));
  return !isNaN(convertedValue)
    ? convertedValue.toFixed(decimals)
    : "No cotiza";
};
