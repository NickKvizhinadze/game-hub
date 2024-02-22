import { useInfiniteQuery } from "@tanstack/react-query";
import { GameQuery } from "../App";
import { Platform } from './usePlatforms';
import ApiClient, { FetchResponse } from "../services/api-client";
import ms from "ms";

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
    useInfiniteQuery<FetchResponse<Game>, Error>({
        queryKey: ["games", gameQuery],
        queryFn: ({ pageParam = 1 }) => apiClient.getAll({
            params:
            {
                genres: gameQuery.genreId,
                platforms: gameQuery.platformId,
                ordering: gameQuery.sortOrder,
                search: gameQuery.searchText,
                page: pageParam
            }
        }),
        getNextPageParam: (lastPage, allPages) => {
            return lastPage.next ? allPages.length + 1 : undefined;
        },
        staleTime:  ms("24h"),
    });

export default useGames;
