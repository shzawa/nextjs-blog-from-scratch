export interface PostMetaData {
  date: string,
  title: string
}

export interface PostSummary extends PostMetaData {
  id: string,
}

export interface Posts {
  posts: PostSummary[]
}

export interface PostDetail extends PostMetaData {
  id: string,
  content: string,
}

export interface Post {
  post: PostDetail
}