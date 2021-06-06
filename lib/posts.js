import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import remark from 'remark'
import html from 'remark-html'
import codeTitle from 'remark-code-titles'
import highlight from 'remark-highlight.js'

const postsDirectory = path.join(process.cwd(), 'posts')

export function getSortedPostsData() {
  // /posts 配下のファイル名を取得する
  const fileNames = fs.readdirSync(postsDirectory)
  const allPostsData = fileNames.map(fileName => {
    // id を取得する為にファイル名から".md"を削除する
    const id = fileName.replace(/\.md$/, '')

    // マークダウンファイルを文字列として読み取る
    const fullPath = path.join(postsDirectory, fileName)
    const fileContents = fs.readFileSync(fullPath, 'utf8')

    // 投稿のメタデータ部分を解析するためにgray-matterを使う
    const matterResult = matter(fileContents)

    return {
      id,
      ...matterResult.data
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

export async function getPostData(id) {
  const fullPath = path.join(postsDirectory, `${id}.md`)
  try {
    const fileContents = fs.readFileSync(fullPath, 'utf8')

    // 投稿のメタデータ部分を解析するためにgray-matterを使う
    const matterResult = matter(fileContents)

    // MarkdownをHTML文字列に変換する為にremarkを使う
    const processedContent = await remark()
      .use(codeTitle)
      .use(highlight)
      .use(html)
      .process(matterResult.content)
    const contentHtml = processedContent.toString()

    return {
      id,
      contentHtml,
      ...matterResult.data
    }
  } catch (err) {
    console.error(err)
  }

  return
}