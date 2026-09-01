import { type ReactNode, useEffect, useState } from "react";
import dashboardImg from "@/imports/fitpilot/fitpilot-dashboard.png";
import welcomeImg from "@/imports/fitpilot/fitpilot-welcome.png";
import goalImg from "@/imports/fitpilot/fitpilot-onboarding-goal.png";
import planReadyImg from "@/imports/fitpilot/fitpilot-plan-ready.png";
import overviewImg from "@/imports/fitpilot/fitpilot-overview.png";
import personaAbhishekImg from "@/imports/fitpilot/persona-abhishek.png";
import personaGoralImg from "@/imports/fitpilot/persona-goral.png";

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

type Screen = { img: string; alt: string };

/**
 * A single phone-shaped frame that cycles through a set of real UI
 * screens with an Instagram-story-style slide transition — one screen
 * slides out as the next slides in. No colored mat, no padding gap
 * around the screen; the frame hugs the screenshot exactly, so the
 * page's own background shows through (nothing extra behind it).
 */
function ScreenSlider({
  screens,
  maxWidth = 300,
  interval = 2600,
}: {
  screens: Screen[];
  maxWidth?: number;
  interval?: number;
}) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (screens.length <= 1) return;
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % screens.length);
    }, interval);
    return () => clearInterval(id);
  }, [screens.length, interval]);

  return (
    <div className="flex flex-col items-center gap-4">
      <div
        className="relative overflow-hidden rounded-[1.75rem] border-2 w-full"
        style={{
          maxWidth,
          borderColor: CHARCOAL,
          aspectRatio: "9 / 19.6",
          boxShadow: "7px 7px 0 rgba(37,37,37,1)",
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
            <img
              key={s.img}
              src={s.img}
              alt={s.alt}
              loading={i === 0 ? "eager" : "lazy"}
              className="h-full object-cover object-top shrink-0"
              style={{ width: `${100 / screens.length}%` }}
            />
          ))}
        </div>
      </div>

      {screens.length > 1 && (
        <div className="flex items-center gap-2">
          {screens.map((s, i) => (
            <button
              key={s.img}
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

const FITPILOT_SCREENS: Screen[] = [
  { img: welcomeImg, alt: "FitPilot welcome screen — Fitness that fits your life" },
  { img: overviewImg, alt: "FitPilot onboarding intro — Let's build your plan" },
  { img: goalImg, alt: "FitPilot onboarding — What's your main goal card selection" },
  { img: planReadyImg, alt: "FitPilot plan ready confirmation screen" },
  { img: dashboardImg, alt: "FitPilot dashboard — today's workout, mood check-in, streaks, and AI coach" },
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
        <div className="flex justify-center">
          <ScreenSlider screens={FITPILOT_SCREENS} maxWidth={320} />
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
          <ScreenSlider screens={FITPILOT_SCREENS} maxWidth={240} interval={2200} />
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
