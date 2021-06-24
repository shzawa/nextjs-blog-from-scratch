import { FunctionComponent } from 'react'
import { TagBtn } from './button'

export const Tags: FunctionComponent<{
  tags: string[]
  key: string
  className?: string
  tagClassName?: string
}> = ({ tags, key, className, tagClassName }) => (
  <ul className={className}>
    {tags.map((tag) => (
      <li key={`${String(key).replace(/_/g, '-')}_${tag}`}>
        <TagBtn className={tagClassName}>{tag}</TagBtn>
      </li>
    ))}
  </ul>
)
