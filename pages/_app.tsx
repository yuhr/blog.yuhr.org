import "../styles/globals.scss"
import "../styles/markdown.scss"
import type { AppProps } from "next/app"
import Layout from "../components/Layout"

namespace _app {
	export type Props = AppProps
}

const _app = ({ Component, pageProps }: _app.Props) => (
	<Layout>
		<Component {...pageProps} />
	</Layout>
)

export default _app