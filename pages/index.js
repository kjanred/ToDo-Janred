import { Container,
         Box } from "@chakra-ui/react";
import Auth from "../components/Auth";
import TodoList from "../components/TodoList";
import MemoList from "../components/MemoList";

export default function Home() {
return (
<Container maxW="7xl">
<Auth />
<Box display="flex" alignItems="center" justifyContent="space-between">
   <Box> <TodoList /> </Box>
   <Box> <MemoList /> </Box>
    
    </Box>
</Container>
);
}