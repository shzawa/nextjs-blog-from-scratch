import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import type { PostMetaData, PostSummary, PostDetail } from './post.d'

const postsDirectory = path.join(process.cwd(), 'posts')

export function getSortedPosts(): PostSummary[] {
  // /posts 配下のファイル名を取得する
  const fileNames = fs.readdirSync(postsDirectory)
  const posts = fileNames.map(fileName => {
    // id を取得する為にファイル名から".md"を削除する
    const id = fileName.replace(/\.md$/, '')

    // マークダウンファイルを文字列として読み取る
    const fullPath = path.join(postsDirectory, fileName)
    const fileContents = fs.readFileSync(fullPath, 'utf8')

    // 投稿のメタデータ部分を解析するためにgray-matterを使う
    const { data } = matter(fileContents)

    return {
      id,
      ...(data as PostMetaData)
    }
  })

  // 投稿を日付でソートする
  return posts.sort((a, b) => a.date < b.date ? 1 : -1)
}

export function filterPostsByTag(posts: PostSummary[] ,entryTag: string) {
  return posts.filter(({tags}) => tags.includes(entryTag))
}

export function getAllPostIds() {
  const fileNames = fs.readdirSync(postsDirectory)

  return fileNames.map(fileName => ({
    params: {
      id: fileName.replace(/\.md$/, '')
    }
  }))
}

export async function getPostData(id: string): Promise<PostDetail> {
  const fullPath = path.join(postsDirectory, `${id}.md`)
  try {
    const fileContents = fs.readFileSync(fullPath, 'utf8')

    // 投稿のメタデータ部分を解析するためにgray-matterを使う
    const { content, data } = matter(fileContents)

    return {
      id,
      content,
      ...(data as PostMetaData)
    }
  } catch (err) {
    console.error(err)
  }

  return
}
