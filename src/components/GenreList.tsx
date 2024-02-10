import { HStack, Image, List, ListItem, Text } from "@chakra-ui/react";
import useGenres from "../hooks/useGenres";
import getCroppedImageUrl from "./../services/image-url";
import GenreSkeleton from "./GenreSkeleton";

const GenreList = () => {
  const { data, loading, error } = useGenres();
  const skeltons = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

  if (error) return null;
  
  return (
    <List>
      {loading
        ? skeltons.map((skeleton) => <GenreSkeleton key={skeleton} />)
        : data.map((genre) => (
            <ListItem paddingY="5px" key={genre.id}>
              <HStack>
                <Image
                  boxSize="32px"
                  borderRadius={8}
                  src={getCroppedImageUrl(genre.image_background)}
                />
                <Text fontSize="lg">{genre.name}</Text>
              </HStack>
            </ListItem>
          ))}
    </List>
  );
};

export default GenreList;
