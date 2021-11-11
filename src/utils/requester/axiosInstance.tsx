import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

const createInstance = (requestConfig: AxiosRequestConfig): AxiosInstance => {
    return axios.create({
        headers: requestConfig.headers || {},
        baseURL: requestConfig.baseURL || '',
        timeout: requestConfig.timeout || 0,
        method: requestConfig.method,
        url: requestConfig.url || '',
    });
};

export { createInstance };
