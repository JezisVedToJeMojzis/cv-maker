<script>
  import { cv, prefs } from '../store.js';
  import Modern from '../templates/Modern.svelte';
  import Classic from '../templates/Classic.svelte';
  import Compact from '../templates/Compact.svelte';
  import Elegant from '../templates/Elegant.svelte';
  import Banner from '../templates/Banner.svelte';
  import Timeline from '../templates/Timeline.svelte';
  import Minimal from '../templates/Minimal.svelte';
  import Slate from '../templates/Slate.svelte';
  import Corporate from '../templates/Corporate.svelte';
  import Card from '../templates/Card.svelte';

  const templates = {
    modern: Modern,
    classic: Classic,
    compact: Compact,
    elegant: Elegant,
    banner: Banner,
    timeline: Timeline,
    minimal: Minimal,
    slate: Slate,
    corporate: Corporate,
    card: Card
  };
  let Current = $derived(templates[$prefs.template] ?? Modern);

  const fontStacks = {
    inter: "'Inter', system-ui, sans-serif",
    poppins: "'Poppins', system-ui, sans-serif",
    lora: "'Lora', Georgia, serif",
    merriweather: "'Merriweather', Georgia, serif",
    mono: "'JetBrains Mono', 'Consolas', monospace"
  };
  // 'default' → let each template keep its own font-family fallback.
  let fontVar = $derived(fontStacks[$prefs.font] ? `--cv-font:${fontStacks[$prefs.font]};` : '');

  // Fit the A4 page (794px @ 96dpi) to the available column width.
  const A4 = 794;
  let paneW = $state(0);
  let zoom = $derived(Math.min(0.85, Math.max(0.32, (paneW - 44) / A4)));
</script>

<div class="print-root" bind:clientWidth={paneW}>
  <div class="scaler" style="{fontVar}zoom:{zoom};">
    <Current data={$cv} accent={$prefs.accent} order={$prefs.sectionOrder} />
  </div>
</div>

<style>
  .print-root {
    display: flex;
    justify-content: center;
    padding: 22px;
  }
  /* `zoom` (not transform) so the scaled page reflows layout — no reserved
     whitespace and it stays centered at any width. Reset to 1 for print. */
  .scaler :global(.cv-page) {
    box-shadow: 0 8px 30px rgba(15, 23, 42, 0.18);
  }
  @media print {
    .print-root {
      padding: 0;
    }
    .scaler {
      zoom: 1 !important;
    }
  }
</style>
