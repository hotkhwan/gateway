// src/hooks.server.ts
import type { Handle } from '@sveltejs/kit'
import { redirect } from '@sveltejs/kit'
import { userFromToken } from '$lib/server/auth'

const publicPrefixes = [
  '/',
  '/auth',
  '/api',
  '/landing',
  '/robots.txt',
  '/favicon'
]

function isPublic(pathname: string) {
  return publicPrefixes.some(p => pathname.startsWith(p))
}

export const handle: Handle = async ({ event, resolve }) => {
  const { cookies, url } = event
  const pathname = url.pathname

  event.locals.user = null

  const token = cookies.get('sg.session')
  if (token) {
    try {
      const user = userFromToken(token)
      event.locals.user = { ...user, accessToken: token }
    } catch {
      cookies.delete('sg.session', { path: '/' })
    }
  }

  if (!event.locals.user && !isPublic(pathname)) {
    throw redirect(
      302,
      `/auth/login?next=${encodeURIComponent(pathname)}`
    )
  }

  return resolve(event)
}
