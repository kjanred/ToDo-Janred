import React, { useState } from 'react';
import { ArrowLeftIcon } from '@chakra-ui/icons'
import Link from "next/link";
import { toggleTodoStatus } from "../../../api/todo";
import {
  Heading,
  Badge,
  InputGroup,
  InputLeftAddon,
  Input,
  Button,
  Text,
  Box,
  Container,
  Stack,
  Flex,
  Spacer,
  Divider,
  useToast
} from "@chakra-ui/react";
import Auth from '../../../components/Auth';
import { FaToggleOff, FaToggleOn } from "react-icons/fa";
import useAuth from "../../../hooks/useAuth";
import {
  doc,
  getDoc,
  updateDoc
} from "firebase/firestore";
import { db } from "../../../firebase";
import { FaStackExchange } from 'react-icons/fa';

// define the jsx component to show just one single to do in our ui
const EditItem = ({ itemData }) => {
  const [inputTitle, setInputTitle] = useState(itemData.title);
  const [inputDescription, setInputDescription] = useState(itemData.description);
  const [statusToggle, setStatusToggle] = useState(itemData.status);
  const [statusMsg, setStatusMsg] = useState('');
  const toast = useToast();
  // enforce user login
  const { user } = useAuth() || {};
  if (!user) {
    return;
  }
  const handleToggle = async (id, status) => {
    const newStatus = status == "completed" ? "pending" : "completed";
    await toggleTodoStatus({ docId: id, status: newStatus });
    toast({
    title: `Todo marked ${newStatus}`,
    status: newStatus == "completed" ? "success" : "warning",
    });
    };
  // handle update of firestore document
  const sendData = async () => {
    console.log("sending! ", itemData);
    const docRef = doc(db, 'todo', itemData.id);
    updateDoc(
      docRef, 
      {
        title: inputTitle,
        description: inputDescription,
        status: statusToggle
      }
    ).then(
      docRef => {
        setStatusMsg("Updated!");
      }
    ).catch(
      error => {
        console.log(error);
        setStatusMsg("Error!");
      }
    );
  }
  // if our code continues execution to here, a user is logged in
  // finally return the jsx component
  return (
    <Container maxW="7xl">
      <Auth />
      <Heading size="xs"><Link href={`/todo/${encodeURIComponent(itemData.id)}`}><ArrowLeftIcon/> Exit Edit</Link></Heading>

      <Heading fontFamily={'"Century Gothic", sans-serif'} letterSpacing={'5px'} textTransform={'uppercase'} textAlign={'center'} fontWeight={'normal'}>Editing</Heading>
      <Box p={5} mt={5} mb={12} boxShadow='dark-lg' bg='blackAlpha.200' borderRadius='5px' >
      <Stack mb={5}>
        <InputGroup size='lg'>
        <InputLeftAddon fontWeight={'bold'} children='Title:' />
        <Input type="text" value={inputTitle} onChange={(e) => setInputTitle(e.target.value)} placeholder="Title" />
        </InputGroup>
        <Divider my={1} borderWidth='2px' borderColor='black'/>
        <InputGroup>
        <InputLeftAddon children='Desc:' />
        <Input type="text" value={inputDescription} onChange={(e) => setInputDescription(e.target.value)} placeholder="Description" />
        </InputGroup>
      </Stack>

      <Flex>
      <Badge
    color={statusToggle == "pending" ? "complete" : "pending"}
    onClick={(e) => setStatusToggle(e.target.value)}
    bg="inherit"
    transition={"0.2s"}
    _hover={{
    bg: "inherit",
    transform: "scale(1.2)",
    }}
    size="sm"
    >
    {itemData.status == "pending" ? <FaToggleOff /> : <FaToggleOn />}
    </Badge>
    <Badge
    size="sm"
    opacity="0.8"
    bg={itemData.status == "pending" ? "yellow.500" : "green.500"}
    >
    {itemData.status}
    </Badge>
      <Text>
        {new Date(itemData.createdAt).toLocaleDateString('en-US')}
      </Text>
      <Spacer />
      <Text>
        {statusMsg}
      </Text>
      <Button onClick={() => sendData()} ml={2} bg="whiteAlpha.600" >Update</Button>
      </Flex>

      </Box>
      
      </Container>
  );
};

// define the REQUIRED getServerSideProps() function that Next.js will call
// when it gets a dynamically-routed URL: /todo/blah <- here the id will = blah
export async function getServerSideProps(context) {
  // our function will receive all it needs from Next.js in context variable
  // if we want to get the url parameter that next.js set for id 'cause [id].js
  // context.params.id has it!
  let itemData = null;
  // get a doc from firestore collection
  const docRef = doc(db, 'todo', context.params.id);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    itemData = {
      id: docSnap.id,
      ...docSnap.data()
    };
  }

  return {
    props: {
      itemData
    }
  };
}

// export the component
export default EditItem;
