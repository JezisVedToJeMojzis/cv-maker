<script>
  let { data, accent, order = [] } = $props();
  const dates = (a, b) => `${a || ''}${a && b ? ' – ' : ''}${b || ''}`;
  const LEFT = ['experience', 'projects', 'volunteering', 'publications'];
  const RIGHT = ['skills', 'languages', 'education', 'certifications', 'awards', 'interests'];
</script>

{#snippet sec(key)}
  {#if key === 'experience' && data.experience.length}
    <div class="card"><h2>Experience</h2>
      {#each data.experience as x}
        <div class="entry">
          <div class="row"><strong>{x.role}</strong><span class="dates">{dates(x.start, x.end)}</span></div>
          <div class="sub">{[x.company, x.location, x.mode].filter(Boolean).join(' · ')}</div>
          {#if x.companyDesc}<div class="co-desc">{x.companyDesc}</div>{/if}
          <ul>{#each x.bullets.filter(Boolean) as b}<li>{b}</li>{/each}</ul>
        </div>
      {/each}
    </div>
  {:else if key === 'projects' && data.projects.length}
    <div class="card"><h2>Projects</h2>
      {#each data.projects as p}
        <div class="entry"><div class="row"><strong>{p.name}</strong>{#if p.link}<span class="dates">{p.link}</span>{/if}</div><p class="proj">{p.description}</p></div>
      {/each}
    </div>
  {:else if key === 'volunteering' && data.volunteering.length}
    <div class="card"><h2>Volunteering</h2>
      {#each data.volunteering as v}
        <div class="entry"><div class="row"><strong>{v.role}</strong><span class="dates">{dates(v.start, v.end)}</span></div><div class="sub">{v.org}</div>{#if v.description}<p class="proj">{v.description}</p>{/if}</div>
      {/each}
    </div>
  {:else if key === 'publications' && data.publications.length}
    <div class="card"><h2>Publications</h2>
      {#each data.publications as p}
        <div class="entry"><div class="row"><strong>{p.title}</strong><span class="dates">{p.year}</span></div><div class="sub">{p.venue}{p.link ? ' · ' + p.link : ''}</div></div>
      {/each}
    </div>
  {:else if key === 'skills' && data.skills.length}
    <div class="card"><h2>Skills</h2><div class="chips">{#each data.skills as s}<span>{s}</span>{/each}</div></div>
  {:else if key === 'languages' && data.languages.length}
    <div class="card"><h2>Languages</h2>{#each data.languages as l}<div class="kv"><strong>{l.name}</strong><span>{l.level}</span></div>{/each}</div>
  {:else if key === 'education' && data.education.length}
    <div class="card"><h2>Education</h2>
      {#each data.education as e}<div class="entry"><strong>{e.degree}</strong><div class="sub">{e.school}</div><div class="dates">{dates(e.start, e.end)}{e.note ? ' · ' + e.note : ''}</div></div>{/each}
    </div>
  {:else if key === 'certifications' && data.certifications.length}
    <div class="card"><h2>Certifications</h2>
      {#each data.certifications as c}<div class="entry"><strong>{c.name}</strong><div class="sub">{c.issuer}{c.issuer && c.year ? ' · ' : ''}{c.year}</div></div>{/each}
    </div>
  {:else if key === 'awards' && data.awards.length}
    <div class="card"><h2>Awards</h2>
      {#each data.awards as a}<div class="entry"><strong>{a.name}</strong><div class="sub">{a.issuer}{a.issuer && a.year ? ' · ' : ''}{a.year}</div></div>{/each}
    </div>
  {:else if key === 'interests' && data.interests.length}
    <div class="card"><h2>Interests</h2><div class="chips">{#each data.interests as i}<span>{i}</span>{/each}</div></div>
  {/if}
{/snippet}

<div class="cv-page card-tpl" style="--a:{accent}">
  <header>
    {#if data.basics.photo}<img class="photo" src={data.basics.photo} alt="" />{/if}
    <div>
      <h1>{data.basics.name || 'Your Name'}</h1>
      {#if data.basics.title}<p class="title">{data.basics.title}</p>{/if}
      <div class="contact">
        {#if data.basics.email}<span>{data.basics.email}</span>{/if}
        {#if data.basics.phone}<span>{data.basics.phone}</span>{/if}
        {#if data.basics.location}<span>{data.basics.location}</span>{/if}
        {#if data.basics.website}<span>{data.basics.website}</span>{/if}
      </div>
    </div>
  </header>

  {#if data.basics.summary}
    <div class="card wide"><h2>Profile</h2><p class="summary">{data.basics.summary}</p></div>
  {/if}

  <div class="grid">
    <div class="col">
      {#each order.filter((k) => LEFT.includes(k)) as key (key)}{@render sec(key)}{/each}
    </div>
    <div class="col">
      {#each order.filter((k) => RIGHT.includes(k)) as key (key)}{@render sec(key)}{/each}
    </div>
  </div>
</div>

<style>
  .cv-page {
    width: 210mm;
    min-height: 297mm;
    background: #f8fafc;
    color: #1e293b;
    padding: 20mm 18mm;
    font-family: var(--cv-font, 'Inter', system-ui, sans-serif);
    font-size: 10pt;
    line-height: 1.45;
  }
  header {
    display: flex;
    align-items: center;
    gap: 18px;
    margin-bottom: 16px;
  }
  .photo {
    width: 84px;
    height: 84px;
    border-radius: 50%;
    object-fit: cover;
    border: 3px solid var(--a);
    flex-shrink: 0;
  }
  h1 {
    margin: 0;
    font-size: 22pt;
    color: var(--a);
  }
  .title {
    margin: 2px 0 8px;
    font-weight: 600;
    font-size: 11.5pt;
  }
  .contact {
    display: flex;
    flex-wrap: wrap;
    gap: 4px 16px;
    font-size: 9pt;
    color: #475569;
  }
  .grid {
    display: grid;
    grid-template-columns: 1.6fr 1fr;
    gap: 14px;
    align-items: start;
  }
  .col {
    display: flex;
    flex-direction: column;
    gap: 14px;
  }
  .card {
    background: #fff;
    border: 1px solid #e2e8f0;
    border-radius: 12px;
    padding: 14px 16px;
  }
  .card.wide {
    margin-bottom: 14px;
  }
  h2 {
    font-size: 10.5pt;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    color: var(--a);
    margin: 0 0 9px;
    padding-bottom: 6px;
    border-bottom: 2px solid color-mix(in srgb, var(--a) 25%, #fff);
  }
  .summary {
    margin: 0;
  }
  .entry {
    margin-bottom: 11px;
  }
  .entry:last-child {
    margin-bottom: 0;
  }
  .row {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    gap: 10px;
  }
  .row strong {
    font-size: 10.5pt;
    min-width: 0;
    overflow-wrap: anywhere;
  }
  .dates {
    color: #64748b;
    font-size: 8.5pt;
    white-space: nowrap;
    flex-shrink: 0;
  }
  .kv strong {
    min-width: 0;
    overflow-wrap: anywhere;
  }
  .kv span {
    flex-shrink: 0;
  }
  .sub {
    color: #475569;
    font-size: 9pt;
  }
  ul {
    margin: 4px 0 0;
    padding-left: 15px;
  }
  li {
    margin-bottom: 2px;
  }
  .proj {
    margin: 2px 0 0;
  }
  .chips {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
  }
  .chips span {
    background: color-mix(in srgb, var(--a) 12%, #fff);
    color: var(--a);
    padding: 3px 9px;
    border-radius: 12px;
    font-size: 8.5pt;
  }
  .kv {
    display: flex;
    justify-content: space-between;
    gap: 8px;
    margin-bottom: 5px;
    font-size: 9.5pt;
  }
  .kv span {
    color: #64748b;
    text-align: right;
  }
</style>
