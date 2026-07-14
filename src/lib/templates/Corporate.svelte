<script>
  let { data, accent, order = [] } = $props();
  const dates = (a, b) => `${a || ''}${a && b ? ' – ' : ''}${b || ''}`;
</script>

{#snippet sec(key)}
  {#if key === 'experience' && data.experience.length}
    <div class="block"><div class="label">Experience</div>
      <div class="content">
        {#each data.experience as x}
          <div class="entry">
            <div class="row"><strong>{x.role}</strong><span class="dates">{dates(x.start, x.end)}</span></div>
            <div class="sub">{[x.company, x.location, x.mode].filter(Boolean).join(' · ')}</div>
            {#if x.companyDesc}<div class="co-desc">{x.companyDesc}</div>{/if}
            <ul>{#each x.bullets.filter(Boolean) as b}<li>{b}</li>{/each}</ul>
          </div>
        {/each}
      </div>
    </div>
  {:else if key === 'education' && data.education.length}
    <div class="block"><div class="label">Education</div>
      <div class="content">
        {#each data.education as e}
          <div class="entry"><div class="row"><strong>{e.degree}</strong><span class="dates">{dates(e.start, e.end)}</span></div><div class="sub">{e.school}{e.note ? ' · ' + e.note : ''}</div></div>
        {/each}
      </div>
    </div>
  {:else if key === 'projects' && data.projects.length}
    <div class="block"><div class="label">Projects</div>
      <div class="content">
        {#each data.projects as p}
          <div class="entry"><div class="row"><strong>{p.name}</strong>{#if p.link}<span class="dates">{p.link}</span>{/if}</div><div class="sub">{p.description}</div></div>
        {/each}
      </div>
    </div>
  {:else if key === 'volunteering' && data.volunteering.length}
    <div class="block"><div class="label">Volunteering</div>
      <div class="content">
        {#each data.volunteering as v}
          <div class="entry"><div class="row"><strong>{v.role}</strong><span class="dates">{dates(v.start, v.end)}</span></div><div class="sub">{v.org}{v.description ? ' — ' + v.description : ''}</div></div>
        {/each}
      </div>
    </div>
  {:else if key === 'publications' && data.publications.length}
    <div class="block"><div class="label">Publications</div>
      <div class="content">
        {#each data.publications as p}
          <div class="entry"><div class="row"><strong>{p.title}</strong><span class="dates">{p.year}</span></div><div class="sub">{p.venue}{p.link ? ' · ' + p.link : ''}</div></div>
        {/each}
      </div>
    </div>
  {:else if key === 'certifications' && data.certifications.length}
    <div class="block"><div class="label">Certifications</div>
      <div class="content">
        {#each data.certifications as c}
          <div class="entry"><div class="row"><strong>{c.name}</strong><span class="dates">{c.year}</span></div><div class="sub">{c.issuer}</div></div>
        {/each}
      </div>
    </div>
  {:else if key === 'awards' && data.awards.length}
    <div class="block"><div class="label">Awards</div>
      <div class="content">
        {#each data.awards as a}
          <div class="entry"><div class="row"><strong>{a.name}</strong><span class="dates">{a.year}</span></div>{#if a.issuer}<div class="sub">{a.issuer}</div>{/if}</div>
        {/each}
      </div>
    </div>
  {:else if key === 'skills' && data.skills.length}
    <div class="block"><div class="label">Skills</div><div class="content"><p class="inline">{data.skills.join('  ·  ')}</p></div></div>
  {:else if key === 'languages' && data.languages.length}
    <div class="block"><div class="label">Languages</div><div class="content"><p class="inline">{data.languages.map((l) => (l.level ? `${l.name} (${l.level})` : l.name)).join('  ·  ')}</p></div></div>
  {:else if key === 'interests' && data.interests.length}
    <div class="block"><div class="label">Interests</div><div class="content"><p class="inline">{data.interests.join('  ·  ')}</p></div></div>
  {/if}
{/snippet}

<div class="cv-page corporate" style="--a:{accent}">
  <header>
    {#if data.basics.photo}<img class="photo" src={data.basics.photo} alt="" />{/if}
    <div class="head-text">
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

  {#if data.basics.summary}
    <div class="block"><div class="label">Profile</div><div class="content"><p class="summary">{data.basics.summary}</p></div></div>
  {/if}

  {#each order as key (key)}{@render sec(key)}{/each}
</div>

<style>
  .cv-page {
    width: 210mm;
    min-height: 297mm;
    background: #fff;
    color: #1e293b;
    padding: 22mm 20mm;
    font-family: var(--cv-font, 'Inter', system-ui, sans-serif);
    font-size: 10.5pt;
    line-height: 1.5;
  }
  header {
    display: flex;
    align-items: center;
    gap: 18px;
    border-bottom: 3px solid var(--a);
    padding-bottom: 16px;
    margin-bottom: 18px;
  }
  .photo {
    width: 78px;
    height: 78px;
    border-radius: 8px;
    object-fit: cover;
    flex-shrink: 0;
  }
  .head-text {
    flex: 1;
  }
  h1 {
    margin: 0;
    font-size: 23pt;
    letter-spacing: 0.01em;
  }
  .title {
    margin: 3px 0 0;
    color: var(--a);
    font-weight: 600;
    font-size: 12pt;
  }
  .contact {
    display: flex;
    flex-direction: column;
    gap: 3px;
    text-align: right;
    font-size: 9pt;
    color: #475569;
  }
  /* Left gutter label + content = strong vertical alignment across sections. */
  .block {
    display: grid;
    grid-template-columns: 130px 1fr;
    gap: 16px;
    padding: 10px 0;
    border-top: 1px solid #eef2f6;
  }
  .block:first-of-type {
    border-top: none;
  }
  .label {
    font-size: 10pt;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: var(--a);
    font-weight: 700;
    padding-top: 2px;
  }
  .content {
    min-width: 0;
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
  }
  ul {
    margin: 4px 0 0;
    padding-left: 16px;
  }
  li {
    margin-bottom: 3px;
  }
  .inline {
    margin: 0;
  }
</style>
