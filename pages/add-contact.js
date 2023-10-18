import Link from "next/link";
import { Container,
         Heading } from "@chakra-ui/react";
import AddContact from "../components/AddContact";
import Auth from "../components/Auth";


export default function addContact() {
return (
<Container maxW="7xl">
<Auth />
<Heading size="xs"><Link href="/">back to home</Link></Heading>
<Heading fontFamily={'"Century Gothic", sans-serif'} letterSpacing={'5px'} textTransform={'uppercase'} textAlign={'center'} fontWeight={'normal'}>Add Contact</Heading>
<AddContact />
</Container>
);
}