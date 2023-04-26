import rehypeStringify from "rehype-stringify"
import { remark } from "remark"
import remarkGfm from "remark-gfm"
import remarkGithub from "remark-github"
import remarkParse from "remark-parse"
import remarkRehype from "remark-rehype"

const renderMarkdown = async (content: string) => {
	const result = await remark()
		.use(remarkParse)
		.use(remarkGfm)
		.use(remarkGithub, {
			repository: process.env.GITHUB_REPOSITORY || "github/dummy",
		})
		.use(remarkRehype)
		.use(rehypeStringify)
		.use(remarkGfm)
		.process(content)
	return result.toString()
}

export default renderMarkdown