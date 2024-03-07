import { Heading, SimpleGrid, Spinner, Text } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import useGame from "../hooks/useGame";
import Expandable from "../components/Expandable";
import DefinitionItem from "../components/DefinitionItem";
import CriticScore from "../components/CriticScore";
import GameAttributes from "../components/GameAttributes";

const GameDetailPage = () => {
  const { slug } = useParams();
  const { data: game, error, isLoading } = useGame(slug!);

  if (isLoading) return <Spinner />;

  if (error) throw error;

  return (
    <>
      <Heading>{game?.name}</Heading>
      <Expandable>{game?.description_raw}</Expandable>
      <GameAttributes game={game} />
    </>
  );
};

export default GameDetailPage;
