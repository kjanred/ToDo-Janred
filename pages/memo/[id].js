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

const MemoItem = ({itemData}) => {
    const { user } = useAuth() || {};
    if (!user) {
        return;
    }

    return (

        <Container maxW="7xl">
<Auth />
<Heading><Link href="../">back to home</Link></Heading>
<Box mt={5}>
            <Heading as="h3" fontSize={"xl"}>
                { itemData.title }
            </Heading>
            <Text>
                { itemData.description }
            </Text>
            <Text>
                { itemData.urgency }
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
    const docRef = doc( db, "memo", stuff.params.id)
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

export default MemoItem;