import API from "./config";
import type { CartProduct } from "../types";
import type { Ref } from 'vue';

export const getProductsFromCart = async (user_id: number, loading: Ref<boolean>): Promise<CartProduct[]> => {
  try {
    loading.value = true;
    const response = await API.get(`/users/${user_id}/products`).finally(() => {
      loading.value = false;
    });
    return response.data.data as CartProduct[];
  } catch (error: any) {
    if (error.response) {
      const { status, data } = error.response;
      throw new Error(`Error obteniendo los productos del usuario: ${status} - ${data.message}`);
    } else {
      throw new Error('Error de conexión al servidor');
    }
  }
}