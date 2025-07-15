"use client";

import React, { useState } from "react";
import axios from "axios";
import styles from "./signup.module.scss";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface StrapiRegisterResponse {
  jwt: string;
  user: {
    id: number;
    username: string;
    email: string;
  };
}

const Signup: React.FC = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const router = useRouter();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post<StrapiRegisterResponse>(
        "http://localhost:1337/api/auth/local/register",
        {
          username,
          email,
          password,
        }
      );
      localStorage.setItem("token", res.data.jwt);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      router.push("/");
      setMessage(`Welcome, ${res.data.user.username}!`);
    } catch (error: any) {
      setMessage(error?.response?.data?.error?.message || "Signup failed.");
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Signup</h2>
      <form onSubmit={handleSignup} className={styles.form}>
        <input
          className={styles.input}
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          className={styles.input}
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          className={styles.input}
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button className={styles.button} type="submit">
          Signup
        </button>
      </form>
      <p className={styles.message}>{message}</p>

      {/* Login Link */}
      <p className={styles.login}>
        Already have an account? <Link href="/login">Login here</Link>
      </p>
    </div>
  );
};

export default Signup;
