import { db } from "../firebase";
import {
collection,
addDoc,
updateDoc,
doc,
deleteDoc,
} from "firebase/firestore";
const addMemo = async ({ userId, title, description, urgency }) => {
    console.log("anything");
try {
await addDoc(collection(db, "memo"), {
user: userId,
title: title,
description: description,
urgency: urgency,
createdAt: new Date().getTime(),
});
console.log("Document written with ID: ", docRef.id);
} catch (err) {
    console.log("testing");
}

};
const toggleMemoUrgency = async ({ docId, urgency }) => {
try {
const todoRef = doc(db, "memo", docId);
await updateDoc(todoRef, {
urgency,
});
} catch (err) {
console.log(err);
}
};
const deleteMemo = async (docId) => {
try {
const todoRef = doc(db, "memo", docId);
await deleteDoc(todoRef);
} catch (err) {
console.log(err);
}
};
export { addMemo, toggleMemoUrgency, deleteMemo };