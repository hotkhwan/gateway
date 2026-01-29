// src/lib/utils.ts
import { browser } from '$app/environment'

export function setPageTitle(title: string): void {
  if (browser) {
    document.title = title
  }
}
