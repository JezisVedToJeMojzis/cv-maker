<script>
  import Editor from './lib/components/Editor.svelte';
  import Preview from './lib/components/Preview.svelte';
  import { cv, prefs, loadSample, resetCV } from './lib/store.js';

  // On phones we show one pane at a time (form OR preview).
  let view = $state('edit');

  const templateOptions = [
    { id: 'modern', label: 'Modern' },
    { id: 'classic', label: 'Classic' },
    { id: 'compact', label: 'Compact' },
    { id: 'elegant', label: 'Elegant' },
    { id: 'banner', label: 'Banner' },
    { id: 'timeline', label: 'Timeline' },
    { id: 'minimal', label: 'Minimal' },
    { id: 'slate', label: 'Slate' },
    { id: 'corporate', label: 'Corporate' },
    { id: 'card', label: 'Card' }
  ];
  // A few basic presets; the color picker covers everything else.
  const accents = ['#2563eb', '#0f766e', '#b5651d', '#6b7233', '#7b3f3f', '#0f172a'];

  const fontOptions = [
    { id: 'default', label: 'Auto' },
    { id: 'inter', label: 'Inter' },
    { id: 'poppins', label: 'Poppins' },
    { id: 'lora', label: 'Lora' },
    { id: 'merriweather', label: 'Merriweather' },
    { id: 'mono', label: 'Mono' }
  ];

  function downloadPDF() {
    // Print stylesheet isolates .print-root at A4; the browser's "Save as PDF"
    // gives vector, selectable-text output — higher quality than canvas capture.
    window.print();
  }

  function exportJSON() {
    const blob = new Blob([JSON.stringify($cv, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${($cv.basics.name || 'cv').toLowerCase().replace(/\s+/g, '-')}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }

  let fileInput;
  function importJSON(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        cv.set(JSON.parse(reader.result));
      } catch {
        alert('Could not read that file — is it a CV Maker export?');
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  }
</script>

<div class="app-shell" style="--accent:{$prefs.accent}">
  <header class="toolbar">
    <div class="brand">📄 <strong>CV Maker</strong></div>

    <div class="view-toggle">
      <button class:active={view === 'edit'} onclick={() => (view = 'edit')}>✎ Edit</button>
      <button class:active={view === 'preview'} onclick={() => (view = 'preview')}>◱ Preview</button>
    </div>

    <div class="controls">
      <div class="seg">
        {#each templateOptions as t}
          <button class:active={$prefs.template === t.id} onclick={() => ($prefs.template = t.id)}>
            {t.label}
          </button>
        {/each}
      </div>

      <div class="swatches">
        {#each accents as c}
          <button class="swatch" class:active={$prefs.accent === c} style="background:{c}" aria-label="accent {c}" onclick={() => ($prefs.accent = c)}></button>
        {/each}
        <label class="swatch custom" title="Pick any color" style="background:{$prefs.accent}">
          <input type="color" bind:value={$prefs.accent} />
          <span>+</span>
        </label>
      </div>

      <select class="font-select" bind:value={$prefs.font} title="Font">
        {#each fontOptions as f}
          <option value={f.id}>{f.label}</option>
        {/each}
      </select>

      <button class="ghost" onclick={loadSample}>Sample</button>
      <button class="ghost" onclick={resetCV}>Clear</button>
      <button class="ghost" onclick={exportJSON}>Export</button>
      <button class="ghost" onclick={() => fileInput.click()}>Import</button>
      <input bind:this={fileInput} type="file" accept="application/json" onchange={importJSON} hidden />
      <button class="primary" onclick={downloadPDF}>⬇ Download PDF</button>
    </div>
  </header>

  <main class="split" class:show-edit={view === 'edit'} class:show-preview={view === 'preview'}>
    <div class="editor-pane"><Editor /></div>
    <div class="preview-pane"><Preview /></div>
  </main>
</div>

<style>
  .app-shell {
    height: 100vh;
    display: flex;
    flex-direction: column;
  }
  .toolbar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
    padding: 10px 18px;
    background: #fff;
    border-bottom: 1px solid var(--border);
    flex-wrap: wrap;
  }
  .brand {
    font-size: 16px;
  }
  /* Edit/Preview switch — only used on small screens. */
  .view-toggle {
    display: none;
    border: 1px solid var(--border);
    border-radius: 8px;
    overflow: hidden;
  }
  .view-toggle button {
    border: none;
    background: #fff;
    padding: 7px 16px;
    font-size: 13px;
    font-weight: 600;
    color: var(--muted);
  }
  .view-toggle button.active {
    background: var(--accent);
    color: #fff;
  }
  .controls {
    display: flex;
    align-items: center;
    gap: 10px;
    flex-wrap: wrap;
  }
  .seg {
    display: inline-flex;
    flex-wrap: wrap;
    border: 1px solid var(--border);
    border-radius: 8px;
    overflow: hidden;
  }
  .seg button {
    border: none;
    border-right: 1px solid var(--border);
    background: #fff;
    padding: 6px 11px;
    font-size: 12.5px;
    color: var(--muted);
  }
  .seg button:last-child {
    border-right: none;
  }
  .seg button.active {
    background: var(--accent);
    color: #fff;
  }
  .swatches {
    display: inline-flex;
    flex-wrap: wrap;
    gap: 5px;
  }
  .font-select {
    border: 1px solid var(--border);
    border-radius: 8px;
    padding: 6px 10px;
    font-size: 13px;
    background: #fff;
    color: var(--text);
  }
  .swatch {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    border: 2px solid transparent;
    padding: 0;
  }
  .swatch.active {
    border-color: #0f172a;
    box-shadow: 0 0 0 2px #fff inset;
  }
  .swatch.custom {
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    font-weight: 700;
    font-size: 13px;
    cursor: pointer;
    border: 2px dashed rgba(255, 255, 255, 0.8);
    overflow: hidden;
  }
  .swatch.custom input {
    position: absolute;
    inset: 0;
    opacity: 0;
    cursor: pointer;
  }
  .ghost {
    border: 1px solid var(--border);
    background: #fff;
    color: var(--text);
    border-radius: 8px;
    padding: 6px 12px;
    font-size: 13px;
  }
  .ghost:hover {
    border-color: var(--accent);
    color: var(--accent);
  }
  .primary {
    border: none;
    background: var(--accent);
    color: #fff;
    border-radius: 8px;
    padding: 7px 16px;
    font-size: 13px;
    font-weight: 600;
  }
  .split {
    flex: 1;
    display: grid;
    grid-template-columns: minmax(360px, 40%) 1fr;
    overflow: hidden;
  }
  .editor-pane {
    overflow-y: auto;
    border-right: 1px solid var(--border);
    background: #fff;
  }
  .preview-pane {
    overflow-y: auto;
    background: var(--bg);
  }
  @media (max-width: 820px) {
    .view-toggle {
      display: inline-flex;
    }
    .split {
      grid-template-columns: 1fr;
    }
    /* Show only the active pane on phones. */
    .split .editor-pane,
    .split .preview-pane {
      display: none;
      border-right: none;
    }
    .split.show-edit .editor-pane {
      display: block;
    }
    .split.show-preview .preview-pane {
      display: block;
    }
  }
</style>
