<script>
  let { data, accent } = $props();
</script>

<div class="cv-page classic" style="--a:{accent}">
  <header>
    {#if data.basics.photo}<img class="photo" src={data.basics.photo} alt="" />{/if}
    <h1>{data.basics.name || 'Your Name'}</h1>
    {#if data.basics.title}<p class="title">{data.basics.title}</p>{/if}
    <div class="contact">
      {#if data.basics.email}<span>{data.basics.email}</span>{/if}
      {#if data.basics.phone}<span>{data.basics.phone}</span>{/if}
      {#if data.basics.location}<span>{data.basics.location}</span>{/if}
      {#if data.basics.website}<span>{data.basics.website}</span>{/if}
    </div>
  </header>

  {#if data.basics.summary}
    <section>
      <h2>Summary</h2>
      <p>{data.basics.summary}</p>
    </section>
  {/if}

  {#if data.experience.length}
    <section>
      <h2>Experience</h2>
      {#each data.experience as x}
        <div class="entry">
          <div class="entry-head">
            <strong>{x.role}, {x.company}</strong>
            <span class="dates">{x.start}{x.start && x.end ? ' – ' : ''}{x.end}</span>
          </div>
          {#if x.location || x.mode}<div class="loc">{[x.location, x.mode].filter(Boolean).join(' · ')}</div>{/if}
          <ul>
            {#each x.bullets.filter(Boolean) as b}<li>{b}</li>{/each}
          </ul>
        </div>
      {/each}
    </section>
  {/if}

  {#if data.education.length}
    <section>
      <h2>Education</h2>
      {#each data.education as e}
        <div class="entry">
          <div class="entry-head">
            <strong>{e.degree} — {e.school}</strong>
            <span class="dates">{e.start}{e.start && e.end ? ' – ' : ''}{e.end}</span>
          </div>
          {#if e.note}<div class="loc">{e.note}</div>{/if}
        </div>
      {/each}
    </section>
  {/if}

  {#if data.certifications.length}
    <section>
      <h2>Certifications</h2>
      {#each data.certifications as c}
        <div class="entry">
          <div class="entry-head">
            <strong>{c.name}</strong>
            <span class="dates">{c.year}</span>
          </div>
          {#if c.issuer}<div class="loc">{c.issuer}</div>{/if}
        </div>
      {/each}
    </section>
  {/if}

  {#if data.projects.length}
    <section>
      <h2>Projects</h2>
      {#each data.projects as p}
        <div class="entry">
          <div class="entry-head">
            <strong>{p.name}</strong>
            {#if p.link}<span class="dates">{p.link}</span>{/if}
          </div>
          <p class="proj">{p.description}</p>
        </div>
      {/each}
    </section>
  {/if}

  {#if data.volunteering.length}
    <section>
      <h2>Volunteering</h2>
      {#each data.volunteering as v}
        <div class="entry">
          <div class="entry-head">
            <strong>{v.role}, {v.org}</strong>
            <span class="dates">{v.start}{v.start && v.end ? ' – ' : ''}{v.end}</span>
          </div>
          {#if v.description}<div class="loc">{v.description}</div>{/if}
        </div>
      {/each}
    </section>
  {/if}

  {#if data.publications.length}
    <section>
      <h2>Publications</h2>
      {#each data.publications as p}
        <div class="entry">
          <div class="entry-head">
            <strong>{p.title}</strong>
            <span class="dates">{p.year}</span>
          </div>
          <div class="loc">{p.venue}{p.link ? ' · ' + p.link : ''}</div>
        </div>
      {/each}
    </section>
  {/if}

  {#if data.awards.length}
    <section>
      <h2>Awards & Honours</h2>
      {#each data.awards as a}
        <div class="entry">
          <div class="entry-head">
            <strong>{a.name}</strong>
            <span class="dates">{a.year}</span>
          </div>
          {#if a.issuer}<div class="loc">{a.issuer}</div>{/if}
        </div>
      {/each}
    </section>
  {/if}

  {#if data.skills.length}
    <section>
      <h2>Skills</h2>
      <p class="skills">{data.skills.join('  ·  ')}</p>
    </section>
  {/if}

  {#if data.languages.length}
    <section>
      <h2>Languages</h2>
      <p class="skills">{data.languages.map((l) => l.level ? `${l.name} (${l.level})` : l.name).join('  ·  ')}</p>
    </section>
  {/if}

  {#if data.interests.length}
    <section>
      <h2>Interests</h2>
      <p class="skills">{data.interests.join('  ·  ')}</p>
    </section>
  {/if}
</div>

<style>
  .cv-page {
    width: 210mm;
    min-height: 297mm;
    background: #fff;
    color: #1e293b;
    padding: 26mm 22mm;
    font-family: var(--cv-font, 'Georgia', 'Times New Roman', serif);
    font-size: 11pt;
    line-height: 1.5;
  }
  header {
    text-align: center;
    border-bottom: 2px solid var(--a);
    padding-bottom: 12px;
    margin-bottom: 18px;
  }
  .photo {
    width: 92px;
    height: 92px;
    border-radius: 50%;
    object-fit: cover;
    border: 2px solid var(--a);
    margin-bottom: 8px;
  }
  h1 {
    margin: 0;
    font-size: 24pt;
    letter-spacing: 0.02em;
  }
  .title {
    margin: 4px 0 8px;
    color: var(--a);
    font-size: 12pt;
  }
  .contact {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 4px 14px;
    font-size: 9.5pt;
    color: #475569;
  }
  h2 {
    font-size: 12pt;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: var(--a);
    border-bottom: 1px solid #cbd5e1;
    padding-bottom: 3px;
    margin: 0 0 8px;
  }
  section {
    margin-bottom: 16px;
  }
  section > p {
    margin: 0;
  }
  .entry {
    margin-bottom: 12px;
  }
  .entry-head {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    gap: 10px;
  }
  .entry-head strong {
    min-width: 0;
    overflow-wrap: anywhere;
  }
  .dates {
    color: #64748b;
    font-size: 10pt;
    white-space: nowrap;
    flex-shrink: 0;
  }
  .loc {
    color: #475569;
    font-style: italic;
    font-size: 10pt;
  }
  ul {
    margin: 4px 0 0;
    padding-left: 18px;
  }
  li {
    margin-bottom: 3px;
  }
  .proj {
    margin: 2px 0 0;
  }
  .skills {
    margin: 0;
  }
</style>
