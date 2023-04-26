import { Record, Static, String } from "runtypes"

const User = Record({
	html_url: String,
	login: String,
})

type User = Static<typeof User>

export default User