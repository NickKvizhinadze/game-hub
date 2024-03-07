import { GridItem, Heading, SimpleGrid, Spinner } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import useGame from "../hooks/useGame";
import Expandable from "../components/Expandable";
import GameAttributes from "../components/GameAttributes";
import GameTrailer from "../components/GameTrailer";
import GameSchreenshots from "../components/GameScreenshots";

const GameDetailPage = () => {
  const { slug } = useParams();
  const { data: game, error, isLoading } = useGame(slug!);

  if (isLoading) return <Spinner />;

  if (error) throw error;

  return (
    <SimpleGrid columns={{ base: 1, md: 2 }} spacing={5}>
      <GridItem>
        <Heading>{game?.name}</Heading>
        <Expandable>{game?.description_raw}</Expandable>
        <GameAttributes game={game} />
      </GridItem>
      <GridItem>
        <GameTrailer gameId={game.id} />
        <GameSchreenshots gameId={game.id} />
      </GridItem>
    </SimpleGrid>
  );
};

export default GameDetailPage;
