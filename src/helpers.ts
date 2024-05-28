import type { CartProduct } from "./types";

/**
 * Used to set COP currency to a number
 * @param amount
 * @returns The amount formated as COP currency
 */
export const showCurrency = (amount: number) => {
  const formattedAmount = new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
  }).format(amount);

  return formattedAmount;
}

/**
 * Used to format a date string
 * @param inputDate
 * @returns The date formated as a string
 */
export function formatDateString(inputDate: string): string {
  const dateObject = new Date(inputDate);
  const options: Intl.DateTimeFormatOptions = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
  };

  return dateObject.toLocaleString('es-ES', options);
}

/**
 * 
 * @param products 
 * @returns 
 */
export const sumAmountOfProducts = (products: CartProduct[]): number => {
  if(!products) return 0;
  return products.reduce((num,product) => {
    return num + product.pivot.orderedQuantity;
  }, 0);
}

/**
 * 
 * @param products 
 * @returns 
 */
export const sumTotalPrice = (products: CartProduct[]): number => {
  if(!products) return 0;
  return products.reduce((num,product) => {
    return num + product.price * product.pivot.orderedQuantity;
  }, 0);
}

/**
 * 
 * @param price 
 * @returns 
 */
export const getFinalPrice = (price: number): number => {
  return price * 1.26;
}