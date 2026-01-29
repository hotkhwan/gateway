import { error } from '@sveltejs/kit'
import type { RequestEvent } from '@sveltejs/kit'

export const load = (event: RequestEvent) => {
  const { locals } = event

  if (!locals.user) {
    throw error(401)
  }

  return {
    user: locals.user
  }
}
