import { DefaultHead } from './head'
import { BackToHomeBtn } from './button'
import styles from "./layout.module.css"

export const siteTitle = "Next.js Sample Website"

function Container({ children }) {
  return (
    <div className={styles.container}>
      <DefaultHead />
      {children}
    </div>
  )
}

export function HomeLayout({ children }) {
  return (
    <Container>
      <main>{children}</main>
    </Container>
  )
}

export function PostLayout({ children }) {
  return (
    <Container>
      <main>{children}</main>
      <div className={styles.backToHome}>
        <BackToHomeBtn />
      </div>
    </Container>
  )
}

export function ErrorLayout({ children }) {
  return (
    <Container>
      <main>{children}</main>
      <div className={styles.backToHome}>
        <BackToHomeBtn />
      </div>
    </Container>
  )
}