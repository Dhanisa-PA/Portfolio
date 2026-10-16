/* ==== OWNER CONFIGURATION: edit only this block ==== */
const CONFIG = {
  email: "dhanisaapa@gmail.com",
  linkedin: "https://www.linkedin.com/in/dhanisa-pa",
  tryhackme: "https://tryhackme.com/p/dhanisapa226",
  github: "https://github.com/Dhanisa-PA",
  resumeAvailable: false, // set to true after adding resume/resume.pdf
  projects: [
    { title: "Nmap Network Scanning", status: "Learning Project",
      description: "Explore network discovery and service enumeration concepts using Nmap in an authorized lab environment.",
      objective: "Understand network discovery and identify exposed services in a permitted lab.",
      tools: ["Nmap"], areas: ["Host discovery", "Port scanning", "Service identification"],
      repo: "" /* full https:// GitHub repository URL */ },
    { title: "Web Application Security Testing Using Burp Suite", status: "Lab Practice",
      description: "Explore web application request and response analysis using Burp Suite in an authorized testing environment.",
      objective: "Understand HTTP traffic and common web application testing workflows.",
      tools: ["Burp Suite"], areas: ["Request inspection", "Response analysis", "Security testing fundamentals"],
      repo: "" },
    { title: "OWASP Top 10 Vulnerability Testing", status: "Learning Project",
      description: "Study common web application security risks and explore appropriate testing approaches in a controlled environment.",
      objective: "Understand common web application vulnerability categories.",
      tools: [] /* add only tools you actually used */,
      areas: ["Vulnerability identification", "Risk awareness", "Secure development concepts"], repo: "" }
  ]
};
/* ==== END CONFIGURATION ==== */

(() => {
  "use strict";
  document.documentElement.classList.add("js");
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const isUrl = v => { try { return /^https?:$/.test(new URL(v).protocol); } catch { return false; } };
  const isEmail = v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
  const el = (tag, props = {}, text) => { const e = document.createElement(tag); Object.assign(e, props); if (text) e.textContent = text; return e; };

  /* ---- Navigation ---- */
  function initNav() {
    const burger = $("#burger"), menu = $("#menu");
    const setOpen = open => { menu.classList.toggle("open", open); burger.setAttribute("aria-expanded", open); burger.setAttribute("aria-label", open ? "Close menu" : "Open menu"); };
    burger.addEventListener("click", () => setOpen(!menu.classList.contains("open")));
    menu.addEventListener("click", e => { if (e.target.closest("a")) setOpen(false); });
    document.addEventListener("keydown", e => { if (e.key === "Escape" && menu.classList.contains("open")) { setOpen(false); burger.focus(); } });
    const links = $$(".menu a:not(.btn)");
    const io = new IntersectionObserver(entries => entries.forEach(en => {
      if (en.isIntersecting) links.forEach(a => { const on = a.getAttribute("href") === "#" + en.target.id; a.classList.toggle("active", on); on ? a.setAttribute("aria-current", "true") : a.removeAttribute("aria-current"); });
    }), { rootMargin: "-45% 0px -50% 0px" });
    $$("main section[id]").forEach(s => io.observe(s));
  }

  /* ---- Reveal on scroll ---- */
  function initReveal() {
    const items = $$(".sec");
    items.forEach(s => s.classList.add("reveal"));
    if (reduceMotion || !("IntersectionObserver" in window)) return items.forEach(s => s.classList.add("in"));
    const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }), { threshold: .08 });
    items.forEach(s => io.observe(s));
  }

  /* ---- Hero typing ---- */
  function initTyping() {
    const out = $("#typed"); if (!out) return;
    const lines = ["> Exploring Defensive Security", "> Learning Network Analysis", "> Building Cybersecurity Skills"];
    if (reduceMotion) { out.textContent = lines[0]; return; }
    let l = 0, c = 0, del = false;
    const tick = () => {
      const t = lines[l];
      c += del ? -1 : 1; out.textContent = t.slice(0, c);
      let wait = del ? 25 : 60;
      if (!del && c === t.length) { del = true; wait = 1800; }
      else if (del && c === 0) { del = false; l = (l + 1) % lines.length; wait = 400; }
      setTimeout(tick, wait);
    };
    tick();
  }

  /* ---- Network canvas (pauses when off-screen or reduced motion) ---- */
  function initNetwork() {
    const cv = $("#net"); if (!cv) return;
    const ctx = cv.getContext("2d"), W = cv.width, H = cv.height;
    const nodes = Array.from({ length: 26 }, () => ({ x: Math.random() * W, y: Math.random() * H * .75, vx: (Math.random() - .5) * .25, vy: (Math.random() - .5) * .25 }));
    let running = false;
    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      nodes.forEach(n => { if (!reduceMotion) { n.x += n.vx; n.y += n.vy; if (n.x < 0 || n.x > W) n.vx *= -1; if (n.y < 0 || n.y > H * .75) n.vy *= -1; } });
      for (let i = 0; i < nodes.length; i++) for (let j = i + 1; j < nodes.length; j++) {
        const d = Math.hypot(nodes[i].x - nodes[j].x, nodes[i].y - nodes[j].y);
        if (d < 130) { ctx.strokeStyle = `rgba(217,220,225,${.28 * (1 - d / 130)})`; ctx.beginPath(); ctx.moveTo(nodes[i].x, nodes[i].y); ctx.lineTo(nodes[j].x, nodes[j].y); ctx.stroke(); }
      }
      ctx.fillStyle = "rgba(217,220,225,.8)";
      nodes.forEach(n => { ctx.beginPath(); ctx.arc(n.x, n.y, 2, 0, 7); ctx.fill(); });
      if (running && !reduceMotion) requestAnimationFrame(draw);
    };
    draw();
    if (reduceMotion) return;
    new IntersectionObserver(([e]) => { const was = running; running = e.isIntersecting; if (running && !was) draw(); }).observe(cv);
  }

  /* ---- Contact, footer, resume ---- */
  function initContact() {
    const defs = [["Email", CONFIG.email, isEmail(CONFIG.email) ? "mailto:" + CONFIG.email : ""], ["LinkedIn", CONFIG.linkedin, CONFIG.linkedin], ["TryHackMe", CONFIG.tryhackme, CONFIG.tryhackme], ["GitHub", CONFIG.github, CONFIG.github]];
    const box = $("#contactLinks"), foot = $("#footerLinks"), note = $("#contactNote");
    defs.forEach(([name, raw, href]) => {
      const ok = name === "Email" ? !!href : isUrl(href);
      const a = el("a", { className: "btn" }, ok ? name : name + " (not set)");
      if (ok) { a.href = href; if (name !== "Email") { a.target = "_blank"; a.rel = "noopener noreferrer"; } }
      else { a.setAttribute("role", "link"); a.setAttribute("aria-disabled", "true"); a.title = "Add this in js/script.js"; }
      box.append(a);
      if (ok) { const f = el("a", { href }, name); if (name !== "Email") { f.target = "_blank"; f.rel = "noopener noreferrer"; } foot.append(f); }
    });
    if (isEmail(CONFIG.email)) {
      const b = el("button", { className: "btn", type: "button" }, "Copy Email");
      b.addEventListener("click", async () => {
        try { await navigator.clipboard.writeText(CONFIG.email); note.textContent = "Email address copied."; }
        catch { note.textContent = "Copy is unavailable here. Email: " + CONFIG.email; }
      });
      box.append(b);
    }
    $("#year").textContent = new Date().getFullYear();
  }
  function initResume() {
    const msg = "Resume not added yet. Add resume/resume.pdf and set resumeAvailable to true in js/script.js.";
    $$("[data-resume]").forEach(a => {
      if (CONFIG.resumeAvailable) return;
      a.removeAttribute("download"); a.removeAttribute("target"); a.setAttribute("aria-disabled", "true");
      a.addEventListener("click", e => { e.preventDefault(); const n = a.closest("section")?.querySelector(".note[id^=resumeNote]") || $("#resumeNote"); n.textContent = msg; });
    });
  }

  /* ---- Projects + modal ---- */
  function initProjects() {
    const grid = $("#projectGrid"), modal = $("#modal"), box = $(".modal-box", modal);
    let lastFocus = null;
    const fill = (id, text) => { $(id).textContent = text; };
    const badges = (parent, list) => { parent.replaceChildren(); (list.length ? list : ["To be added"]).forEach(t => parent.append(el("span", { className: "badge" }, t))); };
    const open = (p, trigger) => {
      lastFocus = trigger; fill("#mStatus", p.status); fill("#mTitle", p.title); fill("#mDesc", p.description); fill("#mObj", p.objective);
      badges($("#mTools"), p.tools);
      $("#mAreas").replaceChildren(...p.areas.map(a => el("li", {}, a)));
      modal.hidden = false; document.body.style.overflow = "hidden"; box.focus();
    };
    const close = () => { modal.hidden = true; document.body.style.overflow = ""; lastFocus && lastFocus.focus(); };
    CONFIG.projects.forEach(p => {
      const card = el("article", { className: "card proj" });
      const b = el("div", { className: "badges" }); badges(b, p.tools);
      const view = el("button", { className: "btn btn-sm", type: "button" }, "View Details");
      view.setAttribute("aria-haspopup", "dialog");
      view.addEventListener("click", () => open(p, view));
      const repo = isUrl(p.repo) ? el("a", { className: "btn btn-sm", href: p.repo, target: "_blank", rel: "noopener noreferrer" }, "GitHub Repository")
        : Object.assign(el("span", { className: "btn btn-sm", title: "Add the repository URL in js/script.js" }, "Repository: not published yet"), { role: "link" });
      if (!isUrl(p.repo)) repo.setAttribute("aria-disabled", "true");
      card.append(el("p", { className: "lvl" }, p.status), el("h3", {}, p.title), el("p", {}, p.description), b, el("div", { className: "actions" }));
      $(".actions", card).append(view, repo);
      grid.append(card);
    });
    modal.addEventListener("click", e => { if (e.target.closest("[data-close]")) close(); });
    document.addEventListener("keydown", e => {
      if (modal.hidden) return;
      if (e.key === "Escape") return close();
      if (e.key === "Tab") { // keep focus inside dialog
        const f = $$("button,[href],[tabindex]:not([tabindex='-1'])", box); if (!f.length) return;
        const first = f[0], last = f[f.length - 1];
        if (e.shiftKey && (document.activeElement === first || document.activeElement === box)) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    });
  }

  /* ---- Interactive terminal (predefined commands only, not a real shell) ---- */
  function initTerminal() {
    const out = $("#termOut"), input = $("#termIn"); if (!out || !input) return;
    const skillsText = CONFIG && "Networking: Fundamentals, TCP/IP, DNS, HTTP/HTTPS\nOperating Systems: Linux, Windows\nSecurity Tools: Nmap, Burp Suite, Wireshark, Metasploit\nSOC and Blue Team: SIEM, log analysis, threat detection, incident response (learning)";
    const commands = {
      help: () => "Available commands: help, about, skills, projects, contact, clear",
      about: () => "DHANISA PA, aspiring SOC Analyst from Thrissur, Kerala. BCA (University of Calicut). Cybersecurity training at Offenso Hackers Academy. Interested in security monitoring, threat analysis and incident response.",
      skills: () => skillsText,
      projects: () => CONFIG.projects.map((p, i) => `${i + 1}. ${p.title} [${p.status}]`).join("\n"),
      contact: () => ["Email: " + (isEmail(CONFIG.email) ? CONFIG.email : "not set"), "LinkedIn: " + (isUrl(CONFIG.linkedin) ? CONFIG.linkedin : "not set"), "TryHackMe: " + (isUrl(CONFIG.tryhackme) ? CONFIG.tryhackme : "not set"), "GitHub: " + (isUrl(CONFIG.github) ? CONFIG.github : "not set")].join("\n"),
      clear: () => { out.replaceChildren(); return null; }
    };
    const print = (text, cls) => { out.append(el("div", { className: cls || "" }, text)); out.scrollTop = out.scrollHeight; };
    const run = raw => {
      const cmd = raw.trim().toLowerCase(); if (!cmd) return;
      print("$ " + raw, "cmd");
      const fn = Object.prototype.hasOwnProperty.call(commands, cmd) ? commands[cmd] : null;
      if (!fn) return print(`Command not found: ${cmd.slice(0, 40)}. Type "help". (This is a portfolio demo, not a real shell.)`);
      const res = fn(); if (res) print(res);
    };
    print("Portfolio terminal demo. Type \"help\" or use the buttons below.");
    input.addEventListener("keydown", e => { if (e.key === "Enter") { run(input.value); input.value = ""; } });
    $("#chips").addEventListener("click", e => { const b = e.target.closest("[data-cmd]"); if (b) { run(b.dataset.cmd); input.focus({ preventScroll: true }); } });
  }

  [initNav, initReveal, initTyping, initNetwork, initContact, initResume, initProjects, initTerminal].forEach(f => f());
})();
