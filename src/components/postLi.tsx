import { FunctionComponent } from 'react'
import Link from 'next/link'
import { Tags } from './tags'
import { Date } from './date'
import { PostSummary } from '../../types/post'
import layoutStyles from '../components/layout.module.css'
import utilStyles from '../styles/utils.module.css'

interface Props {
  post: PostSummary
  key: string
}

export const PostLi: FunctionComponent<Props> = ({ post, key }) => (
  <li className={utilStyles.listItem} key={key}>
    <Link href={`/posts/${post.id}`}>{post.title}</Link>
    <br />
    <Tags
      tags={post.tags}
      key={key}
      className={layoutStyles.tags}
      tagClassName={layoutStyles.tagPostSummary}
    />
    <small className={utilStyles.lightText}>
      <Date dateStr={post.date} />
    </small>
  </li>
)
