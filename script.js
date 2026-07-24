const SITE_CONFIG = {
  name: "xsqezz",
  pageTitle: "xsqezz | links",
  description: "Wszystkie ważne miejsca xsqezz w jednym miejscu.",
  eyebrow: "digital maker / 2026",
  tag: "/ xq",
  status: "online",
  location: "PL / EU",
  since: "since 19",
  bio: "Buduję rzeczy, które powinny istnieć. Kod, design i trochę chaosu po godzinach.",
  footer: "made with intent",
  avatar: "assets/avatar.svg",
  music: { enabled: false, title: "after hours", source: "assets/music.mp3", volume: 0.35 },
  links: [
    { title: "Discord", subtitle: "wpadnij się przywitać", href: "https://discord.com/", icon: "discord" },
    { title: "GitHub", subtitle: "kod, projekty, eksperymenty", href: "https://github.com/xsqezz", icon: "github" },
    { title: "TikTok", subtitle: "krótkie rzeczy z długim kontekstem", href: "https://www.tiktok.com/@xsqezz", icon: "tiktok" },
    { title: "YouTube", subtitle: "builds, dev i behind the scenes", href: "https://www.youtube.com/@xsqezz", icon: "youtube" },
    { title: "Sqezz Client", subtitle: "projekt, nad którym pracuję", href: "https://github.com/xsqezz/Sqezz-Client", icon: "spark" }
  ]
};

const ICONS = {
  discord: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M18.9 5.2A16.6 16.6 0 0 0 15 4l-.5 1a14.8 14.8 0 0 0-5 0L9 4a16.5 16.5 0 0 0-3.9 1.2C2.6 9 2 12.8 2.3 16.5A16.8 16.8 0 0 0 7 19l1.1-1.5m7.8 0L17 19a16.8 16.8 0 0 0 4.7-2.5c.4-4.3-.7-8-2.8-11.3ZM7.8 14.2c.7.6 1.6.9 2.2.9s1.5-.3 2.2-.9M7.2 11.5h.1m9.4 0h.1" /></svg>',
  github: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15 22v-3.4c.1-1.2-.4-2.1-1-2.6 3.3-.4 6.8-1.6 6.8-7.3a5.8 5.8 0 0 0-1.5-4A5.4 5.4 0 0 0 19.2 1S18 0.6 15.1 2.5a13.2 13.2 0 0 0-7.2 0C5 0.6 3.8 1 3.8 1a5.4 5.4 0 0 0-.1 3.7 5.8 5.8 0 0 0-1.5 4c0 5.7 3.5 6.9 6.8 7.3-.6.5-1 1.4-1 2.6V22" /></svg>',
  tiktok: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15 4c.2 2.2 1.5 3.5 3.7 3.7v3a9 9 0 0 1-3.7-1.1v5.7a5.7 5.7 0 1 1-5-5.6v3a2.7 2.7 0 1 0 2 2.6V4h3Z" /></svg>',
  youtube: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M21.5 7.1a2.8 2.8 0 0 0-2-2C17.8 4.6 12 4.6 12 4.6s-5.8 0-7.5.5a2.8 2.8 0 0 0-2 2A29 29 0 0 0 2 12a29 29 0 0 0 .5 4.9 2.8 2.8 0 0 0 2 2c1.7.5 7.5.5 7.5.5s5.8 0 7.5-.5a2.8 2.8 0 0 0 2-2A29 29 0 0 0 22 12a29 29 0 0 0-.5-4.9Z" /><path d="m10 15.5 5-3.5-5-3.5v7Z" /></svg>',
  spark: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m12 3 1.5 5.5L19 10l-5.5 1.5L12 17l-1.5-5.5L5 10l5.5-1.5L12 3Zm6.5 13 .6 2.1 2.1.6-2.1.6-.6 2.1-.6-2.1-2.1-.6 2.1-.6.6-2.1Z" /></svg>'
};

const setConfigText = () => document.querySelectorAll("[data-config]").forEach((element) => { const key = element.dataset.config; if (SITE_CONFIG[key]) element.textContent = SITE_CONFIG[key]; });
const applyConfigMedia = () => { document.querySelector("[data-config-image=avatar]").src = SITE_CONFIG.avatar; document.querySelector("[data-config-image=avatar]").alt = `Avatar ${SITE_CONFIG.name}`; document.title = SITE_CONFIG.pageTitle; document.querySelector('meta[name="description"]').content = SITE_CONFIG.description; document.querySelector('meta[property="og:title"]').content = SITE_CONFIG.pageTitle; document.querySelector('meta[property="og:description"]').content = SITE_CONFIG.description; document.querySelector('meta[name="twitter:title"]').content = SITE_CONFIG.pageTitle; document.querySelector('meta[name="twitter:description"]').content = SITE_CONFIG.description; };
const renderLinks = () => { document.querySelector("#link-list").innerHTML = SITE_CONFIG.links.map((link, index) => `<a class="profile-link" style="animation-delay:${index * 70}ms" href="${link.href}" target="_blank" rel="noopener noreferrer"><span class="link-icon">${ICONS[link.icon] || ICONS.spark}</span><span class="link-copy"><span class="link-title">${link.title}</span><span class="link-subtitle">${link.subtitle}</span></span><span class="link-arrow" aria-hidden="true">↗</span></a>`).join(""); };

const updateViews = () => { const key = "xsqezz-profile-views"; const current = Number(localStorage.getItem(key) || 1240) + 1; localStorage.setItem(key, current); const target = document.querySelector("#view-count"); let value = 0; const timer = setInterval(() => { value += Math.ceil((current - value) / 8); target.textContent = value.toLocaleString("en-US"); if (value >= current) clearInterval(timer); }, 30); };
const setupMusic = () => { const config = SITE_CONFIG.music; const player = document.querySelector("#music-player"); if (!config.enabled || !config.source) return; player.hidden = false; const audio = document.querySelector("#audio-player"); const play = document.querySelector("#play-button"); const volume = document.querySelector("#volume-control"); audio.src = config.source; audio.volume = config.volume; volume.value = config.volume; play.addEventListener("click", async () => { if (audio.paused) { try { await audio.play(); player.classList.add("is-playing"); play.setAttribute("aria-pressed", "true"); } catch { showToast("Dodaj plik audio do assets/"); } } else { audio.pause(); player.classList.remove("is-playing"); play.setAttribute("aria-pressed", "false"); } }); volume.addEventListener("input", () => { audio.volume = volume.value; }); };
let toastTimer; const showToast = (message) => { const toast = document.querySelector("#toast"); toast.textContent = message; toast.classList.add("is-visible"); clearTimeout(toastTimer); toastTimer = setTimeout(() => toast.classList.remove("is-visible"), 2200); };
const setupLinkFeedback = () => document.querySelectorAll(".profile-link").forEach((link) => link.addEventListener("contextmenu", async (event) => { event.preventDefault(); try { await navigator.clipboard.writeText(link.href); showToast("Link skopiowany"); } catch { showToast(link.href); } }));
const setupParticles = () => { const canvas = document.querySelector(".particle-field"); const context = canvas.getContext("2d"); let particles = []; const resize = () => { canvas.width = window.innerWidth * devicePixelRatio; canvas.height = window.innerHeight * devicePixelRatio; context.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0); particles = Array.from({ length: Math.min(42, Math.floor(window.innerWidth / 24)) }, () => ({ x: Math.random() * innerWidth, y: Math.random() * innerHeight, radius: Math.random() * 1.4 + .3, speed: Math.random() * .22 + .08, alpha: Math.random() * .45 + .12 })); }; const draw = () => { context.clearRect(0, 0, innerWidth, innerHeight); particles.forEach((particle) => { particle.y -= particle.speed; if (particle.y < -4) particle.y = innerHeight + 4; context.beginPath(); context.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2); context.fillStyle = `rgba(184,245,58,${particle.alpha})`; context.fill(); }); requestAnimationFrame(draw); }; resize(); window.addEventListener("resize", resize, { passive: true }); draw(); };

setConfigText(); applyConfigMedia(); renderLinks(); updateViews(); setupMusic(); setupLinkFeedback(); setupParticles(); document.querySelector("#current-year").textContent = new Date().getFullYear();
