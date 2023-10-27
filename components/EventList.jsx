import {
    Badge,
    Box,
    Heading,
    SimpleGrid,
    Text,
    useToast,
    } from "@chakra-ui/react";
    import Link from "next/link";
    import React, { useEffect } from "react";
    import useAuth from "../hooks/useAuth";
    import { collection, onSnapshot, query, where } from "firebase/firestore";
    import { db } from "../firebase";
    import { FaTrash } from "react-icons/fa";
    import { deleteEvent, toggleEventUrgency } from "../api/event";
    const EventList = () => {
    const [events, setEvents] = React.useState([]);
    const { user } = useAuth();
    const toast = useToast();
    
    useEffect(() => {
        const refreshData = () => {
            if (!user) {
            setEvents([]);
            return;
            }
            const q = query(collection(db, "event"), where("user", "==", user.uid));
            onSnapshot(q, (querySnapchot) => {
            let ar = [];
            querySnapchot.docs.forEach((doc) => {
            ar.push({ id: doc.id, ...doc.data() });
            });
            setEvents(ar);
            });
            };
    refreshData();}, [user]);
    const handleEventDelete = async (id) => {
    if (confirm("Are you sure you wanna delete this event?")) {
    deleteEvent(id);
    toast({ title: "Event deleted successfully", status: "success" });
    }
    };

    //{memo.urgency == "notUrgent" ? "green.500" : memo.urgency == "urgent" ? "yellow.500" : "red.500"}

    const handleToggle = async (id, urgency) => {
        const newUrgency = urgency == "notUrgent" ? "urgent" : urgency == "urgent" ? "asap" : "notUrgent";

        await toggleEventUrgency({ docId: id, urgency: newUrgency });
        toast({
        title: `Event marked ${newUrgency}`,
        status: newUrgency == "notUrgent" ? "success" : newUrgency == "urgent" ? "warning" : "error"
        });
        };
 
    return (
    <Box>
    <Box mt={5} me={8}>
    <SimpleGrid columns={1} spacing={8}>
    {events &&
    events.map((event) => (
    <Box
    key={event.id}
    p={3}
    boxShadow="2xl"
    shadow={"dark-lg"}
    transition="0.2s"
    _hover={{ boxShadow: "sm" }}
    >
    <Heading as="h3" fontSize={"xl"}>
    <Link key={event.id} href={`/event/${event.id}`}>{event.title}</Link>{" "}
    <Badge
    color="red.500"
    bg="inherit"
    transition={"0.2s"}
    _hover={{
    bg: "inherit",
    transform: "scale(1.2)",
    }}
    float="right"
    size="xs"
    onClick={() => handleEventDelete(event.id)}
    >
    <FaTrash />
    </Badge>
    
    <Badge
    className="cursor"
    float="right"
    opacity="0.8"
    bg={event.urgency == "notUrgent" ? "green.500" : event.urgency == "urgent" ? "yellow.500" : "red.500"}
    onClick={() => handleToggle(event.id, event.urgency)}
    >
    {event.urgency}
    </Badge>
    </Heading>
    <Text>{event.description}</Text>
    </Box>
    ))}
    </SimpleGrid>
    </Box>
    </Box>
    );
    };
    export default EventList;