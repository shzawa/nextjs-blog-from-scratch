import { FunctionComponent, ReactNode } from 'react'
import Head from 'next/head'
import styled from 'styled-components'
import { NextRouter } from 'next/router'
// import { HeadDefault } from '../../head'
import { TitleWithSiteTitle } from '../../title'
import { HeaderProfile } from '../../header'
import { BackToPostsBtn, BackToPreviousBtn } from '../../button'
import styles from './layout.module.css'
import { site } from '../../../constants/site'
import { Header } from '../Header/index'

export const siteTitle = 'Fragment'

interface Props {
  children: ReactNode
  title: string
}

interface HomeProps {
  children: ReactNode
}

interface PostProps extends Props {
  router?: NextRouter
}

export const Container: FunctionComponent = ({ children }) => (
  <StyledContainer>{children}</StyledContainer>
)

export const PostsPageLayout: FunctionComponent<HomeProps> = ({ children }) => (
  <Container>
    <TitleWithSiteTitle>Posts</TitleWithSiteTitle>
    <main>{children}</main>
  </Container>
)

export const AboutPageLayout: FunctionComponent<HomeProps> = ({ children }) => (
  <Container>
    <Head>
      <title>{siteTitle}</title>
    </Head>
    <HeaderProfile />
    <main>{children}</main>
  </Container>
)

export const PostPageLayout: FunctionComponent<PostProps> = ({
  children,
  title,
  router,
}) => (
  <Container>
    <TitleWithSiteTitle>{title}</TitleWithSiteTitle>
    <main>{children}</main>
    <div className={styles.backToHome}>
      <BackToPreviousBtn router={router} />
    </div>
  </Container>
)

export const TagPageLayout: FunctionComponent<Props> = ({
  children,
  title,
}) => (
  <Container>
    <TitleWithSiteTitle>{title}</TitleWithSiteTitle>
    <main>{children}</main>
    <div className={styles.backToHome}>
      <BackToPostsBtn />
    </div>
  </Container>
)

export const ErrorPageLayout: FunctionComponent<Props> = ({
  children,
  title,
}) => (
  <Container>
    <TitleWithSiteTitle>{title}</TitleWithSiteTitle>
    <main>{children}</main>
    <div className={styles.backToHome}>
      <BackToPostsBtn />
    </div>
  </Container>
)

interface TemplateProps {
  title: string
  description: string
}

export const Template: FunctionComponent<TemplateProps> = ({
  children,
  title,
  description,
}) => (
  <>
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />

      <meta charSet="utf-8" />
      <meta
        name="viewport"
        content="width=device-width, height=device-height, minimum-scale=1.0, initial-scale=1.0"
      />

      <meta name="og:title" content={site.name} />
      <meta
        property="og:image"
        content={`https://og-image.now.sh/${encodeURI(
          site.name,
        )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.zeit.co%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
      />
      <meta property="og:site_name" content={site.name} />
      <meta property="og:locale" content="ja_JP" />

      <meta name="twitter:title" content={title} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:creator" content="@tk_zawa" />
    </Head>
    <Container>
      <Header />
      <main>{children}</main>
    </Container>
  </>
)

const StyledContainer = styled.div`
  max-width: 36rem;
  padding: 0 1rem;
  margin: 3rem auto 6rem;
`
