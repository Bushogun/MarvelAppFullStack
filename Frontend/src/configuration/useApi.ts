import { useState, useEffect } from 'react';
import axios, { AxiosResponse } from 'axios';

type ApiHook<T> = {
    data: T | null;
    error: string | null;
    loading: boolean;
    post: (url: string, payload: any) => Promise<AxiosResponse<any>>;
    get: (url: string, headers?: Record<string, string>) => Promise<AxiosResponse<any>>;
};

function useApi<T>(baseUrl: string): ApiHook<T> {
    const [data, setData] = useState<T | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const post = async (url: string, payload: any): Promise<AxiosResponse<any>> => {
        setLoading(true);
        try {
            const response = await axios.post(`${baseUrl}${url}`, payload);
            setData(response.data);
            return response;
        } catch (err: any) {
            setError(err.response?.data?.error || 'Error desconocido');
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const get = async (url: string, headers: Record<string, string> = {}): Promise<AxiosResponse<any>> => {
        setLoading(true);
        try {
            const response = await axios.get(`${baseUrl}${url}`, {
                headers: {
                    ...headers
                }
            });
            setData(response.data);
            return response;
        } catch (err: any) {
            setError(err.response?.data?.error || 'Error desconocido');
            throw err;
        } finally {
            setLoading(false);
        }
    };

    return { data, error, loading, post, get };
}

export default useApi;
