import {
  HStack,
  ListItem,
  Skeleton,
  SkeletonText,
} from "@chakra-ui/react";

const GenreSkeleton = () => {
  return (
    <ListItem paddingY="5px">
      <HStack>
        <Skeleton boxSize="32px" borderRadius={8} />
        <SkeletonText height="32px" width="80%"/>
      </HStack>
    </ListItem>
  );
};

export default GenreSkeleton;
