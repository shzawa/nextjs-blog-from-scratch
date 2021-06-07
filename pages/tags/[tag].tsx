import { GetStaticProps } from 'next';
import { ParsedUrlQuery } from 'querystring';
import { TagBtn } from '../../components/button';
import { getSortedPosts, filterPostsByTag } from '../../lib/posts';
import { PostSummary } from '../../lib/post';

interface Props {
  posts: PostSummary[]
}

interface Params extends ParsedUrlQuery {
  tag: string
}

export const getStaticProps: GetStaticProps<Props, Params> = async ({ params: { tag } }) => {
  const allPosts = getSortedPosts()
  const posts = filterPostsByTag(allPosts, tag)
  return {
    props: {
      posts
    }
  }
}

const TagListPage = () => (
  <TagBtn>aaaas</TagBtn>
)

export default TagListPage