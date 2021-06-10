import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import type { PostMetaData, PostSummary, PostDetail } from '../types/post'

const postsDirectory = path.join(process.cwd(), 'posts')

const getPostSummaryByNameFromMd = (fileName: string): PostSummary => {
  const id = fileName.replace(/\.md$/, '')
  const fullPath = path.join(postsDirectory, fileName)
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const { data } = matter(fileContents)
  return {
    id,
    ...(data as PostMetaData),
  }
}

export const getSortedPosts = (): PostSummary[] => {
  const fileNames = fs.readdirSync(postsDirectory)
  const posts = fileNames.map((fileName) =>
    getPostSummaryByNameFromMd(fileName),
  )
  return posts.sort((a, b) => (a.date < b.date ? 1 : -1)) // 投稿を日付でソートする
}

export const getSortedPostsByTag = (tag: string): PostSummary[] => {
  const fileNames = fs.readdirSync(postsDirectory)
  return fileNames
    .map((fileName) => getPostSummaryByNameFromMd(fileName))
    .filter(({ tags }) => tags.includes(tag))
}

export const getAllPostIds = (): string[] => {
  const fileNames = fs.readdirSync(postsDirectory)
  return fileNames.map((fileName) => fileName.replace(/\.md$/, ''))
}

export const getUniqueAllTags = (): string[] => {
  const allPosts = getSortedPosts()
  return allPosts
    .flatMap(({ tags }) => tags)
    .filter((tag, index, self) => self.indexOf(tag) === index)
}

export const getPostData = async (id: string): Promise<PostDetail> => {
  const fullPath = path.join(postsDirectory, `${id}.md`)
  try {
    const fileContents = fs.readFileSync(fullPath, 'utf8')

    // 投稿のメタデータ部分を解析するためにgray-matterを使う
    const { content, data } = matter(fileContents)
    return {
      id,
      content,
      ...(data as PostMetaData),
    }
  } catch (err) {
    console.error(err)
  }
  return
}
