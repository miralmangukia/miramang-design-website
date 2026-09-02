import { useState, useLayoutEffect, useRef, useEffect, type ReactNode } from "react";
import characterImg from "@/imports/Screenshot_2026-08-24_at_12.06.44_PM.png";
import logoMarkImg from "@/imports/Screenshot_2026-08-24_at_12.07.25_PM.png";
import CaseStudyFitPilot from "./CaseStudyFitPilot";

// ════════════════════════════════════════════════════════════════
// ✏️  EASY EDITS — change the values below yourself, anytime.
//
// How to use this:
//   1. Open this file in a plain text editor (TextEdit in "Make
//      Plain Text" mode works, or a free code editor like VS Code).
//   2. Only change the values in THIS block — text between quotes
//      "like this", or numbers like this: 72.
//   3. Save the file.
//   4. Double-click "deploy_vercel.command" in the website folder
//      to rebuild and publish the site. That's it — no need to
//      message Claude for changes like these.
//
// If you want a bigger change (new section, new page, layout
// restructure), that's still worth asking Claude for.
// ════════════════════════════════════════════════════════════════

// Top nav links (label shown, then the section it scrolls to — don't
// change the second value, only the text before the comma).
const NAV_LINKS: [string, string][] = [
  ["Work", "work"],
  ["Who is Miral?", "about"],
  ["Contact", "contact"],
];

// Logo mark size in the top-left corner of the nav bar (in pixels).
const LOGO_WIDTH = 72;
// "MIRAL MANGUKIA" text size next to the logo mark (in pixels).
const LOGO_TEXT_SIZE = 16;

// Hero character illustration (the drawing on the homepage).
// More negative = pulled further UP the page. 0 = no vertical shift.
// Tuned so the character's feet line up with the bottom of the
// "See My Work" / "Let's Chat" buttons.
const HERO_CHARACTER_OFFSET_Y = -116;
// Left/right breathing room around the character illustration.
const HERO_CHARACTER_SIDE_MARGIN = 50;
// Max width of the character illustration (in pixels).
const HERO_CHARACTER_MAX_WIDTH = 500;

// ── COLORS ──────────────────────────────────────────────────────
// Every color on the site is one of these six. Change a hex code
// here (keep the # and quotes) and it updates everywhere that
// color is used — no need to hunt through the file. Use a color
// picker like coolors.co or the one built into Mac's Preview app
// to find hex codes.
//
//   CREAM    → page background, nav bar background
//   CHARCOAL → main text color, footer text, dark button fills
//   ORANGE   → "UX Designer" label, accent underline, Cartly card,
//              "Drop Me an Email" button
//   BLUE     → FitPilot card, "actually shipped." accent text,
//              "Work With Me" button, one stat tile
//   YELLOW   → Finova card, one stat tile
//   PINK     → Bloom card, "Get In Touch" label, one stat tile
const CREAM = "#F7F2E8";
const CHARCOAL = "#252525";
const ORANGE = "#E95D3C";
const BLUE = "#3478C8";
const YELLOW = "#F5C94A";
const PINK = "#F3A6B5";

// ════════════════════════════════════════════════════════════════
// End of easy edits — everything below this line is layout code.
// ════════════════════════════════════════════════════════════════

const BTN_H = 44;
const AH = 7; // amplitude for top / bottom edges
const AV = 5; // amplitude for left / right edges (shorter wavelength → smaller)

// Builds a pixel-exact wavy closed path for a W×BTN_H rectangle.
// Odd half-wave count on every edge guarantees both endpoints land on an
// outward peak, so adjacent edges combine into large corner blobs.
function buildWavyPath(W: number): string {
  const H = BTN_H;
  // 8 scallops = 15 half-waves (odd, so both ends land on outward peak)
  // 2 scallops on sides = 3 half-waves
  const hT = 15;
  const dH = W / hT;
  const hS = 3;
  const dV = H / hS;
  const s: string[] = ["M 0 0"];
  for (let i = 0; i < hT; i++) {
    const cx = ((i + 0.5) * dH).toFixed(2);
    const cy = i % 2 === 0 ? -AH : AH;
    s.push(`Q ${cx} ${cy} ${((i + 1) * dH).toFixed(2)} 0`);
  }
  for (let i = 0; i < hS; i++) {
    const cx = i % 2 === 0 ? W + AV : W - AV;
    const cy = ((i + 0.5) * dV).toFixed(2);
    s.push(`Q ${cx} ${cy} ${W} ${((i + 1) * dV).toFixed(2)}`);
  }
  for (let i = 0; i < hT; i++) {
    const cx = (W - (i + 0.5) * dH).toFixed(2);
    const cy = i % 2 === 0 ? H + AH : H - AH;
    s.push(`Q ${cx} ${cy} ${(W - (i + 1) * dH).toFixed(2)} ${H}`);
  }
  for (let i = 0; i < hS; i++) {
    const cx = i % 2 === 0 ? -AV : AV;
    const cy = (H - (i + 0.5) * dV).toFixed(2);
    s.push(`Q ${cx} ${cy} 0 ${(H - (i + 1) * dV).toFixed(2)}`);
  }
  s.push("Z");
  return s.join(" ");
}

function WavyButton({
  children,
  bg = CHARCOAL,
  fg = "#ffffff",
  onClick,
  className = "",
  fixedWidth,
  outline,
}: {
  children: ReactNode;
  bg?: string;
  fg?: string;
  onClick?: () => void;
  className?: string;
  fixedWidth?: number;
  outline?: boolean;
}) {
  const ref = useRef<HTMLButtonElement>(null);
  const [dim, setDim] = useState<{ w: number; path: string } | null>(
    fixedWidth ? { w: fixedWidth, path: buildWavyPath(fixedWidth) } : null
  );

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const w = fixedWidth ?? el.offsetWidth;
    if (w > 0) setDim({ w, path: buildWavyPath(w) });
  }, [fixedWidth]);

  return (
    <button
      ref={ref}
      onClick={onClick}
      className={`relative inline-flex items-center justify-center cursor-pointer select-none transition-transform hover:scale-105 active:scale-95 ${className}`}
      style={{
        height: BTN_H,
        width: fixedWidth,
        padding: `0 ${AV + 24}px`,
        minWidth: fixedWidth ? undefined : 130,
        background: "transparent",
        border: "none",
      }}
    >
      {dim && (
        <svg
          aria-hidden="true"
          width={dim.w}
          height={BTN_H}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            overflow: "visible",
            pointerEvents: "none",
          }}
        >
          <path
            d={dim.path}
            fill={outline ? "transparent" : bg}
            stroke={outline ? bg : "none"}
            strokeWidth={outline ? 2 : 0}
          />
        </svg>
      )}
      <span
        className="relative z-10 text-[15px] font-bold leading-none"
        style={{ fontFamily: "'Inria Sans', sans-serif", color: fg }}
      >
        {children}
      </span>
    </button>
  );
}

const projects = [
  {
    title: "FitPilot",
    desc: "Designing a fitness app that lowers the barrier to starting — because the hardest part is showing up.",
    category: "Mobile App Design",
    bg: BLUE,
    fg: "#ffffff",
    caseStudy: "fitpilot",
  },
  {
    title: "Bloom",
    desc: "A brand identity for a plant-care startup that feels as lush and alive as the product.",
    category: "Brand Identity",
    bg: PINK,
    fg: CHARCOAL,
    cta: "Coming Soon",
  },
  {
    title: "Finova",
    desc: "Turning a cluttered fintech dashboard into something humans actually want to use daily.",
    category: "UX / Product Design",
    bg: YELLOW,
    fg: CHARCOAL,
    cta: "Something Is Cooking",
  },
  {
    title: "Cartly",
    desc: "Reducing checkout abandonment by redesigning the friction, one confusing step at a time.",
    category: "UX Research & Design",
    bg: ORANGE,
    fg: "#ffffff",
    cta: "Loading...",
  },
];

const skills = [
  "UX Research",
  "Product Design",
  "Brand Identity",
  "Prototyping",
  "Design Systems",
  "Interaction Design",
];

const stats = [
  { num: "40+", label: "Projects shipped", color: YELLOW, fg: CHARCOAL },
  { num: "12", label: "Happy clients", color: BLUE, fg: "#ffffff" },
  { num: "0", label: "Lorem ipsums used", color: PINK, fg: CHARCOAL },
  { num: "∞", label: "Cups of coffee", color: ORANGE, fg: "#ffffff" },
];

export default function App() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [hash, setHash] = useState(() => window.location.hash);

  useEffect(() => {
    const onHashChange = () => setHash(window.location.hash);
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [hash]);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMobileOpen(false);
  };

  const goHome = () => {
    window.location.hash = "";
  };

  if (hash === "#/case-study/fitpilot") {
    return <CaseStudyFitPilot onBack={goHome} />;
  }

  return (
    <div
      className="min-h-screen"
      style={{
        backgroundColor: CREAM,
        color: CHARCOAL,
        fontFamily: "'Inria Sans', sans-serif",
      }}
    >
      {/* ── NAV ── */}
      <nav
        className="sticky top-0 z-50 border-b"
        style={{ backgroundColor: CREAM, borderColor: "rgba(37,37,37,0.1)" }}
      >
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
          {/* Logo mark + wordmark */}
          <button
            onClick={() => scrollTo("hero")}
            className="flex items-center gap-3"
          >
            <img
              src={logoMarkImg}
              alt="MM logo mark"
              style={{
                width: LOGO_WIDTH,
                height: "auto",
                mixBlendMode: "multiply",
              }}
            />
            <span
              className="tracking-[0.22em] uppercase font-bold hidden sm:block"
              style={{ color: CHARCOAL, fontSize: LOGO_TEXT_SIZE }}
            >
              MIRAL MANGUKIA
            </span>
          </button>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-10">
            {NAV_LINKS.map(([label, id]) => (
              <button
                key={id}
                onClick={() => scrollTo(id)}
                className="text-base font-semibold tracking-wide transition-opacity hover:opacity-50"
              >
                {label}
              </button>
            ))}
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden flex flex-col gap-1.5 p-1"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            <span className="block w-6 h-0.5" style={{ backgroundColor: CHARCOAL }} />
            <span className="block w-6 h-0.5" style={{ backgroundColor: CHARCOAL }} />
            <span className="block w-6 h-0.5" style={{ backgroundColor: CHARCOAL }} />
          </button>
        </div>

        {mobileOpen && (
          <div
            className="md:hidden px-6 pb-5 flex flex-col gap-5 border-t"
            style={{ backgroundColor: CREAM, borderColor: "rgba(37,37,37,0.1)" }}
          >
            {NAV_LINKS.map(([label, id]) => (
              <button
                key={id}
                onClick={() => scrollTo(id)}
                className="text-left text-xl font-semibold pt-4"
              >
                {label}
              </button>
            ))}
          </div>
        )}
      </nav>

      {/* ── HERO ── */}
      <section
        id="hero"
        className="max-w-7xl mx-auto px-6 pt-12 pb-0 min-h-[88vh] grid md:grid-cols-2 gap-8 items-end"
      >
        {/* Left: headline + CTA */}
        <div className="pb-16 md:pb-20">
          <div className="flex items-center gap-3 mb-7">
            <span className="w-8 h-0.5 inline-block" style={{ backgroundColor: ORANGE }} />
            <span
              className="text-sm font-bold tracking-[0.2em] uppercase"
              style={{ color: ORANGE }}
            >
              UX Designer
            </span>
          </div>

          <h1
            className="leading-tight mb-7"
            style={{ fontSize: "clamp(2.6rem, 5vw, 3.75rem)" }}
          >
            <span className="font-black" style={{ fontFamily: "'Rammetto One', serif" }}>
              Making the{" "}
            </span>
            <span
              style={{
                fontFamily: "'Sue Ellen Francisco', cursive",
                fontSize: "1.08em",
              }}
            >
              INTERNET,
            </span>
            <br />
            <span className="font-black" style={{ fontFamily: "'Rammetto One', serif" }}>
              Slightly less{" "}
            </span>
            <span
              style={{
                fontFamily: "'Sue Ellen Francisco', cursive",
                fontSize: "1.08em",
              }}
            >
              ANNOYING.
            </span>
          </h1>

          <p
            className="text-xl mb-10 max-w-md leading-relaxed"
            style={{ color: "rgba(37,37,37,0.65)" }}
          >
            Fewer "where do I click?" moments and more "oh, that was easy."
            That's the kind of experience I like to design.
          </p>

          <div className="flex flex-wrap gap-[16px]">
            <WavyButton bg="#F96C00" fg={CHARCOAL} fixedWidth={165} onClick={() => scrollTo("work")}>
              See My Work
            </WavyButton>
            <WavyButton bg={ORANGE} fg={ORANGE} fixedWidth={165} outline onClick={() => scrollTo("contact")}>
              {"Let's Chat"}
            </WavyButton>
          </div>

          <div className="flex items-center gap-3 mt-9">
            <span
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: "#3BB273" }}
            />
            <span className="text-sm font-semibold" style={{ color: "rgba(37,37,37,0.5)" }}>
              Available for freelance
            </span>
          </div>
        </div>

        {/* Right: character illustration */}
        <div className="flex justify-center md:justify-end items-end">
          <img
            src={characterImg}
            alt="Miral Mangukia illustrated character — a young woman walking with a tote bag and iced coffee"
            style={{
              width: `min(${HERO_CHARACTER_MAX_WIDTH}px, 95vw)`,
              height: "auto",
              display: "block",
              mixBlendMode: "multiply",
              marginLeft: HERO_CHARACTER_SIDE_MARGIN,
              marginRight: HERO_CHARACTER_SIDE_MARGIN,
              transform: `translateY(${HERO_CHARACTER_OFFSET_Y}px)`,
            }}
          />
        </div>
      </section>

      {/* ── MARQUEE STRIP ── */}
      <div
        className="border-y py-4 overflow-hidden"
        style={{ backgroundColor: CHARCOAL, borderColor: CHARCOAL }}
      >
        <style>{`
          @keyframes marquee-bounce {
            from { transform: translateX(0); }
            to   { transform: translateX(-50%); }
          }
        `}</style>
        <div
          className="flex gap-0 whitespace-nowrap text-sm font-bold tracking-[0.18em] uppercase"
          style={{
            color: CREAM,
            animation: "marquee-bounce 22s ease-in-out infinite alternate",
          }}
        >
          {Array.from({ length: 10 }).map((_, i) => (
            <span key={i} className="flex items-center gap-10 pr-10">
              <span>UX Design</span>
              <span style={{ color: ORANGE }}>✦</span>
              <span>Product Strategy</span>
              <span style={{ color: YELLOW }}>✦</span>
              <span>Brand Identity</span>
              <span style={{ color: PINK }}>✦</span>
              <span>Interaction Design</span>
              <span style={{ color: BLUE }}>✦</span>
            </span>
          ))}
        </div>
      </div>

      {/* ── WORK ── */}
      <section id="work" className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-12">
            <p
              className="text-sm font-bold tracking-[0.25em] uppercase mb-3"
              style={{ color: ORANGE }}
            >
              Selected Work
            </p>
            <h2
              className="leading-tight"
              style={{
                fontFamily: "'Rammetto One', serif",
                fontSize: "clamp(2rem, 4vw, 3rem)",
              }}
            >
              Projects that{" "}
              <span
                style={{
                  fontFamily: "'Sue Ellen Francisco', cursive",
                  color: BLUE,
                  fontSize: "1.1em",
                }}
              >
                actually shipped.
              </span>
            </h2>
          </div>

          <style>{`
            @keyframes card-float {
              0%, 100% { transform: translateY(0px); }
              50%       { transform: translateY(-10px); }
            }
            .project-card:hover { animation: card-float 1.6s ease-in-out infinite; }
          `}</style>
          <div className="grid md:grid-cols-2 gap-6">
            {projects.map((p) => (
              <div
                key={p.title}
                className="project-card rounded-2xl p-8 flex flex-col gap-5 cursor-pointer"
                style={{ backgroundColor: p.bg }}
              >
                <span
                  className="text-xs font-bold tracking-[0.18em] uppercase px-3 py-1.5 rounded-full self-start"
                  style={{ backgroundColor: "rgba(0,0,0,0.13)", color: p.fg }}
                >
                  {p.category}
                </span>

                <div>
                  <h3
                    className="text-4xl font-black mb-3"
                    style={{ fontFamily: "Georgia, serif", color: p.fg }}
                  >
                    {p.title}
                  </h3>
                  <p className="text-base leading-relaxed" style={{ color: p.fg, opacity: 0.82 }}>
                    {p.desc}
                  </p>
                </div>

                <WavyButton
                  bg={
                    p.fg === "#ffffff"
                      ? "rgba(255,255,255,0.22)"
                      : "rgba(37,37,37,0.85)"
                  }
                  fg="#ffffff"
                  className="self-start"
                  onClick={
                    p.caseStudy
                      ? () => {
                          window.location.hash = `#/case-study/${p.caseStudy}`;
                        }
                      : undefined
                  }
                >
                  {p.cta ?? "View Project"}
                </WavyButton>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section
        id="about"
        className="py-20 border-t"
        style={{ borderColor: "rgba(37,37,37,0.1)" }}
      >
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-start">
          <div>
            <p
              className="text-sm font-bold tracking-[0.25em] uppercase mb-3"
              style={{ color: BLUE }}
            >
              Who is Miral?
            </p>
            <h2
              className="leading-tight mb-8"
              style={{
                fontFamily: "'Rammetto One', serif",
                fontSize: "clamp(2rem, 4vw, 3rem)",
              }}
            >
              A designer who{" "}
              <span
                style={{
                  fontFamily: "'Sue Ellen Francisco', cursive",
                  color: ORANGE,
                  fontSize: "1.1em",
                }}
              >
                actually cares
              </span>{" "}
              about users.
            </h2>

            <div
              className="space-y-5 text-lg leading-relaxed"
              style={{ color: "rgba(37,37,37,0.75)" }}
            >
              <p>
                Hi! I'm Miral — product designer, interface fixer, and
                professional overthinker of button states. I specialize in
                turning digital experiences from "what does this even do?" to
                "oh, that just makes sense."
              </p>
              <p>
                My process lives at the intersection of UX research, visual
                design, and a genuine obsession with getting things right. I
                care about the micro-interactions as much as the big picture.
              </p>
              <p>
                When I'm not redesigning checkout flows, you'll find me at a
                coffee shop with a tote bag and an unsolicited opinion about
                font kerning.
              </p>
            </div>

            <div className="flex flex-wrap gap-2.5 mt-8">
              {skills.map((s) => (
                <span
                  key={s}
                  className="px-4 py-2 rounded-full text-sm font-bold"
                  style={{ backgroundColor: "rgba(37,37,37,0.08)", color: CHARCOAL }}
                >
                  {s}
                </span>
              ))}
            </div>

            <div className="mt-10">
              <WavyButton bg={BLUE} fg="#ffffff" onClick={() => scrollTo("contact")}>
                Work With Me
              </WavyButton>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {stats.map((s) => (
              <div
                key={s.label}
                className="rounded-2xl p-6 flex flex-col gap-2"
                style={{ backgroundColor: s.color }}
              >
                <span
                  className="text-5xl font-black leading-none"
                  style={{ fontFamily: "'Rammetto One', serif", color: s.fg }}
                >
                  {s.num}
                </span>
                <span
                  className="text-sm font-bold leading-snug mt-1"
                  style={{ fontFamily: "Georgia, serif", color: s.fg, opacity: 0.85 }}
                >
                  {s.label}
                </span>
              </div>
            ))}

            <div
              className="col-span-2 rounded-2xl p-6"
              style={{ backgroundColor: CHARCOAL }}
            >
              <p
                className="text-sm font-bold tracking-[0.18em] uppercase mb-4"
                style={{ color: ORANGE }}
              >
                My Process
              </p>
              <div className="flex gap-3 flex-wrap items-center">
                {["Research", "Define", "Design", "Test", "Ship"].map((step, i) => (
                  <div key={step} className="flex items-center gap-3">
                    <span
                      className="text-base font-bold"
                      style={{ fontFamily: "Georgia, serif", color: CREAM }}
                    >
                      {step}
                    </span>
                    {i < 4 && (
                      <span className="text-sm font-bold" style={{ color: ORANGE }}>
                        →
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section
        id="contact"
        className="py-28 border-t text-center"
        style={{ borderColor: "rgba(37,37,37,0.1)" }}
      >
        <div className="max-w-2xl mx-auto px-6">
          <p
            className="text-sm font-bold tracking-[0.25em] uppercase mb-4"
            style={{ color: PINK }}
          >
            Get In Touch
          </p>
          <h2
            className="leading-tight mb-6"
            style={{
              fontFamily: "'Rammetto One', serif",
              fontSize: "clamp(2.2rem, 5vw, 3.5rem)",
            }}
          >
            {"Let's make something "}
            <span
              style={{
                fontFamily: "'Sue Ellen Francisco', cursive",
                color: BLUE,
                fontSize: "1.1em",
              }}
            >
              worth clicking.
            </span>
          </h2>
          <p
            className="text-xl mb-12 leading-relaxed"
            style={{ color: "rgba(37,37,37,0.65)" }}
          >
            Got a project, an idea, or just want to chat about why your checkout
            flow has 14 steps? I&apos;m in.
          </p>

          <div className="flex flex-wrap justify-center gap-5">
            <WavyButton bg={ORANGE} fg="#ffffff">
              Drop Me an Email
            </WavyButton>
            <WavyButton bg={CHARCOAL} fg="#ffffff">
              View Resume
            </WavyButton>
          </div>

          <div className="flex justify-center gap-8 mt-12">
            {[
              { label: "LinkedIn", href: "https://www.linkedin.com/in/miral-mangukia-082928197" },
              { label: "Dribbble" },
              { label: "Read.cv" },
            ].map(({ label, href }) =>
              href ? (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-bold tracking-wide underline underline-offset-4 transition-opacity hover:opacity-50"
                  style={{ color: CHARCOAL }}
                >
                  {label}
                </a>
              ) : (
                <button
                  key={label}
                  className="text-sm font-bold tracking-wide underline underline-offset-4 transition-opacity hover:opacity-50"
                  style={{ color: CHARCOAL }}
                >
                  {label}
                </button>
              )
            )}
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer
        className="py-7 border-t text-center"
        style={{ borderColor: "rgba(37,37,37,0.1)" }}
      >
        <p className="text-sm" style={{ color: "rgba(37,37,37,0.45)" }}>
          © {new Date().getFullYear()} Miral Mangukia — Designed with too much coffee and not enough sleep.
        </p>
      </footer>
    </div>
  );
}
