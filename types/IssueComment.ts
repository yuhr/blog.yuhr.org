import { Number, Record, Static, String } from "runtypes"

const IssueComment = Record({
	id: Number,
	created_at: String,
	bodyHTML: String,
})

type IssueComment = Static<typeof IssueComment>

export default IssueComment