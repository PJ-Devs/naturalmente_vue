import API from './config'
import type { Sell }  from '../types';

export async function getSells(): Promise<Sell[]> {
  try {
    const response = await API.get('/sells');
    return response.data.data as Sell[];
  } catch (error: any) {
    if (error.response) {
      const { status, data } = error.response;
      throw new Error(`Error obteniendo las compras: ${status} - ${data.message}`);
    } else {
      throw new Error('Error de conexión al servidor');
    }
  }
}

export const makeSell = async (sell: Sell): Promise<Sell> => {
  try {
    const response = await API.post('/sells', sell);
    return response.data.data as Sell;
  } catch (error: any) {
    if (error.response) {
      const { status, data } = error.response;
      throw new Error(`Error creando la compra: ${status} - ${data.message}`);
    } else {
      throw new Error('Error de conexión al servidor');
    }
  }
}