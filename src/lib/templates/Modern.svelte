<script>
  let { data, accent, order = [] } = $props();
  const SIDE = ['skills', 'languages', 'education', 'certifications', 'interests'];
  const MAIN = ['experience', 'projects', 'volunteering', 'publications', 'awards'];
</script>

{#snippet sec(key)}
  {#if key === 'skills' && data.skills.length}
    <h2>Skills</h2>
    <ul class="skills">
      {#each data.skills as s}<li>{s}</li>{/each}
    </ul>
  {:else if key === 'languages' && data.languages.length}
    <h2>Languages</h2>
    {#each data.languages as l}
      <div class="edu"><strong>{l.name}</strong><span class="note">{l.level}</span></div>
    {/each}
  {:else if key === 'education' && data.education.length}
    <h2>Education</h2>
    {#each data.education as e}
      <div class="edu">
        <strong>{e.degree}</strong>
        <span>{e.school}</span>
        <em>{e.start}{e.start && e.end ? ' – ' : ''}{e.end}</em>
        {#if e.note}<span class="note">{e.note}</span>{/if}
        {#if e.skills?.length}<div class="entry-skills">{#each e.skills as s}<span>{s}</span>{/each}</div>{/if}
      </div>
    {/each}
  {:else if key === 'certifications' && data.certifications.length}
    <h2>Certifications</h2>
    {#each data.certifications as c}
      <div class="edu">
        <strong>{c.name}</strong>
        <span class="note">{c.issuer}{c.issuer && c.year ? ' · ' : ''}{c.year}</span>
      </div>
    {/each}
  {:else if key === 'interests' && data.interests.length}
    <h2>Interests</h2>
    <ul class="skills">
      {#each data.interests as i}<li>{i}</li>{/each}
    </ul>
  {:else if key === 'experience' && data.experience.length}
    <section>
      <h2>Experience</h2>
      {#each data.experience as x}
        <div class="entry">
          <div class="entry-head">
            <strong>{x.role}</strong>
            <span class="dates">{x.start}{x.start && x.end ? ' – ' : ''}{x.end}</span>
          </div>
          <div class="entry-sub">{[x.company, x.location, x.mode].filter(Boolean).join(' · ')}</div>
          {#if x.companyDesc}<div class="co-desc">{x.companyDesc}</div>{/if}
          {#if x.skills?.length}<div class="entry-skills">{#each x.skills as s}<span>{s}</span>{/each}</div>{/if}
          <ul>
            {#each x.bullets.filter(Boolean) as b}<li>{b}</li>{/each}
          </ul>
        </div>
      {/each}
    </section>
  {:else if key === 'projects' && data.projects.length}
    <section>
      <h2>Projects</h2>
      {#each data.projects as p}
        <div class="entry">
          <div class="entry-head">
            <strong>{p.name}</strong>
            {#if p.link}<span class="dates">{p.link}</span>{/if}
          </div>
          <p class="proj">{p.description}</p>
          {#if p.skills?.length}<div class="entry-skills">{#each p.skills as s}<span>{s}</span>{/each}</div>{/if}
        </div>
      {/each}
    </section>
  {:else if key === 'volunteering' && data.volunteering.length}
    <section>
      <h2>Volunteering</h2>
      {#each data.volunteering as v}
        <div class="entry">
          <div class="entry-head">
            <strong>{v.role}</strong>
            <span class="dates">{v.start}{v.start && v.end ? ' – ' : ''}{v.end}</span>
          </div>
          <div class="entry-sub">{v.org}</div>
          {#if v.description}<p class="proj">{v.description}</p>{/if}
          {#if v.skills?.length}<div class="entry-skills">{#each v.skills as s}<span>{s}</span>{/each}</div>{/if}
        </div>
      {/each}
    </section>
  {:else if key === 'publications' && data.publications.length}
    <section>
      <h2>Publications</h2>
      {#each data.publications as p}
        <div class="entry">
          <div class="entry-head">
            <strong>{p.title}</strong>
            <span class="dates">{p.year}</span>
          </div>
          <div class="entry-sub">{p.venue}{p.link ? ' · ' + p.link : ''}</div>
        </div>
      {/each}
    </section>
  {:else if key === 'awards' && data.awards.length}
    <section>
      <h2>Awards & Honours</h2>
      {#each data.awards as a}
        <div class="entry">
          <div class="entry-head">
            <strong>{a.name}</strong>
            <span class="dates">{a.year}</span>
          </div>
          {#if a.issuer}<div class="entry-sub">{a.issuer}</div>{/if}
        </div>
      {/each}
    </section>
  {/if}
{/snippet}

<div class="cv-page modern" style="--a:{accent}">
  <aside class="side">
    {#if data.basics.photo}
      <img class="photo" src={data.basics.photo} alt="" />
    {/if}
    <h1>{data.basics.name || 'Your Name'}</h1>
    {#if data.basics.title}<p class="title">{data.basics.title}</p>{/if}

    <div class="contact">
      {#if data.basics.email}<span>✉ {data.basics.email}</span>{/if}
      {#if data.basics.phone}<span>☎ {data.basics.phone}</span>{/if}
      {#if data.basics.location}<span>◍ {data.basics.location}</span>{/if}
      {#if data.basics.website}<span>⬡ {data.basics.website}</span>{/if}
    </div>

    {#each order.filter((k) => SIDE.includes(k)) as key (key)}{@render sec(key)}{/each}
  </aside>

  <main class="main">
    {#if data.basics.summary}
      <section>
        <h2>Profile</h2>
        <p class="summary">{data.basics.summary}</p>
      </section>
    {/if}

    {#each order.filter((k) => MAIN.includes(k)) as key (key)}{@render sec(key)}{/each}
  </main>
</div>

<style>
  .cv-page {
    display: grid;
    grid-template-columns: 33% 1fr;
    width: 210mm;
    min-height: 297mm;
    background: #fff;
    color: #1e293b;
    font-family: var(--cv-font, 'Inter', system-ui, sans-serif);
    font-size: 10.5pt;
    line-height: 1.45;
  }
  .side {
    background: var(--a);
    color: #fff;
    padding: 22px 20px;
  }
  .photo {
    width: 96px;
    height: 96px;
    border-radius: 50%;
    object-fit: cover;
    border: 3px solid rgba(255, 255, 255, 0.6);
    margin-bottom: 12px;
  }
  h1 {
    font-size: 20pt;
    margin: 0 0 4px;
    line-height: 1.1;
  }
  .title {
    margin: 0 0 16px;
    opacity: 0.9;
    font-weight: 500;
  }
  .side h2 {
    font-size: 10pt;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    margin: 20px 0 8px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.35);
    padding-bottom: 4px;
  }
  .contact {
    display: flex;
    flex-direction: column;
    gap: 5px;
    font-size: 9pt;
    word-break: break-word;
  }
  .skills {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-wrap: wrap;
    gap: 5px;
  }
  .skills li {
    background: rgba(255, 255, 255, 0.18);
    padding: 3px 8px;
    border-radius: 10px;
    font-size: 8.5pt;
  }
  .edu {
    display: flex;
    flex-direction: column;
    margin-bottom: 10px;
    font-size: 9pt;
  }
  .edu em {
    opacity: 0.85;
  }
  .main {
    padding: 26px 26px;
  }
  .main h2 {
    color: var(--a);
    font-size: 12pt;
    margin: 0 0 8px;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }
  section {
    margin-bottom: 18px;
  }
  .summary {
    margin: 0;
  }
  .entry {
    margin-bottom: 14px;
  }
  .entry-head {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    gap: 10px;
  }
  .entry-head strong {
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
  .entry-sub {
    color: #475569;
    font-size: 9.5pt;
    margin-bottom: 4px;
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
  .note {
    color: rgba(255, 255, 255, 0.85);
  }
</style>
