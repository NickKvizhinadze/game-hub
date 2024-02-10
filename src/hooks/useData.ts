import { useEffect, useState } from "react";
import { AxiosRequestConfig, CanceledError } from "axios";
import apiClient from "../services/api-client";

interface FetchResponse<T> {
    count: number;
    results: T[];
}

const useData = <T>(endpoint: string, config?: AxiosRequestConfig, deps?: unknown[]) => {
    const [data, setData] = useState<T[]>([]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const controller = new AbortController();
        setLoading(true);
        apiClient
            .get<FetchResponse<T>>(endpoint, { signal: controller.signal, ...config })
            .then((resp) => {
                setData(resp.data.results);
                setLoading(false);
            })
            .catch((err) => {
                if (err instanceof CanceledError)
                    return;
                setError(err.message)
                setLoading(false);
            });

        return () => controller.abort();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, deps? [...deps] : []);

    return { data, error, loading };
}

export default useData;
