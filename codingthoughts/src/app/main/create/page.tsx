"use client";

import CreateForm from "@/components/form/CreateForm";
import styles from "./page.module.css";

export default function Home() {
    return (
        <div className={styles.container}>
            <CreateForm />
        </div>
    );
}