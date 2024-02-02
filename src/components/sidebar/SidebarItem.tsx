import { VStack } from "@chakra-ui/react";
import Search from "./Search";
import Create from "./Create";
import Home from "./Home";

const SidebarItem = () => {
  return (
    <VStack gap="5" w="full">
      <Home />
      <Search />
      <Create />
    </VStack>
  );
};

export default SidebarItem;
