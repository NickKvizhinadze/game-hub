import { useQuery } from "@tanstack/react-query";
import { GameQuery } from "../App";
import { Platform } from './usePlatforms';
import ApiClient, { FetchResponse } from "../services/api-client";

export interface Game {
    id: number;
    name: string;
    background_image: string;
    metacritic: number;
    rating_top: number;
    parent_platforms: { platform: Platform }[];
}
const apiClient = new ApiClient<Game>("/games");

const useGames = (gameQuery: GameQuery) =>
    useQuery<FetchResponse<Game>, Error>({
        queryKey: ["games", gameQuery],
        queryFn: () => apiClient.getAll({
            params:
            {
                genres: gameQuery.genre?.id,
                platforms: gameQuery.platform?.id,
                ordering: gameQuery.sortOrder,
                search: gameQuery.searchText
            }
        })
    });

export default useGames;
