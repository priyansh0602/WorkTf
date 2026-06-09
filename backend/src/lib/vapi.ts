import axios, { AxiosError } from 'axios';
import { config } from '../config';

const VAPI_BASE_URL = 'https://api.vapi.ai';

function getHeaders(): Record<string, string> {
  return {
    'Authorization': `Bearer ${config.vapiApiKey}`,
    'Content-Type': 'application/json',
  };
}

function handleAxiosError(error: unknown): never {
  if (error instanceof AxiosError) {
    const message =
      (error.response?.data as Record<string, string> | undefined)?.message ||
      error.message;
    throw new Error(message);
  }
  throw error;
}

export const vapiClient = {
  async get<T = unknown>(endpoint: string): Promise<T> {
    try {
      const response = await axios.get<T>(
        `${VAPI_BASE_URL}/${endpoint}`,
        { headers: getHeaders() }
      );
      return response.data;
    } catch (error) {
      handleAxiosError(error);
    }
  },

  async post<T = unknown>(endpoint: string, data: unknown): Promise<T> {
    try {
      const response = await axios.post<T>(
        `${VAPI_BASE_URL}/${endpoint}`,
        data,
        { headers: getHeaders() }
      );
      return response.data;
    } catch (error) {
      handleAxiosError(error);
    }
  },

  async patch<T = unknown>(endpoint: string, data: unknown): Promise<T> {
    try {
      const response = await axios.patch<T>(
        `${VAPI_BASE_URL}/${endpoint}`,
        data,
        { headers: getHeaders() }
      );
      return response.data;
    } catch (error) {
      handleAxiosError(error);
    }
  },

  async delete<T = unknown>(endpoint: string): Promise<T> {
    try {
      const response = await axios.delete<T>(
        `${VAPI_BASE_URL}/${endpoint}`,
        { headers: getHeaders() }
      );
      return response.data;
    } catch (error) {
      handleAxiosError(error);
    }
  },
};
