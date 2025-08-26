import React from "react";
import { motion } from "framer-motion";
import Lottie from "lottie-react";
import heroAnimation from "../assets/lottie/Login Leady.json";
import Preloader from "../components/Preloader";

// Add Mooxy font-face globally
// import "../assets/font/mooxy.ttf";
// Add style for Mooxy font
// const mooxyFont = {
//   fontFamily: 'Mooxy, sans-serif',
// };

// Add global font-face style for Mooxy (font file must be in public/assets/font/mooxy.ttf)
const mooxyFontFace = `@font-face { font-family: Mooxy; src: url('/assets/font/mooxy.ttf') format('truetype'); font-weight: normal; font-style: normal; }`;

if (typeof document !== 'undefined' && !document.getElementById('mooxy-font-face')) {
  const style = document.createElement('style');
  style.id = 'mooxy-font-face';
  style.innerHTML = mooxyFontFace;
  document.head.appendChild(style);
}


const features = [
  { icon: "🛠️", title: "Complaints", desc: "Raise & track issues" },
  { icon: "📜", title: "Certificates", desc: "Apply & download" },
  { icon: "🚮", title: "Sanitation", desc: "Garbage pickup tracking" },
  { icon: "🎓", title: "Education", desc: "DigiLocker documents" },
  { icon: "📢", title: "Announcements", desc: "Schemes & alerts" },
];

const Home: React.FC = () => {
  const [navOpen, setNavOpen] = React.useState(false);
  const [langDropdown, setLangDropdown] = React.useState(false);
  const [language, setLanguage] = React.useState<"English" | "मराठी">(
    "English"
  );
  const [loading, setLoading] = React.useState(true);

  const langOptions = [
    { code: "English", label: "English" },
    { code: "मराठी", label: "मराठी" },
  ];
  const handleLangSelect = (code: "English" | "मराठी") => {
    setLanguage(code);
    setLangDropdown(false);
  };
  React.useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (!(e.target instanceof Element)) return;
      if (
        !e.target.closest("#lang-dropdown-btn") &&
        !e.target.closest("#lang-dropdown-menu")
      ) {
        setLangDropdown(false);
      }
    }
    if (langDropdown) document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [langDropdown]);
  const [darkMode, setDarkMode] = React.useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("eg_dark") === "true";
    }
    return false;
  });
  React.useEffect(() => {
    if (darkMode) {
      document.body.classList.add("eg-dark");
      localStorage.setItem("eg_dark", "true");
    } else {
      document.body.classList.remove("eg-dark");
      localStorage.setItem("eg_dark", "false");
    }
  }, [darkMode]);

  React.useEffect(() => {
    // Simulate loading for 1.2s or until actual data is ready
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <Preloader />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 flex flex-col">
      {/* Header */}
      <header className="w-full flex items-center justify-between py-4 px-6 md:px-12 bg-white shadow-sm fixed top-0 left-0 z-30">
        {/* Logo & Title */}
        <div className="flex items-center gap-2">
          <span className="text-2xl">🌾</span>
          {/* <span className="font-mooxy text-xl md:text-2xl text-blue-700 tracking-tight">
            <span style={mooxyFont}>E-Gram Vikas Portal</span>
// Add global font-face style for Mooxy
const style = document.createElement('style');
style.innerHTML = `@font-face { font-family: Mooxy; src: url('/assets/font/mooxy.ttf') format('truetype'); font-weight: normal; font-style: normal; }`;
document.head.appendChild(style);
          </span> */}
          <span id="logo" className="font-Mooxy text-xl md:text-2xl text-blue-700 tracking-tight">
            E-Gram Vikas Portal
          </span>
        </div>
        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-4">
          {/* Language Dropdown */}
          <div className="relative">
            <button
              id="lang-dropdown-btn"
              type="button"
              className="flex items-center gap-1 px-3 py-1 rounded-lg text-blue-700 font-medium hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-300 transition"
              onClick={() => setLangDropdown((v) => !v)}
              aria-haspopup="listbox"
              aria-expanded={langDropdown}
            >
              <span className="text-xl">🌐</span>
              <span className="ml-1">{language}</span>
              <svg
                className={`ml-1 w-4 h-4 transition-transform ${
                  langDropdown ? "rotate-180" : ""
                }`}
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            {/* Dropdown menu */}
            {langDropdown && (
              <div
                id="lang-dropdown-menu"
                className="absolute left-0 mt-2 w-32 bg-white rounded-xl shadow-lg border border-blue-100 z-50 animate-fadeIn"
                style={{ minWidth: "7rem" }}
              >
                {langOptions.map((opt) => (
                  <button
                    key={opt.code}
                    className={`w-full text-left px-4 py-2 rounded-lg transition font-medium ${
                      language === opt.code
                        ? "bg-blue-50 text-blue-700"
                        : "hover:bg-blue-100 text-blue-900"
                    }`}
                    onClick={() =>
                      handleLangSelect(opt.code as "English" | "मराठी")
                    }
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            )}
            <style>{`
              @keyframes fadeIn { from { opacity: 0; transform: translateY(-8px);} to { opacity: 1; transform: translateY(0);} }
              .animate-fadeIn { animation: fadeIn 0.18s cubic-bezier(.4,0,.2,1); }
            `}</style>
          </div>
          {/* Elegant Dark/Light Mode Toggle */}
          <button
            type="button"
            title={darkMode ? "Switch to light mode" : "Switch to dark mode"}
            aria-pressed={darkMode}
            onClick={() => setDarkMode((v) => !v)}
            className="relative flex items-center w-20 h-10 p-1 rounded-full bg-white dark:bg-black transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-300 hover:ring-2 hover:ring-blue-200"
            style={{ minWidth: 80 }}
          >
            {/* Track */}
            {/* Track - Realistic Animated Sky */}
            <span
              className="absolute inset-0 w-full h-full rounded-full overflow-hidden"
              style={{ zIndex: 0 }}
              aria-hidden="true"
            >
              {darkMode ? (
                // Night sky with stars and moon
                <motion.svg
                  key="night"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  width="100%"
                  height="100%"
                  viewBox="0 0 80 40"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-full h-full"
                  style={{ display: "block" }}
                >
                  <defs>
                    <radialGradient id="nightSky" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#232946" />
                      <stop offset="100%" stopColor="#0f172a" />
                    </radialGradient>
                  </defs>
                  <rect width="80" height="40" rx="20" fill="url(#nightSky)" />
                  {/* Stars */}
                  <circle cx="15" cy="10" r="1" fill="#fff" opacity="0.8" />
                  <circle cx="30" cy="6" r="0.7" fill="#fff" opacity="0.7" />
                  <circle cx="55" cy="12" r="0.9" fill="#fff" opacity="0.9" />
                  <circle cx="68" cy="8" r="0.6" fill="#fff" opacity="0.6" />
                  <circle cx="64" cy="28" r="0.8" fill="#fff" opacity="0.8" />
                  <circle cx="50" cy="32" r="0.5" fill="#fff" opacity="0.7" />
                  {/* Moon */}
                  <motion.circle
                    cx="60"
                    cy="20"
                    r="7"
                    fill="#f4f1c9"
                    filter="url(#moonGlow)"
                    initial={{ scale: 0.8, opacity: 0.7 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                  />
                  <defs>
                    <filter
                      id="moonGlow"
                      x="-10"
                      y="-10"
                      width="80"
                      height="60"
                    >
                      <feGaussianBlur stdDeviation="2.5" result="glow" />
                      <feMerge>
                        <feMergeNode in="glow" />
                        <feMergeNode in="SourceGraphic" />
                      </feMerge>
                    </filter>
                  </defs>
                </motion.svg>
              ) : (
                // Day sky with clouds and sun
                <motion.svg
                  key="day"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  width="100%"
                  height="100%"
                  viewBox="0 0 80 40"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-full h-full"
                  style={{ display: "block" }}
                >
                  <defs>
                    <linearGradient
                      id="sky"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="40"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stopColor="#7dd3fc" />
                      <stop offset="1" stopColor="#bae6fd" />
                    </linearGradient>
                  </defs>
                  <rect width="80" height="40" rx="20" fill="url(#sky)" />
                  {/* Sun */}
                  <motion.circle
                    cx="20"
                    cy="20"
                    r="7"
                    fill="#fde047"
                    filter="url(#sunGlow)"
                    initial={{ scale: 0.8, opacity: 0.7 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                  />
                  {/* Clouds */}
                  <ellipse
                    cx="50"
                    cy="28"
                    rx="7"
                    ry="3.5"
                    fill="#fff"
                    opacity="0.7"
                  />
                  <ellipse
                    cx="62"
                    cy="24"
                    rx="5"
                    ry="2.5"
                    fill="#fff"
                    opacity="0.6"
                  />
                  <ellipse
                    cx="38"
                    cy="16"
                    rx="4"
                    ry="2"
                    fill="#fff"
                    opacity="0.5"
                  />
                  <defs>
                    <filter id="sunGlow" x="-10" y="-10" width="80" height="60">
                      <feGaussianBlur stdDeviation="2.5" result="glow" />
                      <feMerge>
                        <feMergeNode in="glow" />
                        <feMergeNode in="SourceGraphic" />
                      </feMerge>
                    </filter>
                  </defs>
                </motion.svg>
              )}
            </span>
            {/* Thumb - Animated Knob */}
            <motion.span
              className="absolute top-1 left-1 w-8 h-8 rounded-full flex items-center justify-center"
              style={{
                zIndex: 2,
                background: darkMode
                  ? "radial-gradient(circle at 60% 40%, #334155 70%, #0f172a 100%)"
                  : "radial-gradient(circle at 40% 40%, #fff 70%, #fef9c3 100%)",
              }}
              animate={{ x: darkMode ? 48 : 0 }}
              transition={{ type: "spring", stiffness: 400, damping: 28 }}
            >
              {darkMode ? (
                // Moon icon
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="#f4f1c9">
                  <path d="M21 12.79A9 9 0 1111.21 3a7 7 0 109.79 9.79z" />
                </svg>
              ) : (
                // Sun icon
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="#fde047">
                  <circle cx="12" cy="12" r="5" />
                  <path
                    d="M12 1v2m0 18v2m11-11h-2M3 12H1m16.95 7.07l-1.41-1.41M6.34 6.34L4.93 4.93m12.02 0l-1.41 1.41M6.34 17.66l-1.41 1.41"
                    stroke="#facc15"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
              )}
            </motion.span>
            {/* Glow effect for knob */}
            <motion.span
              className="absolute top-1 left-1 w-8 h-8 rounded-full pointer-events-none"
              style={{
                zIndex: 1,
                opacity: 0.7,
                background: darkMode
                  ? "radial-gradient(circle, #f4f1c9 0%, #f4f1c900 80%)"
                  : "radial-gradient(circle, #fde047 0%, #fde04700 80%)",
                filter: "blur(6px)",
              }}
              animate={{ x: darkMode ? 48 : 0 }}
              transition={{ type: "spring", stiffness: 400, damping: 28 }}
            />
            {/* Sun/Moon label for accessibility */}
            <span className="sr-only">
              {darkMode ? "Dark mode" : "Light mode"}
            </span>
          </button>
          <a
            href="/login"
            className="px-5 py-2 bg-blue-600 text-white rounded-lg font-semibold shadow hover:bg-blue-700 transition"
          >
            Login
          </a>
        </div>
        {/* Hamburger for mobile */}
        <button
          className="md:hidden flex items-center justify-center w-10 h-10 rounded-full border border-blue-100 bg-white dark:bg-black shadow focus:outline-none focus:ring-2 focus:ring-blue-300 ml-2"
          aria-label="Open menu"
          onClick={() => setNavOpen((v) => !v)}
        >
          <span className="sr-only">Open menu</span>
          <svg
            className={`w-7 h-7 text-blue-700 dark:text-blue-100 transition-transform duration-200 ${
              navOpen ? "rotate-90" : ""
            }`}
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
        {/* Mobile Nav Drawer */}
        <div
          className={`fixed top-0 right-0 h-full w-64 bg-white dark:bg-black shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${
            navOpen ? "translate-x-0" : "translate-x-full"
          } md:hidden`}
          style={{ minWidth: 240 }}
        >
          <div className="flex items-center justify-between px-6 py-4 border-b border-blue-100 dark:border-blue-900">
            <span className="text-2xl">🌾</span>
            <button
              className="w-9 h-9 flex items-center justify-center rounded-full border border-blue-100 bg-white dark:bg-black shadow focus:outline-none focus:ring-2 focus:ring-blue-300"
              aria-label="Close menu"
              onClick={() => setNavOpen(false)}
            >
              <svg
                className="w-6 h-6 text-blue-700 dark:text-blue-100"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <div className="flex flex-col gap-4 px-6 py-6">
            {/* Language Dropdown (mobile) */}
            <div className="relative mb-2">
              <button
                id="lang-dropdown-btn-mobile"
                type="button"
                className="flex items-center gap-1 px-3 py-2 rounded-lg text-blue-700 font-medium hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-300 w-full justify-between"
                onClick={() => setLangDropdown((v) => !v)}
                aria-haspopup="listbox"
                aria-expanded={langDropdown}
              >
                <span className="text-xl">🌐</span>
                <span className="ml-1">{language}</span>
                <svg
                  className={`ml-1 w-4 h-4 transition-transform ${
                    langDropdown ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              {langDropdown && (
                <div
                  id="lang-dropdown-menu-mobile"
                  className="absolute left-0 mt-2 w-32 bg-white rounded-xl shadow-lg border border-blue-100 z-50 animate-fadeIn"
                  style={{ minWidth: "7rem" }}
                >
                  {langOptions.map((opt) => (
                    <button
                      key={opt.code}
                      className={`w-full text-left px-4 py-2 rounded-lg transition font-medium ${
                        language === opt.code
                          ? "bg-blue-50 text-blue-700"
                          : "hover:bg-blue-100 text-blue-900"
                      }`}
                      onClick={() =>
                        handleLangSelect(opt.code as "English" | "मराठी")
                      }
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
            {/* Dark/Light Mode Toggle (mobile) */}
            <button
              type="button"
              title={darkMode ? "Switch to light mode" : "Switch to dark mode"}
              aria-pressed={darkMode}
              onClick={() => setDarkMode((v) => !v)}
              className="relative flex items-center w-14 h-10 p-1 rounded-full shadow-lg border border-blue-100 bg-white dark:bg-black transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-300 hover:shadow-xl hover:ring-2 hover:ring-blue-200 mb-2"
              style={{ minWidth: 56 }}
            >
              <span
                className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-50 via-white to-blue-100 dark:from-blue-900 dark:via-black dark:to-blue-950 transition-colors duration-300"
                style={{ zIndex: 0 }}
              />
              <span
                className="absolute top-1 left-1 w-8 h-8 rounded-full bg-white dark:bg-blue-900 shadow-md transition-all duration-300 flex items-center justify-center"
                style={{
                  transform: darkMode ? "translateX(24px)" : "translateX(0)",
                  boxShadow: darkMode
                    ? "0 2px 12px 0 rgba(30,64,175,0.18), 0 0 0 4px #1e293b22"
                    : "0 2px 12px 0 rgba(59,130,246,0.10)",
                  zIndex: 2,
                }}
              >
                {darkMode ? (
                  <svg
                    className="w-5 h-5 text-yellow-300 transition-colors duration-300"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M21 12.79A9 9 0 1111.21 3a7 7 0 109.79 9.79z" />
                  </svg>
                ) : (
                  <svg
                    className="w-5 h-5 text-yellow-400 transition-colors duration-300"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <circle cx="12" cy="12" r="5" />
                    <path d="M12 1v2m0 18v2m11-11h-2M3 12H1m16.95 7.07l-1.41-1.41M6.34 6.34L4.93 4.93m12.02 0l-1.41 1.41M6.34 17.66l-1.41 1.41" />
                  </svg>
                )}
              </span>
              <span
                className={`absolute top-1 left-1 w-8 h-8 rounded-full pointer-events-none transition-all duration-300 ${
                  darkMode
                    ? "bg-yellow-300/20 blur-sm"
                    : "bg-yellow-400/10 blur-sm"
                }`}
                style={{
                  transform: darkMode ? "translateX(24px)" : "translateX(0)",
                  zIndex: 1,
                  opacity: 0.7,
                }}
              />
              <span className="sr-only">
                {darkMode ? "Dark mode" : "Light mode"}
              </span>
            </button>
            {/* Login button (mobile) */}
            <a
              href="/login"
              className="px-5 py-2 bg-blue-600 text-white rounded-lg font-semibold shadow hover:bg-blue-700 transition"
            >
              Login
            </a>
          </div>
        </div>
        {/* Overlay for mobile nav */}
        {navOpen && (
          <div
            className="fixed inset-0 bg-black/30 z-40 md:hidden"
            onClick={() => setNavOpen(false)}
          />
        )}
        {/* Add global dark mode styles */}
        <style>{`
          body.eg-dark {
            background: #111;
            color: #fff;
            transition: background 0.4s cubic-bezier(.4,0,.2,1), color 0.4s cubic-bezier(.4,0,.2,1);
          }
          body.eg-dark .bg-white { background-color: #18181b !important; }
          body.eg-dark .text-blue-700, body.eg-dark .text-blue-900 { color: #c7d2fe !important; }
          body.eg-dark .bg-blue-600 { background-color: #1e293b !important; }
          body.eg-dark .shadow-lg { box-shadow: 0 4px 32px 0 #1e293b33 !important; }
          body.eg-dark .border-blue-100 { border-color: #334155 !important; }
          body.eg-dark .bg-blue-50 { background-color: #1e293b !important; }
          body.eg-dark .hover\:bg-blue-50:hover { background-color: #334155 !important; }
          body.eg-dark .bg-gradient-to-br { background: linear-gradient(135deg,#18181b 0%,#1e293b 100%) !important; }
          body.eg-dark .text-white { color: #fff !important; }
          body.eg-dark .text-black { color: #fff !important; }
          body.eg-dark .bg-white/80 { background-color: #18181bcc !important; }
          body.eg-dark .bg-white/60 { background-color: #18181b99 !important; }
          body.eg-dark .bg-white/40 { background-color: #18181b66 !important; }
          body.eg-dark .bg-white/20 { background-color: #18181b33 !important; }
          body.eg-dark .bg-white/10 { background-color: #18181b1a !important; }
          body.eg-dark .bg-white/5 { background-color: #18181b0d !important; }
          body.eg-dark .bg-white/0 { background-color: transparent !important; }
          body.eg-dark .text-yellow-400 { color: #fde68a !important; }
          body.eg-dark .text-yellow-300 { color: #fcd34d !important; }
        `}</style>
      </header>
      <div className="h-20" />

      {/* Hero Section */}
      <section className="flex flex-col md:flex-row items-center justify-between max-w-6xl mx-auto mt-8 md:mt-24 px-4 gap-8 w-full">
        {/* Left: Text */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="flex-1"
        >
          <h1 className="text-4xl md:text-5xl font-extrabold text-blue-900 mb-4">
            Empowering <br /> Villages Digitally
          </h1>
          <p className="text-lg text-blue-700 mb-8">
            A one-stop portal for citizens and officials to manage services,
            complaints, and welfare schemes in real time.
          </p>
          <div className="flex gap-4 mb-4">
            <a
              href="/register"
              className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold shadow hover:bg-blue-700 transition"
            >
              Get Started
            </a>
            <a
              href="#features"
              className="px-6 py-3 border border-blue-600 text-blue-700 rounded-lg font-semibold shadow hover:bg-blue-50 transition"
            >
              Learn More
            </a>
          </div>
        </motion.div>
        {/* Right: Illustration */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="flex-1 flex justify-center"
        >
          <Lottie
            animationData={heroAnimation}
            loop={true}
            autoplay={true}
            style={{ height: 400, width: 400 }}
          />
        </motion.div>
      </section>

      {/* Features Section */}
      <section
        id="features"
        className="max-w-6xl mx-auto mt-16 px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6"
      >
        {features.map((f, i) => (
          <motion.div
            key={f.title}
            whileHover={{ scale: 1.05 }}
            className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center text-center"
          >
            <span className="text-4xl mb-2">{f.icon}</span>
            <h3 className="font-bold text-lg text-blue-900 mb-1">{f.title}</h3>
            <p className="text-blue-700 text-sm">{f.desc}</p>
          </motion.div>
        ))}
      </section>

      {/* Call-to-Action */}
      <section className="mt-16 mb-8">
        <div className="max-w-4xl mx-auto bg-blue-600 rounded-2xl py-10 px-6 flex flex-col items-center shadow-lg">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Join the Digital Village Revolution
          </h2>
          <a
            href="/register"
            className="px-8 py-3 bg-white text-blue-700 font-semibold rounded-lg shadow hover:bg-blue-50 transition"
          >
            Register Now
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full flex flex-col md:flex-row items-center justify-between px-8 py-6 bg-white border-t mt-auto">
        <span className="text-gray-400 text-sm">
          &copy; 2025 E-Gram Vikas Portal
        </span>
        <span className="text-2xl mx-4">🌾</span>
        <div className="flex gap-4 text-sm text-blue-700">
          <a href="/privacy" className="hover:underline">
            Privacy Policy
          </a>
          <a href="/terms" className="hover:underline">
            Terms
          </a>
          <a href="/contact" className="hover:underline">
            Contact
          </a>
        </div>
      </footer>
    </div>
  );
};

export default Home;
