import { useQuery } from "@tanstack/react-query";
import ApiClient, { FetchResponse } from "../services/api-client";
import platforms from "../data/platforms";

export interface Platform {
    id: number;
    name: string;
    slug: string;
}

const apiClient = new ApiClient<Platform>("/platforms/lists/parents");

const usePlatforms = () => useQuery<FetchResponse<Platform>>({
    queryKey: ["platforms"],
    queryFn: apiClient.getAll,
    staleTime: 24 * 60 * 60 * 1000,
    initialData: platforms
});

export default usePlatforms;
