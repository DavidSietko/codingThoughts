"use client";

import LoginForm from '@/components/form/LoginForm';
import styles from "./page.module.css";

export default function Home() {
    return (
        <div className={styles.container}>
            <LoginForm/>
        </div>
    );
}