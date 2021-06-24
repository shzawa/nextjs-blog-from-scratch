import { FunctionComponent, ReactNode } from 'react'
import Head from 'next/head'
import styled from 'styled-components'
import { NextRouter } from 'next/router'
// import { HeadDefault } from '../../head'
import { TitleWithSiteTitle } from '../../title'
import { HeaderProfile } from '../../header'
import { BackToPostsBtn, BackToPreviousBtn } from '../../button'
import styles from './layout.module.css'

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

const StyledContainer = styled.div`
  .container {
    max-width: 36rem;
    padding: 0 1rem;
    margin: 3rem auto 6rem;
  }
`
