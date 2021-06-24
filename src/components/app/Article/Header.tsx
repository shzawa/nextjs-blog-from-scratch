import { FunctionComponent } from 'react'
import Link from 'next/link'
import styled from 'styled-components'
import { parseISO, format } from 'date-fns'

interface HeaderProps {
  id: string
  title: string
  tags: string[]
  date: string
}

export const ArticleHeader: FunctionComponent<HeaderProps> = ({
  id,
  title,
  tags,
  date,
}) => (
  <header>
    <Title>{title}</Title>
    <Tags postId={id} tags={tags} />
    <Time dateTime={date}>{format(parseISO(date), 'd, LLLL, yyyy')}</Time>
  </header>
)

interface TagsProps {
  postId: string
  tags: string[]
}

const Tags: FunctionComponent<TagsProps> = ({ tags, postId }) => (
  <TagUl>
    {tags.map((tag) => (
      <li key={`${String(postId).replace(/_/g, '-')}_${tag}`}>
        <Link href={`/tags/${tag}`}>
          <TagA>{tag}</TagA>
        </Link>
      </li>
    ))}
  </TagUl>
)

const Title = styled.h1`
  font-size: 2rem;
  line-height: 1.3;
  font-weight: 800;
  letter-spacing: -0.05rem;
  margin: 1rem 0;
`

const Time = styled.time`
  color: #999;
`

const TagUl = styled.ul`
  list-style: none;
  display: flex;
  padding-inline-start: 0px;
`

const TagA = styled.a`
  font-size: 1.1rem;
  padding: 0.4rem;
  border-radius: 4px;
  color: #333;
  background-color: #eee;
`
