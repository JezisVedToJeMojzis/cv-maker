<script>
  let { data, accent, order = [] } = $props();
  const dates = (a, b) => `${a || ''}${a && b ? ' – ' : ''}${b || ''}`;
  const SIDE = ['skills', 'languages', 'education', 'certifications', 'interests'];
  const MAIN = ['experience', 'projects', 'volunteering', 'publications', 'awards'];
</script>

{#snippet sec(key)}
  {#if key === 'skills' && data.skills.length}
    <h2>Skills</h2>
    <ul class="tags">{#each data.skills as s}<li>{s}</li>{/each}</ul>
  {:else if key === 'languages' && data.languages.length}
    <h2>Languages</h2>
    {#each data.languages as l}<div class="mini"><strong>{l.name}</strong><span>{l.level}</span></div>{/each}
  {:else if key === 'education' && data.education.length}
    <h2>Education</h2>
    {#each data.education as e}
      <div class="mini"><strong>{e.degree}</strong><span>{e.school}</span><em>{dates(e.start, e.end)}{e.note ? ' · ' + e.note : ''}</em></div>
    {/each}
  {:else if key === 'certifications' && data.certifications.length}
    <h2>Certifications</h2>
    {#each data.certifications as c}<div class="mini"><strong>{c.name}</strong><span>{c.issuer}{c.issuer && c.year ? ' · ' : ''}{c.year}</span></div>{/each}
  {:else if key === 'interests' && data.interests.length}
    <h2>Interests</h2>
    <ul class="tags">{#each data.interests as i}<li>{i}</li>{/each}</ul>
  {:else if key === 'experience' && data.experience.length}
    <section><h3>Experience</h3>
      {#each data.experience as x}
        <div class="entry">
          <div class="row"><strong>{x.role}</strong><span class="dates">{dates(x.start, x.end)}</span></div>
          <div class="sub">{[x.company, x.location, x.mode].filter(Boolean).join(' · ')}</div>
          {#if x.companyDesc}<div class="co-desc">{x.companyDesc}</div>{/if}
          <ul>{#each x.bullets.filter(Boolean) as b}<li>{b}</li>{/each}</ul>
        </div>
      {/each}
    </section>
  {:else if key === 'projects' && data.projects.length}
    <section><h3>Projects</h3>
      {#each data.projects as p}
        <div class="entry"><div class="row"><strong>{p.name}</strong>{#if p.link}<span class="dates">{p.link}</span>{/if}</div><p class="proj">{p.description}</p></div>
      {/each}
    </section>
  {:else if key === 'volunteering' && data.volunteering.length}
    <section><h3>Volunteering</h3>
      {#each data.volunteering as v}
        <div class="entry"><div class="row"><strong>{v.role}</strong><span class="dates">{dates(v.start, v.end)}</span></div><div class="sub">{v.org}</div>{#if v.description}<p class="proj">{v.description}</p>{/if}</div>
      {/each}
    </section>
  {:else if key === 'publications' && data.publications.length}
    <section><h3>Publications</h3>
      {#each data.publications as p}
        <div class="entry"><div class="row"><strong>{p.title}</strong><span class="dates">{p.year}</span></div><div class="sub">{p.venue}{p.link ? ' · ' + p.link : ''}</div></div>
      {/each}
    </section>
  {:else if key === 'awards' && data.awards.length}
    <section><h3>Awards &amp; Honours</h3>
      {#each data.awards as a}
        <div class="entry"><div class="row"><strong>{a.name}</strong><span class="dates">{a.year}</span></div>{#if a.issuer}<div class="sub">{a.issuer}</div>{/if}</div>
      {/each}
    </section>
  {/if}
{/snippet}

<div class="cv-page slate" style="--a:{accent}">
  <aside class="side">
    {#if data.basics.photo}<img class="photo" src={data.basics.photo} alt="" />{/if}
    <h1>{data.basics.name || 'Your Name'}</h1>
    {#if data.basics.title}<p class="title">{data.basics.title}</p>{/if}

    <div class="contact">
      {#if data.basics.email}<span>{data.basics.email}</span>{/if}
      {#if data.basics.phone}<span>{data.basics.phone}</span>{/if}
      {#if data.basics.location}<span>{data.basics.location}</span>{/if}
      {#if data.basics.website}<span>{data.basics.website}</span>{/if}
    </div>

    {#each order.filter((k) => SIDE.includes(k)) as key (key)}{@render sec(key)}{/each}
  </aside>

  <main class="main">
    {#if data.basics.summary}
      <section><h3>Profile</h3><p class="summary">{data.basics.summary}</p></section>
    {/if}
    {#each order.filter((k) => MAIN.includes(k)) as key (key)}{@render sec(key)}{/each}
  </main>
</div>

<style>
  .cv-page {
    display: grid;
    grid-template-columns: 34% 1fr;
    width: 210mm;
    min-height: 297mm;
    background: #fff;
    color: #1e293b;
    font-family: var(--cv-font, 'Inter', system-ui, sans-serif);
    font-size: 10.5pt;
    line-height: 1.45;
  }
  .side {
    background: #1f2937;
    color: #e5e7eb;
    padding: 24px 20px;
  }
  .photo {
    width: 92px;
    height: 92px;
    border-radius: 50%;
    object-fit: cover;
    border: 3px solid var(--a);
    margin-bottom: 12px;
    display: block;
  }
  h1 {
    margin: 0;
    font-size: 19pt;
    line-height: 1.15;
    color: #fff;
  }
  .title {
    margin: 4px 0 16px;
    color: var(--a);
    font-weight: 600;
  }
  .side h2 {
    font-size: 9.5pt;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: var(--a);
    margin: 18px 0 8px;
    padding-bottom: 4px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.15);
  }
  .contact {
    display: flex;
    flex-direction: column;
    gap: 4px;
    font-size: 9pt;
    word-break: break-word;
    color: #cbd5e1;
  }
  .tags {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-wrap: wrap;
    gap: 5px;
  }
  .tags li {
    background: rgba(255, 255, 255, 0.1);
    padding: 3px 9px;
    border-radius: 10px;
    font-size: 8.5pt;
  }
  .mini {
    display: flex;
    flex-direction: column;
    margin-bottom: 9px;
    font-size: 9pt;
  }
  .mini span {
    color: #cbd5e1;
  }
  .mini em {
    color: #94a3b8;
    font-size: 8.5pt;
  }
  .main {
    padding: 26px 26px;
  }
  .main h3 {
    color: var(--a);
    font-size: 12pt;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    margin: 0 0 8px;
  }
  section {
    margin-bottom: 18px;
  }
  .summary {
    margin: 0;
  }
  .entry {
    margin-bottom: 13px;
  }
  .row {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    gap: 10px;
  }
  .row strong {
    font-size: 11pt;
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
    margin-bottom: 3px;
  }
  ul {
    margin: 4px 0 0;
    padding-left: 16px;
  }
  li {
    margin-bottom: 3px;
  }
  .proj {
    margin: 2px 0 0;
  }
</style>
