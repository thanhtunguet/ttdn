import { AxiosError, AxiosRequestConfig } from 'axios';
import { Repository } from 'react3l';

export const httpConfig: AxiosRequestConfig = {};

Repository.errorInterceptor = (error: AxiosError) => {
  console.log(error.request.uri);
  throw error;
};
