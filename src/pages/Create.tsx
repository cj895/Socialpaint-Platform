import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  contentFormats, brandColors, brandVoice, brandProfile,
  generationHistory,
} from '../data/mockData'

const formatMeta: Record<string, { icon: string; ratio: string }> = {
  'instagram-post': { icon: '📸', ratio: '1:1' },
  'instagram-story': { icon: '📱', ratio: '9:16' },
  'facebook-post': { icon: '📘', ratio: '1.91:1' },
  'linkedin-post': { icon: '💼', ratio: '1.91:1' },
  'x-post': { icon: '𝕏', ratio: '16:9' },
  'pinterest-pin': { icon: '📌', ratio: '2:3' },
  'youtube-thumbnail': { icon: '▶', ratio: '16:9' },
  'custom': { icon: '⚙', ratio: 'Any' },
}

const hashtagList = ['#ShipFaster', '#BuildSmarter', '#ContentStudio', '#BrandAligned']

export default function Create() {
  const [selectedFormat, setSelectedFormat] = useState('instagram-post')
  const [prompt, setPrompt] = useState('')
  const [generated, setGenerated] = useState(true)
  const [brandContextOpen, setBrandContextOpen] = useState(true)
  const [headline, setHeadline] = useState('Ship faster. Build smarter.')
  const [bodyCopy, setBodyCopy] = useState(
    'Science-backed formulations designed for your daily routine. Made with clinically tested ingredients.'
  )
  const [cta, setCta] = useState('Shop the Collection')

  return (
    <div>
      {/* Page Header */}
      <div className="mb-8">
        <h1
          style={{
            fontSize: 28,
            fontWeight: 500,
            color: '#231f23',
            margin: 0,
            lineHeight: 1.3,
          }}
        >
          Content Studio
        </h1>
        <p
          style={{
            fontSize: 15,
            fontWeight: 300,
            color: 'rgba(35,31,35,0.48)',
            margin: '4px 0 0 0',
          }}
        >
          Create on-brand content with AI-powered generation and real-time brand alignment.
        </p>
      </div>

      {/* Format Selector */}
      <div className="mb-8">
        <div className="grid grid-cols-4 lg:grid-cols-8 gap-3">
          {contentFormats.map((f) => {
            const meta = formatMeta[f.id]
            const isSelected = selectedFormat === f.id
            return (
              <button
                key={f.id}
                onClick={() => setSelectedFormat(f.id)}
                className="flex flex-col items-center gap-1 cursor-pointer"
                style={{
                  backgroundColor: isSelected ? 'rgba(204,253,207,0.15)' : '#ffffff',
                  border: `1px solid ${isSelected ? '#ccfdcf' : 'rgba(35,31,35,0.08)'}`,
                  borderRadius: 12,
                  padding: '14px 10px',
                  boxShadow: isSelected ? '0 0 0 2px #ccfdcf' : 'none',
                  transition: 'all 150ms ease',
                }}
              >
                <span style={{ fontSize: 20, lineHeight: 1 }}>{meta?.icon}</span>
                <span
                  style={{
                    fontSize: 11,
                    fontWeight: 500,
                    color: '#231f23',
                    textAlign: 'center',
                    lineHeight: 1.3,
                  }}
                >
                  {f.label}
                </span>
                <span
                  style={{
                    fontFamily: "'Fragment Mono', monospace",
                    fontSize: 9,
                    color: 'rgba(35,31,35,0.48)',
                    textTransform: 'uppercase',
                    letterSpacing: 0.75,
                  }}
                >
                  {meta?.ratio}
                </span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Two-Panel Studio Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Controls Panel */}
        <div className="flex flex-col gap-6">
          {/* Prompt Card */}
          <div
            style={{
              backgroundColor: '#ffffff',
              border: '1px solid rgba(35,31,35,0.08)',
              borderRadius: 16,
              padding: 24,
            }}
          >
            <label
              style={{
                fontFamily: "'Fragment Mono', monospace",
                fontSize: 11,
                fontWeight: 400,
                color: 'rgba(35,31,35,0.48)',
                textTransform: 'uppercase',
                letterSpacing: 0.75,
                display: 'block',
                marginBottom: 10,
              }}
            >
              DESCRIBE YOUR CONTENT
            </label>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Describe the content you want to create..."
              className="w-full resize-none"
              style={{
                backgroundColor: 'rgba(35,31,35,0.04)',
                border: '1px solid rgba(35,31,35,0.08)',
                borderRadius: 8,
                padding: 14,
                minHeight: 120,
                fontSize: 14,
                color: '#231f23',
                outline: 'none',
                lineHeight: 1.6,
              }}
            />
            <button
              onClick={() => setGenerated(true)}
              className="w-full flex items-center justify-center gap-2 mt-4"
              style={{
                backgroundColor: '#231f23',
                color: '#ffffff',
                border: 'none',
                borderRadius: 10,
                padding: '12px 0',
                fontSize: 15,
                fontWeight: 500,
                cursor: 'pointer',
              }}
            >
              Generate
            </button>
          </div>

          {/* Brand Context Card */}
          <div
            style={{
              backgroundColor: '#ffffff',
              border: '1px solid rgba(35,31,35,0.08)',
              borderRadius: 16,
              overflow: 'hidden',
            }}
          >
            <button
              onClick={() => setBrandContextOpen(!brandContextOpen)}
              className="w-full flex items-center justify-between"
              style={{
                padding: '18px 24px',
                cursor: 'pointer',
                border: 'none',
                backgroundColor: 'transparent',
              }}
            >
              <div className="flex items-center gap-3">
                <span
                  style={{
                    fontSize: 14,
                    fontWeight: 500,
                    color: '#231f23',
                  }}
                >
                  Brand Context Applied
                </span>
                <span
                  style={{
                    fontFamily: "'Fragment Mono', monospace",
                    fontSize: 10,
                    fontWeight: 500,
                    textTransform: 'uppercase',
                    letterSpacing: 0.75,
                    color: '#6b21a8',
                    backgroundColor: 'rgba(107,33,168,0.10)',
                    borderRadius: 6,
                    padding: '3px 8px',
                  }}
                >
                  Score 87
                </span>
              </div>
              <span
                style={{
                  fontSize: 14,
                  color: 'rgba(35,31,35,0.48)',
                  transform: brandContextOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                  transition: 'transform 200ms ease',
                  display: 'inline-block',
                }}
              >
                ▾
              </span>
            </button>

            {brandContextOpen && (
              <div
                style={{
                  padding: '0 24px 20px 24px',
                  borderTop: '1px solid rgba(35,31,35,0.06)',
                }}
              >
                <div className="flex flex-col gap-4 pt-4">
                  {/* Colors */}
                  <div className="flex items-center justify-between">
                    <span style={{ fontSize: 13, color: 'rgba(35,31,35,0.64)' }}>Colors</span>
                    <div className="flex items-center gap-1.5">
                      {brandColors.slice(0, 5).map((c) => (
                        <div
                          key={c.id}
                          style={{
                            width: 14,
                            height: 14,
                            borderRadius: '50%',
                            backgroundColor: c.hex,
                          }}
                        />
                      ))}
                    </div>
                  </div>
                  {/* Voice Tone */}
                  <div className="flex items-center justify-between">
                    <span style={{ fontSize: 13, color: 'rgba(35,31,35,0.64)' }}>Voice Tone</span>
                    <span style={{ fontSize: 13, color: '#231f23' }}>
                      {brandVoice.tone.slice(0, 2).join(', ')}
                    </span>
                  </div>
                  {/* Primary Logo */}
                  <div className="flex items-center justify-between">
                    <span style={{ fontSize: 13, color: 'rgba(35,31,35,0.64)' }}>Primary Logo</span>
                    <span style={{ fontSize: 13, color: '#231f23' }}>{brandProfile.name}</span>
                  </div>
                  {/* Typography */}
                  <div className="flex items-center justify-between">
                    <span style={{ fontSize: 13, color: 'rgba(35,31,35,0.64)' }}>Typography</span>
                    <span style={{ fontSize: 13, color: '#231f23' }}>DM Serif + Inter</span>
                  </div>
                  {/* Link */}
                  <Link
                    to="/brand-system"
                    style={{
                      fontSize: 12,
                      fontWeight: 500,
                      color: '#4a7c59',
                      textDecoration: 'none',
                      marginTop: 4,
                    }}
                  >
                    View Brand Intelligence →
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* Generation History Card */}
          <div
            style={{
              backgroundColor: '#ffffff',
              border: '1px solid rgba(35,31,35,0.08)',
              borderRadius: 16,
              padding: 24,
            }}
          >
            <h3
              style={{
                fontSize: 14,
                fontWeight: 500,
                color: '#231f23',
                margin: '0 0 16px 0',
              }}
            >
              Recent Generations
            </h3>
            <div className="flex flex-col">
              {generationHistory.slice(0, 5).map((item, i) => (
                <div
                  key={item.id}
                  className="flex items-center gap-3"
                  style={{
                    padding: '10px 0',
                    borderTop: i > 0 ? '1px solid rgba(35,31,35,0.06)' : undefined,
                  }}
                >
                  {/* Thumbnail */}
                  <div
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: 8,
                      backgroundColor: 'rgba(35,31,35,0.06)',
                      flexShrink: 0,
                    }}
                  />
                  {/* Text */}
                  <div className="flex-1 min-w-0">
                    <div
                      className="truncate"
                      style={{ fontSize: 13, color: '#231f23', fontWeight: 400 }}
                    >
                      {item.prompt}
                    </div>
                    <div
                      style={{
                        fontFamily: "'Fragment Mono', monospace",
                        fontSize: 10,
                        color: 'rgba(35,31,35,0.48)',
                        textTransform: 'uppercase',
                        letterSpacing: 0.75,
                        marginTop: 2,
                      }}
                    >
                      {item.format} · {item.date}
                    </div>
                  </div>
                  {/* Score */}
                  <span
                    style={{
                      fontFamily: "'Fragment Mono', monospace",
                      fontSize: 12,
                      fontWeight: 500,
                      color: '#4a7c59',
                      flexShrink: 0,
                    }}
                  >
                    {item.score}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Preview Panel */}
        <div className="flex flex-col gap-6">
          {/* Preview Card */}
          <div
            style={{
              backgroundColor: '#ffffff',
              border: '1px solid rgba(35,31,35,0.08)',
              borderRadius: 16,
              padding: 24,
            }}
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-5">
              <span style={{ fontSize: 14, fontWeight: 500, color: '#231f23' }}>
                Generated Preview
              </span>
              <span
                className="flex items-center gap-1.5"
                style={{
                  backgroundColor: 'rgba(74,124,89,0.10)',
                  borderRadius: 999,
                  padding: '4px 12px 4px 8px',
                }}
              >
                <span
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: '50%',
                    backgroundColor: '#4a7c59',
                    display: 'inline-block',
                    boxShadow: '0 0 0 2px rgba(74,124,89,0.25)',
                  }}
                />
                <span
                  style={{
                    fontFamily: "'Fragment Mono', monospace",
                    fontSize: 10,
                    fontWeight: 500,
                    color: '#4a7c59',
                    textTransform: 'uppercase',
                    letterSpacing: 0.75,
                  }}
                >
                  92% ALIGNED
                </span>
              </span>
            </div>

            {/* Generated Graphic */}
            {generated ? (
              <div
                className="w-full flex flex-col justify-between relative overflow-hidden"
                style={{
                  aspectRatio: '1 / 1',
                  background: 'linear-gradient(160deg, #231f23 0%, #3a2f3a 100%)',
                  borderRadius: 12,
                  padding: 32,
                }}
              >
                {/* Top: Logo */}
                <div
                  style={{
                    fontSize: 13,
                    fontWeight: 600,
                    color: 'rgba(255,255,255,0.7)',
                    letterSpacing: 1.5,
                    textTransform: 'uppercase',
                  }}
                >
                  {brandProfile.name}
                </div>

                {/* Center: Headline + subtext */}
                <div className="flex flex-col items-center text-center gap-3">
                  <h2
                    style={{
                      fontSize: 28,
                      fontWeight: 600,
                      color: '#ffffff',
                      margin: 0,
                      lineHeight: 1.2,
                    }}
                  >
                    {headline}
                  </h2>
                  <p
                    style={{
                      fontSize: 14,
                      color: 'rgba(255,255,255,0.6)',
                      maxWidth: '75%',
                      margin: 0,
                      lineHeight: 1.6,
                    }}
                  >
                    {bodyCopy}
                  </p>
                </div>

                {/* Bottom: CTA + accent bar */}
                <div className="flex flex-col items-center gap-4">
                  <button
                    style={{
                      backgroundColor: '#ffffff',
                      color: '#231f23',
                      border: 'none',
                      borderRadius: 8,
                      padding: '10px 28px',
                      fontSize: 13,
                      fontWeight: 600,
                      cursor: 'pointer',
                    }}
                  >
                    {cta}
                  </button>
                </div>

                {/* Accent bar gradient at bottom */}
                <div
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: 4,
                    background: 'linear-gradient(90deg, #4a7c59, #ccfdcf, #D4A373)',
                  }}
                />
              </div>
            ) : (
              <div
                className="w-full flex items-center justify-center"
                style={{
                  aspectRatio: '1 / 1',
                  backgroundColor: 'rgba(35,31,35,0.04)',
                  borderRadius: 12,
                }}
              >
                <span style={{ fontSize: 14, color: 'rgba(35,31,35,0.48)' }}>
                  Enter a prompt and click Generate
                </span>
              </div>
            )}
          </div>

          {/* Editable Copy Section */}
          {generated && (
            <div
              style={{
                backgroundColor: '#ffffff',
                border: '1px solid rgba(35,31,35,0.08)',
                borderRadius: 16,
                padding: 24,
              }}
            >
              <div className="flex flex-col gap-5">
                {/* Headline */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label
                      style={{
                        fontFamily: "'Fragment Mono', monospace",
                        fontSize: 11,
                        color: 'rgba(35,31,35,0.48)',
                        textTransform: 'uppercase',
                        letterSpacing: 0.75,
                      }}
                    >
                      HEADLINE
                    </label>
                    <span style={{ fontSize: 13, color: 'rgba(35,31,35,0.48)', cursor: 'pointer' }}>
                      ✎
                    </span>
                  </div>
                  <input
                    type="text"
                    value={headline}
                    onChange={(e) => setHeadline(e.target.value)}
                    className="w-full"
                    style={{
                      backgroundColor: 'rgba(35,31,35,0.04)',
                      border: '1px solid rgba(35,31,35,0.08)',
                      borderRadius: 8,
                      padding: '10px 14px',
                      fontSize: 14,
                      color: '#231f23',
                      outline: 'none',
                    }}
                  />
                </div>

                {/* Body Copy */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label
                      style={{
                        fontFamily: "'Fragment Mono', monospace",
                        fontSize: 11,
                        color: 'rgba(35,31,35,0.48)',
                        textTransform: 'uppercase',
                        letterSpacing: 0.75,
                      }}
                    >
                      BODY COPY
                    </label>
                    <span style={{ fontSize: 13, color: 'rgba(35,31,35,0.48)', cursor: 'pointer' }}>
                      ✎
                    </span>
                  </div>
                  <textarea
                    value={bodyCopy}
                    onChange={(e) => setBodyCopy(e.target.value)}
                    rows={3}
                    className="w-full resize-none"
                    style={{
                      backgroundColor: 'rgba(35,31,35,0.04)',
                      border: '1px solid rgba(35,31,35,0.08)',
                      borderRadius: 8,
                      padding: '10px 14px',
                      fontSize: 14,
                      color: '#231f23',
                      outline: 'none',
                      lineHeight: 1.6,
                    }}
                  />
                </div>

                {/* Call to Action */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label
                      style={{
                        fontFamily: "'Fragment Mono', monospace",
                        fontSize: 11,
                        color: 'rgba(35,31,35,0.48)',
                        textTransform: 'uppercase',
                        letterSpacing: 0.75,
                      }}
                    >
                      CALL TO ACTION
                    </label>
                    <span style={{ fontSize: 13, color: 'rgba(35,31,35,0.48)', cursor: 'pointer' }}>
                      ✎
                    </span>
                  </div>
                  <input
                    type="text"
                    value={cta}
                    onChange={(e) => setCta(e.target.value)}
                    className="w-full"
                    style={{
                      backgroundColor: 'rgba(35,31,35,0.04)',
                      border: '1px solid rgba(35,31,35,0.08)',
                      borderRadius: 8,
                      padding: '10px 14px',
                      fontSize: 14,
                      color: '#231f23',
                      outline: 'none',
                    }}
                  />
                </div>

                {/* Hashtags */}
                <div>
                  <label
                    style={{
                      fontFamily: "'Fragment Mono', monospace",
                      fontSize: 11,
                      color: 'rgba(35,31,35,0.48)',
                      textTransform: 'uppercase',
                      letterSpacing: 0.75,
                      display: 'block',
                      marginBottom: 8,
                    }}
                  >
                    HASHTAGS
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {hashtagList.map((tag) => (
                      <span
                        key={tag}
                        style={{
                          fontSize: 12,
                          fontWeight: 500,
                          color: '#4a7c59',
                          backgroundColor: 'rgba(74,124,89,0.08)',
                          borderRadius: 999,
                          padding: '5px 12px',
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Export Bar */}
          {generated && (
            <div
              className="flex items-center justify-between flex-wrap gap-3"
              style={{
                backgroundColor: '#ffffff',
                border: '1px solid rgba(35,31,35,0.08)',
                borderRadius: 16,
                padding: '16px 24px',
              }}
            >
              {/* Format Buttons */}
              <div className="flex items-center gap-2">
                {['PNG', 'JPG', 'SVG', 'PDF'].map((fmt, i) => (
                  <button
                    key={fmt}
                    style={{
                      backgroundColor: i === 0 ? '#231f23' : 'transparent',
                      color: i === 0 ? '#ffffff' : '#231f23',
                      border: i === 0 ? '1px solid #231f23' : '1px solid rgba(35,31,35,0.15)',
                      borderRadius: 8,
                      padding: '7px 16px',
                      fontSize: 12,
                      fontWeight: 500,
                      cursor: 'pointer',
                    }}
                  >
                    {fmt}
                  </button>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2">
                <button
                  style={{
                    backgroundColor: 'transparent',
                    color: '#231f23',
                    border: '1px solid rgba(35,31,35,0.15)',
                    borderRadius: 8,
                    padding: '7px 16px',
                    fontSize: 12,
                    fontWeight: 500,
                    cursor: 'pointer',
                  }}
                >
                  Send to Figma
                </button>
                <button
                  style={{
                    backgroundColor: '#ccfdcf',
                    color: '#4a7c59',
                    border: '1px solid rgba(74,124,89,0.15)',
                    borderRadius: 8,
                    padding: '7px 16px',
                    fontSize: 12,
                    fontWeight: 600,
                    cursor: 'pointer',
                  }}
                >
                  Save to Library
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
