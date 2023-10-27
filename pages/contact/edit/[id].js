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

// define the jsx component to show just one single to do in our ui
const EditContactItem = ({ itemData }) => {
  const [inputName, setInputName] = useState(itemData.name);
  const [inputPhoneNumber, setInputPhoneNumber] = useState(itemData.phoneNumber);
  const [inputPhoneNumber2, setInputPhoneNumber2] = useState(itemData.phoneNumber2);
  const [inputEmail, setInputEmail] = useState(itemData.email);
  const [inputNotes, setInputNotes] = useState(itemData.notes);
  const [statusMsg, setStatusMsg] = useState('');
  
  // enforce user login
  const { user } = useAuth() || {};
  if (!user) {
    return;
  }
 
  // handle update of firestore document
  const sendData = async () => {
    console.log("sending! ", itemData);
    const docRef = doc(db, 'contact', itemData.id);
    updateDoc(
      docRef, 
      {
        name: inputName,
        phoneNumber: inputPhoneNumber,
        phoneNumber2: inputPhoneNumber2,
        email: inputEmail,
        notes: inputNotes
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
        <Link href={`/contact/${encodeURIComponent(itemData.id)}`}> <Text fontSize='sm' fontWeight='bold'><ArrowLeftIcon/> exit edit</Text></Link>
        <Text fontSize='4xl' fontFamily={'"Century Gothic", sans-serif'} letterSpacing={'5px'} textTransform={'uppercase'} fontWeight={'normal'}>Editing</Text>
        <Box hideBelow='md'>{/*Invisible Box for center positioning using flex on md and above*/}<Text fontSize='sm' fontWeight='bold' visibility='hidden'><ArrowLeftIcon/> exit edit</Text></Box>
      </Flex>
      
      <Box px={5} pt={5}  pb={2} mt={5} mb={12} boxShadow='dark-lg' bg='blackAlpha.200' borderRadius='5px' >
      <Stack mb={10}>
        
      
        <Input size='lg' borderColor='blackAlpha.300' bg='white' fontWeight={'bold'}  type="text" value={inputName} onChange={(e) => setInputName(e.target.value)} placeholder="Name" />
        
        <Divider my={1} borderWidth='1px' borderColor='blackAlpha.500'/>

        <Input size='md' borderColor='blackAlpha.300' bg='white' fontWeight={'bold'}  type="text" value={inputPhoneNumber} onChange={(e) => setInputPhoneNumber(e.target.value)} placeholder="Phone Number" />

        <Divider my={1} borderWidth='1px' borderColor='blackAlpha.500'/>
        
        <Input size='md' borderColor='blackAlpha.300' bg='white' fontWeight={'bold'}  type="text" value={inputPhoneNumber2} onChange={(e) => setInputPhoneNumber2(e.target.value)} placeholder="Phone Number 2" />

        <Divider my={1} borderWidth='1px' borderColor='blackAlpha.500'/>

        <Input size='md' borderColor='blackAlpha.300' bg='white' fontWeight={'bold'}  type="text" value={inputEmail} onChange={(e) => setInputEmail(e.target.value)} placeholder="Email" />

        <Divider my={1} borderWidth='1px' borderColor='blackAlpha.500'/>

        <Textarea borderColor='blackAlpha.300' bg='white' type="text" value={inputNotes} onChange={(e) => setInputNotes(e.target.value)} placeholder="Notes" />
        <Text textAlign='center'>
        {statusMsg} <br/>
        </Text>
      </Stack>   

      <Flex justifyContent='space-between' align='end'>
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
  const docRef = doc(db, 'contact', context.params.id);
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
export default EditContactItem;
