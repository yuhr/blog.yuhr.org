import fs from "fs"
import glob from "glob-promise"
import matter from "gray-matter"
import compareByCreatedAt from "./compareByCreatedAt"
import dataDirectoryPath from "./dataDirectoryPath"
import renderMarkdown from "./renderMarkdown"
import IssueComment from "@/types/IssueComment"

const listIssueComments = async ({ issueNumber }: { issueNumber: number }) => {
	const paths = await glob.promise(
		`${dataDirectoryPath}/issues/${issueNumber}/issue_comments/*.md`,
	)
	const issueComments = await Promise.all(
		paths.map(async filePath => {
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
	return issueComments.map(IssueComment.check).sort(compareByCreatedAt)
}

export default listIssueComments