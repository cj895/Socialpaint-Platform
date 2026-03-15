import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import {
  Paintbrush, Image, Download, Send, ChevronDown, ChevronUp,
  Instagram, Linkedin, Facebook, Twitter, Youtube, Pin,
  Sparkles, Check, RefreshCw, Copy, ArrowRight,
} from 'lucide-react'
import AnimatedCard from '../components/AnimatedCard'
import SectionTag from '../components/SectionTag'
import {
  contentFormats, brandColors, brandVoice, generationHistory, brandProfile,
} from '../data/mockData'

const platformIcons: Record<string, typeof Instagram> = {
  'instagram-post': Instagram,
  'instagram-story': Instagram,
  'facebook-post': Facebook,
  'linkedin-post': Linkedin,
  'x-post': Twitter,
  'pinterest-pin': Pin,
  'youtube-thumbnail': Youtube,
  'custom': Paintbrush,
}

export default function ContentStudio() {
  const [selectedFormat, setSelectedFormat] = useState('instagram-post')
  const [prompt, setPrompt] = useState('')
  const [generated, setGenerated] = useState(true)
  const [brandContextOpen, setBrandContextOpen] = useState(false)
  const [headline, setHeadline] = useState('Spring Collection Launch')
  const [bodyCopy, setBodyCopy] = useState(
    'Our newest formulations are here — clinically tested, research-backed, and designed for your body. Discover what science-forward wellness looks like this season.'
  )
  const [hashtags, setHashtags] = useState('#MeridianLabs #SpringLaunch #WellnessResearch #ScienceForward #DesignedForYou')
  const [cta, setCta] = useState('Shop the collection → meridianlabs.co/spring')

  const activeFormat = contentFormats.find((f) => f.id === selectedFormat) || contentFormats[0]

  const handleGenerate = () => {
    setGenerated(true)
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#f7f6f5' }}>
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">

        {/* ── 1. Page Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
          className="mb-10"
        >
          <div className="mb-4">
            <SectionTag label="CONTENT STUDIO" color="#ccfdcf" />
          </div>
          <h1
            className="text-[32px] sm:text-[40px] leading-[1.1] text-[#231f23] mb-2"
            style={{ fontWeight: 500 }}
          >
            Content Studio
          </h1>
          <p
            className="text-[16px] sm:text-[18px] leading-[1.5]"
            style={{ fontWeight: 300, color: 'rgba(35,31,35,0.64)' }}
          >
            Create anything, always on-brand
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-6">
          {/* ── Main Column ── */}
          <div className="space-y-6">

            {/* ── 2. Format Selector ── */}
            <AnimatedCard elevated index={0}>
              <p
                className="font-fragment uppercase text-[11px] tracking-[0.75px] mb-3"
                style={{ color: 'rgba(35,31,35,0.48)', fontWeight: 400 }}
              >
                FORMAT
              </p>
              <div className="flex gap-2 overflow-x-auto pb-1 -mx-1 px-1 scrollbar-hide">
                {contentFormats.map((fmt) => {
                  const isActive = fmt.id === selectedFormat
                  const Icon = platformIcons[fmt.id] || Image
                  return (
                    <button
                      key={fmt.id}
                      onClick={() => setSelectedFormat(fmt.id)}
                      className={`flex-shrink-0 flex items-center gap-2 px-4 py-2.5 rounded-lg border transition-all ${
                        isActive
                          ? 'bg-[#231f23] text-[#f7f6f5] border-[#231f23]'
                          : 'bg-[rgba(35,31,35,0.04)] text-[#231f23] border-[rgba(35,31,35,0.08)] hover:bg-[rgba(35,31,35,0.08)]'
                      }`}
                      style={{ fontWeight: 400 }}
                    >
                      <Icon size={15} />
                      <span className="text-[13px] whitespace-nowrap">{fmt.label}</span>
                    </button>
                  )
                })}
              </div>
              <p
                className="font-fragment text-[11px] tracking-[0.75px] mt-2"
                style={{ color: 'rgba(35,31,35,0.48)', fontWeight: 400 }}
              >
                {activeFormat.width} × {activeFormat.height}px
              </p>
            </AnimatedCard>

            {/* ── 3. Prompt Input ── */}
            <AnimatedCard elevated index={1}>
              <p
                className="font-fragment uppercase text-[11px] tracking-[0.75px] mb-3"
                style={{ color: 'rgba(35,31,35,0.48)', fontWeight: 400 }}
              >
                PROMPT
              </p>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Describe what you need — e.g. Q3 product launch announcement, Team hiring post for engineering..."
                rows={4}
                className="w-full bg-[rgba(35,31,35,0.04)] border border-[rgba(35,31,35,0.08)] rounded-lg px-4 py-3 text-[15px] text-[#231f23] placeholder:text-[rgba(35,31,35,0.36)] resize-none focus:outline-none focus:border-[rgba(35,31,35,0.24)] transition-colors"
                style={{ fontWeight: 300 }}
              />
              <div className="flex justify-end mt-3">
                <button
                  onClick={handleGenerate}
                  className="bg-[#231f23] text-[#f7f6f5] px-5 py-3 rounded-lg flex items-center gap-2 hover:opacity-90 transition-opacity"
                  style={{ fontWeight: 400 }}
                >
                  <Sparkles size={16} />
                  <span className="text-[14px]">Generate</span>
                </button>
              </div>
            </AnimatedCard>

            {/* ── 4. Brand Context Panel ── */}
            <AnimatedCard elevated index={2}>
              <button
                onClick={() => setBrandContextOpen(!brandContextOpen)}
                className="w-full flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: '#ccfdcf' }}
                  >
                    <Check size={16} className="text-[#231f23]" />
                  </div>
                  <div className="text-left">
                    <p className="text-[14px] text-[#231f23]" style={{ fontWeight: 500 }}>
                      Brand context applied
                    </p>
                    <p
                      className="font-fragment text-[11px] tracking-[0.75px] uppercase"
                      style={{ color: 'rgba(35,31,35,0.48)', fontWeight: 400 }}
                    >
                      {brandProfile.name} — {brandVoice.tone.length} voice attributes · {brandColors.length} colors
                    </p>
                  </div>
                </div>
                {brandContextOpen ? (
                  <ChevronUp size={18} style={{ color: 'rgba(35,31,35,0.48)' }} />
                ) : (
                  <ChevronDown size={18} style={{ color: 'rgba(35,31,35,0.48)' }} />
                )}
              </button>

              <AnimatePresence>
                {brandContextOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="pt-4 mt-4 border-t border-[rgba(35,31,35,0.08)] space-y-4">
                      {/* Brand Name */}
                      <div>
                        <p
                          className="font-fragment uppercase text-[11px] tracking-[0.75px] mb-2"
                          style={{ color: 'rgba(35,31,35,0.48)', fontWeight: 400 }}
                        >
                          BRAND
                        </p>
                        <p className="text-[14px] text-[#231f23]" style={{ fontWeight: 400 }}>
                          {brandProfile.name}
                        </p>
                      </div>

                      {/* Colors */}
                      <div>
                        <p
                          className="font-fragment uppercase text-[11px] tracking-[0.75px] mb-2"
                          style={{ color: 'rgba(35,31,35,0.48)', fontWeight: 400 }}
                        >
                          ACTIVE COLORS
                        </p>
                        <div className="flex gap-2 flex-wrap">
                          {brandColors.map((c) => (
                            <div key={c.id} className="flex items-center gap-1.5">
                              <div
                                className="w-5 h-5 rounded-[4px] border border-[rgba(35,31,35,0.08)]"
                                style={{ backgroundColor: c.hex }}
                              />
                              <span
                                className="font-fragment text-[11px] tracking-[0.75px]"
                                style={{ color: 'rgba(35,31,35,0.48)', fontWeight: 400 }}
                              >
                                {c.hex}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Voice Tone */}
                      <div>
                        <p
                          className="font-fragment uppercase text-[11px] tracking-[0.75px] mb-2"
                          style={{ color: 'rgba(35,31,35,0.48)', fontWeight: 400 }}
                        >
                          VOICE TONE
                        </p>
                        <div className="flex gap-2 flex-wrap">
                          {brandVoice.tone.map((t) => (
                            <span
                              key={t}
                              className="px-3 py-1 rounded-full text-[12px] border border-[rgba(35,31,35,0.08)]"
                              style={{
                                fontWeight: 400,
                                color: '#231f23',
                                backgroundColor: 'rgba(35,31,35,0.04)',
                              }}
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>

                      <a
                        href="#"
                        className="inline-flex items-center gap-1 text-[13px] text-[#231f23] hover:opacity-70 transition-opacity"
                        style={{ fontWeight: 400 }}
                      >
                        View full brand intelligence
                        <ArrowRight size={14} />
                      </a>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </AnimatedCard>

            {/* ── 5. Generated Preview ── */}
            <AnimatePresence>
              {generated && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
                >
                  <AnimatedCard elevated index={3}>
                    <div className="flex items-center justify-between mb-4">
                      <p
                        className="font-fragment uppercase text-[11px] tracking-[0.75px]"
                        style={{ color: 'rgba(35,31,35,0.48)', fontWeight: 400 }}
                      >
                        GENERATED PREVIEW
                      </p>
                      <div className="flex items-center gap-2">
                        <div
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full"
                          style={{ backgroundColor: '#ccfdcf' }}
                        >
                          <div className="w-2 h-2 rounded-full bg-[#22c55e]" />
                          <span
                            className="font-fragment text-[11px] tracking-[0.75px] uppercase text-[#231f23]"
                            style={{ fontWeight: 400 }}
                          >
                            Brand Score: 94
                          </span>
                        </div>
                        <button
                          className="bg-[rgba(35,31,35,0.08)] text-[#231f23] p-2 rounded-lg hover:bg-[rgba(35,31,35,0.12)] transition-colors"
                          title="Regenerate"
                        >
                          <RefreshCw size={15} />
                        </button>
                      </div>
                    </div>

                    {/* Preview Canvas */}
                    <div
                      className="relative rounded-xl overflow-hidden mx-auto"
                      style={{
                        maxWidth: 520,
                        aspectRatio: `${activeFormat.width} / ${activeFormat.height}`,
                        background: `linear-gradient(135deg, ${brandColors[0].hex} 0%, ${brandColors[1].hex} 60%, ${brandColors[2].hex} 100%)`,
                      }}
                    >
                      <div className="absolute inset-0 flex flex-col justify-between p-6 sm:p-8">
                        {/* Top section */}
                        <div>
                          <p
                            className="font-fragment text-[11px] tracking-[0.75px] uppercase mb-1"
                            style={{ color: 'rgba(255,255,255,0.64)', fontWeight: 400 }}
                          >
                            {brandProfile.name}
                          </p>
                        </div>

                        {/* Center content */}
                        <div className="flex-1 flex flex-col justify-center">
                          <h2
                            className="text-white text-[24px] sm:text-[32px] leading-[1.15] mb-3"
                            style={{ fontWeight: 500 }}
                          >
                            {headline}
                          </h2>
                          <p
                            className="text-[13px] sm:text-[14px] leading-[1.6] max-w-[380px]"
                            style={{ fontWeight: 300, color: 'rgba(255,255,255,0.82)' }}
                          >
                            {bodyCopy.length > 140 ? bodyCopy.slice(0, 140) + '...' : bodyCopy}
                          </p>
                        </div>

                        {/* Bottom section */}
                        <div className="flex items-end justify-between">
                          <span
                            className="px-3 py-1.5 rounded-md text-[12px]"
                            style={{
                              fontWeight: 400,
                              backgroundColor: brandColors[2].hex,
                              color: brandColors[4].hex,
                            }}
                          >
                            {cta.split('→')[0]?.trim() || 'Learn More'}
                          </span>
                          <span
                            className="font-fragment text-[10px] tracking-[0.75px] uppercase"
                            style={{ color: 'rgba(255,255,255,0.48)', fontWeight: 400 }}
                          >
                            {activeFormat.width} × {activeFormat.height}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* ── 6. Editable Copy Section ── */}
                    <div className="mt-6 space-y-4">
                      <p
                        className="font-fragment uppercase text-[11px] tracking-[0.75px]"
                        style={{ color: 'rgba(35,31,35,0.48)', fontWeight: 400 }}
                      >
                        EDITABLE COPY
                      </p>

                      <div>
                        <label
                          className="font-fragment uppercase text-[11px] tracking-[0.75px] block mb-1.5"
                          style={{ color: 'rgba(35,31,35,0.48)', fontWeight: 400 }}
                        >
                          HEADLINE
                        </label>
                        <input
                          type="text"
                          value={headline}
                          onChange={(e) => setHeadline(e.target.value)}
                          className="w-full bg-[rgba(35,31,35,0.04)] border border-[rgba(35,31,35,0.08)] rounded-lg px-4 py-3 text-[14px] text-[#231f23] focus:outline-none focus:border-[rgba(35,31,35,0.24)] transition-colors"
                          style={{ fontWeight: 400 }}
                        />
                      </div>

                      <div>
                        <label
                          className="font-fragment uppercase text-[11px] tracking-[0.75px] block mb-1.5"
                          style={{ color: 'rgba(35,31,35,0.48)', fontWeight: 400 }}
                        >
                          BODY COPY
                        </label>
                        <textarea
                          value={bodyCopy}
                          onChange={(e) => setBodyCopy(e.target.value)}
                          rows={3}
                          className="w-full bg-[rgba(35,31,35,0.04)] border border-[rgba(35,31,35,0.08)] rounded-lg px-4 py-3 text-[14px] text-[#231f23] resize-none focus:outline-none focus:border-[rgba(35,31,35,0.24)] transition-colors"
                          style={{ fontWeight: 300 }}
                        />
                      </div>

                      <div>
                        <label
                          className="font-fragment uppercase text-[11px] tracking-[0.75px] block mb-1.5"
                          style={{ color: 'rgba(35,31,35,0.48)', fontWeight: 400 }}
                        >
                          HASHTAGS
                        </label>
                        <input
                          type="text"
                          value={hashtags}
                          onChange={(e) => setHashtags(e.target.value)}
                          className="w-full bg-[rgba(35,31,35,0.04)] border border-[rgba(35,31,35,0.08)] rounded-lg px-4 py-3 text-[14px] text-[#231f23] focus:outline-none focus:border-[rgba(35,31,35,0.24)] transition-colors"
                          style={{ fontWeight: 400 }}
                        />
                      </div>

                      <div>
                        <label
                          className="font-fragment uppercase text-[11px] tracking-[0.75px] block mb-1.5"
                          style={{ color: 'rgba(35,31,35,0.48)', fontWeight: 400 }}
                        >
                          CTA
                        </label>
                        <input
                          type="text"
                          value={cta}
                          onChange={(e) => setCta(e.target.value)}
                          className="w-full bg-[rgba(35,31,35,0.04)] border border-[rgba(35,31,35,0.08)] rounded-lg px-4 py-3 text-[14px] text-[#231f23] focus:outline-none focus:border-[rgba(35,31,35,0.24)] transition-colors"
                          style={{ fontWeight: 400 }}
                        />
                      </div>
                    </div>

                    {/* ── 7. Export Bar ── */}
                    <div className="mt-6 pt-4 border-t border-[rgba(35,31,35,0.08)] flex flex-wrap items-center gap-2">
                      <p
                        className="font-fragment uppercase text-[11px] tracking-[0.75px] mr-2"
                        style={{ color: 'rgba(35,31,35,0.48)', fontWeight: 400 }}
                      >
                        EXPORT
                      </p>
                      {['PNG', 'JPG', 'SVG', 'PDF'].map((fmt) => (
                        <button
                          key={fmt}
                          className="bg-[rgba(35,31,35,0.08)] text-[#231f23] px-3 py-2 rounded-lg text-[12px] flex items-center gap-1.5 hover:bg-[rgba(35,31,35,0.12)] transition-colors"
                          style={{ fontWeight: 400 }}
                        >
                          <Download size={13} />
                          {fmt}
                        </button>
                      ))}
                      <button
                        className="bg-[#231f23] text-[#f7f6f5] px-4 py-2 rounded-lg text-[12px] flex items-center gap-1.5 ml-auto hover:opacity-90 transition-opacity"
                        style={{ fontWeight: 400 }}
                      >
                        <Send size={13} />
                        Send to Figma
                      </button>
                    </div>
                  </AnimatedCard>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* ── 8. Generation History (Sidebar) ── */}
          <div className="space-y-4">
            <AnimatedCard elevated index={4}>
              <p
                className="font-fragment uppercase text-[11px] tracking-[0.75px] mb-4"
                style={{ color: 'rgba(35,31,35,0.48)', fontWeight: 400 }}
              >
                GENERATION HISTORY
              </p>
              <div className="space-y-3">
                {generationHistory.map((item) => (
                  <div
                    key={item.id}
                    className="p-3 rounded-lg border border-[rgba(35,31,35,0.08)] hover:bg-[rgba(35,31,35,0.02)] transition-colors cursor-pointer"
                  >
                    <p
                      className="text-[13px] text-[#231f23] leading-[1.4] mb-2"
                      style={{ fontWeight: 400 }}
                    >
                      {item.prompt.length > 50 ? item.prompt.slice(0, 50) + '...' : item.prompt}
                    </p>
                    <div className="flex items-center justify-between">
                      <span
                        className="font-fragment text-[11px] tracking-[0.75px]"
                        style={{ color: 'rgba(35,31,35,0.48)', fontWeight: 400 }}
                      >
                        {item.format}
                      </span>
                      <div className="flex items-center gap-2">
                        <span
                          className="font-fragment text-[11px] tracking-[0.75px]"
                          style={{ color: 'rgba(35,31,35,0.48)', fontWeight: 400 }}
                        >
                          {item.date}
                        </span>
                        <span
                          className="flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px]"
                          style={{
                            fontWeight: 400,
                            backgroundColor: item.score >= 90 ? '#ccfdcf' : item.score >= 80 ? '#fef9c3' : '#fee2e2',
                            color: '#231f23',
                          }}
                        >
                          {item.score}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </AnimatedCard>

            {/* Quick Actions */}
            <AnimatedCard elevated index={5}>
              <p
                className="font-fragment uppercase text-[11px] tracking-[0.75px] mb-3"
                style={{ color: 'rgba(35,31,35,0.48)', fontWeight: 400 }}
              >
                QUICK ACTIONS
              </p>
              <div className="space-y-2">
                <button
                  className="w-full bg-[rgba(35,31,35,0.04)] border border-[rgba(35,31,35,0.08)] rounded-lg px-4 py-3 text-left text-[13px] text-[#231f23] flex items-center gap-2 hover:bg-[rgba(35,31,35,0.08)] transition-colors"
                  style={{ fontWeight: 400 }}
                >
                  <Copy size={14} style={{ color: 'rgba(35,31,35,0.48)' }} />
                  Duplicate last generation
                </button>
                <button
                  className="w-full bg-[rgba(35,31,35,0.04)] border border-[rgba(35,31,35,0.08)] rounded-lg px-4 py-3 text-left text-[13px] text-[#231f23] flex items-center gap-2 hover:bg-[rgba(35,31,35,0.08)] transition-colors"
                  style={{ fontWeight: 400 }}
                >
                  <RefreshCw size={14} style={{ color: 'rgba(35,31,35,0.48)' }} />
                  Regenerate with tweaks
                </button>
                <button
                  className="w-full bg-[rgba(35,31,35,0.04)] border border-[rgba(35,31,35,0.08)] rounded-lg px-4 py-3 text-left text-[13px] text-[#231f23] flex items-center gap-2 hover:bg-[rgba(35,31,35,0.08)] transition-colors"
                  style={{ fontWeight: 400 }}
                >
                  <Image size={14} style={{ color: 'rgba(35,31,35,0.48)' }} />
                  Upload reference image
                </button>
              </div>
            </AnimatedCard>
          </div>
        </div>
      </div>
    </div>
  )
}
