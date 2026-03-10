"use client";

import { useEffect, useRef } from "react";

/* ─────────────────────────────────────────────
   Animation Components — Cristina Coiffure
   CursorGlow + FloatingBubbles
   ───────────────────────────────────────────── */

const MINT = "#9DB8A5";
const BEIGE = "#D4C5B2";

/* ═══ CURSOR GLOW ═══ */
export function CursorGlow() {
  const glow = useRef<HTMLDivElement>(null);
  const trail = useRef<HTMLDivElement>(null);
  const mouse = useRef({ x: 0, y: 0 });
  const trailPos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    let raf: number;
    const onMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };
    };

    const animate = () => {
      trailPos.current.x += (mouse.current.x - trailPos.current.x) * 0.07;
      trailPos.current.y += (mouse.current.y - trailPos.current.y) * 0.07;

      if (glow.current) {
        glow.current.style.left = mouse.current.x + "px";
        glow.current.style.top = mouse.current.y + "px";
      }
      if (trail.current) {
        trail.current.style.left = trailPos.current.x + "px";
        trail.current.style.top = trailPos.current.y + "px";
      }
      raf = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", onMove);
    raf = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  const base = {
    position: "fixed" as const,
    borderRadius: "50%",
    pointerEvents: "none" as const,
    zIndex: 9999,
    transform: "translate(-50%, -50%)",
    mixBlendMode: "multiply" as const,
  };

  return (
    <>
      <div
        ref={glow}
        style={{
          ...base,
          width: 180,
          height: 180,
          background: `radial-gradient(circle, ${MINT}20 0%, ${MINT}08 40%, transparent 70%)`,
        }}
      />
      <div
        ref={trail}
        style={{
          ...base,
          width: 320,
          height: 320,
          background: `radial-gradient(circle, ${BEIGE}14 0%, ${BEIGE}06 40%, transparent 70%)`,
        }}
      />
    </>
  );
}

/* ═══ FLOATING BUBBLES ═══ */
export function FloatingBubbles({ count = 18 }: { count?: number }) {
  useEffect(() => {
    if (document.getElementById("cd-bubble-styles")) return;
    const s = document.createElement("style");
    s.id = "cd-bubble-styles";
    s.textContent = `
      @keyframes cdBubbleRise {
        0% {
          transform: translateY(0) translateX(0) scale(1);
          opacity: 0;
        }
        5% { opacity: 1; }
        50% {
          transform: translateY(-50vh) translateX(var(--drift)) scale(var(--mid-scale));
        }
        90% { opacity: 0.8; }
        100% {
          transform: translateY(-105vh) translateX(var(--drift-end)) scale(var(--end-scale));
          opacity: 0;
        }
      }
      @keyframes cdBubblePulse {
        0%, 100% { box-shadow: 0 0 0 0 rgba(157,184,165,0.08); }
        50% { box-shadow: 0 0 12px 4px rgba(157,184,165,0.12); }
      }
    `;
    document.head.appendChild(s);
  }, []);

  const bubbles = Array.from({ length: count }, (_, i) => {
    const size = 4 + Math.random() * 14;
    const isMint = Math.random() > 0.4;
    return {
      id: i,
      left: Math.random() * 100,
      size,
      duration: 10 + Math.random() * 16,
      delay: Math.random() * 12,
      color: isMint ? MINT : BEIGE,
      opacity: 0.08 + Math.random() * 0.18,
      drift: (Math.random() - 0.5) * 60,
      driftEnd: (Math.random() - 0.5) * 90,
      midScale: 0.8 + Math.random() * 0.5,
      endScale: 0.3 + Math.random() * 0.4,
      blur: size > 10 ? 1 : 0,
    };
  });

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        pointerEvents: "none",
        zIndex: 0,
        overflow: "hidden",
      }}
    >
      {bubbles.map((b) => (
        <div
          key={b.id}
          style={{
            position: "absolute",
            bottom: -20,
            left: `${b.left}%`,
            width: b.size,
            height: b.size,
            borderRadius: "50%",
            background: `radial-gradient(circle at 35% 35%, ${b.color}dd, ${b.color}88)`,
            opacity: 0,
            filter: b.blur ? `blur(${b.blur}px)` : "none",
            animation: `cdBubbleRise ${b.duration}s ease-in-out ${b.delay}s infinite, cdBubblePulse ${b.duration * 0.4}s ease-in-out ${b.delay}s infinite`,
            // @ts-expect-error CSS custom properties
            "--drift": `${b.drift}px`,
            "--drift-end": `${b.driftEnd}px`,
            "--mid-scale": b.midScale,
            "--end-scale": b.endScale,
          }}
        />
      ))}
    </div>
  );
}
