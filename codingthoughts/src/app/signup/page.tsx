"use client";

import SignupForm from "@/components/form/SignupForm";
import styles from "@/app/login/page.module.css";

export default function Home() {
    return (
        <div className={styles.container}>
            <SignupForm/>
        </div>
    );
}