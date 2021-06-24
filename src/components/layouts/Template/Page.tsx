import { FunctionComponent } from 'react'
import { Container } from './index'
import Head from 'next/head'
import { site } from '../../../constants/site'

interface PageTemplateProps {
  title: string
  description: string
}

export const PageTemplate: FunctionComponent<PageTemplateProps> = ({
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
    <Container>{children}</Container>
  </>
)
