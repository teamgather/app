import axios, {
  AxiosError,
  AxiosRequestConfig,
  InternalAxiosRequestConfig,
} from 'axios';

/**
 * ANCHOR Axios
 * @date 06/04/2025 - 04:39:39
 */
axios.interceptors.request.use(
  (config: InternalAxiosRequestConfig<AxiosRequestConfig>) => {
    config.baseURL = process.env.NEXT_PUBLIC_APP_API_URL;
    config.timeout = 300000;
    config.withCredentials = true;

    return config;
  },
);

export { axios, AxiosError };
