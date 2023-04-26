import fs from "fs"
import glob from "glob-promise"
import matter from "gray-matter"
import rehypeStringify from "rehype-stringify"
import { remark } from "remark"
import remarkGfm from "remark-gfm"
import remarkGithub from "remark-github"
import remarkParse from "remark-parse"
import remarkRehype from "remark-rehype"

export type Issue = any

export type IssueComment = any

const dataDirectoryPath = process.env.DATA_DIRECTORY_PATH || "./data"

export const getIssue = async ({ issueNumber }: { issueNumber: number }) => {
	const filePath = `${dataDirectoryPath}/issues/${issueNumber}/issue.md`
	const content = fs.readFileSync(filePath, { encoding: "utf-8" })
	const issueMatter = matter(content)
	const body = issueMatter.content
	const bodyHTML = await renderMarkdown(body)
	return {
		body,
		bodyHTML,
		...issueMatter.data,
	}
}

export const listIssues = async () => {
	const paths = await glob.promise(`${dataDirectoryPath}/issues/*/issue.md`)
	return paths
		.map(filePath => {
			const content = fs.readFileSync(filePath, { encoding: "utf-8" })
			const issueMatter = matter(content)
			const body = issueMatter.content
			return {
				body,
				...issueMatter.data,
			}
		})
		.sort(byCreatedAt)
		.reverse()
}

export const listIssueComments = async ({
	issueNumber,
}: {
	issueNumber: number
}) => {
	const paths = await glob.promise(
		`${dataDirectoryPath}/issues/${issueNumber}/issue_comments/*.md`,
	)
	const issueComments = await Promise.all(
		paths.map(async (filePath: string) => {
			const content = fs.readFileSync(filePath, { encoding: "utf-8" })
			const issueMatter = matter(content)
			const body = issueMatter.content
			const bodyHTML = await renderMarkdown(body)
			return {
				body,
				bodyHTML,
				...issueMatter.data,
			}
		}),
	)
	return issueComments.sort(byCreatedAt)
}

const byCreatedAt = (a: any, b: any) => {
	if (a.created_at < b.created_at) {
		return -1
	} else if (a.created_at > b.created_at) {
		return 1
	} else {
		return 0
	}
}

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