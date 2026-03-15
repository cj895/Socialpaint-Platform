import { useState } from 'react'
import { motion } from 'motion/react'
import {
  Fingerprint, Upload, Palette, Type, MessageSquare, Camera,
  Figma, Trophy, Check, X, Copy, Plus, Edit3, ExternalLink,
} from 'lucide-react'
import AnimatedCard from '../components/AnimatedCard'
import SectionTag from '../components/SectionTag'
import {
  brandProfile, logoVariants, brandColors, brandFonts, brandVoice,
  imageryStyle, figmaAnalyses, brandScore,
} from '../data/mockData'

const logoGradients = [
  'linear-gradient(135deg, #1B4332 0%, #52796F 100%)',
  'linear-gradient(135deg, #52796F 0%, #D4A373 100%)',
  'linear-gradient(135deg, #1B4332 0%, #2D3436 100%)',
  'linear-gradient(135deg, #D4A373 0%, #FEFAE0 100%)',
  'linear-gradient(135deg, #2D3436 0%, #52796F 100%)',
]

export default function BrandIntelligence() {
  const [editing, setEditing] = useState(false)
  const [profile, setProfile] = useState({ ...brandProfile })
  const [copiedHex, setCopiedHex] = useState<string | null>(null)

  const handleProfileChange = (field: keyof typeof profile, value: string) => {
    setProfile(prev => ({ ...prev, [field]: value }))
  }

  const handleCopyHex = (hex: string) => {
    navigator.clipboard.writeText(hex)
    setCopiedHex(hex)
    setTimeout(() => setCopiedHex(null), 1500)
  }

  const profileFields: { key: keyof typeof profile; label: string }[] = [
    { key: 'name', label: 'Brand Name' },
    { key: 'tagline', label: 'Tagline' },
    { key: 'mission', label: 'Mission' },
    { key: 'industry', label: 'Industry' },
    { key: 'targetAudience', label: 'Target Audience' },
  ]

  return (
    <div className="min-h-screen pb-24">
      {/* ─── Page Header ─── */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-12"
      >
        <SectionTag label="BRAND INTELLIGENCE" color="#cebffa" />
        <h1
          className="text-[40px] sm:text-[56px] leading-[1.1] tracking-[-0.02em] text-[#231f23] mt-4"
          style={{ fontWeight: 500 }}
        >
          Brand Intelligence Hub
        </h1>
        <p
          className="text-[18px] mt-3 max-w-xl"
          style={{ fontWeight: 300, color: 'rgba(35,31,35,0.64)' }}
        >
          Your brand, decoded by AI
        </p>
      </motion.div>

      {/* ─── Brand Profile ─── */}
      <section className="mb-16">
        <div className="flex items-center gap-3 mb-6">
          <Fingerprint size={20} style={{ color: 'rgba(35,31,35,0.48)' }} />
          <h2
            className="text-[24px] text-[#231f23]"
            style={{ fontWeight: 500 }}
          >
            Brand Profile
          </h2>
        </div>

        <AnimatedCard index={0}>
          <div className="flex items-center justify-between mb-6">
            <span
              className="font-fragment uppercase text-[11px] tracking-[0.75px]"
              style={{ color: 'rgba(35,31,35,0.48)' }}
            >
              CORE IDENTITY
            </span>
            <button
              onClick={() => setEditing(!editing)}
              className="flex items-center gap-2 px-4 py-2 rounded-lg transition-colors"
              style={{
                backgroundColor: editing ? '#231f23' : 'rgba(35,31,35,0.08)',
                color: editing ? '#f7f6f5' : '#231f23',
                fontWeight: 400,
              }}
            >
              <Edit3 size={14} />
              <span className="text-[13px]">{editing ? 'Save' : 'Edit'}</span>
            </button>
          </div>

          <div className="grid gap-5">
            {profileFields.map(({ key, label }) => (
              <div key={key}>
                <span
                  className="font-fragment uppercase text-[11px] tracking-[0.75px] block mb-1.5"
                  style={{ color: 'rgba(35,31,35,0.48)' }}
                >
                  {label}
                </span>
                {editing ? (
                  key === 'mission' || key === 'targetAudience' ? (
                    <textarea
                      value={profile[key]}
                      onChange={e => handleProfileChange(key, e.target.value)}
                      rows={2}
                      className="w-full bg-[rgba(35,31,35,0.04)] border border-[rgba(35,31,35,0.08)] rounded-lg px-4 py-3 text-[15px] text-[#231f23] resize-none outline-none focus:border-[#cebffa] transition-colors"
                      style={{ fontWeight: 300 }}
                    />
                  ) : (
                    <input
                      type="text"
                      value={profile[key]}
                      onChange={e => handleProfileChange(key, e.target.value)}
                      className="w-full bg-[rgba(35,31,35,0.04)] border border-[rgba(35,31,35,0.08)] rounded-lg px-4 py-3 text-[15px] text-[#231f23] outline-none focus:border-[#cebffa] transition-colors"
                      style={{ fontWeight: 300 }}
                    />
                  )
                ) : (
                  <p
                    className="text-[15px] text-[#231f23]"
                    style={{ fontWeight: key === 'name' ? 500 : 300 }}
                  >
                    {profile[key]}
                  </p>
                )}
              </div>
            ))}
          </div>
        </AnimatedCard>
      </section>

      {/* ─── Logo Library ─── */}
      <section className="mb-16">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Camera size={20} style={{ color: 'rgba(35,31,35,0.48)' }} />
            <h2
              className="text-[24px] text-[#231f23]"
              style={{ fontWeight: 500 }}
            >
              Logo Library
            </h2>
          </div>
          <button
            className="flex items-center gap-2 bg-[rgba(35,31,35,0.08)] text-[#231f23] px-5 py-3 rounded-lg text-[13px] transition-colors hover:bg-[rgba(35,31,35,0.12)]"
            style={{ fontWeight: 400 }}
          >
            <Upload size={14} />
            Upload Logo
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {logoVariants.map((variant, i) => (
            <AnimatedCard key={variant.id} index={i + 1} elevated>
              <div
                className="w-full aspect-[4/3] rounded-[10px] mb-4 flex items-center justify-center"
                style={{ background: logoGradients[i] }}
              >
                <span
                  className="text-white/60 text-[12px] font-fragment uppercase tracking-[0.75px]"
                >
                  {variant.label}
                </span>
              </div>
              <p
                className="text-[15px] text-[#231f23] mb-1"
                style={{ fontWeight: 500 }}
              >
                {variant.label}
              </p>
              <p
                className="text-[13px]"
                style={{ fontWeight: 300, color: 'rgba(35,31,35,0.64)' }}
              >
                {variant.context}
              </p>
            </AnimatedCard>
          ))}
        </div>
      </section>

      {/* ─── Color Palette ─── */}
      <section className="mb-16">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Palette size={20} style={{ color: 'rgba(35,31,35,0.48)' }} />
            <h2
              className="text-[24px] text-[#231f23]"
              style={{ fontWeight: 500 }}
            >
              Color Palette
            </h2>
          </div>
          <button
            className="flex items-center gap-2 bg-[rgba(35,31,35,0.08)] text-[#231f23] px-5 py-3 rounded-lg text-[13px] transition-colors hover:bg-[rgba(35,31,35,0.12)]"
            style={{ fontWeight: 400 }}
          >
            <Plus size={14} />
            Add Color
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {brandColors.map((color, i) => (
            <AnimatedCard key={color.id} index={i + 1} elevated>
              <div
                className="w-full aspect-square rounded-[10px] mb-4"
                style={{ backgroundColor: color.hex }}
              />
              <p
                className="text-[14px] text-[#231f23] mb-0.5"
                style={{ fontWeight: 500 }}
              >
                {color.name}
              </p>
              <p
                className="font-fragment text-[11px] uppercase tracking-[0.75px] mb-1"
                style={{ color: 'rgba(35,31,35,0.48)' }}
              >
                {color.hex}
              </p>
              <span
                className="font-fragment text-[11px] uppercase tracking-[0.75px]"
                style={{ color: 'rgba(35,31,35,0.48)' }}
              >
                {color.usage}
              </span>
              <button
                onClick={() => handleCopyHex(color.hex)}
                className="mt-3 flex items-center gap-1.5 text-[12px] transition-colors w-full justify-center py-1.5 rounded-md hover:bg-[rgba(35,31,35,0.04)]"
                style={{ fontWeight: 400, color: 'rgba(35,31,35,0.64)' }}
              >
                {copiedHex === color.hex ? (
                  <>
                    <Check size={12} />
                    Copied
                  </>
                ) : (
                  <>
                    <Copy size={12} />
                    Copy hex
                  </>
                )}
              </button>
            </AnimatedCard>
          ))}
        </div>
      </section>

      {/* ─── Typography ─── */}
      <section className="mb-16">
        <div className="flex items-center gap-3 mb-6">
          <Type size={20} style={{ color: 'rgba(35,31,35,0.48)' }} />
          <h2
            className="text-[24px] text-[#231f23]"
            style={{ fontWeight: 500 }}
          >
            Typography
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {brandFonts.map((font, i) => (
            <AnimatedCard key={font.id} index={i + 1} elevated>
              <span
                className="font-fragment uppercase text-[11px] tracking-[0.75px] inline-block px-2.5 py-1 rounded-md mb-4"
                style={{
                  color: 'rgba(35,31,35,0.48)',
                  backgroundColor: 'rgba(35,31,35,0.04)',
                }}
              >
                {font.role}
              </span>
              <p
                className="text-[28px] text-[#231f23] leading-tight mb-3"
                style={{ fontWeight: 500 }}
              >
                {font.name}
              </p>
              <div className="space-y-1.5">
                <div className="flex justify-between text-[13px]">
                  <span style={{ fontWeight: 300, color: 'rgba(35,31,35,0.48)' }}>
                    Weight
                  </span>
                  <span style={{ fontWeight: 400, color: '#231f23' }}>
                    {font.weight}
                  </span>
                </div>
                <div className="flex justify-between text-[13px]">
                  <span style={{ fontWeight: 300, color: 'rgba(35,31,35,0.48)' }}>
                    Size
                  </span>
                  <span style={{ fontWeight: 400, color: '#231f23' }}>
                    {font.sizeGuideline}
                  </span>
                </div>
              </div>
            </AnimatedCard>
          ))}
        </div>
      </section>

      {/* ─── Brand Voice ─── */}
      <section className="mb-16">
        <div className="flex items-center gap-3 mb-6">
          <MessageSquare size={20} style={{ color: 'rgba(35,31,35,0.48)' }} />
          <h2
            className="text-[24px] text-[#231f23]"
            style={{ fontWeight: 500 }}
          >
            Brand Voice
          </h2>
        </div>

        <AnimatedCard index={0}>
          {/* Tone Attributes */}
          <div className="mb-6">
            <span
              className="font-fragment uppercase text-[11px] tracking-[0.75px] block mb-3"
              style={{ color: 'rgba(35,31,35,0.48)' }}
            >
              TONE ATTRIBUTES
            </span>
            <div className="flex flex-wrap gap-2">
              {brandVoice.tone.map(t => (
                <span
                  key={t}
                  className="inline-flex items-center px-3.5 py-1.5 rounded-full text-[13px] border border-[rgba(206,191,250,0.4)]"
                  style={{
                    fontWeight: 400,
                    color: '#231f23',
                    backgroundColor: 'rgba(206,191,250,0.15)',
                  }}
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Writing Style */}
          <div className="mb-6">
            <span
              className="font-fragment uppercase text-[11px] tracking-[0.75px] block mb-2"
              style={{ color: 'rgba(35,31,35,0.48)' }}
            >
              WRITING STYLE
            </span>
            <p
              className="text-[15px] text-[#231f23] max-w-2xl"
              style={{ fontWeight: 300 }}
            >
              {brandVoice.style}
            </p>
          </div>

          {/* Preferred Vocabulary */}
          <div className="mb-6">
            <span
              className="font-fragment uppercase text-[11px] tracking-[0.75px] block mb-3"
              style={{ color: 'rgba(35,31,35,0.48)' }}
            >
              PREFERRED VOCABULARY
            </span>
            <div className="flex flex-wrap gap-2">
              {brandVoice.preferred.map(word => (
                <span
                  key={word}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[13px]"
                  style={{
                    fontWeight: 400,
                    color: '#1B4332',
                    backgroundColor: 'rgba(27,67,50,0.08)',
                    border: '1px solid rgba(27,67,50,0.15)',
                  }}
                >
                  <Check size={12} />
                  {word}
                </span>
              ))}
            </div>
          </div>

          {/* Words to Avoid */}
          <div className="mb-8">
            <span
              className="font-fragment uppercase text-[11px] tracking-[0.75px] block mb-3"
              style={{ color: 'rgba(35,31,35,0.48)' }}
            >
              WORDS TO AVOID
            </span>
            <div className="flex flex-wrap gap-2">
              {brandVoice.avoid.map(word => (
                <span
                  key={word}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[13px]"
                  style={{
                    fontWeight: 400,
                    color: '#9B2C2C',
                    backgroundColor: 'rgba(155,44,44,0.06)',
                    border: '1px solid rgba(155,44,44,0.15)',
                  }}
                >
                  <X size={12} />
                  {word}
                </span>
              ))}
            </div>
          </div>

          {/* Examples */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div
              className="rounded-[12px] p-5"
              style={{
                backgroundColor: 'rgba(27,67,50,0.05)',
                border: '1px solid rgba(27,67,50,0.12)',
              }}
            >
              <div className="flex items-center gap-2 mb-3">
                <Check size={16} style={{ color: '#1B4332' }} />
                <span
                  className="font-fragment uppercase text-[11px] tracking-[0.75px]"
                  style={{ color: '#1B4332' }}
                >
                  GOOD EXAMPLE
                </span>
              </div>
              <p
                className="text-[14px] text-[#231f23] leading-relaxed"
                style={{ fontWeight: 300 }}
              >
                {brandVoice.goodExample}
              </p>
            </div>
            <div
              className="rounded-[12px] p-5"
              style={{
                backgroundColor: 'rgba(155,44,44,0.04)',
                border: '1px solid rgba(155,44,44,0.12)',
              }}
            >
              <div className="flex items-center gap-2 mb-3">
                <X size={16} style={{ color: '#9B2C2C' }} />
                <span
                  className="font-fragment uppercase text-[11px] tracking-[0.75px]"
                  style={{ color: '#9B2C2C' }}
                >
                  BAD EXAMPLE
                </span>
              </div>
              <p
                className="text-[14px] text-[#231f23] leading-relaxed"
                style={{ fontWeight: 300 }}
              >
                {brandVoice.badExample}
              </p>
            </div>
          </div>
        </AnimatedCard>
      </section>

      {/* ─── Imagery Style ─── */}
      <section className="mb-16">
        <div className="flex items-center gap-3 mb-6">
          <Camera size={20} style={{ color: 'rgba(35,31,35,0.48)' }} />
          <h2
            className="text-[24px] text-[#231f23]"
            style={{ fontWeight: 500 }}
          >
            Imagery Style
          </h2>
        </div>

        <AnimatedCard index={0}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Photography */}
            <div>
              <span
                className="font-fragment uppercase text-[11px] tracking-[0.75px] block mb-3"
                style={{ color: 'rgba(35,31,35,0.48)' }}
              >
                PHOTOGRAPHY DIRECTION
              </span>
              <ul className="space-y-2.5">
                {imageryStyle.photography.map((item, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-[14px]">
                    <span
                      className="w-[6px] h-[6px] rounded-full mt-[7px] shrink-0"
                      style={{ backgroundColor: '#cebffa' }}
                    />
                    <span style={{ fontWeight: 300, color: '#231f23' }}>
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Illustration */}
            <div>
              <span
                className="font-fragment uppercase text-[11px] tracking-[0.75px] block mb-3"
                style={{ color: 'rgba(35,31,35,0.48)' }}
              >
                ILLUSTRATION STYLE
              </span>
              <p
                className="text-[14px] text-[#231f23] leading-relaxed"
                style={{ fontWeight: 300 }}
              >
                {imageryStyle.illustration}
              </p>
            </div>

            {/* Color Treatment */}
            <div>
              <span
                className="font-fragment uppercase text-[11px] tracking-[0.75px] block mb-3"
                style={{ color: 'rgba(35,31,35,0.48)' }}
              >
                COLOR TREATMENT
              </span>
              <p
                className="text-[14px] text-[#231f23] leading-relaxed"
                style={{ fontWeight: 300 }}
              >
                {imageryStyle.colorTreatment}
              </p>
            </div>
          </div>
        </AnimatedCard>
      </section>

      {/* ─── Figma Plugin Analysis Feed ─── */}
      <section className="mb-16">
        <div className="flex items-center gap-3 mb-6">
          <Figma size={20} style={{ color: 'rgba(35,31,35,0.48)' }} />
          <h2
            className="text-[24px] text-[#231f23]"
            style={{ fontWeight: 500 }}
          >
            Figma Plugin Analysis Feed
          </h2>
        </div>

        {/* Connect Banner */}
        <AnimatedCard index={0} elevated className="mb-4">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-4">
              <div
                className="w-10 h-10 rounded-[10px] flex items-center justify-center"
                style={{ backgroundColor: 'rgba(206,191,250,0.2)' }}
              >
                <Figma size={20} style={{ color: '#7c5cbf' }} />
              </div>
              <div>
                <p
                  className="text-[15px] text-[#231f23] mb-0.5"
                  style={{ fontWeight: 500 }}
                >
                  Connect Figma Plugin
                </p>
                <p
                  className="text-[13px]"
                  style={{ fontWeight: 300, color: 'rgba(35,31,35,0.64)' }}
                >
                  Auto-analyze designs and sync brand patterns in real time
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span
                className="font-fragment uppercase text-[11px] tracking-[0.75px] flex items-center gap-1.5"
                style={{ color: 'rgba(35,31,35,0.48)' }}
              >
                <span
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: '#D4A373' }}
                />
                NOT CONNECTED
              </span>
              <button
                className="flex items-center gap-2 bg-[#231f23] text-[#f7f6f5] px-5 py-3 rounded-lg text-[13px] transition-opacity hover:opacity-90"
                style={{ fontWeight: 400 }}
              >
                <ExternalLink size={14} />
                Connect
              </button>
            </div>
          </div>
        </AnimatedCard>

        {/* Analysis Items */}
        <div className="space-y-3">
          {figmaAnalyses.map((analysis, i) => (
            <AnimatedCard key={analysis.id} index={i + 1} elevated>
              <div className="flex gap-5 flex-col sm:flex-row">
                {/* Thumbnail Placeholder */}
                <div
                  className="w-full sm:w-[140px] h-[90px] rounded-[10px] shrink-0 flex items-center justify-center"
                  style={{
                    background: `linear-gradient(135deg, ${analysis.colors[0]}22 0%, ${analysis.colors[1] || analysis.colors[0]}22 100%)`,
                    border: '1px solid rgba(35,31,35,0.06)',
                  }}
                >
                  <Figma size={24} style={{ color: 'rgba(35,31,35,0.15)' }} />
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-3">
                    <span
                      className="font-fragment uppercase text-[11px] tracking-[0.75px]"
                      style={{ color: 'rgba(35,31,35,0.48)' }}
                    >
                      ANALYZED {analysis.date}
                    </span>
                    <div className="flex items-center gap-2">
                      <span
                        className="font-fragment text-[12px] tracking-[0.75px]"
                        style={{ color: 'rgba(35,31,35,0.48)' }}
                      >
                        {analysis.confidence}%
                      </span>
                      <div
                        className="w-[60px] h-[6px] rounded-full overflow-hidden"
                        style={{ backgroundColor: 'rgba(35,31,35,0.06)' }}
                      >
                        <motion.div
                          className="h-full rounded-full"
                          style={{ backgroundColor: '#cebffa' }}
                          initial={{ width: 0 }}
                          animate={{ width: `${analysis.confidence}%` }}
                          transition={{ duration: 0.8, delay: i * 0.1 }}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    {/* Colors */}
                    <div>
                      <span
                        className="font-fragment uppercase text-[11px] tracking-[0.75px] block mb-2"
                        style={{ color: 'rgba(35,31,35,0.48)' }}
                      >
                        COLORS
                      </span>
                      <div className="flex gap-1.5">
                        {analysis.colors.map((c, ci) => (
                          <div
                            key={ci}
                            className="w-6 h-6 rounded-[4px]"
                            style={{ backgroundColor: c }}
                            title={c}
                          />
                        ))}
                      </div>
                    </div>

                    {/* Typography */}
                    <div>
                      <span
                        className="font-fragment uppercase text-[11px] tracking-[0.75px] block mb-2"
                        style={{ color: 'rgba(35,31,35,0.48)' }}
                      >
                        TYPOGRAPHY
                      </span>
                      <p
                        className="text-[13px] text-[#231f23]"
                        style={{ fontWeight: 300 }}
                      >
                        {analysis.typography.join(', ')}
                      </p>
                    </div>

                    {/* Layout */}
                    <div>
                      <span
                        className="font-fragment uppercase text-[11px] tracking-[0.75px] block mb-2"
                        style={{ color: 'rgba(35,31,35,0.48)' }}
                      >
                        LAYOUT
                      </span>
                      <p
                        className="text-[13px] text-[#231f23]"
                        style={{ fontWeight: 300 }}
                      >
                        {analysis.layout}
                      </p>
                    </div>

                    {/* Mood */}
                    <div>
                      <span
                        className="font-fragment uppercase text-[11px] tracking-[0.75px] block mb-2"
                        style={{ color: 'rgba(35,31,35,0.48)' }}
                      >
                        MOOD
                      </span>
                      <p
                        className="text-[13px] text-[#231f23]"
                        style={{ fontWeight: 300 }}
                      >
                        {analysis.mood}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedCard>
          ))}
        </div>
      </section>

      {/* ─── Brand Score ─── */}
      <section className="mb-16">
        <div className="flex items-center gap-3 mb-6">
          <Trophy size={20} style={{ color: 'rgba(35,31,35,0.48)' }} />
          <h2
            className="text-[24px] text-[#231f23]"
            style={{ fontWeight: 500 }}
          >
            Brand Score
          </h2>
        </div>

        <AnimatedCard index={0}>
          <div className="flex flex-col md:flex-row gap-10 items-center md:items-start">
            {/* Score Circle */}
            <div className="shrink-0 flex flex-col items-center">
              <div className="relative w-[140px] h-[140px]">
                <svg
                  viewBox="0 0 140 140"
                  className="w-full h-full -rotate-90"
                >
                  <circle
                    cx="70"
                    cy="70"
                    r="60"
                    fill="none"
                    stroke="rgba(35,31,35,0.06)"
                    strokeWidth="10"
                  />
                  <motion.circle
                    cx="70"
                    cy="70"
                    r="60"
                    fill="none"
                    stroke="#cebffa"
                    strokeWidth="10"
                    strokeLinecap="round"
                    strokeDasharray={2 * Math.PI * 60}
                    initial={{ strokeDashoffset: 2 * Math.PI * 60 }}
                    animate={{
                      strokeDashoffset:
                        2 * Math.PI * 60 * (1 - brandScore.overall / 100),
                    }}
                    transition={{ duration: 1.2, ease: 'easeOut' }}
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span
                    className="text-[40px] text-[#231f23] leading-none"
                    style={{ fontWeight: 500 }}
                  >
                    {brandScore.overall}
                  </span>
                  <span
                    className="font-fragment uppercase text-[11px] tracking-[0.75px] mt-1"
                    style={{ color: 'rgba(35,31,35,0.48)' }}
                  >
                    / 100
                  </span>
                </div>
              </div>
              <span
                className="font-fragment uppercase text-[11px] tracking-[0.75px] mt-3"
                style={{ color: 'rgba(35,31,35,0.48)' }}
              >
                OVERALL SCORE
              </span>
            </div>

            {/* Checklist */}
            <div className="flex-1 w-full">
              <span
                className="font-fragment uppercase text-[11px] tracking-[0.75px] block mb-4"
                style={{ color: 'rgba(35,31,35,0.48)' }}
              >
                BRAND COMPLETENESS
              </span>
              <div className="space-y-3">
                {brandScore.items.map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 text-[14px]"
                  >
                    <div
                      className="w-5 h-5 rounded-full flex items-center justify-center shrink-0"
                      style={{
                        backgroundColor: item.done
                          ? 'rgba(27,67,50,0.1)'
                          : 'rgba(155,44,44,0.08)',
                      }}
                    >
                      {item.done ? (
                        <Check size={12} style={{ color: '#1B4332' }} />
                      ) : (
                        <X size={12} style={{ color: '#9B2C2C' }} />
                      )}
                    </div>
                    <span
                      style={{
                        fontWeight: 300,
                        color: item.done ? '#231f23' : 'rgba(35,31,35,0.48)',
                      }}
                    >
                      {item.label}
                    </span>
                    {item.count !== undefined && (
                      <span
                        className="font-fragment text-[11px] tracking-[0.75px] ml-auto"
                        style={{ color: 'rgba(35,31,35,0.48)' }}
                      >
                        {item.count}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </AnimatedCard>
      </section>
    </div>
  )
}
