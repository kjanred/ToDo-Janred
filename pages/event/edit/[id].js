import React, { useState } from 'react';
import { ArrowLeftIcon } from '@chakra-ui/icons'
import Link from "next/link";
import {
  Badge,
  Input,
  Textarea,
  Button,
  Text,
  Box,
  Container,
  Stack,
  Flex,
  Divider,

} from "@chakra-ui/react";
import Auth from '../../../components/Auth';
import useAuth from "../../../hooks/useAuth";
import {
  doc,
  getDoc,
  updateDoc
} from "firebase/firestore";
import { db } from "../../../firebase";

// define the jsx component to show just one single to do in our ui
const EditEventItem = ({ itemData }) => {
  const [inputTitle, setInputTitle] = useState(itemData.title);
  const [inputDescription, setInputDescription] = useState(itemData.description);
  const [urgencyToggle, setUrgencyToggle] = useState(itemData.urgency);
  const [statusMsg, setStatusMsg] = useState('');
  // enforce user login
  const { user } = useAuth() || {};
  if (!user) {
    return;
  }

  function handleUrgencyToggle() {
    if (urgencyToggle == "notUrgent") {
       setUrgencyToggle("urgent");
    } else if (urgencyToggle == "urgent") {
       setUrgencyToggle("asap");
    } else {
       setUrgencyToggle("notUrgent");
    }
   }


  // handle update of firestore document
  const sendData = async () => {
    console.log("sending! ", itemData);
    const docRef = doc(db, 'event', itemData.id);
    updateDoc(
      docRef, 
      {
        title: inputTitle,
        description: inputDescription,
        status: urgencyToggle
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
      <Flex justifyContent='space-between' align='baseline'>
        <Link href={`/event/${encodeURIComponent(itemData.id)}`}> <Text fontSize='sm' fontWeight='bold'><ArrowLeftIcon/> exit edit</Text></Link>
        <Text fontSize='4xl' fontFamily={'"Century Gothic", sans-serif'} letterSpacing={'5px'} textTransform={'uppercase'} fontWeight={'normal'}>Editing</Text>
        <Box hideBelow='md'>{/*Invisible Box for center positioning using flex on md and above*/}<Text fontSize='sm' fontWeight='bold' visibility='hidden'><ArrowLeftIcon/> exit edit</Text></Box>
      </Flex>
      
      <Box px={5} pt={5}  pb={2} mt={5} mb={12} boxShadow='dark-lg' bg='blackAlpha.200' borderRadius='5px' >
      <Stack mb={10}>
        
      
        <Input size='lg' borderColor='blackAlpha.300' bg='white' fontWeight={'bold'}  type="text" value={inputTitle} onChange={(e) => setInputTitle(e.target.value)} placeholder="Title" />
        
        <Divider my={1} borderWidth='1px' borderColor='blackAlpha.500'/>
        
        <Textarea borderColor='blackAlpha.300' bg='white' type="text" value={inputDescription} onChange={(e) => setInputDescription(e.target.value)} placeholder="Description" />
        <Text textAlign='center'>
        {statusMsg} <br/>
        </Text>
      </Stack>

      

      <Flex justifyContent='space-between' align='end'>
    <Box pb='2px' width={{base: '73px', md: '115px' }}>
    <Badge
    onClick={()=>handleUrgencyToggle()}
    opacity="0.8"
    bg={urgencyToggle == "notUrgent" ? "green.500" : urgencyToggle == "urgent" ? "yellow.500" : "red.500"}
    fontSize={{base: '10px', md: 'md' }}
    >
    {urgencyToggle}
    </Badge>
    </Box>
      <Text fontSize={{base: 'xs', md: 'md' }}>
        Created: <Box height='0px' mt='-7px' hideFrom='md'><br /></Box><span className='listInfo'>{new Date(itemData.createdAt).toLocaleDateString('en-US')}</span>
      </Text>
    
      
      <Button size={{base: 'sm', md: 'md' }} onClick={() => sendData()} ml={2} bg="whiteAlpha.600" >Update</Button>
      
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
  const docRef = doc(db, 'event', context.params.id);
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
export default EditEventItem;
