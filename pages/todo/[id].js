import React from "react";
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
<Box mt={5}>
            <Heading as="h3" fontSize={"xl"}>
                { itemData.title }
            </Heading>
            <Text>
                { itemData.description }
            </Text>
            <Text>
                { itemData.staus }
            </Text>
            <Text>
                { itemData.createdAt }
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