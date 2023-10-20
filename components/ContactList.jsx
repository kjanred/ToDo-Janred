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
    import { deleteContact } from "../api/contact";
    const ContactList = () => {
    const [contacts, setContacts] = React.useState([]);
    const { user } = useAuth();
    const toast = useToast();
    
    useEffect(() => {
        const refreshData = () => {
            if (!user) {
            setContacts([]);
            return;
            }
            const q = query(collection(db, "contact"), where("user", "==", user.uid));
            onSnapshot(q, (querySnapchot) => {
            let ar = [];
            querySnapchot.docs.forEach((doc) => {
            ar.push({ id: doc.id, ...doc.data() });
            });
            setContacts(ar);
            });
            };
    refreshData();}, [user]);
    const handleContactDelete = async (id) => {
    if (confirm("Are you sure you wanna delete this contact?")) {
    deleteContact(id);
    toast({ title: "Contact deleted successfully", status: "success" });
    }
    };

 
    return (
    <Box>
    <Box mt={5} me={8}>
    <SimpleGrid columns={1} spacing={8}>
    {contacts &&
    contacts.map((contact) => (
    <Box
    key={contact.id}
    p={3}
    boxShadow="2xl"
    shadow={"dark-lg"}
    transition="0.2s"
    _hover={{ boxShadow: "sm" }}
    >
    <Heading as="h3" fontSize={"xl"}>
    <Link key={contact.id} href={`/contact/${contact.id}`}>{contact.name}</Link>{" "}
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
    onClick={() => handleContactDelete(contact.id)}
    >
    <FaTrash />
    </Badge>
    
    </Heading>
    <Text>{contact.phoneNumber}</Text>
    <Text>{contact.phoneNumber2}</Text>
    <Text>{contact.email}</Text>
    <Text>{contact.notes}</Text>
    </Box>
    ))}
    </SimpleGrid>
    </Box>
    </Box>
    );
    };
    export default ContactList;