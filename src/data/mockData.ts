// ============================================================
// SocialPaint Mock Data
// ============================================================

export interface BrandProfile {
  name: string
  tagline: string
  mission: string
  industry: string
  targetAudience: string
}

export interface LogoVariant {
  id: string
  label: string
  context: string
  url: string
}

export interface BrandColor {
  id: string
  name: string
  hex: string
  usage: string
}

export interface FontEntry {
  id: string
  name: string
  role: string
  weight: string
  sizeGuideline: string
}

export interface VoiceAttribute {
  tone: string[]
  style: string
  preferred: string[]
  avoid: string[]
  goodExample: string
  badExample: string
}

export interface ImageryStyle {
  photography: string[]
  illustration: string
  colorTreatment: string
}

export interface FigmaAnalysis {
  id: string
  thumbnail: string
  date: string
  colors: string[]
  typography: string[]
  layout: string
  mood: string
  confidence: number
}

export interface FlaggedItem {
  id: string
  thumbnail: string
  prompt: string
  score: number
  violations: { rule: string; detail: string }[]
  user: string
  team: string
  date: string
  status: 'pending' | 'investigating' | 'resolved-updated' | 'resolved-exception' | 'dismissed'
}

export interface GenerationHistoryItem {
  id: string
  prompt: string
  format: string
  date: string
  score: number
  thumbnail: string
}

export interface TeamMember {
  id: string
  name: string
  email: string
  role: string
  team: string
  avatar: string
  lastActive: string
}

// ---------- Brand Profile ----------
export const brandProfile: BrandProfile = {
  name: 'Meridian Labs',
  tagline: 'Science that moves with you',
  mission: 'To make advanced wellness research accessible and actionable for everyday people through thoughtful product design and transparent science.',
  industry: 'Health & Wellness / Consumer Products',
  targetAudience: 'Health-conscious professionals aged 28–45, urban, values transparency and design quality.',
}

// ---------- Logos ----------
export const logoVariants: LogoVariant[] = [
  { id: 'l1', label: 'Primary', context: 'Default use across all materials', url: '' },
  { id: 'l2', label: 'Secondary', context: 'Co-branding and partnerships', url: '' },
  { id: 'l3', label: 'Icon Only', context: 'App icons, favicons, social avatars', url: '' },
  { id: 'l4', label: 'Wordmark', context: 'Editorial and print layouts', url: '' },
  { id: 'l5', label: 'Monochrome', context: 'Single-color applications', url: '' },
]

// ---------- Colors ----------
export const brandColors: BrandColor[] = [
  { id: 'c1', name: 'Deep Forest', hex: '#1B4332', usage: 'Primary' },
  { id: 'c2', name: 'Sage', hex: '#52796F', usage: 'Secondary' },
  { id: 'c3', name: 'Warm Sand', hex: '#D4A373', usage: 'Accent' },
  { id: 'c4', name: 'Cream', hex: '#FEFAE0', usage: 'Background' },
  { id: 'c5', name: 'Charcoal', hex: '#2D3436', usage: 'Text' },
  { id: 'c6', name: 'Coral Pop', hex: '#E07A5F', usage: 'CTA / Highlight' },
]

// ---------- Typography ----------
export const brandFonts: FontEntry[] = [
  { id: 'f1', name: 'DM Serif Display', role: 'Heading', weight: '400', sizeGuideline: '32–64px' },
  { id: 'f2', name: 'Inter', role: 'Body', weight: '300–500', sizeGuideline: '14–18px' },
  { id: 'f3', name: 'Playfair Display', role: 'Accent', weight: '400 italic', sizeGuideline: '18–24px' },
  { id: 'f4', name: 'JetBrains Mono', role: 'Mono', weight: '400', sizeGuideline: '12–14px' },
]

// ---------- Voice ----------
export const brandVoice: VoiceAttribute = {
  tone: ['Confident', 'Approachable', 'Concise', 'Science-Forward'],
  style: 'Direct, warm, and grounded. We explain complex science simply without dumbing it down. Every sentence earns its place.',
  preferred: ['formulated', 'clinically tested', 'designed for', 'your body', 'transparent', 'research-backed'],
  avoid: ['revolutionary', 'miracle', 'anti-aging', 'guru', 'synergy', 'disrupt', 'game-changing'],
  goodExample: 'Our Vitamin D3 is formulated with K2 for better absorption — because the science says they work better together.',
  badExample: 'Our REVOLUTIONARY new supplement will CHANGE YOUR LIFE with its game-changing synergy of miracle ingredients!',
}

// ---------- Imagery ----------
export const imageryStyle: ImageryStyle = {
  photography: ['Warm natural light', 'Minimal compositions', 'Real people, not stock', 'Earth tones and botanicals'],
  illustration: 'Clean line art with organic shapes. Subtle gradients over flat fills. Molecule/nature motifs.',
  colorTreatment: 'Desaturated warmth. Avoid neon or harsh contrast. Overlay brand greens at low opacity for cohesion.',
}

// ---------- Figma Analysis ----------
export const figmaAnalyses: FigmaAnalysis[] = [
  {
    id: 'fa1', thumbnail: '', date: '2026-03-14',
    colors: ['#1B4332', '#52796F', '#FEFAE0'], typography: ['DM Serif Display', 'Inter'],
    layout: 'Asymmetric grid with generous whitespace', mood: 'Premium, Clean', confidence: 94,
  },
  {
    id: 'fa2', thumbnail: '', date: '2026-03-12',
    colors: ['#1B4332', '#D4A373', '#E07A5F'], typography: ['DM Serif Display', 'Inter'],
    layout: 'Card-based modular layout', mood: 'Warm, Inviting', confidence: 91,
  },
  {
    id: 'fa3', thumbnail: '', date: '2026-03-10',
    colors: ['#52796F', '#FEFAE0', '#2D3436'], typography: ['Inter', 'JetBrains Mono'],
    layout: 'Dashboard with data-dense sidebar', mood: 'Professional, Technical', confidence: 87,
  },
  {
    id: 'fa4', thumbnail: '', date: '2026-03-08',
    colors: ['#1B4332', '#FEFAE0'], typography: ['Playfair Display', 'Inter'],
    layout: 'Magazine editorial spread', mood: 'Editorial, Sophisticated', confidence: 92,
  },
  {
    id: 'fa5', thumbnail: '', date: '2026-03-05',
    colors: ['#E07A5F', '#D4A373', '#FEFAE0'], typography: ['DM Serif Display'],
    layout: 'Hero-centric landing page', mood: 'Bold, Energetic', confidence: 88,
  },
]

// ---------- Brand Score ----------
export const brandScore = {
  overall: 82,
  items: [
    { label: 'Logo uploaded', done: true, count: 5 },
    { label: 'Colors defined', done: true, count: 6 },
    { label: 'Typography set', done: true, count: 4 },
    { label: 'Voice configured', done: true },
    { label: 'Imagery style defined', done: true },
    { label: 'Figma designs analyzed', done: true, count: 23 },
    { label: 'Figma plugin connected', done: false },
  ],
}

// ---------- Flagged Content ----------
export const flaggedItems: FlaggedItem[] = [
  {
    id: 'fl1', thumbnail: '', prompt: 'Summer sale banner for Instagram',
    score: 52, violations: [
      { rule: 'Color mismatch', detail: 'Used #FF0000, brand primary is #1B4332' },
      { rule: 'Voice deviation', detail: 'Tone detected as "aggressive", brand voice is "confident"' },
    ],
    user: 'James K.', team: 'Sales', date: '2026-03-14', status: 'pending',
  },
  {
    id: 'fl2', thumbnail: '', prompt: 'Engineering team hiring announcement',
    score: 61, violations: [
      { rule: 'Typography mismatch', detail: 'Used Arial instead of brand font Inter' },
    ],
    user: 'Priya M.', team: 'HR', date: '2026-03-13', status: 'investigating',
  },
  {
    id: 'fl3', thumbnail: '', prompt: 'Product launch teaser for LinkedIn',
    score: 48, violations: [
      { rule: 'Logo misuse', detail: 'Logo placed on busy background without clear space' },
      { rule: 'Color mismatch', detail: 'Used #00FF00 accent, not in brand palette' },
      { rule: 'Voice deviation', detail: 'Used "revolutionary" — word on avoid list' },
    ],
    user: 'Alex T.', team: 'Product', date: '2026-03-12', status: 'pending',
  },
  {
    id: 'fl4', thumbnail: '', prompt: 'Customer testimonial graphic',
    score: 67, violations: [
      { rule: 'Imagery style', detail: 'Stock photo with harsh lighting, brand prefers warm natural light' },
    ],
    user: 'Sarah L.', team: 'Marketing', date: '2026-03-11', status: 'resolved-updated',
  },
  {
    id: 'fl5', thumbnail: '', prompt: 'Q1 results infographic',
    score: 58, violations: [
      { rule: 'Color mismatch', detail: 'Chart uses default blue palette instead of brand colors' },
      { rule: 'Typography mismatch', detail: 'Data labels in Helvetica instead of JetBrains Mono' },
    ],
    user: 'Mike R.', team: 'Finance', date: '2026-03-10', status: 'dismissed',
  },
]

// ---------- Generation History ----------
export const generationHistory: GenerationHistoryItem[] = [
  { id: 'g1', prompt: 'Spring product launch announcement', format: 'Instagram Post', date: '2026-03-15', score: 94, thumbnail: '' },
  { id: 'g2', prompt: 'Team culture spotlight — design team', format: 'LinkedIn Post', date: '2026-03-14', score: 89, thumbnail: '' },
  { id: 'g3', prompt: 'New vitamin D3+K2 product hero image', format: 'Facebook Post', date: '2026-03-13', score: 91, thumbnail: '' },
  { id: 'g4', prompt: 'Weekend wellness tips carousel', format: 'Instagram Story', date: '2026-03-12', score: 86, thumbnail: '' },
  { id: 'g5', prompt: 'Customer success story — Maria\'s journey', format: 'X Post', date: '2026-03-11', score: 93, thumbnail: '' },
]

// ---------- Analytics Data ----------
export const analyticsData = {
  totalGenerated: { week: 142, month: 583, allTime: 4271 },
  activeUsers: 47,
  avgAlignmentScore: 84,
  flaggedPercent: 12,
  passedPercent: 88,
  weeklyTrend: [
    { week: 'W1', count: 98, score: 79 },
    { week: 'W2', count: 112, score: 81 },
    { week: 'W3', count: 125, score: 80 },
    { week: 'W4', count: 134, score: 82 },
    { week: 'W5', count: 119, score: 83 },
    { week: 'W6', count: 142, score: 84 },
    { week: 'W7', count: 156, score: 85 },
    { week: 'W8', count: 148, score: 84 },
    { week: 'W9', count: 163, score: 86 },
    { week: 'W10', count: 171, score: 87 },
    { week: 'W11', count: 158, score: 85 },
    { week: 'W12', count: 142, score: 84 },
  ],
  formatBreakdown: [
    { format: 'Instagram Post', count: 187 },
    { format: 'LinkedIn Post', count: 134 },
    { format: 'Facebook Post', count: 98 },
    { format: 'X Post', count: 72 },
    { format: 'Instagram Story', count: 56 },
    { format: 'YouTube Thumbnail', count: 24 },
    { format: 'Pinterest Pin', count: 12 },
  ],
  teamActivity: [
    { team: 'Marketing', count: 198 },
    { team: 'Sales', count: 142 },
    { team: 'Product', count: 89 },
    { team: 'HR', count: 67 },
    { team: 'Executive', count: 45 },
    { team: 'Engineering', count: 32 },
    { team: 'Finance', count: 10 },
  ],
  topUsers: [
    { name: 'Sarah L.', team: 'Marketing', count: 67 },
    { name: 'James K.', team: 'Sales', count: 52 },
    { name: 'Priya M.', team: 'HR', count: 41 },
    { name: 'Alex T.', team: 'Product', count: 38 },
    { name: 'Mike R.', team: 'Finance', count: 10 },
  ],
  violationTypes: [
    { type: 'Color mismatch', count: 34 },
    { type: 'Voice deviation', count: 28 },
    { type: 'Typography mismatch', count: 19 },
    { type: 'Logo misuse', count: 11 },
    { type: 'Imagery style', count: 8 },
  ],
}

// ---------- Team Members ----------
export const teamMembers: TeamMember[] = [
  { id: 't1', name: 'Elena Rodriguez', email: 'elena@meridianlabs.co', role: 'Admin', team: 'Marketing', avatar: '', lastActive: '2026-03-15' },
  { id: 't2', name: 'David Chen', email: 'david@meridianlabs.co', role: 'Admin', team: 'Design', avatar: '', lastActive: '2026-03-15' },
  { id: 't3', name: 'Sarah Lawrence', email: 'sarah@meridianlabs.co', role: 'Editor', team: 'Marketing', avatar: '', lastActive: '2026-03-14' },
  { id: 't4', name: 'James Kim', email: 'james@meridianlabs.co', role: 'Creator', team: 'Sales', avatar: '', lastActive: '2026-03-14' },
  { id: 't5', name: 'Priya Mehta', email: 'priya@meridianlabs.co', role: 'Creator', team: 'HR', avatar: '', lastActive: '2026-03-13' },
  { id: 't6', name: 'Alex Torres', email: 'alex@meridianlabs.co', role: 'Creator', team: 'Product', avatar: '', lastActive: '2026-03-12' },
  { id: 't7', name: 'Mike Reynolds', email: 'mike@meridianlabs.co', role: 'Viewer', team: 'Finance', avatar: '', lastActive: '2026-03-10' },
  { id: 't8', name: 'Aisha Patel', email: 'aisha@meridianlabs.co', role: 'Creator', team: 'Engineering', avatar: '', lastActive: '2026-03-11' },
]

// ---------- Content Formats ----------
export const contentFormats = [
  { id: 'instagram-post', label: 'Instagram Post', width: 1080, height: 1080 },
  { id: 'instagram-story', label: 'Instagram Story', width: 1080, height: 1920 },
  { id: 'facebook-post', label: 'Facebook Post', width: 1200, height: 630 },
  { id: 'linkedin-post', label: 'LinkedIn Post', width: 1200, height: 627 },
  { id: 'x-post', label: 'X Post', width: 1600, height: 900 },
  { id: 'pinterest-pin', label: 'Pinterest Pin', width: 1000, height: 1500 },
  { id: 'youtube-thumbnail', label: 'YouTube Thumbnail', width: 1280, height: 720 },
  { id: 'custom', label: 'Custom', width: 1200, height: 1200 },
]
