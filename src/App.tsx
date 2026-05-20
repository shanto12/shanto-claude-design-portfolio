import { useMemo, useState, type ChangeEvent, type FormEvent } from 'react'
import {
  ArrowUpRight,
  Bot,
  CheckCircle2,
  Code2,
  FileCheck2,
  Fingerprint,
  Layers3,
  Mail,
  MapPin,
  Network,
  PanelTop,
  ShieldCheck,
  Sparkles,
  TerminalSquare,
} from 'lucide-react'
import {
  achievements,
  demoCategories,
  demos,
  evidenceItems,
  excludedFromPublicSurface,
  profile,
  skillGroups,
  systemSteps,
} from './data/portfolio'
import {
  initialContactPayload,
  submitContact,
  type ContactPayload,
  type ContactResult,
} from './lib/contact'
import type { DemoCategory, IconComponent } from './lib/types'

type Filter = (typeof demoCategories)[number]

const categoryIcons: Record<DemoCategory, IconComponent> = {
  'Security AI': ShieldCheck,
  'Voice AI': Bot,
  'Revenue AI': Network,
  'Creative Systems': Sparkles,
}

const skillIcons = [ShieldCheck, Code2, Layers3, FileCheck2]

function Header() {
  return (
    <header className="site-header">
      <a className="brand" href="#home" aria-label="Shanto Mathew home">
        <span className="brand-mark" aria-hidden="true">
          SM
        </span>
        <span>Shanto Mathew</span>
      </a>
      <nav className="nav-links" aria-label="Primary navigation">
        <a href="#achievements">Achievements</a>
        <a href="#skills">Skills</a>
        <a href="#demos">Demos</a>
        <a href="#approach">Approach</a>
        <a href="#proof">Proof</a>
        <a href="#contact">Contact</a>
      </nav>
      <a className="header-cta" href="#contact">
        <Mail size={18} />
        Contact
      </a>
    </header>
  )
}

function Hero() {
  return (
    <section className="hero" id="home">
      <div className="hero-copy">
        <h1>{profile.name}</h1>
        <p className="hero-title">{profile.headline}</p>
        <p className="hero-summary">{profile.summary}</p>
        <div className="hero-actions">
          <a className="button button-primary" href="#demos">
            View demo gallery
            <ArrowUpRight size={18} />
          </a>
          <a className="button button-secondary" href="#proof">
            Review proof surface
            <PanelTop size={18} />
          </a>
        </div>
        <div className="hero-meta" aria-label="Profile context">
          <span>
            <MapPin size={16} />
            {profile.location}
          </span>
          <span>
            <CheckCircle2 size={16} />
            {profile.contactPositioning}
          </span>
        </div>
      </div>
      <div className="proof-visual">
        <img
          src="/assets/command-center-proof-surface.svg"
          alt="Command-center style proof surface summarizing demos, skills, release gates, and evidence flow."
        />
      </div>
    </section>
  )
}

function Achievements() {
  return (
    <section className="section" id="achievements" aria-labelledby="achievements-heading">
      <div className="section-heading">
        <h2 id="achievements-heading">Security automation outcomes</h2>
        <p>Compact proof points for response automation, triage discipline, and public demo delivery.</p>
      </div>
      <div className="achievement-grid">
        {achievements.map((achievement) => (
          <article className="metric-card" key={achievement.label}>
            <strong>{achievement.value}</strong>
            <h3>{achievement.label}</h3>
            <p>{achievement.detail}</p>
          </article>
        ))}
      </div>
    </section>
  )
}

function Skills() {
  return (
    <section className="section section-tinted" id="skills" aria-labelledby="skills-heading">
      <div className="section-heading">
        <h2 id="skills-heading">Skills mapped to delivery surfaces</h2>
        <p>Security automation, API integration, agentic AI, and verification work presented as one operating system.</p>
      </div>
      <div className="skill-grid">
        {skillGroups.map((group, index) => {
          const Icon = skillIcons[index] ?? TerminalSquare
          return (
            <article className="skill-card" key={group.title}>
              <div className="skill-card-title">
                <Icon size={22} />
                <h3>{group.title}</h3>
              </div>
              <p>{group.description}</p>
              <ul>
                {group.skills.map((skill) => (
                  <li key={skill}>{skill}</li>
                ))}
              </ul>
            </article>
          )
        })}
      </div>
    </section>
  )
}

function DemoGallery() {
  const [activeFilter, setActiveFilter] = useState<Filter>('All')
  const visibleDemos = useMemo(
    () => (activeFilter === 'All' ? demos : demos.filter((demo) => demo.category === activeFilter)),
    [activeFilter],
  )

  return (
    <section className="section" id="demos" aria-labelledby="demos-heading">
      <div className="section-heading section-heading-row">
        <div>
          <h2 id="demos-heading">Nine public Netlify demos</h2>
          <p>Each link opens a deployed demo and each summary states the purpose without private recruiter or client detail.</p>
        </div>
        <span className="count-chip">{demos.length} live links</span>
      </div>
      <div className="filter-row" role="group" aria-label="Filter demo gallery">
        {demoCategories.map((category) => (
          <button
            className={category === activeFilter ? 'filter-button is-active' : 'filter-button'}
            type="button"
            key={category}
            aria-pressed={category === activeFilter}
            onClick={() => setActiveFilter(category)}
          >
            {category}
          </button>
        ))}
      </div>
      <div className="demo-grid">
        {visibleDemos.map((demo) => {
          const Icon = categoryIcons[demo.category]
          return (
            <article className="demo-card" key={demo.slug}>
              <div className="demo-card-top">
                <span className="demo-icon" aria-hidden="true">
                  <Icon size={20} />
                </span>
                <span>{demo.category}</span>
              </div>
              <h3>{demo.title}</h3>
              <p>{demo.purpose}</p>
              <a href={demo.url} target="_blank" rel="noreferrer">
                Open live demo
                <ArrowUpRight size={17} />
              </a>
            </article>
          )
        })}
      </div>
    </section>
  )
}

function Approach() {
  return (
    <section className="section section-split" id="approach" aria-labelledby="approach-heading">
      <div className="section-heading sticky-heading">
        <h2 id="approach-heading">Systems approach</h2>
        <p>Claude/Anthropic-inspired editorial framing: restrained copy, visible reasoning boundaries, and proof-first surfaces.</p>
      </div>
      <div className="approach-list">
        {systemSteps.map((step, index) => (
          <article className="approach-row" key={step.title}>
            <span>{String(index + 1).padStart(2, '0')}</span>
            <div>
              <h3>{step.title}</h3>
              <p>{step.body}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

function Proof() {
  return (
    <section className="section section-tinted" id="proof" aria-labelledby="proof-heading">
      <div className="section-heading section-heading-row">
        <div>
          <h2 id="proof-heading">Proof and evidence layer</h2>
          <p>The portfolio is built to be checked: functions, tests, docs, provenance, and explicit production handoff gates.</p>
        </div>
        <span className="count-chip">public-safe</span>
      </div>
      <div className="evidence-grid">
        {evidenceItems.map((item) => (
          <article className="evidence-card" key={item.label}>
            <Fingerprint size={22} />
            <h3>{item.label}</h3>
            <p>{item.method}</p>
            <span>{item.status}</span>
          </article>
        ))}
      </div>
      <div className="exclusion-bar" aria-label="Excluded private details">
        <strong>Not included:</strong>
        {excludedFromPublicSurface.map((item) => (
          <span key={item}>{item}</span>
        ))}
      </div>
    </section>
  )
}

function Contact() {
  const [payload, setPayload] = useState<ContactPayload>(initialContactPayload)
  const [result, setResult] = useState<ContactResult | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const updatePayload = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = event.target
    setPayload((current) => ({ ...current, [name]: value }))
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsSubmitting(true)
    const nextResult = await submitContact(payload)
    setResult(nextResult)
    setIsSubmitting(false)
    if (nextResult.ok) {
      setPayload(initialContactPayload)
    }
  }

  return (
    <section className="section contact-section" id="contact" aria-labelledby="contact-heading">
      <div className="contact-copy">
        <h2 id="contact-heading">Contact workflow</h2>
        <p>
          Share the role, system, or workflow context. The backend validates the payload and keeps the public surface free of
          sensitive personal, recruiter, compensation, and credential details.
        </p>
        <ol className="contact-steps">
          <li>Send role or project context.</li>
          <li>Review the most relevant demo evidence.</li>
          <li>Move into a focused technical discussion.</li>
        </ol>
      </div>
      <form className="contact-form" name="portfolio-contact" onSubmit={handleSubmit}>
        <input type="hidden" name="form-name" value="portfolio-contact" />
        <label>
          <span>Name</span>
          <input name="name" value={payload.name} onChange={updatePayload} autoComplete="name" required />
        </label>
        <label>
          <span>Email</span>
          <input
            name="email"
            type="email"
            value={payload.email}
            onChange={updatePayload}
            autoComplete="email"
            required
          />
        </label>
        <label>
          <span>Company or context</span>
          <input name="company" value={payload.company} onChange={updatePayload} required />
        </label>
        <label>
          <span>Interest</span>
          <select name="interest" value={payload.interest} onChange={updatePayload}>
            <option>Security automation role</option>
            <option>Agentic AI platform role</option>
            <option>SOAR/XSOAR/XSIAM workflow</option>
            <option>Demo or portfolio review</option>
          </select>
        </label>
        <label className="full-field">
          <span>Message</span>
          <textarea name="message" value={payload.message} onChange={updatePayload} rows={5} required />
        </label>
        <button className="button button-primary full-field" type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Validating...' : 'Send message'}
          <Mail size={18} />
        </button>
        <div className={result?.ok ? 'form-status is-success' : 'form-status'} role="status" aria-live="polite">
          {result?.message ?? 'Contact backend validates submissions without exposing secrets.'}
        </div>
      </form>
    </section>
  )
}

function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Achievements />
        <Skills />
        <DemoGallery />
        <Approach />
        <Proof />
        <Contact />
      </main>
      <footer className="site-footer">
        <span>Shanto Mathew</span>
        <span>AI security automation portfolio</span>
        <a href="#home">Back to top</a>
      </footer>
    </>
  )
}

export default App
