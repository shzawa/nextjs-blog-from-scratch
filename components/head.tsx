import HeadField from "next/head"
import Link from "next/link"
import styles from "./layout.module.css"
import utilStyles from "../styles/utils.module.css"
import { siteTitle } from './layout'

export function DefaultHead() {
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
        <h2 className={utilStyles.headingLg}>
          <Link href="/">
            <a className={utilStyles.colorInherit}>{siteTitle}</a>
          </Link>
        </h2>
      </header>
    </>
  )
}