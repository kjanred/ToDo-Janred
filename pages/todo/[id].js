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

const TodoItem = ({itemData}) => {


    const { user } = useAuth() || {};
    if (!user) {
        return;
    }
    
    return (

        <Container maxW="7xl">
<Auth />
<Heading size="xs"><Link href="../"> <ArrowLeftIcon /> back to lists</Link></Heading>


<Heading fontFamily={'"Century Gothic", sans-serif'} letterSpacing={'5px'} textTransform={'uppercase'} textAlign={'center'} fontWeight={'normal'}>To Do</Heading>
<Box p={5} mt={5} bg='blackAlpha.200' borderRadius='5px' >
    <Flex>        
        <Heading lineHeight='-1' fontSize={"3xl"} width='lg'>
            { itemData.title } 
        </Heading>
            <Spacer/>
        <Box><Link href={`/todo/edit/${encodeURIComponent(itemData.id)}`}><Button mb={2} bg="whiteAlpha.600" leftIcon={<EditIcon  />} >Edit</Button></Link></Box>
    </Flex>
    <Divider my={1} borderWidth='2px' borderColor='black'/>
            <Text fontSize={"lg"}>
             <span className="listInfo">{ itemData.description }</span>
            </Text>

            <Flex mt={3}>
            <Text fontSize={"sm"}>
              status:  <span className="listInfo">{ itemData.status }</span>
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
    const docRef = doc( db, "todo", stuff.params.id)
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

export default TodoItem;