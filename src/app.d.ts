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
declare module 'apexcharts'
declare module 'chart.js/auto'
declare module 'lity' {
  interface LityOptions {
    [key: string]: any;
  }

  interface Lity {
    (selector: string | HTMLElement): void;
    close(): void;
    next(): void;
    prev(): void;
  }

  const lity: Lity;
  export default lity;
}

declare module 'lity/dist/lity.min.css' {
  const content: string;
  export default content;
}
declare module 'perfect-scrollbar'
declare module 'svelte-highlight'

export { }
