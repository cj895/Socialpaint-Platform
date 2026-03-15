import { useState } from 'react'
import { motion } from 'motion/react'
import { Sparkles, Layers, Wand2, Download, RotateCcw, ZoomIn, ZoomOut, Move, Sliders } from 'lucide-react'
import SectionTag from '../components/SectionTag'
import { contentFormats, brandColors, brandProfile } from '../data/mockData'

export default function GenerationStudio() {
  const [selectedFormat, setSelectedFormat] = useState(contentFormats[0].id)
  const [creativity, setCreativity] = useState(65)
  const [brandAdherence, setBrandAdherence] = useState(80)
  const [prompt, setPrompt] = useState('')
  const [zoom, setZoom] = useState(100)
  const [activeColorOverride, setActiveColorOverride] = useState<string | null>(null)

  const currentFormat = contentFormats.find(f => f.id === selectedFormat) || contentFormats[0]

  const layers = [
    { id: 1, name: 'Background gradient', visible: true },
    { id: 2, name: 'Brand watermark', visible: true },
    { id: 3, name: 'Headline text', visible: true },
    { id: 4, name: 'Product image', visible: false },
    { id: 5, name: 'CTA button', visible: true },
  ]

  return (
    <div className="min-h-screen bg-[#1a171a] text-[#f7f6f5]">
      {/* Top Bar */}
      <div
        className="flex items-center justify-between px-6 py-4 border-b"
        style={{ borderColor: 'rgba(247,246,245,0.08)' }}
      >
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Sparkles size={20} style={{ color: '#ffe1d6' }} />
            <h1 style={{ fontWeight: 500 }} className="text-lg">Generation Studio</h1>
          </div>
          <span
            className="font-fragment uppercase text-[11px] tracking-[0.75px]"
            style={{ color: 'rgba(247,246,245,0.48)' }}
          >
            Full creative control
          </span>
        </div>
        <div className="flex items-center gap-3">
          <button
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm"
            style={{
              fontWeight: 400,
              backgroundColor: 'rgba(247,246,245,0.04)',
              border: '1px solid rgba(247,246,245,0.08)',
            }}
          >
            <RotateCcw size={14} />
            Reset
          </button>
          <button
            className="flex items-center gap-2 bg-[#f7f6f5] text-[#231f23] px-5 py-2 rounded-lg text-sm"
            style={{ fontWeight: 500 }}
          >
            <Download size={14} />
            Export
          </button>
        </div>
      </div>

      <div className="flex h-[calc(100vh-65px)]">
        {/* Left Panel — Tools */}
        <div
          className="w-[280px] flex-shrink-0 overflow-y-auto border-r p-5"
          style={{ borderColor: 'rgba(247,246,245,0.08)' }}
        >
          {/* Format Selector */}
          <div className="mb-6">
            <label
              className="font-fragment uppercase text-[11px] tracking-[0.75px] block mb-3"
              style={{ color: 'rgba(247,246,245,0.48)' }}
            >
              Format
            </label>
            <select
              value={selectedFormat}
              onChange={e => setSelectedFormat(e.target.value)}
              className="w-full rounded-lg px-4 py-3 text-sm text-[#f7f6f5]"
              style={{
                fontWeight: 300,
                backgroundColor: 'rgba(247,246,245,0.04)',
                border: '1px solid rgba(247,246,245,0.08)',
              }}
            >
              {contentFormats.map(f => (
                <option key={f.id} value={f.id} className="bg-[#1a171a]">
                  {f.label} ({f.width}x{f.height})
                </option>
              ))}
            </select>
          </div>

          {/* Style Controls */}
          <div className="mb-6">
            <label
              className="font-fragment uppercase text-[11px] tracking-[0.75px] block mb-3"
              style={{ color: 'rgba(247,246,245,0.48)' }}
            >
              Style Controls
            </label>
            <div
              className="rounded-[16px] p-4 space-y-5"
              style={{
                backgroundColor: 'rgba(247,246,245,0.04)',
                border: '1px solid rgba(247,246,245,0.08)',
              }}
            >
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm" style={{ fontWeight: 300, color: 'rgba(247,246,245,0.64)' }}>
                    Creativity
                  </span>
                  <span className="text-sm" style={{ fontWeight: 400, color: '#ffe1d6' }}>
                    {creativity}%
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={creativity}
                  onChange={e => setCreativity(Number(e.target.value))}
                  className="w-full accent-[#ffe1d6]"
                />
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm" style={{ fontWeight: 300, color: 'rgba(247,246,245,0.64)' }}>
                    Brand Adherence
                  </span>
                  <span className="text-sm" style={{ fontWeight: 400, color: '#ffe1d6' }}>
                    {brandAdherence}%
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={brandAdherence}
                  onChange={e => setBrandAdherence(Number(e.target.value))}
                  className="w-full accent-[#ffe1d6]"
                />
              </div>
            </div>
          </div>

          {/* Color Overrides */}
          <div>
            <label
              className="font-fragment uppercase text-[11px] tracking-[0.75px] block mb-3"
              style={{ color: 'rgba(247,246,245,0.48)' }}
            >
              Color Override
            </label>
            <div className="grid grid-cols-3 gap-2">
              {brandColors.map(color => (
                <button
                  key={color.id}
                  onClick={() =>
                    setActiveColorOverride(activeColorOverride === color.id ? null : color.id)
                  }
                  className="flex flex-col items-center gap-1.5 p-2 rounded-lg transition-colors"
                  style={{
                    backgroundColor:
                      activeColorOverride === color.id
                        ? 'rgba(247,246,245,0.08)'
                        : 'transparent',
                    border:
                      activeColorOverride === color.id
                        ? '1px solid rgba(247,246,245,0.16)'
                        : '1px solid transparent',
                  }}
                >
                  <div
                    className="w-8 h-8 rounded-md"
                    style={{ backgroundColor: color.hex }}
                  />
                  <span
                    className="font-fragment uppercase text-[9px] tracking-[0.75px] text-center leading-tight"
                    style={{ color: 'rgba(247,246,245,0.48)' }}
                  >
                    {color.name}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Center — Canvas */}
        <div className="flex-1 flex flex-col items-center justify-center relative overflow-hidden">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
            className="relative rounded-lg overflow-hidden shadow-2xl"
            style={{
              width: Math.min(currentFormat.width, 560) * (zoom / 100),
              height:
                Math.min(currentFormat.width, 560) *
                (currentFormat.height / currentFormat.width) *
                (zoom / 100),
              maxHeight: '70vh',
            }}
          >
            {/* Generated Preview */}
            <div
              className="w-full h-full flex flex-col items-center justify-center p-8"
              style={{
                background: `linear-gradient(135deg, ${brandColors[0].hex} 0%, ${brandColors[1].hex} 50%, ${brandColors[2].hex} 100%)`,
              }}
            >
              <div
                className="w-16 h-16 rounded-full mb-4 flex items-center justify-center"
                style={{ backgroundColor: 'rgba(255,255,255,0.15)' }}
              >
                <Sparkles size={28} style={{ color: brandColors[3].hex }} />
              </div>
              <h2
                className="text-2xl text-white mb-2 text-center"
                style={{ fontWeight: 500 }}
              >
                {brandProfile.name}
              </h2>
              <p
                className="text-sm text-center mb-6"
                style={{ fontWeight: 300, color: 'rgba(255,255,255,0.8)' }}
              >
                {brandProfile.tagline}
              </p>
              <div
                className="px-5 py-2.5 rounded-full text-sm"
                style={{
                  fontWeight: 400,
                  backgroundColor: brandColors[5].hex,
                  color: '#ffffff',
                }}
              >
                Learn More
              </div>
            </div>

            {/* Alignment Score Badge */}
            <div
              className="absolute top-3 right-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full"
              style={{ backgroundColor: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(8px)' }}
            >
              <div className="w-2 h-2 rounded-full bg-green-400" />
              <span className="text-xs text-white" style={{ fontWeight: 400 }}>
                92% aligned
              </span>
            </div>
          </motion.div>

          {/* Canvas Info */}
          <div className="mt-4 flex items-center gap-3">
            <span
              className="font-fragment uppercase text-[11px] tracking-[0.75px]"
              style={{ color: 'rgba(247,246,245,0.48)' }}
            >
              {currentFormat.label}
            </span>
            <span
              className="font-fragment text-[11px] tracking-[0.75px]"
              style={{ color: 'rgba(247,246,245,0.32)' }}
            >
              {currentFormat.width} x {currentFormat.height}
            </span>
          </div>
        </div>

        {/* Right Panel — Prompt & Layers */}
        <div
          className="w-[300px] flex-shrink-0 overflow-y-auto border-l p-5 flex flex-col"
          style={{ borderColor: 'rgba(247,246,245,0.08)' }}
        >
          {/* Prompt */}
          <div className="mb-6">
            <label
              className="font-fragment uppercase text-[11px] tracking-[0.75px] block mb-3"
              style={{ color: 'rgba(247,246,245,0.48)' }}
            >
              Prompt
            </label>
            <textarea
              value={prompt}
              onChange={e => setPrompt(e.target.value)}
              placeholder="Describe the content you want to generate..."
              rows={5}
              className="w-full rounded-lg px-4 py-3 text-sm text-[#f7f6f5] placeholder-[rgba(247,246,245,0.32)] resize-none"
              style={{
                fontWeight: 300,
                backgroundColor: 'rgba(247,246,245,0.04)',
                border: '1px solid rgba(247,246,245,0.08)',
              }}
            />
            <button
              className="w-full mt-3 flex items-center justify-center gap-2 bg-[#f7f6f5] text-[#231f23] px-5 py-3 rounded-lg text-sm"
              style={{ fontWeight: 500 }}
            >
              <Wand2 size={16} />
              Generate
            </button>
          </div>

          {/* Generation Controls */}
          <div className="mb-6">
            <label
              className="font-fragment uppercase text-[11px] tracking-[0.75px] block mb-3"
              style={{ color: 'rgba(247,246,245,0.48)' }}
            >
              Generation Controls
            </label>
            <div
              className="rounded-[16px] p-4 space-y-3"
              style={{
                backgroundColor: 'rgba(247,246,245,0.04)',
                border: '1px solid rgba(247,246,245,0.08)',
              }}
            >
              <div className="flex items-center justify-between">
                <span className="text-sm" style={{ fontWeight: 300, color: 'rgba(247,246,245,0.64)' }}>
                  Variations
                </span>
                <div className="flex items-center gap-1">
                  {[1, 2, 4].map(n => (
                    <button
                      key={n}
                      className="px-2.5 py-1 rounded text-xs"
                      style={{
                        fontWeight: 400,
                        backgroundColor: n === 1 ? 'rgba(247,246,245,0.12)' : 'transparent',
                        color: n === 1 ? '#ffe1d6' : 'rgba(247,246,245,0.48)',
                      }}
                    >
                      {n}
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm" style={{ fontWeight: 300, color: 'rgba(247,246,245,0.64)' }}>
                  Seed
                </span>
                <span className="text-sm" style={{ fontWeight: 400, color: 'rgba(247,246,245,0.64)' }}>
                  Random
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm" style={{ fontWeight: 300, color: 'rgba(247,246,245,0.64)' }}>
                  Quality
                </span>
                <span className="text-sm" style={{ fontWeight: 400, color: '#ffe1d6' }}>
                  High
                </span>
              </div>
            </div>
          </div>

          {/* Layers */}
          <div className="flex-1">
            <label
              className="font-fragment uppercase text-[11px] tracking-[0.75px] block mb-3"
              style={{ color: 'rgba(247,246,245,0.48)' }}
            >
              <Layers size={12} className="inline mr-1.5 -mt-0.5" />
              Layers
            </label>
            <div className="space-y-1">
              {layers.map((layer, i) => (
                <motion.div
                  key={layer.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="flex items-center justify-between px-3 py-2.5 rounded-lg"
                  style={{
                    backgroundColor: 'rgba(247,246,245,0.04)',
                    border: '1px solid rgba(247,246,245,0.06)',
                  }}
                >
                  <div className="flex items-center gap-2">
                    <div
                      className="w-3 h-3 rounded-sm"
                      style={{
                        backgroundColor: layer.visible ? '#ffe1d6' : 'rgba(247,246,245,0.16)',
                      }}
                    />
                    <span
                      className="text-sm"
                      style={{
                        fontWeight: 300,
                        color: layer.visible ? '#f7f6f5' : 'rgba(247,246,245,0.32)',
                      }}
                    >
                      {layer.name}
                    </span>
                  </div>
                  <Sliders size={12} style={{ color: 'rgba(247,246,245,0.32)' }} />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Toolbar */}
      <div
        className="fixed bottom-0 left-0 right-0 flex items-center justify-between px-6 py-3 bg-[#1a171a] border-t"
        style={{ borderColor: 'rgba(247,246,245,0.08)' }}
      >
        <div className="flex items-center gap-2">
          <button
            className="p-2 rounded-lg"
            style={{ backgroundColor: 'rgba(247,246,245,0.04)' }}
            onClick={() => setZoom(z => Math.max(25, z - 25))}
          >
            <ZoomOut size={16} style={{ color: 'rgba(247,246,245,0.64)' }} />
          </button>
          <span
            className="font-fragment text-[11px] tracking-[0.75px] w-12 text-center"
            style={{ color: 'rgba(247,246,245,0.48)' }}
          >
            {zoom}%
          </span>
          <button
            className="p-2 rounded-lg"
            style={{ backgroundColor: 'rgba(247,246,245,0.04)' }}
            onClick={() => setZoom(z => Math.min(200, z + 25))}
          >
            <ZoomIn size={16} style={{ color: 'rgba(247,246,245,0.64)' }} />
          </button>
          <button
            className="p-2 rounded-lg ml-1"
            style={{ backgroundColor: 'rgba(247,246,245,0.04)' }}
          >
            <Move size={16} style={{ color: 'rgba(247,246,245,0.64)' }} />
          </button>
        </div>

        <div className="flex items-center gap-3">
          <SectionTag label="Generation Studio" color="#ffe1d6" />
          <button
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm"
            style={{
              fontWeight: 400,
              backgroundColor: 'rgba(247,246,245,0.04)',
              border: '1px solid rgba(247,246,245,0.08)',
            }}
          >
            <Download size={14} />
            PNG
          </button>
          <button
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm"
            style={{
              fontWeight: 400,
              backgroundColor: 'rgba(247,246,245,0.04)',
              border: '1px solid rgba(247,246,245,0.08)',
            }}
          >
            <Download size={14} />
            SVG
          </button>
          <button
            className="flex items-center gap-2 bg-[#f7f6f5] text-[#231f23] px-5 py-2 rounded-lg text-sm"
            style={{ fontWeight: 500 }}
          >
            <Download size={14} />
            Export All
          </button>
        </div>
      </div>
    </div>
  )
}
