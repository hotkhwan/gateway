// src/app.d.ts
declare global {
  namespace App {
    interface Locals {
      user: null | {
        sub: string
        email?: string
        name?: string
        roles: string[]
        permissions?: string[]
        accessToken?: string
      }
    }
  }
}
// declare module 'apexcharts'
// declare module 'chart.js/auto'
// declare module 'perfect-scrollbar'
// declare module 'svelte-highlight'

export { }
