import { FunctionComponent, ReactNode } from 'react'
import Head from 'next/head'
import { siteTitle } from './layouts/Template'

interface Props {
  children: ReactNode
}

// tips: https://github.com/vercel/next.js/issues/5964
export const TitleWithSiteTitle: FunctionComponent<Props> = ({ children }) => (
  <Head>
    <title>
      {children} - {siteTitle}
    </title>
  </Head>
)
