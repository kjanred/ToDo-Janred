import React from "react";
import { EditIcon, ArrowLeftIcon } from '@chakra-ui/icons'
import Link from "next/link";
import {
    Box,
    Heading,
    Text,
    Container,
    Flex,
    Spacer,
    Button,
    Divider
} from "@chakra-ui/react";
import Auth from "../../components/Auth";
import useAuth from "../../hooks/useAuth";
import {
    doc,
    getDoc
} from "firebase/firestore";
import { db } from "../../firebase";

const EventItem = ({itemData}) => {
    const { user } = useAuth() || {};
    if (!user) {
        return;
    }

    return (
        <Container maxW="7xl">
<Auth />
<Flex justifyContent='space-between' align='baseline'>
        <Link href={`../`}> <Text fontSize='sm' fontWeight='bold'><ArrowLeftIcon/> back to lists</Text></Link>
        <Text fontSize='4xl' fontFamily={'"Century Gothic", sans-serif'} letterSpacing={'5px'} textTransform={'uppercase'} fontWeight={'normal'}>Event</Text>
        <Box hideBelow='md'>{/*Invisible Box for center positioning using flex on md and above*/}<Text fontSize='sm' fontWeight='bold' visibility='hidden'><ArrowLeftIcon/> back to lists</Text></Box>
      </Flex>
<Box p={5} mt={5} mb={12} boxShadow='dark-lg' bg='blackAlpha.200' borderRadius='5px' >
    <Flex>        
        <Heading lineHeight='-1' fontSize={{base: '2xl', md: '3xl' }} width='lg'>
            { itemData.title } 
        </Heading>
            <Spacer/>
        <Box><Link href={`/event/edit/${encodeURIComponent(itemData.id)}`}><Button size={{base: 'sm', md: 'md' }} mb={2} bg="whiteAlpha.600" leftIcon={<EditIcon  />} >Edit</Button></Link></Box>
    </Flex>
    <Divider my={1} borderWidth='2px' borderColor='black'/>
            <Text fontSize={"lg"}>
             <span className="listInfo">{ itemData.description }</span>
            </Text>

            <Flex mt={3}>
            <Text fontSize={"sm"}>
              status:  <span className="listInfo">{ itemData.urgency }</span>
            </Text>
            <Spacer />
            <Text fontSize={"sm"}>
              created:  <span className="listInfo">{new Date(itemData.createdAt).toLocaleDateString('en-US')}</span>
            </Text>
            </Flex>

        </Box>
</Container>
    )
};

export async function getServerSideProps(stuff) {
    let itemData = null;
    const docRef = doc( db, "event", stuff.params.id)
    const docSnap = await getDoc(docRef);
    if (docSnap.exists() ) {
    itemData = docSnap.data();
    itemData.id = stuff.params.id;
    }

    return {
        props: {
            itemData
        }
    };
}

export default EventItem;