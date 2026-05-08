import {
  ArrowUpRight,
  BrainCircuit,
  ChevronRight,
  Code2,
  Cpu,
  ExternalLink,
  Mail,
  Menu,
  MousePointer2,
  Send,
  Share2,
  X,
  Bot,
} from "lucide-react";
import { motion, useScroll, useTransform, useMotionValueEvent, AnimatePresence } from "framer-motion";
import { useEffect, useState, useRef, useMemo } from "react";
import {
  contactCards,
  experience,
  navItems,
  profile,
  projects,
  showcase,
  skillCategories,
  stats,
} from "./data/portfolio";

/* ── Animation presets ── */
const easeOut = [0.25, 0.46, 0.45, 0.94];

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: easeOut } },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};

/* ── Typing effect ── */
const typingPhrases = [
  "Designing privacy-first AI assistants",
  "Architecting database-backed systems",
  "Shaping UI/UX for intelligent workflows",
  "Turning complex logic into usable products",
];

function useTypingEffect(words, typingSpeed = 58, pause = 1300) {
  const [wordIndex, setWordIndex] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = words[wordIndex];
    const doneTyping = !deleting && text === current;
    const doneDeleting = deleting && text === "";

    const timeout = setTimeout(
      () => {
        if (doneTyping) { setDeleting(true); return; }
        if (doneDeleting) {
          setDeleting(false);
          setWordIndex((index) => (index + 1) % words.length);
          return;
        }
        setText((value) =>
          deleting ? current.slice(0, value.length - 1) : current.slice(0, value.length + 1),
        );
      },
      doneTyping ? pause : deleting ? typingSpeed * 0.55 : typingSpeed,
    );
    return () => clearTimeout(timeout);
  }, [deleting, pause, text, typingSpeed, wordIndex, words]);

  return text;
}

function sectionId(item) {
  if (item === "UI/UX") return "uiux";
  return item.toLowerCase().replace("/", "ux");
}

/* ── Particles ── */
function Particles({ count = 20 }) {
  const particles = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 2.2 + 0.5,
        duration: 10 + Math.random() * 18,
        delay: Math.random() * 10,
      })),
    [count],
  );

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden" aria-hidden="true">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="particle"
          style={{
            width: p.size,
            height: p.size,
            left: `${p.x}%`,
            top: `${p.y}%`,
            background: `rgba(52, 213, 255, ${0.15 + Math.random() * 0.25})`,
            boxShadow: `0 0 ${p.size * 4}px rgba(52, 213, 255, 0.15)`,
            willChange: "transform, opacity",
          }}
          animate={{
            y: [0, -40 - Math.random() * 60, 0],
            opacity: [0, 0.6 + Math.random() * 0.4, 0],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

/* ── Cursor glow ── */
function CursorGlow() {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const handle = (e) => {
      el.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
    };
    window.addEventListener("mousemove", handle, { passive: true });
    return () => window.removeEventListener("mousemove", handle);
  }, []);

  return <div ref={ref} className="cursor-glow" aria-hidden="true" />;
}

/* ── Background orbs ── */
function Background() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-void bg-radial-grid" aria-hidden="true">
      <motion.div
        className="orb absolute left-[8%] top-[6%] h-64 w-64 rounded-full bg-cyanGlow/30"
        animate={{ x: [0, 48, -22, 0], y: [0, 30, 64, 0], scale: [1, 1.14, 0.94, 1] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="orb absolute right-[6%] top-[18%] h-72 w-72 rounded-full bg-violetGlow/28"
        animate={{ x: [0, -44, 30, 0], y: [0, 50, -28, 0], scale: [1, 0.88, 1.18, 1] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="orb absolute bottom-[14%] left-[40%] h-60 w-60 rounded-full bg-plasma/18"
        animate={{ x: [0, 34, -40, 0], y: [0, -48, 24, 0] }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="orb absolute left-[60%] top-[50%] h-48 w-48 rounded-full bg-cyanGlow/12"
        animate={{ x: [0, -30, 20, 0], y: [0, 25, -35, 0], scale: [1, 1.08, 0.92, 1] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      />
      <div className="grid-mask absolute inset-0" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(5,7,18,0.4)_55%,rgba(5,7,18,0.92)_100%)]" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyanGlow/70 to-transparent" />
    </div>
  );
}

/* ── Navbar ── */
function Navbar() {
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [hidden, setHidden] = useState(false);
  const lastScroll = useRef(0);
  const { scrollY } = useScroll();
  const blur = useTransform(scrollY, [0, 90], [0, 18]);

  useMotionValueEvent(scrollY, "change", (v) => {
    setHidden(v > 120 && v > lastScroll.current);
    lastScroll.current = v;
  });

  useEffect(() => {
    const ids = navItems.map((i) => sectionId(i));
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActiveSection(e.target.id);
        });
      },
      { rootMargin: "-30% 0px -60% 0px" },
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  return (
    <motion.header
      className="fixed inset-x-0 top-0 z-50 border-b border-white/10"
      style={{ backdropFilter: blur.to((v) => `blur(${v}px)`) }}
      animate={{ y: hidden ? -100 : 0 }}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      role="banner"
    >
      <nav className="section-shell flex h-20 items-center justify-between" aria-label="Main navigation">
        <a href="#home" className="group flex items-center gap-3" aria-label="Home">
          <span className="grid h-10 w-10 place-items-center rounded-2xl border border-cyanGlow/30 bg-cyanGlow/10 shadow-neon transition-all will-change-transform hover:shadow-[0_0_48px_rgba(52,213,255,0.25)]">
            <BrainCircuit className="h-5 w-5 text-cyanGlow" />
          </span>
          <span className="font-display text-base font-bold tracking-wide text-white max-sm:hidden">ABDUR.R</span>
        </a>

        <div className="hidden items-center gap-1 lg:flex" role="tablist">
          {navItems.map((item) => {
            const id = sectionId(item);
            const isActive = activeSection === id;
            return (
              <a
                key={item}
                href={`#${id}`}
                role="tab"
                aria-selected={isActive}
                className={`relative rounded-full px-4 py-2 text-sm font-medium transition ${
                  isActive ? "text-white" : "text-slate-400 hover:text-white"
                }`}
              >
                {item}
                {isActive && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute inset-0 rounded-full bg-white/10"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </a>
            );
          })}
        </div>

        <a
          href="#contact"
          className="hidden rounded-full border border-cyanGlow/30 bg-cyanGlow/10 px-5 py-2.5 text-sm font-semibold text-white shadow-neon transition-all will-change-transform hover:-translate-y-0.5 hover:bg-cyanGlow/20 hover:shadow-[0_0_48px_rgba(52,213,255,0.25)] md:inline-flex"
        >
          Let's connect
        </a>

        <button
          className="grid h-11 w-11 place-items-center rounded-full border border-white/15 bg-white/10 lg:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={open}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            className="section-shell mb-4 rounded-3xl border border-white/10 bg-slate-950/92 p-3 shadow-glass lg:hidden"
            initial={{ opacity: 0, y: -12, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.96 }}
            transition={{ duration: 0.2 }}
            role="menu"
          >
            {navItems.map((item) => (
              <a
                key={item}
                href={`#${sectionId(item)}`}
                onClick={() => setOpen(false)}
                className="block rounded-2xl px-4 py-3 text-sm font-semibold text-slate-200 hover:bg-white/10"
                role="menuitem"
              >
                {item}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

/* ── Section Heading ── */
function SectionHeading({ eyebrow, title, text }) {
  return (
    <motion.div
      className="mx-auto mb-12 max-w-3xl text-center"
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
    >
      <p className="mb-4 text-sm font-bold uppercase tracking-[0.28em] text-cyanGlow">{eyebrow}</p>
      <h2 className="font-heading text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">{title}</h2>
      {text && (
        <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-slate-300">{text}</p>
      )}
      <motion.div
        className="mx-auto mt-8 h-px w-20 bg-gradient-to-r from-cyanGlow/60 via-violetGlow/60 to-transparent"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.2 }}
      />
    </motion.div>
  );
}

/* ── Section Divider ── */
function SectionDivider() {
  return (
    <motion.div
      className="section-divider"
      initial={{ scaleX: 0, opacity: 0 }}
      whileInView={{ scaleX: 1, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      aria-hidden="true"
    />
  );
}

/* ── Scroll Indicator ── */
function ScrollIndicator() {
  return (
    <motion.div
      className="absolute bottom-8 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 sm:flex"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.5, duration: 0.8 }}
    >
      <span className="text-[10px] font-bold uppercase tracking-[0.24em] text-slate-500">Scroll</span>
      <motion.div
        className="h-8 w-px bg-gradient-to-b from-cyanGlow/60 to-transparent"
        animate={{ scaleY: [0.3, 1, 0.3], opacity: [0.3, 1, 0.3] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      />
    </motion.div>
  );
}

/* ── Hero ── */
function Hero() {
  const typedText = useTypingEffect(typingPhrases);
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 60]);
  const y2 = useTransform(scrollY, [0, 500], [0, -80]);
  const scale = useTransform(scrollY, [0, 500], [1, 0.94]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);

  return (
    <section id="home" className="relative flex min-h-screen items-center overflow-hidden pb-16 pt-28">
      <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-void to-transparent" />
      <motion.div
        className="scanline absolute left-0 top-28 z-0 h-px w-full opacity-40"
        animate={{ x: ["-100%", "100%"] }}
        transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
        aria-hidden="true"
      />
      <motion.div
        className="absolute left-[5%] top-[22%] hidden h-24 w-24 rounded-full border border-cyanGlow/10 lg:block"
        style={{ y: useTransform(scrollY, [0, 400], [0, -30]) }}
        animate={{ rotate: 360 }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        aria-hidden="true"
      />
      <motion.div
        className="absolute right-[12%] top-[35%] hidden h-16 w-16 rounded-full border border-dashed border-violetGlow/15 lg:block"
        style={{ y: useTransform(scrollY, [0, 400], [0, 40]) }}
        animate={{ rotate: -360 }}
        transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
        aria-hidden="true"
      />

      <ScrollIndicator />

      <div className="section-shell relative z-10 grid items-center gap-12 lg:grid-cols-[0.96fr_1.04fr]">
        <motion.div style={{ y: y1 }}>
          <motion.div
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyanGlow/30 bg-slate-950/50 px-4 py-2 text-sm font-semibold text-cyan-100 shadow-neon backdrop-blur-xl"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.12 }}
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyanGlow opacity-70" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-cyanGlow" />
            </span>
            Available for AI, software, and UI/UX internships
          </motion.div>

          <p className="mb-4 font-display text-lg font-bold uppercase tracking-[0.28em] text-cyanGlow">
            AI Systems Developer
          </p>

          <h1 className="font-heading text-5xl font-bold leading-[1.02] text-white sm:text-6xl lg:text-7xl xl:text-8xl">
            {profile.name}
            <span className="text-gradient mt-2 block">future-ready digital systems.</span>
          </h1>

          <div className="mt-6 flex min-h-10 flex-wrap items-center text-lg font-semibold text-cyan-100 sm:text-xl">
            <span className="mr-3 text-slate-500">Currently</span>
            <span className="break-words">{typedText}</span>
            <span className="ml-1 h-6 w-px animate-pulse bg-cyanGlow shadow-neon" aria-hidden="true" />
          </div>

          <p className="mt-5 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg sm:leading-9">
            CSE student focused on AI automation, system architecture, database design, and cinematic interfaces that make complex workflows feel clear and powerful.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#projects"
              className="group inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-bold text-slate-950 shadow-[0_0_34px_rgba(255,255,255,0.2),0_0_72px_rgba(52,213,255,0.18)] transition-all will-change-transform hover:-translate-y-1 hover:bg-cyan-100 hover:shadow-[0_0_48px_rgba(255,255,255,0.3),0_0_96px_rgba(52,213,255,0.25)]"
            >
              View Projects <ArrowUpRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-full border border-cyanGlow/30 bg-cyanGlow/10 px-6 py-3 text-sm font-bold text-white shadow-neon transition-all will-change-transform hover:-translate-y-1 hover:bg-cyanGlow/20 hover:shadow-[0_0_48px_rgba(52,213,255,0.3)]"
            >
              Contact Me <Mail className="h-4 w-4" />
            </a>
          </div>

          <div className="mt-7 flex flex-wrap items-center gap-3">
            {[
              { href: profile.github, icon: Code2, label: "GitHub" },
              { href: profile.linkedin, icon: Share2, label: "LinkedIn" },
              { href: `mailto:${profile.email}`, icon: Mail, label: "Email" },
            ].map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 text-sm font-semibold text-slate-300 transition-all will-change-transform hover:-translate-y-0.5 hover:border-cyanGlow/40 hover:text-cyanGlow hover:shadow-[0_0_24px_rgba(52,213,255,0.15)]"
                aria-label={`Visit ${link.label} profile`}
              >
                <link.icon className="h-4 w-4 transition group-hover:scale-110" /> {link.label}
              </a>
            ))}
          </div>

          <div className="mt-10 grid max-w-xl grid-cols-3 gap-3">
            {stats.map((item, i) => (
              <motion.div
                key={item.label}
                className="glass rounded-3xl p-4 transition-all will-change-transform hover:border-cyanGlow/30 hover:shadow-neon"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.1, duration: 0.5 }}
              >
                <div className="font-display text-2xl font-bold text-white">{item.value}</div>
                <div className="mt-1 text-xs leading-5 text-slate-400">{item.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Hero visual — AI Assistant Core card */}
        <motion.div className="relative mx-auto w-full max-w-[600px]" style={{ y: y2, scale, opacity }}>
          <motion.div
            className="absolute inset-10 rounded-full border border-cyanGlow/20"
            animate={{ rotate: 360 }}
            transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
            aria-hidden="true"
          />
          <motion.div
            className="absolute inset-20 rounded-full border border-dashed border-violetGlow/30"
            animate={{ rotate: -360 }}
            transition={{ duration: 34, repeat: Infinity, ease: "linear" }}
            aria-hidden="true"
          />
          <motion.div
            className="absolute -right-4 -top-4 z-20 hidden rounded-full border border-cyanGlow/30 bg-slate-950/80 px-4 py-2 text-xs font-bold text-cyan-200 shadow-neon backdrop-blur-xl lg:block"
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            v2.4.1 — Neural Core
          </motion.div>

          <div className="neon-border glass relative aspect-square overflow-hidden rounded-[2rem] p-5 transition-all will-change-transform hover:shadow-[0_0_64px_rgba(52,213,255,0.15)]">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(52,213,255,0.2),transparent_34%)]" />
            <div className="absolute inset-8 rounded-full border border-cyanGlow/10" />
            <div className="absolute inset-20 rounded-full border border-violetGlow/10" />
            <motion.div
              className="absolute left-8 right-8 top-1/2 h-px origin-center bg-gradient-to-r from-transparent via-cyanGlow to-transparent"
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
              aria-hidden="true"
            />
            <motion.div
              className="absolute bottom-1/2 left-8 right-8 h-px origin-center bg-gradient-to-r from-transparent via-violetGlow to-transparent"
              animate={{ rotate: [360, 0] }}
              transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
              aria-hidden="true"
            />
            <motion.div
              className="absolute bottom-10 left-10 right-10 h-px bg-violetGlow/70"
              animate={{ y: [-120, 0, -120], opacity: [0.12, 0.65, 0.12] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
              aria-hidden="true"
            />

            <div className="relative z-10 flex h-full flex-col justify-between rounded-[1.4rem] border border-white/10 bg-slate-950/58 p-5 sm:p-6">
              {/* Header */}
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.24em] text-cyanGlow">Neural Console</p>
                  <h3 className="mt-2 font-display text-2xl font-bold text-white">AI Assistant Core</h3>
                </div>
                <Cpu className="h-9 w-9 text-cyanGlow" />
              </div>

              {/* Animated brain icon */}
              <motion.div
                className="mx-auto grid h-28 w-28 place-items-center rounded-full border border-cyanGlow/30 bg-cyanGlow/10 shadow-neon sm:h-36 sm:w-36"
                animate={{
                  scale: [1, 1.06, 1],
                  boxShadow: [
                    "0 0 28px rgba(52,213,255,0.18)",
                    "0 0 74px rgba(52,213,255,0.34)",
                    "0 0 28px rgba(52,213,255,0.18)",
                  ],
                }}
                transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
              >
                <BrainCircuit className="h-12 w-12 text-cyanGlow sm:h-16 sm:w-16" />
              </motion.div>

              {/* Capability list */}
              <div className="grid gap-2">
                {[
                  { label: "Email drafting", status: "active" },
                  { label: "PDF summarization", status: "active" },
                  { label: "Web intelligence", status: "active" },
                  { label: "Task scheduling", status: "beta" },
                ].map((item, index) => (
                  <motion.div
                    key={item.label}
                    className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.06] p-3.5 transition hover:border-cyanGlow/30"
                    animate={{ x: [0, index % 2 ? -6 : 6, 0] }}
                    transition={{ duration: 3 + index * 0.4, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <span className="flex items-center gap-2 text-sm font-semibold text-slate-200">
                      <span
                        className={`h-1.5 w-1.5 rounded-full ${
                          item.status === "beta" ? "bg-amber-400" : "bg-emerald-400"
                        }`}
                      />
                      {item.label}
                    </span>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                      {item.status === "beta" ? "BETA" : "LIVE"}
                    </span>
                  </motion.div>
                ))}
              </div>

              {/* Status bar */}
              <div className="flex items-center justify-between rounded-2xl border border-cyanGlow/20 bg-cyanGlow/10 p-3.5 transition hover:border-cyanGlow/30">
                <div className="flex items-center gap-2">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-70" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                  </span>
                  <span className="text-xs text-slate-300">All systems nominal · 4 modules online</span>
                </div>
                <span className="rounded-full bg-emerald-400/15 px-2.5 py-0.5 text-[10px] font-bold text-emerald-200">UPTIME 99.8%</span>
              </div>
            </div>
          </div>

          <motion.div
            className="absolute -bottom-3 -left-3 z-20 hidden rounded-full border border-violetGlow/30 bg-slate-950/80 px-4 py-2 text-xs font-bold text-violet-200 shadow-neon backdrop-blur-xl lg:block"
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          >
            Voice · Text · Vision
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

/* ── About ── */
function About() {
  return (
    <section id="about" className="relative py-24 sm:py-28">
      <SectionDivider />
      <div className="section-shell pt-16 sm:pt-20">
        <SectionHeading
          eyebrow="About"
          title="A CSE student shaping systems from logic to interface."
          text="Abdur combines database architecture, AI automation concepts, technical documentation, and UI/UX wireframing to design software that solves practical operational problems."
        />
        <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
          <motion.div
            className="glass rounded-[2rem] p-6 transition-all will-change-transform hover:border-cyanGlow/30 hover:shadow-neon sm:p-7"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <div className="mb-5 grid h-14 w-14 place-items-center rounded-2xl bg-cyanGlow/10 text-cyanGlow">
              <BrainCircuit className="h-7 w-7" />
            </div>
            <p className="text-sm font-bold uppercase tracking-[0.22em] text-violet-200">Current direction</p>
            <h3 className="mt-4 font-display text-2xl font-bold text-white sm:text-3xl">{profile.title}</h3>
            <p className="mt-5 leading-8 text-slate-300">
              His work sits at the intersection of intelligent assistants, workflow automation, database-backed products, and clear interaction design.
            </p>
            <p className="mt-4 leading-8 text-slate-400">
              Driven by a passion for building AI systems that feel less like tools and more like collaborators — combining system architecture thinking with crafted user experiences.
            </p>
          </motion.div>

          <motion.div className="grid gap-5 sm:grid-cols-2" variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            {profile.focusAreas.map((area) => (
              <motion.div
                key={area}
                className="glass rounded-[2rem] p-6 transition-all will-change-transform hover:-translate-y-1 hover:border-cyanGlow/30 hover:shadow-neon"
                variants={fadeUp}
              >
                <div className="mb-5 grid h-12 w-12 place-items-center rounded-2xl bg-cyanGlow/10 text-cyanGlow">
                  <MousePointer2 className="h-5 w-5" />
                </div>
                <h4 className="font-display text-xl font-bold text-white">{area}</h4>
                <p className="mt-3 text-sm leading-7 text-slate-400">
                  Practical, research-aware thinking translated into clean project structures and purposeful interfaces.
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {profile.aboutTimeline && (
          <div className="relative mx-auto mt-20 max-w-4xl sm:mt-24">
            <div className="absolute left-6 top-0 h-full w-px bg-gradient-to-b from-cyanGlow/30 via-violetGlow/30 to-transparent sm:left-8">
              <motion.div
                className="absolute left-0 top-0 h-20 w-px bg-cyanGlow"
                animate={{ top: ["0%", "100%"] }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                aria-hidden="true"
              />
            </div>
            <h3 className="mb-10 text-center font-display text-2xl font-bold text-white sm:mb-12">Journey</h3>
            {profile.aboutTimeline.map((item, index) => (
              <motion.div
                key={item.year}
                className="relative mb-6 pl-14 sm:mb-8 sm:pl-16"
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.12 }}
              >
                <motion.span
                  className="absolute left-3 top-1 grid h-8 w-8 place-items-center rounded-full border border-cyanGlow/40 bg-cyanGlow/10 text-xs font-bold text-cyanGlow shadow-neon sm:left-4 sm:h-10 sm:w-10"
                  whileHover={{ scale: 1.15, boxShadow: "0 0 32px rgba(52,213,255,0.4)" }}
                >
                  {index + 1}
                </motion.span>
                <div className="glass rounded-[2rem] p-5 transition-all will-change-transform hover:border-cyanGlow/30 hover:shadow-neon sm:p-6">
                  <span className="text-xs font-bold uppercase tracking-[0.18em] text-cyanGlow">{item.year}</span>
                  <h4 className="mt-1 font-display text-xl font-bold text-white">{item.event}</h4>
                  <p className="mt-2 text-sm leading-7 text-slate-400">{item.detail}</p>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

/* ── Skill Progress Bar ── */
function SkillBar({ name, level, index }) {
  return (
    <motion.div
      className="group"
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
    >
      <div className="mb-1.5 flex items-center justify-between">
        <span className="text-sm font-semibold text-slate-200 transition-colors group-hover:text-cyan-100">{name}</span>
        <span className="text-xs font-bold text-cyanGlow/80 transition-colors group-hover:text-cyanGlow">{level}%</span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-white/10">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-cyanGlow to-violetGlow"
          initial={{ width: 0 }}
          whileInView={{ width: `${level}%` }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.1 + index * 0.05, ease: easeOut }}
          style={{ boxShadow: "0 0 12px rgba(52,213,255,0.3)" }}
        />
      </div>
    </motion.div>
  );
}

/* ── Skills ── */
function Skills() {
  const [activeCategory, setActiveCategory] = useState(0);

  return (
    <section id="skills" className="relative py-24 sm:py-28">
      <div className="section-shell">
        <SectionHeading eyebrow="Skills" title="A focused stack for AI products and system design." />

        <div className="mx-auto mb-8 flex max-w-3xl flex-wrap justify-center gap-2">
          {skillCategories.map((group, i) => {
            const Icon = group.icon;
            return (
              <motion.button
                key={group.title}
                onClick={() => setActiveCategory(i)}
                className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition-all will-change-transform ${
                  activeCategory === i
                    ? "bg-cyanGlow/15 text-cyanGlow shadow-neon border border-cyanGlow/40"
                    : "bg-white/[0.06] text-slate-300 border border-white/10 hover:border-cyanGlow/30 hover:text-cyan-100"
                }`}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                aria-pressed={activeCategory === i}
              >
                <Icon className="h-4 w-4" />
                {group.title}
              </motion.button>
            );
          })}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            className="glass mx-auto max-w-2xl rounded-[2rem] p-6 sm:p-8"
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -16, scale: 0.98 }}
            transition={{ duration: 0.3, ease: easeOut }}
          >
            <div className="mb-6 flex items-center gap-3">
              {(() => {
                const Icon = skillCategories[activeCategory].icon;
                return <Icon className="h-6 w-6 text-cyanGlow" />;
              })()}
              <h3 className="font-display text-xl font-bold text-white">{skillCategories[activeCategory].title}</h3>
            </div>
            <div className="grid gap-4">
              {skillCategories[activeCategory].items.map((skill, i) => (
                <SkillBar key={skill.name} name={skill.name} level={skill.level} index={i} />
              ))}
            </div>
          </motion.div>
        </AnimatePresence>

        <motion.div
          className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-4"
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {skillCategories.map((group) => {
            const Icon = group.icon;
            return (
              <motion.div
                key={group.title}
                className="glass group rounded-[2rem] p-6 transition-all will-change-transform hover:-translate-y-2 hover:border-cyanGlow/40 hover:shadow-neon"
                variants={fadeUp}
              >
                <div className="mb-5 grid h-12 w-12 place-items-center rounded-2xl bg-white/10 text-cyanGlow transition-all group-hover:bg-cyanGlow/20 group-hover:shadow-neon">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="font-display text-xl font-bold text-white">{group.title}</h3>
                <p className="mt-2 text-sm text-slate-400">{group.items.length} skills</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {group.items.slice(0, 4).map((item) => (
                    <span key={item.name} className="rounded-full border border-white/10 bg-white/[0.06] px-3 py-1.5 text-xs font-semibold text-slate-300 transition group-hover:border-cyanGlow/20">
                      {item.name}
                    </span>
                  ))}
                  {group.items.length > 4 && (
                    <span className="rounded-full border border-cyanGlow/20 bg-cyanGlow/10 px-3 py-1.5 text-xs font-semibold text-cyan-200">
                      +{group.items.length - 4}
                    </span>
                  )}
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

/* ── Project Card ── */
function ProjectCard({ project, index }) {
  const [expanded, setExpanded] = useState(false);
  const Icon = project.icon;
  const isFeatured = project.featured;

  return (
    <motion.article
      className={`relative rounded-[2rem] overflow-hidden transition-all will-change-transform ${
        isFeatured ? "lg:col-span-2" : ""
      } ${expanded ? "shadow-neon-strong" : ""}`}
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, delay: index * 0.06 }}
      aria-label={`Project: ${project.title}`}
    >
      <div className={`glass neon-border h-full ${isFeatured ? "relative" : ""}`}>
        {isFeatured && (
          <div className="pointer-events-none absolute -inset-[1px] rounded-[inherit] opacity-0 transition-opacity duration-500 group-hover:opacity-100" aria-hidden="true">
            <div className="absolute inset-0 rounded-[inherit] bg-gradient-to-r from-cyanGlow/10 via-violetGlow/10 to-plasma/10 blur-xl" />
          </div>
        )}
        <div className="relative p-6 sm:p-7">
          <div className="flex items-start justify-between gap-4">
            <div className={`grid place-items-center rounded-2xl bg-cyanGlow/10 p-3 text-cyanGlow ${
              isFeatured ? "h-16 w-16" : "h-14 w-14"
            }`}>
              <Icon className={isFeatured ? "h-8 w-8" : "h-7 w-7"} aria-hidden="true" />
            </div>
            <div className="flex shrink-0 items-center gap-2">
              {isFeatured && (
                <span className="rounded-full border border-amber-400/30 bg-amber-400/10 px-3 py-1 text-xs font-bold text-amber-200">
                  Featured
                </span>
              )}
              <span className="rounded-full border border-violetGlow/30 bg-violetGlow/10 px-3 py-1 text-xs font-bold text-violet-100">
                {project.period}
              </span>
            </div>
          </div>

          <div className="mt-5 flex flex-wrap items-center gap-2">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-cyanGlow">{project.category}</p>
            {project.techStack && (
              <>
                <span className="hidden text-slate-600 sm:inline">·</span>
                <div className="hidden flex-wrap gap-1.5 sm:flex">
                  {project.techStack.slice(0, 3).map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full border border-white/10 bg-white/[0.06] px-2.5 py-0.5 text-[10px] font-semibold text-slate-400"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.techStack.length > 3 && (
                    <span className="text-[10px] font-semibold text-slate-500">+{project.techStack.length - 3}</span>
                  )}
                </div>
              </>
            )}
          </div>

          <h3 className={`mt-2 font-display font-bold text-white ${
            isFeatured ? "text-3xl sm:text-4xl" : "text-2xl"
          }`}>
            {project.title}
          </h3>

          <p className="mt-4 text-base leading-8 text-slate-300">{project.description}</p>

          <div className={`mt-6 grid gap-3 ${expanded ? "" : "sm:grid-cols-2"}`}>
            {project.highlights.slice(0, expanded ? project.highlights.length : 2).map((item) => (
              <div key={item} className="flex items-start gap-3 text-sm text-slate-300">
                <span className={`mt-1.5 h-2 w-2 shrink-0 rounded-full shadow-[0_0_8px_rgba(52,213,255,0.5)] ${
                  isFeatured ? "bg-violetGlow" : "bg-cyanGlow"
                }`} aria-hidden="true" />
                {item}
              </div>
            ))}
          </div>

          {project.highlights.length > 2 && (
            <motion.button
              onClick={() => setExpanded((v) => !v)}
              className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-cyan-200 transition hover:text-cyanGlow"
              whileHover={{ gap: "0.75rem" }}
              aria-expanded={expanded}
              aria-label={expanded ? "Show fewer highlights" : `Show all ${project.highlights.length} highlights`}
            >
              {expanded ? "Show less" : `View all ${project.highlights.length} highlights`}
              <ChevronRight className={`h-4 w-4 transition ${expanded ? "rotate-90" : ""}`} />
            </motion.button>
          )}

          <AnimatePresence>
            {expanded && project.techStack && (
              <motion.div
                className="mt-5 border-t border-white/10 pt-5"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-slate-400">Tech Stack</p>
                <div className="flex flex-wrap gap-2">
                  {project.techStack.map((tech) => (
                    <motion.span
                      key={tech}
                      className="rounded-full border border-cyanGlow/20 bg-cyanGlow/10 px-3 py-1.5 text-xs font-semibold text-cyan-200"
                      initial={{ opacity: 0, scale: 0.85 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.2 }}
                      whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(52,213,255,0.2)" }}
                    >
                      {tech}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.article>
  );
}

/* ── Projects ── */
function Projects() {
  const featured = projects.find((p) => p.featured);
  const others = projects.filter((p) => !p.featured);

  return (
    <section id="projects" className="relative py-24 sm:py-28">
      <SectionDivider />
      <div className="section-shell pt-16 sm:pt-20">
        <SectionHeading
          eyebrow="Projects"
          title="Academic systems with real-world operating logic."
          text="Each project is framed around architecture, workflow clarity, database structure, and interfaces that help people act on information."
        />

        {featured && (
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
          >
            <ProjectCard project={featured} index={0} />
          </motion.div>
        )}

        <motion.div
          className="grid gap-5 lg:grid-cols-2"
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.05 }}
        >
          {others.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index + 1} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ── Experience ── */
function Experience() {
  return (
    <section id="experience" className="relative py-24 sm:py-28">
      <div className="section-shell">
        <SectionHeading eyebrow="Experience" title="Education and technical growth." />
        <div className="relative mx-auto max-w-4xl">
          <div className="absolute left-5 top-0 hidden h-full w-px bg-gradient-to-b from-cyanGlow/30 via-violetGlow/30 to-transparent sm:block" aria-hidden="true">
            <motion.div
              className="absolute left-0 top-0 h-16 w-px bg-cyanGlow"
              animate={{ top: ["0%", "100%"] }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            />
          </div>
          {experience.map((item, index) => (
            <motion.div
              key={item.title}
              className="relative mb-5 sm:pl-16"
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <motion.span
                className="absolute left-0 top-7 hidden h-10 w-10 rounded-full border border-cyanGlow/40 bg-cyanGlow/10 shadow-neon sm:grid place-items-center"
                whileHover={{ scale: 1.1, boxShadow: "0 0 32px rgba(52,213,255,0.4)" }}
              >
                <span className="text-xs font-bold text-cyanGlow">{index + 1}</span>
              </motion.span>
              <div className="glass rounded-[2rem] p-6 transition-all will-change-transform hover:border-cyanGlow/30 hover:shadow-neon">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <h3 className="font-display text-xl font-bold text-white sm:text-2xl">{item.title}</h3>
                  <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-bold text-slate-300">{item.period}</span>
                </div>
                <p className="mt-2 font-semibold text-cyan-100">{item.organization}</p>
                <p className="mt-4 text-base leading-8 text-slate-300">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── UI/UX Showcase ── */
function UiUxShowcase() {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <section id="uiux" className="relative py-24 sm:py-28">
      <SectionDivider />
      <div className="section-shell pt-16 sm:pt-20">
        <SectionHeading
          eyebrow="UI/UX Showcase"
          title="Interface concepts for complex systems."
          text="A design direction shaped by dashboards, control panels, wireframes, and human-centered workflows."
        />
        <motion.div
          className="columns-1 gap-5 sm:columns-2 lg:columns-3 [&>*]:mb-5"
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.05 }}
        >
          {showcase.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                className={`glass neon-border relative overflow-hidden rounded-[2rem] p-6 break-inside-avoid transition-all will-change-transform ${
                  hoveredIndex === index ? "shadow-neon scale-[1.02]" : ""
                }`}
                variants={fadeUp}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <div className="absolute -right-10 -top-10 h-36 w-36 rounded-full bg-cyanGlow/10 blur-2xl" aria-hidden="true" />
                <div className="flex items-center gap-3">
                  <div className="grid h-12 w-12 place-items-center rounded-2xl bg-cyanGlow/10 text-cyanGlow">
                    <Icon className="h-6 w-6" />
                  </div>
                  {item.tags && (
                    <div className="flex flex-wrap gap-1.5">
                      {item.tags.map((tag) => (
                        <span key={tag} className="rounded-full border border-white/10 bg-white/[0.06] px-2 py-0.5 text-[10px] font-semibold text-slate-400">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
                <h3 className="mt-5 font-display text-2xl font-bold text-white">{item.title}</h3>
                <p className="mt-3 leading-7 text-slate-300">{item.text}</p>
                <motion.div
                  className="mt-6 rounded-3xl border border-white/10 bg-slate-950/55 p-4 transition-all"
                  animate={hoveredIndex === index ? {
                    borderColor: "rgba(52, 213, 255, 0.3)",
                    boxShadow: "0 0 32px rgba(52, 213, 255, 0.08)",
                  } : {}}
                >
                  <div className="mb-3 flex gap-2">
                    <span className="h-3 w-3 rounded-full bg-cyanGlow" />
                    <span className="h-3 w-3 rounded-full bg-violetGlow" />
                    <span className="h-3 w-3 rounded-full bg-plasma" />
                  </div>
                  <div className="space-y-2">
                    <span className="block h-3 w-3/4 rounded-full bg-white/15" />
                    <span className="block h-3 w-full rounded-full bg-white/10" />
                    <span className="block h-3 w-1/2 rounded-full bg-cyanGlow/30" />
                  </div>
                  <motion.div
                    className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-white/10"
                    initial={{ opacity: 0 }}
                    animate={hoveredIndex === index ? { opacity: 1 } : { opacity: 0 }}
                  >
                    <motion.div
                      className="h-full rounded-full bg-gradient-to-r from-cyanGlow to-violetGlow"
                      animate={hoveredIndex === index ? { x: ["-100%", "100%"] } : {}}
                      transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                    />
                  </motion.div>
                </motion.div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

/* ── Contact ── */
function Contact() {
  const [formState, setFormState] = useState({ name: "", email: "", message: "" });
  const [formStatus, setFormStatus] = useState("idle");
  const [touched, setTouched] = useState({});

  const isValid = formState.name.trim() && formState.email.trim() && formState.message.trim();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isValid) {
      setTouched({ name: true, email: true, message: true });
      return;
    }
    setFormStatus("sending");
    const mailto = `mailto:${profile.email}?subject=Portfolio Contact from ${encodeURIComponent(formState.name)}&body=${encodeURIComponent(formState.message)}`;
    window.open(mailto);
    setTimeout(() => setFormStatus("idle"), 1200);
  };

  return (
    <section id="contact" className="relative py-24 sm:py-28">
      <SectionDivider />
      <div className="section-shell pt-16 sm:pt-20">
        <div className="glass neon-border grid gap-8 rounded-[2rem] p-7 transition-all will-change-transform hover:shadow-neon lg:grid-cols-[1fr_1.1fr] lg:p-10">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.24em] text-cyanGlow">Contact</p>
            <h2 className="mt-4 font-heading text-3xl font-bold leading-tight text-white sm:text-5xl">
              Open to internships and collaborative technical projects.
            </h2>
            <p className="mt-5 text-base leading-8 text-slate-300">
              Reach out for AI systems, web app, database design, or UI/UX-focused opportunities. Let's build something intelligent together.
            </p>

            <div className="mt-8 flex gap-3">
              {[
                { href: profile.linkedin, icon: Share2, label: "LinkedIn" },
                { href: profile.github, icon: Code2, label: "GitHub" },
                { href: `mailto:${profile.email}`, icon: Mail, label: "Email" },
              ].map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group grid h-12 w-12 place-items-center rounded-full bg-white/10 text-white transition-all will-change-transform hover:-translate-y-1 hover:bg-cyanGlow/20 hover:shadow-neon"
                  aria-label={link.label}
                >
                  <link.icon className="h-5 w-5 transition group-hover:scale-110 group-hover:text-cyanGlow" />
                </a>
              ))}
            </div>

            <div className="mt-8 grid gap-3">
              {contactCards.map((card) => {
                const Icon = card.icon;
                return (
                  <a
                    key={card.label}
                    href={card.href}
                    target={card.href.startsWith("http") ? "_blank" : undefined}
                    rel={card.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="group flex items-center justify-between gap-4 rounded-3xl border border-white/10 bg-white/[0.06] p-4 transition-all will-change-transform hover:border-cyanGlow/40 hover:bg-cyanGlow/10 hover:shadow-neon"
                  >
                    <span className="flex min-w-0 items-center gap-4">
                      <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-cyanGlow/10 text-cyanGlow transition group-hover:bg-cyanGlow/20">
                        <Icon className="h-5 w-5" aria-hidden="true" />
                      </span>
                      <span className="min-w-0">
                        <span className="block text-xs font-bold uppercase tracking-[0.18em] text-slate-500">{card.label}</span>
                        <span className="block truncate text-sm font-semibold text-slate-100 sm:text-base">{card.value}</span>
                      </span>
                    </span>
                    <ExternalLink className="h-4 w-4 shrink-0 text-slate-500 transition group-hover:text-cyanGlow" />
                  </a>
                );
              })}
            </div>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5" noValidate>
            {(["name", "email", "message"]).map((field) => {
              const label = field === "name" ? "Name" : field === "email" ? "Email" : "Message";
              const placeholder = field === "name" ? "Your name" : field === "email" ? "your@email.com" : "Tell me about your project or opportunity...";
              const isTextarea = field === "message";
              const Tag = isTextarea ? "textarea" : "input";
              const showError = touched[field] && !formState[field].trim();

              return (
                <div key={field} className="group relative">
                  <label htmlFor={field} className="mb-1.5 block text-xs font-bold uppercase tracking-[0.18em] text-slate-400 transition group-focus-within:text-cyanGlow">
                    {label}
                  </label>
                  <Tag
                    id={field}
                    type={isTextarea ? undefined : field}
                    required
                    rows={isTextarea ? 4 : undefined}
                    value={formState[field]}
                    onChange={(e) => setFormState((s) => ({ ...s, [field]: e.target.value }))}
                    onBlur={() => setTouched((s) => ({ ...s, [field]: true }))}
                    placeholder={placeholder}
                    aria-invalid={showError}
                    aria-describedby={showError ? `${field}-error` : undefined}
                    className={`w-full rounded-2xl border bg-white/[0.06] px-5 py-3.5 text-sm text-white outline-none transition placeholder:text-slate-500 focus:bg-white/[0.08] focus:shadow-[0_0_24px_rgba(52,213,255,0.15)] resize-none ${
                      showError ? "border-red-400/40" : "border-white/10 focus:border-cyanGlow/40"
                    }`}
                  />
                  {showError && (
                    <p id={`${field}-error`} className="mt-1 text-xs text-red-300" role="alert">
                      {label} is required
                    </p>
                  )}
                </div>
              );
            })}

            <motion.button
              type="submit"
              disabled={formStatus === "sending"}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-cyanGlow/30 bg-cyanGlow/10 px-6 py-3.5 text-sm font-bold text-white shadow-neon transition-all will-change-transform hover:-translate-y-0.5 hover:bg-cyanGlow/20 hover:shadow-[0_0_48px_rgba(52,213,255,0.25)] disabled:opacity-60 disabled:hover:translate-y-0"
              whileTap={{ scale: 0.97 }}
            >
              {formStatus === "sending" ? (
                <span className="flex items-center gap-2">
                  <motion.span animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }}>
                    <Send className="h-4 w-4" />
                  </motion.span>
                  Sending...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  Send Message <Send className="h-4 w-4" />
                </span>
              )}
            </motion.button>
          </form>
        </div>
      </div>
    </section>
  );
}

/* ── Footer ── */
function Footer() {
  return (
    <footer className="border-t border-white/10 py-10" role="contentinfo">
      <div className="section-shell flex flex-col items-center justify-between gap-5 text-sm text-slate-400 sm:flex-row">
        <p>Designed & built with purpose by <span className="text-cyan-100">{profile.name}</span>.</p>
        <div className="flex items-center gap-6">
          {[
            { href: profile.github, label: "GitHub" },
            { href: profile.linkedin, label: "LinkedIn" },
            { href: `mailto:${profile.email}`, label: "Email" },
          ].map((link) => (
            <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer" className="transition hover:text-cyanGlow">
              {link.label}
            </a>
          ))}
          <a href="#home" className="inline-flex items-center gap-2 text-cyan-100 transition hover:text-cyanGlow">
            Back to top <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </footer>
  );
}

/* ── App (root) ── */
export default function App() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Particles />
      <CursorGlow />
      <Background />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <UiUxShowcase />
        <Contact />
      </main>
      <Footer />
    </motion.div>
  );
}
