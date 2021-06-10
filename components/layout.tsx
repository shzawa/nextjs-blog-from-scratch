import { FunctionComponent, ReactNode } from 'react'
import Head from 'next/head'
import { DefaultHead } from './head'
import { BackToHomeBtn, TagBtn } from './button'
import styles from './layout.module.css'
import utilStyles from '../styles/utils.module.css'

export const siteTitle = 'Fragment'

interface Props {
  children: ReactNode
}

const Container: FunctionComponent = ({ children }) => (
  <div className={styles.container}>
    <DefaultHead />
    {children}
  </div>
)

// tips: https://github.com/vercel/next.js/issues/5964
export const TitleWithSiteTitle: FunctionComponent<Props> = ({ children }) => (
  <Head>
    <title>
      {children} - {siteTitle}
    </title>
  </Head>
)

export const HomePageLayout: FunctionComponent<Props> = ({ children }) => (
  <Container>
    <header className={utilStyles.headingMd}>
      <p>ども</p>
      <p>
        (This is a sample website - you’ll be building a site like this on{' '}
        <a href="https://nextjs.org/learn">our Next.js tutorial</a>)
      </p>
    </header>
    <main>{children}</main>
  </Container>
)

export const PostPageLayout: FunctionComponent<Props> = ({ children }) => (
  <Container>
    <main>{children}</main>
    <div className={styles.backToHome}>
      <BackToHomeBtn />
    </div>
  </Container>
)

export const ErrorPageLayout: FunctionComponent<Props> = ({ children }) => (
  <Container>
    <main>{children}</main>
    <div className={styles.backToHome}>
      <BackToHomeBtn />
    </div>
  </Container>
)

export const TagsLayout: FunctionComponent<{
  tags: string[]
  key: string
  className?: string
  tagClassName?: string
}> = ({ tags, key, className, tagClassName }) => (
  <ul className={className}>
    {tags.map((tag) => (
      <li key={`${String(key).replace(/_/g, '-')}_${tag}`}>
        <TagBtn className={tagClassName}>{tag}</TagBtn>
      </li>
    ))}
  </ul>
)
