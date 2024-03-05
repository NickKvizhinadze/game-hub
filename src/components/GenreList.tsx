import {
  Button,
  HStack,
  Heading,
  Image,
  List,
  ListItem,
  Text,
} from "@chakra-ui/react";
import useGenres from "../hooks/useGenres";
import getCroppedImageUrl from "./../services/image-url";
import GenreSkeleton from "./GenreSkeleton";
import useGameQueryStore from "../store";

const GenreList = () => {
  const { data, error, isLoading } = useGenres();
  const skeltons = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  const { selectedGenreId, setGenreId } = useGameQueryStore((s) => ({
    selectedGenreId: s.gameQuery.genreId,
    setGenreId: s.setGenreId
  }));

  if (error) return null;

  return (
    <>
      <Heading fontSize="2xl" marginBottom={3}>
        Genres
      </Heading>
      <List>
        {isLoading
          ? skeltons.map((skeleton) => <GenreSkeleton key={skeleton} />)
          : data?.results?.map((genre) => (
              <ListItem paddingY="5px" key={genre.id}>
                <HStack>
                  <Image
                    boxSize="32px"
                    borderRadius={8}
                    objectFit="cover"
                    src={getCroppedImageUrl(genre.image_background)}
                  />
                  <Button
                    onClick={() => setGenreId(genre.id)}
                    fontWeight={
                      genre.id === selectedGenreId ? "bold" : "normal"
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
      </List>
    </>
  );
};

export default GenreList;
