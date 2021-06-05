import HeadField from "next/head"
import Link from "next/link"
import styles from "./layout.module.css"
import utilStyles from "../styles/utils.module.css"

const name = "Shotaro Ozawa"
export const siteTitle = "Next.js Sample Website"

function DefaultHead() {
  return (
    <>
      <HeadField>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="description"
          content="Learn how to build a personal website using Next.js"
        />
        <meta
          property="og:image"
          content={`https://og-image.now.sh/${encodeURI(
            siteTitle
          )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.zeit.co%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
        />
        <meta name="og:title" content={siteTitle} />
        <meta name="twitter:card" content="summary_large_image" />
      </HeadField>
      <header className={styles.header}>
        <img
          src="/images/profile.jpg"
          className={`${styles.headerImage} ${utilStyles.borderCircle}`}
          alt={name}
        />
        <h2 className={utilStyles.headingLg}>
          <Link href="/">
            <a className={utilStyles.colorInherit}>{name}</a>
          </Link>
        </h2>
      </header>
    </>
  )
}

function Container({ children }) {
  return <div className={styles.container}>{children}</div>
}

export function HomeLayout({ children }) {
  return (
    <Container>
      <DefaultHead />
      <main>{children}</main>
    </Container>
  )
}

export function PostLayout({ children }) {
  return (
    <Container>
      <DefaultHead />
      <main>{children}</main>
      <div className={styles.backToHome}>
        <Link href="/">
          <a>← Back to home</a>
        </Link>
      </div>
    </Container>
  )
}

export function ErrorLayout({ children }) {
  return (
    <Container>
      <DefaultHead />
      <main>{children}</main>
      <div className={styles.backToHome}>
        <Link href="/">
          <a>← Back to home</a>
        </Link>
      </div>
    </Container>
  )
}