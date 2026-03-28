import React, { useState, useEffect } from 'react'
import '../style/interview.scss'
import { useInterview } from '../hooks/useInterview'
import { useNavigate, useParams } from 'react-router'
import { ArrowLeftIcon } from '@phosphor-icons/react'


// ── Helpers ────────────────────────────────────────────────────────────
const getSeverityColor = (s) =>
  s === 'low' ? '#4ade80' : s === 'medium' ? '#facc15' : s === 'high' ? '#f87171' : '#fff'

const getScoreColor = (s) =>
  s >= 75 ? '#4ade80' : s >= 50 ? '#facc15' : '#f87171'

const getScoreBadge = (s) =>
  s >= 75 ? 'Strong Match' : s >= 50 ? 'Good Match' : 'Weak Match'

// ── Accordion Item ─────────────────────────────────────────────────────
const AccordionItem = ({ badge, question, intention, answer }) => {
  const [open, setOpen] = useState(false)
  return (
    <div className={`ir-accordion${open ? ' ir-accordion--open' : ''}`}>
      <button className="ir-accordion-trigger" onClick={() => setOpen(!open)}>
        <div className="ir-accordion-trigger-left">
          <span className="ir-badge">{badge}</span>
          <span className="ir-accordion-question">{question}</span>
        </div>
        <span className="ir-accordion-chevron" aria-hidden="true" />
      </button>
      <div className="ir-accordion-morph">
        <div className="ir-accordion-body">
          <div className="ir-accordion-block">
            <span className="ir-card-label">Intention</span>
            <p className="ir-card-text">{intention}</p>
          </div>
          <div className="ir-card-divider" />
          <div className="ir-accordion-block">
            <span className="ir-card-label">How to Answer</span>
            <p className="ir-card-text">{answer}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

// ── Score Ring ─────────────────────────────────────────────────────────
const ScoreRing = ({ score }) => {
  const circumference = 2 * Math.PI * 54
  const strokeDasharray = `${(score / 100) * circumference} ${circumference}`
  return (
    <div className="ir-score-section">
      <span className="ir-sidebar-label">Match Score</span>
      <div className="ir-ring-wrap">
        <svg className="ir-ring-svg" viewBox="0 0 120 120">
          <circle cx="60" cy="60" r="54" className="ir-ring-track" />
          <circle
            cx="60" cy="60" r="54"
            className="ir-ring-fill"
            style={{ strokeDasharray, stroke: getScoreColor(score) }}
          />
        </svg>
        <span className="ir-ring-number">{score}</span>
      </div>
      <span className="ir-score-badge" style={{ color: getScoreColor(score) }}>
        {getScoreBadge(score)}
      </span>
    </div>
  )
}

// ── Skill Gaps ─────────────────────────────────────────────────────────
const SkillGaps = ({ skillGaps }) => (
  <div className="ir-gaps-section">
    <span className="ir-sidebar-label">Skill Gaps</span>
    <p className="ir-gaps-subtitle">Areas to strengthen</p>
    {skillGaps.map((gap, i) => (
      <div key={i} className="ir-gap-card">
        <span className="ir-gap-skill">{gap.skill}</span>
        <span
          className="ir-gap-badge"
          style={{ color: '#000', backgroundColor: getSeverityColor(gap.severity) }}
        >
          {gap.severity}
        </span>
      </div>
    ))}
  </div>
)

// ── Loading Skeleton ───────────────────────────────────────────────────
const LoadingSkeleton = () => (
  <div className="ir-layout ir-layout--loading">
    <aside className="ir-sidebar-left">
      <div className="ir-skeleton ir-skeleton--label" />
      <div className="ir-skeleton ir-skeleton--nav" />
      <div className="ir-skeleton ir-skeleton--nav" />
      <div className="ir-skeleton ir-skeleton--nav" />
    </aside>
    <main className="ir-content">
      <div className="ir-skeleton ir-skeleton--heading" />
      <div className="ir-skeleton ir-skeleton--card" />
      <div className="ir-skeleton ir-skeleton--card" />
      <div className="ir-skeleton ir-skeleton--card" />
    </main>
    <aside className="ir-sidebar-right">
      <div className="ir-skeleton ir-skeleton--ring" />
      <div className="ir-skeleton ir-skeleton--label" />
      <div className="ir-skeleton ir-skeleton--gap-card" />
      <div className="ir-skeleton ir-skeleton--gap-card" />
    </aside>
  </div>
)

// ── Main Component ─────────────────────────────────────────────────────
const Interview = () => {
  const [activeSection, setActiveSection] = useState('technical')
  const { report, getReportById, loading } = useInterview()
  const { interviewId } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    document.documentElement.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = ''
      document.documentElement.style.overflow = ''
    }
  }, [])

  const navItems = [
    { id: 'technical', label: 'Technical Questions' },
    { id: 'behavioral', label: 'Behavioral Questions' },
    { id: 'preparation', label: 'Preparation Plan' },
  ]

  if (loading || !report) return <LoadingSkeleton />

  return (
    <div className="ir-layout">

      {/* ── Left Sidebar (desktop) ── */}
      <aside className="ir-sidebar-left">
        <div className="ir-job-title-wrap">
          <span className="ir-sidebar-label">Applying For</span>
          <h2 className="ir-job-title">{report.title || 'Interview Report'}</h2>
        </div>

        <div className="ir-sidebar-divider" />

        <span className="ir-sidebar-label">Report Sections</span>
        <nav className="ir-nav">
          {navItems.map(item => (
            <button
              key={item.id}
              className={`ir-nav-item${activeSection === item.id ? ' ir-nav-item--active' : ''}`}
              onClick={() => setActiveSection(item.id)}
            >
              {item.label}
            </button>
          ))}
        </nav>
      </aside>

      {/* ── Middle Content ── */}
      <main className="ir-content" key={activeSection}>

        {/* Mobile: Job title + back button */}
        <div className="ir-mobile-job-title">
          <button
            className="ir-mobile-back-btn"
            onClick={() => navigate('/interview-reports')}
          >
            <ArrowLeftIcon weight='bold' /> Report
          </button>
          <div className="ir-mobile-title-text">
            <span className="ir-sidebar-label">Applying For</span>
            <h1 className="ir-job-title">{report.title || 'Interview Report'}</h1>
          </div>
        </div>

        {/* Mobile: Score + Gaps */}
        <div className="ir-mobile-score-block">
          <ScoreRing score={report.matchScore} />
          <div className="ir-mobile-divider" />
          <SkillGaps skillGaps={report.skillGaps} />
        </div>

        {/* Mobile: Horizontal tab nav */}
        <div className="ir-mobile-tabs">
          {navItems.map(item => (
            <button
              key={item.id}
              className={`ir-mobile-tab${activeSection === item.id ? ' ir-mobile-tab--active' : ''}`}
              onClick={() => setActiveSection(item.id)}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Technical Questions */}
        {activeSection === 'technical' && (
          <div className="ir-section-content">
            <div className="ir-section-header">
              <h2>Technical Questions</h2>
              <p>Click a question to reveal intention and answer guide</p>
            </div>
            {report.technicalQuestions.map((q, i) => (
              <AccordionItem
                key={i}
                badge={`Q${i + 1}`}
                question={q.question}
                intention={q.intention}
                answer={q.answer}
              />
            ))}
          </div>
        )}

        {/* Behavioral Questions */}
        {activeSection === 'behavioral' && (
          <div className="ir-section-content">
            <div className="ir-section-header">
              <h2>Behavioral Questions</h2>
              <p>Click a question to reveal intention and answer guide</p>
            </div>
            {report.behavioralQuestions.map((q, i) => (
              <AccordionItem
                key={i}
                badge={`B${i + 1}`}
                question={q.question}
                intention={q.intention}
                answer={q.answer}
              />
            ))}
          </div>
        )}

        {/* Preparation Plan */}
        {activeSection === 'preparation' && (
          <div className="ir-section-content">
            <div className="ir-section-header">
              <h2>Preparation Plan</h2>
              <p>{report.preperationPlan.length} days to interview day</p>
            </div>
            <div className="ir-timeline">
              {report.preperationPlan.map((item, i) => (
                <div key={i} className="ir-timeline-row">
                  <div className="ir-timeline-left">
                    <div className="ir-timeline-circle">{item.day}</div>
                    {i < report.preperationPlan.length - 1 && (
                      <div className="ir-timeline-line" />
                    )}
                  </div>
                  <div className="ir-timeline-body">
                    <p className="ir-timeline-focus">{item.focus}</p>
                    <ul className="ir-timeline-tasks">
                      {item.tasks.map((task, j) => (
                        <li key={j}>{task}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </main>

      {/* ── Right Sidebar (desktop) ── */}
      <aside className="ir-sidebar-right">
        <button
          className="ir-view-reports-btn"
          onClick={() => navigate('/interview-reports')}
        >
         <ArrowLeftIcon weight='bold' />  View All Reports
        </button>

        <div className="ir-sidebar-divider" />

        <ScoreRing score={report.matchScore} />

        <div className="ir-divider" />

        <SkillGaps skillGaps={report.skillGaps} />
      </aside>

    </div>
  )
}

export default Interview