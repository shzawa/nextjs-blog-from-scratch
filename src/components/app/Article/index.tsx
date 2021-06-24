import { FunctionComponent } from 'react'
import { ArticleHeader } from './Header'

interface Props {
  id: string
  title: string
  tags: string[]
  date: string
  content: string
}

export const Article: FunctionComponent<Props> = ({
  id,
  title,
  tags,
  date,
  content,
}) => (
  <article>
    <ArticleHeader id={id} title={title} tags={tags} date={date} />
    {content}
  </article>
)
