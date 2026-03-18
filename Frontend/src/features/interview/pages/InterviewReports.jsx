import React from 'react'
import { useNavigate } from 'react-router'
import { useInterview } from '../hooks/useInterview'
import '../style/interviewReports.scss'
import { FileTextIcon } from '@phosphor-icons/react'

const formatDate = (iso) => {
  const date = new Date(iso)
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

const formatTime = (iso) => {
  const date = new Date(iso)
  return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
}

const getScoreColor = (score) => {
  if (score >= 75) return '#4ade80'
  if (score >= 50) return '#facc15'
  return '#f87171'
}

const getScoreLabel = (score) => {
  if (score >= 75) return 'Strong Match'
  if (score >= 50) return 'Good Match'
  return 'Weak Match'
}

const SkeletonCard = () => (
  <div className="ir-reports-card ir-reports-card--skeleton">
    <div className="ir-reports-card__header">
      <div className="ir-skeleton ir-skeleton--title" />
      <div className="ir-skeleton ir-skeleton--badge" />
    </div>
    <div className="ir-reports-card__footer">
      <div className="ir-skeleton ir-skeleton--text" />
      <div className="ir-skeleton ir-skeleton--text ir-skeleton--short" />
    </div>
  </div>
)

const InterviewReports = () => {
  const { reports, loading } = useInterview()
  const navigate = useNavigate()

  return (
    <div className="ir-reports-page">

      {/* Header */}
      <div className="ir-reports-header">
        <div className="ir-reports-header__left">
          <h1 className="ir-reports-title">Interview Reports</h1>
          <p className="ir-reports-subtitle">
            {loading ? 'Loading your reports...' : `${reports?.length ?? 0} report${reports?.length !== 1 ? 's' : ''} generated`}
          </p>
        </div>
        <button
          className="ir-reports-new-btn"
          onClick={() => navigate('/')}
        >
          + New Report
        </button>
      </div>

      {/* Grid */}
      <div className="ir-reports-grid">

        {/* Loading skeletons */}
        {loading && Array.from({ length: 4 }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}

        {/* Empty state */}
        {!loading && (!reports || reports.length === 0) && (
          <div className="ir-reports-empty">
            <div className="ir-reports-empty__icon"><FileTextIcon size={32} weight="bold" /></div>
            <p className="ir-reports-empty__title">No reports yet</p>
            <p className="ir-reports-empty__sub">Generate your first interview report to get started</p>
          </div>
        )}

        {/* Report cards */}
        {!loading && reports?.map((report) => (
          <div
            key={report._id}
            className="ir-reports-card"
            onClick={() => navigate(`/interview/${report._id}`)}
          >
            {/* Top */}
            <div className="ir-reports-card__header">
              <h3 className="ir-reports-card__title">
                {report.title || 'Untitled Report'}
              </h3>
              <div
                className="ir-reports-card__score-badge"
                style={{ color: getScoreColor(report.matchScore) }}
              >
                {report.matchScore}%
              </div>
            </div>

            {/* Score bar */}
            <div className="ir-reports-card__bar-track">
              <div
                className="ir-reports-card__bar-fill"
                style={{
                  width: `${report.matchScore}%`,
                  backgroundColor: getScoreColor(report.matchScore)
                }}
              />
            </div>

            {/* Score label */}
            <p
              className="ir-reports-card__score-label"
              style={{ color: getScoreColor(report.matchScore) }}
            >
              {getScoreLabel(report.matchScore)}
            </p>

            {/* Footer */}
            <div className="ir-reports-card__footer">
              <span className="ir-reports-card__date">
                {formatDate(report.createdAt)}
              </span>
              <span className="ir-reports-card__time">
                {formatTime(report.createdAt)}
              </span>
            </div>

            {/* Arrow */}
            <div className="ir-reports-card__arrow">→</div>
          </div>
        ))}

      </div>
    </div>
  )
}

export default InterviewReports