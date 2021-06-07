export interface PostMetaData {
  date: string,
  title: string,
  tags: string[]
}

export interface PostSummary extends PostMetaData {
  id: string
}

export interface PostDetail extends PostMetaData {
  id: string,
  content: string
}
