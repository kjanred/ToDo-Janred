import React from "react";
import {
Box,
Input,
Button,
Textarea,
Stack,
Select,
useToast,
Heading
} from "@chakra-ui/react";
import useAuth from "../hooks/useAuth";
import { addEvent } from "../api/event";
const AddEvent = () => {
const [title, setTitle] = React.useState("");
const [description, setDescription] = React.useState("");
const [urgency, setUrgency] = React.useState("normal");
const [isLoading, setIsLoading] = React.useState(false);
const toast = useToast();
const { isLoggedIn, user } = useAuth();
const handleEventCreate = async () => {
if (!isLoggedIn) {
toast({
title: "You must be logged in to create a event",
status: "error",
duration: 9000,
isClosable: true,
});
return;
}
setIsLoading(true);
const event = {
title,
description,
urgency,
userId: user.uid,
};
await addEvent(event);
setIsLoading(false);
setTitle("");
setDescription("");
setUrgency("pending");
toast({ title: "Event created successfully", status: "success" });
};
return (
<Box>
<Box margin={"0 auto"} display="block" mt={5}>
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
value={"notUrgent"}
style={{ color: "green", fontWeight: "bold" }}
>
Not Urgent
</option>
<option
value={"urgent"}
style={{ color: "yellow", fontWeight: "bold" }}
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
onClick={() => handleEventCreate()}
disabled={title.length < 1 || description.length < 1 || isLoading}
colorScheme="teal"
variant="solid"
>
Add
</Button>
</Stack>
</Box>
</Box>
);
};
export default AddEvent;