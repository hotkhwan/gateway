<script lang="ts">
  import { onMount } from 'svelte'
  // import Card from '$lib/components/bootstrap/Card.svelte'
  // import CardBody from '$lib/components/bootstrap/CardBody.svelte'
  import { appVariables, generateVariables } from '$lib/stores/appVariables'

  // -----------------------------
  // Types
  // -----------------------------
  type ThemeMode = 'dark' | 'light'
  type DirectionMode = 'ltr' | 'rtl'

  type ModeItem = {
    name: string
    img: string
    value: ThemeMode
  }

  type DirectionItem = {
    name: string
    icon: string
    value: DirectionMode
  }

  type ThemeItem = {
    name: string
    bgClass: string
    themeClass: string
  }

  type CoverItem = {
    name: string
    coverThumbImage: string
    coverClass: string
  }

  // -----------------------------
  // State
  // -----------------------------
  let active: 'true' | 'false' = 'false'
  let activeMode: ThemeMode = 'dark'
  let activeDirection: DirectionMode | '' = ''
  let activeTheme = 'theme-teal'
  let activeCover = 'bg-cover-1'

  // -----------------------------
  // Lists
  // -----------------------------
  const modeList: ModeItem[] = [
    { name: 'Dark', img: '/img/mode/dark.jpg', value: 'dark' },
    { name: 'Light', img: '/img/mode/light.jpg', value: 'light' }
  ]

  const directionList: DirectionItem[] = [
    { name: 'LTR', icon: 'bi-text-left', value: 'ltr' },
    { name: 'RTL', icon: 'bi-text-right', value: 'rtl' }
  ]

  const themeList: ThemeItem[] = [
    { name: 'Pink', bgClass: 'bg-pink', themeClass: 'theme-pink' },
    { name: 'Red', bgClass: 'bg-red', themeClass: 'theme-red' },
    { name: 'Orange', bgClass: 'bg-warning', themeClass: 'theme-warning' },
    { name: 'Yellow', bgClass: 'bg-yellow', themeClass: 'theme-yellow' },
    { name: 'Lime', bgClass: 'bg-lime', themeClass: 'theme-lime' },
    { name: 'Green', bgClass: 'bg-green', themeClass: 'theme-green' },
    { name: 'Default', bgClass: 'bg-teal', themeClass: 'theme-teal' },
    { name: 'Cyan', bgClass: 'bg-info', themeClass: 'theme-info' },
    { name: 'Blue', bgClass: 'bg-primary', themeClass: 'theme-primary' },
    { name: 'Purple', bgClass: 'bg-purple', themeClass: 'theme-purple' },
    { name: 'Indigo', bgClass: 'bg-indigo', themeClass: 'theme-indigo' },
    { name: 'Gray', bgClass: 'bg-gray-200', themeClass: 'theme-gray-200' }
  ]

  const coverList: CoverItem[] = [
    {
      name: 'Default',
      coverThumbImage: '/img/cover/cover-thumb-1.jpg',
      coverClass: 'bg-cover-1'
    },
    {
      name: 'Cover 2',
      coverThumbImage: '/img/cover/cover-thumb-2.jpg',
      coverClass: 'bg-cover-2'
    },
    {
      name: 'Cover 3',
      coverThumbImage: '/img/cover/cover-thumb-3.jpg',
      coverClass: 'bg-cover-3'
    },
    {
      name: 'Cover 4',
      coverThumbImage: '/img/cover/cover-thumb-4.jpg',
      coverClass: 'bg-cover-4'
    },
    {
      name: 'Cover 5',
      coverThumbImage: '/img/cover/cover-thumb-5.jpg',
      coverClass: 'bg-cover-5'
    },
    {
      name: 'Cover 6',
      coverThumbImage: '/img/cover/cover-thumb-6.jpg',
      coverClass: 'bg-cover-6'
    },
    {
      name: 'Cover 7',
      coverThumbImage: '/img/cover/cover-thumb-7.jpg',
      coverClass: 'bg-cover-7'
    },
    {
      name: 'Cover 8',
      coverThumbImage: '/img/cover/cover-thumb-8.jpg',
      coverClass: 'bg-cover-8'
    },
    {
      name: 'Cover 9',
      coverThumbImage: '/img/cover/cover-thumb-9.jpg',
      coverClass: 'bg-cover-9'
    }
  ]

  // -----------------------------
  // Actions
  // -----------------------------
  function themePanelToggler() {
    active = active === 'true' ? 'false' : 'true'
    localStorage.setItem('theme-panel', active)
  }

  function themeModeToggler(mode: ThemeMode) {
    activeMode = mode
    localStorage.setItem('theme-mode', mode)
    document.documentElement.setAttribute('data-bs-theme', mode)
    $appVariables = generateVariables()
  }

  function themeColorToggler(themeClass: string) {
    activeTheme = themeClass
    localStorage.setItem('theme-color', themeClass)

    document.body.classList.forEach((cls) => {
      if (cls.startsWith('theme-')) {
        document.body.classList.remove(cls)
      }
    })

    document.body.classList.add(themeClass)
    $appVariables = generateVariables()
  }

  function themeCoverToggler(coverClass: string) {
    activeCover = coverClass
    localStorage.setItem('theme-cover', coverClass)

    const htmlElm = document.documentElement
    htmlElm.classList.forEach((cls) => {
      if (cls.startsWith('bg-cover-')) {
        htmlElm.classList.remove(cls)
      }
    })

    htmlElm.classList.add(coverClass)
  }

  function themeDirectionToggler(direction: DirectionMode | '') {
    activeDirection = direction
    localStorage.setItem('theme-direction', direction)
    document.documentElement.setAttribute('dir', direction || 'ltr')
    $appVariables = generateVariables()
  }

  // -----------------------------
  // Mount
  // -----------------------------
  onMount(async () => {
    const bootstrap = await import('bootstrap')

    document
      .querySelectorAll<HTMLElement>('[data-bs-toggle="tooltip"]')
      .forEach((el) => {
        new bootstrap.Tooltip(el)
      })

    active = (localStorage.getItem('theme-panel') as 'true' | 'false') ?? active
    activeMode = (localStorage.getItem('theme-mode') as ThemeMode) ?? activeMode
    activeDirection =
      (localStorage.getItem('theme-direction') as DirectionMode) ??
      activeDirection
    activeTheme = localStorage.getItem('theme-color') ?? activeTheme
    activeCover = localStorage.getItem('theme-cover') ?? activeCover

    themeModeToggler(activeMode)
    themeDirectionToggler(activeDirection)
    themeColorToggler(activeTheme)
    themeCoverToggler(activeCover)
  })
</script>
