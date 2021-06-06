import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import remark from 'remark'
import html from 'remark-html'
import codeTitle from 'remark-code-titles'
import highlight from 'remark-highlight.js'
import type { PostMetaData, PostSummary, PostDetail } from './post.d'

const postsDirectory = path.join(process.cwd(), 'posts')

export function getSortedPostsData(): PostSummary[] {
  // /posts 配下のファイル名を取得する
  const fileNames = fs.readdirSync(postsDirectory)
  const allPostsData = fileNames.map(fileName => {
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
  return allPostsData.sort((a, b) => a.date < b.date ? 1 : -1)
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

    // MarkdownをHTML文字列に変換する為にremarkを使う
    const processedContent = await remark()
      .use(codeTitle)
      .use(highlight)
      .use(html)
      .process(content)
    const contentHtml = processedContent.toString()

    return {
      id,
      contentHtml,
      ...(data as PostMetaData)
    }
  } catch (err) {
    console.error(err)
  }

  return
}