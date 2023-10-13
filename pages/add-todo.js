import Link from "next/link";
import { Container,
    Heading } from "@chakra-ui/react";
import AddTodo from "../components/AddTodo";
import Auth from "../components/Auth";


export default function addTodo() {
return (
<Container maxW="7xl">
<Auth />
<Heading size="xs"><Link href="/">back to home</Link></Heading>
<Heading fontFamily={'"Century Gothic", sans-serif'} letterSpacing={'5px'} textTransform={'uppercase'} textAlign={'center'} fontWeight={'normal'}>Add To Do</Heading>
<AddTodo />
</Container>
);
}