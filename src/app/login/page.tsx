"use client";

import React, { useState } from "react";
import axios from "axios";
import styles from "./login.module.scss";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface StrapiLoginResponse {
  jwt: string;
  user: {
    id: number;
    username: string;
    email: string;
  };
}

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const router = useRouter(); // ✅ HOOKS MUST BE HERE

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await axios.post<StrapiLoginResponse>(
        "http://localhost:1337/api/auth/local",
        {
          identifier: email,
          password,
        }
      );

      // ✅ Store user and token
      localStorage.setItem("token", res.data.jwt);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      // ✅ Show welcome message
      setMessage(`Welcome, ${res.data.user.username}!`);

      // ✅ Redirect to homepage
      router.push("/");
    } catch (error: any) {
      setMessage(error?.response?.data?.error?.message || "Login failed.");
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Login</h2>
      <form onSubmit={handleLogin} className={styles.form}>
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
        <button type="submit" className={styles.button}>
          Login
        </button>
      </form>

      {message && <p className={styles.message}>{message}</p>}

      <p className={styles.signup}>
        Don't have an account? <Link href="/signup">Sign up here</Link>
      </p>
    </div>
  );
};

export default Login;
