import { useState } from 'react'
import {
  Edit3, Copy, Check, X, Plus, Upload, Figma,
  AlertCircle,
} from 'lucide-react'
import {
  brandProfile, logoVariants, brandColors, brandFonts, brandVoice,
  imageryStyle, figmaAnalyses, brandScore,
} from '../data/mockData'

const toneIntensities: Record<string, number> = {
  Confident: 9,
  Approachable: 8,
  Concise: 7,
  'Science-Forward': 8,
}

export default function BrandSystem() {
  const [editing, setEditing] = useState(false)
  const [profile, setProfile] = useState({ ...brandProfile })
  const [copiedId, setCopiedId] = useState<string | null>(null)

  function handleProfileChange(field: string, value: string) {
    setProfile((prev) => ({ ...prev, [field]: value }))
  }

  function handleSave() {
    setEditing(false)
  }

  function copyHex(id: string, hex: string) {
    navigator.clipboard.writeText(hex)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 1500)
  }

  return (
    <div className="max-w-[960px] mx-auto px-6">
      {/* ── 1. Brand Identity Header ── */}
      <section className="py-16">
        <h1
          style={{ fontSize: 56, fontWeight: 600, letterSpacing: -2, lineHeight: 1.0 }}
          className="text-ink"
        >
          {profile.name}
        </h1>
        <p
          style={{ fontSize: 18, fontWeight: 400 }}
          className="text-muted mt-3"
        >
          {profile.tagline}
        </p>

        {/* Color band */}
        <div className="mt-8 flex rounded-xl overflow-hidden" style={{ height: 48 }}>
          {brandColors.map((c) => (
            <div key={c.id} className="flex-1" style={{ backgroundColor: c.hex }} />
          ))}
        </div>

        {/* Completion bar */}
        <div className="mt-4 flex items-center gap-3">
          <span className="caption">Brand System &middot; {brandScore.overall}% complete</span>
          <div className="flex-1 bg-border rounded-full" style={{ height: 4 }}>
            <div
              className="bg-ink rounded-full"
              style={{ height: 4, width: `${brandScore.overall}%` }}
            />
          </div>
        </div>
      </section>

      {/* ── 2. Brand Profile ── */}
      <section className="py-16 border-t border-border">
        <div className="flex items-center justify-between mb-6">
          <span className="caption">PROFILE</span>
          {!editing ? (
            <button
              onClick={() => setEditing(true)}
              className="flex items-center gap-1.5 text-muted hover:text-ink transition-colors"
              style={{ transitionDuration: '120ms' }}
            >
              <Edit3 size={16} strokeWidth={1.5} />
              <span style={{ fontSize: 13, fontWeight: 500 }}>Edit</span>
            </button>
          ) : (
            <button
              onClick={() => { setEditing(false); setProfile({ ...brandProfile }) }}
              className="flex items-center gap-1.5 text-muted hover:text-ink transition-colors"
              style={{ transitionDuration: '120ms' }}
            >
              <X size={16} strokeWidth={1.5} />
              <span style={{ fontSize: 13, fontWeight: 500 }}>Cancel</span>
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-5">
          {(['name', 'tagline', 'industry', 'targetAudience'] as const).map((field) => {
            const labels: Record<string, string> = {
              name: 'Name',
              tagline: 'Tagline',
              industry: 'Industry',
              targetAudience: 'Target Audience',
            }
            return (
              <div key={field}>
                <span className="caption">{labels[field]}</span>
                {editing ? (
                  <input
                    className="mt-1 w-full bg-white border border-border rounded-lg px-3 py-2 text-ink outline-none focus:border-ink"
                    style={{ fontSize: 14, fontWeight: 400, transitionDuration: '120ms' }}
                    value={profile[field]}
                    onChange={(e) => handleProfileChange(field, e.target.value)}
                  />
                ) : (
                  <p style={{ fontSize: 14, fontWeight: 400 }} className="mt-1 text-ink">
                    {profile[field]}
                  </p>
                )}
              </div>
            )
          })}
        </div>

        {/* Mission — full width */}
        <div className="mt-5">
          <span className="caption">Mission</span>
          {editing ? (
            <textarea
              className="mt-1 w-full bg-white border border-border rounded-lg px-3 py-2 text-ink outline-none focus:border-ink resize-none"
              style={{ fontSize: 14, fontWeight: 400, transitionDuration: '120ms' }}
              rows={3}
              value={profile.mission}
              onChange={(e) => handleProfileChange('mission', e.target.value)}
            />
          ) : (
            <p style={{ fontSize: 14, fontWeight: 400 }} className="mt-1 text-ink">
              {profile.mission}
            </p>
          )}
        </div>

        {editing && (
          <button
            onClick={handleSave}
            className="mt-6 bg-ink text-white h-10 px-4 rounded-lg hover:opacity-90 transition-opacity"
            style={{ fontSize: 14, fontWeight: 500, transitionDuration: '120ms' }}
          >
            Save
          </button>
        )}
      </section>

      {/* ── 3. Logo Library ── */}
      <section className="py-16 border-t border-border">
        <span className="caption">LOGOS</span>
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {logoVariants.map((logo) => (
            <div key={logo.id} className="bg-surface rounded-xl p-6">
              <div
                className="rounded-lg"
                style={{
                  height: 140,
                  background: `linear-gradient(135deg, ${brandColors[0].hex}, ${brandColors[2].hex}, ${brandColors[5].hex})`,
                }}
              />
              <div className="mt-4 flex items-center gap-2">
                <span style={{ fontSize: 18, fontWeight: 600 }} className="text-ink">
                  {logo.label}
                </span>
                {logo.label === 'Primary' && (
                  <span
                    className="caption bg-ink text-white px-2 py-0.5 rounded"
                    style={{ fontSize: 10, letterSpacing: 0.5 }}
                  >
                    PRIMARY
                  </span>
                )}
              </div>
              <p style={{ fontSize: 14, fontWeight: 400 }} className="text-muted mt-1">
                {logo.context}
              </p>
            </div>
          ))}

          {/* Upload button card */}
          <button className="bg-surface rounded-xl p-6 border border-dashed border-border hover:border-ink/20 flex flex-col items-center justify-center gap-2 text-muted hover:text-ink transition-colors" style={{ transitionDuration: '120ms', minHeight: 200 }}>
            <Upload size={18} strokeWidth={1.5} />
            <span style={{ fontSize: 14, fontWeight: 500 }}>Upload logo</span>
          </button>
        </div>
      </section>

      {/* ── 4. Color System ── */}
      <section className="py-16 border-t border-border">
        <span className="caption">COLOR SYSTEM</span>
        <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {brandColors.map((color) => (
            <div key={color.id} className="bg-surface rounded-xl p-4">
              <div
                className="rounded-lg w-full"
                style={{ height: 80, backgroundColor: color.hex }}
              />
              <p style={{ fontSize: 14, fontWeight: 500 }} className="text-ink mt-3">
                {color.name}
              </p>
              <div className="flex items-center gap-1 mt-1">
                <span className="font-mono text-muted" style={{ fontSize: 13 }}>
                  {color.hex}
                </span>
                <button
                  onClick={() => copyHex(color.id, color.hex)}
                  className="text-muted hover:text-ink transition-colors p-0.5"
                  style={{ transitionDuration: '120ms' }}
                >
                  {copiedId === color.id ? (
                    <Check size={12} strokeWidth={1.5} />
                  ) : (
                    <Copy size={12} strokeWidth={1.5} />
                  )}
                </button>
              </div>
              {copiedId === color.id && (
                <span className="text-signal-green" style={{ fontSize: 11, fontWeight: 500 }}>
                  Copied
                </span>
              )}
              <p className="caption mt-1">{color.usage}</p>
            </div>
          ))}
        </div>
        <button
          className="mt-4 flex items-center gap-1.5 text-muted hover:text-ink transition-colors"
          style={{ fontSize: 13, fontWeight: 500, transitionDuration: '120ms' }}
        >
          <Plus size={16} strokeWidth={1.5} />
          Add color
        </button>
      </section>

      {/* ── 5. Typography ── */}
      <section className="py-16 border-t border-border">
        <span className="caption">TYPOGRAPHY</span>
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {brandFonts.map((font) => (
            <div key={font.id} className="bg-surface rounded-xl p-6">
              <p style={{ fontSize: 32, fontWeight: 600 }} className="text-ink">
                Aa {font.name}
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                <span className="caption bg-border px-2 py-0.5 rounded">{font.role}</span>
              </div>
              <div className="mt-3 space-y-1">
                <p style={{ fontSize: 14, fontWeight: 400 }} className="text-muted">
                  Weight: {font.weight}
                </p>
                <p style={{ fontSize: 14, fontWeight: 400 }} className="text-muted">
                  Size: {font.sizeGuideline}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── 6. Voice & Tone ── */}
      <section className="py-16 border-t border-border">
        <span className="caption">VOICE &amp; TONE</span>
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left: Tone attributes */}
          <div>
            <div className="space-y-4">
              {brandVoice.tone.map((t) => {
                const intensity = toneIntensities[t] ?? 5
                return (
                  <div key={t}>
                    <div className="flex items-center justify-between mb-1">
                      <span style={{ fontSize: 14, fontWeight: 500 }} className="text-ink">
                        {t}
                      </span>
                      <span className="font-mono text-muted" style={{ fontSize: 13 }}>
                        {intensity}/10
                      </span>
                    </div>
                    <div className="bg-border rounded-full" style={{ height: 6 }}>
                      <div
                        className="bg-ink rounded-full"
                        style={{ height: 6, width: `${intensity * 10}%` }}
                      />
                    </div>
                  </div>
                )
              })}
            </div>
            <p style={{ fontSize: 14, fontWeight: 400 }} className="text-muted mt-6">
              {brandVoice.style}
            </p>
          </div>

          {/* Right: Examples & word tags */}
          <div className="space-y-4">
            {/* Good example */}
            <div
              className="bg-surface rounded-xl p-4 border-l-4 border-signal-green"
            >
              <span className="caption text-signal-green">DO</span>
              <p style={{ fontSize: 14, fontWeight: 400 }} className="text-ink mt-1">
                {brandVoice.goodExample}
              </p>
            </div>

            {/* Bad example */}
            <div
              className="bg-surface rounded-xl p-4 border-l-4 border-signal-red"
            >
              <span className="caption text-signal-red">DON&apos;T</span>
              <p
                style={{ fontSize: 14, fontWeight: 400, textDecoration: 'line-through' }}
                className="text-muted mt-1"
              >
                {brandVoice.badExample}
              </p>
            </div>

            {/* Preferred words */}
            <div>
              <span className="caption">Preferred</span>
              <div className="mt-2 flex flex-wrap gap-2">
                {brandVoice.preferred.map((w) => (
                  <span
                    key={w}
                    className="rounded-md px-2 py-0.5"
                    style={{
                      fontSize: 12,
                      fontWeight: 500,
                      backgroundColor: 'rgba(26, 135, 84, 0.1)',
                      color: '#1a8754',
                    }}
                  >
                    {w}
                  </span>
                ))}
              </div>
            </div>

            {/* Words to avoid */}
            <div>
              <span className="caption">Avoid</span>
              <div className="mt-2 flex flex-wrap gap-2">
                {brandVoice.avoid.map((w) => (
                  <span
                    key={w}
                    className="rounded-md px-2 py-0.5"
                    style={{
                      fontSize: 12,
                      fontWeight: 500,
                      backgroundColor: 'rgba(220, 53, 69, 0.1)',
                      color: '#dc3545',
                    }}
                  >
                    {w}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 7. Imagery Style ── */}
      <section className="py-16 border-t border-border">
        <span className="caption">IMAGERY</span>
        <div className="mt-6 bg-surface rounded-xl p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Photography */}
            <div>
              <p style={{ fontSize: 18, fontWeight: 600 }} className="text-ink mb-3">
                Photography
              </p>
              <ul className="space-y-1.5">
                {imageryStyle.photography.map((item) => (
                  <li
                    key={item}
                    style={{ fontSize: 14, fontWeight: 400 }}
                    className="text-muted flex items-start gap-2"
                  >
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-ink/30 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Illustration */}
            <div>
              <p style={{ fontSize: 18, fontWeight: 600 }} className="text-ink mb-3">
                Illustration
              </p>
              <p style={{ fontSize: 14, fontWeight: 400 }} className="text-muted">
                {imageryStyle.illustration}
              </p>
            </div>

            {/* Color treatment */}
            <div>
              <p style={{ fontSize: 18, fontWeight: 600 }} className="text-ink mb-3">
                Color Treatment
              </p>
              <p style={{ fontSize: 14, fontWeight: 400 }} className="text-muted">
                {imageryStyle.colorTreatment}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 8. Figma Analysis ── */}
      <section className="py-16 border-t border-border">
        <span className="caption">FIGMA ANALYSIS</span>

        {/* Connection banner */}
        <div className="mt-6 bg-surface rounded-xl p-5 flex items-center gap-3">
          <AlertCircle size={18} strokeWidth={1.5} className="text-muted shrink-0" />
          <p style={{ fontSize: 14, fontWeight: 400 }} className="text-muted flex-1">
            Connect the SocialPaint Figma plugin to analyze your design files
          </p>
          <button
            className="border border-border bg-transparent h-10 px-4 rounded-lg text-ink hover:border-ink/20 transition-colors shrink-0 flex items-center gap-2"
            style={{ fontSize: 14, fontWeight: 500, transitionDuration: '120ms' }}
          >
            <Figma size={16} strokeWidth={1.5} />
            Connect
          </button>
        </div>

        {/* Scrollable analysis strip */}
        <div className="mt-6 flex overflow-x-auto gap-4 pb-2">
          {figmaAnalyses.map((a) => (
            <div
              key={a.id}
              className="bg-surface rounded-xl p-4 shrink-0"
              style={{ minWidth: 280 }}
            >
              {/* Thumbnail placeholder */}
              <div
                className="rounded-lg w-full"
                style={{
                  height: 160,
                  background: `linear-gradient(135deg, ${a.colors[0] ?? '#ccc'}, ${a.colors[1] ?? '#eee'}, ${a.colors[2] ?? '#fff'})`,
                }}
              />

              {/* Date */}
              <p className="font-mono text-muted mt-3" style={{ fontSize: 13 }}>
                {a.date}
              </p>

              {/* Detected colors */}
              <div className="flex items-center gap-1.5 mt-2">
                {a.colors.map((c, i) => (
                  <span
                    key={i}
                    className="rounded-full"
                    style={{ width: 16, height: 16, backgroundColor: c }}
                  />
                ))}
              </div>

              {/* Typography */}
              <div className="mt-2">
                {a.typography.map((t) => (
                  <p key={t} style={{ fontSize: 13, fontWeight: 400 }} className="text-muted">
                    {t}
                  </p>
                ))}
              </div>

              {/* Layout */}
              <p style={{ fontSize: 12, fontWeight: 500 }} className="text-ink mt-2">
                {a.layout}
              </p>

              {/* Mood */}
              <p style={{ fontSize: 12, fontWeight: 400 }} className="text-muted mt-0.5">
                {a.mood}
              </p>

              {/* Confidence */}
              <div className="mt-3 flex items-center gap-2">
                <span className="font-mono text-ink" style={{ fontSize: 13, fontWeight: 500 }}>
                  {a.confidence}%
                </span>
                <div className="flex-1 bg-border rounded-full" style={{ height: 4 }}>
                  <div
                    className="bg-ink rounded-full"
                    style={{ height: 4, width: `${a.confidence}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
