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

const ContactItem = ({itemData}) => {
    const { user } = useAuth() || {};
    if (!user) {
        return;
    }

    return (

        <Container maxW="7xl">
<Auth />
<Heading size="xs"><Link href="../">back to home</Link></Heading>
<Heading fontFamily={'"Century Gothic", sans-serif'} letterSpacing={'5px'} textTransform={'uppercase'} textAlign={'center'} fontWeight={'normal'}>Contact</Heading>
<Box p={5} mt={5} bg='#f0f0f0'>
            <Heading as="h1" fontSize={"3xl"}>
                { itemData.name }
            </Heading>
            <Text fontSize={"sm"}>
             Phone Number: <span className="listInfo">{ itemData.phoneNumber }</span>
            </Text>
            <Text fontSize={"sm"}>
              2nd Phone Number:  <span className="listInfo">{ itemData.phoneNumber2 }</span>
            </Text>
            <Text fontSize={"sm"}>
              Email:  <span className="listInfo">{ itemData.email }</span>
            </Text>
            <Text fontSize={"sm"}>
              Notes:  <span className="listInfo">{ itemData.notes }</span>
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
    const docRef = doc( db, "contact", stuff.params.id)
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

export default ContactItem;