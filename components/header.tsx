import { FunctionComponent } from 'react'
import utilStyles from '../styles/utils.module.css'

export const HeaderProfile: FunctionComponent = () => (
  <header className={utilStyles.headingMd}>
    <p>ども</p>
    <p>
      (This is a sample website - you’ll be building a site like this on{' '}
      <a href="https://nextjs.org/learn">our Next.js tutorial</a>)
    </p>
  </header>
)
