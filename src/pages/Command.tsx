import { Link } from 'react-router-dom'
import { analyticsData, flaggedItems } from '../data/mockData'

// ---------------------------------------------------------------------------
// Activity feed mock data
// ---------------------------------------------------------------------------
const activityFeed = [
  {
    id: 'a1',
    dot: '#4a7c59',
    text: (
      <>
        <strong>Sarah L.</strong> generated an Instagram Post
      </>
    ),
    timestamp: '12 min ago',
  },
  {
    id: 'a2',
    dot: '#e94560',
    text: (
      <>
        <strong>James K.</strong> LinkedIn Post was flagged
      </>
    ),
    timestamp: '34 min ago',
  },
  {
    id: 'a3',
    dot: '#d97706',
    text: (
      <>
        <strong>David Chen</strong> updated the color palette
      </>
    ),
    timestamp: '1 hr ago',
  },
  {
    id: 'a4',
    dot: '#4a7c59',
    text: (
      <>
        <strong>Priya M.</strong> generated a Facebook Post
      </>
    ),
    timestamp: '1.5 hr ago',
  },
  {
    id: 'a5',
    dot: '#e94560',
    text: (
      <>
        <strong>Alex T.</strong> product launch teaser was flagged
      </>
    ),
    timestamp: '2 hr ago',
  },
  {
    id: 'a6',
    dot: '#4a7c59',
    text: (
      <>
        <strong>Sarah L.</strong> generated an X Post
      </>
    ),
    timestamp: '3 hr ago',
  },
]

// ---------------------------------------------------------------------------
// Metrics data
// ---------------------------------------------------------------------------
const metrics = [
  {
    label: 'Brand Score',
    value: '87',
    suffix: '/100',
    change: '\u2191 4 pts this month',
    changeColor: '#4a7c59',
    dot: '#cebffa',
  },
  {
    label: 'Content Generated',
    value: String(analyticsData.totalGenerated.week),
    suffix: '',
    change: '\u2191 23% vs last week',
    changeColor: '#4a7c59',
    dot: '#ccfdcf',
  },
  {
    label: 'Avg Alignment',
    value: '91',
    suffix: '%',
    change: '\u2191 3% vs last month',
    changeColor: '#4a7c59',
    dot: '#d7e9ff',
  },
  {
    label: 'Active Users',
    value: '18',
    suffix: '',
    change: '\u2192 Same as last week',
    changeColor: 'rgba(35,31,35,0.48)',
    dot: '#f4e7c7',
  },
]

// ---------------------------------------------------------------------------
// Quick access cards
// ---------------------------------------------------------------------------
const quickAccessCards = [
  {
    title: 'Brand Intelligence',
    description: 'Manage your brand DNA and identity system',
    icon: '\uD83E\uDDEC',
    bg: '#cebffa',
    path: '/brand-system',
  },
  {
    title: 'Content Studio',
    description: 'Generate on-brand content instantly',
    icon: '\u2728',
    bg: '#ccfdcf',
    path: '/create',
  },
  {
    title: 'Analytics',
    description: 'Track performance and brand health',
    icon: '\uD83D\uDCC8',
    bg: '#f4e7c7',
    path: '/pulse',
  },
  {
    title: 'Brand Guard',
    description: 'Review flagged content and compliance',
    icon: '\uD83D\uDEE1\uFE0F',
    bg: '#d7e9ff',
    path: '/guard',
  },
]

// ---------------------------------------------------------------------------
// Compliance stats
// ---------------------------------------------------------------------------
const compliancePercent = analyticsData.passedPercent
const _flaggedItems = flaggedItems
const totalReviewed = _flaggedItems.length
const passedCount = Math.round((compliancePercent / 100) * totalReviewed)
const failedCount = totalReviewed - passedCount

// ---------------------------------------------------------------------------
// Card shared style
// ---------------------------------------------------------------------------
const cardStyle: React.CSSProperties = {
  backgroundColor: 'var(--color-surface)',
  border: '1px solid rgba(35,31,35,0.08)',
  borderRadius: 16,
}

const cardHoverClass = 'transition-all duration-200'

// ---------------------------------------------------------------------------
// Dashboard Page
// ---------------------------------------------------------------------------
export default function Command() {
  return (
    <div className="flex flex-col gap-10">
      {/* ================================================================
          Page Header
          ================================================================ */}
      <div>
        <h1
          style={{
            fontSize: 28,
            fontWeight: 500,
            color: 'var(--color-ink)',
            margin: 0,
            lineHeight: 1.2,
          }}
        >
          Dashboard
        </h1>
        <p
          className="mt-2"
          style={{
            fontSize: 15,
            fontWeight: 300,
            color: 'rgba(35,31,35,0.48)',
            margin: 0,
          }}
        >
          Welcome back, Alex. Here's your brand overview.
        </p>
      </div>

      {/* ================================================================
          Metrics Row
          ================================================================ */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {metrics.map((m) => (
          <div
            key={m.label}
            className={`${cardHoverClass} p-5`}
            style={cardStyle}
          >
            <div className="flex items-center gap-2 mb-3">
              <span
                className="inline-block w-2 h-2 rounded-full"
                style={{ backgroundColor: m.dot }}
              />
              <span className="caption">{m.label.toUpperCase()}</span>
            </div>
            <div className="flex items-baseline gap-1">
              <span
                style={{
                  fontSize: 32,
                  fontWeight: 500,
                  color: 'var(--color-ink)',
                  lineHeight: 1,
                }}
              >
                {m.value}
              </span>
              {m.suffix && (
                <span
                  style={{
                    fontSize: 16,
                    fontWeight: 400,
                    color: 'rgba(35,31,35,0.48)',
                  }}
                >
                  {m.suffix}
                </span>
              )}
            </div>
            <p
              className="mt-2"
              style={{
                fontSize: 13,
                fontWeight: 400,
                color: m.changeColor,
                margin: 0,
                marginTop: 8,
              }}
            >
              {m.change}
            </p>
          </div>
        ))}
      </div>

      {/* ================================================================
          Quick Access
          ================================================================ */}
      <div>
        <p className="caption mb-4">QUICK ACCESS</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {quickAccessCards.map((card) => (
            <Link
              key={card.title}
              to={card.path}
              className={`${cardHoverClass} p-5 flex flex-col no-underline group`}
              style={{
                ...cardStyle,
                textDecoration: 'none',
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement
                el.style.boxShadow = '0px 4px 40px rgba(0,0,0,0.06)'
                el.style.transform = 'translateY(-4px)'
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement
                el.style.boxShadow = 'none'
                el.style.transform = 'translateY(0)'
              }}
            >
              <div
                className="flex items-center justify-center mb-4"
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 12,
                  backgroundColor: card.bg,
                  fontSize: 20,
                }}
              >
                {card.icon}
              </div>
              <span
                style={{
                  fontSize: 16,
                  fontWeight: 500,
                  color: 'var(--color-ink)',
                }}
              >
                {card.title}
              </span>
              <span
                className="mt-1"
                style={{
                  fontSize: 13,
                  fontWeight: 300,
                  color: 'rgba(35,31,35,0.48)',
                }}
              >
                {card.description}
              </span>
              <span
                className="mt-auto pt-4"
                style={{
                  fontSize: 18,
                  color: 'rgba(35,31,35,0.48)',
                }}
              >
                &rarr;
              </span>
            </Link>
          ))}
        </div>
      </div>

      {/* ================================================================
          Two-Column Bottom Section
          ================================================================ */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* ----------------------------------------------------------
            Recent Activity
            ---------------------------------------------------------- */}
        <div className="p-6" style={cardStyle}>
          <div className="flex items-center justify-between mb-5">
            <span
              style={{
                fontSize: 16,
                fontWeight: 500,
                color: 'var(--color-ink)',
              }}
            >
              Recent Activity
            </span>
            <Link
              to="/pulse"
              style={{
                fontSize: 13,
                fontWeight: 400,
                color: 'rgba(35,31,35,0.48)',
                textDecoration: 'none',
              }}
            >
              View all
            </Link>
          </div>

          <div className="flex flex-col gap-0">
            {activityFeed.map((event) => (
              <div
                key={event.id}
                className="flex items-start gap-3 py-3"
                style={{
                  borderBottom: '1px solid rgba(35,31,35,0.06)',
                }}
              >
                <span
                  className="shrink-0 mt-2"
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: '50%',
                    backgroundColor: event.dot,
                    display: 'inline-block',
                  }}
                />
                <div className="flex-1 min-w-0">
                  <p
                    className="m-0"
                    style={{
                      fontSize: 14,
                      fontWeight: 400,
                      color: 'var(--color-ink)',
                      lineHeight: 1.5,
                    }}
                  >
                    {event.text}
                  </p>
                  <p
                    className="m-0 mt-0.5"
                    style={{
                      fontSize: 12,
                      fontWeight: 400,
                      color: 'rgba(35,31,35,0.48)',
                      fontFamily: "'Fragment Mono', monospace",
                    }}
                  >
                    {event.timestamp}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ----------------------------------------------------------
            Brand Compliance
            ---------------------------------------------------------- */}
        <div className="p-6" style={cardStyle}>
          <span
            style={{
              fontSize: 16,
              fontWeight: 500,
              color: 'var(--color-ink)',
            }}
          >
            Brand Compliance
          </span>

          {/* Compliance ring */}
          <div className="flex items-center justify-center my-8">
            <div
              style={{
                position: 'relative',
                width: 140,
                height: 140,
                borderRadius: '50%',
                background: `conic-gradient(#4a7c59 0% ${compliancePercent}%, rgba(35,31,35,0.08) ${compliancePercent}% 100%)`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <div
                style={{
                  width: 108,
                  height: 108,
                  borderRadius: '50%',
                  backgroundColor: 'var(--color-surface)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexDirection: 'column',
                }}
              >
                <span
                  style={{
                    fontSize: 28,
                    fontWeight: 500,
                    color: 'var(--color-ink)',
                    lineHeight: 1,
                  }}
                >
                  {compliancePercent}%
                </span>
                <span
                  style={{
                    fontSize: 11,
                    fontWeight: 400,
                    color: 'rgba(35,31,35,0.48)',
                    marginTop: 2,
                  }}
                >
                  compliant
                </span>
              </div>
            </div>
          </div>

          {/* Stats list */}
          <div className="flex flex-col gap-3">
            <div
              className="flex items-center justify-between py-2"
              style={{ borderBottom: '1px solid rgba(35,31,35,0.06)' }}
            >
              <span
                style={{
                  fontSize: 13,
                  fontWeight: 400,
                  color: 'rgba(35,31,35,0.64)',
                }}
              >
                Total Reviewed
              </span>
              <span
                style={{
                  fontSize: 13,
                  fontWeight: 500,
                  color: 'var(--color-ink)',
                }}
              >
                {totalReviewed}
              </span>
            </div>
            <div
              className="flex items-center justify-between py-2"
              style={{ borderBottom: '1px solid rgba(35,31,35,0.06)' }}
            >
              <span
                style={{
                  fontSize: 13,
                  fontWeight: 400,
                  color: 'rgba(35,31,35,0.64)',
                }}
              >
                Passed
              </span>
              <span
                style={{
                  fontSize: 13,
                  fontWeight: 500,
                  color: '#4a7c59',
                }}
              >
                {passedCount}
              </span>
            </div>
            <div
              className="flex items-center justify-between py-2"
              style={{ borderBottom: '1px solid rgba(35,31,35,0.06)' }}
            >
              <span
                style={{
                  fontSize: 13,
                  fontWeight: 400,
                  color: 'rgba(35,31,35,0.64)',
                }}
              >
                Flagged
              </span>
              <span
                style={{
                  fontSize: 13,
                  fontWeight: 500,
                  color: '#e94560',
                }}
              >
                {failedCount}
              </span>
            </div>
            <div className="flex items-center justify-between py-2">
              <span
                style={{
                  fontSize: 13,
                  fontWeight: 400,
                  color: 'rgba(35,31,35,0.64)',
                }}
              >
                Pass Rate
              </span>
              <span
                style={{
                  fontSize: 13,
                  fontWeight: 500,
                  color: 'var(--color-ink)',
                }}
              >
                {compliancePercent}%
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
