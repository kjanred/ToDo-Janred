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

const ContactItem = ({itemData}) => {
    const { user } = useAuth() || {};
    if (!user) {
        return;
    }

    return (

        <Container maxW="7xl">
<Auth />
<Flex justifyContent='space-between' align='baseline'>
        <Link href={`../`}> <Text fontSize='sm' fontWeight='bold'><ArrowLeftIcon/> back to lists</Text></Link>
        <Text fontSize='4xl' fontFamily={'"Century Gothic", sans-serif'} letterSpacing={'5px'} textTransform={'uppercase'} fontWeight={'normal'}>Contact</Text>
        <Box hideBelow='md'>{/*Invisible Box for center positioning using flex on md and above*/}<Text fontSize='sm' fontWeight='bold' visibility='hidden'><ArrowLeftIcon/> back to lists</Text></Box>
      </Flex>
<Box p={5} mt={5} mb={12} boxShadow='dark-lg' bg='blackAlpha.200' borderRadius='5px' >
    <Flex>        
        <Heading lineHeight='-1' fontSize={{base: '2xl', md: '3xl' }} width='lg'>
            { itemData.name } 
        </Heading>
            <Spacer/>
        <Box><Link href={`/contact/edit/${encodeURIComponent(itemData.id)}`}><Button size={{base: 'sm', md: 'md' }} mb={2} bg="whiteAlpha.600" leftIcon={<EditIcon  />} >Edit</Button></Link></Box>
    </Flex>
    <Divider my={1} borderWidth='2px' borderColor='black'/>
            <Text fontSize={"md"}>
             phone: <span className="listInfo">{ itemData.phoneNumber }</span>
            </Text>
            <Text fontSize={"md"}>
             alt phone: <span className="listInfo">{ itemData.phoneNumber2 }</span>
            </Text>
            <Text fontSize={"md"}>
             email: <span className="listInfo">{ itemData.email }</span>
            </Text>

            <Flex mt={3}>
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
    const docRef = doc( db, "contact", stuff.params.id)
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

export default ContactItem;