import { useQuery } from "@tanstack/react-query";
import ms from "ms";
import ApiClient, { FetchResponse } from "../services/api-client";
import genres from "../data/genres";
import Genre from "../entities/Genre";

const apiClient = new ApiClient<Genre>("/genres");

const useGenres = () => {
    return useQuery<FetchResponse<Genre>>({
        queryKey: ["genres"],
        queryFn: apiClient.getAll,
        staleTime: ms("24h"),
        initialData: genres
    });
}

export default useGenres;
