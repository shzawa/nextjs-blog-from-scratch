import { FunctionComponent } from 'react'

interface Props {
  content: string
}

export const Article: FunctionComponent<Props> = ({ content }) => (
  <article>{content}</article>
)
