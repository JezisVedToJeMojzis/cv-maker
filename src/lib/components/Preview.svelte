<script>
  import { cv, prefs } from '../store.js';
  import Modern from '../templates/Modern.svelte';
  import Classic from '../templates/Classic.svelte';
  import Compact from '../templates/Compact.svelte';
  import Elegant from '../templates/Elegant.svelte';
  import Banner from '../templates/Banner.svelte';
  import Timeline from '../templates/Timeline.svelte';
  import Minimal from '../templates/Minimal.svelte';

  const templates = {
    modern: Modern,
    classic: Classic,
    compact: Compact,
    elegant: Elegant,
    banner: Banner,
    timeline: Timeline,
    minimal: Minimal
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
  let fontVar = $derived(fontStacks[$prefs.font] ? `--cv-font:${fontStacks[$prefs.font]}` : '');
</script>

<div class="print-root">
  <div class="scaler" style={fontVar}>
    <Current data={$cv} accent={$prefs.accent} />
  </div>
</div>

<style>
  .print-root {
    display: flex;
    justify-content: center;
    padding: 28px;
  }
  /* Scale the A4 page down to fit the preview column while keeping print at 100%. */
  .scaler {
    transform: scale(var(--scale, 0.62));
    transform-origin: top center;
  }
  .scaler :global(.cv-page) {
    box-shadow: 0 8px 30px rgba(15, 23, 42, 0.18);
  }
  @media print {
    .print-root {
      padding: 0;
    }
    .scaler {
      transform: none !important;
    }
  }
</style>
