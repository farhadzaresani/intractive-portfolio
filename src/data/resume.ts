export type PanelId = 'about' | 'work' | 'skills' | 'contact'

export const profile = {
  name: 'Farhad Zare',
  title: 'Frontend Engineer',
  location: 'Tehran, Iran',
  email: 'farhadzaresani75@gmail.com',
  phone: '+98 912 498 6906',
  github: 'https://github.com/farhadzaresani',
  summary:
    'Front-end focused Software Engineer with a strong eye for detail and a passion for building intuitive, high-quality user experiences. Experienced in developing scalable web applications and collaborating across teams to deliver polished, performance-driven products.',
}

export const education = [
  {
    degree: "Bachelor's degree",
    field: 'Computer Software Engineering',
    school: 'Islamic Azad University',
    years: '2021 – 2024',
  },
  {
    degree: 'Associated degree',
    field: 'Computer Engineering',
    school: 'Islamic Azad University',
    years: '2019 – 2021',
  },
]

export const experience = [
  {
    company: 'Daravan',
    role: 'Front-End Team Lead',
    period: '06/2025 – Present',
    project: 'Daravan — Financial Trading Platform',
    stack: ['Next.js 15', 'React 19', 'TypeScript', 'TanStack Query', 'Zustand', 'Socket.IO', 'PWA', 'Cypress'],
    highlights: [
      'Leading frontend for a trading platform: loans, token trading, and digital assets.',
      'Real-time features with Socket.IO; PWA with offline capabilities.',
      'E2E coverage with Cypress.',
    ],
  },
  {
    company: 'Karnameh',
    role: 'Front End Developer',
    period: '08/2024 – 08/2025',
    project: 'Landing & Zero Price',
    stack: ['React', 'Performance', 'SEO'],
    highlights: [
      'Raised landing performance score from 32 to 78 via image and LCP optimization.',
      'Built SEO-friendly Zero Price page for large datasets with strong crawlability.',
    ],
  },
  {
    company: 'Novin Arzesh',
    role: 'Front End Developer',
    period: '08/2023 – 07/2024',
    project: 'Crypto Trading Platform',
    stack: ['Monorepo', 'PWA', 'KYC'],
    highlights: [
      'Improved scalability with monorepo architecture.',
      'Converted the platform into a Progressive Web App.',
      'Developed KYC flow for security and compliance.',
    ],
  },
  {
    company: 'Raydad',
    role: 'Front End Developer',
    period: '12/2022 – 08/2023',
    project: 'Mpeygiri & ArzeKala',
    stack: ['SSR', 'Component architecture'],
    highlights: [
      'State tracking app for Mehr Housing with live monitoring.',
      'E-commerce for subsidized products with SSR for SEO and speed.',
    ],
  },
  {
    company: 'Ideal Media',
    role: 'Front End Developer',
    period: '11/2021 – 12/2022',
    project: 'Makeen',
    stack: ['Web apps'],
    highlights: [
      'Course showcase and student registration experience.',
    ],
  },
]

export const skills = {
  core: ['HTML', 'CSS', 'JavaScript', 'TypeScript'],
  frameworks: ['React', 'Next.js', 'Vue', 'Nuxt'],
  state: ['Context', 'Redux', 'RTK Query', 'Zustand', 'React Query'],
  ui: ['Tailwind', 'Material-UI', 'Chakra UI', 'Ant Design', 'Radix', 'shadcn', 'Framer Motion'],
  quality: ['Jest', 'Cypress', 'Storybook'],
  practices: ['SOLID', 'Design Patterns', 'Clean Code', 'Git', 'Agile', 'SSR/SSG/ISR', 'PWA'],
}

export const dosApps: { id: PanelId; file: string; label: string; color: string }[] = [
  { id: 'about', file: 'ABOUT.EXE', label: 'About', color: '#33ff66' },
  { id: 'work', file: 'WORK.EXE', label: 'Work', color: '#66ccff' },
  { id: 'skills', file: 'SKILLS.EXE', label: 'Skills', color: '#ffcc33' },
  { id: 'contact', file: 'CONTACT.EXE', label: 'Contact', color: '#ff6688' },
]

/** Full vintage desktop stack, centered on the desk */
export const crtMonitor = {
  position: [0, 0.79, 0.2] as [number, number, number],
  rotation: [0, 0, 0] as [number, number, number],
}

export const cameraViews = {
  overview: { position: [0, 1.55, 5.1] as [number, number, number], target: [0, 1.15, 0] as [number, number, number] },
  monitor: { position: [0, 1.42, 2.55] as [number, number, number], target: [0, 1.42, 0.35] as [number, number, number] },
}

