import styles from "./Navbar.module.css";

export default function Navbar() {
    let list: string[] = ["Login", "Signup", "About", "Settings"];
    return (
        <div className={styles.container}>
            <a href="">Home</a>
            <ul>
                {list.map((item, index) => (
                    <a href={`/${item}`} key={index}>{item}</a>
                ))}
            </ul>
        </div>
    );
}