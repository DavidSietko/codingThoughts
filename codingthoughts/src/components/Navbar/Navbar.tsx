import styles from "./Navbar.module.css";
import Image from 'next/image';

export default function Navbar() {
    let list: string[] = ["login", "signup", "About", "Settings"];
    return (
        <div className={styles.container}>
            <div className={styles.left}>
                <Image className={styles.logo} src="/logo/lightbulb_logo1.png" width={100} height={100} alt="LOGO"></Image>
                <a href="/">Home</a>
            </div>
            <div className={styles.tags}>
                {list.map((item, index) => (
                    <div className={styles.tag}>
                        <div className={styles.vl}></div>
                        <a href={`/${item}`} key={index}>{item}</a>
                    </div>
                ))}
            </div>
        </div>
    );
}