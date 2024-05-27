import API from './config'
import { useAuthUserStore } from '../stores/authUser.ts'
import type { Ref } from 'vue';
import type { NewUser, AuthUser, Customer } from '../types'

const formatNewUser = (newUser: NewUser) => {
  return {
    name: newUser.name + ' ' + newUser.lastName,
    email: newUser.email,
    password: newUser.password
  }
}

export const registerUser = async (newUser: NewUser, loading: Ref<boolean>): Promise<Customer> => {
  try {
    loading.value = true;
    const response = await API.post('/auth/register', formatNewUser(newUser)).finally(() => {
      loading.value = false
    });
    return response.data.data as Customer;
  } catch (error: any) {
    if (error.response) {
      const { status, data } = error.response;
      throw new Error(`Error registrando usuario: ${status} - ${data.message}`);
    } else {
      throw new Error('Error de conexión al servidor');
    }
  }
};

export const loginUser = async (authUser: AuthUser, loading: Ref<boolean>): Promise<void> => {
  try {
    loading.value = true;
    const response = await API.post('/auth/login', authUser).finally(() => {
      loading.value = false
    });
    return response.data.data as void;
  } catch (error: any) {
    if (error.response) {
      const { status, data } = error.response;
      throw new Error(`Error iniciando la sesión del usuario: ${status} - ${data.message}`);
    } else {
      throw new Error('Error de conexión al servidor');
    }
  }
}

export const logoutUser = async (): Promise<void> => {
  try {
    await API.post('/auth/logout').then((response) => {
      return response.data.data as void;
    });
  } catch (error: any) {
    if (error.response) {
      const { status, data } = error.response;
      throw new Error(`Error cerrando la sesión del usuario: ${status} - ${data.message}`);
    } else {
      throw new Error('Error de conexión al servidor');
    }
  }
}

export const getUser = async (): Promise<Customer> => {
  try {
    const response = await API.post('/auth/profile', null, {
      withCredentials: true,
    });
    return response.data.data as Customer;
  } catch (error: any) {
    if (error.response) {
      const { status, data } = error.response;
      throw new Error(`Error obteniendo usuario: ${status} - ${data.message}`);
    } else {
      throw new Error('Error de conexión al servidor');
    }
  }
}