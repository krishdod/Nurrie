"use client";

import { useState } from "react";
import { ArrowUpRight, Droplets, Flower2, Shield, Sparkles, CheckCircle2 } from "lucide-react";
import { sensoryAudio } from "./SensoryAudio";

type Ingredient = {
  id: string;
  name: string;
  origin: string;
  benefit: string;
  science: string;
  icon: typeof Droplets;
};

const INGREDIENTS: Ingredient[] = [
  {
    id: "squalane",
    name: "Phyto-Squalane",
    origin: "100% Spanish Olive Extract",
    benefit: "Bio-Identical Barrier Hydration",
    science:
      "Mimics skin's natural sebum to lock in moisture for 12 hours. Prevents formula creasing, settling into fine lines, or drying into a chalky cast.",
    icon: Droplets,
  },
  {
    id: "rose-wax",
    name: "Rosa Damascena Wax",
    origin: "Botanical Petal Distillation",
    benefit: "Thermal Silk Glide & Slip",
    science:
      "A delicate, solid flower wax that melts at skin contact temperature (36.5°C), creating an imperceptible glide and holding micro-pigments in suspension.",
    icon: Flower2,
  },
  {
    id: "hyaluronic",
    name: "Hyaluronic Micro-Spheres",
    origin: "Biotech Encapsulation",
    benefit: "Contact Plumping & Smoothing",
    science:
      "Dehydrated low-molecular spheres penetrate outer stratum corneum and swell with skin's natural hydration to blur pore texture and impart a velvet finish.",
    icon: Sparkles,
  },
  {
    id: "camellia",
    name: "Camellia & Vitamin E",
    origin: "Cold-Pressed Lipid Shield",
    benefit: "Antioxidant Non-Oxidation Defense",
    science:
      "Active antioxidant matrix shields the color pigments from ambient oxygen and UV breakdown, guaranteeing 0% orange oxidation throughout all-day wear.",
    icon: Shield,
  },
];

const CLEAN_STANDARDS = [
  "100% Vegan & Cruelty-Free",
  "Zero Synthetic Fragrance",
  "Non-Comedogenic (Won't Clog Pores)",
  "Paraben & Phthalate Free",
  "Talc & Micro-Plastic Free",
  "Dermatologist Evaluated",
];

export default function SkincareInfusion() {
  const [activeIngredient, setActiveIngredient] = useState<Ingredient>(INGREDIENTS[0]);

  const handleSelect = (ing: Ingredient) => {
    setActiveIngredient(ing);
    sensoryAudio.tabChime();
  };

  return (
    <section className="skincare-infusion-section" id="the-skincare" aria-labelledby="skincare-heading">
      <div className="skincare-header">
        <span className="section-eyebrow">Hybrid Skincare Infusion</span>
        <h2 id="skincare-heading">
          Nourishment first.
          <br />
          Coverage that follows.
        </h2>
        <p className="skincare-intro">
          We refused to create another drying cosmetic stick. NURRIE is engineered as an active skincare serum
          suspended in a solid botanical wax—protecting skin health while delivering bespoke tone adaptation.
        </p>
      </div>

      {/* 4 Solid Ingredient Cards */}
      <div className="ingredients-grid">
        {INGREDIENTS.map((item) => {
          const Icon = item.icon;
          const isSelected = activeIngredient.id === item.id;
          return (
            <div
              key={item.id}
              className={`ingredient-card ${isSelected ? "is-active" : ""}`}
              onClick={() => handleSelect(item)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") handleSelect(item);
              }}
              aria-pressed={isSelected}
            >
              <div className="ingredient-card-top">
                <div className="ingredient-icon-wrap">
                  <Icon size={20} />
                </div>
                <span className="ingredient-origin">{item.origin}</span>
              </div>
              <h3 className="ingredient-name">{item.name}</h3>
              <span className="ingredient-benefit">{item.benefit}</span>
              <p className="ingredient-science">{item.science}</p>
            </div>
          );
        })}
      </div>

      {/* Clean Purity Standards Strip */}
      <div className="clean-standards-bar">
        <div className="standards-label">
          <strong>The Clean Standard</strong>
          <span>Formulated without compromise</span>
        </div>
        <div className="standards-pills">
          {CLEAN_STANDARDS.map((std) => (
            <div key={std} className="standard-pill">
              <CheckCircle2 size={14} className="pill-check" />
              <span>{std}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="skincare-foot">
        <span>Curious about your skin's custom adaptation?</span>
        <a href="#the-concierge" className="text-link">
          Find your tone match <ArrowUpRight size={18} />
        </a>
      </div>
    </section>
  );
}