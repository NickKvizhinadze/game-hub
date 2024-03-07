import { useQuery } from "@tanstack/react-query";
import ms from "ms";
import ApiClient from "../services/api-client";
import { Game } from "./useGames";

const apiClient = new ApiClient<Game>("/games");

const useGame = (slug: string) => {

    return useQuery<Game, Error>({
        queryKey: ["games", slug],
        queryFn: () => apiClient.getById(slug),
        staleTime: ms("24h"),
    });
}
export default useGame;
