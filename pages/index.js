import { SimpleGrid,
         Box,
         Container,
         Tabs, 
         TabList, 
         TabPanels, 
         Tab, 
         TabPanel,
         Accordion,
         AccordionItem,
         AccordionButton,
         AccordionPanel,
         AccordionIcon,
        Heading } from "@chakra-ui/react";
import Auth from "../components/Auth";
import TodoList from "../components/TodoList";
import EventList from "../components/EventList";
import ContactList from "../components/ContactList";
import AddTodo from "@/components/AddTodo";
import AddEvent from "@/components/AddEvent";
import AddContact from "@/components/Addcontact";


export default function Home() {
return (
<Container maxW="7xl">
<Auth />
<Tabs>
  <TabList>
    <Tab>To Dos</Tab>
    <Tab>Events</Tab>
    <Tab>Contacts</Tab>
  </TabList>
  <TabPanels>

    <TabPanel>
    <Accordion hideFrom='md'my={1} defaultIndex={[0]} allowMultiple>
  <AccordionItem>
    <h2>
      <AccordionButton px='0'>
        <Box as="span" flex='1' textAlign='left'>
          <Heading size='sm' p='none'>Add To Do:</Heading>
        </Box>
        <AccordionIcon />
      </AccordionButton>
    </h2>
    <AccordionPanel pb={4}>
    <AddTodo />
    </AccordionPanel>
  </AccordionItem>
  </Accordion>
    <Box hideFrom='md'> <TodoList /> </Box>
    <SimpleGrid hideBelow='md' columns={2} alignContent="center">
     <Box> <TodoList /> </Box> <Box> <AddTodo /></Box>
   </SimpleGrid>
    </TabPanel>

    <TabPanel>
    <Accordion hideFrom='md'my={1} defaultIndex={[0]} allowMultiple>
  <AccordionItem>
    <h2>
      <AccordionButton px='0'>
        <Box as="span" flex='1' textAlign='left'>
          <Heading size='sm' p='none'>Add Event:</Heading>
        </Box>
        <AccordionIcon />
      </AccordionButton>
    </h2>
    <AccordionPanel pb={4}>
    <AddEvent />
    </AccordionPanel>
  </AccordionItem>
  </Accordion>
  <Box hideFrom='md'> <EventList /> </Box>
    <SimpleGrid hideBelow='md'columns={2} alignContent="center">
     <Box> <EventList /> </Box> <Box> <AddEvent /></Box>
   </SimpleGrid>
    </TabPanel>

    <TabPanel>
    <Accordion hideFrom='md'my={1} defaultIndex={[0]} allowMultiple>
  <AccordionItem>
    <h2>
      <AccordionButton px='0'>
        <Box as="span" flex='1' textAlign='left'>
          <Heading size='sm' p='none'>Add Contact:</Heading>
        </Box>
        <AccordionIcon />
      </AccordionButton>
    </h2>
    <AccordionPanel pb={4}>
    <AddContact />
    </AccordionPanel>
  </AccordionItem>
  </Accordion>
  <Box hideFrom='md'> <ContactList /> </Box>
    <SimpleGrid hideBelow='md' columns={2} alignContent="center">
     <Box> <ContactList /> </Box> <Box> <AddContact /></Box>
   </SimpleGrid>
    </TabPanel>
  </TabPanels>
</Tabs>
</Container>
);
}