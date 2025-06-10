// Función para convertir números a palabras en español
// Limitado a números enteros y decimales hasta 999,999,999.99
// No es una solución completa para todos los números, pero cubre el rango común para importes.

const units = ['', 'UN', 'DOS', 'TRES', 'CUATRO', 'CINCO', 'SEIS', 'SIETE', 'OCHO', 'NUEVE'];
const teens = ['DIEZ', 'ONCE', 'DOCE', 'TRECE', 'CATORCE', 'QUINCE', 'DIECISEIS', 'DIECISIETE', 'DIECIOCHO', 'DIECINUEVE'];
const tens = ['', 'DIEZ', 'VEINTE', 'TREINTA', 'CUARENTA', 'CINCUENTA', 'SESENTA', 'SETENTA', 'OCHENTA', 'NOVENTA'];
const hundreds = ['', 'CIENTO', 'DOSCIENTOS', 'TRESCIENTOS', 'CUATROCIENTOS', 'QUINIENTOS', 'SEISCIENTOS', 'SETECIENTOS', 'OCHOCIENTOS', 'NOVECIENTOS'];

function convertLessThanOneThousand(num) {
  if (num === 0) return '';
  if (num < 10) return units[num];
  if (num < 20) return teens[num - 10];
  if (num < 100) {
    const ten = Math.floor(num / 10);
    const unit = num % 10;
    if (unit === 0) return tens[ten];
    if (ten === 2) return 'VEINTI' + units[unit];
    return tens[ten] + ' Y ' + units[unit];
  }
  if (num === 100) return 'CIEN';
  const hundred = Math.floor(num / 100);
  const remainder = num % 100;
  return hundreds[hundred] + ' ' + convertLessThanOneThousand(remainder);
}

export const numberToWords = (n) => {
  if (n === null || n === undefined || isNaN(n)) return '';
  
  const [integerPart, decimalPart] = n.toFixed(2).split('.');
  let num = parseInt(integerPart, 10);
  let words = '';

  if (num === 0) {
    words = 'CERO';
  } else {
    if (num < 1000) {
      words = convertLessThanOneThousand(num);
    } else if (num < 1000000) {
      const thousands = Math.floor(num / 1000);
      const remainder = num % 1000;
      words = convertLessThanOneThousand(thousands) + ' MIL';
      if (remainder > 0) {
        words += ' ' + convertLessThanOneThousand(remainder);
      }
    } else if (num < 1000000000) {
      const millions = Math.floor(num / 1000000);
      const thousands = Math.floor((num % 1000000) / 1000);
      const remainder = num % 1000;

      words = convertLessThanOneThousand(millions) + (millions === 1 ? ' MILLON' : ' MILLONES');
      if (thousands > 0) {
        words += ' ' + convertLessThanOneThousand(thousands) + ' MIL';
      }
      if (remainder > 0) {
        words += ' ' + convertLessThanOneThousand(remainder);
      }
    }
  }

  const cents = parseInt(decimalPart, 10);
  const centsWords = String(cents).padStart(2, '0');

  return `${words} PESOS ${centsWords}/100 M.N.`.toUpperCase();
};

export default { numberToWords };