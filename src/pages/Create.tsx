import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Sparkles, Download, Send, ChevronDown,
  RefreshCw, Image,
  Minus, Plus,
} from 'lucide-react'
import { Fingerprint, Eye, EyeOff, Check } from 'lucide-react'
import {
  contentFormats, brandColors, brandVoice, brandProfile,
  generationHistory,
} from '../data/mockData'

export default function Create() {
  const [selectedFormat, setSelectedFormat] = useState('instagram-post')
  const [prompt, setPrompt] = useState('')
  const [generated, setGenerated] = useState(true)
  const [precisionMode, setPrecisionMode] = useState(false)
  const [headline, setHeadline] = useState('Spring Wellness Collection')
  const [bodyCopy, setBodyCopy] = useState(
    'Science-backed formulations designed for your daily routine. Made with clinically tested ingredients.'
  )
  const [hashtags, setHashtags] = useState('#MeridianLabs #WellnessScience #SpringCollection')
  const [cta, setCta] = useState('Shop the Collection')
  const [zoom, setZoom] = useState(100)
  const [creativity, setCreativity] = useState(65)
  const [brandAdherence, setBrandAdherence] = useState(85)
  const [colorOverrides, setColorOverrides] = useState<string[]>(brandColors.map((c) => c.id))
  const [layerVisibility, setLayerVisibility] = useState({
    background: true,
    typography: true,
    logo: true,
    cta: true,
  })
  const [showDownloadMenu, setShowDownloadMenu] = useState(false)

  const activeFormat = contentFormats.find((f) => f.id === selectedFormat) || contentFormats[0]

  const toggleColorOverride = (id: string) => {
    setColorOverrides((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
    )
  }

  const toggleLayer = (key: keyof typeof layerVisibility) => {
    setLayerVisibility((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  const scoreColor = (score: number) => {
    if (score >= 85) return '#1a8754'
    if (score >= 70) return '#d97706'
    return '#dc3545'
  }

  const scoreBg = (score: number) => {
    if (score >= 85) return 'rgba(26,135,84,0.08)'
    if (score >= 70) return 'rgba(217,119,6,0.08)'
    return 'rgba(220,53,69,0.08)'
  }

  const layers = [
    { key: 'background' as const, label: 'Background' },
    { key: 'typography' as const, label: 'Typography' },
    { key: 'logo' as const, label: 'Logo Placement' },
    { key: 'cta' as const, label: 'CTA Element' },
  ]

  return (
    <div className="flex flex-col lg:flex-row h-full min-h-0">
      {/* LEFT — Control Panel */}
      <div
        className="w-full lg:w-[40%] bg-[#fafaf9] border-b lg:border-b-0 lg:border-r overflow-y-auto shrink-0"
        style={{ borderColor: 'rgba(15,15,15,0.06)' }}
      >
        <div className="p-6 flex flex-col gap-6">
          {/* Title + Precision Toggle */}
          <div className="flex items-center justify-between">
            <h1 style={{ fontSize: 28, fontWeight: 600, color: '#0f0f0f' }}>Create</h1>
            <div
              className="flex items-center rounded-lg overflow-hidden border"
              style={{ borderColor: 'rgba(15,15,15,0.06)' }}
            >
              <button
                className="px-3 py-1.5 text-[13px] transition-colors duration-[120ms]"
                style={{
                  fontWeight: 500,
                  backgroundColor: !precisionMode ? '#0f0f0f' : '#f3f3f2',
                  color: !precisionMode ? '#fff' : 'rgba(15,15,15,0.45)',
                }}
                onClick={() => setPrecisionMode(false)}
              >
                Standard
              </button>
              <button
                className="px-3 py-1.5 text-[13px] transition-colors duration-[120ms]"
                style={{
                  fontWeight: 500,
                  backgroundColor: precisionMode ? '#0f0f0f' : '#f3f3f2',
                  color: precisionMode ? '#fff' : 'rgba(15,15,15,0.45)',
                }}
                onClick={() => setPrecisionMode(true)}
              >
                Precision
              </button>
            </div>
          </div>

          {/* Format Selector */}
          <div>
            <div
              className="uppercase mb-2"
              style={{
                fontSize: 11,
                fontWeight: 500,
                letterSpacing: 0.8,
                color: 'rgba(15,15,15,0.4)',
              }}
            >
              Format
            </div>
            <select
              value={selectedFormat}
              onChange={(e) => setSelectedFormat(e.target.value)}
              className="w-full bg-[#f3f3f2] border rounded-lg px-3 py-2.5 text-[14px] appearance-none cursor-pointer transition-colors duration-[120ms]"
              style={{
                borderColor: 'rgba(15,15,15,0.06)',
                fontWeight: 400,
                color: '#0f0f0f',
              }}
            >
              {contentFormats.map((f) => (
                <option key={f.id} value={f.id}>
                  {f.label}
                </option>
              ))}
            </select>
            <div
              className="mt-1.5 font-mono"
              style={{ fontSize: 13, color: 'rgba(15,15,15,0.45)' }}
            >
              {activeFormat.width} &times; {activeFormat.height}px
            </div>
          </div>

          {/* Prompt Input */}
          <div>
            <div
              className="uppercase mb-2"
              style={{
                fontSize: 11,
                fontWeight: 500,
                letterSpacing: 0.8,
                color: 'rgba(15,15,15,0.4)',
              }}
            >
              Prompt
            </div>
            <textarea
              rows={5}
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Describe what you need..."
              className="w-full bg-[#f3f3f2] border rounded-xl p-4 text-[14px] resize-none transition-colors duration-[120ms] focus:outline-none focus:ring-1 focus:ring-[#2d5bf6]"
              style={{
                borderColor: 'rgba(15,15,15,0.06)',
                fontWeight: 400,
                color: '#0f0f0f',
              }}
            />
            <button
              className="mt-3 w-full h-10 bg-[#0f0f0f] text-white rounded-lg text-[13px] flex items-center justify-center gap-2 transition-opacity duration-[120ms] hover:opacity-90"
              style={{ fontWeight: 500 }}
              onClick={() => setGenerated(true)}
            >
              <Sparkles size={16} strokeWidth={1.5} />
              Generate
            </button>
          </div>

          {/* Brand Context */}
          <div>
            <div
              className="uppercase mb-3"
              style={{
                fontSize: 11,
                fontWeight: 500,
                letterSpacing: 0.8,
                color: 'rgba(15,15,15,0.4)',
              }}
            >
              Brand Context
            </div>
            <div
              className="bg-[#f3f3f2] border rounded-xl p-4 flex flex-col gap-3"
              style={{ borderColor: 'rgba(15,15,15,0.06)' }}
            >
              <div className="flex items-center gap-2">
                <Fingerprint size={16} strokeWidth={1.5} style={{ color: 'rgba(15,15,15,0.45)' }} />
                <span style={{ fontSize: 14, fontWeight: 600, color: '#0f0f0f' }}>
                  {brandProfile.name}
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                {brandColors.map((c) => (
                  <div
                    key={c.id}
                    className="rounded-full shrink-0"
                    style={{ width: 12, height: 12, backgroundColor: c.hex }}
                  />
                ))}
              </div>
              <div style={{ fontSize: 14, fontWeight: 400, color: 'rgba(15,15,15,0.45)' }}>
                {brandVoice.tone.join(', ')}
              </div>
              <Link
                to="/brand-system"
                className="text-[13px] transition-colors duration-[120ms] hover:opacity-80"
                style={{ fontWeight: 500, color: '#2d5bf6' }}
              >
                View brand system &rarr;
              </Link>
            </div>
          </div>

          {/* Precision Mode Controls */}
          {precisionMode && (
            <>
              {/* Style Controls */}
              <div>
                <div
                  className="uppercase mb-3"
                  style={{
                    fontSize: 11,
                    fontWeight: 500,
                    letterSpacing: 0.8,
                    color: 'rgba(15,15,15,0.4)',
                  }}
                >
                  Style Controls
                </div>
                <div className="flex flex-col gap-4">
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <span style={{ fontSize: 13, fontWeight: 400, color: '#0f0f0f' }}>
                        Creativity
                      </span>
                      <span className="font-mono" style={{ fontSize: 13, color: 'rgba(15,15,15,0.45)' }}>
                        {creativity}
                      </span>
                    </div>
                    <input
                      type="range"
                      min={0}
                      max={100}
                      value={creativity}
                      onChange={(e) => setCreativity(Number(e.target.value))}
                      className="w-full accent-[#0f0f0f] h-1"
                    />
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <span style={{ fontSize: 13, fontWeight: 400, color: '#0f0f0f' }}>
                        Brand Adherence
                      </span>
                      <span className="font-mono" style={{ fontSize: 13, color: 'rgba(15,15,15,0.45)' }}>
                        {brandAdherence}
                      </span>
                    </div>
                    <input
                      type="range"
                      min={0}
                      max={100}
                      value={brandAdherence}
                      onChange={(e) => setBrandAdherence(Number(e.target.value))}
                      className="w-full accent-[#0f0f0f] h-1"
                    />
                  </div>
                </div>
              </div>

              {/* Color Overrides */}
              <div>
                <div
                  className="uppercase mb-3"
                  style={{
                    fontSize: 11,
                    fontWeight: 500,
                    letterSpacing: 0.8,
                    color: 'rgba(15,15,15,0.4)',
                  }}
                >
                  Color Overrides
                </div>
                <div className="flex items-center gap-2.5 flex-wrap">
                  {brandColors.map((c) => (
                    <button
                      key={c.id}
                      className="rounded-full relative flex items-center justify-center transition-transform duration-[120ms] hover:scale-110"
                      style={{ width: 24, height: 24, backgroundColor: c.hex }}
                      onClick={() => toggleColorOverride(c.id)}
                    >
                      {colorOverrides.includes(c.id) && (
                        <Check size={12} strokeWidth={2.5} color="#fff" />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Layers */}
              <div>
                <div
                  className="uppercase mb-3"
                  style={{
                    fontSize: 11,
                    fontWeight: 500,
                    letterSpacing: 0.8,
                    color: 'rgba(15,15,15,0.4)',
                  }}
                >
                  Layers
                </div>
                <div
                  className="bg-[#f3f3f2] border rounded-xl overflow-hidden"
                  style={{ borderColor: 'rgba(15,15,15,0.06)' }}
                >
                  {layers.map((layer, i) => (
                    <div
                      key={layer.key}
                      className="flex items-center justify-between px-4 py-2.5"
                      style={{
                        borderTop: i > 0 ? '1px solid rgba(15,15,15,0.06)' : undefined,
                      }}
                    >
                      <span style={{ fontSize: 13, fontWeight: 400, color: '#0f0f0f' }}>
                        {layer.label}
                      </span>
                      <button
                        className="transition-opacity duration-[120ms] hover:opacity-70"
                        onClick={() => toggleLayer(layer.key)}
                      >
                        {layerVisibility[layer.key] ? (
                          <Eye size={16} strokeWidth={1.5} style={{ color: '#0f0f0f' }} />
                        ) : (
                          <EyeOff size={16} strokeWidth={1.5} style={{ color: 'rgba(15,15,15,0.3)' }} />
                        )}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* Generation History */}
          <div>
            <div
              className="uppercase mb-3"
              style={{
                fontSize: 11,
                fontWeight: 500,
                letterSpacing: 0.8,
                color: 'rgba(15,15,15,0.4)',
              }}
            >
              History
            </div>
            <div className="flex flex-col">
              {generationHistory.slice(0, 5).map((item, i) => (
                <div
                  key={item.id}
                  className="flex items-center gap-3 py-2"
                  style={{
                    borderTop: i > 0 ? '1px solid rgba(15,15,15,0.06)' : undefined,
                  }}
                >
                  <span
                    className="flex-1 truncate"
                    style={{ fontSize: 13, fontWeight: 400, color: '#0f0f0f' }}
                  >
                    {item.prompt}
                  </span>
                  <span
                    className="uppercase shrink-0"
                    style={{
                      fontSize: 11,
                      fontWeight: 500,
                      letterSpacing: 0.8,
                      color: 'rgba(15,15,15,0.4)',
                    }}
                  >
                    {item.format}
                  </span>
                  <span
                    className="font-mono shrink-0 rounded px-1.5 py-0.5"
                    style={{
                      fontSize: 13,
                      color: scoreColor(item.score),
                      backgroundColor: scoreBg(item.score),
                    }}
                  >
                    {item.score}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT — Canvas Area */}
      <div
        className="flex-1 flex flex-col min-h-0"
        style={{ backgroundColor: precisionMode ? '#1a1a1a' : '#e8e8e7' }}
      >
        {/* Floating Toolbar */}
        {generated && (
          <div className="flex justify-center px-6 pt-4">
            <div
              className="bg-white rounded-xl border px-4 py-2 flex items-center gap-3"
              style={{
                borderColor: 'rgba(15,15,15,0.06)',
                boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
              }}
            >
              <span
                className="font-mono rounded px-2 py-0.5"
                style={{
                  fontSize: 13,
                  fontWeight: 500,
                  color: '#1a8754',
                  backgroundColor: 'rgba(26,135,84,0.08)',
                }}
              >
                94
              </span>
              <div className="w-px h-5" style={{ backgroundColor: 'rgba(15,15,15,0.06)' }} />
              <button
                className="flex items-center gap-1.5 border rounded-lg px-3 py-1.5 text-[13px] transition-colors duration-[120ms] hover:bg-[#f3f3f2]"
                style={{
                  fontWeight: 500,
                  borderColor: 'rgba(15,15,15,0.06)',
                  color: '#0f0f0f',
                }}
              >
                <RefreshCw size={14} strokeWidth={1.5} />
                Regenerate
              </button>
              <div className="relative">
                <button
                  className="flex items-center gap-1.5 border rounded-lg px-3 py-1.5 text-[13px] transition-colors duration-[120ms] hover:bg-[#f3f3f2]"
                  style={{
                    fontWeight: 500,
                    borderColor: 'rgba(15,15,15,0.06)',
                    color: '#0f0f0f',
                  }}
                  onClick={() => setShowDownloadMenu(!showDownloadMenu)}
                >
                  <Download size={14} strokeWidth={1.5} />
                  Download
                  <ChevronDown size={12} strokeWidth={1.5} />
                </button>
                {showDownloadMenu && (
                  <div
                    className="absolute top-full mt-1 right-0 bg-white rounded-lg border py-1 z-10 min-w-[120px]"
                    style={{
                      borderColor: 'rgba(15,15,15,0.06)',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                    }}
                  >
                    {['PNG', 'JPG', 'SVG', 'PDF'].map((fmt) => (
                      <button
                        key={fmt}
                        className="w-full text-left px-3 py-1.5 text-[13px] transition-colors duration-[120ms] hover:bg-[#f3f3f2]"
                        style={{ fontWeight: 400, color: '#0f0f0f' }}
                        onClick={() => setShowDownloadMenu(false)}
                      >
                        {fmt}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              <button
                className="flex items-center gap-1.5 border rounded-lg px-3 py-1.5 text-[13px] transition-colors duration-[120ms] hover:bg-[#f3f3f2]"
                style={{
                  fontWeight: 500,
                  borderColor: 'rgba(15,15,15,0.06)',
                  color: 'rgba(15,15,15,0.45)',
                }}
              >
                <Send size={14} strokeWidth={1.5} />
                Send to Figma
              </button>
            </div>
          </div>
        )}

        {/* Canvas */}
        <div className="flex-1 flex items-center justify-center p-6 min-h-0">
          {generated ? (
            <div
              className="relative overflow-hidden rounded-xl"
              style={{
                aspectRatio: `${activeFormat.width} / ${activeFormat.height}`,
                maxHeight: '70vh',
                maxWidth: '100%',
                background: `linear-gradient(135deg, ${brandColors[0].hex}, ${brandColors[1].hex})`,
                transform: `scale(${zoom / 100})`,
                transformOrigin: 'center',
              }}
            >
              <div className="absolute inset-0 flex flex-col justify-between p-8">
                {/* Top — Brand name */}
                <div style={{ fontSize: 14, fontWeight: 600, color: '#fff' }}>
                  {brandProfile.name}
                </div>

                {/* Center — Headline + Body */}
                <div className="flex flex-col items-center text-center gap-3">
                  <h2 style={{ fontSize: 28, fontWeight: 600, color: '#fff' }}>{headline}</h2>
                  <p
                    style={{
                      fontSize: 14,
                      fontWeight: 400,
                      color: 'rgba(255,255,255,0.8)',
                      maxWidth: '70%',
                    }}
                  >
                    {bodyCopy}
                  </p>
                </div>

                {/* Bottom — CTA + Logo */}
                <div className="flex items-end justify-between">
                  <div
                    className="rounded-lg px-4 py-2"
                    style={{ backgroundColor: '#fff', color: '#0f0f0f', fontSize: 14, fontWeight: 500 }}
                  >
                    {cta}
                  </div>
                  <div
                    className="rounded-full"
                    style={{
                      width: 32,
                      height: 32,
                      backgroundColor: 'rgba(255,255,255,0.25)',
                      border: '1px solid rgba(255,255,255,0.4)',
                    }}
                  />
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-3">
              <Image size={48} strokeWidth={1} style={{ color: 'rgba(15,15,15,0.2)' }} />
              <span style={{ fontSize: 14, fontWeight: 400, color: 'rgba(15,15,15,0.4)' }}>
                Enter a prompt and click Generate
              </span>
            </div>
          )}
        </div>

        {/* Zoom Controls (Precision Mode) */}
        {precisionMode && generated && (
          <div className="flex justify-center pb-4">
            <div
              className="flex items-center gap-2 bg-white rounded-lg border px-3 py-1.5"
              style={{ borderColor: 'rgba(15,15,15,0.06)' }}
            >
              <button
                className="transition-opacity duration-[120ms] hover:opacity-70"
                onClick={() => setZoom((z) => Math.max(25, z - 10))}
              >
                <Minus size={16} strokeWidth={1.5} style={{ color: '#0f0f0f' }} />
              </button>
              <span className="font-mono min-w-[48px] text-center" style={{ fontSize: 13, color: '#0f0f0f' }}>
                {zoom}%
              </span>
              <button
                className="transition-opacity duration-[120ms] hover:opacity-70"
                onClick={() => setZoom((z) => Math.min(200, z + 10))}
              >
                <Plus size={16} strokeWidth={1.5} style={{ color: '#0f0f0f' }} />
              </button>
            </div>
          </div>
        )}

        {/* Editable Copy Fields */}
        {generated && (
          <div
            className="border-t px-6 py-4"
            style={{
              borderColor: 'rgba(15,15,15,0.06)',
              backgroundColor: precisionMode ? '#1a1a1a' : '#e8e8e7',
            }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label
                  className="uppercase block mb-1.5"
                  style={{
                    fontSize: 11,
                    fontWeight: 500,
                    letterSpacing: 0.8,
                    color: precisionMode ? 'rgba(255,255,255,0.4)' : 'rgba(15,15,15,0.4)',
                  }}
                >
                  Headline
                </label>
                <input
                  type="text"
                  value={headline}
                  onChange={(e) => setHeadline(e.target.value)}
                  className="w-full bg-[#f3f3f2] border rounded-lg px-3 py-2 text-[14px] transition-colors duration-[120ms] focus:outline-none focus:ring-1 focus:ring-[#2d5bf6]"
                  style={{
                    borderColor: 'rgba(15,15,15,0.06)',
                    fontWeight: 400,
                    color: '#0f0f0f',
                  }}
                />
              </div>
              <div>
                <label
                  className="uppercase block mb-1.5"
                  style={{
                    fontSize: 11,
                    fontWeight: 500,
                    letterSpacing: 0.8,
                    color: precisionMode ? 'rgba(255,255,255,0.4)' : 'rgba(15,15,15,0.4)',
                  }}
                >
                  Body Copy
                </label>
                <input
                  type="text"
                  value={bodyCopy}
                  onChange={(e) => setBodyCopy(e.target.value)}
                  className="w-full bg-[#f3f3f2] border rounded-lg px-3 py-2 text-[14px] transition-colors duration-[120ms] focus:outline-none focus:ring-1 focus:ring-[#2d5bf6]"
                  style={{
                    borderColor: 'rgba(15,15,15,0.06)',
                    fontWeight: 400,
                    color: '#0f0f0f',
                  }}
                />
              </div>
              <div>
                <label
                  className="uppercase block mb-1.5"
                  style={{
                    fontSize: 11,
                    fontWeight: 500,
                    letterSpacing: 0.8,
                    color: precisionMode ? 'rgba(255,255,255,0.4)' : 'rgba(15,15,15,0.4)',
                  }}
                >
                  Hashtags
                </label>
                <input
                  type="text"
                  value={hashtags}
                  onChange={(e) => setHashtags(e.target.value)}
                  className="w-full bg-[#f3f3f2] border rounded-lg px-3 py-2 text-[14px] transition-colors duration-[120ms] focus:outline-none focus:ring-1 focus:ring-[#2d5bf6]"
                  style={{
                    borderColor: 'rgba(15,15,15,0.06)',
                    fontWeight: 400,
                    color: '#0f0f0f',
                  }}
                />
              </div>
              <div>
                <label
                  className="uppercase block mb-1.5"
                  style={{
                    fontSize: 11,
                    fontWeight: 500,
                    letterSpacing: 0.8,
                    color: precisionMode ? 'rgba(255,255,255,0.4)' : 'rgba(15,15,15,0.4)',
                  }}
                >
                  CTA
                </label>
                <input
                  type="text"
                  value={cta}
                  onChange={(e) => setCta(e.target.value)}
                  className="w-full bg-[#f3f3f2] border rounded-lg px-3 py-2 text-[14px] transition-colors duration-[120ms] focus:outline-none focus:ring-1 focus:ring-[#2d5bf6]"
                  style={{
                    borderColor: 'rgba(15,15,15,0.06)',
                    fontWeight: 400,
                    color: '#0f0f0f',
                  }}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
