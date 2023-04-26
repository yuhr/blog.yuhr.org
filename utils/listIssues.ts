import fs from "fs"
import glob from "glob-promise"
import matter from "gray-matter"
import compareByCreatedAt from "./compareByCreatedAt"
import dataDirectoryPath from "./dataDirectoryPath"
import Issue from "@/types/Issue"

const listIssues = async () => {
	const paths = await glob.promise(`${dataDirectoryPath}/issues/*/issue.md`)
	return paths
		.map(filePath => {
			const content = fs.readFileSync(filePath, { encoding: "utf-8" })
			const issueMatter = matter(content)
			const body = issueMatter.content
			return { body, ...issueMatter.data }
		})
		.map(Issue.omit("bodyHTML").check)
		.sort(compareByCreatedAt)
		.reverse()
}

export default listIssues