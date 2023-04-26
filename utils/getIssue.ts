import fs from "fs"
import matter from "gray-matter"
import dataDirectoryPath from "./dataDirectoryPath"
import renderMarkdown from "./renderMarkdown"
import Issue from "@/types/Issue"

const getIssue = async (issueNumber: number) => {
	const filePath = `${dataDirectoryPath}/issues/${issueNumber}/issue.md`
	const content = fs.readFileSync(filePath, { encoding: "utf-8" })
	const issueMatter = matter(content)
	const body = issueMatter.content
	const bodyHTML = await renderMarkdown(body)
	return Issue.check({ body, bodyHTML, ...issueMatter.data })
}

export default getIssue