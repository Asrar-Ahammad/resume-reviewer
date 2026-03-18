import React, { useState, useEffect } from 'react'
import '../style/interview.scss'
import { DotsThreeOutlineIcon, XIcon } from '@phosphor-icons/react'
import { useInterview } from '../hooks/useInterview'
import { useNavigate, useParams } from 'react-router'



const getSeverityColor = (s) => s === 'low' ? '#4ade80' : s === 'medium' ? '#facc15' : s === 'high' ? '#f87171' : '#fff'
const getScoreColor = (s) => s >= 75 ? '#4ade80' : s >= 50 ? '#facc15' : '#f87171'
const getScoreBadge = (s) => s >= 75 ? 'Strong Match' : s >= 50 ? 'Good Match' : 'Weak Match'

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
      {/* Always rendered — CSS grid animates open/close */}
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

const Interview = () => {
  const [activeSection, setActiveSection] = useState('technical')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const { report, getReportById, loading } = useInterview()
  const { interviewId } = useParams()

  const navigate = useNavigate()

  useEffect(() => {
    if (interviewId) {
      getReportById(interviewId)
    } else {
      getReports()
    }
  }, [interviewId])


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

  const activeSectionLabel = navItems.find(i => i.id === activeSection)?.label

  const handleMobileNavClick = (id) => {
    setActiveSection(id)
    setMobileMenuOpen(false)
  }

  if (loading || !report) {
    return (
      <main className='loading-screen'><p>Generating Report...</p></main>
    )
  }

  const circumference = 2 * Math.PI * 54
  const strokeDasharray = `${(report.matchScore / 100) * circumference} ${circumference}`

  return (
    <div className="ir-layout">

      {/* Mobile topbar */}
      <div className="ir-mobile-topbar">
        <span className="ir-mobile-section-label">{activeSectionLabel}</span>
        <button
          className="ir-hamburger"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? (
            // X icon
            <XIcon style={{ color: 'white' }} size={14} weight="bold" />
          ) : (
            // Hamburger icon
            <DotsThreeOutlineIcon style={{ color: 'white' }} size={14} weight="fill" />
          )}
        </button>

        {/* Dropdown menu */}
        {mobileMenuOpen && (
          <div className="ir-mobile-dropdown">
            {navItems.map(item => (
              <button
                key={item.id}
                className={`ir-mobile-dropdown-item${activeSection === item.id ? ' ir-mobile-dropdown-item--active' : ''}`}
                onClick={() => handleMobileNavClick(item.id)}
              >
                {item.label}
                {activeSection === item.id}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Left — desktop only */}
      <aside className="ir-sidebar-left">
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

      {/* Middle */}
      <main className="ir-content" key={activeSection}>

        {activeSection === 'technical' && (
          <div>
            <div className="ir-section-header">
              <h2>Technical Questions</h2>
              <p>Click a question to reveal intention and answer guide</p>
            </div>
            {report.technicalQuestions.map((q, i) => (
              <AccordionItem key={i} badge={`Q${i + 1}`} question={q.question} intention={q.intention} answer={q.answer} />
            ))}
          </div>
        )}

        {activeSection === 'behavioral' && (
          <div>
            <div className="ir-section-header">
              <h2>Behavioral Questions</h2>
              <p>Click a question to reveal intention and answer guide</p>
            </div>
            {report.behavioralQuestions.map((q, i) => (
              <AccordionItem key={i} badge={`B${i + 1}`} question={q.question} intention={q.intention} answer={q.answer} />
            ))}
          </div>
        )}

        {activeSection === 'preparation' && (
          <div>
            <div className="ir-section-header">
              <h2>Preparation Plan</h2>
              <p>{report.preperationPlan.length} days to interview day</p>
            </div>
            <div className="ir-timeline">
              {report.preperationPlan.map((item, i) => (
                <div key={i} className="ir-timeline-row">
                  <div className="ir-timeline-left">
                    <div className="ir-timeline-circle">{item.day}</div>
                    {i < report.preperationPlan.length - 1 && <div className="ir-timeline-line" />}
                  </div>
                  <div className="ir-timeline-body">
                    <p className="ir-timeline-focus">{item.focus}</p>
                    <ul className="ir-timeline-tasks">
                      {item.tasks.map((task, j) => <li key={j}>{task}</li>)}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </main>

      {/* Right */}
      <aside className="ir-sidebar-right">
        <div className="view-reports-btn">
          <button onClick={() => navigate('/interview-reports')}>View Reports</button>
        </div>
        <div className="ir-score-section">
          <span className="ir-sidebar-label">Match Score</span>
          <div className="ir-ring-wrap">
            <svg className="ir-ring-svg" viewBox="0 0 120 120">
              <circle cx="60" cy="60" r="54" className="ir-ring-track" />
              <circle cx="60" cy="60" r="54" className="ir-ring-fill"
                style={{ strokeDasharray, stroke: getScoreColor(report.matchScore) }} />
            </svg>
            <span className="ir-ring-number">{report.matchScore}</span>
          </div>
          <span className="ir-score-badge" style={{ color: getScoreColor(report.matchScore) }}>
            {getScoreBadge(report.matchScore)}
          </span>
        </div>

        <div className="ir-divider" />

        <div className="ir-gaps-section">
          <span className="ir-sidebar-label">Skill Gaps</span>
          <p className="ir-gaps-subtitle">Areas to strengthen</p>
          {report.skillGaps.map((gap, i) => (
            <div key={i} className="ir-gap-card">
              <span className="ir-gap-skill">{gap.skill}</span>
              <span className="ir-gap-badge" style={{ color: '#000', backgroundColor: getSeverityColor(gap.severity) }}>
                {gap.severity}
              </span>
            </div>
          ))}
        </div>
      </aside>

    </div>
  )
}

export default Interview