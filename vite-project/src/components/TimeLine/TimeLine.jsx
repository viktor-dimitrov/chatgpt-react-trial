
import styles from './TimeLine.module.css'

export default function TimeLine({ role, time }) {


    return (
        <div className={styles["line"]}>
            <p>&nbsp;{time.date}&nbsp;</p>
            <p className={styles[`${role}`]} ></p>
            <p>{time.hour}</p>
        </div>
    )

}