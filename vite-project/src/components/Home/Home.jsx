import Navigation from "../Navigation/Navigation"

import styles from "./Home.module.css";

export default function Home () {


    return (

        <div className={styles['home']}>
        <h1>Welcome</h1>
        <Navigation/>
        </div>

    )
}