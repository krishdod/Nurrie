"use client";

import { useState } from "react";
import { ArrowRight, ArrowUpRight, RotateCcw, Sparkles } from "lucide-react";
import { sensoryAudio } from "./SensoryAudio";

type Step = 1 | 2 | 3;

type QuizState = {
  sunResponse: "burns" | "tans-gradual" | "tans-quick" | "deep" | null;
  priority: "speed" | "velvet" | "travel" | null;
};

type ResultProfile = {
  shadeNum: string;
  shadeName: string;
  tone: string;
  color: string;
  summary: string;
  blendingTip: string;
};

const RESULTS: Record<string, ResultProfile> = {
  "burns": {
    shadeNum: "01",
    shadeName: "Alabaster",
    tone: "Fair Neutral with Cool Rose",
    color: "#e8d8cb",
    summary: "Your complexion responds best to calibrated porcelain and delicate rose-pearl micro-pigments.",
    blendingTip: "Swipe once along the high cheekbone and use light, circular brush sweeps to activate the cool undertones without overworking.",
  },
  "tans-gradual": {
    shadeNum: "02",
    shadeName: "Ochre",
    tone: "Medium Honey with Neutral Olive",
    color: "#c69774",
    summary: "Your complexion has balanced warm golden and olive undertones that melt naturally with golden spheres.",
    blendingTip: "Blend outwards from the center of the face; the micro-capsules intuitively balance golden undertones within 1.4 seconds.",
  },
  "tans-quick": {
    shadeNum: "03",
    shadeName: "Sienna",
    tone: "Deep Amber with Sunlit Terracotta",
    color: "#925b3e",
    summary: "Your complexion thrives with rich amber, sunlit terracotta, and caramel depth.",
    blendingTip: "Apply with firm initial pressure to burst the high-density color spheres, buffing into a dewy, sunlit velvet radiance.",
  },
  "deep": {
    shadeNum: "04",
    shadeName: "Espresso",
    tone: "Rich Cocoa with Multidimensional Depth",
    color: "#4d2f21",
    summary: "Your complexion features deep molten cocoa and espresso undertones that eliminate any ashy cast.",
    blendingTip: "The white squalane carrier wax absorbs completely transparently, leaving pure rich cocoa pigments with zero grey or white residue.",
  },
};

export default function ComplexionConcierge() {
  const [step, setStep] = useState<Step>(1);
  const [quiz, setQuiz] = useState<QuizState>({ sunResponse: null, priority: null });

  const handleSelectSun = (val: QuizState["sunResponse"]) => {
    setQuiz((prev) => ({ ...prev, sunResponse: val }));
    sensoryAudio.tabChime();
    setStep(2);
  };

  const handleSelectPriority = (val: QuizState["priority"]) => {
    setQuiz((prev) => ({ ...prev, priority: val }));
    sensoryAudio.capClick();
    setStep(3);
  };

  const handleReset = () => {
    setQuiz({ sunResponse: null, priority: null });
    setStep(1);
    sensoryAudio.tabChime();
  };

  const result = quiz.sunResponse ? RESULTS[quiz.sunResponse] : RESULTS["tans-gradual"];

  return (
    <section className="complexion-concierge-section" id="the-concierge" aria-labelledby="concierge-heading">
      <div className="concierge-container">
        {/* Header */}
        <div className="concierge-header">
          <div className="concierge-pill">
            <Sparkles size={14} /> 20-Second Tone Match Concierge
          </div>
          <h2 id="concierge-heading">
            Discover how white
            <br />
            adapts to your skin.
          </h2>
          <p className="concierge-sub">
            Answer 2 quick questions to see which shade archetype will intuitively burst into your exact skin tone.
          </p>
        </div>

        {/* Quiz Flow Card (Solid, Non-Glassmorphic) */}
        <div className="concierge-card">
          {/* Step 1: Sun Response */}
          {step === 1 && (
            <div className="quiz-step" key="step-1">
              <div className="step-indicator">
                <span className="step-num">Step 01 of 02</span>
                <span className="step-title">How does your skin react to direct natural sun?</span>
              </div>
              <div className="quiz-options-grid">
                <button
                  type="button"
                  className="quiz-option-btn"
                  onClick={() => handleSelectSun("burns")}
                >
                  <span className="option-code">A</span>
                  <div className="option-copy">
                    <strong>Burns easily, rarely tans</strong>
                    <span>Porcelain to fair skin with cool or rosy undertone</span>
                  </div>
                </button>
                <button
                  type="button"
                  className="quiz-option-btn"
                  onClick={() => handleSelectSun("tans-gradual")}
                >
                  <span className="option-code">B</span>
                  <div className="option-copy">
                    <strong>Burns initially, then tans golden</strong>
                    <span>Light to medium skin with golden or neutral olive balance</span>
                  </div>
                </button>
                <button
                  type="button"
                  className="quiz-option-btn"
                  onClick={() => handleSelectSun("tans-quick")}
                >
                  <span className="option-code">C</span>
                  <div className="option-copy">
                    <strong>Tans quickly, almost never burns</strong>
                    <span>Medium-deep to tan skin with warm amber or caramel undertone</span>
                  </div>
                </button>
                <button
                  type="button"
                  className="quiz-option-btn"
                  onClick={() => handleSelectSun("deep")}
                >
                  <span className="option-code">D</span>
                  <div className="option-copy">
                    <strong>Naturally rich, never burns</strong>
                    <span>Deep to rich espresso complexion with multidimensional cocoa depth</span>
                  </div>
                </button>
              </div>
            </div>
          )}

          {/* Step 2: Ritual Priority */}
          {step === 2 && (
            <div className="quiz-step" key="step-2">
              <div className="step-indicator">
                <span className="step-num">Step 02 of 02</span>
                <span className="step-title">What is your primary daily ritual priority?</span>
              </div>
              <div className="quiz-options-grid">
                <button
                  type="button"
                  className="quiz-option-btn"
                  onClick={() => handleSelectPriority("speed")}
                >
                  <span className="option-code">01</span>
                  <div className="option-copy">
                    <strong>60-Second Morning Speed</strong>
                    <span>Direct swipe onto bare skin, fast buffing, zero wait time</span>
                  </div>
                </button>
                <button
                  type="button"
                  className="quiz-option-btn"
                  onClick={() => handleSelectPriority("velvet")}
                >
                  <span className="option-code">02</span>
                  <div className="option-copy">
                    <strong>Luminous Velvet Finish</strong>
                    <span>Dewy, poreless skin texture that looks like bare skin, only perfected</span>
                  </div>
                </button>
                <button
                  type="button"
                  className="quiz-option-btn"
                  onClick={() => handleSelectPriority("travel")}
                >
                  <span className="option-code">03</span>
                  <div className="option-copy">
                    <strong>Handbag & Travel Minimalism</strong>
                    <span>One dual-ended instrument replacing bottles, sponges, and dirty fingers</span>
                  </div>
                </button>
              </div>
              <button type="button" className="quiz-back-btn" onClick={() => setStep(1)}>
                &larr; Back to Question 1
              </button>
            </div>
          )}

          {/* Step 3: Result Reveal */}
          {step === 3 && (
            <div className="quiz-result" key="step-3">
              <div className="result-top">
                <div className="result-badge">
                  <span className="match-tag">Your Recommended Archetype</span>
                  <div className="result-shade-display">
                    <span className="shade-circle" style={{ backgroundColor: result.color }} />
                    <div className="shade-titles">
                      <span className="shade-number">{result.shadeNum}</span>
                      <h3>{result.shadeName}</h3>
                      <span className="shade-tone-text">{result.tone}</span>
                    </div>
                  </div>
                </div>

                <button type="button" className="quiz-retake-btn" onClick={handleReset} aria-label="Retake quiz">
                  <RotateCcw size={15} />
                  <span>Retake</span>
                </button>
              </div>

              <div className="result-content">
                <div className="result-block">
                  <strong>Why it adapts to you</strong>
                  <p>{result.summary}</p>
                </div>
                <div className="result-block">
                  <strong>Your personalized ritual tip</strong>
                  <p>{result.blendingTip}</p>
                </div>
              </div>

              <div className="result-actions">
                <a href="#the-metamorphosis" className="result-cta-btn">
                  <span>View in Metamorphosis Lens</span>
                  <ArrowRight size={17} />
                </a>
                <a href="#first-access" className="result-secondary-btn">
                  <span>Reserve in Batch 01 Allocation</span>
                  <ArrowUpRight size={17} />
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}