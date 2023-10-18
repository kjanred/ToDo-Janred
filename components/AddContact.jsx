import React from "react";
import {
Box,
Input,
Button,
Textarea,
Stack,
Select,
useToast,
} from "@chakra-ui/react";
import useAuth from "../hooks/useAuth";
import { addContact } from "../api/contact";
const AddContact = () => {
const [name, setName] = React.useState("");
const [phoneNumber, setPhoneNumber] = React.useState("");
const [phoneNumber2, setPhoneNumber2] = React.useState("");
const [email, setEmail] = React.useState("");
const [notes, setNotes] = React.useState("");
const [isLoading, setIsLoading] = React.useState(false);
const toast = useToast();
const { isLoggedIn, user } = useAuth();
const handleMemoCreate = async () => {
if (!isLoggedIn) {
toast({
title: "You must be logged in to create a memo",
status: "error",
duration: 9000,
isClosable: true,
});
return;
}
setIsLoading(true);
const contact = {
name,
phoneNumber,
phoneNumber2,
email,
notes,
userId: user.uid,
};
await addContact(contact);
setIsLoading(false);
setName("");
setPhoneNumber("");
setPhoneNumber2("");
setEmail("");
setNotes("");
toast({ title: "Contact created successfully", status: "success" });
};
return (
<Box w="40%" margin={"0 auto"} display="block" mt={5}>
<Stack direction="column">
<Input
placeholder="Name"
value={name}
onChange={(e) => setName(e.target.value)}
/>
<Textarea
placeholder="Phone Number"
value={phoneNumber}
onChange={(e) => setPhoneNumber(e.target.value)}
/>
<Textarea
placeholder="2nd Phone Number"
value={phoneNumber2}
onChange={(e) => setPhoneNumber2(e.target.value)}
/>
<Textarea
placeholder="Email"
value={email}
onChange={(e) => setEmail(e.target.value)}
/>

<Button
onClick={() => handleMemoCreate()}
disabled={name.length < 1 || phoneNumber.length < 1 || isLoading}
colorScheme="teal"
variant="solid"
>
Add
</Button>
</Stack>
</Box>
);
};
export default AddContact;