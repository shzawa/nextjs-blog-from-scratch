import remark from 'remark'
import html from 'remark-html'
import codeTitle from 'remark-code-titles'
import highlight from 'remark-highlight.js'

export const markdownToHtml = async (markdown: string): Promise<string> => {
  const processedContent = await remark()
    .use(codeTitle)
    .use(highlight)
    .use(html)
    .process(markdown)
  return processedContent.toString()
}
