import { SimpleGrid,
         Box,
         Container,
         Tabs, 
         TabList, 
         TabPanels, 
         Tab, 
         TabPanel } from "@chakra-ui/react";
import Auth from "../components/Auth";
import TodoList from "../components/TodoList";
import MemoList from "../components/MemoList";
import ContactList from "../components/ContactList";
import AddTodo from "@/components/AddTodo";
import AddMemo from "@/components/AddMemo";
import AddContact from "@/components/Addcontact";


export default function Home() {
return (
<Container maxW="7xl">
<Auth />
<Tabs>
  <TabList>
    <Tab>To Dos</Tab>
    <Tab>Memos</Tab>
    <Tab>Contacts</Tab>
  </TabList>

  <TabPanels>
    <TabPanel>
    <SimpleGrid columns={2} alignContent="center">
     <Box> <TodoList /> </Box> <Box> <AddTodo /></Box>
   </SimpleGrid>
    </TabPanel>
    <TabPanel>
    <SimpleGrid columns={2} alignContent="center">
     <Box> <MemoList /> </Box> <Box> <AddMemo /></Box>
   </SimpleGrid>
    </TabPanel>
    <TabPanel>
    <SimpleGrid columns={2} alignContent="center">
     <Box> <ContactList /> </Box> <Box> <AddContact /></Box>
   </SimpleGrid>
    </TabPanel>
  </TabPanels>
</Tabs>
</Container>
);
}