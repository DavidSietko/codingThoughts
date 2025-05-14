"use client";

import Image from "next/image";
import styles from "./page.module.css";
import { useRouter } from "next/navigation";
import ParticlesBackground from "@/components/background/ParticlesBackground";
import { checkAuth } from "./lib/auth";

export default function Home() {
  //router to change route

  const router = useRouter();

  // function for button to go to main page if logged in, else to login page if not
  const go = async() => {
    try {
      await checkAuth();
      router.push("/main");
    } catch(error: any) {
      router.push("/login");
    }
  }

  return (
    <div className={styles.container}>
      <ParticlesBackground />
      <div className={styles.contentContainer}>
        <header className={styles.title}>CODING THOUGHTS</header>
        <hr></hr>
        <span className={styles.subtitle}>A place to store your boundless coding thoughts</span>
        <button className={styles.button} onClick={go}>EXPLORE</button>
      </div>
    </div>
  );
}
