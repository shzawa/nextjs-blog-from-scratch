import { ReactNode, FunctionComponent } from 'react'
import Link from 'next/link'
import { NextRouter } from 'next/router'
import styles from './layout.module.css'

export const BackToPreviousBtn: FunctionComponent<{ router: NextRouter }> = ({
  router,
}) => (
  <a onClick={() => router.back()} className={styles.backToHome}>
    ← Back
  </a>
)

export const BackToPostsBtn: FunctionComponent = () => (
  <Link href="/posts">
    <a className={styles.backToHome}>← Back to Posts</a>
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
