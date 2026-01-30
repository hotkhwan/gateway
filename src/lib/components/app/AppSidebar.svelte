<script lang="ts">
  import PerfectScrollbar from '$lib/components/plugins/PerfectScrollbar.svelte'
  import { appOptions } from '$lib/stores/appOptions'
  import { appSidebarMenus } from '$lib/stores/appSidebarMenus'
  import { onMount } from 'svelte'
  import { page, navigating } from '$app/stores'
  import type { SidebarChild, SidebarMenu } from '$lib/types/navigation'

  function mobileToggler() {
    $appOptions.appSidebarMobileToggled = !$appOptions.appSidebarMobileToggled
  }

  function hideMobileSidebar() {
    $appOptions.appSidebarMobileToggled = false
  }

  $: if ($navigating) hideMobileSidebar()

  function hasActiveChild(children?: SidebarChild[]): boolean {
    if (!children?.length) return false
    return children.some((c) => c.url === $page.url.pathname)
  }

  function handleSidebarMenuToggle(menus: HTMLAnchorElement[]) {
    menus.forEach((menu) => {
      menu.onclick = (e: MouseEvent) => {
        e.preventDefault()

        const target = menu.nextElementSibling as HTMLElement | null
        if (!target) return

        menus.forEach((m) => {
          const other = m.nextElementSibling as HTMLElement | null
          if (other && other !== target) {
            other.style.display = 'none'
            other.closest('.menu-item')?.classList.remove('expand')
          }
        })

        const item = target.closest('.menu-item')
        if (!item) return

        const expanded = item.classList.contains('expand')
        item.classList.toggle('expand', !expanded)
        target.style.display = expanded ? 'none' : 'block'
      }
    })
  }

  function handleSidebarMenu() {
    const base = '.app-sidebar .menu > .menu-item.has-sub'

    const collect = (selector: string) =>
      Array.from(document.querySelectorAll<HTMLAnchorElement>(selector))

    handleSidebarMenuToggle(collect(`${base} > .menu-link`))

    handleSidebarMenuToggle(
      collect(`${base} > .menu-submenu > .menu-item.has-sub > .menu-link`)
    )

    handleSidebarMenuToggle(
      collect(
        `${base} > .menu-submenu > .menu-item.has-sub > .menu-submenu > .menu-item.has-sub > .menu-link`
      )
    )
  }

  onMount(handleSidebarMenu)
</script>

<div id="sidebar" class="app-sidebar">
  <PerfectScrollbar class="h-100">
    <div class="app-sidebar-content">
      <div class="menu">
        {#each $appSidebarMenus as menu (menu.id)}
          {#if menu.kind === 'header'}
            <div class="menu-header">{menu.text}</div>
          {:else if menu.kind === 'divider'}
            <div class="menu-divider"></div>
          {:else}
            <div
              class="menu-item"
              class:has-sub={!!menu.children?.length}
              class:active={menu.url === $page.url.pathname ||
                hasActiveChild(menu.children)}
            >
              <a href={menu.url ?? '#'} class="menu-link">
                {#if menu.icon}
                  <span class="menu-icon position-relative">
                    <i class={menu.icon}></i>

                    {#if menu.highlight === true}
                      <span
                        class="w-5px h-5px rounded-3 bg-theme position-absolute top-0 end-0 mt-3px me-3px"
                      ></span>
                    {/if}
                  </span>
                {/if}

                <span class="menu-text">{menu.text}</span>

                {#if menu.children?.length}
                  <span class="menu-caret">
                    <b class="caret"></b>
                  </span>
                {/if}
              </a>

              {#if menu.children?.length}
                <div class="menu-submenu">
                  {#each menu.children as child (child.id)}
                    <div
                      class="menu-item"
                      class:active={child.url === $page.url.pathname}
                    >
                      <a href={child.url ?? '#'} class="menu-link">
                        <span class="menu-text">{child.text}</span>
                      </a>
                    </div>
                  {/each}
                </div>
              {/if}
            </div>
          {/if}
        {/each}
      </div>

      <div class="p-3 px-4 mt-auto">
        <a
          href="https://seantheme.com/hud-svelte/documentation/"
          target="_blank"
          class="btn d-block btn-outline-theme"
        >
          <i class="fa fa-code-branch me-2 ms-n2 opacity-5"></i>
          Documentation
        </a>
      </div>
    </div>
  </PerfectScrollbar>
</div>

<button
  class="app-sidebar-mobile-backdrop"
  aria-label="button"
  on:click={mobileToggler}
></button>
