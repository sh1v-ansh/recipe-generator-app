<template>
<button @click="handleLogin" class="btn-login">
    Log In with Google
</button>
</template>

<script>
import { auth, provider, signInWithPopup } from "../firebaseConfig";

export default {
name: "LoginButton",
methods: {
    async handleLogin() {
    try {
        const result = await signInWithPopup(auth, provider);
        const user = result.user;
        console.log("User logged in:", user);

        const token = await user.getIdToken();
        console.log("User token:", token);

        // await fetch("http:localhost:3000/api/auth", {
        // method: "POST",
        // headers: { "Content-Type": "application/json" },
        // body: JSON.stringify({ token }),
        // });
    } catch (error) {
        console.error("Login failed:", error);
    }
    },
},
};
</script>

<style scoped>
    .btn-login {
    padding: 10px 20px;
    background-color: #4285f4;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    }

    .btn-login:hover {
    background-color: #357ae8;
    }
</style>
