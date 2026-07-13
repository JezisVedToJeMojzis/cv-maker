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

// Fictional demo persona — safe to show to anyone. Any resemblance to real
// people is coincidental. Users replace this with their own data.
export const sampleCV = () => ({
  basics: {
    name: 'Alex Rivera',
    title: 'Product Designer',
    email: 'alex.rivera@example.com',
    phone: '+1 (555) 018-2937',
    location: 'Amsterdam, Netherlands',
    website: 'alexrivera.design',
    photo: '',
    summary:
      'Product designer with 6+ years turning fuzzy problems into clean, usable interfaces. I care about accessibility, fast iteration, and shipping things people actually enjoy using.'
  },
  experience: [
    {
      id: crypto.randomUUID(),
      role: 'Senior Product Designer',
      company: 'Northwind Labs',
      location: 'Amsterdam',
      start: '2021',
      end: 'Present',
      bullets: [
        'Led the redesign of the core dashboard, lifting task-completion rate by 34%.',
        'Built and maintained the design system used across 5 product teams.',
        'Ran weekly usability tests and turned findings into shipped improvements.'
      ]
    },
    {
      id: crypto.randomUUID(),
      role: 'Product Designer',
      company: 'Bright Studio',
      location: 'Berlin',
      start: '2018',
      end: '2021',
      bullets: [
        'Designed mobile-first flows for fintech and health clients from concept to launch.',
        'Partnered with engineers to ship pixel-accurate, accessible UI.'
      ]
    }
  ],
  education: [
    {
      id: crypto.randomUUID(),
      degree: 'B.A. Interaction Design',
      school: 'Delft University of Technology',
      location: '',
      start: '2014',
      end: '2018',
      note: 'Graduated with honours'
    }
  ],
  skills: ['Figma', 'Design Systems', 'Prototyping', 'User Research', 'HTML/CSS', 'Accessibility'],
  projects: [
    {
      id: crypto.randomUUID(),
      name: 'Aurora Design Kit',
      link: 'alexrivera.design/aurora',
      description: 'An open-source Figma UI kit with 200+ accessible components. 4k+ downloads.'
    }
  ],
  certifications: [
    { id: crypto.randomUUID(), name: 'Certified Professional in Accessibility (CPACC)', issuer: 'IAAP', year: '2023' }
  ],
  volunteering: [
    {
      id: crypto.randomUUID(),
      role: 'Design Mentor',
      org: 'ADPList',
      start: '2020',
      end: 'Present',
      description: 'Mentor early-career designers with portfolio reviews and career advice.'
    }
  ],
  publications: [
    {
      id: crypto.randomUUID(),
      title: 'Designing for Everyone: A Practical Accessibility Guide',
      venue: 'Smashing Magazine',
      year: '2024',
      link: ''
    }
  ],
  languages: [
    { id: crypto.randomUUID(), name: 'English', level: 'Native' },
    { id: crypto.randomUUID(), name: 'Dutch', level: 'Fluent (C1)' },
    { id: crypto.randomUUID(), name: 'Spanish', level: 'Conversational (B1)' }
  ],
  awards: [
    { id: crypto.randomUUID(), name: 'Awwwards Site of the Day', issuer: 'Awwwards', year: '2022' }
  ],
  interests: ['Photography', 'Trail running', 'Ceramics', 'Typography']
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
