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
    import { FaToggleOff, FaToggleOn, FaTrash } from "react-icons/fa";
    import { deleteMemo, toggleMemoStatus } from "../api/memo";
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
    const handleToggle = async (id, status) => {
    const newStatus = status == "completed" ? "pending" : "completed";
    await toggleMemoStatus({ docId: id, status: newStatus });
    toast({
    title: `Memo marked ${newStatus}`,
    status: newStatus == "completed" ? "success" : "warning",
    });
    };
    return (
    <Box mt={5}>
    <SimpleGrid columns={{ base: 1, md: 3 }} spacing={8}>
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
    {memo.title}{" "}
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
    color={memo.status == "pending" ? "gray.500" : "green.500"}
    bg="inherit"
    transition={"0.2s"}
    _hover={{
    bg: "inherit",
    transform: "scale(1.2)",
    }}
    float="right"
    size="xs"
    onClick={() => handleToggle(memo.id, memo.urgency)}
    >
    {memo.urgency == "normal" ? <FaToggleOff /> : <FaToggleOn />}
    </Badge>
    <Badge
    float="right"
    opacity="0.8"
    bg={memo.urgency == "urgent" ? "yellow.500" : "green.500"}
    >
    {memo.urgency}
    </Badge>
    </Heading>
    <Text>{memo.description}</Text>
    </Box>
    ))}
    </SimpleGrid>
    </Box>
    );
    };
    export default MemoList;