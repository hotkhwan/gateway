<!-- src/routes/(app)/dashboard/+page.svelte -->
<script lang="ts">
    import { onMount } from "svelte";

    // mock data ก่อน ต่อ API ทีหลัง
    let events24h = 0;
    let deliveryRate = 0;
    let retries = 0;
    let dlq = 0;

    onMount(() => {
        events24h = 1245220;
        deliveryRate = 98.7;
        retries = 12480;
        dlq = 42;
    });
  const logout = async () => {
    await fetch('/auth/session/logout', { method: 'POST' })
    window.location.href = '/'
  }
</script>

<h1 class="pageTitle">Dashboard</h1>

<div class="grid gridCols4">
    <div class="card">
        <div class="cardTitle">Events (24h)</div>
        <div class="cardValue">{events24h.toLocaleString()}</div>
        <div class="cardHint">canonical.events</div>
    </div>

    <div class="card">
        <div class="cardTitle">Deliveries</div>
        <div class="cardValue">{deliveryRate.toFixed(1)}%</div>
        <div class="cardHint">success rate</div>
    </div>

    <div class="card">
        <div class="cardTitle">Retries</div>
        <div class="cardValue">{retries.toLocaleString()}</div>
        <div class="cardHint">last 24h</div>
    </div>

    <div class="card">
        <div class="cardTitle">DLQ</div>
        <div class="cardValue">{dlq.toLocaleString()}</div>
        <div class="cardHint">needs attention</div>
    </div><button class="btn logout" on:click={logout}>
        Logout
    </button>
</div>
