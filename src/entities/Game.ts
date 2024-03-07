import Platform from "./Platform";
import Genre from './Genre';
import Publisher from "./Publisher";


export default interface Game {
    id: number;
    name: string;
    slug: string;
    genres: Genre[];
    publishers: Publisher[];
    description_raw: string;
    background_image: string;
    metacritic: number;
    rating_top: number;
    parent_platforms: { platform: Platform; }[];
}


