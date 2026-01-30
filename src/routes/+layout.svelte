<!-- src/routes/+layout.svelte -->
<script lang="ts">
  import '../scss/styles.scss'
  import 'bootstrap-icons/font/bootstrap-icons.min.css'
  import '@fortawesome/fontawesome-free/css/all.min.css'
  import 'perfect-scrollbar/css/perfect-scrollbar.css'

  import AppHeader from '$lib/components/app/AppHeader.svelte'
  import AppSidebar from '$lib/components/app/AppSidebar.svelte'
  import AppTopNav from '$lib/components/app/AppTopNav.svelte'
  import AppFooter from '$lib/components/app/AppFooter.svelte'
  import AppThemePanel from '$lib/components/app/AppThemePanel.svelte'
  import { appOptions } from '$lib/stores/appOptions.js'
</script>

<div
  id="app"
  class="app"
  class:app-header-menu-search-toggled={$appOptions.appHeaderSearchToggled}
  class:app-sidebar-toggled={$appOptions.appSidebarToggled &&
    !$appOptions.appSidebarHide}
  class:app-sidebar-collapsed={$appOptions.appSidebarCollapsed &&
    !$appOptions.appSidebarHide}
  class:app-sidebar-mobile-toggled={$appOptions.appSidebarMobileToggled}
  class:app-sidebar-mobile-closed={$appOptions.appSidebarMobileClosed}
  class:app-content-full-height={$appOptions.appContentFullHeight}
  class:app-content-full-width={$appOptions.appContentFullWidth}
  class:app-without-sidebar={$appOptions.appSidebarHide}
  class:app-without-header={$appOptions.appHeaderHide}
  class:app-boxed-layout={$appOptions.appBoxedLayout}
  class:app-with-top-nav={$appOptions.appTopNav}
  class:app-footer-fixed={$appOptions.appFooterFixed}
>
  {#if !$appOptions.appHeaderHide}<AppHeader />{/if}
  {#if !$appOptions.appSidebarHide}<AppSidebar />{/if}
  {#if $appOptions.appTopNav}<AppTopNav />{/if}
  <AppThemePanel />

  <div
    id="content"
    class="app-content{$appOptions.appContentClass
      ? ' ' + $appOptions.appContentClass
      : ''}"
  >
    <slot />
  </div>

  {#if $appOptions.appFooter}<AppFooter />{/if}
</div>
