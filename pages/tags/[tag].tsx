import { GetStaticPropsResult, GetStaticProps } from 'next';
import { TagBtn } from '../../components/button';
import { getSortedPostsData, filterPostsByTag } from '../../lib/posts';
import { PostSummary } from '../../lib/post';
import { isStringObject } from 'util/types';

export const getStaticProps: GetStaticProps = async ({ params: { tag } }) => {
  const posts = getSortedPostsData()
  const foundPosts = filterPostsByTag(posts, isStringObject(tag) ? tag : '')
  return {
    props: {
      foundPosts
    }
  }
}

const TagListPage = () => (
  <TagBtn>aaaas</TagBtn>
)

export default TagListPage