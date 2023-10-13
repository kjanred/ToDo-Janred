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
import { addMemo } from "../api/memo";
const AddMemo = () => {
const [title, setTitle] = React.useState("");
const [description, setDescription] = React.useState("");
const [urgency, setUrgency] = React.useState("normal");
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
const memo = {
title,
description,
urgency,
userId: user.uid,
};
await addMemo(memo);
setIsLoading(false);
setTitle("");
setDescription("");
setUrgency("pending");
toast({ title: "Memo created successfully", status: "success" });
};
return (
<Box w="40%" margin={"0 auto"} display="block" mt={5}>
<Stack direction="column">
<Input
placeholder="Title"
value={title}
onChange={(e) => setTitle(e.target.value)}
/>
<Textarea
placeholder="Description"
value={description}
onChange={(e) => setDescription(e.target.value)}
/>
<Select value={urgency} onChange={(e) => setUrgency(e.target.value)}>
<option
value={"normal"}
style={{ color: "yellow", fontWeight: "bold" }}
>
Normal
</option>
<option
value={"urgent"}
style={{ color: "green", fontWeight: "bold" }}
>
Urgent!
</option>
<option
value={"asap"}
style={{ color: "red", fontWeight: "bold" }}
>
! A.S.A.P. !
</option>
</Select>
<Button
onClick={() => handleMemoCreate()}
disabled={title.length < 1 || description.length < 1 || isLoading}
colorScheme="teal"
variant="solid"
>
Add
</Button>
</Stack>
</Box>
);
};
export default AddMemo;