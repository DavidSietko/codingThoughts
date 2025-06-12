"use client";

import PasswordChangeForm from "@/components/form/PasswordChangeForm";
import styles from "./page.module.css";

export default function Home() {
    return (
        <div className={styles.container}>
            <PasswordChangeForm />
        </div>
    );
}