import { sveltekit } from '@sveltejs/kit/vite'
import { defineConfig, loadEnv } from 'vite'

export default defineConfig(({ mode }) => {
	const env = loadEnv(mode, process.cwd(), '')
	const port = Number(env.PUBLIC_APP_BASE_PORT || env.PORT || 5173)

	return {
		plugins: [sveltekit()],
		server: {
			host: '0.0.0.0',
			port,
			strictPort: true,
			watch: { usePolling: true, interval: 300 }
		},
		preview: {
			host: '0.0.0.0',
			port,
			strictPort: true
		}
	}
})
