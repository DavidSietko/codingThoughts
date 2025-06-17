import styles from "./Navbar.module.css";
import Image from 'next/image';

export default function Navbar() {
    let list: string[] = ["main", "login", "signup", "Settings"];
    return (
        <div className={styles.container}>
            <div className={styles.left}>
                <Image className={styles.logo} src="/logo/lightbulb_logo.svg" width={100} height={100} alt="LOGO"></Image>
                <a href="/">Home</a>
            </div>
            <div className={styles.tags}>
                {list.map((item, index) => (
                    <div className={styles.tag} key={index}>
                        <div className={styles.vl}></div>
                        <a href={`/${item}`}>{item}</a>
                    </div>
                ))}
            </div>
        </div>
    );
}