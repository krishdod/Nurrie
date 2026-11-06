"use client";

import { useEffect, useRef, useState, useCallback } from "react";

class SensoryAudioEngine {
  private ctx: AudioContext | null = null;
  private noiseBuffer: AudioBuffer | null = null;
  public enabled = false;

  private init() {
    if (this.ctx) return;
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
      this.createNoiseBuffer();
    } catch {
      // Web Audio unsupported
    }
  }

  private createNoiseBuffer() {
    if (!this.ctx) return;
    const bufferSize = this.ctx.sampleRate * 1.5;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    let lastOut = 0.0;
    // Pink noise generation for organic velvet brush sound
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      lastOut = (lastOut + 0.02 * white) / 1.02;
      data[i] = lastOut * 3.5;
    }
    this.noiseBuffer = buffer;
  }

  public enable() {
    this.init();
    if (this.ctx && this.ctx.state === "suspended") {
      this.ctx.resume();
    }
    this.enabled = true;
  }

  public disable() {
    this.enabled = false;
  }

  public toggle(): boolean {
    if (this.enabled) {
      this.disable();
    } else {
      this.enable();
    }
    return this.enabled;
  }

  /** Soft velvet foundation brush sweep across skin */
  public brushSweep(intensity = 0.7) {
    if (!this.enabled || !this.ctx || !this.noiseBuffer) return;
    try {
      if (this.ctx.state === "suspended") this.ctx.resume();
      const now = this.ctx.currentTime;
      const source = this.ctx.createBufferSource();
      source.buffer = this.noiseBuffer;

      const filter = this.ctx.createBiquadFilter();
      filter.type = "bandpass";
      filter.frequency.setValueAtTime(750 + Math.random() * 200, now);
      filter.Q.setValueAtTime(1.8, now);

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(0.12 * intensity, now + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.22);

      source.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      source.start(now);
      source.stop(now + 0.25);
    } catch {
      // Audio playback failed silently
    }
  }

  /** Precision magnetic cosmetic cap click */
  public capClick() {
    if (!this.enabled || !this.ctx) return;
    try {
      if (this.ctx.state === "suspended") this.ctx.resume();
      const now = this.ctx.currentTime;

      // Primary acoustic resonance
      const osc = this.ctx.createOscillator();
      osc.type = "sine";
      osc.frequency.setValueAtTime(320, now);
      osc.frequency.exponentialRampToValueAtTime(140, now + 0.045);

      const oscGain = this.ctx.createGain();
      oscGain.gain.setValueAtTime(0.2, now);
      oscGain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);

      // Metallic high transient
      const clickOsc = this.ctx.createOscillator();
      clickOsc.type = "triangle";
      clickOsc.frequency.setValueAtTime(2400, now);
      clickOsc.frequency.exponentialRampToValueAtTime(800, now + 0.015);

      const clickGain = this.ctx.createGain();
      clickGain.gain.setValueAtTime(0.14, now);
      clickGain.gain.exponentialRampToValueAtTime(0.001, now + 0.02);

      osc.connect(oscGain);
      oscGain.connect(this.ctx.destination);
      clickOsc.connect(clickGain);
      clickGain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.06);
      clickOsc.start(now);
      clickOsc.stop(now + 0.03);
    } catch {
      // Silent fail
    }
  }

  /** Delicate high-harmonic tone for selection tabs */
  public tabChime() {
    if (!this.enabled || !this.ctx) return;
    try {
      if (this.ctx.state === "suspended") this.ctx.resume();
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      osc.type = "sine";
      osc.frequency.setValueAtTime(1050, now);
      osc.frequency.exponentialRampToValueAtTime(820, now + 0.07);

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.09);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.1);
    } catch {
      // Silent fail
    }
  }
}

export const sensoryAudio = new SensoryAudioEngine();

export function useSensoryAudio() {
  const [active, setActive] = useState(false);

  useEffect(() => {
    setActive(sensoryAudio.enabled);
  }, []);

  const toggle = useCallback(() => {
    const next = sensoryAudio.toggle();
    setActive(next);
    if (next) sensoryAudio.capClick();
  }, []);

  return {
    active,
    toggle,
    brushSweep: useCallback((intensity?: number) => sensoryAudio.brushSweep(intensity), []),
    capClick: useCallback(() => sensoryAudio.capClick(), []),
    tabChime: useCallback(() => sensoryAudio.tabChime(), []),
  };
}
