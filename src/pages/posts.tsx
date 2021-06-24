import { FunctionComponent } from 'react'
import { GetStaticProps } from 'next'
import { useRouter } from 'next/router'
import { PostsPageLayout } from '../components/layout'
import utilStyles from '../styles/utils.module.css'
import { getSortedPosts } from '../lib/posts'
import { PostSummary } from '../../types/post'
import { PostLi } from '../components/postLi'

interface Props {
  posts: PostSummary[]
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const posts = getSortedPosts()
  return {
    props: {
      posts,
    },
    revalidate: 1,
  }
}

const PostsPage: FunctionComponent<Props> = ({ posts }) => {
  const router = useRouter()
  if (router.isFallback) {
    return (
      <PostsPageLayout>
        <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
          <h2 className={utilStyles.headingLg}>Posts</h2>
          Now Loading...
        </section>
      </PostsPageLayout>
    )
  }

  return (
    <PostsPageLayout>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Posts</h2>
        <ul className={utilStyles.list}>
          {posts.map((post) => (
            <PostLi post={post} key={post.id} />
          ))}
        </ul>
      </section>
    </PostsPageLayout>
  )
}

export default PostsPage
