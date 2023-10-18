import { db } from "../firebase";
import {
collection,
addDoc,
doc,
deleteDoc,
} from "firebase/firestore";
const addContact = async ({ userId, name, phoneNumber, phoneNumber2, email, notes }) => {
    console.log("anything");
try {
await addDoc(collection(db, "contact"), {
user: userId,
name: name,
phoneNumber: phoneNumber,
phoneNumber2: phoneNumber2,
email: email,
notes: notes,
createdAt: new Date().getTime(),
});
console.log("Document written with ID: ", docRef.id);
} catch (err) {
    console.log("testing");
}

};
const deleteContact = async (docId) => {
try {
const todoRef = doc(db, "contact", docId);
await deleteDoc(todoRef);
} catch (err) {
console.log(err);
}
};
export { addContact, deleteContact };