import { useState } from 'react'
import { motion } from 'motion/react'
import { Settings as SettingsIcon, Bell, Shield, Palette, Globe, Key, Save } from 'lucide-react'
import AnimatedCard from '../components/AnimatedCard'
import SectionTag from '../components/SectionTag'

export default function Settings() {
  const [companyName, setCompanyName] = useState('Meridian Labs')
  const [timezone, setTimezone] = useState('America/New_York')
  const [language, setLanguage] = useState('en')

  const [emailOnGeneration, setEmailOnGeneration] = useState(true)
  const [emailOnFlag, setEmailOnFlag] = useState(true)
  const [weeklyDigest, setWeeklyDigest] = useState(true)
  const [monthlyReport, setMonthlyReport] = useState(false)

  const [brandThreshold, setBrandThreshold] = useState(70)

  const [figmaConnected, setFigmaConnected] = useState(false)
  const [slackConnected] = useState(true)
  const [webhookUrl, setWebhookUrl] = useState('')

  const [showApiKey, setShowApiKey] = useState(false)
  const apiKey = 'sp_live_a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6'

  function Toggle({
    checked,
    onChange,
  }: {
    checked: boolean
    onChange: (val: boolean) => void
  }) {
    return (
      <button
        onClick={() => onChange(!checked)}
        className="relative w-11 h-6 rounded-full transition-colors"
        style={{
          backgroundColor: checked ? '#231f23' : 'rgba(35,31,35,0.12)',
        }}
      >
        <motion.div
          className="absolute top-1 w-4 h-4 rounded-full bg-white"
          animate={{ left: checked ? 24 : 4 }}
          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
        />
      </button>
    )
  }

  return (
    <div className="min-h-screen bg-[#f7f6f5]">
      <div className="max-w-3xl mx-auto px-6 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <div className="flex items-center gap-3 mb-2">
            <SectionTag label="Settings" color="#52796F" />
          </div>
          <h1 className="text-3xl text-[#231f23] mb-1" style={{ fontWeight: 500 }}>
            Settings
          </h1>
          <p className="text-base" style={{ fontWeight: 300, color: 'rgba(35,31,35,0.64)' }}>
            Account and platform settings
          </p>
        </motion.div>

        <div className="space-y-6">
          {/* General */}
          <AnimatedCard elevated index={0}>
            <div className="flex items-center gap-2 mb-5">
              <Globe size={18} style={{ color: 'rgba(35,31,35,0.48)' }} />
              <h2 className="text-lg text-[#231f23]" style={{ fontWeight: 500 }}>
                General
              </h2>
            </div>

            <div className="space-y-4">
              <div>
                <label
                  className="font-fragment uppercase text-[11px] tracking-[0.75px] block mb-2"
                  style={{ color: 'rgba(35,31,35,0.48)' }}
                >
                  Company Name
                </label>
                <input
                  type="text"
                  value={companyName}
                  onChange={e => setCompanyName(e.target.value)}
                  className="w-full bg-[rgba(35,31,35,0.04)] border border-[rgba(35,31,35,0.08)] rounded-lg px-4 py-3 text-sm text-[#231f23]"
                  style={{ fontWeight: 300 }}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label
                    className="font-fragment uppercase text-[11px] tracking-[0.75px] block mb-2"
                    style={{ color: 'rgba(35,31,35,0.48)' }}
                  >
                    Timezone
                  </label>
                  <select
                    value={timezone}
                    onChange={e => setTimezone(e.target.value)}
                    className="w-full bg-[rgba(35,31,35,0.04)] border border-[rgba(35,31,35,0.08)] rounded-lg px-4 py-3 text-sm text-[#231f23]"
                    style={{ fontWeight: 300 }}
                  >
                    <option value="America/New_York">Eastern (ET)</option>
                    <option value="America/Chicago">Central (CT)</option>
                    <option value="America/Denver">Mountain (MT)</option>
                    <option value="America/Los_Angeles">Pacific (PT)</option>
                    <option value="Europe/London">GMT</option>
                    <option value="Europe/Berlin">CET</option>
                    <option value="Asia/Tokyo">JST</option>
                  </select>
                </div>

                <div>
                  <label
                    className="font-fragment uppercase text-[11px] tracking-[0.75px] block mb-2"
                    style={{ color: 'rgba(35,31,35,0.48)' }}
                  >
                    Language
                  </label>
                  <select
                    value={language}
                    onChange={e => setLanguage(e.target.value)}
                    className="w-full bg-[rgba(35,31,35,0.04)] border border-[rgba(35,31,35,0.08)] rounded-lg px-4 py-3 text-sm text-[#231f23]"
                    style={{ fontWeight: 300 }}
                  >
                    <option value="en">English</option>
                    <option value="es">Spanish</option>
                    <option value="fr">French</option>
                    <option value="de">German</option>
                    <option value="ja">Japanese</option>
                  </select>
                </div>
              </div>
            </div>
          </AnimatedCard>

          {/* Notifications */}
          <AnimatedCard elevated index={1}>
            <div className="flex items-center gap-2 mb-5">
              <Bell size={18} style={{ color: 'rgba(35,31,35,0.48)' }} />
              <h2 className="text-lg text-[#231f23]" style={{ fontWeight: 500 }}>
                Notifications
              </h2>
            </div>

            <div className="space-y-4">
              {[
                { label: 'Email on generation complete', state: emailOnGeneration, setter: setEmailOnGeneration },
                { label: 'Email on content flagged', state: emailOnFlag, setter: setEmailOnFlag },
                { label: 'Weekly digest', state: weeklyDigest, setter: setWeeklyDigest },
                { label: 'Monthly report', state: monthlyReport, setter: setMonthlyReport },
              ].map(item => (
                <div
                  key={item.label}
                  className="flex items-center justify-between py-2 border-b border-[rgba(35,31,35,0.08)] last:border-0"
                >
                  <span className="text-sm text-[#231f23]" style={{ fontWeight: 300 }}>
                    {item.label}
                  </span>
                  <Toggle checked={item.state} onChange={item.setter} />
                </div>
              ))}
            </div>
          </AnimatedCard>

          {/* Brand Guard Threshold */}
          <AnimatedCard elevated index={2}>
            <div className="flex items-center gap-2 mb-5">
              <Shield size={18} style={{ color: 'rgba(35,31,35,0.48)' }} />
              <h2 className="text-lg text-[#231f23]" style={{ fontWeight: 500 }}>
                Brand Guard Threshold
              </h2>
            </div>

            <p className="text-sm mb-4" style={{ fontWeight: 300, color: 'rgba(35,31,35,0.64)' }}>
              Set the minimum brand alignment score before content is flagged for review.
            </p>

            <div className="flex items-center gap-4">
              <input
                type="range"
                min="0"
                max="100"
                value={brandThreshold}
                onChange={e => setBrandThreshold(Number(e.target.value))}
                className="flex-1 accent-[#231f23]"
              />
              <div
                className="flex items-center justify-center w-14 h-10 rounded-lg bg-[rgba(35,31,35,0.04)] border border-[rgba(35,31,35,0.08)]"
              >
                <span className="text-sm text-[#231f23]" style={{ fontWeight: 500 }}>
                  {brandThreshold}
                </span>
              </div>
            </div>

            <div className="mt-3 flex items-center justify-between">
              <span
                className="font-fragment uppercase text-[11px] tracking-[0.75px]"
                style={{ color: 'rgba(35,31,35,0.48)' }}
              >
                Lenient
              </span>
              <span
                className="font-fragment uppercase text-[11px] tracking-[0.75px]"
                style={{ color: 'rgba(35,31,35,0.48)' }}
              >
                Strict
              </span>
            </div>
          </AnimatedCard>

          {/* Integrations */}
          <AnimatedCard elevated index={3}>
            <div className="flex items-center gap-2 mb-5">
              <Palette size={18} style={{ color: 'rgba(35,31,35,0.48)' }} />
              <h2 className="text-lg text-[#231f23]" style={{ fontWeight: 500 }}>
                Integrations
              </h2>
            </div>

            <div className="space-y-4">
              {/* Figma Plugin */}
              <div
                className="flex items-center justify-between p-4 rounded-lg border border-[rgba(35,31,35,0.08)]"
              >
                <div>
                  <h3 className="text-sm text-[#231f23] mb-0.5" style={{ fontWeight: 400 }}>
                    Figma Plugin
                  </h3>
                  <span
                    className="font-fragment uppercase text-[11px] tracking-[0.75px]"
                    style={{ color: 'rgba(35,31,35,0.48)' }}
                  >
                    {figmaConnected ? 'Connected' : 'Not connected'}
                  </span>
                </div>
                <Toggle checked={figmaConnected} onChange={setFigmaConnected} />
              </div>

              {/* Slack */}
              <div
                className="flex items-center justify-between p-4 rounded-lg border border-[rgba(35,31,35,0.08)]"
              >
                <div>
                  <h3 className="text-sm text-[#231f23] mb-0.5" style={{ fontWeight: 400 }}>
                    Slack Notifications
                  </h3>
                  <span
                    className="font-fragment uppercase text-[11px] tracking-[0.75px]"
                    style={{ color: 'rgba(35,31,35,0.48)' }}
                  >
                    {slackConnected ? 'Connected' : 'Not connected'}
                  </span>
                </div>
                <div
                  className="px-3 py-1 rounded-full text-xs"
                  style={{
                    fontWeight: 400,
                    backgroundColor: '#ccfdcf',
                    color: '#231f23',
                  }}
                >
                  Active
                </div>
              </div>

              {/* Webhook */}
              <div>
                <label
                  className="font-fragment uppercase text-[11px] tracking-[0.75px] block mb-2"
                  style={{ color: 'rgba(35,31,35,0.48)' }}
                >
                  Webhook URL
                </label>
                <input
                  type="url"
                  value={webhookUrl}
                  onChange={e => setWebhookUrl(e.target.value)}
                  placeholder="https://your-app.com/webhook"
                  className="w-full bg-[rgba(35,31,35,0.04)] border border-[rgba(35,31,35,0.08)] rounded-lg px-4 py-3 text-sm text-[#231f23] placeholder-[rgba(35,31,35,0.32)]"
                  style={{ fontWeight: 300 }}
                />
              </div>
            </div>
          </AnimatedCard>

          {/* API Access */}
          <AnimatedCard elevated index={4}>
            <div className="flex items-center gap-2 mb-5">
              <Key size={18} style={{ color: 'rgba(35,31,35,0.48)' }} />
              <h2 className="text-lg text-[#231f23]" style={{ fontWeight: 500 }}>
                API Access
              </h2>
            </div>

            <div>
              <label
                className="font-fragment uppercase text-[11px] tracking-[0.75px] block mb-2"
                style={{ color: 'rgba(35,31,35,0.48)' }}
              >
                API Key
              </label>
              <div className="flex items-center gap-3">
                <div
                  className="flex-1 bg-[rgba(35,31,35,0.04)] border border-[rgba(35,31,35,0.08)] rounded-lg px-4 py-3 text-sm font-mono"
                  style={{ fontWeight: 300, color: '#231f23' }}
                >
                  {showApiKey ? apiKey : '\u2022'.repeat(36)}
                </div>
                <button
                  onClick={() => setShowApiKey(!showApiKey)}
                  className="px-4 py-3 rounded-lg text-sm border border-[rgba(35,31,35,0.08)]"
                  style={{ fontWeight: 400, color: 'rgba(35,31,35,0.64)' }}
                >
                  {showApiKey ? 'Hide' : 'Show'}
                </button>
                <button
                  className="bg-[#231f23] text-[#f7f6f5] px-4 py-3 rounded-lg text-sm"
                  style={{ fontWeight: 400 }}
                >
                  Regenerate
                </button>
              </div>
            </div>
          </AnimatedCard>

          {/* Danger Zone */}
          <AnimatedCard elevated index={5} className="!border-red-200">
            <div className="flex items-center gap-2 mb-5">
              <Shield size={18} className="text-red-500" />
              <h2 className="text-lg text-red-600" style={{ fontWeight: 500 }}>
                Danger Zone
              </h2>
            </div>

            <p className="text-sm mb-4" style={{ fontWeight: 300, color: 'rgba(35,31,35,0.64)' }}>
              These actions are destructive and cannot be undone. Proceed with caution.
            </p>

            <div className="flex flex-wrap gap-3">
              <button
                className="px-5 py-3 rounded-lg text-sm border border-red-200 text-red-600 hover:bg-red-50 transition-colors"
                style={{ fontWeight: 400 }}
              >
                Delete all generated content
              </button>
              <button
                className="px-5 py-3 rounded-lg text-sm border border-red-200 text-red-600 hover:bg-red-50 transition-colors"
                style={{ fontWeight: 400 }}
              >
                Reset brand intelligence
              </button>
            </div>
          </AnimatedCard>

          {/* Save Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="flex justify-end pt-2"
          >
            <button
              className="flex items-center gap-2 bg-[#231f23] text-[#f7f6f5] px-5 py-3 rounded-lg text-sm"
              style={{ fontWeight: 400 }}
            >
              <Save size={16} />
              Save Changes
            </button>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
