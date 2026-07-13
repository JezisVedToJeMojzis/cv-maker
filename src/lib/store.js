import { writable } from 'svelte/store';

const STORAGE_KEY = 'cv-maker:data:v1';

export const emptyCV = () => ({
  basics: {
    name: '',
    title: '',
    email: '',
    phone: '',
    location: '',
    website: '',
    photo: '',
    summary: ''
  },
  experience: [],
  education: [],
  skills: [],
  projects: [],
  certifications: [],
  volunteering: [],
  publications: [],
  languages: [],
  awards: [],
  interests: []
});

export const sampleCV = () => ({
  basics: {
    name: 'Samuel Mojzis',
    title: 'Full-Stack Software Engineer',
    email: 'mojzissamuel@gmail.com',
    phone: '+421 900 000 000',
    location: 'Bratislava, Slovakia',
    website: 'github.com/JezisVedToJeMojzis',
    photo: '',
    summary:
      'Engineer who ships end-to-end products — from Go/Postgres backends to Svelte PWAs. I like small, well-tested services and interfaces that feel obvious.'
  },
  experience: [
    {
      id: crypto.randomUUID(),
      role: 'Software Engineer',
      company: 'Freelance / Side Projects',
      location: 'Remote',
      start: '2023',
      end: 'Present',
      bullets: [
        'Built and deployed multiple PWAs (mapping, trip planning, bike tracking) using SvelteKit and Postgres.',
        'Designed REST APIs in Go with migration-driven schemas and per-resource authorization.',
        'Shipped to free-tier hosting (Render + Neon) with CI-friendly, idempotent migrations.'
      ]
    }
  ],
  education: [
    {
      id: crypto.randomUUID(),
      degree: 'B.Sc. Computer Science',
      school: 'University',
      location: '',
      start: '2019',
      end: '2022',
      note: ''
    }
  ],
  skills: ['Go', 'TypeScript', 'Svelte / SvelteKit', 'PostgreSQL', 'Docker', 'REST APIs'],
  projects: [
    {
      id: crypto.randomUUID(),
      name: 'Nut Cracker',
      link: 'nutcracker.onrender.com',
      description: 'A PWA to color a world map of countries you have connected with. Go + Svelte + Postgres.'
    }
  ],
  certifications: [
    { id: crypto.randomUUID(), name: 'AWS Certified Cloud Practitioner', issuer: 'Amazon Web Services', year: '2024' }
  ],
  volunteering: [
    {
      id: crypto.randomUUID(),
      role: 'Coding Mentor',
      org: 'Local Code Club',
      start: '2022',
      end: 'Present',
      description: 'Teach teenagers the basics of web development on weekends.'
    }
  ],
  publications: [
    {
      id: crypto.randomUUID(),
      title: 'Building Offline-First PWAs with SvelteKit',
      venue: 'Personal Blog',
      year: '2025',
      link: ''
    }
  ],
  languages: [
    { id: crypto.randomUUID(), name: 'Slovak', level: 'Native' },
    { id: crypto.randomUUID(), name: 'English', level: 'Fluent (C1)' },
    { id: crypto.randomUUID(), name: 'German', level: 'Intermediate (B1)' }
  ],
  awards: [
    { id: crypto.randomUUID(), name: 'Hackathon Winner', issuer: 'DevFest', year: '2023' }
  ],
  interests: ['Calisthenics', 'Cycling', 'Cartography', 'Chess']
});

function load() {
  if (typeof localStorage === 'undefined') return sampleCV();
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return sampleCV();
    return { ...emptyCV(), ...JSON.parse(raw) };
  } catch {
    return sampleCV();
  }
}

export const cv = writable(load());

cv.subscribe((value) => {
  if (typeof localStorage === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(value));
  } catch {
    /* ignore quota errors */
  }
});

// UI preferences (template + accent) persisted separately.
const PREF_KEY = 'cv-maker:prefs:v1';
function loadPrefs() {
  if (typeof localStorage === 'undefined') return { template: 'modern', accent: '#2563eb', font: 'default' };
  try {
    return { template: 'modern', accent: '#2563eb', ...JSON.parse(localStorage.getItem(PREF_KEY) || '{}') };
  } catch {
    return { template: 'modern', accent: '#2563eb', font: 'default' };
  }
}
export const prefs = writable(loadPrefs());
prefs.subscribe((value) => {
  if (typeof localStorage === 'undefined') return;
  try {
    localStorage.setItem(PREF_KEY, JSON.stringify(value));
  } catch {
    /* ignore */
  }
});

export function resetCV() {
  cv.set(emptyCV());
}
export function loadSample() {
  cv.set(sampleCV());
}
