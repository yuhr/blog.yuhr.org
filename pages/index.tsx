import type { NextPage } from "next"
import Link from "next/link"
import Time from "@/components/Time"
import { listIssues } from "@/lib/issue"
import Issue from "@/types/Issue"

namespace index {
	export type Props = {
		issues: Issue[]
	}
}

const index: NextPage<index.Props> = ({ issues }) => {
	return (
		<section>
			<ol className="flex flex-col gap-12">
				{issues.map(issue => (
					<li key={issue.number}>
						<Time dateTime={issue.created_at} />
						<Link href={`/articles/${issue.number}`}>{issue.title}</Link>
					</li>
				))}
			</ol>
		</section>
	)
}

export default index

export const getStaticProps = async () => ({
	props: {
		issues: await listIssues(),
	},
})