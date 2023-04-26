import { Number, Record, Static, String } from "runtypes"
import User from "./User"

const Issue = Record({
	number: Number,
	created_at: String,
	title: String,
	user: User,
	html_url: String,
	body: String,
	bodyHTML: String,
})

type Issue = Static<typeof Issue>

export default Issue