import { useEffect, useState } from "react";
import { CanceledError } from "axios";
import apiClient from "../services/api-client";

interface Game {
    id: number;
    name: string;
}

interface FetchGameResponse {
    count: number;
    results: Game[];
}

const useGames = () => {
    const [games, setGames] = useState<Game[]>([]);
    const [error, setError] = useState("");

    useEffect(() => {
        const controller = new AbortController();
        apiClient
            .get<FetchGameResponse>("/games", { signal: controller.signal })
            .then((resp) => setGames(resp.data.results))
            .catch((err) => {
                if (err instanceof CanceledError)
                    return;
                setError(err.message)
            });

        return () => controller.abort();
    }, []);
    return { games, error };
}

export default useGames;
