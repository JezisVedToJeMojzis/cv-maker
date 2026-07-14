<script>
  let { data, accent } = $props();
</script>

<div class="cv-page compact" style="--a:{accent}">
  <header>
    <div class="id">
      {#if data.basics.photo}<img class="photo" src={data.basics.photo} alt="" />{/if}
      <div>
        <h1>{data.basics.name || 'Your Name'}</h1>
        {#if data.basics.title}<p class="title">{data.basics.title}</p>{/if}
      </div>
    </div>
    <div class="contact">
      {#if data.basics.email}<span>{data.basics.email}</span>{/if}
      {#if data.basics.phone}<span>{data.basics.phone}</span>{/if}
      {#if data.basics.location}<span>{data.basics.location}</span>{/if}
      {#if data.basics.website}<span>{data.basics.website}</span>{/if}
    </div>
  </header>

  {#if data.basics.summary}
    <p class="summary">{data.basics.summary}</p>
  {/if}

  <div class="cols">
    <div class="col-main">
      {#if data.experience.length}
        <h2>Experience</h2>
        {#each data.experience as x}
          <div class="entry">
            <div class="entry-head">
              <strong>{x.role}</strong>
              <span class="dates">{x.start}{x.start && x.end ? '–' : ''}{x.end}</span>
            </div>
            <div class="entry-sub">{x.company}{x.location ? ' · ' + x.location : ''}</div>
            <ul>
              {#each x.bullets.filter(Boolean) as b}<li>{b}</li>{/each}
            </ul>
          </div>
        {/each}
      {/if}

      {#if data.projects.length}
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
      {/if}

      {#if data.volunteering.length}
        <h2>Volunteering</h2>
        {#each data.volunteering as v}
          <div class="entry">
            <div class="entry-head">
              <strong>{v.role}</strong>
              <span class="dates">{v.start}{v.start && v.end ? '–' : ''}{v.end}</span>
            </div>
            <div class="entry-sub">{v.org}</div>
            {#if v.description}<p class="proj">{v.description}</p>{/if}
          </div>
        {/each}
      {/if}

      {#if data.publications.length}
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
      {/if}
    </div>

    <div class="col-side">
      {#if data.skills.length}
        <h2>Skills</h2>
        <ul class="plain">
          {#each data.skills as s}<li>{s}</li>{/each}
        </ul>
      {/if}
      {#if data.languages.length}
        <h2>Languages</h2>
        <ul class="plain">
          {#each data.languages as l}<li>{l.name}{l.level ? ` — ${l.level}` : ''}</li>{/each}
        </ul>
      {/if}
      {#if data.education.length}
        <h2>Education</h2>
        {#each data.education as e}
          <div class="edu">
            <strong>{e.degree}</strong>
            <span>{e.school}</span>
            <em>{e.start}{e.start && e.end ? '–' : ''}{e.end}</em>
          </div>
        {/each}
      {/if}
      {#if data.certifications.length}
        <h2>Certifications</h2>
        {#each data.certifications as c}
          <div class="edu">
            <strong>{c.name}</strong>
            <em>{c.issuer}{c.issuer && c.year ? ' · ' : ''}{c.year}</em>
          </div>
        {/each}
      {/if}
      {#if data.awards.length}
        <h2>Awards</h2>
        {#each data.awards as a}
          <div class="edu">
            <strong>{a.name}</strong>
            <em>{a.issuer}{a.issuer && a.year ? ' · ' : ''}{a.year}</em>
          </div>
        {/each}
      {/if}
      {#if data.interests.length}
        <h2>Interests</h2>
        <ul class="plain">
          {#each data.interests as i}<li>{i}</li>{/each}
        </ul>
      {/if}
    </div>
  </div>
</div>

<style>
  .cv-page {
    width: 210mm;
    min-height: 297mm;
    background: #fff;
    color: #1e293b;
    padding: 16mm 16mm;
    font-family: var(--cv-font, 'Inter', system-ui, sans-serif);
    font-size: 9.5pt;
    line-height: 1.4;
  }
  header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    border-bottom: 3px solid var(--a);
    padding-bottom: 8px;
  }
  .id {
    display: flex;
    align-items: center;
    gap: 12px;
  }
  .photo {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    object-fit: cover;
    border: 2px solid var(--a);
  }
  h1 {
    margin: 0;
    font-size: 19pt;
    color: var(--a);
  }
  .title {
    margin: 2px 0 0;
    font-weight: 600;
  }
  .contact {
    text-align: right;
    display: flex;
    flex-direction: column;
    gap: 2px;
    font-size: 8.5pt;
    color: #475569;
  }
  .summary {
    margin: 10px 0 12px;
  }
  .cols {
    display: grid;
    grid-template-columns: 1fr 32%;
    gap: 20px;
  }
  h2 {
    font-size: 10pt;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    color: var(--a);
    margin: 0 0 6px;
    border-bottom: 1px solid #e2e8f0;
    padding-bottom: 2px;
  }
  .col-side h2 {
    margin-top: 14px;
  }
  .col-side h2:first-child {
    margin-top: 0;
  }
  .entry {
    margin-bottom: 10px;
  }
  .entry-head {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    gap: 8px;
  }
  .entry-head strong {
    min-width: 0;
    overflow-wrap: anywhere;
  }
  .entry-sub {
    color: #475569;
    font-size: 9pt;
  }
  .dates {
    color: #64748b;
    font-size: 8.5pt;
    white-space: nowrap;
    flex-shrink: 0;
  }
  ul {
    margin: 3px 0 0;
    padding-left: 15px;
  }
  ul.plain {
    list-style: none;
    padding-left: 0;
  }
  li {
    margin-bottom: 2px;
  }
  .proj {
    margin: 2px 0 0;
  }
  .edu {
    display: flex;
    flex-direction: column;
    margin-bottom: 8px;
  }
  .edu em {
    color: #64748b;
  }
</style>
