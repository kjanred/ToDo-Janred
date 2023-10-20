import { db } from "../firebase";
import {
collection,
addDoc,
updateDoc,
doc,
deleteDoc,
} from "firebase/firestore";
const addEvent = async ({ userId, title, description, urgency }) => {
    console.log("anything");
try {
await addDoc(collection(db, "event"), {
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
const toggleEventUrgency = async ({ docId, urgency }) => {
try {
const todoRef = doc(db, "event", docId);
await updateDoc(todoRef, {
urgency,
});
} catch (err) {
console.log(err);
}
};
const deleteEvent = async (docId) => {
try {
const todoRef = doc(db, "event", docId);
await deleteDoc(todoRef);
} catch (err) {
console.log(err);
}
};
export { addEvent, toggleEventUrgency, deleteEvent };