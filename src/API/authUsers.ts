import API from './config'
import type { Ref } from 'vue';
import type { NewUser, AuthUser, Customer } from '../types'
import { useAuthUserStore } from '@/stores/authUser';

type TokenValidation = {
  valid: boolean
}

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

export const validateToken = async (): Promise<TokenValidation> => {
  try {
    const response = await API.post('/auth/check-token-validity');
    return response.data as TokenValidation;
  } catch (error: any) {
    if (error.response) {
      const { status, data } = error.response;
      throw new Error(`Error validando el token del usuario: ${status} - ${data.message}`);
    } else {
      throw new Error('Error de conexión al servidor');
    }
  }
}

/**
 * Used to validate a token
 */
export const checkTokenValidity = () => {

  async function checkToken() {
    try {
      const response = await validateToken();
      return response;
    } catch (error: any) {
      if (error.response) {
        const { status, data } = error.response;
        throw new Error(`Error checkeando el token del usuario: ${status} - ${data.message}`);
      } else {
        throw new Error('Error de conexión al servidor');
      }
    }
  }

  checkToken().then((response) => {
    const useAuthUser = useAuthUserStore();

    if(!response.valid) {
      localStorage.removeItem("authUser")
    } else {
      useAuthUser.setUser(JSON.parse(localStorage.getItem('authUser') || '{}'))
    }
  })
}