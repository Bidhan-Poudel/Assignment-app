"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useAuthStore } from "@/store/authStore";
import api from "@/lib/api";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const registerSchema = loginSchema.extend({
  name: z.string().min(2, "Name must be at least 2 characters"),
});

export default function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [globalError, setGlobalError] = useState("");
  const login = useAuthStore((state) => state.login);
  const user = useAuthStore((state) => state.user);
  const router = useRouter();

  const currentSchema = isLogin ? loginSchema : registerSchema;

  useEffect(() => {
    if (user) {
      router.push('/dashboard');
    }
  }, [user, router]);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<any>({
    resolver: zodResolver(currentSchema),
  });

  const onSubmit = async (data: any) => {
    setGlobalError("");
    try {
      const endpoint = isLogin ? "/auth/login" : "/auth/register";
      const res = await api.post(endpoint, data);
      login(res.data.token, res.data.user);
      router.push('/dashboard');
    } catch (err: any) {
      setGlobalError(err.response?.data?.error || "An error occurred");
    }
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    reset();
    setGlobalError("");
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.loginCard}>
        <h1 className={styles.title}>{isLogin ? "Welcome Back" : "Create Account"}</h1>
        <p className={styles.subtitle}>
          {isLogin
            ? "Enter your credentials to access your portal"
            : "Sign up to start saving your favorite properties"}
        </p>

        {globalError && <div style={{ color: "var(--danger)", marginBottom: "1rem", textAlign: "center", fontSize: "0.9rem", padding: "0.5rem", backgroundColor: "rgba(239,68,68,0.1)", borderRadius: "6px" }}>{globalError}</div>}

        <form onSubmit={handleSubmit(onSubmit)}>
          {!isLogin && (
            <div className={styles.formGroup}>
              <label className={styles.label}>Full Name</label>
              <input
                {...register("name")}
                className={styles.input}
                placeholder="John Doe"
              />
              {errors.name && <span className={styles.error}>{errors.name.message as string}</span>}
            </div>
          )}

          <div className={styles.formGroup}>
            <label className={styles.label}>Email Address</label>
            <input
              {...register("email")}
              className={styles.input}
              placeholder="you@example.com"
              type="email"
            />
            {errors.email && <span className={styles.error}>{errors.email.message as string}</span>}
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Password</label>
            <input
              {...register("password")}
              className={styles.input}
              placeholder="••••••••"
              type="password"
            />
            {errors.password && <span className={styles.error}>{errors.password.message as string}</span>}
          </div>

          <button type="submit" className={styles.button} disabled={isSubmitting}>
            {isSubmitting ? "Processing..." : isLogin ? "Sign In" : "Sign Up"}
          </button>
        </form>

        <div className={styles.toggle}>
          {isLogin ? "Don't have an account?" : "Already have an account?"}
          <span className={styles.toggleLink} onClick={toggleMode}>
            {isLogin ? "Sign up" : "Sign in"}
          </span>
        </div>
      </div>
    </div>
  );
}
