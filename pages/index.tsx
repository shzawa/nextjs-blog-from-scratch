import { FunctionComponent } from 'react'
import Link from 'next/link'
import { AboutPageLayout } from '../components/layout'

const AboutPage: FunctionComponent = () => (
  <AboutPageLayout>
    <Link href="/posts">TOP</Link>
  </AboutPageLayout>
)

export default AboutPage
