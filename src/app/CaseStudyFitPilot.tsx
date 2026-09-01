import { type ReactNode, useEffect, useState } from "react";
import dashboardImg from "@/imports/fitpilot/fitpilot-dashboard.png";
import welcomeImg from "@/imports/fitpilot/fitpilot-welcome.png";
import goalImg from "@/imports/fitpilot/fitpilot-onboarding-goal.png";
import planReadyImg from "@/imports/fitpilot/fitpilot-plan-ready.png";
import overviewImg from "@/imports/fitpilot/fitpilot-overview.png";
import personaAbhishekImg from "@/imports/fitpilot/persona-abhishek.png";
import personaGoralImg from "@/imports/fitpilot/persona-goral.png";
import q2TimeEmptyImg from "@/imports/fitpilot/fitpilot-q2-time-empty.png";
import q3ExperienceEmptyImg from "@/imports/fitpilot/fitpilot-q3-experience-empty.png";
import q4DaysEmptyImg from "@/imports/fitpilot/fitpilot-q4-days-empty.png";
import q1GoalSelectedImg from "@/imports/fitpilot/fitpilot-q1-goal-selected.png";
import q2TimeSelectedImg from "@/imports/fitpilot/fitpilot-q2-time-selected.png";
import q3ExperienceSelectedImg from "@/imports/fitpilot/fitpilot-q3-experience-selected.png";
import q4DaysSelectedImg from "@/imports/fitpilot/fitpilot-q4-days-selected.png";

const CREAM = "#F7F2E8";
const CHARCOAL = "#252525";
const ORANGE = "#E95D3C";
const BLUE = "#3478C8";
const YELLOW = "#F5C94A";
const PINK = "#F3A6B5";
const GREEN = "#7EE787";
const PURPLE = "#A388EE";

function Eyebrow({ color, children }: { color: string; children: ReactNode }) {
  return (
    <p
      className="text-sm font-bold tracking-[0.25em] uppercase mb-3"
      style={{ color }}
    >
      {children}
    </p>
  );
}

function SectionHeading({
  eyebrow,
  eyebrowColor,
  accentColor,
  children,
  accent,
}: {
  eyebrow: string;
  eyebrowColor: string;
  accentColor: string;
  children: ReactNode;
  accent: string;
}) {
  return (
    <div className="mb-10">
      <Eyebrow color={eyebrowColor}>{eyebrow}</Eyebrow>
      <h2
        className="leading-tight"
        style={{
          fontFamily: "'Rammetto One', serif",
          fontSize: "clamp(1.9rem, 3.6vw, 2.75rem)",
        }}
      >
        {children}{" "}
        <span
          style={{
            fontFamily: "'Sue Ellen Francisco', cursive",
            color: accentColor,
            fontSize: "1.1em",
          }}
        >
          {accent}
        </span>
      </h2>
    </div>
  );
}

function Pill({ bg, fg, children }: { bg: string; fg: string; children: ReactNode }) {
  return (
    <span
      className="text-xs font-bold tracking-[0.1em] uppercase px-3 py-1.5 rounded-full inline-block"
      style={{ backgroundColor: bg, color: fg }}
    >
      {children}
    </span>
  );
}

function FactCard({ label, value, bg, fg }: { label: string; value: string; bg: string; fg: string }) {
  return (
    <div className="rounded-2xl p-5 flex flex-col gap-1" style={{ backgroundColor: bg }}>
      <span className="text-xs font-bold tracking-[0.15em] uppercase" style={{ color: fg, opacity: 0.75 }}>
        {label}
      </span>
      <span className="text-xl font-black" style={{ fontFamily: "Georgia, serif", color: fg }}>
        {value}
      </span>
    </div>
  );
}

function FlowStep({ label, bg, fg }: { label: string; bg: string; fg: string }) {
  return (
    <span
      className="text-sm font-bold px-4 py-2.5 rounded-xl inline-block border-2"
      style={{ backgroundColor: bg, color: fg, borderColor: CHARCOAL }}
    >
      {label}
    </span>
  );
}

function FlowArrow() {
  return (
    <span className="text-xl font-black shrink-0" style={{ color: CHARCOAL, opacity: 0.4 }}>
      →
    </span>
  );
}

function FlowRow({ steps, colors }: { steps: string[]; colors: string[] }) {
  return (
    <div className="flex flex-wrap items-center gap-2.5">
      {steps.map((s, i) => (
        <div key={s} className="flex items-center gap-2.5">
          <FlowStep label={s} bg={colors[i % colors.length]} fg={CHARCOAL} />
          {i < steps.length - 1 && <FlowArrow />}
        </div>
      ))}
    </div>
  );
}

function PersonaCard({
  img,
  alt,
}: {
  img: string;
  alt: string;
}) {
  return (
    <div
      className="rounded-2xl overflow-hidden border-2"
      style={{ borderColor: CHARCOAL }}
    >
      <img src={img} alt={alt} className="w-full h-auto block" loading="lazy" />
    </div>
  );
}

type Screen =
  | { kind: "static"; img: string; alt: string; dwell?: number }
  | {
      kind: "interactive";
      before: string;
      after: string;
      alt: string;
      dwell?: number;
      tapAt?: number;
    };

/**
 * A phone-shaped frame — dark bezel, a Dynamic-Island-style notch, and
 * side buttons, so it actually reads as a phone rather than a rounded
 * rectangle — that cycles through real UI screens with an
 * Instagram-story-style slide transition. "Interactive" screens (the
 * onboarding questions) pause, then visibly tap 2–3 answer cards into
 * their selected state before sliding on, mimicking someone actually
 * using the app.
 */
function ScreenSlider({
  screens,
  maxWidth = 300,
  defaultDwell = 2400,
}: {
  screens: Screen[];
  maxWidth?: number;
  defaultDwell?: number;
}) {
  const [index, setIndex] = useState(0);
  const [tapped, setTapped] = useState(false);

  useEffect(() => {
    if (screens.length === 0) return;
    setTapped(false);
    const current = screens[index];
    const dwell = current.dwell ?? defaultDwell;
    const timers: ReturnType<typeof setTimeout>[] = [];

    if (current.kind === "interactive") {
      const tapAt = current.tapAt ?? Math.round(dwell * 0.42);
      timers.push(setTimeout(() => setTapped(true), tapAt));
    }
    if (screens.length > 1) {
      timers.push(
        setTimeout(() => {
          setIndex((i) => (i + 1) % screens.length);
        }, dwell)
      );
    }
    return () => timers.forEach(clearTimeout);
  }, [index, screens, defaultDwell]);

  const bezel = Math.round(maxWidth * 0.035);
  const outerRadius = Math.round(maxWidth * 0.155);
  const screenRadius = Math.round(maxWidth * 0.12);

  return (
    <div className="flex flex-col items-center gap-4">
      <div
        className="relative w-full"
        style={{
          maxWidth,
          borderRadius: outerRadius,
          backgroundColor: CHARCOAL,
          padding: bezel,
          boxShadow: "7px 7px 0 rgba(37,37,37,0.35)",
        }}
      >
        {/* side buttons */}
        <span
          className="absolute rounded-sm"
          style={{ left: -3, top: "16%", width: 3, height: "5.5%", backgroundColor: CHARCOAL }}
        />
        <span
          className="absolute rounded-sm"
          style={{ left: -3, top: "24%", width: 3, height: "9%", backgroundColor: CHARCOAL }}
        />
        <span
          className="absolute rounded-sm"
          style={{ right: -3, top: "20%", width: 3, height: "11%", backgroundColor: CHARCOAL }}
        />

        {/* screen viewport */}
        <div
          className="relative overflow-hidden w-full"
          style={{
            borderRadius: screenRadius,
            aspectRatio: "9 / 19.5",
            backgroundColor: "#ffffff",
          }}
        >
          <div
            className="flex h-full"
            style={{
              width: `${screens.length * 100}%`,
              transform: `translateX(-${index * (100 / screens.length)}%)`,
              transition: "transform 600ms cubic-bezier(0.65,0,0.35,1)",
            }}
          >
            {screens.map((s, i) => (
              <div key={i} className="relative h-full shrink-0" style={{ width: `${100 / screens.length}%` }}>
                {s.kind === "static" ? (
                  <img
                    src={s.img}
                    alt={s.alt}
                    loading={i === 0 ? "eager" : "lazy"}
                    className="h-full w-full object-cover object-top"
                  />
                ) : (
                  <>
                    <img
                      src={s.before}
                      alt={s.alt}
                      loading={i === 0 ? "eager" : "lazy"}
                      className="h-full w-full object-cover object-top"
                    />
                    <img
                      src={s.after}
                      alt=""
                      aria-hidden="true"
                      className="absolute inset-0 h-full w-full object-cover object-top"
                      style={{
                        opacity: i === index && tapped ? 1 : 0,
                        transition: "opacity 380ms ease",
                      }}
                    />
                  </>
                )}
              </div>
            ))}
          </div>

          {/* dynamic island — one consistent notch drawn over every screen */}
          <div
            className="absolute rounded-full"
            style={{
              top: "1.8%",
              left: "50%",
              transform: "translateX(-50%)",
              width: "28%",
              height: "3.4%",
              backgroundColor: "#000",
              zIndex: 10,
            }}
          />
        </div>
      </div>

      {screens.length > 1 && (
        <div className="flex items-center gap-2">
          {screens.map((s, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`Show ${s.alt}`}
              className="rounded-full transition-all"
              style={{
                width: i === index ? 22 : 7,
                height: 7,
                backgroundColor: i === index ? CHARCOAL : "rgba(37,37,37,0.25)",
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}

/* ────────────────────────────────────────────────────────────────────
   Hero background: a hand-drawn dashed "movement trail" that loops
   around behind the phone, a handful of quirky fitness doodles (two
   travel along the trail, the rest float/bob/spin in place), and a
   few soft watercolor-style blobs that slowly breathe. Purely
   decorative — sits behind the phone and the page copy, never in
   front of it — and every animation backs off under
   prefers-reduced-motion.
   ──────────────────────────────────────────────────────────────── */

// A loose, hand-drawn loop that sweeps from lower-left, up and around
// behind the phone, and back down to lower-right — reused both as the
// visible dashed path and as the motion path the traveling doodles ride.
const TRAIL_PATH_D =
  "M 34 522 C 6 430 26 328 96 274 C 150 232 132 156 196 118 C 252 84 318 96 296 156 C 278 204 336 236 388 206 C 446 172 492 226 468 288 C 448 338 494 372 486 428 C 480 470 500 500 486 522";

function DoodleSneaker({ size = 34 }: { size?: number }) {
  return (
    <svg width={size} height={size * 0.68} viewBox="0 0 48 32" fill="none">
      <path
        d="M4 24 Q4 15 13 12 L21 6 Q25 3 29 7 L33 13 L44 16 Q47 18 45 22 L45 26 Q45 28 43 28 L8 28 Q4 28 4 24 Z"
        fill={ORANGE}
        stroke={CHARCOAL}
        strokeWidth="2.2"
        strokeLinejoin="round"
      />
      <path d="M14 12 L13 22 M21 8 L21 22 M28 8.5 L29 22" stroke={CHARCOAL} strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function DoodleBolt({ size = 26 }: { size?: number }) {
  return (
    <svg width={size} height={size * 1.28} viewBox="0 0 26 34" fill="none">
      <path
        d="M16 2 L6 18 L13 18 L10 32 L22 14 L15 14 Z"
        fill={YELLOW}
        stroke={CHARCOAL}
        strokeWidth="2.2"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
    </svg>
  );
}

function DoodleHeart({ size = 28 }: { size?: number }) {
  return (
    <svg width={size} height={size * 0.93} viewBox="0 0 32 30" fill="none">
      <path
        d="M16 27 C3 18 1 9 7.5 5.3 C11.5 3 16 5 16 10.5 C16 5 20.5 3 24.5 5.3 C31 9 29 18 16 27 Z"
        fill={PINK}
        stroke={CHARCOAL}
        strokeWidth="2.2"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function DoodleBottle({ size = 24 }: { size?: number }) {
  return (
    <svg width={size} height={size * 1.4} viewBox="0 0 26 36" fill="none">
      <rect x="4" y="3" width="8" height="6" rx="1.6" fill={BLUE} stroke={CHARCOAL} strokeWidth="2" />
      <path
        d="M5 9 L4 15 Q3 18 5 20 L5 31 Q5 34 8 34 L11 34 Q14 34 14 31 L14 20 Q16 18 15 15 L14 9 Z"
        fill={BLUE}
        stroke={CHARCOAL}
        strokeWidth="2.2"
        strokeLinejoin="round"
      />
      <line x1="4.5" y1="22" x2="14" y2="22" stroke={CHARCOAL} strokeWidth="1.4" />
    </svg>
  );
}

function DoodleStar({ size = 26 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
      <path
        d="M16 2 L19.8 12.2 L30 12.6 L21.8 19 L24.8 29 L16 23 L7.2 29 L10.2 19 L2 12.6 L12.2 12.2 Z"
        fill={PURPLE}
        stroke={CHARCOAL}
        strokeWidth="2.2"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function DoodleSmiley({ size = 30 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
      <circle cx="16" cy="16" r="13" fill={GREEN} stroke={CHARCOAL} strokeWidth="2.2" />
      <circle cx="11.2" cy="13.5" r="1.7" fill={CHARCOAL} />
      <circle cx="20.8" cy="13.5" r="1.7" fill={CHARCOAL} />
      <path d="M9.5 19 Q16 25 22.5 19" stroke={CHARCOAL} strokeWidth="2.1" fill="none" strokeLinecap="round" />
    </svg>
  );
}

function HeroDoodleBackground() {
  return (
    <div
      aria-hidden="true"
      className="fp-hero-bg absolute pointer-events-none"
      style={{
        top: "-3%",
        left: "50%",
        transform: "translateX(-50%)",
        width: "min(560px, 96vw)",
        height: "106%",
        zIndex: 0,
        overflow: "hidden",
      }}
    >
      <style>{`
        @keyframes fp-dash-flow { to { stroke-dashoffset: -190; } }
        @keyframes fp-breathe-1 { 0%, 100% { transform: scale(1); opacity: 0.16; } 50% { transform: scale(1.09); opacity: 0.24; } }
        @keyframes fp-breathe-2 { 0%, 100% { transform: scale(1.05); opacity: 0.14; } 50% { transform: scale(0.95); opacity: 0.22; } }
        @keyframes fp-float-a { 0%, 100% { transform: translateY(0) rotate(-5deg); } 50% { transform: translateY(-9px) rotate(5deg); } }
        @keyframes fp-float-b { 0%, 100% { transform: translateY(0) rotate(4deg); } 50% { transform: translateY(10px) rotate(-4deg); } }
        @keyframes fp-bob-spin { 0%, 100% { transform: translateY(0) rotate(-7deg); } 50% { transform: translateY(-6px) rotate(7deg); } }
        @keyframes fp-travel { to { offset-distance: 100%; } }

        .fp-hero-bg .fp-dash { animation: fp-dash-flow 7s linear infinite; }
        .fp-hero-bg .fp-blob-1 { transform-origin: 92px 130px; animation: fp-breathe-1 11s ease-in-out infinite; }
        .fp-hero-bg .fp-blob-2 { transform-origin: 430px 110px; animation: fp-breathe-2 13s ease-in-out infinite; animation-delay: -3s; }
        .fp-hero-bg .fp-blob-3 { transform-origin: 70px 480px; animation: fp-breathe-1 12s ease-in-out infinite; animation-delay: -6s; }
        .fp-hero-bg .fp-blob-4 { transform-origin: 450px 470px; animation: fp-breathe-2 10s ease-in-out infinite; animation-delay: -2s; }
        .fp-hero-bg .fp-blob-5 { transform-origin: 260px 40px; animation: fp-breathe-1 14s ease-in-out infinite; animation-delay: -8s; }
        .fp-hero-bg .fp-blob-6 { transform-origin: 260px 590px; animation: fp-breathe-2 12.5s ease-in-out infinite; animation-delay: -5s; }
        .fp-hero-bg .fp-doodle-float-a { transform-origin: center; animation: fp-float-a 6.5s ease-in-out infinite; }
        .fp-hero-bg .fp-doodle-float-b { transform-origin: center; animation: fp-float-b 7.5s ease-in-out infinite; animation-delay: -2s; }
        .fp-hero-bg .fp-doodle-bob { transform-origin: center; animation: fp-bob-spin 8s ease-in-out infinite; animation-delay: -4s; }
        .fp-hero-bg .fp-travel-1 { offset-path: path("${TRAIL_PATH_D}"); offset-rotate: 0deg; offset-distance: 0%; animation: fp-travel 17s linear infinite; }
        .fp-hero-bg .fp-travel-2 { offset-path: path("${TRAIL_PATH_D}"); offset-rotate: 0deg; offset-distance: 48%; animation: fp-travel 17s linear infinite; animation-delay: -8.5s; }

        @media (prefers-reduced-motion: reduce) {
          .fp-hero-bg .fp-dash,
          .fp-hero-bg .fp-blob-1, .fp-hero-bg .fp-blob-2, .fp-hero-bg .fp-blob-3,
          .fp-hero-bg .fp-blob-4, .fp-hero-bg .fp-blob-5, .fp-hero-bg .fp-blob-6,
          .fp-hero-bg .fp-doodle-float-a, .fp-hero-bg .fp-doodle-float-b, .fp-hero-bg .fp-doodle-bob,
          .fp-hero-bg .fp-travel-1, .fp-hero-bg .fp-travel-2 {
            animation: none !important;
          }
        }
      `}</style>

      <svg viewBox="0 0 520 640" width="100%" height="100%" style={{ display: "block" }}>
        {/* watercolor-style breathing blobs, one per palette color */}
        <g style={{ filter: "blur(13px)" }}>
          <ellipse className="fp-blob-1" cx="92" cy="130" rx="66" ry="52" fill={PINK} opacity="0.16" />
          <ellipse className="fp-blob-2" cx="430" cy="110" rx="58" ry="60" fill={BLUE} opacity="0.14" />
          <ellipse className="fp-blob-3" cx="70" cy="480" rx="62" ry="50" fill={YELLOW} opacity="0.18" />
          <ellipse className="fp-blob-4" cx="450" cy="470" rx="60" ry="56" fill={GREEN} opacity="0.15" />
          <ellipse className="fp-blob-5" cx="260" cy="40" rx="72" ry="34" fill={ORANGE} opacity="0.13" />
          <ellipse className="fp-blob-6" cx="260" cy="600" rx="76" ry="34" fill={PURPLE} opacity="0.14" />
        </g>

        {/* hand-drawn dashed movement trail */}
        <path
          className="fp-dash"
          d={TRAIL_PATH_D}
          fill="none"
          stroke={CHARCOAL}
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeDasharray="2 15"
          opacity="0.32"
        />

        {/* doodles that softly float / bob / rotate in place */}
        <g className="fp-doodle-float-a" transform="translate(26, 246)">
          <DoodleHeart size={32} />
        </g>
        <g className="fp-doodle-float-b" transform="translate(448, 234)">
          <DoodleStar size={30} />
        </g>
        <g className="fp-doodle-bob" transform="translate(24, 584)">
          <DoodleBottle size={28} />
        </g>
        <g className="fp-doodle-float-a" transform="translate(450, 552)" style={{ animationDelay: "-3s" }}>
          <DoodleSmiley size={32} />
        </g>

        {/* doodles that travel along the dashed trail */}
        <g className="fp-travel-1">
          <g transform="translate(-19, -13)">
            <DoodleSneaker size={38} />
          </g>
        </g>
        <g className="fp-travel-2">
          <g transform="translate(-13, -18)">
            <DoodleBolt size={26} />
          </g>
        </g>
      </svg>
    </div>
  );
}

const FITPILOT_SCREENS: Screen[] = [
  { kind: "static", img: welcomeImg, alt: "FitPilot welcome screen — Fitness that fits your life" },
  { kind: "static", img: overviewImg, alt: "FitPilot onboarding intro — Let's build your plan" },
  {
    kind: "interactive",
    before: goalImg,
    after: q1GoalSelectedImg,
    alt: "FitPilot onboarding — tapping 'What's your main goal' cards",
    dwell: 3400,
    tapAt: 1200,
  },
  {
    kind: "interactive",
    before: q2TimeEmptyImg,
    after: q2TimeSelectedImg,
    alt: "FitPilot onboarding — tapping 'How much time can you commit' cards",
    dwell: 3400,
    tapAt: 1200,
  },
  {
    kind: "interactive",
    before: q3ExperienceEmptyImg,
    after: q3ExperienceSelectedImg,
    alt: "FitPilot onboarding — selecting an experience level",
    dwell: 3400,
    tapAt: 1200,
  },
  {
    kind: "interactive",
    before: q4DaysEmptyImg,
    after: q4DaysSelectedImg,
    alt: "FitPilot onboarding — tapping 'days per week' cards",
    dwell: 3400,
    tapAt: 1200,
  },
  { kind: "static", img: planReadyImg, alt: "FitPilot plan ready confirmation screen" },
  { kind: "static", img: dashboardImg, alt: "FitPilot dashboard — today's workout, mood check-in, streaks, and AI coach" },
];

function TaskRow({
  task,
  goal,
  result,
  good,
}: {
  task: string;
  goal: string;
  result: string;
  good: boolean;
}) {
  return (
    <div
      className="grid md:grid-cols-[1fr_1.4fr_1fr] gap-3 md:gap-6 py-4 border-b items-center"
      style={{ borderColor: "rgba(37,37,37,0.12)" }}
    >
      <span className="font-bold text-base">{task}</span>
      <span className="text-sm" style={{ color: "rgba(37,37,37,0.65)" }}>
        {goal}
      </span>
      <span
        className="text-sm font-bold px-3 py-1.5 rounded-full inline-block w-fit"
        style={{
          backgroundColor: good ? GREEN : YELLOW,
          color: CHARCOAL,
        }}
      >
        {result}
      </span>
    </div>
  );
}

function PriorityBadge({ level }: { level: "High" | "Medium" | "Low" }) {
  const bg = level === "High" ? ORANGE : level === "Medium" ? YELLOW : "rgba(37,37,37,0.1)";
  const fg = level === "High" ? "#ffffff" : CHARCOAL;
  return (
    <span
      className="text-xs font-bold uppercase tracking-wide px-2.5 py-1 rounded-full inline-block"
      style={{ backgroundColor: bg, color: fg }}
    >
      {level}
    </span>
  );
}

export default function CaseStudyFitPilot({ onBack }: { onBack: () => void }) {
  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: CREAM, color: CHARCOAL, fontFamily: "'Inria Sans', sans-serif" }}
    >
      {/* ── NAV ── */}
      <nav
        className="sticky top-0 z-50 border-b"
        style={{ backgroundColor: CREAM, borderColor: "rgba(37,37,37,0.1)" }}
      >
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-sm font-bold tracking-wide transition-opacity hover:opacity-50"
          >
            <span aria-hidden="true">←</span> Back to portfolio
          </button>
          <span
            className="text-[11px] tracking-[0.22em] uppercase font-bold hidden sm:block"
            style={{ color: "rgba(37,37,37,0.45)" }}
          >
            Case Study
          </span>
        </div>
      </nav>

      {/* ── HERO: thumbnail zoom-in feel ── */}
      <header className="max-w-5xl mx-auto px-6 pt-14 pb-10">
        <Pill bg={BLUE} fg="#ffffff">
          Mobile App Design
        </Pill>
        <h1
          className="leading-[1.05] mt-5 mb-6"
          style={{
            fontFamily: "'Rammetto One', serif",
            fontSize: "clamp(2.6rem, 7vw, 4.5rem)",
          }}
        >
          FitPilot
        </h1>
        <p
          className="text-xl md:text-2xl leading-relaxed max-w-2xl mb-10"
          style={{ color: "rgba(37,37,37,0.7)" }}
        >
          Designing a fitness app that lowers the barrier to starting — because
          the hardest part is showing up.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-12">
          <FactCard label="Role" value="Solo UX/UI" bg={YELLOW} fg={CHARCOAL} />
          <FactCard label="Duration" value="~4 months" bg={PINK} fg={CHARCOAL} />
          <FactCard label="Platform" value="Mobile" bg={BLUE} fg="#ffffff" />
          <FactCard label="Type" value="Bootcamp project" bg={ORANGE} fg="#ffffff" />
        </div>

        {/* Hero: the actual UI, cycling through the flow */}
        <div className="relative flex justify-center">
          <HeroDoodleBackground />
          <div className="relative" style={{ zIndex: 1 }}>
            <ScreenSlider screens={FITPILOT_SCREENS} maxWidth={320} />
          </div>
        </div>
      </header>

      {/* ── INTRODUCTION ── */}
      <section className="max-w-5xl mx-auto px-6 py-16 border-t" style={{ borderColor: "rgba(37,37,37,0.1)" }}>
        <SectionHeading eyebrow="Introduction" eyebrowColor={ORANGE} accentColor={ORANGE} accent="showing up.">
          The hardest part isn't the workout — it's
        </SectionHeading>
        <div className="space-y-5 text-lg leading-relaxed max-w-3xl" style={{ color: "rgba(37,37,37,0.8)" }}>
          <p>
            Most fitness apps assume users already know what they're doing.
            FitPilot is built around the opposite assumption — that the
            hardest part of getting fit isn't knowing HIIT from cardio, it's{" "}
            <em>showing up in the first place</em>. The core problem to solve:
            how do you get someone from "I want to be healthier" to a workout
            they'll actually do today, without asking them to become an expert
            first.
          </p>
          <p>
            <strong>Target users:</strong> adults 26–35, beginner-to-intermediate
            fitness users trying to build a consistent habit, who already
            regularly use mobile/web apps. Two personas anchored the design —
            one who already has the discipline but wants better tools, and one
            who has the motivation but struggles to make it stick.
          </p>
          <p>
            <strong>Why it mattered:</strong> consistency, not intensity, is
            what most new fitness-app users actually fail at. If onboarding is
            long or generic, or the app doesn't adapt when someone's tired or
            unmotivated, they drop off in the first week. FitPilot replaces a
            single intimidating setup form with a short, guided questionnaire
            that builds a plan around the user's actual goal, time, experience,
            and schedule — then keeps adapting day to day through mood-based
            workout suggestions, visible streaks, and an AI coach for the days
            motivation is low.
          </p>
          <p>
            This was a solo, end-to-end project — research, information
            architecture, user/task flows, wireframing, visual design, and
            usability testing — done during my UX bootcamp, started February,
            as both a learning project and a portfolio piece.
          </p>
        </div>
      </section>

      {/* ── RESEARCH ── */}
      <section className="max-w-5xl mx-auto px-6 py-16 border-t" style={{ borderColor: "rgba(37,37,37,0.1)" }}>
        <SectionHeading eyebrow="Research" eyebrowColor={BLUE} accentColor={BLUE} accent="the whole product.">
          Two personas, not one, shaped
        </SectionHeading>
        <p className="text-lg leading-relaxed max-w-3xl mb-10" style={{ color: "rgba(37,37,37,0.8)" }}>
          Research combined two grounded personas with a small card-sorting
          exercise — 3 participants sorting 36 health, wellness, fitness, and
          nutrition topics — to validate how users mentally group content. The
          sort confirmed two rock-solid categories, <strong>Fitness &amp; Exercise</strong> and{" "}
          <strong>Nutrition &amp; Diet</strong>, and surfaced that mental wellness
          didn't cleanly belong to either — part of why FitPilot treats mood
          and motivation as a first-class feature rather than an afterthought.
        </p>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <PersonaCard img={personaAbhishekImg} alt="Persona: Abhishek, 29, The Fitness Guru — Data Analyst, disciplined and self-driven" />
          </div>
          <div>
            <PersonaCard img={personaGoralImg} alt="Persona: Goral, 25, The Aspiring Achiever — Lab Assistant, motivated in bursts but struggles to stay consistent" />
          </div>
        </div>
        <p className="text-lg leading-relaxed max-w-3xl mt-8" style={{ color: "rgba(37,37,37,0.8)" }}>
          Designing for both meant FitPilot couldn't just be a tracking tool
          for people who already have discipline like Abhishek — it also had
          to actively rebuild motivation and lower friction for people like
          Goral. That tension between "I already have a system" and "I need
          the app to be the system" runs through the whole product, from the
          mood-based recommendations down to the visual style.
        </p>
      </section>

      {/* ── DEFINE ── */}
      <section className="max-w-5xl mx-auto px-6 py-16 border-t" style={{ borderColor: "rgba(37,37,37,0.1)" }}>
        <SectionHeading eyebrow="Define" eyebrowColor={GREEN} accentColor={ORANGE} accent="build habits.">
          Small actions, repeated, quietly
        </SectionHeading>
        <p className="text-lg leading-relaxed max-w-3xl mb-10" style={{ color: "rgba(37,37,37,0.8)" }}>
          The process was iterative rather than strictly linear — wireframes
          went through many numbered iterations, particularly around the
          onboarding question screens. Four primary sections came out of the
          research — Fitness &amp; Workouts, Nutrition &amp; Diet, Mental
          Wellness, and Healthy Lifestyle &amp; Habits — anchored around a
          central Dashboard hub.
        </p>

        <h3 className="font-bold text-xl mb-4" style={{ fontFamily: "Georgia, serif" }}>
          Onboarding user flow
        </h3>
        <div
          className="rounded-2xl p-6 mb-10 overflow-x-auto"
          style={{ backgroundColor: "rgba(52,120,200,0.08)" }}
        >
          <FlowRow
            steps={["Welcome", "Sign up / Log in", "Let's Build Your Plan", "Goal", "Time available", "Experience", "Days/week", "Plan summary", "Plan Ready!", "Dashboard"]}
            colors={[BLUE, GREEN, YELLOW, PINK, PURPLE]}
          />
        </div>

        <h3 className="font-bold text-xl mb-4" style={{ fontFamily: "Georgia, serif" }}>
          Three daily-use loops
        </h3>
        <div className="grid md:grid-cols-3 gap-5 mb-10">
          <div className="rounded-2xl p-5" style={{ backgroundColor: PINK }}>
            <p className="font-bold mb-2" style={{ color: CHARCOAL }}>Mood-based workout</p>
            <p className="text-sm leading-relaxed" style={{ color: CHARCOAL, opacity: 0.8 }}>
              Check in on mood/energy → app suggests a matching workout → start,
              track, complete → dashboard updates with streak.
            </p>
          </div>
          <div className="rounded-2xl p-5" style={{ backgroundColor: YELLOW }}>
            <p className="font-bold mb-2" style={{ color: CHARCOAL }}>Streaks &amp; achievements</p>
            <p className="text-sm leading-relaxed" style={{ color: CHARCOAL, opacity: 0.8 }}>
              Check progress → view streaks and badges → see trend insights →
              encouraging nudge back to the dashboard.
            </p>
          </div>
          <div className="rounded-2xl p-5" style={{ backgroundColor: GREEN }}>
            <p className="font-bold mb-2" style={{ color: CHARCOAL }}>Reminders &amp; AI Coach</p>
            <p className="text-sm leading-relaxed" style={{ color: CHARCOAL, opacity: 0.8 }}>
              Smart, humorous reminders nudge the user back in; if they're
              stuck, the AI Coach and a guidance library are one tap away.
            </p>
          </div>
        </div>

        <div
          className="rounded-2xl p-6 mb-10 text-center"
          style={{ backgroundColor: CHARCOAL }}
        >
          <p
            className="text-lg md:text-xl font-bold leading-snug"
            style={{ fontFamily: "Georgia, serif", color: CREAM }}
          >
            "Consistent Small Actions <span style={{ color: ORANGE }}>→</span> Build
            Habits <span style={{ color: ORANGE }}>→</span> Long Term Results"
          </p>
          <p className="text-sm mt-3" style={{ color: "rgba(247,242,232,0.6)" }}>
            The actual design thesis behind the dashboard — annotated directly
            in the flow, not just implied by it.
          </p>
        </div>

        <h3 className="font-bold text-xl mb-4" style={{ fontFamily: "Georgia, serif" }}>
          Task flows
        </h3>
        <div className="space-y-6">
          <div>
            <p className="text-sm font-bold mb-3" style={{ color: "rgba(37,37,37,0.55)" }}>
              Task Flow 1 — New user, onboarding to dashboard
            </p>
            <div className="rounded-2xl p-5 overflow-x-auto" style={{ backgroundColor: "rgba(37,37,37,0.05)" }}>
              <FlowRow
                steps={["Welcome", "Get Started", "Create account", "Choose goal", "Set commitments", "Onboarding complete", "Dashboard"]}
                colors={[BLUE, GREEN, PURPLE, PINK, YELLOW]}
              />
            </div>
          </div>
          <div>
            <p className="text-sm font-bold mb-3" style={{ color: "rgba(37,37,37,0.55)" }}>
              Task Flow 2 — Existing user, login to dashboard
            </p>
            <div className="rounded-2xl p-5 overflow-x-auto" style={{ backgroundColor: "rgba(37,37,37,0.05)" }}>
              <FlowRow
                steps={["Welcome back", "Login", "Dashboard"]}
                colors={[BLUE, GREEN, PURPLE]}
              />
            </div>
          </div>
        </div>
        <p className="text-base leading-relaxed max-w-3xl mt-6" style={{ color: "rgba(37,37,37,0.7)" }}>
          A parallel skip path (Explore FitPilot → Basic Dashboard) exists for
          users who want to poke around before committing to full
          personalization — directly answering an open question from earlier
          in the process: what happens if a user skips a step?
        </p>
      </section>

      {/* ── DESIGN ── */}
      <section className="max-w-5xl mx-auto px-6 py-16 border-t" style={{ borderColor: "rgba(37,37,37,0.1)" }}>
        <SectionHeading eyebrow="Design" eyebrowColor={PINK} accentColor={PINK} accent="on purpose.">
          Loud, bold, neo-brutalist —
        </SectionHeading>

        <div className="space-y-5 text-lg leading-relaxed max-w-3xl mb-10" style={{ color: "rgba(37,37,37,0.8)" }}>
          <p>
            The visual language of FitPilot is deliberately{" "}
            <strong>neo-brutalist</strong> — bold, saturated color blocking,
            thick outlines, hard offset shadows instead of soft ones, oversized
            playful type, and illustrated characters with personality, rather
            than the clean, clinical, minimal look most fitness and health apps
            default to.
          </p>
          <p>
            That choice was intentional, not decorative: fitness apps tend to
            look serious and a little intimidating, which works against a user
            like Goral who's already prone to feeling overwhelmed. Instagram
            and TikTok aren't addictive because they're minimal — they're
            addictive because they're loud, colorful, and full of personality,
            and people open them out of enjoyment, not obligation. FitPilot
            borrows that energy on purpose, so that checking in on a streak or
            a mood-based workout feels closer to opening a feed than filling
            out a form — exactly the "small actions → habit → long-term
            results" loop the flow was built around.
          </p>
        </div>

        <h3 className="font-bold text-xl mb-4" style={{ fontFamily: "Georgia, serif" }}>
          Color palette
        </h3>
        <div className="flex flex-wrap gap-3 mb-10">
          {[
            { hex: "#F5C94A", name: "Yellow" },
            { hex: "#A388EE", name: "Purple" },
            { hex: "#4ED1FF", name: "Sky" },
            { hex: "#7EE787", name: "Green" },
            { hex: "#F3A6B5", name: "Pink" },
            { hex: "#3478C8", name: "Blue" },
            { hex: "#F7F2E8", name: "Cream" },
            { hex: "#252525", name: "Charcoal" },
          ].map((c) => (
            <div key={c.hex} className="flex flex-col items-center gap-1.5">
              <span
                className="w-14 h-14 rounded-xl border-2 block"
                style={{ backgroundColor: c.hex, borderColor: CHARCOAL }}
              />
              <span className="text-xs font-bold" style={{ color: "rgba(37,37,37,0.6)" }}>
                {c.name}
              </span>
            </div>
          ))}
        </div>
        <p className="text-base leading-relaxed max-w-3xl mb-12" style={{ color: "rgba(37,37,37,0.7)" }}>
          A warm yellow and violet-purple as primaries against white, with a
          wide secondary palette used <em>functionally</em> — to color-code
          categories and selection states rather than just decoratively —
          plus a cream/charcoal neutral set to keep the boldness from tipping
          into chaos.
        </p>

        <h3 className="font-bold text-xl mb-5" style={{ fontFamily: "Georgia, serif" }}>
          Wireframes → final screens
        </h3>
        <div className="flex justify-center">
          <ScreenSlider screens={FITPILOT_SCREENS} maxWidth={240} defaultDwell={2000} />
        </div>

        <p className="text-base leading-relaxed max-w-3xl mt-10" style={{ color: "rgba(37,37,37,0.7)" }}>
          Early wireframes used a plain vertical list with radio-button-style
          selection for the onboarding questions. That evolved into the final
          pattern above: a grid of large, tappable cards with icons and
          color-coded selection states — better mobile usability, and a layout
          built to carry the bolder visual style.
        </p>
      </section>

      {/* ── TEST ── */}
      <section className="max-w-5xl mx-auto px-6 py-16 border-t" style={{ borderColor: "rgba(37,37,37,0.1)" }}>
        <SectionHeading eyebrow="Test" eyebrowColor={ORANGE} accentColor={BLUE} accent="every core flow.">
          5 out of 5 completed
        </SectionHeading>
        <p className="text-lg leading-relaxed max-w-3xl mb-8" style={{ color: "rgba(37,37,37,0.8)" }}>
          Moderated usability testing ran on the high-fidelity Figma prototype
          with 5 participants, evaluating whether users could complete the
          onboarding questionnaire, understand personalization, and reach the
          dashboard without confusion — while also assessing the desirability
          of the visual design.
        </p>

        <div className="rounded-2xl p-6 mb-10" style={{ backgroundColor: "rgba(37,37,37,0.04)" }}>
          <div
            className="hidden md:grid grid-cols-[1fr_1.4fr_1fr] gap-6 pb-3 mb-1 border-b-2 text-xs font-bold uppercase tracking-wide"
            style={{ borderColor: CHARCOAL, color: "rgba(37,37,37,0.5)" }}
          >
            <span>Task</span>
            <span>Goal</span>
            <span>Result</span>
          </div>
          <TaskRow task="Welcome & login" goal="Can users understand where to begin?" result="5/5 completed" good />
          <TaskRow task="Questionnaire" goal="Can users make selections confidently?" result="5/5 completed" good />
          <TaskRow task="Navigate to dashboard" goal="Complete onboarding without help?" result="5/5 reached" good />
          <TaskRow task="Dashboard" goal="Identify workout & mood feature?" result="5/5 navigated" good />
          <TaskRow task="Visual design" goal="Is the neo-brutalist style engaging?" result="4/5 engaged" good={false} />
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-10">
          <div>
            <h3 className="font-bold text-lg mb-3" style={{ fontFamily: "Georgia, serif" }}>
              What worked well
            </h3>
            <ul className="space-y-3 text-base leading-relaxed" style={{ color: "rgba(37,37,37,0.75)" }}>
              <li>
                Onboarding was genuinely enjoyable — 4/5 called it "fun," and
                everyone reached the dashboard smoothly.
              </li>
              <li>Every participant navigated onboarding without getting lost, validating the IA.</li>
              <li>The dashboard hierarchy worked: workout and mood feature were instantly recognized.</li>
              <li>
                The neo-brutalist look landed as designed — one participant
                found it "too colorful" at first, then came around after using it.
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-3" style={{ fontFamily: "Georgia, serif" }}>
              Unexpected findings &amp; priority
            </h3>
            <div className="space-y-3">
              {[
                { label: "Decorative elements read as buttons", level: "Medium" as const },
                { label: "Off-palette green onboarding screen", level: "High" as const },
                { label: "Dashboard icons felt visually busy", level: "High" as const },
              ].map((f) => (
                <div key={f.label} className="flex items-center justify-between gap-3 text-base" style={{ color: "rgba(37,37,37,0.8)" }}>
                  <span>{f.label}</span>
                  <PriorityBadge level={f.level} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CONCLUSION ── */}
      <section className="max-w-5xl mx-auto px-6 py-16 border-t" style={{ borderColor: "rgba(37,37,37,0.1)" }}>
        <SectionHeading eyebrow="Conclusion" eyebrowColor={BLUE} accentColor={ORANGE} accent="own the feed.">
          Next: make daily fitness
        </SectionHeading>

        <div className="space-y-8 text-lg leading-relaxed max-w-3xl" style={{ color: "rgba(37,37,37,0.8)" }}>
          <p>
            FitPilot's process moved from research and two grounded personas
            into a mapped sitemap and task flow, wrapped in a neo-brutalist
            visual identity chosen to make the app something users want to
            open again and again — and testing validated both: 5/5 task
            completion across every core flow, and a visual style that won
            people over once they used it, not just saw it.
          </p>

          <div className="rounded-2xl p-6" style={{ backgroundColor: "rgba(233,93,60,0.08)" }}>
            <p className="font-bold mb-2">Challenges faced</p>
            <p className="text-base" style={{ color: "rgba(37,37,37,0.75)" }}>
              A set of real open questions stayed unresolved at hand-off: login
              failure states, whether generated plans are meaningfully
              different or templated, loading states during plan generation,
              offline behavior, and contrast/type-size accessibility. Naming
              these directly reflects a deliberate, scoped handoff rather than
              a file left "finished" by omission.
            </p>
          </div>

          <div className="rounded-2xl p-6" style={{ backgroundColor: "rgba(52,120,200,0.08)" }}>
            <p className="font-bold mb-2">What I'd do differently</p>
            <p className="text-base" style={{ color: "rgba(37,37,37,0.75)" }}>
              Catch visual-consistency issues earlier — the button-vs-decoration
              confusion, the off-palette screen, the busy icons — by testing
              the style tile and component states in isolation before
              high-fidelity, not only inside full screens.
            </p>
          </div>

          <div className="rounded-2xl p-6" style={{ backgroundColor: CHARCOAL }}>
            <p className="font-bold mb-2" style={{ color: CREAM }}>Future vision</p>
            <p className="text-base" style={{ color: "rgba(247,242,232,0.8)" }}>
              Long-term, FitPilot grows from a personal planning tool into a
              content and community platform — following the same instinct
              behind the neo-brutalist style: give people a reason to open the
              app the way they open Instagram. A feed of short-form content in
              the same bold visual language: reels on healthy recipes,
              creators making fitness content, real body-transformation
              journeys, and quick workout suggestions — turning daily check-ins
              into daily discovery.
            </p>
          </div>

          <p>
            <strong>Proudest achievement:</strong> taking a project from
            research and personas all the way through a validated,
            5-for-5-completion high-fidelity prototype, entirely solo, as a
            first project — and having real users respond to the visual
            identity exactly the way it was intended, once they got past the
            initial "that's a lot of color" reaction.
          </p>
        </div>

        <div className="mt-14">
          <button
            onClick={onBack}
            className="text-base font-bold tracking-wide underline underline-offset-4 transition-opacity hover:opacity-50"
            style={{ color: CHARCOAL }}
          >
            ← Back to portfolio
          </button>
        </div>
      </section>

      <footer className="py-7 border-t text-center" style={{ borderColor: "rgba(37,37,37,0.1)" }}>
        <p className="text-sm" style={{ color: "rgba(37,37,37,0.45)" }}>
          © 2025 Miral Mangukia — Designed with too much coffee and not enough sleep.
        </p>
      </footer>
    </div>
  );
}
