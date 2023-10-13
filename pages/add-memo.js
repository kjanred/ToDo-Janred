import { Container } from "@chakra-ui/react";
import AddMemo from "../components/AddMemo";
import Auth from "../components/Auth";


export default function addMemo() {
return (
<Container maxW="7xl">
<Auth />
<AddMemo />
</Container>
);
}