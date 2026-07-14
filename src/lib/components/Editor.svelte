<script>
  import { cv } from '../store.js';

  // ---- Reordering: drag handle (desktop) + ↑/↓ buttons (works on touch too) ----
  let dragKey = $state('');
  let dragFrom = $state(-1);
  let overIndex = $state(-1);

  function move(key, from, to) {
    const arr = $cv[key];
    if (to < 0 || to >= arr.length || from === to) return;
    const next = [...arr];
    const [item] = next.splice(from, 1);
    next.splice(to, 0, item);
    $cv[key] = next;
  }
  function onDragStart(e, key, i) {
    dragKey = key;
    dragFrom = i;
    e.dataTransfer.effectAllowed = 'move';
  }
  function onDragOver(e, key, i) {
    if (dragKey !== key) return;
    e.preventDefault();
    overIndex = i;
  }
  function onDrop(key, i) {
    if (dragKey !== key) return;
    move(key, dragFrom, i);
    onDragEnd();
  }
  function onDragEnd() {
    dragKey = '';
    dragFrom = -1;
    overIndex = -1;
  }

  function addExperience() {
    $cv.experience = [
      ...$cv.experience,
      { id: crypto.randomUUID(), role: '', company: '', location: '', mode: '', start: '', end: '', bullets: [''] }
    ];
  }
  function removeExperience(id) {
    $cv.experience = $cv.experience.filter((e) => e.id !== id);
  }
  function addBullet(x) {
    x.bullets = [...x.bullets, ''];
    $cv.experience = $cv.experience;
  }
  function removeBullet(x, i) {
    x.bullets = x.bullets.filter((_, idx) => idx !== i);
    $cv.experience = $cv.experience;
  }

  function addEducation() {
    $cv.education = [
      ...$cv.education,
      { id: crypto.randomUUID(), degree: '', school: '', location: '', start: '', end: '', note: '' }
    ];
  }
  function removeEducation(id) {
    $cv.education = $cv.education.filter((e) => e.id !== id);
  }

  function addProject() {
    $cv.projects = [...$cv.projects, { id: crypto.randomUUID(), name: '', link: '', description: '' }];
  }
  function removeProject(id) {
    $cv.projects = $cv.projects.filter((p) => p.id !== id);
  }

  let skillsText = $state($cv.skills.join(', '));
  function syncSkills() {
    $cv.skills = skillsText
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);
  }

  let interestsText = $state(($cv.interests || []).join(', '));
  function syncInterests() {
    $cv.interests = interestsText
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);
  }

  // Photo → stored as a base64 data URL so it travels with the JSON export.
  let photoInput;
  function onPhoto(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 3 * 1024 * 1024) {
      alert('Please choose an image under 3 MB.');
      e.target.value = '';
      return;
    }
    const reader = new FileReader();
    reader.onload = () => ($cv.basics.photo = reader.result);
    reader.readAsDataURL(file);
    e.target.value = '';
  }
  function removePhoto() {
    $cv.basics.photo = '';
  }

  function addCert() {
    $cv.certifications = [...$cv.certifications, { id: crypto.randomUUID(), name: '', issuer: '', year: '' }];
  }
  function removeCert(id) {
    $cv.certifications = $cv.certifications.filter((c) => c.id !== id);
  }

  function addVolunteer() {
    $cv.volunteering = [
      ...$cv.volunteering,
      { id: crypto.randomUUID(), role: '', org: '', start: '', end: '', description: '' }
    ];
  }
  function removeVolunteer(id) {
    $cv.volunteering = $cv.volunteering.filter((v) => v.id !== id);
  }

  function addPublication() {
    $cv.publications = [...$cv.publications, { id: crypto.randomUUID(), title: '', venue: '', year: '', link: '' }];
  }
  function removePublication(id) {
    $cv.publications = $cv.publications.filter((p) => p.id !== id);
  }

  function addLanguage() {
    $cv.languages = [...$cv.languages, { id: crypto.randomUUID(), name: '', level: '' }];
  }
  function removeLanguage(id) {
    $cv.languages = $cv.languages.filter((l) => l.id !== id);
  }

  function addAward() {
    $cv.awards = [...$cv.awards, { id: crypto.randomUUID(), name: '', issuer: '', year: '' }];
  }
  function removeAward(id) {
    $cv.awards = $cv.awards.filter((a) => a.id !== id);
  }
</script>

{#snippet tools(key, i, len, onRemove)}
  <div class="card-head">
    <span
      class="grip"
      draggable="true"
      title="Drag to reorder"
      ondragstart={(e) => onDragStart(e, key, i)}
      ondragend={onDragEnd}
      role="button"
      tabindex="-1"
      aria-label="Drag to reorder"
    >⠿</span>
    <div class="spacer"></div>
    <button class="mv" disabled={i === 0} onclick={() => move(key, i, i - 1)} title="Move up" aria-label="Move up">↑</button>
    <button class="mv" disabled={i === len - 1} onclick={() => move(key, i, i + 1)} title="Move down" aria-label="Move down">↓</button>
    <button class="del" title="Remove" onclick={onRemove}>✕</button>
  </div>
{/snippet}

<div class="editor">
  <section>
    <h3>Basics</h3>
    <div class="photo-row">
      {#if $cv.basics.photo}
        <img class="avatar" src={$cv.basics.photo} alt="CV photo" />
      {:else}
        <div class="avatar placeholder">No photo</div>
      {/if}
      <div class="photo-actions">
        <button class="add" onclick={() => photoInput.click()}>
          {$cv.basics.photo ? 'Change photo' : '+ Add photo'}
        </button>
        {#if $cv.basics.photo}<button class="ghost-btn" onclick={removePhoto}>Remove</button>{/if}
        <input bind:this={photoInput} type="file" accept="image/*" onchange={onPhoto} hidden />
      </div>
    </div>
    <div class="grid2">
      <label>Full name<input bind:value={$cv.basics.name} placeholder="Jane Doe" /></label>
      <label>Job title<input bind:value={$cv.basics.title} placeholder="Product Designer" /></label>
      <label>Email<input bind:value={$cv.basics.email} placeholder="jane@mail.com" /></label>
      <label>Phone<input bind:value={$cv.basics.phone} placeholder="+1 555 0100" /></label>
      <label>Location<input bind:value={$cv.basics.location} placeholder="Berlin, DE" /></label>
      <label>Website<input bind:value={$cv.basics.website} placeholder="janedoe.com" /></label>
    </div>
    <label>Summary<textarea rows="3" bind:value={$cv.basics.summary} placeholder="Short professional summary…"></textarea></label>
  </section>

  <section>
    <div class="sec-head"><h3>Experience</h3><button class="add" onclick={addExperience}>+ Add</button></div>
    {#each $cv.experience as x, i (x.id)}
      <div
        class="card"
        class:drop-target={dragKey === 'experience' && overIndex === i}
        ondragover={(e) => onDragOver(e, 'experience', i)}
        ondrop={() => onDrop('experience', i)}
        role="listitem"
      >
        {@render tools('experience', i, $cv.experience.length, () => removeExperience(x.id))}
        <div class="grid2">
          <label>Role<input bind:value={x.role} placeholder="Senior Engineer" /></label>
          <label>Company<input bind:value={x.company} placeholder="Acme Inc." /></label>
          <label>Location<input bind:value={x.location} placeholder="Berlin, Germany" /></label>
          <label>Work mode
            <select bind:value={x.mode}>
              <option value="">—</option>
              <option value="On-site">On-site</option>
              <option value="Hybrid">Hybrid</option>
              <option value="Remote">Remote</option>
            </select>
          </label>
          <div class="grid2 tight">
            <label>Start<input bind:value={x.start} placeholder="2021" /></label>
            <label>End<input bind:value={x.end} placeholder="Present" /></label>
          </div>
        </div>
        <div class="bullets">
          <span class="lbl">Highlights</span>
          {#each x.bullets as _, bi}
            <div class="bullet-row">
              <input bind:value={x.bullets[bi]} placeholder="What you did / achieved" />
              <button class="del sm" onclick={() => removeBullet(x, bi)}>✕</button>
            </div>
          {/each}
          <button class="add sm" onclick={() => addBullet(x)}>+ bullet</button>
        </div>
      </div>
    {/each}
  </section>

  <section>
    <div class="sec-head"><h3>Education</h3><button class="add" onclick={addEducation}>+ Add</button></div>
    {#each $cv.education as e, i (e.id)}
      <div class="card" class:drop-target={dragKey === 'education' && overIndex === i} ondragover={(ev) => onDragOver(ev, 'education', i)} ondrop={() => onDrop('education', i)} role="listitem">
        {@render tools('education', i, $cv.education.length, () => removeEducation(e.id))}
        <div class="grid2">
          <label>Degree<input bind:value={e.degree} placeholder="B.Sc. Computer Science" /></label>
          <label>School<input bind:value={e.school} placeholder="MIT" /></label>
          <div class="grid2 tight">
            <label>Start<input bind:value={e.start} placeholder="2018" /></label>
            <label>End<input bind:value={e.end} placeholder="2022" /></label>
          </div>
          <label>Note<input bind:value={e.note} placeholder="GPA, honors…" /></label>
        </div>
      </div>
    {/each}
  </section>

  <section>
    <div class="sec-head"><h3>Projects</h3><button class="add" onclick={addProject}>+ Add</button></div>
    {#each $cv.projects as p, i (p.id)}
      <div class="card" class:drop-target={dragKey === 'projects' && overIndex === i} ondragover={(ev) => onDragOver(ev, 'projects', i)} ondrop={() => onDrop('projects', i)} role="listitem">
        {@render tools('projects', i, $cv.projects.length, () => removeProject(p.id))}
        <div class="grid2">
          <label>Name<input bind:value={p.name} placeholder="Side Project" /></label>
          <label>Link<input bind:value={p.link} placeholder="github.com/you/proj" /></label>
        </div>
        <label>Description<textarea rows="2" bind:value={p.description} placeholder="What it does…"></textarea></label>
      </div>
    {/each}
  </section>

  <section>
    <div class="sec-head"><h3>Certifications</h3><button class="add" onclick={addCert}>+ Add</button></div>
    {#each $cv.certifications as c, i (c.id)}
      <div class="card" class:drop-target={dragKey === 'certifications' && overIndex === i} ondragover={(ev) => onDragOver(ev, 'certifications', i)} ondrop={() => onDrop('certifications', i)} role="listitem">
        {@render tools('certifications', i, $cv.certifications.length, () => removeCert(c.id))}
        <div class="grid2">
          <label>Name<input bind:value={c.name} placeholder="AWS Solutions Architect" /></label>
          <label>Issuer<input bind:value={c.issuer} placeholder="Amazon Web Services" /></label>
          <label>Year<input bind:value={c.year} placeholder="2024" /></label>
        </div>
      </div>
    {/each}
  </section>

  <section>
    <div class="sec-head"><h3>Volunteering</h3><button class="add" onclick={addVolunteer}>+ Add</button></div>
    {#each $cv.volunteering as v, i (v.id)}
      <div class="card" class:drop-target={dragKey === 'volunteering' && overIndex === i} ondragover={(ev) => onDragOver(ev, 'volunteering', i)} ondrop={() => onDrop('volunteering', i)} role="listitem">
        {@render tools('volunteering', i, $cv.volunteering.length, () => removeVolunteer(v.id))}
        <div class="grid2">
          <label>Role<input bind:value={v.role} placeholder="Volunteer / Mentor" /></label>
          <label>Organization<input bind:value={v.org} placeholder="Red Cross" /></label>
          <div class="grid2 tight">
            <label>Start<input bind:value={v.start} placeholder="2021" /></label>
            <label>End<input bind:value={v.end} placeholder="Present" /></label>
          </div>
        </div>
        <label>Description<textarea rows="2" bind:value={v.description} placeholder="What you did…"></textarea></label>
      </div>
    {/each}
  </section>

  <section>
    <div class="sec-head"><h3>Publications</h3><button class="add" onclick={addPublication}>+ Add</button></div>
    {#each $cv.publications as p, i (p.id)}
      <div class="card" class:drop-target={dragKey === 'publications' && overIndex === i} ondragover={(ev) => onDragOver(ev, 'publications', i)} ondrop={() => onDrop('publications', i)} role="listitem">
        {@render tools('publications', i, $cv.publications.length, () => removePublication(p.id))}
        <label>Title<input bind:value={p.title} placeholder="Paper / article title" /></label>
        <div class="grid2">
          <label>Venue<input bind:value={p.venue} placeholder="Journal / Conference / Blog" /></label>
          <div class="grid2 tight">
            <label>Year<input bind:value={p.year} placeholder="2025" /></label>
            <label>Link<input bind:value={p.link} placeholder="doi.org/…" /></label>
          </div>
        </div>
      </div>
    {/each}
  </section>

  <section>
    <div class="sec-head"><h3>Awards & Honours</h3><button class="add" onclick={addAward}>+ Add</button></div>
    {#each $cv.awards as a, i (a.id)}
      <div class="card" class:drop-target={dragKey === 'awards' && overIndex === i} ondragover={(ev) => onDragOver(ev, 'awards', i)} ondrop={() => onDrop('awards', i)} role="listitem">
        {@render tools('awards', i, $cv.awards.length, () => removeAward(a.id))}
        <div class="grid2">
          <label>Award<input bind:value={a.name} placeholder="Employee of the Year" /></label>
          <label>Issuer<input bind:value={a.issuer} placeholder="Acme Inc." /></label>
          <label>Year<input bind:value={a.year} placeholder="2023" /></label>
        </div>
      </div>
    {/each}
  </section>

  <section>
    <div class="sec-head"><h3>Languages</h3><button class="add" onclick={addLanguage}>+ Add</button></div>
    {#each $cv.languages as l, i (l.id)}
      <div class="card" class:drop-target={dragKey === 'languages' && overIndex === i} ondragover={(ev) => onDragOver(ev, 'languages', i)} ondrop={() => onDrop('languages', i)} role="listitem">
        {@render tools('languages', i, $cv.languages.length, () => removeLanguage(l.id))}
        <div class="grid2">
          <label>Language<input bind:value={l.name} placeholder="English" /></label>
          <label>Level<input bind:value={l.level} placeholder="Fluent (C1)" /></label>
        </div>
      </div>
    {/each}
  </section>

  <section>
    <h3>Skills</h3>
    <label>Comma-separated
      <textarea rows="2" bind:value={skillsText} oninput={syncSkills} placeholder="Go, TypeScript, SQL, Docker"></textarea>
    </label>
  </section>

  <section>
    <h3>Interests / Hobbies</h3>
    <label>Comma-separated
      <textarea rows="2" bind:value={interestsText} oninput={syncInterests} placeholder="Cycling, Chess, Photography"></textarea>
    </label>
  </section>
</div>

<style>
  .editor {
    display: flex;
    flex-direction: column;
    gap: 22px;
    padding: 20px;
  }
  section {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  h3 {
    margin: 0;
    font-size: 14px;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: var(--muted);
  }
  .sec-head {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  label {
    display: flex;
    flex-direction: column;
    gap: 4px;
    font-size: 12px;
    color: var(--muted);
  }
  input,
  textarea,
  select {
    padding: 8px 10px;
    border: 1px solid var(--border);
    border-radius: 8px;
    background: #fff;
    color: var(--text);
    font-size: 13px;
    outline: none;
    resize: vertical;
  }
  select {
    height: 35px;
    cursor: pointer;
  }
  input:focus,
  textarea:focus,
  select:focus {
    border-color: var(--accent);
    box-shadow: 0 0 0 3px color-mix(in srgb, var(--accent) 20%, transparent);
  }
  .grid2 {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px;
  }
  .grid2.tight {
    gap: 8px;
  }
  .card {
    border: 1px solid var(--border);
    border-radius: 12px;
    padding: 12px 14px 14px;
    background: #fbfcfe;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  .card.drop-target {
    border-color: var(--accent);
    box-shadow: 0 0 0 3px color-mix(in srgb, var(--accent) 18%, transparent);
  }
  .card-head {
    display: flex;
    align-items: center;
    gap: 5px;
    margin-bottom: -2px;
  }
  .grip {
    cursor: grab;
    color: #94a3b8;
    font-size: 16px;
    line-height: 1;
    padding: 0 4px;
    user-select: none;
    letter-spacing: -2px;
  }
  .grip:active {
    cursor: grabbing;
  }
  .spacer {
    flex: 1;
  }
  .mv {
    border: 1px solid var(--border);
    background: #fff;
    color: var(--muted);
    border-radius: 6px;
    width: 26px;
    height: 26px;
    font-size: 13px;
    line-height: 1;
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }
  .mv:hover:not(:disabled) {
    border-color: var(--accent);
    color: var(--accent);
  }
  .mv:disabled {
    opacity: 0.35;
    cursor: default;
  }
  .bullets {
    display: flex;
    flex-direction: column;
    gap: 6px;
  }
  .lbl {
    font-size: 12px;
    color: var(--muted);
  }
  .bullet-row {
    display: flex;
    gap: 6px;
  }
  .bullet-row input {
    flex: 1;
  }
  .add {
    border: 1px solid var(--accent);
    color: var(--accent);
    background: transparent;
    border-radius: 8px;
    padding: 5px 12px;
    font-size: 12px;
    font-weight: 600;
  }
  .add.sm {
    align-self: flex-start;
    padding: 3px 10px;
  }
  .del {
    border: none;
    background: transparent;
    color: #94a3b8;
    font-size: 13px;
    padding: 4px 6px;
  }
  .del:hover {
    color: #ef4444;
  }
  .photo-row {
    display: flex;
    align-items: center;
    gap: 14px;
  }
  .avatar {
    width: 64px;
    height: 64px;
    border-radius: 50%;
    object-fit: cover;
    border: 1px solid var(--border);
  }
  .avatar.placeholder {
    display: flex;
    align-items: center;
    justify-content: center;
    background: #f1f5f9;
    color: var(--muted);
    font-size: 10px;
    text-align: center;
  }
  .photo-actions {
    display: flex;
    align-items: center;
    gap: 8px;
  }
  .ghost-btn {
    border: 1px solid var(--border);
    background: #fff;
    color: var(--muted);
    border-radius: 8px;
    padding: 5px 10px;
    font-size: 12px;
  }
  .ghost-btn:hover {
    color: #ef4444;
    border-color: #ef4444;
  }
</style>
