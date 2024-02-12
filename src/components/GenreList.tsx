import { Button, HStack, Heading, Image, List, ListItem, Text } from "@chakra-ui/react";
import useGenres from "../hooks/useGenres";
import getCroppedImageUrl from "./../services/image-url";
import GenreSkeleton from "./GenreSkeleton";
import { Genre } from "./../hooks/useGenres";

interface Props {
  onSelectGenre: (genre: Genre) => void;
  selectedGenre: Genre | null;
}

const GenreList = ({ onSelectGenre, selectedGenre }: Props) => {
  const { data, loading, error } = useGenres();
  const skeltons = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

  if (error) return null;

  return (
    <>
    <Heading fontSize="2xl" marginBottom={3}>Genres</Heading>
    <List>
      {loading
        ? skeltons.map((skeleton) => <GenreSkeleton key={skeleton} />)
        : data.map((genre) => (
            <ListItem paddingY="5px" key={genre.id}>
              <HStack >
                <Image
                  boxSize="32px"
                  borderRadius={8}
                  objectFit="cover"
                  src={getCroppedImageUrl(genre.image_background)}
                />
                <Button
                  onClick={() => onSelectGenre(genre)}
                  fontWeight={
                    genre.id === selectedGenre?.id ? "bold" : "normal"
                  }
                  variant="link"
                  fontSize="lg"
                  whiteSpace="normal"
                  textAlign="left"
                >
                  <Text fontSize="lg">{genre.name}</Text>
                </Button>
              </HStack>
            </ListItem>
          ))}
    </List></>
  );
};

export default GenreList;
