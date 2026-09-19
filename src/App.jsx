import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useInView, useMotionValue, useReducedMotion, useScroll, useSpring, } from 'framer-motion'
import { ArrowDownRight, ArrowLeft, ArrowRight, ArrowUpRight, BriefcaseBusiness, ChevronDown, Code2, GitBranch, Globe2, Layers3, Mail, Menu, Palette, Send, Sparkles, UserRound, X, Zap, } from 'lucide-react'
import './App.css'

const sections = [
  { id: 'home', icon: Menu, label: 'Home' },
  { id: 'work', icon: Layers3, label: 'Work' },
  { id: 'about', icon: UserRound, label: 'About' },
  { id: 'process', icon: BriefcaseBusiness, label: 'Process' },
  { id: 'contact', icon: Mail, label: 'Contact' },
]

const projects = [
  {
    title: 'Pulse Finance',
    category: 'React Dashboard',
    year: '2025',
    tone: 'coral',
    description:
      'A calm, data-rich finance dashboard built for confident decisions.',
  },
  {
    title: 'Nimble Commerce',
    category: 'React Native App',
    year: '2024',
    tone: 'amber',
    description:
      'A fast mobile shopping experience that keeps the product in focus.',
  },
  {
    title: 'Studio Notes',
    category: 'Full-stack Platform',
    year: '2024',
    tone: 'plum',
    description:
      'A collaborative workspace for turning loose ideas into shipped work.',
  },
]

const stack = [
  ['React', 'Interfaces with momentum', Code2],
  ['React Native', 'Native-feeling mobile apps', Zap],
  ['JavaScript', 'The language of the web', Code2],
  ['HTML / CSS', 'Solid visual foundations', Palette],
  ['Tailwind CSS', 'Fast, consistent systems', Layers3],
  ['Express.js', 'Practical backend APIs', BriefcaseBusiness],
  ['MongoDB', 'Flexible data models', Globe2],
  ['Figma', 'UI and motion in progress', Palette],
  ['Git', 'Ship with confidence', Code2],
]

const reveal = {
  hidden: { opacity: 0, y: 32, filter: 'blur(10px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] },
  },
}

const heroEntrance = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.9, staggerChildren: 0.12 },
  },
}

const heroItem = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
}

function SectionLabel({ children }) {
  return (
    <div className="section-label">
      <span />
      {children}
    </div>
  )
}

function Reveal({ children, className = '' }) {
  return (
    <motion.div
      className={className}
      variants={reveal}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
    >
      {children}
    </motion.div>
  )
}

function PillButton({ children, dark = false, href = '#' }) {
  return (
    <motion.a
      href={href}
      className={`pill-button ${dark ? 'pill-button-dark' : ''}`}
      whileHover={{ y: -4, scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
    >
      {children}
      <span>
        <ArrowUpRight size={15} />
      </span>
    </motion.a>
  )
}

function ScrollProgress() {
  const { scrollYProgress } = useScroll()

  return <motion.div className="scroll-progress" style={{ scaleX: scrollYProgress }} />
}

function HorizontalScroller({ children, className = '' }) {
  const scroller = useRef(null)

  const move = (distance) => {
    scroller.current?.scrollBy({ left: distance, behavior: 'smooth' })
  }

  return (
    <div className={`horizontal-scroller ${className}`}>
      <button
        className="scroll-arrow scroll-arrow-left"
        onClick={() => move(-320)}
        aria-label="Scroll backward"
      >
        <ArrowLeft size={18} />
      </button>

      <div className="horizontal-scroller-track" ref={scroller}>
        {children}
      </div>

      <button
        className="scroll-arrow scroll-arrow-right"
        onClick={() => move(320)}
        aria-label="Scroll forward"
      >
        <ArrowRight size={18} />
      </button>
    </div>
  )
}

function Navbar() {
  return (
    <motion.header
      className="navbar"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
    >
      <a className="brand" href="#home">
        <img className="brand-mark" src="/newFavicon.svg" alt="" />
        <strong>
          Muhammad
          <br />
          <i>Iman</i>
        </strong>
      </a>

      <div className="availability">
        <b />
        Available for new projects
      </div>

      <div className="location">
        Sialkot, PK <Globe2 size={18} />
      </div>
    </motion.header>
  )
}

function SideDock({ active }) {
  return (
    <>
      <motion.nav
        className="side-dock"
        aria-label="Page sections"
        initial={{ opacity: 0, x: 24 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
      >
        {sections.map(({ id, icon: Icon, label }) => (
          <a
            className={active === id ? 'active' : ''}
            href={`#${id}`}
            key={id}
            aria-label={label}
          >
            <Icon size={17} />
          </a>
        ))}
      </motion.nav>

      <motion.a
        className="dock-contact"
        href="#contact"
        initial={{ opacity: 0, x: 24 }}
        animate={{ opacity: 1, x: 0 }}
        whileHover={{
          y: -6,
          scale: 1.06,
          boxShadow: '0 16px 30px rgba(255,107,26,.28)',
        }}
        whileTap={{ scale: 0.96 }}
        transition={{
          default: { duration: 0.8, delay: 0.7, ease: [0.22, 1, 0.36, 1] },
          y: { duration: 0.14, ease: 'easeOut' },
          scale: { duration: 0.14, ease: 'easeOut' },
          boxShadow: { duration: 0.14, ease: 'easeOut' },
        }}
      >
        Contact
        <motion.span whileHover={{ x: 3 }} transition={{ duration: 0.12, ease: 'easeOut' }}>
          <Mail size={18} />
        </motion.span>
      </motion.a>
    </>
  )
}

function Hero() {
  const reduceMotion = useReducedMotion()

  return (
    <motion.section
      id="home"
      className="hero-section page-section"
      variants={heroEntrance}
      initial="hidden"
      animate="visible"
    >
      <motion.div className="hero-copy" variants={heroItem}>
        <SectionLabel>Full-Stack Developer</SectionLabel>

        <motion.h1 variants={heroItem}>
          Building digital
          <br />
          <em>experiences</em>
          <br />
          that move.
        </motion.h1>

        <motion.p variants={heroItem}>
          Hi, I’m Muhammad Iman. I craft fast, clean web and mobile apps while leveling
          up UI design and animation in Figma.
        </motion.p>

        <motion.div className="hero-actions" variants={heroItem}>
          <PillButton href="#contact">Get Started</PillButton>
          <PillButton dark href="#work">
            View My Work
          </PillButton>
        </motion.div>

        <motion.div className="social-row" variants={heroItem}>
          <a href="https://github.com" aria-label="GitHub" data-tooltip="GitHub">
            <GitBranch size={19} />
          </a>
          <a href="https://linkedin.com" aria-label="LinkedIn" data-tooltip="LinkedIn">
            <UserRound size={19} />
          </a>
          <a href="https://x.com" aria-label="X" data-tooltip="X">
            <X size={19} />
          </a>
          <span className="social-note">
            Scroll to explore <ArrowDownRight size={18} />
          </span>
        </motion.div>
      </motion.div>

      <motion.div
        className="hero-portrait"
        variants={heroItem}
        animate={reduceMotion ? undefined : { y: [0, -8, 0] }}
        transition={
          reduceMotion ? undefined : { duration: 6, repeat: Infinity, ease: 'easeInOut' }
        }
      >
        <div className="portrait-glow" />
        <div className="portrait-art">
          <img
            className="portrait-image"
            src="/Gemini_Generated_Image_agnhu5agnhu5agnh.jpg"
            alt="Muhammad Iman"
            onError={(event) => {
              event.currentTarget.style.display = 'none'
            }}
          />
        </div>
        <div className="portrait-wordmark">Muhammad Iman</div>
        <div className="portrait-stamp">
          <Sparkles size={17} /> Available
          <br />
          to collaborate
        </div>
      </motion.div>
    </motion.section>
  )
}

function CountUp({ value, suffix = '' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!inView) return undefined

    let frame
    const start = performance.now()

    const update = (time) => {
      const progress = Math.min((time - start) / 1200, 1)
      setCount(Math.floor(progress * value))

      if (progress < 1) {
        frame = requestAnimationFrame(update)
      }
    }

    frame = requestAnimationFrame(update)

    return () => cancelAnimationFrame(frame)
  }, [inView, value])

  return (
    <strong ref={ref}>
      {count}
      {suffix}
    </strong>
  )
}

function Stats() {
  return (
    <section className="stats-section page-section">
      <div className="stats-grid">
        <div className="stat-card">
          <span>01 / Impact</span>
          <CountUp value={18} suffix="+" />
          <p>
            Projects shipped
            <br />
            with care
          </p>
        </div>

        <div className="stat-card accent-stat">
          <span>02 / Trust</span>
          <CountUp value={98} suffix="%" />
          <p>
            Client satisfaction
            <br />
            on every build
          </p>
        </div>
      </div>

      <div className="trust-row">
        <div className="avatars">
          <span>MI</span>
          <span>AK</span>
          <span>RS</span>
          <span>+</span>
        </div>

        <div>
          <strong>
            5.0 <span>★★★★★</span>
          </strong>
          <small>Clients &amp; collaborators</small>
        </div>

        <div className="remote">
          <Globe2 size={19} />
          <span>
            Open to
            <br />
            <b>Remote / Global Work</b>
          </span>
        </div>
      </div>
    </section>
  )
}

function Experience() {
  const entries = [
    [
      'Full-Stack Developer',
      'Independent · 2023 — Now',
      'Building end-to-end products and practice apps.',
    ],
    [
      'Frontend Developer',
      'Freelance · 2022 — 2023',
      'Turning product ideas into responsive React interfaces.',
    ],
    [
      'UI Design Learner',
      'Figma · In progress',
      'Exploring systems, motion, and thoughtful interaction.',
    ],
  ]

  return (
    <section className="experience-section page-section">
      <Reveal>
        <SectionLabel>About the journey</SectionLabel>
        <h2>
          Experiences that
          <br />
          <em>shape the craft.</em>
        </h2>
      </Reveal>

      <div className="timeline">
        {entries.map(([role, date, detail], index) => (
          <Reveal key={role}>
            <div className="timeline-item">
              <span className="timeline-number">0{index + 1}</span>
              <div>
                <h3>{role}</h3>
                <p>{detail}</p>
              </div>
              <span className="date-pill">{date}</span>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

function Work() {
  return (
    <section id="work" className="work-section page-section">
      <div className="marquee-viewport">
        <div className="marquee">
          <div className="marquee-track">
            <span className="marquee-sequence">
              Selected Work <i>•</i> Selected Work <i>•</i> Selected Work
            </span>
            <span className="marquee-sequence" aria-hidden="true">
              Selected Work <i>•</i> Selected Work <i>•</i> Selected Work
            </span>
          </div>
        </div>
      </div>

      <Reveal className="work-intro">
        <SectionLabel>A few things I’ve built</SectionLabel>
        <h2>
          Selected <em>work.</em>
        </h2>
      </Reveal>

      <div className="project-stack">
        {projects.map((project, index) => (
          <motion.article
            className={`project-card ${project.tone}`}
            style={{ top: `${100 + index * 28}px` }}
            key={project.title}
            initial={{ opacity: 0, y: 45 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ delay: index * 0.08 }}
          >
            <div className="project-visual">
              <div className="visual-window">
                <div className="window-bar">
                  <i />
                  <i />
                  <i />
                </div>
                <div className="visual-lines">
                  <b />
                  <b />
                  <b />
                  <b />
                </div>
                <div className="visual-chart" />
              </div>
              <span className="project-index">0{index + 1}</span>
            </div>

            <div className="project-info">
              <div>
                <small>{project.category}</small>
                <h3>{project.title}</h3>
                <p>{project.description}</p>
              </div>

              <div className="project-meta">
                <span>{project.year}</span>
                <button aria-label={`View ${project.title}`}>
                  <ArrowUpRight size={20} />
                </button>
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  )
}

function About() {
  return (
    <section id="about" className="about-section page-section">
      <div className="about-grid">
        <Reveal>
          <SectionLabel>About me</SectionLabel>
          <h2>
            Behind every good product is <em>solid code</em> and a clear process.
          </h2>
        </Reveal>

        <Reveal>
          <p className="about-lead">
            I’m a full-stack developer who enjoys taking a product from a first sketch to a
            polished, working experience.
          </p>
          <p>
            I work across React, React Native, Node/Express and MongoDB, with a growing
            practice in Figma UI design and motion. I care about the details people feel,
            even when they can’t name them.
          </p>
          <a className="text-link" href="#contact">
            More about me <ArrowUpRight size={17} />
          </a>
        </Reveal>
      </div>

      <HorizontalScroller className="gallery">
        <div className="gallery-card gallery-one">
          <Palette size={24} />
          <strong>
            Make it feel
            <br />
            as good as it works.
          </strong>
          <span>01 / Visual thinking</span>
        </div>

        <div className="gallery-card gallery-two">
          <Code2 size={24} />
          <strong>
            Simple systems.
            <br />
            Better products.
          </strong>
          <span>02 / Build notes</span>
        </div>

        <div className="gallery-card gallery-three">
          <Sparkles size={24} />
          <strong>
            Small motion,
            <br />
            big difference.
          </strong>
          <span>03 / In progress</span>
        </div>
      </HorizontalScroller>
    </section>
  )
}

function TechStack() {
  const [expanded, setExpanded] = useState(false)

  return (
    <section className="stack-section page-section">
      <Reveal>
        <SectionLabel>Tools of the trade</SectionLabel>
        <h2>
          Tech <em>stack.</em>
        </h2>
      </Reveal>

      <HorizontalScroller className={`stack-scroller ${expanded ? 'stack-expanded' : ''}`}>
        {stack.map(([name, description, Icon]) => (
          <div className="stack-card" key={name}>
            <div className="stack-icon">
              <Icon size={22} />
            </div>
            <h3>{name}</h3>
            <p>{description}</p>
          </div>
        ))}
      </HorizontalScroller>

      <button
        className="stack-more"
        type="button"
        aria-expanded={expanded}
        onClick={() => setExpanded(!expanded)}
      >
        {expanded ? 'Show less' : 'See more'} <ChevronDown size={17} />
      </button>
    </section>
  )
}

function Clients() {
  const clientLogos = (
    <>
      <span>
        <Code2 /> GitHub
      </span>
      <span>
        <UserRound /> LinkedIn
      </span>
      <span>
        <Sparkles /> Dribbble
      </span>
      <span>
        <Palette /> Figma
      </span>
      <span>
        <Globe2 /> Upwork
      </span>
    </>
  )

  return (
    <section className="clients-section">
      <SectionLabel>Where I build</SectionLabel>
      <div className="logo-marquee-viewport">
        <div className="logo-marquee">
          {clientLogos}
          <span aria-hidden="true">
            <Code2 /> GitHub
          </span>
          <span aria-hidden="true">
            <UserRound /> LinkedIn
          </span>
          <span aria-hidden="true">
            <Sparkles /> Dribbble
          </span>
          <span aria-hidden="true">
            <Palette /> Figma
          </span>
          <span aria-hidden="true">
            <Globe2 /> Upwork
          </span>
        </div>
      </div>
    </section>
  )
}

function Testimonial() {
  return (
    <section className="testimonial-section page-section">
      <div className="quote-mark">“</div>

      <Reveal>
        <SectionLabel>A kind word</SectionLabel>
        <blockquote>
          “Muhammad brings a rare mix of technical clarity and genuine care. He made the
          hard parts feel simple.”
        </blockquote>
        <div className="reviewer">
          <span>SA</span>
          <div>
            <strong>Sarah Ahmed</strong>
            <small>Product collaborator · 2025</small>
          </div>
        </div>
      </Reveal>
    </section>
  )
}

function Places() {
  return (
    <section className="places-section page-section">
      <Reveal>
        <SectionLabel>Where you can find me</SectionLabel>
        <h2>
          Let’s connect
          <br />
          <em>somewhere.</em>
        </h2>
      </Reveal>

      <div className="place-badges">
        <a href="https://github.com" data-tooltip="GitHub">
          <GitBranch />
          <span>
            GitHub
            <small>Code &amp; experiments</small>
          </span>
          <ArrowUpRight />
        </a>

        <a href="https://linkedin.com" data-tooltip="LinkedIn">
          <UserRound />
          <span>
            LinkedIn
            <small>Professional updates</small>
          </span>
          <ArrowUpRight />
        </a>

        <a href="https://upwork.com" data-tooltip="Upwork">
          <Globe2 />
          <span>
            Upwork
            <small>Available for projects</small>
          </span>
          <ArrowUpRight />
        </a>
      </div>
    </section>
  )
}

function Process() {
  const steps = [
    [
      '01',
      'Discover',
      'Understand the people, problem, and outcome.',
      'process-discover',
      '/Gemini_Generated_Image_rc95fnrc95fnrc95.jpg',
    ],
    [
      '02',
      'Design',
      'Map the flow and shape the interface in Figma.',
      'process-design',
      '/Gemini_Generated_Image_gjoj4qgjoj4qgjoj.jpg',
    ],
    [
      '03',
      'Build',
      'Turn the plan into clean, responsive code.',
      'process-build',
      '/Gemini_Generated_Image_yzk2rayzk2rayzk2.jpg',
    ],
    [
      '04',
      'Launch',
      'Test, polish, and ship with confidence.',
      'process-launch',
      '/Gemini_Generated_Image_mpsmcjmpsmcjmpsm.jpg',
    ],
  ]

  return (
    <section id="process" className="process-section page-section">
      <Reveal>
        <SectionLabel>How I work</SectionLabel>
        <h2>
          Work <em>process.</em>
        </h2>
      </Reveal>

      <div className="process-grid">
        {steps.map(([number, title, description, visualClass, image]) => (
          <Reveal key={number}>
            <div
              className={`process-card ${visualClass}`}
              style={{ '--process-image': `url(${image})` }}
            >
              <span>{number}</span>
              <div className="process-icon">
                <ArrowUpRight size={20} />
              </div>
              <h3>{title}</h3>
              <p>{description}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

function FAQ() {
  const questions = [
    [
      'What kind of projects do you take on?',
      'I work best with web apps, mobile experiences, dashboards, and product ideas that need a thoughtful technical partner.',
    ],
    [
      'How long does a typical project take?',
      'A focused landing page can take 1–2 weeks. A larger product build is scoped in milestones so progress stays visible.',
    ],
    [
      'Do you also work on the backend?',
      'Yes. I can build practical APIs and data models with Express.js and MongoDB alongside the frontend.',
    ],
    [
      'Are you available for remote work?',
      'Yes. I am open to remote and global collaborations with clear communication and shared momentum.',
    ],
  ]

  const [open, setOpen] = useState(0)

  return (
    <section className="faq-section page-section">
      <Reveal>
        <SectionLabel>Good to know</SectionLabel>
        <h2>
          Frequently
          <br />
          <em>asked.</em>
        </h2>
      </Reveal>

      <div className="faq-list">
        {questions.map(([question, answer], index) => (
          <div className={`faq-item ${open === index ? 'open' : ''}`} key={question}>
            <button onClick={() => setOpen(open === index ? -1 : index)}>
              <span>{question}</span>
              {open === index ? <X size={17} /> : <ChevronDown size={18} />}
            </button>

            <AnimatePresence>
              {open === index && (
                <motion.p
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                >
                  {answer}
                </motion.p>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </section>
  )
}

function Contact() {
  return (
    <section id="contact" className="contact-section page-section">
      <div className="contact-intro">
        <SectionLabel>Contact form</SectionLabel>
        <h2>
          Let’s build
          <br />
          <em>something.</em>
        </h2>
        <p>Have an idea, a question, or just want to say hello? My inbox is open.</p>
      </div>

      <form
        className="contact-form"
        onSubmit={(event) => {
          event.preventDefault()

          const form = event.currentTarget
          const name = form.name.value.trim()
          const email = form.email.value.trim()
          const message = form.message.value.trim()
          const subject = encodeURIComponent(`Portfolio inquiry${name ? ` from ${name}` : ''}`)
          const body = encodeURIComponent(
            `Name: ${name || 'Not provided'}\nEmail: ${email || 'Not provided'}\n\n${
              message || 'No message provided.'
            }`
          )
          const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=maheriman6@6gmail.com&su=${subject}&body=${body}`

          window.open(gmailUrl, '_blank', 'noopener,noreferrer')
        }}
      >
        <label>
          Name
          <input name="name" type="text" placeholder="Your name" required />
        </label>

        <label>
          Email
          <input name="email" type="email" placeholder="you@example.com" required />
        </label>

        <label>
          Phone
          <input name="phone" type="tel" placeholder="+92 300 0000000" />
        </label>

        <label>
          Message
          <textarea name="message" placeholder="Tell me a little about the project..." rows="4" required />
        </label>

        <button className="submit-button" type="submit">
          Send Request <Send size={16} />
        </button>
      </form>
    </section>
  )
}

function Footer() {
  return (
    <footer className="footer">
      <SectionLabel>Get in touch</SectionLabel>

      <div className="footer-top">
        <div className="footer-person">
          <span>MI</span>
          <div>
            <strong>Muhammad Iman</strong>
            <small>Full-Stack Developer</small>
          </div>
        </div>

        <a
          href="https://mail.google.com/mail/?view=cm&fs=1&to=maheriman6@6gmail.com"
          target="_blank"
          rel="noreferrer"
          className="footer-mail"
        >
          maheriman6@6gmail.com <ArrowUpRight size={18} />
        </a>
      </div>

      <div className="footer-wordmark">
        <div className='footer-edit'>Muhammad</div>Iman<span>.</span>
      </div>

      <div className="footer-bottom">
        <div className="social-row">
          <a href="https://github.com" aria-label="GitHub" data-tooltip="GitHub">
            <GitBranch size={17} />
          </a>
          <a href="https://linkedin.com" aria-label="LinkedIn" data-tooltip="LinkedIn">
            <UserRound size={17} />
          </a>
          <a
            href="https://mail.google.com/mail/?view=cm&fs=1&to=maheriman6@6gmail.com"
            target="_blank"
            rel="noreferrer"
            aria-label="Email"
            data-tooltip="Email"
          >
            <Mail size={17} />
          </a>
        </div>

        <span>© 2026 Muhammad Iman</span>
      </div>
    </footer>
  )
}

function App() {
  const [active, setActive] = useState('home')
  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)
  const springX = useSpring(cursorX, { stiffness: 500, damping: 35 })
  const springY = useSpring(cursorY, { stiffness: 500, damping: 35 })
  const [cursorActive, setCursorActive] = useState(false)

  useEffect(() => {
    const move = (event) => {
      cursorX.set(event.clientX)
      cursorY.set(event.clientY)
    }

    const over = (event) => setCursorActive(Boolean(event.target.closest('a, button')))

    window.addEventListener('mousemove', move)
    window.addEventListener('mouseover', over)

    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach(
          (entry) => entry.isIntersecting && setActive(entry.target.id)
        ),
      { rootMargin: '-35% 0px -55% 0px' }
    )

    sections.forEach(({ id }) => {
      const element = document.getElementById(id)
      if (element) observer.observe(element)
    })

    return () => {
      window.removeEventListener('mousemove', move)
      window.removeEventListener('mouseover', over)
      observer.disconnect()
    }
  }, [cursorX, cursorY])

  return (
    <>
      <ScrollProgress />
      <motion.div
        className={`custom-cursor ${cursorActive ? 'cursor-active' : ''}`}
        style={{ x: springX, y: springY }}
      />
      <Navbar />
      <SideDock active={active} />

      <main>
        <Hero />
        <Stats />
        <Experience />
        <Work />
        <About />
        <TechStack />
        <Clients />
        <Testimonial />
        <Places />
        <Process />
        <FAQ />
        <Contact />
      </main>

      <Footer />
    </>
  )
}

export default App