import remark from 'remark'
import html from 'remark-html'
import codeTitle from 'remark-code-titles'
import highlight from 'remark-highlight.js'

export async function markdownToHtml(markdown: string): Promise<string> {
  const processedContent = await remark()
    .use(codeTitle)
    .use(highlight)
    .use(html)
    .process(markdown)
  return processedContent.toString()
}