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

export const attachProductToCart = async ( user_id: number | string, proudct_id: number | string, data?: { orderedQuantity: number } ): Promise<CartProduct[]> => {
  try {
    const response = data
    ? await API.post(`/users/${user_id}/products/${proudct_id}`, data)
    : await API.post(`/users/${user_id}/products/${proudct_id}`, {orderedQuantity: 1});
    return response.data.data as CartProduct[];
  } catch (error: any) {
    if (error.response) {
      const { status, data } = error.response;
      throw new Error(`Error añadiendo el producto al carrito: ${status} - ${data.message}`);
    } else {
      throw new Error('Error de conexión al servidor');
    }
  }
}

export const updateProductQuantity = async (user_id: number,product_id: number ,quantity: number): Promise<CartProduct[]> => {
  try {
    const response = await API.put(`/users/${user_id}/products/${product_id}`, { orderedQuantity: quantity });
    return response.data.data as CartProduct[];
  } catch (error: any) {
    if (error.response) {
      const { status, data } = error.response;
      throw new Error(`Error actualizando la cantidad del producto: ${status} - ${data.message}`);
    } else {
      throw new Error('Error de conexión al servidor');
    }
  }
}

export const detachProductFromCart = async ( user_id: number | string, proudct_id: number | string ): Promise<CartProduct[]> => {
  try {
    const response = await API.delete(`/users/${user_id}/products/${proudct_id}`);
    return response.data.data as CartProduct[];
  } catch (error: any) {
    if (error.response) {
      const { status, data } = error.response;
      throw new Error(`Error eliminando el producto: ${status} - ${data.message}`);
    } else {
      throw new Error('Error de conexión al servidor');
    }
  }
}
