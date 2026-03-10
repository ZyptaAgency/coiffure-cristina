"use client";

import { useState, useEffect } from "react";

/* ─────────────────────────────────────────────
   Christina Coiffure — Neuchâtel, Suisse
   Palette: Mint #9DB8A5 · Beige #D4C5B2 · Cream #F5F0EA · Warm White #FDFBF7
   Développé par Zypta
   ───────────────────────────────────────────── */

const COLORS = {
  mint: "#9DB8A5",
  mintLight: "#C5D7CB",
  mintDark: "#7A9E84",
  beige: "#D4C5B2",
  cream: "#F5F0EA",
  warmWhite: "#FDFBF7",
  text: "#3A3A3A",
  textLight: "#6B6B6B",
  accent: "#8BAF95",
  gold: "#C4A97D",
};

/* ── Simple Logo Mark ── */
const LogoMark = ({ size = 60 }: { size?: number }) => (
  <div style={{ position: "relative", width: size, height: size }}>
    <div
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        background: `linear-gradient(135deg, ${COLORS.beige} 0%, rgba(212,197,178,0.4) 100%)`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: `0 4px 20px rgba(157,184,165,0.2), inset 0 0 0 ${size*0.08}px rgba(157,184,165,0.15)`,
      }}
    >
      <div
        style={{
          width: size * 0.76,
          height: size * 0.76,
          borderRadius: "50%",
          background: COLORS.mint,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <span
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: size * 0.38,
            fontWeight: 300,
            fontStyle: "italic",
            color: "white",
            letterSpacing: -1,
            lineHeight: 1,
          }}
        >
          Cd
        </span>
      </div>
    </div>
    <div
      style={{
        position: "absolute",
        inset: -4,
        borderRadius: "50%",
        background: "transparent",
        boxShadow: `0 0 30px rgba(157,184,165,0.15)`,
        pointerEvents: "none",
      }}
    />
  </div>
);

/* ── Decorative Elements ── */
const FloatingOrb = ({ top, left, size, delay, color }: { top: string; left: string; size: number; delay: number; color?: string }) => (
  <div
    style={{
      position: "absolute",
      top,
      left,
      width: size,
      height: size,
      borderRadius: "50%",
      background: color || COLORS.mintLight,
      opacity: 0.12,
      animation: `float ${6 + delay}s ease-in-out infinite`,
      animationDelay: `${delay}s`,
      filter: "blur(1px)",
      pointerEvents: "none",
    }}
  />
);

const SectionTitle = ({ subtitle, title, light = false }: { subtitle: string; title: string; light?: boolean }) => (
  <div style={{ textAlign: "center", marginBottom: 56 }}>
    <p
      style={{
        fontFamily: "'Josefin Sans', sans-serif",
        fontSize: 12,
        letterSpacing: 5,
        textTransform: "uppercase",
        color: light ? "rgba(255,255,255,0.6)" : COLORS.mint,
        marginBottom: 16,
        fontWeight: 400,
      }}
    >
      {subtitle}
    </p>
    <h2
      style={{
        fontFamily: "'Cormorant Garamond', serif",
        fontSize: "clamp(32px, 5vw, 52px)",
        fontWeight: 300,
        color: light ? "white" : COLORS.text,
        lineHeight: 1.2,
        fontStyle: "italic",
      }}
    >
      {title}
    </h2>
    <div
      style={{
        width: 50,
        height: 2,
        background: light
          ? "rgba(255,255,255,0.3)"
          : `linear-gradient(to right, ${COLORS.mint}, ${COLORS.beige})`,
        margin: "20px auto 0",
        borderRadius: 1,
      }}
    />
  </div>
);

/* ── Main Component ── */
export default function ChristinaCoiffure() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<number | null>(null);
  const [selectedTime, setSelectedTime] = useState<number | null>(null);
  const [selectedService, setSelectedService] = useState<number | null>(null);
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set());
  const [headerSolid, setHeaderSolid] = useState(false);
  const [bookingName, setBookingName] = useState("");
  const [bookingPhone, setBookingPhone] = useState("");
  const [lightboxImg, setLightboxImg] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => setHeaderSolid(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting && e.target.id) {
            setVisibleSections((prev) => new Set(Array.from(prev).concat(e.target.id)));
          }
        });
      },
      { threshold: 0.1 }
    );
    document.querySelectorAll("[data-reveal]").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const revealClass = (id: string, delay = 0) =>
    `reveal ${visibleSections.has(id) ? "visible" : ""} ${
      delay ? `reveal-delay-${delay}` : ""
    }`;

  const scrollTo = (id: string) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const galleryImages = [
    { url: "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=600&h=750&fit=crop", alt: "Salon intérieur", span: "row" },
    { url: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600&h=400&fit=crop", alt: "Coiffure élégante" },
    { url: "https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?w=600&h=400&fit=crop", alt: "Coupe femme" },
    { url: "https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?w=600&h=750&fit=crop", alt: "Styling", span: "row" },
    { url: "https://images.unsplash.com/photo-1562322140-8baeececf3df?w=600&h=400&fit=crop", alt: "Coloration" },
    { url: "https://images.unsplash.com/photo-1605497788044-5a32c7078486?w=600&h=400&fit=crop", alt: "Brushing" },
  ];

  const timeSlots = ["09:00", "09:30", "10:00", "10:30", "11:00", "11:30", "14:00", "14:30", "15:00", "15:30", "16:00", "16:30", "17:00"];

  const bookingServices = [
    { name: "Coupe Femme", duration: "45 min", price: "45 CHF" },
    { name: "Coupe Homme", duration: "30 min", price: "35 CHF" },
    { name: "Coloration", duration: "90 min", price: "95 CHF" },
    { name: "Mèches / Balayage", duration: "120 min", price: "130 CHF" },
    { name: "Brushing", duration: "30 min", price: "40 CHF" },
    { name: "Soin profond", duration: "45 min", price: "55 CHF" },
  ];

  const today = new Date();
  const dates = Array.from({ length: 14 }, (_, i) => {
    const d = new Date(today);
    d.setDate(d.getDate() + i + 1);
    return d;
  }).filter((d) => d.getDay() !== 0);

  const formatDate = (d: Date) => {
    const days = ["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"];
    const months = ["Jan", "Fév", "Mar", "Avr", "Mai", "Juin", "Juil", "Août", "Sep", "Oct", "Nov", "Déc"];
    return { day: days[d.getDay()], num: d.getDate(), month: months[d.getMonth()] };
  };

  return (
    <div className="christina-page" style={{ background: COLORS.warmWhite, minHeight: "100vh" }}>
      {/* ═══ HEADER ═══ */}
      <header
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          padding: headerSolid ? "14px 40px" : "22px 40px",
          background: headerSolid ? "rgba(253,251,247,0.92)" : "transparent",
          backdropFilter: headerSolid ? "blur(20px)" : "none",
          borderBottom: headerSolid ? `1px solid rgba(157,184,165,0.12)` : "none",
          transition: "all 0.4s ease",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 14, cursor: "pointer" }} onClick={() => scrollTo("hero")}>
          <LogoMark size={headerSolid ? 40 : 48} />
          <div>
            <div
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: headerSolid ? 20 : 24,
                fontWeight: 400,
                color: COLORS.text,
                lineHeight: 1.1,
                transition: "font-size 0.4s ease",
              }}
            >
              Christina
            </div>
            <div
              style={{
                fontFamily: "'Josefin Sans', sans-serif",
                fontSize: 9,
                letterSpacing: 4,
                textTransform: "uppercase",
                color: COLORS.textLight,
                marginTop: 1,
              }}
            >
              Coiffure
            </div>
          </div>
        </div>

        <nav className="desktop-nav" style={{ display: "flex", alignItems: "center", gap: 36 }}>
          {[
            ["Galerie", "gallery"],
            ["Équipe", "team"],
            ["Rendez-vous", "booking"],
            ["Contact", "contact"],
          ].map(([label, id]) => (
            <span key={id} className="nav-link" onClick={() => scrollTo(id)}>
              {label}
            </span>
          ))}
        </nav>

        <button
          className="mobile-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
          style={{
            display: "none",
            background: "none",
            border: "none",
            cursor: "pointer",
            flexDirection: "column",
            gap: 5,
            padding: 8,
          }}
        >
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              style={{
                width: 24,
                height: 1.5,
                background: COLORS.text,
                borderRadius: 1,
                transition: "all 0.3s ease",
                transform: menuOpen
                  ? i === 0
                    ? "rotate(45deg) translate(5px, 5px)"
                    : i === 1
                    ? "opacity(0)"
                    : "rotate(-45deg) translate(5px, -5px)"
                  : "none",
                opacity: menuOpen && i === 1 ? 0 : 1,
              }}
            />
          ))}
        </button>
      </header>

      {menuOpen && (
        <div className="mobile-menu">
          <button
            onClick={() => setMenuOpen(false)}
            style={{
              position: "absolute",
              top: 24,
              right: 28,
              background: "none",
              border: "none",
              fontSize: 28,
              cursor: "pointer",
              color: COLORS.text,
            }}
          >
            ✕
          </button>
          <LogoMark size={56} />
          {[
            ["Galerie", "gallery"],
            ["Équipe", "team"],
            ["Rendez-vous", "booking"],
            ["Contact", "contact"],
          ].map(([label, id]) => (
            <span key={id} className="nav-link" onClick={() => scrollTo(id)}>
              {label}
            </span>
          ))}
        </div>
      )}

      {/* ═══ HERO SECTION ═══ */}
      <section
        id="hero"
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          overflow: "hidden",
          padding: "0 24px",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "-20%",
            right: "-10%",
            width: "60vw",
            height: "60vw",
            borderRadius: "50%",
            background: `radial-gradient(circle, ${COLORS.mintLight}22 0%, transparent 70%)`,
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "-20%",
            left: "-15%",
            width: "50vw",
            height: "50vw",
            borderRadius: "50%",
            background: `radial-gradient(circle, ${COLORS.beige}22 0%, transparent 70%)`,
            pointerEvents: "none",
          }}
        />
        <FloatingOrb top="15%" left="8%" size={80} delay={0} />
        <FloatingOrb top="65%" left="80%" size={60} delay={2} color={COLORS.beige} />
        <FloatingOrb top="30%" left="75%" size={40} delay={1.5} />

        <div style={{ textAlign: "center", maxWidth: 800, position: "relative", zIndex: 1 }}>
          <div
            style={{
              animation: "scaleIn 1s cubic-bezier(0.22, 1, 0.36, 1) forwards",
              marginBottom: 40,
              display: "inline-block",
            }}
          >
            <LogoMark size={100} />
          </div>

          <h1
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(44px, 7vw, 86px)",
              fontWeight: 300,
              fontStyle: "italic",
              color: COLORS.text,
              lineHeight: 1.05,
              marginBottom: 8,
              animation: "fadeUp 1s cubic-bezier(0.22, 1, 0.36, 1) 0.2s both",
            }}
          >
            Christina
          </h1>
          <p
            style={{
              fontFamily: "'Josefin Sans', sans-serif",
              fontSize: "clamp(12px, 2vw, 16px)",
              letterSpacing: 10,
              textTransform: "uppercase",
              color: COLORS.textLight,
              marginBottom: 32,
              animation: "fadeUp 1s cubic-bezier(0.22, 1, 0.36, 1) 0.4s both",
              fontWeight: 300,
            }}
          >
            Coiffure
          </p>

          <p
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(18px, 3vw, 26px)",
              fontWeight: 300,
              color: COLORS.textLight,
              maxWidth: 500,
              margin: "0 auto 48px",
              lineHeight: 1.6,
              animation: "fadeUp 1s cubic-bezier(0.22, 1, 0.36, 1) 0.6s both",
            }}
          >
            L&apos;art de sublimer votre beauté naturelle,
            <br />
            dans un espace de douceur et d&apos;élégance.
          </p>

          <div style={{ animation: "fadeUp 1s cubic-bezier(0.22, 1, 0.36, 1) 0.8s both" }}>
            <button className="btn-book" onClick={() => scrollTo("booking")}>
              <span>Prendre Rendez-vous</span>
            </button>
          </div>
        </div>

        <div
          style={{
            position: "absolute",
            bottom: 40,
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 8,
            animation: "fadeIn 1s ease 1.5s both",
            cursor: "pointer",
          }}
          onClick={() => scrollTo("gallery")}
        >
          <span
            style={{
              fontSize: 10,
              letterSpacing: 3,
              textTransform: "uppercase",
              color: COLORS.beige,
              fontFamily: "'Josefin Sans', sans-serif",
            }}
          >
            Découvrir
          </span>
          <div
            style={{
              width: 1,
              height: 40,
              background: `linear-gradient(to bottom, ${COLORS.beige}, transparent)`,
              animation: "gentlePulse 2s ease-in-out infinite",
            }}
          />
        </div>
      </section>

      {/* ═══ GALLERY ═══ */}
      <section
        id="gallery"
        data-reveal
        style={{
          padding: "100px 24px",
          maxWidth: 1200,
          margin: "0 auto",
        }}
      >
        <div className={revealClass("gallery")}>
          <SectionTitle subtitle="Notre univers" title="Galerie" />
        </div>

        <div
          className={revealClass("gallery", 1)}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: 16,
            gridAutoRows: 280,
          }}
        >
          {galleryImages.map((img, i) => (
            <div
              key={i}
              className="gallery-item"
              style={{
                gridRow: img.span === "row" ? "span 2" : "span 1",
              }}
              onClick={() => setLightboxImg(img.url)}
            >
              <img src={img.url} alt={img.alt} loading="lazy" />
            </div>
          ))}
        </div>
      </section>

      {lightboxImg && (
        <div
          onClick={() => setLightboxImg(null)}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.85)",
            zIndex: 1000,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "zoom-out",
            animation: "fadeIn 0.3s ease",
            padding: 24,
          }}
        >
          <img
            src={lightboxImg}
            alt=""
            style={{
              maxWidth: "90vw",
              maxHeight: "85vh",
              borderRadius: 12,
              objectFit: "contain",
              animation: "scaleIn 0.4s cubic-bezier(0.22, 1, 0.36, 1)",
            }}
          />
        </div>
      )}

      {/* ═══ TEAM ═══ */}
      <section
        id="team"
        data-reveal
        style={{
          padding: "100px 24px",
          background: `linear-gradient(180deg, ${COLORS.cream} 0%, ${COLORS.warmWhite} 100%)`,
        }}
      >
        <div className={revealClass("team")} style={{ maxWidth: 1000, margin: "0 auto" }}>
          <SectionTitle subtitle="Passion & savoir-faire" title="Notre Équipe" />

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: 32,
              maxWidth: 700,
              margin: "0 auto",
            }}
          >
            {[
              {
                name: "Christina",
                role: "Fondatrice & Coiffeuse",
                desc: "Passionnée par la coiffure depuis plus de 15 ans, Christina met son expertise et sa créativité au service de votre style unique.",
                img: "https://images.unsplash.com/photo-1580618672591-eb180b1a973f?w=400&h=500&fit=crop&crop=face",
              },
              {
                name: "L'équipe",
                role: "Stylistes & Coloristes",
                desc: "Une équipe soudée de professionnels formés aux dernières tendances, dédiée à vous offrir une expérience exceptionnelle.",
                img: "https://images.unsplash.com/photo-1559599101-f09722fb4948?w=400&h=500&fit=crop",
              },
            ].map((member, i) => (
              <div key={i} className={`team-card ${revealClass("team", i + 1)}`}>
                <div style={{ height: 300, overflow: "hidden" }}>
                  <img
                    src={member.img}
                    alt={member.name}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      transition: "transform 0.7s ease",
                    }}
                    onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
                    onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
                  />
                </div>
                <div style={{ padding: "28px 28px 32px" }}>
                  <h3
                    style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontSize: 28,
                      fontWeight: 400,
                      fontStyle: "italic",
                      color: COLORS.text,
                      marginBottom: 4,
                    }}
                  >
                    {member.name}
                  </h3>
                  <p
                    style={{
                      fontSize: 11,
                      letterSpacing: 3,
                      textTransform: "uppercase",
                      color: COLORS.mint,
                      marginBottom: 16,
                      fontWeight: 400,
                    }}
                  >
                    {member.role}
                  </p>
                  <p style={{ fontSize: 14, lineHeight: 1.7, color: COLORS.textLight, fontWeight: 300 }}>
                    {member.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ BOOKING ═══ */}
      <section
        id="booking"
        data-reveal
        style={{
          padding: "100px 24px",
          maxWidth: 900,
          margin: "0 auto",
        }}
      >
        <div className={revealClass("booking")}>
          <SectionTitle subtitle="Votre moment" title="Prendre Rendez-vous" />
        </div>

        <div className={revealClass("booking", 1)} style={{ background: "white", borderRadius: 28, padding: "clamp(24px, 5vw, 48px)", boxShadow: "0 8px 40px rgba(0,0,0,0.04)" }}>
          <div style={{ marginBottom: 40 }}>
            <p style={{ fontSize: 12, letterSpacing: 3, textTransform: "uppercase", color: COLORS.mint, marginBottom: 16, fontWeight: 500 }}>
              1 — Choisir un service
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 10 }}>
              {bookingServices.map((s, i) => (
                <button
                  key={i}
                  className={`time-slot ${selectedService === i ? "selected" : ""}`}
                  onClick={() => setSelectedService(i)}
                  style={{ textAlign: "left", display: "flex", justifyContent: "space-between", alignItems: "center" }}
                >
                  <div>
                    <div style={{ fontWeight: 500 }}>{s.name}</div>
                    <div style={{ fontSize: 12, opacity: 0.6, marginTop: 2 }}>{s.duration}</div>
                  </div>
                  <div style={{ fontWeight: 500, fontSize: 15 }}>{s.price}</div>
                </button>
              ))}
            </div>
          </div>

          <div style={{ marginBottom: 40 }}>
            <p style={{ fontSize: 12, letterSpacing: 3, textTransform: "uppercase", color: COLORS.mint, marginBottom: 16, fontWeight: 500 }}>
              2 — Choisir une date
            </p>
            <div style={{ display: "flex", gap: 8, overflowX: "auto", paddingBottom: 8 }}>
              {dates.map((d, i) => {
                const f = formatDate(d);
                const isSelected = selectedDate === i;
                return (
                  <button
                    key={i}
                    onClick={() => setSelectedDate(i)}
                    style={{
                      minWidth: 72,
                      padding: "14px 12px",
                      borderRadius: 14,
                      border: `2px solid ${isSelected ? COLORS.mint : COLORS.mintLight}`,
                      background: isSelected ? COLORS.mint : "transparent",
                      color: isSelected ? "white" : COLORS.text,
                      cursor: "pointer",
                      textAlign: "center",
                      transition: "all 0.3s ease",
                      fontFamily: "'Josefin Sans', sans-serif",
                      flexShrink: 0,
                    }}
                  >
                    <div style={{ fontSize: 11, opacity: 0.7, letterSpacing: 1 }}>{f.day}</div>
                    <div style={{ fontSize: 22, fontWeight: 500, margin: "4px 0" }}>{f.num}</div>
                    <div style={{ fontSize: 10, opacity: 0.6, letterSpacing: 1 }}>{f.month}</div>
                  </button>
                );
              })}
            </div>
          </div>

          <div style={{ marginBottom: 40 }}>
            <p style={{ fontSize: 12, letterSpacing: 3, textTransform: "uppercase", color: COLORS.mint, marginBottom: 16, fontWeight: 500 }}>
              3 — Choisir une heure
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {timeSlots.map((t, i) => (
                <button key={i} className={`time-slot ${selectedTime === i ? "selected" : ""}`} onClick={() => setSelectedTime(i)}>
                  {t}
                </button>
              ))}
            </div>
          </div>

          <div style={{ marginBottom: 36 }}>
            <p style={{ fontSize: 12, letterSpacing: 3, textTransform: "uppercase", color: COLORS.mint, marginBottom: 16, fontWeight: 500 }}>
              4 — Vos coordonnées
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              <input
                className="input-field"
                placeholder="Votre nom"
                value={bookingName}
                onChange={(e) => setBookingName(e.target.value)}
              />
              <input
                className="input-field"
                placeholder="Votre téléphone"
                value={bookingPhone}
                onChange={(e) => setBookingPhone(e.target.value)}
              />
            </div>
          </div>

          <div style={{ textAlign: "center" }}>
            <button
              className="btn-book"
              style={{
                opacity: selectedService !== null && selectedDate !== null && selectedTime !== null ? 1 : 0.5,
                pointerEvents: selectedService !== null && selectedDate !== null && selectedTime !== null ? "auto" : "none",
              }}
            >
              <span>Confirmer le rendez-vous</span>
            </button>
          </div>
        </div>
      </section>

      {/* ═══ CONTACT / MAP ═══ */}
      <section
        id="contact"
        data-reveal
        style={{
          padding: "100px 24px",
          background: `linear-gradient(180deg, ${COLORS.warmWhite} 0%, ${COLORS.cream} 100%)`,
        }}
      >
        <div className={revealClass("contact")} style={{ maxWidth: 1000, margin: "0 auto" }}>
          <SectionTitle subtitle="Nous retrouver" title="Contact & Accès" />

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: 40,
              alignItems: "start",
            }}
          >
            <div className={revealClass("contact", 1)}>
              <div style={{ background: "white", borderRadius: 24, padding: 36, boxShadow: "0 4px 24px rgba(0,0,0,0.04)" }}>
                {[
                  { icon: "📍", label: "Adresse", value: "Rue du Seyon 12\n2000 Neuchâtel" },
                  { icon: "📞", label: "Téléphone", value: "+41 32 123 45 67" },
                  { icon: "🕐", label: "Horaires", value: "Lun-Ven : 9h-18h\nSam : 9h-16h\nDim : Fermé" },
                  { icon: "✉️", label: "Email", value: "info@christinacoiffure.ch" },
                ].map((item, i) => (
                  <div
                    key={i}
                    style={{
                      display: "flex",
                      gap: 16,
                      padding: "18px 0",
                      borderBottom: i < 3 ? `1px solid ${COLORS.cream}` : "none",
                    }}
                  >
                    <span style={{ fontSize: 22, lineHeight: 1 }}>{item.icon}</span>
                    <div>
                      <p style={{ fontSize: 11, letterSpacing: 2, textTransform: "uppercase", color: COLORS.mint, marginBottom: 6, fontWeight: 500 }}>
                        {item.label}
                      </p>
                      <p style={{ fontSize: 14, color: COLORS.text, lineHeight: 1.6, whiteSpace: "pre-line", fontWeight: 300 }}>
                        {item.value}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className={revealClass("contact", 2)}>
              <div style={{ borderRadius: 24, overflow: "hidden", height: 380 }}>
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d43269.2!2d6.9319!3d46.9928!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x478e8e1e1e1e1e1e%3A0x0!2sNeuch%C3%A2tel!5e0!3m2!1sfr!2sch!4v1"
                  width="100%"
                  height="100%"
                  style={{ border: 0, borderRadius: 24 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Localisation Christina Coiffure — Neuchâtel"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ FOOTER ═══ */}
      <footer
        style={{
          padding: "72px 24px 40px",
          background: "#2C2C2C",
          color: "rgba(255,255,255,0.5)",
          position: "relative",
        }}
      >
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: `linear-gradient(90deg, transparent, ${COLORS.mint}44, transparent)` }} />

        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div
            className="foot-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: 40,
              marginBottom: 56,
            }}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <LogoMark size={44} />
              <div>
                <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 22, fontWeight: 300, fontStyle: "italic", color: "rgba(255,255,255,0.85)" }}>
                  Christina Coiffure
                </p>
                <p style={{ fontSize: 12, letterSpacing: 2, color: "rgba(255,255,255,0.35)", fontWeight: 300, marginTop: 4 }}>
                  L&apos;art de sublimer votre beauté
                </p>
              </div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <p style={{ fontSize: 10, letterSpacing: 3, textTransform: "uppercase", color: COLORS.mint, fontWeight: 500, marginBottom: 4 }}>
                Navigation
              </p>
              {[["Galerie", "gallery"], ["Équipe", "team"], ["Rendez-vous", "booking"], ["Contact", "contact"]].map(([label, id]) => (
                <span key={id} className="nav-link" onClick={() => scrollTo(id)} style={{ fontSize: 13, fontWeight: 300, color: "rgba(255,255,255,0.4)", cursor: "pointer" }}>
                  {label}
                </span>
              ))}
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <p style={{ fontSize: 10, letterSpacing: 3, textTransform: "uppercase", color: COLORS.mint, fontWeight: 500, marginBottom: 4 }}>
                Horaires
              </p>
              <p style={{ fontSize: 13, color: "rgba(255,255,255,0.4)", fontWeight: 300, lineHeight: 1.8 }}>
                Lundi – Vendredi<br /><span style={{ color: "rgba(255,255,255,0.65)" }}>9h00 – 18h00</span>
              </p>
              <p style={{ fontSize: 13, color: "rgba(255,255,255,0.4)", fontWeight: 300, lineHeight: 1.8 }}>
                Samedi<br /><span style={{ color: "rgba(255,255,255,0.65)" }}>9h00 – 16h00</span>
              </p>
              <p style={{ fontSize: 13, color: "rgba(255,255,255,0.35)", fontWeight: 300 }}>Dimanche — Fermé</p>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <p style={{ fontSize: 10, letterSpacing: 3, textTransform: "uppercase", color: COLORS.mint, fontWeight: 500, marginBottom: 4 }}>
                Contact
              </p>
              <p style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", fontWeight: 300, lineHeight: 1.7 }}>
                +41 32 123 45 67<br />info@christinacoiffure.ch
              </p>
              <div style={{ display: "flex", gap: 16, marginTop: 8 }}>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram" style={{ color: "rgba(255,255,255,0.4)", transition: "color 0.3s ease" }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="2" width="20" height="20" rx="5" /><circle cx="12" cy="12" r="5" /><circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" /></svg>
                </a>
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook" style={{ color: "rgba(255,255,255,0.4)", transition: "color 0.3s ease" }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" /></svg>
                </a>
              </div>
            </div>
          </div>

          <div style={{ width: "100%", height: 1, background: "rgba(255,255,255,0.06)", marginBottom: 28 }} />

          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 16 }}>
            <p style={{ fontSize: 11, fontWeight: 300, letterSpacing: 1, color: "rgba(255,255,255,0.25)" }}>
              © 2026 Christina Coiffure · Tous droits réservés
            </p>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ fontSize: 10, letterSpacing: 1.5, color: "rgba(255,255,255,0.25)", fontWeight: 300 }}>Développé par</span>
              <span
                style={{
                  fontFamily: "'Josefin Sans', sans-serif",
                  fontSize: 14,
                  fontWeight: 500,
                  letterSpacing: 4,
                  textTransform: "uppercase",
                  background: "linear-gradient(135deg, #c84bff, #ff6b35)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Zypta
              </span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
