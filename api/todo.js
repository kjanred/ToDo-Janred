import { db } from "../firebase";
import {
collection,
addDoc,
updateDoc,
doc,
deleteDoc,
} from "firebase/firestore";
const addTodo = async ({ userId, title, description, status }) => {
    console.log("anything");
try {
await addDoc(collection(db, "todo"), {
user: userId,
title: title,
description: description,
status: status,
createdAt: new Date().getTime(),
});
console.log("Document written with ID: ", docRef.id);
} catch (err) {
    console.log("testing");
}

};
const toggleTodoStatus = async ({ docId, status }) => {
try {
const todoRef = doc(db, "todo", docId);
await updateDoc(todoRef, {
status,
});
} catch (err) {
console.log(err);
}
};
const deleteTodo = async (docId) => {
try {
const todoRef = doc(db, "todo", docId);
await deleteDoc(todoRef);
} catch (err) {
console.log(err);
}
};
export { addTodo, toggleTodoStatus, deleteTodo };