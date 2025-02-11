"use client"

import React from 'react'
import { useState } from 'react'

const url = "http://localhost:3000/auth";

// form to login/signup user, differentiate using "type" prop
const AuthForm = ({ type }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [token, setToken] = useState(localStorage.getItem("token") || "");

    const handleRegister = async () => {
        try {
            // send request to the server
            const response = await fetch(`${url}/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password })
            });

            // result
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error)
            }

            alert(data.message);

        } catch (error) {
            alert(error.message);
        }
    }

    const handleLogin = async () => {
        try {
            // send request to server
            const response = await fetch(`${url}/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password })
            });

            // result
            const data = await response.json()

            if (!response.ok) {
                throw new Error(data.error)
            }

            // store users auth token in local storage
            setToken(data.token);
            localStorage.setItem("token", data.token);
            alert(data.message)

        } catch (error) {
            alert(error.message);
        }
    }

    const handleLogout = () => {
        setToken("");
        localStorage.removeItem("token");
        alert("Logged Out");
    };

    return (
        <div>
            <h1>
                {type = "login" ? "Login" : "Register"}
            </h1>

            {/* Email */}
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />

            {/* Password */}
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className=""
            />

            {/* Login/Register Button */}
            <button
                onClick={type === "login" ? handleLogin : handleRegister}
                className=""
            >
                {type === "login" ? "Login" : "Register"}
            </button>

            {/* Logout Button (only shown when logged in) */}
            {token && (
                <button
                    onClick={handleLogout}
                    className=""
                >
                    Logout
                </button>
            )}

        </div>
    )
}

export default AuthForm
