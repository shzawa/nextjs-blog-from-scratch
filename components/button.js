import Link from "next/link"
import styles from "./layout.module.css"

export function BackToHomeBtn() {
  return (
    <div className={styles.backToHome}>
      <Link href="/">← Back to home</Link>
    </div>
  )
}