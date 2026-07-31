// Lando Norris-inspired custom cubic-bezier easing
export const EASE = {
  // Custom acceleration curve (Lando Norris site default)
  default: "cubic-bezier(0.65, 0.05, 0, 1)",
  // GSAP equivalents
  out: "power4.out",
  inOut: "power2.inOut",
  slow: "power3.out",
  spring: "back.out(1.7)",
} as const;

export const DURATION = {
  fast: 0.4,
  default: 0.75,
  slow: 1.2,
  reveal: 1.0,
} as const;

export const SCROLL_TRIGGER = {
  start: "top 85%",
  end: "bottom 20%",
  toggle: "play none none none",
};
