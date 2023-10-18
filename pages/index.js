import { Container,
         Box,
         SimpleGrid } from "@chakra-ui/react";
import Auth from "../components/Auth";
import TodoList from "../components/TodoList";
import MemoList from "../components/MemoList";
import ContactList from "../components/ContactList";

export default function Home() {
return (
<Container maxW="7xl">
<Auth />
<SimpleGrid columns={3} alignContent="center">
   <Box> <TodoList /> </Box>
   <Box> <MemoList /> </Box>
   <Box> <ContactList /> </Box>
   </SimpleGrid>
</Container>
);
}