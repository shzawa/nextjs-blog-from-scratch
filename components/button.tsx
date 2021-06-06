import { ReactNode } from "react"
import Link from "next/link"
import styles from "./layout.module.css"

export const BackToHomeBtn = () => (
  <Link href="/">
    <a className={styles.backToHome}>
      ← Back to home
    </a>
  </Link>
)

export const TagBtn = (
    { children, className }:
    { children: ReactNode, className?: string}
  ) => (
  <Link href={`/tags/${children}`}>
    <a className={className}>
      {children}
    </a>
  </Link>
)
