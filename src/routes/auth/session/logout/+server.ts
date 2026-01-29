import type { RequestHandler } from './$types'
import { json } from '@sveltejs/kit'
import { env } from '$env/dynamic/private'
import { PUBLIC_APP_BASE_URL } from '$env/static/public'

function normalizeBase(v?: string) {
  if (!v || v === '/') return ''
  return '/' + v.replace(/^\/+|\/+$/g, '')
}

export const POST: RequestHandler = async ({ fetch, cookies }) => {
  const base = normalizeBase(PUBLIC_APP_BASE_URL)
  const path = base || '/'

  const accessToken = cookies.get('session_token')
  console.log('[logout] token exists =', Boolean(accessToken))

  if (accessToken) {
    const res = await fetch(`${env.API_BASE}/auth/signout`, {
      method: 'POST',
      headers: {
        authorization: `Bearer ${accessToken}`
      }
    })
    console.log('[logout] backend status =', res.status)
  }

  cookies.delete('session_token', { path })
  cookies.delete('session_refresh', { path })

  return json({ ok: true })
}
