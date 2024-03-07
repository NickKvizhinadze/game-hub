import { useInfiniteQuery } from "@tanstack/react-query";
import { Platform } from './usePlatforms';
import ApiClient, { FetchResponse } from "../services/api-client";
import ms from "ms";
import useGameQueryStore from "../store";

export interface Game {
    id: number;
    name: string;
    slug: string;
    background_image: string;
    metacritic: number;
    rating_top: number;
    parent_platforms: { platform: Platform }[];
    description: string;
    description_raw: string;
}
const apiClient = new ApiClient<Game>("/games");

const useGames = () => {

    const gameQuery = useGameQueryStore((s) => s.gameQuery);

   return useInfiniteQuery<FetchResponse<Game>, Error>({
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
        staleTime: ms("24h"),
    });
}
export default useGames;
