import { useState, useEffect } from 'react'
import { useContent } from '../utils/useContent.js'

const ADMIN_PIN = '1234'

const SECTIONS = [
  {
    id: 'menu',
    label: 'MAIN MENU',
    fields: [
      { key: 'menu.nametag.line1', label: 'Name Tag Line 1' },
      { key: 'menu.nametag.line2', label: 'Name Tag Line 2' },
      { key: 'menu.items.0.label', label: 'Menu Item 1' },
      { key: 'menu.items.1.label', label: 'Menu Item 2' },
      { key: 'menu.items.2.label', label: 'Menu Item 3' },
      { key: 'menu.items.3.label', label: 'Menu Item 4' },
      { key: 'menu.items.4.label', label: 'Menu Item 5' },
    ]
  },
  {
    id: 'about',
    label: 'ABOUT ME',
    fields: [
      { key: 'about.items.0.label', label: 'Bar 1 Label' },
      { key: 'about.reveal.0.upper.0', label: 'About Panel Line 1' },
      { key: 'about.reveal.0.upper.1', label: 'About Panel Line 2' },
      { key: 'about.reveal.0.upper.2', label: 'About Panel Line 3' },
      { key: 'about.reveal.0.lower', label: 'About Panel Footer' },
      { key: 'about.items.1.label', label: 'Bar 2 Label' },
      { key: 'about.reveal.1.upper.0', label: 'Education Panel Line 1' },
      { key: 'about.reveal.1.upper.1', label: 'Education Panel Line 2' },
      { key: 'about.reveal.1.lower', label: 'Education Panel Footer' },
      { key: 'about.items.2.label', label: 'Bar 3 Label' },
      { key: 'about.reveal.2.upper.0', label: 'Languages Panel Line 1' },
      { key: 'about.reveal.2.upper.1', label: 'Languages Panel Line 2' },
      { key: 'about.reveal.2.lower', label: 'Languages Panel Footer' },
    ]
  },
  {
    id: 'resume',
    label: 'RESUME',
    fields: [
      { key: 'resume.items.0.title', label: 'Card 1 Title' },
      { key: 'resume.items.0.subtitle', label: 'Card 1 Subtitle' },
      { key: 'resume.items.0.rank', label: 'Card 1 Rank' },
      { key: 'resume.items.1.title', label: 'Card 2 Title' },
      { key: 'resume.items.1.subtitle', label: 'Card 2 Subtitle' },
      { key: 'resume.items.1.rank', label: 'Card 2 Rank' },
      { key: 'resume.items.2.title', label: 'Card 3 Title' },
      { key: 'resume.items.2.subtitle', label: 'Card 3 Subtitle' },
      { key: 'resume.items.2.rank', label: 'Card 3 Rank' },
      { key: 'resume.items.3.title', label: 'Card 4 Title' },
      { key: 'resume.items.3.subtitle', label: 'Card 4 Subtitle' },
      { key: 'resume.items.3.rank', label: 'Card 4 Rank' },
      { key: 'resume.education.0.title', label: 'Education Row 1 Title' },
      { key: 'resume.education.0.status', label: 'Education Row 1 Status' },
      { key: 'resume.education.1.title', label: 'Education Row 2 Title' },
      { key: 'resume.education.1.status', label: 'Education Row 2 Status' },
      { key: 'resume.education.2.title', label: 'Education Row 3 Title' },
      { key: 'resume.education.2.status', label: 'Education Row 3 Status' },
      { key: 'resume.education.3.title', label: 'Education Row 4 Title' },
      { key: 'resume.education.3.status', label: 'Education Row 4 Status' },
      { key: 'resume.detail.title', label: 'Detail Panel Title' },
      { key: 'resume.detail.bullet.0', label: 'Detail Bullet 1' },
      { key: 'resume.detail.bullet.1', label: 'Detail Bullet 2' },
    ]
  },
  {
    id: 'socials',
    label: 'SOCIALS',
    fields: [
      { key: 'socials.items.0.label', label: 'Social 1 Label' },
      { key: 'socials.items.0.handle', label: 'Social 1 Handle' },
      { key: 'socials.items.0.href', label: 'Social 1 URL' },
      { key: 'socials.items.0.links.0', label: 'GitHub Link 1' },
      { key: 'socials.items.0.links.1', label: 'GitHub Link 2' },
      { key: 'socials.items.0.links.2', label: 'GitHub Link 3' },
      { key: 'socials.items.0.links.3', label: 'GitHub Link 4' },
      { key: 'socials.items.0.links.4', label: 'GitHub Link 5' },
      { key: 'socials.items.0.links.5', label: 'GitHub Link 6' },
      { key: 'socials.items.1.label', label: 'Social 2 Label' },
      { key: 'socials.items.1.handle', label: 'Social 2 Handle' },
      { key: 'socials.items.1.href', label: 'Social 2 URL' },
      { key: 'socials.items.1.links.0', label: 'Instagram Link 1' },
      { key: 'socials.items.1.links.1', label: 'Instagram Link 2' },
      { key: 'socials.items.2.label', label: 'Social 3 Label' },
      { key: 'socials.items.2.handle', label: 'Social 3 Handle' },
      { key: 'socials.items.2.href', label: 'Social 3 URL' },
      { key: 'socials.items.2.links.0', label: 'Email Link 1' },
      { key: 'socials.items.2.links.1', label: 'Email Link 2' },
      { key: 'socials.items.2.links.2', label: 'Email Link 3' },
    ]
  },
  {
    id: 'sideprojects',
    label: 'SIDE PROJECTS',
    fields: [
      { key: 'sideprojects.items.0.title', label: 'Project 1 Title' },
      { key: 'sideprojects.items.0.stack', label: 'Project 1 Stack' },
      { key: 'sideprojects.items.0.summary', label: 'Project 1 Summary' },
      { key: 'sideprojects.items.0.href', label: 'Project 1 URL' },
      { key: 'sideprojects.items.1.title', label: 'Project 2 Title' },
      { key: 'sideprojects.items.1.stack', label: 'Project 2 Stack' },
      { key: 'sideprojects.items.1.summary', label: 'Project 2 Summary' },
      { key: 'sideprojects.items.1.href', label: 'Project 2 URL' },
      { key: 'sideprojects.items.2.title', label: 'Project 3 Title' },
      { key: 'sideprojects.items.2.stack', label: 'Project 3 Stack' },
      { key: 'sideprojects.items.2.summary', label: 'Project 3 Summary' },
      { key: 'sideprojects.items.2.href', label: 'Project 3 URL' },
      { key: 'sideprojects.items.3.title', label: 'Project 4 Title' },
      { key: 'sideprojects.items.3.stack', label: 'Project 4 Stack' },
      { key: 'sideprojects.items.3.summary', label: 'Project 4 Summary' },
      { key: 'sideprojects.items.3.href', label: 'Project 4 URL' },
      { key: 'sideprojects.items.4.title', label: 'Project 5 Title' },
      { key: 'sideprojects.items.4.stack', label: 'Project 5 Stack' },
      { key: 'sideprojects.items.4.summary', label: 'Project 5 Summary' },
      { key: 'sideprojects.items.4.href', label: 'Project 5 URL' },
      { key: 'sideprojects.items.5.title', label: 'Project 6 Title' },
      { key: 'sideprojects.items.5.stack', label: 'Project 6 Stack' },
      { key: 'sideprojects.items.5.summary', label: 'Project 6 Summary' },
      { key: 'sideprojects.items.5.href', label: 'Project 6 URL' },
    ]
  }
]

function PinGate({ onUnlock }) {
  const [pin, setPin] = useState('')
  const [error, setError] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (pin === ADMIN_PIN) {
      onUnlock()
    } else {
      setError(true)
      setPin('')
      setTimeout(() => setError(false), 1200)
    }
  }

  return (
    <div style={{
      position: 'fixed', inset: 0,
      background: '#0d0d0d',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      flexDirection: 'column', gap: 24,
      fontFamily: "'Persona5Main', sans-serif"
    }}>
      <div style={{ fontSize: 48, color: '#ffffff', letterSpacing: 4, lineHeight: 1 }}>
        ADMIN
      </div>
      <div style={{ fontSize: 20, color: '#d92323', letterSpacing: 3 }}>
        ENTER PIN
      </div>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
        <input
          type="password"
          value={pin}
          onChange={e => setPin(e.target.value)}
          maxLength={8}
          autoFocus
          style={{
            background: error ? 'rgba(217,35,35,0.18)' : 'rgba(255,255,255,0.06)',
            border: `2px solid ${error ? '#d92323' : 'rgba(255,255,255,0.2)'}`,
            color: '#ffffff',
            fontFamily: "'Persona5Main', sans-serif",
            fontSize: 32,
            letterSpacing: 12,
            padding: '12px 24px',
            outline: 'none',
            textAlign: 'center',
            width: 220,
            clipPath: 'polygon(0 0, 100% 0, calc(100% - 10px) 100%, 0 100%)',
            transition: 'border-color 0.2s, background 0.2s'
          }}
        />
        <button
          type="submit"
          style={{
            background: '#d92323',
            color: '#ffffff',
            border: 'none',
            fontFamily: "'Persona5Main', sans-serif",
            fontSize: 22,
            letterSpacing: 4,
            padding: '10px 32px',
            cursor: 'pointer',
            clipPath: 'polygon(0 0, 100% 0, calc(100% - 10px) 100%, 0 100%)'
          }}
        >
          ENTER
        </button>
      </form>
      {error && (
        <div style={{ color: '#d92323', fontSize: 18, letterSpacing: 2 }}>WRONG PIN</div>
      )}
    </div>
  )
}

function FieldEditor({ fieldKey, label, value, onSave }) {
  const [editing, setEditing] = useState(false)
  const [draft, setDraft] = useState(value)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    setDraft(value)
  }, [value])

  const handleSave = async () => {
    setSaving(true)
    const ok = await onSave(fieldKey, draft)
    setSaving(false)
    if (ok) {
      setSaved(true)
      setEditing(false)
      setTimeout(() => setSaved(false), 1500)
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSave()
    }
    if (e.key === 'Escape') {
      setEditing(false)
      setDraft(value)
    }
  }

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: '220px 1fr auto',
      alignItems: 'center',
      gap: 12,
      padding: '10px 16px',
      background: editing ? 'rgba(217,35,35,0.08)' : 'rgba(255,255,255,0.03)',
      borderLeft: `3px solid ${saved ? '#22c55e' : editing ? '#d92323' : 'transparent'}`,
      transition: 'all 0.2s',
      minHeight: 52
    }}>
      <div style={{
        fontFamily: "'Persona5Main', sans-serif",
        fontSize: 13,
        color: 'rgba(255,255,255,0.5)',
        letterSpacing: 1,
        lineHeight: 1.3
      }}>
        {label}
        <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.25)', marginTop: 2, fontFamily: 'monospace' }}>
          {fieldKey}
        </div>
      </div>

      {editing ? (
        <input
          autoFocus
          value={draft}
          onChange={e => setDraft(e.target.value)}
          onKeyDown={handleKeyDown}
          style={{
            background: 'rgba(255,255,255,0.06)',
            border: '1px solid rgba(255,255,255,0.2)',
            color: '#ffffff',
            fontFamily: "'Persona5Main', sans-serif",
            fontSize: 16,
            letterSpacing: 1,
            padding: '8px 12px',
            outline: 'none',
            width: '100%',
          }}
        />
      ) : (
        <div
          onClick={() => setEditing(true)}
          style={{
            fontFamily: "'Persona5Main', sans-serif",
            fontSize: 16,
            color: '#ffffff',
            letterSpacing: 1,
            cursor: 'pointer',
            padding: '8px 12px',
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.08)',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            transition: 'background 0.2s'
          }}
          title="Click to edit"
        >
          {value || <span style={{ color: 'rgba(255,255,255,0.25)' }}>(empty)</span>}
        </div>
      )}

      <div style={{ display: 'flex', gap: 6, flexShrink: 0 }}>
        {editing ? (
          <>
            <button
              onClick={handleSave}
              disabled={saving}
              style={{
                background: saving ? 'rgba(217,35,35,0.5)' : '#d92323',
                color: '#fff',
                border: 'none',
                fontFamily: "'Persona5Main', sans-serif",
                fontSize: 13,
                letterSpacing: 2,
                padding: '6px 14px',
                cursor: saving ? 'wait' : 'pointer',
                clipPath: 'polygon(0 0, 100% 0, calc(100% - 6px) 100%, 0 100%)'
              }}
            >
              {saving ? '...' : 'SAVE'}
            </button>
            <button
              onClick={() => { setEditing(false); setDraft(value) }}
              style={{
                background: 'rgba(255,255,255,0.08)',
                color: 'rgba(255,255,255,0.6)',
                border: 'none',
                fontFamily: "'Persona5Main', sans-serif",
                fontSize: 13,
                letterSpacing: 1,
                padding: '6px 10px',
                cursor: 'pointer'
              }}
            >
              X
            </button>
          </>
        ) : (
          <button
            onClick={() => setEditing(true)}
            style={{
              background: saved ? 'rgba(34,197,94,0.15)' : 'rgba(255,255,255,0.06)',
              color: saved ? '#22c55e' : 'rgba(255,255,255,0.4)',
              border: `1px solid ${saved ? 'rgba(34,197,94,0.3)' : 'rgba(255,255,255,0.1)'}`,
              fontFamily: "'Persona5Main', sans-serif",
              fontSize: 11,
              letterSpacing: 2,
              padding: '4px 10px',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
          >
            {saved ? 'SAVED' : 'EDIT'}
          </button>
        )}
      </div>
    </div>
  )
}

export default function AdminPanel() {
  const [unlocked, setUnlocked] = useState(() => sessionStorage.getItem('admin-unlocked') === '1')
  const [activeSection, setActiveSection] = useState('menu')
  const { content, loading, get, update } = useContent()

  const handleUnlock = () => {
    sessionStorage.setItem('admin-unlocked', '1')
    setUnlocked(true)
  }

  if (!unlocked) return <PinGate onUnlock={handleUnlock} />

  const section = SECTIONS.find(s => s.id === activeSection)

  return (
    <div style={{
      position: 'fixed', inset: 0,
      background: '#0d0d0d',
      display: 'flex',
      flexDirection: 'column',
      fontFamily: "'Persona5Main', sans-serif",
      overflow: 'hidden'
    }}>
      <div style={{
        height: 60,
        background: '#111',
        borderBottom: '2px solid #d92323',
        display: 'flex',
        alignItems: 'center',
        padding: '0 24px',
        gap: 24,
        flexShrink: 0
      }}>
        <div style={{ fontSize: 28, color: '#ffffff', letterSpacing: 4 }}>
          CONTENT EDITOR
        </div>
        <div style={{ fontSize: 13, color: '#d92323', letterSpacing: 2 }}>
          PERSONA 5 PORTFOLIO
        </div>
        <a
          href="/"
          style={{
            marginLeft: 'auto',
            color: 'rgba(255,255,255,0.4)',
            fontSize: 13,
            letterSpacing: 2,
            textDecoration: 'none',
            border: '1px solid rgba(255,255,255,0.15)',
            padding: '4px 12px'
          }}
        >
          BACK TO SITE
        </a>
      </div>

      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        <div style={{
          width: 200,
          background: '#0a0a0a',
          borderRight: '1px solid rgba(255,255,255,0.08)',
          display: 'flex',
          flexDirection: 'column',
          padding: '16px 0',
          flexShrink: 0,
          overflowY: 'auto'
        }}>
          {SECTIONS.map(s => (
            <button
              key={s.id}
              onClick={() => setActiveSection(s.id)}
              style={{
                background: activeSection === s.id ? 'rgba(217,35,35,0.15)' : 'transparent',
                borderLeft: `3px solid ${activeSection === s.id ? '#d92323' : 'transparent'}`,
                border: 'none',
                borderLeft: `3px solid ${activeSection === s.id ? '#d92323' : 'transparent'}`,
                color: activeSection === s.id ? '#ffffff' : 'rgba(255,255,255,0.4)',
                fontFamily: "'Persona5Main', sans-serif",
                fontSize: 15,
                letterSpacing: 3,
                padding: '14px 20px',
                cursor: 'pointer',
                textAlign: 'left',
                transition: 'all 0.15s'
              }}
            >
              {s.label}
            </button>
          ))}
        </div>

        <div style={{ flex: 1, overflowY: 'auto', padding: '0 0 40px 0' }}>
          <div style={{
            padding: '20px 24px 12px',
            borderBottom: '1px solid rgba(255,255,255,0.06)',
            fontSize: 22,
            color: '#ffffff',
            letterSpacing: 4
          }}>
            {section?.label}
            <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.3)', marginLeft: 12, letterSpacing: 1 }}>
              {loading ? 'LOADING...' : `${section?.fields.length} FIELDS`}
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 1, padding: '8px 0' }}>
            {loading ? (
              <div style={{ padding: 40, color: 'rgba(255,255,255,0.3)', fontSize: 16, letterSpacing: 3, textAlign: 'center' }}>
                LOADING...
              </div>
            ) : section?.fields.map(field => (
              <FieldEditor
                key={field.key}
                fieldKey={field.key}
                label={field.label}
                value={get(field.key, '')}
                onSave={update}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
