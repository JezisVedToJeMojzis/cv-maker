<script>
  let { data, accent, order = [] } = $props();
  const dates = (a, b) => `${a || ''}${a && b ? ' – ' : ''}${b || ''}`;
  const TOP = ['experience', 'projects', 'volunteering'];
  const LEFT = ['education', 'publications'];
  const RIGHT = ['skills', 'languages', 'certifications', 'awards', 'interests'];
</script>

{#snippet sec(key)}
  {#if key === 'experience' && data.experience.length}
    <section>
      <h2>Experience</h2>
      {#each data.experience as x}
        <div class="entry">
          <div class="row"><strong>{x.role}</strong><span class="dates">{dates(x.start, x.end)}</span></div>
          <div class="sub">{[x.company, x.location, x.mode].filter(Boolean).join(' · ')}</div>
          {#if x.companyDesc}<div class="co-desc">{x.companyDesc}</div>{/if}
          {#if x.skills?.length}<div class="entry-skills">{#each x.skills as s}<span>{s}</span>{/each}</div>{/if}
          <ul>{#each x.bullets.filter(Boolean) as b}<li>{b}</li>{/each}</ul>
        </div>
      {/each}
    </section>
  {:else if key === 'projects' && data.projects.length}
    <section>
      <h2>Projects</h2>
      {#each data.projects as p}
        <div class="entry">
          <div class="row"><strong>{p.name}</strong>{#if p.link}<span class="dates">{p.link}</span>{/if}</div>
          <div class="sub">{p.description}</div>
          {#if p.skills?.length}<div class="entry-skills">{#each p.skills as s}<span>{s}</span>{/each}</div>{/if}
        </div>
      {/each}
    </section>
  {:else if key === 'volunteering' && data.volunteering.length}
    <section>
      <h2>Volunteering</h2>
      {#each data.volunteering as v}
        <div class="entry">
          <div class="row"><strong>{v.role}</strong><span class="dates">{dates(v.start, v.end)}</span></div>
          <div class="sub">{v.org}{v.description ? ' — ' + v.description : ''}</div>
          {#if v.skills?.length}<div class="entry-skills">{#each v.skills as s}<span>{s}</span>{/each}</div>{/if}
        </div>
      {/each}
    </section>
  {:else if key === 'education' && data.education.length}
    <section>
      <h2>Education</h2>
      {#each data.education as e}
        <div class="entry">
          <div class="row"><strong>{e.degree}</strong><span class="dates">{dates(e.start, e.end)}</span></div>
          <div class="sub">{e.school}{e.note ? ' · ' + e.note : ''}</div>
          {#if e.skills?.length}<div class="entry-skills">{#each e.skills as s}<span>{s}</span>{/each}</div>{/if}
        </div>
      {/each}
    </section>
  {:else if key === 'publications' && data.publications.length}
    <section>
      <h2>Publications</h2>
      {#each data.publications as p}
        <div class="entry">
          <div class="row"><strong>{p.title}</strong><span class="dates">{p.year}</span></div>
          <div class="sub">{p.venue}{p.link ? ' · ' + p.link : ''}</div>
        </div>
      {/each}
    </section>
  {:else if key === 'skills' && data.skills.length}
    <section><h2>Skills</h2>
      <div class="chips">{#each data.skills as s}<span>{s}</span>{/each}</div>
    </section>
  {:else if key === 'languages' && data.languages.length}
    <section><h2>Languages</h2>
      {#each data.languages as l}<div class="kv"><strong>{l.name}</strong><span>{l.level}</span></div>{/each}
    </section>
  {:else if key === 'certifications' && data.certifications.length}
    <section><h2>Certifications</h2>
      {#each data.certifications as c}<div class="kv"><strong>{c.name}</strong><span>{c.issuer}{c.issuer && c.year ? ' · ' : ''}{c.year}</span></div>{/each}
    </section>
  {:else if key === 'awards' && data.awards.length}
    <section><h2>Awards</h2>
      {#each data.awards as a}<div class="kv"><strong>{a.name}</strong><span>{a.issuer}{a.issuer && a.year ? ' · ' : ''}{a.year}</span></div>{/each}
    </section>
  {:else if key === 'interests' && data.interests.length}
    <section><h2>Interests</h2>
      <div class="chips">{#each data.interests as i}<span>{i}</span>{/each}</div>
    </section>
  {/if}
{/snippet}

<div class="cv-page banner" style="--a:{accent}">
  <header>
    {#if data.basics.photo}<img class="photo" src={data.basics.photo} alt="" />{/if}
    <div class="head-text">
      <h1>{data.basics.name || 'Your Name'}</h1>
      {#if data.basics.title}<p class="title">{data.basics.title}</p>{/if}
      <div class="contact">
        {#if data.basics.email}<span>✉ {data.basics.email}</span>{/if}
        {#if data.basics.phone}<span>☎ {data.basics.phone}</span>{/if}
        {#if data.basics.location}<span>◍ {data.basics.location}</span>{/if}
        {#if data.basics.website}<span>⬡ {data.basics.website}</span>{/if}
      </div>
    </div>
  </header>

  <div class="body">
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
</div>

<style>
  .cv-page {
    width: 210mm;
    min-height: 297mm;
    background: #fff;
    color: #1e293b;
    font-family: var(--cv-font, 'Poppins', system-ui, sans-serif);
    font-size: 10pt;
    line-height: 1.45;
  }
  header {
    background: var(--a);
    color: #fff;
    padding: 26px 30px;
    display: flex;
    align-items: center;
    gap: 22px;
  }
  .photo {
    width: 92px;
    height: 92px;
    border-radius: 12px;
    object-fit: cover;
    border: 3px solid rgba(255, 255, 255, 0.5);
    flex-shrink: 0;
  }
  h1 {
    margin: 0;
    font-size: 24pt;
    line-height: 1.1;
  }
  .title {
    margin: 4px 0 10px;
    font-size: 12pt;
    opacity: 0.92;
  }
  .contact {
    display: flex;
    flex-wrap: wrap;
    gap: 4px 18px;
    font-size: 9pt;
  }
  .body {
    padding: 22px 30px;
  }
  .summary {
    margin: 0 0 16px;
  }
  h2 {
    color: var(--a);
    font-size: 12pt;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    border-bottom: 2px solid var(--a);
    padding-bottom: 3px;
    margin: 0 0 8px;
  }
  section {
    margin-bottom: 16px;
  }
  .two {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 26px;
  }
  .entry {
    margin-bottom: 10px;
  }
  .row {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    gap: 12px;
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
  .kv {
    align-items: baseline;
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
    font-size: 9.5pt;
  }
  ul {
    margin: 4px 0 0;
    padding-left: 16px;
  }
  li {
    margin-bottom: 3px;
  }
  .chips {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
  }
  .chips span {
    background: color-mix(in srgb, var(--a) 14%, #fff);
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
