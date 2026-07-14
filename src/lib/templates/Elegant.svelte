<script>
  let { data, accent } = $props();
  const dates = (a, b) => `${a || ''}${a && b ? ' – ' : ''}${b || ''}`;
</script>

<div class="cv-page elegant" style="--a:{accent}">
  <header>
    {#if data.basics.photo}<img class="photo" src={data.basics.photo} alt="" />{/if}
    <h1>{data.basics.name || 'Your Name'}</h1>
    {#if data.basics.title}<p class="title">{data.basics.title}</p>{/if}
    <div class="rule"></div>
    <div class="contact">
      {#if data.basics.email}<span>{data.basics.email}</span>{/if}
      {#if data.basics.phone}<span>{data.basics.phone}</span>{/if}
      {#if data.basics.location}<span>{data.basics.location}</span>{/if}
      {#if data.basics.website}<span>{data.basics.website}</span>{/if}
    </div>
  </header>

  {#if data.basics.summary}<p class="summary">{data.basics.summary}</p>{/if}

  {#if data.experience.length}
    <section>
      <h2>Experience</h2>
      {#each data.experience as x}
        <div class="entry">
          <div class="row"><strong>{x.role}</strong><span class="dates">{dates(x.start, x.end)}</span></div>
          <div class="sub">{[x.company, x.location, x.mode].filter(Boolean).join(' · ')}</div>
          <ul>{#each x.bullets.filter(Boolean) as b}<li>{b}</li>{/each}</ul>
        </div>
      {/each}
    </section>
  {/if}

  <div class="two">
    <div>
      {#if data.education.length}
        <section>
          <h2>Education</h2>
          {#each data.education as e}
            <div class="entry">
              <div class="row"><strong>{e.degree}</strong><span class="dates">{dates(e.start, e.end)}</span></div>
              <div class="sub">{e.school}{e.note ? ' · ' + e.note : ''}</div>
            </div>
          {/each}
        </section>
      {/if}
      {#if data.projects.length}
        <section>
          <h2>Projects</h2>
          {#each data.projects as p}
            <div class="entry">
              <div class="row"><strong>{p.name}</strong>{#if p.link}<span class="dates">{p.link}</span>{/if}</div>
              <div class="sub">{p.description}</div>
            </div>
          {/each}
        </section>
      {/if}
      {#if data.volunteering.length}
        <section>
          <h2>Volunteering</h2>
          {#each data.volunteering as v}
            <div class="entry">
              <div class="row"><strong>{v.role}</strong><span class="dates">{dates(v.start, v.end)}</span></div>
              <div class="sub">{v.org}{v.description ? ' — ' + v.description : ''}</div>
            </div>
          {/each}
        </section>
      {/if}
      {#if data.publications.length}
        <section>
          <h2>Publications</h2>
          {#each data.publications as p}
            <div class="entry">
              <div class="row"><strong>{p.title}</strong><span class="dates">{p.year}</span></div>
              <div class="sub">{p.venue}{p.link ? ' · ' + p.link : ''}</div>
            </div>
          {/each}
        </section>
      {/if}
    </div>
    <div>
      {#if data.skills.length}
        <section><h2>Skills</h2><p class="inline">{data.skills.join(' · ')}</p></section>
      {/if}
      {#if data.languages.length}
        <section><h2>Languages</h2>
          {#each data.languages as l}<div class="mini"><strong>{l.name}</strong><span>{l.level}</span></div>{/each}
        </section>
      {/if}
      {#if data.certifications.length}
        <section><h2>Certifications</h2>
          {#each data.certifications as c}<div class="mini"><strong>{c.name}</strong><span>{c.issuer}{c.issuer && c.year ? ' · ' : ''}{c.year}</span></div>{/each}
        </section>
      {/if}
      {#if data.awards.length}
        <section><h2>Awards</h2>
          {#each data.awards as a}<div class="mini"><strong>{a.name}</strong><span>{a.issuer}{a.issuer && a.year ? ' · ' : ''}{a.year}</span></div>{/each}
        </section>
      {/if}
      {#if data.interests.length}
        <section><h2>Interests</h2><p class="inline">{data.interests.join(' · ')}</p></section>
      {/if}
    </div>
  </div>
</div>

<style>
  .cv-page {
    width: 210mm;
    min-height: 297mm;
    background: #fff;
    color: #2a2a2a;
    padding: 22mm 20mm;
    font-family: var(--cv-font, 'Lora', 'Georgia', serif);
    font-size: 10.5pt;
    line-height: 1.5;
  }
  header {
    text-align: center;
    margin-bottom: 16px;
  }
  .photo {
    width: 84px;
    height: 84px;
    border-radius: 50%;
    object-fit: cover;
    margin-bottom: 10px;
    border: 1px solid #ddd;
  }
  h1 {
    margin: 0;
    font-size: 26pt;
    font-weight: 400;
    letter-spacing: 0.14em;
    text-transform: uppercase;
  }
  .title {
    margin: 6px 0 0;
    color: var(--a);
    font-style: italic;
    font-size: 12pt;
  }
  .rule {
    width: 60px;
    height: 2px;
    background: var(--a);
    margin: 12px auto;
  }
  .contact {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 4px 16px;
    font-size: 9.5pt;
    color: #555;
  }
  .summary {
    text-align: center;
    font-style: italic;
    color: #444;
    margin: 0 0 18px;
  }
  h2 {
    font-size: 11pt;
    text-transform: uppercase;
    letter-spacing: 0.15em;
    color: var(--a);
    text-align: center;
    margin: 0 0 10px;
    position: relative;
  }
  h2::after {
    content: '';
    display: block;
    width: 40px;
    height: 1px;
    background: #ccc;
    margin: 6px auto 0;
  }
  section {
    margin-bottom: 16px;
  }
  .two {
    display: grid;
    grid-template-columns: 1.5fr 1fr;
    gap: 26px;
  }
  .entry {
    margin-bottom: 11px;
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
    color: #777;
    font-size: 9pt;
    font-style: italic;
    white-space: nowrap;
    flex-shrink: 0;
  }
  .sub {
    color: #555;
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
    text-align: center;
  }
  .mini {
    display: flex;
    flex-direction: column;
    text-align: center;
    margin-bottom: 7px;
    font-size: 9.5pt;
  }
  .mini span {
    color: #777;
    font-style: italic;
  }
</style>
