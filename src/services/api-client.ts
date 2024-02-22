import axios, { AxiosRequestConfig } from "axios";

export interface FetchResponse<T> {
    count: number;
    results: T[];
}

const axiosInstance = axios.create({
    baseURL: "https://api.rawg.io/api",
    params: {
        key: "4796c4b4decf4e63a1e8c6b08fb3fe39"
    }
});

class ApiClient<T> {
    endpoint: string;
    constructor(endpoint: string) {
        this.endpoint = endpoint;
    }

    getAll = (options: AxiosRequestConfig = {}) => {
        return axiosInstance.get<FetchResponse<T>>(this.endpoint, options)
            .then(res => res.data);
    }
}

export default ApiClient;
