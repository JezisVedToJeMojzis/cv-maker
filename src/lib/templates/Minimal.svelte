<script>
  import { calcAge } from '../util.js';
  let { data, accent, order = [] } = $props();
  const dates = (a, b) => `${a || ''}${a && b ? ' – ' : ''}${b || ''}`;
</script>

{#snippet sec(key)}
  {#if key === 'experience' && data.experience.length}
    <section><h2>Experience</h2>
      {#each data.experience as x}
        <div class="entry">
          <div class="row"><strong>{x.role}</strong> <span class="at">{[x.company, x.location, x.mode].filter(Boolean).join(' · ')}</span><span class="dates">{dates(x.start, x.end)}</span></div>
          {#if x.companyDesc}<div class="co-desc">{x.companyDesc}</div>{/if}
          {#if x.skills?.length}<div class="entry-skills">{#each x.skills as s}<span>{s}</span>{/each}</div>{/if}
          <ul>{#each x.bullets.filter(Boolean) as b}<li>{b}</li>{/each}</ul>
        </div>
      {/each}
    </section>
  {:else if key === 'projects' && data.projects.length}
    <section><h2>Projects</h2>
      {#each data.projects as p}
        <div class="entry"><div class="row"><strong>{p.name}</strong>{#if p.link}<span class="at">{p.link}</span>{/if}</div><p class="p">{p.description}</p>{#if p.skills?.length}<div class="entry-skills">{#each p.skills as s}<span>{s}</span>{/each}</div>{/if}</div>
      {/each}
    </section>
  {:else if key === 'volunteering' && data.volunteering.length}
    <section><h2>Volunteering</h2>
      {#each data.volunteering as v}
        <div class="entry"><div class="row"><strong>{v.role}</strong> <span class="at">{v.org}</span><span class="dates">{dates(v.start, v.end)}</span></div>{#if v.description}<p class="p">{v.description}</p>{/if}{#if v.skills?.length}<div class="entry-skills">{#each v.skills as s}<span>{s}</span>{/each}</div>{/if}</div>
      {/each}
    </section>
  {:else if key === 'publications' && data.publications.length}
    <section><h2>Publications</h2>
      {#each data.publications as p}
        <div class="entry"><div class="row"><strong>{p.title}</strong><span class="dates">{p.year}</span></div><p class="p">{p.venue}{p.link ? ' · ' + p.link : ''}</p></div>
      {/each}
    </section>
  {:else if key === 'education' && data.education.length}
    <section><h2>Education</h2>
      {#each data.education as e}
        <div class="entry"><div class="row"><strong>{e.degree}</strong> <span class="at">{e.school}{e.note ? ' · ' + e.note : ''}</span><span class="dates">{dates(e.start, e.end)}</span></div>{#if e.skills?.length}<div class="entry-skills">{#each e.skills as s}<span>{s}</span>{/each}</div>{/if}</div>
      {/each}
    </section>
  {:else if key === 'certifications' && data.certifications.length}
    <section><h2>Certifications</h2>
      {#each data.certifications as c}
        <div class="entry"><div class="row"><strong>{c.name}</strong> <span class="at">{c.issuer}</span><span class="dates">{c.year}</span></div></div>
      {/each}
    </section>
  {:else if key === 'awards' && data.awards.length}
    <section><h2>Awards</h2>
      {#each data.awards as a}
        <div class="entry"><div class="row"><strong>{a.name}</strong> <span class="at">{a.issuer}</span><span class="dates">{a.year}</span></div></div>
      {/each}
    </section>
  {:else if key === 'skills' && data.skills.length}
    <section><h2>Skills</h2><ul class="skills-sentences">{#each data.skills as s}<li>{s}</li>{/each}</ul></section>
  {:else if key === 'languages' && data.languages.length}
    <section><h2>Languages</h2><p class="p">{data.languages.map((l) => (l.level ? `${l.name} (${l.level})` : l.name)).join(' · ')}</p></section>
  {:else if key === 'interests' && data.interests.length}
    <section><h2>Interests</h2><p class="p">{data.interests.join(' · ')}</p></section>
  {/if}
{/snippet}

<div class="cv-page minimal" style="--a:{accent}">
  <header>
    {#if data.basics.photo}<img class="photo" src={data.basics.photo} alt="" />{/if}
    <div class="head-main">
      <h1>{data.basics.name || 'Your Name'}</h1>
      {#if data.basics.title}<p class="title">{data.basics.title}</p>{/if}
    </div>
  </header>
  <div class="contact">
    {#if data.basics.email}<span>{data.basics.email}</span>{/if}
    {#if data.basics.phone}<span>{data.basics.phone}</span>{/if}
    {#if data.basics.location}<span>{data.basics.location}</span>{/if}
    {#if data.basics.website}<span>{data.basics.website}</span>{/if}
    {#if calcAge(data.basics.birthdate) !== ''}<span>Age {calcAge(data.basics.birthdate)}</span>{/if}
  </div>

  {#if data.basics.summary}<p class="summary">{data.basics.summary}</p>{/if}

  {#each order as key (key)}{@render sec(key)}{/each}
</div>

<style>
  .cv-page {
    width: 210mm;
    min-height: 297mm;
    background: #fff;
    color: #222;
    padding: 24mm 22mm;
    font-family: var(--cv-font, 'Helvetica Neue', Arial, sans-serif);
    font-size: 10pt;
    line-height: 1.5;
  }
  header {
    display: flex;
    align-items: center;
    gap: 16px;
  }
  .photo {
    width: 66px;
    height: 66px;
    border-radius: 50%;
    object-fit: cover;
    filter: grayscale(0.15);
  }
  h1 {
    margin: 0;
    font-size: 22pt;
    font-weight: 700;
    letter-spacing: -0.01em;
  }
  .title {
    margin: 2px 0 0;
    color: var(--a);
    font-weight: 500;
    font-size: 11pt;
  }
  .contact {
    display: flex;
    flex-wrap: wrap;
    gap: 4px 16px;
    font-size: 9pt;
    color: #666;
    margin: 8px 0 18px;
    padding-bottom: 14px;
    border-bottom: 2px solid var(--a);
  }
  .summary {
    margin: 0 0 18px;
    color: #333;
  }
  h2 {
    font-size: 9.5pt;
    text-transform: uppercase;
    letter-spacing: 0.18em;
    color: #999;
    margin: 0 0 8px;
    font-weight: 600;
  }
  section {
    margin-bottom: 16px;
  }
  .entry {
    margin-bottom: 10px;
  }
  .row {
    display: flex;
    align-items: baseline;
    gap: 8px;
    flex-wrap: wrap;
  }
  .row strong {
    font-size: 10.5pt;
  }
  .at {
    color: #666;
    font-size: 9.5pt;
    min-width: 0;
    overflow-wrap: anywhere;
  }
  .dates {
    margin-left: auto;
    color: #999;
    font-size: 9pt;
    white-space: nowrap;
    flex-shrink: 0;
  }
  ul {
    margin: 3px 0 0;
    padding-left: 16px;
  }
  li {
    margin-bottom: 2px;
  }
  .p {
    margin: 2px 0 0;
    color: #333;
  }
</style>
