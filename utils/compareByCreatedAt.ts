const compareByCreatedAt = (
	a: { created_at: string },
	b: { created_at: string },
) => {
	const a_created_at = new Date(a.created_at)
	const b_created_at = new Date(b.created_at)
	return a_created_at.valueOf() - b_created_at.valueOf()
}

export default compareByCreatedAt