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
    import { deleteMemo, toggleMemoUrgency } from "../api/memo";
    const MemoList = () => {
    const [memos, setMemos] = React.useState([]);
    const { user } = useAuth();
    const toast = useToast();
    
    useEffect(() => {
        const refreshData = () => {
            if (!user) {
            setMemos([]);
            return;
            }
            const q = query(collection(db, "memo"), where("user", "==", user.uid));
            onSnapshot(q, (querySnapchot) => {
            let ar = [];
            querySnapchot.docs.forEach((doc) => {
            ar.push({ id: doc.id, ...doc.data() });
            });
            setMemos(ar);
            });
            };
    refreshData();}, [user]);
    const handleMemoDelete = async (id) => {
    if (confirm("Are you sure you wanna delete this memo?")) {
    deleteMemo(id);
    toast({ title: "Memo deleted successfully", status: "success" });
    }
    };
 
    return (
    <Box maxW="50%">
    <Heading size="sm">Memo List:</Heading>
    <Box mt={5}>
    <SimpleGrid columns={1} spacing={8}>
    {memos &&
    memos.map((memo) => (
    <Box
    key={memo.id}
    p={3}
    boxShadow="2xl"
    shadow={"dark-lg"}
    transition="0.2s"
    _hover={{ boxShadow: "sm" }}
    >
    <Heading as="h3" fontSize={"xl"}>
    <Link key={memo.id} href={`/memo/${memo.id}`}>{memo.title}</Link>{" "}
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
    onClick={() => handleMemoDelete(memo.id)}
    >
    <FaTrash />
    </Badge>
    
    <Badge
    float="right"
    opacity="0.8"
    bg={memo.urgency == "normal" ? "green.500" : memo.urgency == "urgent" ? "yellow.500" : "red.500"}
    >
    {memo.urgency}
    </Badge>
    </Heading>
    <Text>{memo.description}</Text>
    </Box>
    ))}
    </SimpleGrid>
    </Box>
    </Box>
    );
    };
    export default MemoList;