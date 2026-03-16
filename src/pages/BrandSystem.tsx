import { useState } from 'react'
import {
  Check, Copy, Plus, Upload,
} from 'lucide-react'
import {
  brandProfile, logoVariants, brandColors, brandFonts, brandVoice,
  imageryStyle, figmaAnalyses, brandScore,
} from '../data/mockData'

/* ── design tokens (inline style helpers) ── */
const ink = '#231f23'
const muted48 = 'rgba(35,31,35,0.48)'
const muted64 = 'rgba(35,31,35,0.64)'
const border = '1px solid rgba(35,31,35,0.08)'
const green = '#4a7c59'
const red = '#e94560'
const purple = '#cebffa'

const cardStyle: React.CSSProperties = {
  backgroundColor: '#ffffff',
  border,
  borderRadius: 16,
  padding: 28,
}

const monoLabel: React.CSSProperties = {
  fontFamily: 'Fragment Mono, monospace',
  fontSize: 11,
  fontWeight: 400,
  textTransform: 'uppercase' as const,
  letterSpacing: 0.75,
  color: muted48,
}

const editBtnStyle: React.CSSProperties = {
  fontSize: 13,
  fontWeight: 400,
  color: muted48,
  background: 'rgba(35,31,35,0.04)',
  border,
  padding: '6px 14px',
  borderRadius: 8,
  cursor: 'pointer',
}

const sectionIconStyle: React.CSSProperties = {
  width: 36,
  height: 36,
  borderRadius: 10,
  backgroundColor: purple,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: 16,
}

/* ── helpers ── */
function SectionHeader({
  icon,
  title,
  subtitle,
  onEdit,
  editLabel = 'Edit',
}: {
  icon: string
  title: string
  subtitle: string
  onEdit?: () => void
  editLabel?: string
}) {
  return (
    <div className="flex items-center gap-3 mb-6">
      <div style={sectionIconStyle}>{icon}</div>
      <div className="flex-1">
        <h2 style={{ fontSize: 18, fontWeight: 500, color: ink, margin: 0 }}>{title}</h2>
        <p style={{ fontSize: 13, fontWeight: 300, color: muted64, margin: 0 }}>{subtitle}</p>
      </div>
      {onEdit && (
        <button style={editBtnStyle} onClick={onEdit}>
          {editLabel}
        </button>
      )}
    </div>
  )
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

  const scorePercent = 87
  const scoreAngle = (scorePercent / 100) * 360

  return (
    <div className="max-w-[960px] mx-auto px-6 pb-16">

      {/* ════════════════════════════════════════════
          1. Page Header
      ════════════════════════════════════════════ */}
      <div className="flex items-start justify-between pt-10 pb-10">
        {/* Left */}
        <div>
          <h1 style={{ fontSize: 28, fontWeight: 500, color: ink, margin: 0 }}>
            Brand Intelligence
          </h1>
          <p style={{ fontSize: 15, fontWeight: 300, color: muted48, marginTop: 4 }}>
            Your unified brand system — logos, colors, voice &amp; Figma analysis
          </p>
        </div>

        {/* Right – Brand Score card */}
        <div
          style={{
            ...cardStyle,
            padding: '20px 24px',
            display: 'flex',
            alignItems: 'center',
            gap: 16,
            flexShrink: 0,
          }}
        >
          {/* Score ring */}
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: '50%',
              background: `conic-gradient(${purple} ${scoreAngle}deg, rgba(35,31,35,0.06) ${scoreAngle}deg)`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            <div
              style={{
                width: 48,
                height: 48,
                borderRadius: '50%',
                backgroundColor: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <span style={{ fontSize: 20, fontWeight: 500, color: ink }}>{scorePercent}</span>
            </div>
          </div>

          {/* Score details */}
          <div>
            <p style={{ fontSize: 14, fontWeight: 500, color: ink, margin: 0 }}>Brand Score</p>
            <div className="flex flex-wrap gap-1 mt-2" style={{ maxWidth: 220 }}>
              {brandScore.items.map((item) => (
                <span
                  key={item.label}
                  style={{
                    fontSize: 10,
                    fontWeight: 500,
                    padding: '2px 8px',
                    borderRadius: 20,
                    backgroundColor: item.done ? 'rgba(74,124,89,0.12)' : 'rgba(35,31,35,0.06)',
                    color: item.done ? green : muted48,
                    whiteSpace: 'nowrap',
                  }}
                >
                  {item.done ? '✓' : '○'} {item.label}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ════════════════════════════════════════════
          2. Brand Profile
      ════════════════════════════════════════════ */}
      <div style={cardStyle} className="mb-6">
        <SectionHeader
          icon="🏢"
          title="Brand Profile"
          subtitle="Core identity information"
          onEdit={() => {
            if (editing) {
              setEditing(false)
              setProfile({ ...brandProfile })
            } else {
              setEditing(true)
            }
          }}
          editLabel={editing ? 'Cancel' : 'Edit'}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-5">
          {(['name', 'industry', 'tagline', 'targetAudience'] as const).map((field) => {
            const labels: Record<string, string> = {
              name: 'NAME',
              industry: 'INDUSTRY',
              tagline: 'TAGLINE',
              targetAudience: 'TARGET AUDIENCE',
            }
            return (
              <div key={field}>
                <span style={monoLabel}>{labels[field]}</span>
                {editing ? (
                  <input
                    className="mt-1 w-full outline-none"
                    style={{
                      fontSize: 15,
                      fontWeight: 300,
                      color: ink,
                      backgroundColor: '#ffffff',
                      border,
                      borderRadius: 8,
                      padding: '8px 12px',
                    }}
                    value={profile[field]}
                    onChange={(e) => handleProfileChange(field, e.target.value)}
                  />
                ) : (
                  <p style={{ fontSize: 15, fontWeight: 300, color: ink, marginTop: 4, marginBottom: 0 }}>
                    {profile[field]}
                  </p>
                )}
              </div>
            )
          })}
        </div>

        {/* Mission — full width */}
        <div className="mt-5">
          <span style={monoLabel}>MISSION</span>
          {editing ? (
            <textarea
              className="mt-1 w-full outline-none resize-none"
              rows={3}
              style={{
                fontSize: 15,
                fontWeight: 300,
                color: ink,
                backgroundColor: '#ffffff',
                border,
                borderRadius: 8,
                padding: '8px 12px',
              }}
              value={profile.mission}
              onChange={(e) => handleProfileChange('mission', e.target.value)}
            />
          ) : (
            <p style={{ fontSize: 15, fontWeight: 300, color: ink, marginTop: 4, marginBottom: 0 }}>
              {profile.mission}
            </p>
          )}
        </div>

        {editing && (
          <button
            onClick={handleSave}
            style={{
              marginTop: 20,
              fontSize: 14,
              fontWeight: 500,
              color: '#ffffff',
              backgroundColor: ink,
              border: 'none',
              borderRadius: 8,
              padding: '8px 20px',
              cursor: 'pointer',
            }}
          >
            Save
          </button>
        )}
      </div>

      {/* ════════════════════════════════════════════
          3. Logo Library
      ════════════════════════════════════════════ */}
      <div style={cardStyle} className="mb-6">
        <SectionHeader
          icon="🎨"
          title="Logo Library"
          subtitle="All approved logo variants"
          onEdit={() => {}}
        />

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {logoVariants.slice(0, 3).map((logo) => (
            <div
              key={logo.id}
              style={{ backgroundColor: 'rgba(35,31,35,0.03)', borderRadius: 12 }}
              className="flex flex-col items-center p-5"
            >
              {/* Logo placeholder */}
              <div
                style={{
                  width: 80,
                  height: 80,
                  borderRadius: 12,
                  backgroundColor: 'rgba(35,31,35,0.08)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 24,
                  color: muted48,
                }}
              >
                ◇
              </div>
              <p style={{ fontSize: 13, fontWeight: 500, color: ink, marginTop: 12, marginBottom: 2, textAlign: 'center' }}>
                {logo.label}
              </p>
              <span style={monoLabel}>{logo.context.split(' ')[0]}</span>
            </div>
          ))}

          {/* Upload zone */}
          <div
            style={{
              border: '2px dashed rgba(35,31,35,0.12)',
              borderRadius: 12,
              cursor: 'pointer',
            }}
            className="flex flex-col items-center justify-center p-5 gap-2"
          >
            <Upload size={20} style={{ color: muted48 }} />
            <span style={{ fontSize: 13, fontWeight: 400, color: muted48 }}>Upload logo</span>
          </div>
        </div>
      </div>

      {/* ════════════════════════════════════════════
          4. Color Palette
      ════════════════════════════════════════════ */}
      <div style={cardStyle} className="mb-6">
        <SectionHeader
          icon="🎨"
          title="Color Palette"
          subtitle="Brand color system"
          onEdit={() => {}}
        />

        <div className="grid grid-cols-3 sm:grid-cols-6 gap-4">
          {brandColors.map((color) => (
            <div key={color.id} className="flex flex-col items-center">
              {/* Swatch */}
              <div
                style={{
                  width: '100%',
                  height: 56,
                  borderRadius: 12,
                  backgroundColor: color.hex,
                  cursor: 'pointer',
                }}
                onClick={() => copyHex(color.id, color.hex)}
              />
              <p style={{ fontSize: 12, fontWeight: 500, color: ink, marginTop: 8, marginBottom: 2 }}>
                {color.name}
              </p>
              <span
                style={{
                  fontFamily: 'Fragment Mono, monospace',
                  fontSize: 10,
                  color: muted48,
                }}
              >
                {copiedId === color.id ? (
                  <span className="flex items-center gap-1" style={{ color: green }}>
                    <Check size={10} /> Copied
                  </span>
                ) : (
                  <span className="flex items-center gap-1">
                    {color.hex}
                    <Copy size={10} style={{ color: muted48, cursor: 'pointer' }} onClick={() => copyHex(color.id, color.hex)} />
                  </span>
                )}
              </span>
              <span style={{ ...monoLabel, fontSize: 9, marginTop: 2 }}>{color.usage}</span>
            </div>
          ))}

          {/* Add color */}
          <div
            className="flex flex-col items-center justify-center"
            style={{ cursor: 'pointer' }}
          >
            <div
              style={{
                width: '100%',
                height: 56,
                borderRadius: 12,
                border: '2px dashed rgba(35,31,35,0.12)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Plus size={18} style={{ color: muted48 }} />
            </div>
            <p style={{ fontSize: 12, fontWeight: 500, color: muted48, marginTop: 8 }}>
              Add color
            </p>
          </div>
        </div>
      </div>

      {/* ════════════════════════════════════════════
          5. Typography
      ════════════════════════════════════════════ */}
      <div style={cardStyle} className="mb-6">
        <SectionHeader
          icon="Aa"
          title="Typography"
          subtitle="Approved typefaces and usage"
          onEdit={() => {}}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {brandFonts.map((font) => (
            <div
              key={font.id}
              style={{ backgroundColor: 'rgba(35,31,35,0.03)', borderRadius: 12 }}
              className="p-5"
            >
              <span
                style={{
                  fontFamily: 'Fragment Mono, monospace',
                  fontSize: 10,
                  fontWeight: 400,
                  textTransform: 'uppercase' as const,
                  letterSpacing: 0.75,
                  color: muted48,
                }}
              >
                {font.role}
              </span>
              <p style={{ fontSize: 24, fontWeight: 400, color: ink, margin: '8px 0' }}>
                Aa Bb Cc 123
              </p>
              <p style={{ fontSize: 12, fontWeight: 300, color: muted64, margin: 0 }}>
                {font.name} · {font.weight} · {font.sizeGuideline}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* ════════════════════════════════════════════
          6. Brand Voice
      ════════════════════════════════════════════ */}
      <div style={cardStyle} className="mb-6">
        <SectionHeader
          icon="💬"
          title="Brand Voice"
          subtitle="Tone, style and language guidelines"
          onEdit={() => {}}
        />

        {/* Tone tags */}
        <div className="flex flex-wrap gap-2 mb-5">
          {brandVoice.tone.map((t) => (
            <span
              key={t}
              style={{
                fontSize: 13,
                fontWeight: 500,
                color: ink,
                backgroundColor: 'rgba(206,191,250,0.30)',
                padding: '5px 14px',
                borderRadius: 20,
              }}
            >
              {t}
            </span>
          ))}
        </div>

        {/* Writing style */}
        <p style={{ fontSize: 14, fontWeight: 300, color: muted64, marginBottom: 20 }}>
          {brandVoice.style}
        </p>

        {/* Word chips */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
          <div>
            <span style={monoLabel}>PREFERRED WORDS</span>
            <div className="flex flex-wrap gap-2 mt-2">
              {brandVoice.preferred.map((w) => (
                <span
                  key={w}
                  style={{
                    fontSize: 12,
                    fontWeight: 500,
                    padding: '3px 10px',
                    borderRadius: 6,
                    backgroundColor: 'rgba(74,124,89,0.10)',
                    color: green,
                  }}
                >
                  {w}
                </span>
              ))}
            </div>
          </div>
          <div>
            <span style={monoLabel}>WORDS TO AVOID</span>
            <div className="flex flex-wrap gap-2 mt-2">
              {brandVoice.avoid.map((w) => (
                <span
                  key={w}
                  style={{
                    fontSize: 12,
                    fontWeight: 500,
                    padding: '3px 10px',
                    borderRadius: 6,
                    backgroundColor: 'rgba(233,69,96,0.10)',
                    color: red,
                  }}
                >
                  {w}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Examples */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Good example */}
          <div
            style={{
              backgroundColor: 'rgba(35,31,35,0.02)',
              borderRadius: 12,
              borderLeft: `4px solid ${green}`,
              padding: 16,
            }}
          >
            <span style={{ ...monoLabel, color: green }}>DO</span>
            <p style={{ fontSize: 14, fontWeight: 300, color: ink, marginTop: 6, marginBottom: 0 }}>
              {brandVoice.goodExample}
            </p>
          </div>

          {/* Bad example */}
          <div
            style={{
              backgroundColor: 'rgba(35,31,35,0.02)',
              borderRadius: 12,
              borderLeft: `4px solid ${red}`,
              padding: 16,
            }}
          >
            <span style={{ ...monoLabel, color: red }}>DON&apos;T</span>
            <p
              style={{
                fontSize: 14,
                fontWeight: 300,
                color: muted48,
                marginTop: 6,
                marginBottom: 0,
                textDecoration: 'line-through',
              }}
            >
              {brandVoice.badExample}
            </p>
          </div>
        </div>
      </div>

      {/* ════════════════════════════════════════════
          7. Imagery Style
      ════════════════════════════════════════════ */}
      <div style={cardStyle} className="mb-6">
        <SectionHeader
          icon="📷"
          title="Imagery Style"
          subtitle="Visual direction for photography and illustration"
          onEdit={() => {}}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-5">
          {/* Photography Direction */}
          <div>
            <span style={monoLabel}>PHOTOGRAPHY DIRECTION</span>
            <ul style={{ paddingLeft: 16, margin: '6px 0 0' }}>
              {imageryStyle.photography.map((item) => (
                <li key={item} style={{ fontSize: 15, fontWeight: 300, color: ink, marginBottom: 2 }}>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Illustration Style */}
          <div>
            <span style={monoLabel}>ILLUSTRATION STYLE</span>
            <p style={{ fontSize: 15, fontWeight: 300, color: ink, marginTop: 6, marginBottom: 0 }}>
              {imageryStyle.illustration}
            </p>
          </div>

          {/* Color Treatment */}
          <div>
            <span style={monoLabel}>COLOR TREATMENT</span>
            <p style={{ fontSize: 15, fontWeight: 300, color: ink, marginTop: 6, marginBottom: 0 }}>
              {imageryStyle.colorTreatment}
            </p>
          </div>

          {/* Composition Notes */}
          <div>
            <span style={monoLabel}>COMPOSITION NOTES</span>
            <p style={{ fontSize: 15, fontWeight: 300, color: ink, marginTop: 6, marginBottom: 0 }}>
              Prefer asymmetric layouts with generous whitespace. Subjects off-center with natural framing.
            </p>
          </div>
        </div>
      </div>

      {/* ════════════════════════════════════════════
          8. Figma Plugin Analysis
      ════════════════════════════════════════════ */}
      <div style={cardStyle} className="mb-6">
        <SectionHeader
          icon="◈"
          title="Figma Plugin Analysis"
          subtitle="Design file pattern detection"
          onEdit={() => {}}
          editLabel="Settings"
        />

        {/* Connection status */}
        <div className="flex items-center gap-2 mb-5">
          <span
            style={{
              width: 8,
              height: 8,
              borderRadius: '50%',
              backgroundColor: green,
              display: 'inline-block',
            }}
          />
          <span style={{ fontSize: 13, fontWeight: 400, color: muted64 }}>
            Figma plugin connected — {figmaAnalyses.length} designs analyzed
          </span>
        </div>

        {/* 3-col grid of figma entries */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {figmaAnalyses.map((a) => (
            <div
              key={a.id}
              style={{
                backgroundColor: 'rgba(35,31,35,0.03)',
                borderRadius: 12,
              }}
              className="p-4"
            >
              {/* Thumbnail placeholder */}
              <div
                style={{
                  height: 100,
                  borderRadius: 8,
                  background: `linear-gradient(135deg, ${a.colors[0] ?? '#ccc'}, ${a.colors[1] ?? '#eee'}, ${a.colors[2] ?? '#fff'})`,
                }}
              />

              {/* Date */}
              <p
                style={{
                  fontFamily: 'Fragment Mono, monospace',
                  fontSize: 11,
                  color: muted48,
                  marginTop: 10,
                  marginBottom: 6,
                }}
              >
                {a.date}
              </p>

              {/* Pattern tags */}
              <div className="flex flex-wrap gap-1 mb-2">
                <span
                  style={{
                    fontSize: 10,
                    fontWeight: 500,
                    padding: '2px 8px',
                    borderRadius: 20,
                    backgroundColor: 'rgba(206,191,250,0.25)',
                    color: ink,
                  }}
                >
                  {a.layout.split(' ')[0]}
                </span>
                <span
                  style={{
                    fontSize: 10,
                    fontWeight: 500,
                    padding: '2px 8px',
                    borderRadius: 20,
                    backgroundColor: 'rgba(35,31,35,0.06)',
                    color: muted64,
                  }}
                >
                  {a.mood}
                </span>
              </div>

              {/* Confidence */}
              <div className="flex items-center gap-2">
                <div
                  style={{
                    flex: 1,
                    height: 4,
                    borderRadius: 2,
                    backgroundColor: 'rgba(35,31,35,0.06)',
                  }}
                >
                  <div
                    style={{
                      height: 4,
                      borderRadius: 2,
                      width: `${a.confidence}%`,
                      backgroundColor: purple,
                    }}
                  />
                </div>
                <span
                  style={{
                    fontFamily: 'Fragment Mono, monospace',
                    fontSize: 11,
                    fontWeight: 500,
                    color: ink,
                  }}
                >
                  {a.confidence}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
