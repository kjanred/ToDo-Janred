import Link from "next/link";
import { Container,
         Heading } from "@chakra-ui/react";
import AddMemo from "../components/AddMemo";
import Auth from "../components/Auth";


export default function addMemo() {
return (
<Container maxW="7xl">
<Auth />
<Heading size="xs"><Link href="/">back to home</Link></Heading>
<Heading fontFamily={'"Century Gothic", sans-serif'} letterSpacing={'5px'} textTransform={'uppercase'} textAlign={'center'} fontWeight={'normal'}>Add Memo</Heading>
<AddMemo />
</Container>
);
}