import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import campers from "../data/campers";

// ── SVG Icons ────────────────────────────────────────────
const ArrowLeftIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 12H5M12 5l-7 7 7 7"/>
  </svg>
);

const StarIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
  </svg>
);

const ImageOffIcon = () => (
  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="m2 2 20 20"/><path d="M10.41 10.41a2 2 0 1 1-2.83-2.83"/><line x1="13.5" x2="6" y1="13.5" y2="21"/><line x1="18" x2="21" y1="12" y2="15"/>
    <path d="M3.59 3.59A1.99 1.99 0 0 0 3 5v14a2 2 0 0 0 2 2h14c.55 0 1.052-.22 1.42-.58"/>
    <path d="M21 15V5a2 2 0 0 0-2-2H9"/>
  </svg>
);

// ── Component ────────────────────────────────────────────
export default function ResultPage() {
  const { name }   = useParams();
  const navigate   = useNavigate();
  const [imgError, setImgError] = useState(false);

  const decodedName = decodeURIComponent(name);
  const camper = campers.find(
    c => c.name.toLowerCase() === decodedName.toLowerCase()
  );

  // Guard: if name not found in data, redirect home
  if (!camper) {
    return (
      <>
        <div className="bg-animated"><div className="bg-orb" /></div>
        <main className="result-page" style={{ justifyContent: "center" }}>
          <div style={{ textAlign: "center", color: "var(--text-secondary)" }}>
            <p style={{ fontSize: "1.1rem", marginBottom: 20 }}>Person not found.</p>
            <button className="back-btn" onClick={() => navigate("/")}>
              <ArrowLeftIcon /> Go Back
            </button>
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      {/* Animated background */}
      <div className="bg-animated"><div className="bg-orb" /></div>

      <main className="result-page">
        {/* Top bar */}
        <nav className="result-topbar">
          <button className="back-btn" onClick={() => navigate("/")}>
            <ArrowLeftIcon />
            Search Another Name
          </button>
        </nav>

        {/* Content */}
        <div className="result-content">
          {/* Badge */}
          <div className="result-badge">
            <StarIcon /> YOUR CAMP PERSONALITY
          </div>

          {/* Name */}
          <h1 className="result-name">{camper.name}</h1>
          <p className="result-subtitle">Camp Participant · 2026</p>

          {/* Photo Card */}
          <div className="photo-card">
            <div className="photo-frame">
              {imgError ? (
                <div className="photo-error">
                  <ImageOffIcon />
                  <p>
                    Photo not uploaded yet.<br />
                    <span style={{ fontSize: "0.8rem", opacity: 0.7 }}>
                      Add <code style={{ background: "rgba(255,255,255,0.1)", padding: "2px 6px", borderRadius: 4 }}>
                        {camper.image}
                      </code> to the public folder.
                    </span>
                  </p>
                </div>
              ) : (
                <>
                  <img
                    src={camper.image}
                    alt={`${camper.name}'s camp photo`}
                    onError={() => setImgError(true)}
                    loading="eager"
                  />
                  <div className="photo-shimmer" />
                </>
              )}
            </div>

            {/* Card Footer */}
            <div className="photo-card-footer">
              <span className="photo-footer-name">{camper.name}</span>
              <span className="photo-footer-tag">
                <span className="status-dot" />
                Active
              </span>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

