import React from "react";
import Link from "next/link";
import {
    Box,
    Heading,
    Text,
    Container
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
<Heading size="xs"><Link href="../">back to home</Link></Heading>
<Heading fontFamily={'"Century Gothic", sans-serif'} letterSpacing={'5px'} textTransform={'uppercase'} textAlign={'center'} fontWeight={'normal'}>To Do</Heading>
<Box p={5} mt={5} bg='#f0f0f0'>
            <Heading as="h1" fontSize={"3xl"}>
                { itemData.title }
            </Heading>
            <Text fontSize={"lg"}>
             Description: <span className="listInfo">{ itemData.description }</span>
            </Text>
            <Text fontSize={"sm"}>
              Status:  <span className="listInfo">{ itemData.status }</span>
            </Text>
            <Text fontSize={"sm"}>
              Created:  <span className="listInfo">{ itemData.createdAt }</span>
            </Text>

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
    }

    return {
        props: {
            itemData
        }
    };
}

export default TodoItem;