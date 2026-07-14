<script>
  let { data, accent, order = [] } = $props();
  const dates = (a, b) => `${a || ''}${a && b ? ' – ' : ''}${b || ''}`;
  const TOP = ['experience', 'education'];
  const LEFT = ['projects', 'volunteering', 'publications'];
  const RIGHT = ['skills', 'languages', 'certifications', 'awards', 'interests'];
</script>

{#snippet sec(key)}
  {#if key === 'experience' && data.experience.length}
    <h2>Experience</h2>
    <div class="track">
      {#each data.experience as x}
        <div class="node">
          <span class="dot"></span>
          <div class="node-body">
            <div class="row"><strong>{x.role}</strong><span class="dates">{dates(x.start, x.end)}</span></div>
            <div class="sub">{[x.company, x.location, x.mode].filter(Boolean).join(' · ')}</div>
            {#if x.companyDesc}<div class="co-desc">{x.companyDesc}</div>{/if}
            <ul>{#each x.bullets.filter(Boolean) as b}<li>{b}</li>{/each}</ul>
          </div>
        </div>
      {/each}
    </div>
  {:else if key === 'education' && data.education.length}
    <h2>Education</h2>
    <div class="track">
      {#each data.education as e}
        <div class="node">
          <span class="dot"></span>
          <div class="node-body">
            <div class="row"><strong>{e.degree}</strong><span class="dates">{dates(e.start, e.end)}</span></div>
            <div class="sub">{e.school}{e.note ? ' · ' + e.note : ''}</div>
          </div>
        </div>
      {/each}
    </div>
  {:else if key === 'projects' && data.projects.length}
    <section><h2>Projects</h2>
      {#each data.projects as p}
        <div class="entry"><div class="row"><strong>{p.name}</strong>{#if p.link}<span class="dates">{p.link}</span>{/if}</div><div class="sub">{p.description}</div></div>
      {/each}
    </section>
  {:else if key === 'volunteering' && data.volunteering.length}
    <section><h2>Volunteering</h2>
      {#each data.volunteering as v}
        <div class="entry"><div class="row"><strong>{v.role}</strong><span class="dates">{dates(v.start, v.end)}</span></div><div class="sub">{v.org}{v.description ? ' — ' + v.description : ''}</div></div>
      {/each}
    </section>
  {:else if key === 'publications' && data.publications.length}
    <section><h2>Publications</h2>
      {#each data.publications as p}
        <div class="entry"><div class="row"><strong>{p.title}</strong><span class="dates">{p.year}</span></div><div class="sub">{p.venue}{p.link ? ' · ' + p.link : ''}</div></div>
      {/each}
    </section>
  {:else if key === 'skills' && data.skills.length}
    <section><h2>Skills</h2><p class="inline">{data.skills.join(' · ')}</p></section>
  {:else if key === 'languages' && data.languages.length}
    <section><h2>Languages</h2>{#each data.languages as l}<div class="kv"><strong>{l.name}</strong><span>{l.level}</span></div>{/each}</section>
  {:else if key === 'certifications' && data.certifications.length}
    <section><h2>Certifications</h2>{#each data.certifications as c}<div class="kv"><strong>{c.name}</strong><span>{c.year}</span></div>{/each}</section>
  {:else if key === 'awards' && data.awards.length}
    <section><h2>Awards</h2>{#each data.awards as a}<div class="kv"><strong>{a.name}</strong><span>{a.year}</span></div>{/each}</section>
  {:else if key === 'interests' && data.interests.length}
    <section><h2>Interests</h2><p class="inline">{data.interests.join(' · ')}</p></section>
  {/if}
{/snippet}

<div class="cv-page timeline" style="--a:{accent}">
  <header>
    {#if data.basics.photo}<img class="photo" src={data.basics.photo} alt="" />{/if}
    <div>
      <h1>{data.basics.name || 'Your Name'}</h1>
      {#if data.basics.title}<p class="title">{data.basics.title}</p>{/if}
    </div>
    <div class="contact">
      {#if data.basics.email}<span>{data.basics.email}</span>{/if}
      {#if data.basics.phone}<span>{data.basics.phone}</span>{/if}
      {#if data.basics.location}<span>{data.basics.location}</span>{/if}
      {#if data.basics.website}<span>{data.basics.website}</span>{/if}
    </div>
  </header>

  {#if data.basics.summary}<p class="summary">{data.basics.summary}</p>{/if}

  {#each order.filter((k) => TOP.includes(k)) as key (key)}{@render sec(key)}{/each}

  <div class="two">
    <div>
      {#each order.filter((k) => LEFT.includes(k)) as key (key)}{@render sec(key)}{/each}
    </div>
    <div>
      {#each order.filter((k) => RIGHT.includes(k)) as key (key)}{@render sec(key)}{/each}
    </div>
  </div>
</div>

<style>
  .cv-page {
    width: 210mm;
    min-height: 297mm;
    background: #fff;
    color: #1e293b;
    padding: 20mm 18mm;
    font-family: var(--cv-font, 'Inter', system-ui, sans-serif);
    font-size: 10pt;
    line-height: 1.45;
  }
  header {
    display: flex;
    align-items: center;
    gap: 16px;
    padding-bottom: 12px;
    border-bottom: 2px solid var(--a);
    margin-bottom: 14px;
  }
  .photo {
    width: 72px;
    height: 72px;
    border-radius: 50%;
    object-fit: cover;
    border: 2px solid var(--a);
  }
  h1 {
    margin: 0;
    font-size: 21pt;
  }
  .title {
    margin: 2px 0 0;
    color: var(--a);
    font-weight: 600;
  }
  .contact {
    margin-left: auto;
    text-align: right;
    display: flex;
    flex-direction: column;
    gap: 2px;
    font-size: 8.5pt;
    color: #555;
  }
  .summary {
    margin: 0 0 16px;
  }
  h2 {
    color: var(--a);
    font-size: 12pt;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    margin: 0 0 10px;
  }
  .track {
    border-left: 2px solid color-mix(in srgb, var(--a) 40%, #fff);
    margin-left: 6px;
    padding-left: 18px;
    margin-bottom: 16px;
  }
  .node {
    position: relative;
    margin-bottom: 13px;
  }
  .dot {
    position: absolute;
    left: -25px;
    top: 3px;
    width: 11px;
    height: 11px;
    border-radius: 50%;
    background: var(--a);
    border: 2px solid #fff;
    box-shadow: 0 0 0 2px color-mix(in srgb, var(--a) 40%, #fff);
  }
  .row {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    gap: 10px;
  }
  .row strong {
    min-width: 0;
    overflow-wrap: anywhere;
  }
  .dates {
    color: #64748b;
    font-size: 9pt;
    white-space: nowrap;
    flex-shrink: 0;
  }
  .sub {
    color: #475569;
    font-size: 9.5pt;
  }
  ul {
    margin: 4px 0 0;
    padding-left: 16px;
  }
  li {
    margin-bottom: 3px;
  }
  .two {
    display: grid;
    grid-template-columns: 1.4fr 1fr;
    gap: 24px;
  }
  section {
    margin-bottom: 14px;
  }
  .entry {
    margin-bottom: 9px;
  }
  .inline {
    margin: 0;
  }
  .kv {
    display: flex;
    justify-content: space-between;
    gap: 8px;
    margin-bottom: 5px;
    font-size: 9.5pt;
  }
  .kv strong {
    min-width: 0;
    overflow-wrap: anywhere;
  }
  .kv span {
    color: #64748b;
    white-space: nowrap;
    flex-shrink: 0;
  }
</style>
