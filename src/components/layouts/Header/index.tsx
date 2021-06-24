import { FunctionComponent } from 'react'
import Link from 'next/link'
import styled from 'styled-components'
import { site } from '../../../constants/site'

export const Header: FunctionComponent = () => (
  <StyledHeader>
    <StyledH2>
      <Link href="/">
        <a color={`inherit`}>{site.name}</a>
      </Link>
    </StyledH2>
  </StyledHeader>
)

const StyledHeader = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const StyledH2 = styled.h2`
  font-size: 1.5rem;
  line-height: 1.4;
  margin: 1rem 0;
`
