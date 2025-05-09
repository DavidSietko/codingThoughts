import styles from "./Navbar.module.css";

export default function Navbar() {
    let list: string[] = ["login", "signup", "About", "Settings"];
    return (
        <div className={styles.container}>
            <a id={styles.homeTag} href="">Home</a>
            <div className={styles.tags}>
                {list.map((item, index) => (
                    <a href={`/${item}`} key={index}>{item}</a>
                ))}
            </div>
        </div>
    );
}