import React from "react";
import { Box, Button, Link, Text, useColorMode, Heading, SimpleGrid } from "@chakra-ui/react";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { FaGoogle, FaMoon, FaSun } from "react-icons/fa";
import { auth } from "../firebase";
import useAuth from "../hooks/useAuth";
const Auth = () => {
const { toggleColorMode, colorMode } = useColorMode();
const { isLoggedIn, user } = useAuth();
const handleAuth = async () => {
const provider = new GoogleAuthProvider();
signInWithPopup(auth, provider)
.then((result) => {
// This gives you a Google Access Token. You can use it to access the Google API.
const credential = GoogleAuthProvider.credentialFromResult(result);
const token = credential.accessToken;
// The signed-in user info.
const user = result.user;
// ...
})
.catch((error) => {
// Handle Errors here.
const errorCode = error.code;
const errorMessage = error.message;
// The email of the user's account used.
const email = error.customData.email;
// The AuthCredential type that was used.
const credential = GoogleAuthProvider.credentialFromError(error);
// ...
});
};
return (
<Box mt={5} display={{base: "block", md: "flex"}} alignItems="center" justifyContent="space-between">
    <Box>
    <Link className='homeLink'>
     <Heading size='2xl' fontFamily={'"Century Gothic", sans-serif'} letterSpacing={'5px'} textTransform={'uppercase'} textAlign={'center'} fontWeight={'normal'} textShadow='3px 3px 5px #808080' m='6'>EasyNotes</Heading>
     </Link>
    </Box>
    <SimpleGrid columns={2} hideFrom='md'>
    <Box><Button onClick={() => toggleColorMode()}>
    {colorMode == "dark" ? <FaSun /> : <FaMoon />}
    </Button>{" "}</Box>
    <Box>
    {isLoggedIn && (
    <>
    <Text color="black.500">{user.email}</Text>
    <Link color="red.500" onClick={() => auth.signOut()}>
    Logout
    </Link>
    </>
    )}
    {!isLoggedIn && (
    <Button leftIcon={<FaGoogle />} onClick={() => handleAuth()}>
    Login with Google
    </Button>
    )}  
    </Box>
    </SimpleGrid>

    <Box mx={3} hideBelow='md'>
    <Button onClick={() => toggleColorMode()}>
    {colorMode == "dark" ? <FaSun /> : <FaMoon />}
    </Button>{" "}
    {isLoggedIn && (
    <>
    <Text color="black.500">{user.email}</Text>
    <Link color="red.500" onClick={() => auth.signOut()}>
    Logout
    </Link>
    </>
    )}
    {!isLoggedIn && (
    <Button leftIcon={<FaGoogle />} onClick={() => handleAuth()}>
    Login with Google
    </Button>
    )}
    </Box>

</Box>
);
};
export default Auth;