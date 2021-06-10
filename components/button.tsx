import { ReactNode, FunctionComponent } from 'react'
import Link from 'next/link'
import styles from './layout.module.css'

export const BackToHomeBtn: FunctionComponent = () => (
  <Link href="/">
    <a className={styles.backToHome}>← Back to home</a>
  </Link>
)

export const TagBtn: FunctionComponent<{
  children: ReactNode
  className?: string
}> = ({ children, className }) => (
  <Link href={`/tags/${children}`}>
    <a className={className}>{children}</a>
  </Link>
)
