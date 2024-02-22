import { useQuery } from "@tanstack/react-query";
import { GameQuery } from "../App";
import { Platform } from './usePlatforms';
import apiClient, { FetchResponse } from "../services/api-client";
export interface Game {
    id: number;
    name: string;
    background_image: string;
    metacritic: number;
    rating_top: number;
    parent_platforms: { platform: Platform }[];
}

const useGames = (gameQuery: GameQuery) =>
    useQuery<FetchResponse<Game>, Error>({
        queryKey: ["games", gameQuery],
        queryFn: () => apiClient
            .get<FetchResponse<Game>>("/games", {
                params:
                {
                    genres: gameQuery.genre?.id,
                    platforms: gameQuery.platform?.id,
                    ordering: gameQuery.sortOrder,
                    search: gameQuery.searchText
                }
            })
            .then(res => res.data)
    });

export default useGames;
