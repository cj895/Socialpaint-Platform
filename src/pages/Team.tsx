import { useState } from 'react'
import { motion } from 'motion/react'
import { Mail, Shield, Clock, Plus, Search, MoreHorizontal } from 'lucide-react'
import AnimatedCard from '../components/AnimatedCard'
import SectionTag from '../components/SectionTag'
import { teamMembers } from '../data/mockData'

const roleBadgeColors: Record<string, string> = {
  Admin: '#cebffa',
  Editor: '#ccfdcf',
  Creator: '#f4e7c7',
  Viewer: '#d7e9ff',
}

function getInitials(name: string) {
  return name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
}

export default function Team() {
  const [searchQuery, setSearchQuery] = useState('')
  const [showInviteModal, setShowInviteModal] = useState(false)
  const [inviteName, setInviteName] = useState('')
  const [inviteEmail, setInviteEmail] = useState('')
  const [inviteRole, setInviteRole] = useState('Creator')

  const filteredMembers = teamMembers.filter(
    member =>
      member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.team.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-[#f7f6f5]">
      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between mb-2">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <SectionTag label="Team" color="#cebffa" />
              </div>
              <h1 className="text-3xl text-[#231f23] mb-1" style={{ fontWeight: 500 }}>
                Team
              </h1>
              <p className="text-base" style={{ fontWeight: 300, color: 'rgba(35,31,35,0.64)' }}>
                Manage your team members and permissions
              </p>
            </div>
            <button
              onClick={() => setShowInviteModal(true)}
              className="flex items-center gap-2 bg-[#231f23] text-[#f7f6f5] px-5 py-3 rounded-lg text-sm"
              style={{ fontWeight: 400 }}
            >
              <Plus size={16} />
              Invite Member
            </button>
          </div>
        </motion.div>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-6"
        >
          <div className="relative">
            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2"
              style={{ color: 'rgba(35,31,35,0.32)' }}
            />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search by name, email, role, or team..."
              className="w-full bg-[rgba(35,31,35,0.04)] border border-[rgba(35,31,35,0.08)] rounded-lg px-4 py-3 pl-11 text-sm text-[#231f23] placeholder-[rgba(35,31,35,0.32)]"
              style={{ fontWeight: 300 }}
            />
          </div>
        </motion.div>

        {/* Team Count */}
        <div className="mb-4">
          <span
            className="font-fragment uppercase text-[11px] tracking-[0.75px]"
            style={{ color: 'rgba(35,31,35,0.48)' }}
          >
            {filteredMembers.length} member{filteredMembers.length !== 1 ? 's' : ''}
          </span>
        </div>

        {/* Team Members Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredMembers.map((member, index) => (
            <AnimatedCard key={member.id} elevated index={index}>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                  {/* Avatar */}
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{
                      backgroundColor: roleBadgeColors[member.role] || '#ececec',
                    }}
                  >
                    <span
                      className="text-sm text-[#231f23]"
                      style={{ fontWeight: 500 }}
                    >
                      {getInitials(member.name)}
                    </span>
                  </div>

                  <div>
                    <h3
                      className="text-[#231f23] text-base mb-0.5"
                      style={{ fontWeight: 500 }}
                    >
                      {member.name}
                    </h3>
                    <div className="flex items-center gap-1.5">
                      <Mail size={12} style={{ color: 'rgba(35,31,35,0.32)' }} />
                      <span
                        className="text-sm"
                        style={{ fontWeight: 300, color: 'rgba(35,31,35,0.64)' }}
                      >
                        {member.email}
                      </span>
                    </div>
                  </div>
                </div>

                <button className="p-1.5 rounded-md hover:bg-[rgba(35,31,35,0.04)]">
                  <MoreHorizontal size={16} style={{ color: 'rgba(35,31,35,0.32)' }} />
                </button>
              </div>

              <div className="mt-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {/* Role Badge */}
                  <span
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs text-[#231f23]"
                    style={{
                      fontWeight: 400,
                      backgroundColor: roleBadgeColors[member.role] || '#ececec',
                    }}
                  >
                    <Shield size={10} />
                    {member.role}
                  </span>

                  {/* Team Badge */}
                  <span
                    className="inline-flex items-center px-2.5 py-1 rounded-full text-xs border border-[rgba(35,31,35,0.08)]"
                    style={{ fontWeight: 300, color: 'rgba(35,31,35,0.64)' }}
                  >
                    {member.team}
                  </span>
                </div>

                <div className="flex items-center gap-1.5">
                  <Clock size={12} style={{ color: 'rgba(35,31,35,0.32)' }} />
                  <span
                    className="font-fragment uppercase text-[11px] tracking-[0.75px]"
                    style={{ color: 'rgba(35,31,35,0.48)' }}
                  >
                    {member.lastActive}
                  </span>
                </div>
              </div>
            </AnimatedCard>
          ))}
        </div>
      </div>

      {/* Invite Modal */}
      {showInviteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 bg-[rgba(35,31,35,0.4)]"
            onClick={() => setShowInviteModal(false)}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            className="relative bg-white rounded-[16px] p-6 sm:p-8 w-full max-w-md border border-[rgba(35,31,35,0.08)] shadow-xl"
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl text-[#231f23] mb-1" style={{ fontWeight: 500 }}>
                  Invite Member
                </h2>
                <p className="text-sm" style={{ fontWeight: 300, color: 'rgba(35,31,35,0.64)' }}>
                  Add a new member to your team
                </p>
              </div>
              <SectionTag label="Invite" color="#cebffa" />
            </div>

            <div className="space-y-4">
              <div>
                <label
                  className="font-fragment uppercase text-[11px] tracking-[0.75px] block mb-2"
                  style={{ color: 'rgba(35,31,35,0.48)' }}
                >
                  Full Name
                </label>
                <input
                  type="text"
                  value={inviteName}
                  onChange={e => setInviteName(e.target.value)}
                  placeholder="e.g. Jane Smith"
                  className="w-full bg-[rgba(35,31,35,0.04)] border border-[rgba(35,31,35,0.08)] rounded-lg px-4 py-3 text-sm text-[#231f23] placeholder-[rgba(35,31,35,0.32)]"
                  style={{ fontWeight: 300 }}
                />
              </div>

              <div>
                <label
                  className="font-fragment uppercase text-[11px] tracking-[0.75px] block mb-2"
                  style={{ color: 'rgba(35,31,35,0.48)' }}
                >
                  Email Address
                </label>
                <input
                  type="email"
                  value={inviteEmail}
                  onChange={e => setInviteEmail(e.target.value)}
                  placeholder="e.g. jane@meridianlabs.co"
                  className="w-full bg-[rgba(35,31,35,0.04)] border border-[rgba(35,31,35,0.08)] rounded-lg px-4 py-3 text-sm text-[#231f23] placeholder-[rgba(35,31,35,0.32)]"
                  style={{ fontWeight: 300 }}
                />
              </div>

              <div>
                <label
                  className="font-fragment uppercase text-[11px] tracking-[0.75px] block mb-2"
                  style={{ color: 'rgba(35,31,35,0.48)' }}
                >
                  Role
                </label>
                <select
                  value={inviteRole}
                  onChange={e => setInviteRole(e.target.value)}
                  className="w-full bg-[rgba(35,31,35,0.04)] border border-[rgba(35,31,35,0.08)] rounded-lg px-4 py-3 text-sm text-[#231f23]"
                  style={{ fontWeight: 300 }}
                >
                  {Object.keys(roleBadgeColors).map(role => (
                    <option key={role} value={role}>
                      {role}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="mt-6 flex items-center gap-3">
              <button
                onClick={() => setShowInviteModal(false)}
                className="flex-1 px-5 py-3 rounded-lg text-sm border border-[rgba(35,31,35,0.08)]"
                style={{ fontWeight: 400, color: 'rgba(35,31,35,0.64)' }}
              >
                Cancel
              </button>
              <button
                className="flex-1 flex items-center justify-center gap-2 bg-[#231f23] text-[#f7f6f5] px-5 py-3 rounded-lg text-sm"
                style={{ fontWeight: 400 }}
              >
                <Mail size={14} />
                Send Invite
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  )
}
