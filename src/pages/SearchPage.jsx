import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import campers from "../data/campers";

// ── SVG icons (inline, zero deps) ───────────────────────
const SearchIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
  </svg>
);

const CloseIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 6 6 18M6 6l12 12"/>
  </svg>
);

const ArrowRightIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14M12 5l7 7-7 7"/>
  </svg>
);

const AlertIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/><path d="M12 8v4M12 16h.01"/>
  </svg>
);

// ── Component ────────────────────────────────────────────
export default function SearchPage() {
  const [query, setQuery]           = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [notFound, setNotFound]     = useState(false);
  const inputRef                    = useRef(null);
  const wrapperRef                  = useRef(null);
  const navigate                    = useNavigate();

  // Filter suggestions whenever query changes
  useEffect(() => {
    const q = query.trim().toLowerCase();
    if (q.length === 0) {
      setSuggestions([]);
      setShowDropdown(false);
      setNotFound(false);
      return;
    }
    const matches = campers.filter(c => c.name.toLowerCase().startsWith(q));
    setSuggestions(matches);
    setShowDropdown(true);
    setNotFound(matches.length === 0);
  }, [query]);

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleSelect = (camper) => {
    setShowDropdown(false);
    navigate(`/result/${encodeURIComponent(camper.name)}`);
  };

  const handleClear = () => {
    setQuery("");
    setShowDropdown(false);
    setNotFound(false);
    inputRef.current?.focus();
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && suggestions.length > 0) {
      handleSelect(suggestions[0]);
    }
    if (e.key === "Escape") {
      setShowDropdown(false);
    }
  };

  return (
    <>
      {/* Animated background */}
      <div className="bg-animated">
        <div className="bg-orb" />
      </div>

      <main className="search-page">
        {/* Badge */}
        <div className="badge">
          <span className="badge-dot" />
          Camp Portal 2026
        </div>

        {/* Heading */}
        <h1 className="main-heading">Check Your<br />Camp Personality</h1>
        <p className="subtitle">Enter your name below to view your camp photo and personality.</p>

        {/* Search Card */}
        <div className="search-card">
          <div className="search-wrapper" ref={wrapperRef}>
            <div className="search-input-container">
              <span className="search-icon"><SearchIcon /></span>
              <input
                ref={inputRef}
                className="search-input"
                type="text"
                placeholder="Type your name..."
                value={query}
                onChange={e => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                onFocus={() => query.trim() && setShowDropdown(true)}
                autoComplete="off"
                spellCheck="false"
                autoFocus
              />
              {query && (
                <button className="clear-btn" onClick={handleClear} aria-label="Clear search">
                  <CloseIcon />
                </button>
              )}
            </div>

            {/* Suggestions Dropdown */}
            {showDropdown && suggestions.length > 0 && (
              <div className="dropdown" role="listbox">
                {suggestions.map(camper => (
                  <div
                    key={camper.id}
                    className="dropdown-item"
                    role="option"
                    tabIndex={0}
                    onClick={() => handleSelect(camper)}
                    onKeyDown={e => e.key === "Enter" && handleSelect(camper)}
                  >
                    <div className="dropdown-avatar">
                      {camper.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <div className="dropdown-name">{camper.name}</div>
                      <div className="dropdown-label">Camp Participant</div>
                    </div>
                    <span className="dropdown-arrow"><ArrowRightIcon /></span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Not found message */}
          {notFound && (
            <div className="error-message" role="alert">
              <AlertIcon />
              Name not found. Please select a valid name.
            </div>
          )}
        </div>

        <p className="search-hint">
          <span>9 participants</span> registered &nbsp;·&nbsp; Select your name from the suggestions
        </p>
      </main>
    </>
  );
}

