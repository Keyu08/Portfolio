/* keyu.cuts: interactions */
(() => {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const canHover = window.matchMedia("(hover: hover)").matches;

  /* ---------- Availability month (keeps urgency copy fresh) ---------- */
  const next = new Date();
  next.setMonth(next.getMonth() + 1);
  const monthName = next.toLocaleString("en-US", { month: "long" });
  document.querySelectorAll("[data-month]").forEach((el) => (el.textContent = monthName));

  /* ---------- Video frames ----------
     Each <figure data-video="storytelling1"> gets a muted looping video.
     Looks for assets/videos/<name>.mp4, then .MP4, then .mov. If neither loads, it shows a
     labelled placeholder so the layout never breaks. */
  const makeVideo = (fig) => {
    const name = fig.dataset.video;
    const video = document.createElement("video");
    Object.assign(video, { muted: true, loop: true, playsInline: true, preload: "metadata" });
    video.setAttribute("muted", "");
    video.setAttribute("playsinline", "");
    // Tries a converted .mp4 first, then the original .MP4 / .mov straight from the camera or editor.
    ["mp4", "MP4", "mov"].forEach((ext, i, all) => {
      const s = document.createElement("source");
      // No type on .mov: Chrome rejects "video/quicktime" up front but plays most .mov files when it sniffs them itself.
      if (ext !== "mov") s.type = "video/mp4";
      if (i === all.length - 1) s.addEventListener("error", () => showPlaceholder(fig, name));
      s.src = `assets/videos/${name}.${ext}`;
      video.appendChild(s);
    });
    fig.prepend(video);
    // Safety net: NETWORK_NO_SOURCE means every source failed.
    setTimeout(() => { if (video.networkState === 3) showPlaceholder(fig, name); }, 2500);
    return video;
  };

  const showPlaceholder = (fig, name) => {
    if (fig.querySelector(".phone__placeholder")) return;
    fig.classList.add("is-missing");
    const ph = document.createElement("div");
    ph.className = "phone__placeholder";
    ph.innerHTML = `<span><b>${name}</b>add to assets/videos/</span>`;
    fig.prepend(ph);
  };

  const frames = [...document.querySelectorAll("[data-video]")];
  const videos = frames.map(makeVideo);

  // Autoplay when visible, pause when off-screen (saves battery and bandwidth).
  const playIO = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        const v = e.target.tagName === "VIDEO" ? e.target : e.target.querySelector("video");
        if (!v) return;
        if (e.isIntersecting && !reduceMotion) v.play().catch(() => {});
        else v.pause();
      });
    },
    { threshold: 0.35 }
  );
  frames.forEach((f) => playIO.observe(f));
  document.querySelectorAll("video[data-autoplay]").forEach((v) => playIO.observe(v));

  // With reduced motion: play on hover/tap only.
  if (reduceMotion) {
    frames.forEach((f, i) => {
      f.addEventListener("mouseenter", () => videos[i].play().catch(() => {}));
      f.addEventListener("mouseleave", () => videos[i].pause());
    });
  }

  /* ---------- Sound on hover ----------
     Hovering a video shows "Press for sound". Pressing unmutes that video (and mutes the rest);
     moving the mouse off it mutes it again. After the first press, hovering any video plays its
     sound straight away. Browsers only allow audio after a click, so the first press is required. */
  let soundUnlocked = false;
  const muteAll = (except) => videos.forEach((v) => { if (v !== except) v.muted = true; });
  const setSoundUI = (fig, on) => fig.classList.toggle("is-sound", on);
  frames.forEach((fig, i) => {
    const v = videos[i];
    const badge = document.createElement("span");
    badge.className = "phone__sound mono";
    badge.setAttribute("aria-hidden", "true");
    badge.innerHTML = '<span class="off">' + (canHover ? "Press for sound" : "Tap for sound") + '</span><span class="on">Sound on</span>';
    fig.appendChild(badge);
    fig.setAttribute("role", "button");
    fig.setAttribute("tabindex", "0");
    fig.setAttribute("aria-label", "Play with sound");

    const unmute = () => {
      muteAll(v);
      frames.forEach((f) => setSoundUI(f, false));
      v.muted = false;
      v.volume = 1;
      v.play().catch(() => {});
      setSoundUI(fig, true);
    };
    const mute = () => { v.muted = true; setSoundUI(fig, false); };
    const toggle = () => {
      if (v.muted) { soundUnlocked = true; unmute(); }
      else { mute(); if (!canHover) soundUnlocked = false; }
      if (window.__refreshCursor) window.__refreshCursor();
    };

    fig.addEventListener("click", toggle);
    fig.addEventListener("keydown", (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); toggle(); } });
    fig.addEventListener("mouseenter", () => { if (soundUnlocked && canHover) unmute(); });
    fig.addEventListener("mouseleave", mute);
    v.addEventListener("pause", () => { if (!v.muted) mute(); });
  });

  /* ---------- Hero word rotator ---------- */
  const words = [...document.querySelectorAll(".rotator__word")];
  if (words.length && !reduceMotion) {
    let i = 0;
    setInterval(() => {
      const cur = words[i];
      i = (i + 1) % words.length;
      cur.classList.remove("is-active");
      cur.classList.add("is-leaving");
      words[i].classList.add("is-active");
      setTimeout(() => cur.classList.remove("is-leaving"), 700);
    }, 2400);
  }

  /* ---------- Nav: solid on scroll, hide on scroll down ---------- */
  const nav = document.querySelector(".nav");
  const mobileCta = document.querySelector(".mobile-cta");
  const bookSection = document.getElementById("book");
  let lastY = 0;
  const onScroll = () => {
    const y = window.scrollY;
    nav.classList.toggle("is-scrolled", y > 20);
    nav.classList.toggle("is-hidden", y > lastY && y > 400);
    lastY = y;
    if (mobileCta) {
      const nearBook = bookSection.getBoundingClientRect().top < window.innerHeight;
      mobileCta.classList.toggle("is-visible", y > window.innerHeight * 0.8 && !nearBook);
    }
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- Hero parallax ---------- */
  const stage = document.querySelector(".hero__stage");
  if (stage && canHover && !reduceMotion) {
    const phones = stage.querySelectorAll(".phone");
    stage.addEventListener("mousemove", (e) => {
      const r = stage.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      phones.forEach((p, idx) => {
        const depth = [14, 22, 10][idx] || 12;
        p.style.translate = `${x * depth}px ${y * depth}px`;
      });
    });
    stage.addEventListener("mouseleave", () => phones.forEach((p) => (p.style.translate = "")));
  }

  /* ---------- Custom cursor ---------- */
  const cursor = document.querySelector(".cursor");
  if (cursor && canHover && !reduceMotion) {
    const label = cursor.querySelector(".cursor__label");
    let cx = 0, cy = 0, tx = 0, ty = 0;
    let hoverEl = null;
    const refresh = () => {
      const target = hoverEl?.closest("[data-cursor]");
      const mode = target?.dataset.cursor;
      cursor.classList.toggle("is-play", mode === "play");
      cursor.classList.toggle("is-open", mode === "open");
      cursor.classList.toggle("is-sound", mode === "sound");
      if (mode === "open") label.textContent = "Open";
      else if (mode === "sound") label.textContent = target.classList.contains("is-sound") ? "Sound on" : "Press for sound";
      else label.textContent = "Play";
    };
    window.__refreshCursor = refresh;
    window.addEventListener("mousemove", (e) => {
      tx = e.clientX; ty = e.clientY;
      cursor.classList.add("is-visible");
      hoverEl = e.target;
      refresh();
    });
    document.addEventListener("mouseleave", () => cursor.classList.remove("is-visible"));
    const loop = () => {
      cx += (tx - cx) * 0.2;
      cy += (ty - cy) * 0.2;
      cursor.style.transform = `translate(${cx}px, ${cy}px)`;
      requestAnimationFrame(loop);
    };
    loop();
  }

  /* ---------- Reveal on scroll ---------- */
  const revealIO = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        e.target.classList.add("is-in");
        revealIO.unobserve(e.target);
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
  );
  document.querySelectorAll(".reveal").forEach((el, idx) => {
    el.style.transitionDelay = `${(idx % 4) * 70}ms`;
    revealIO.observe(el);
  });

  /* ---------- Count-up stats ---------- */
  const countIO = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        const el = e.target;
        countIO.unobserve(el);
        const end = parseFloat(el.dataset.count);
        const dec = parseInt(el.dataset.decimals || "0", 10);
        const suffix = el.dataset.suffix || "";
        if (reduceMotion || Number.isNaN(end)) return;
        const t0 = performance.now();
        const dur = 1400;
        const tick = (t) => {
          const p = Math.min((t - t0) / dur, 1);
          const eased = 1 - Math.pow(1 - p, 3);
          el.textContent = (end * eased).toFixed(dec) + suffix;
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      });
    },
    { threshold: 0.6 }
  );
  document.querySelectorAll("[data-count]").forEach((el) => countIO.observe(el));

  /* ---------- Case study tabs ---------- */
  const tabs = [...document.querySelectorAll("[data-case]")];
  const panels = [...document.querySelectorAll("[data-case-panel]")];
  tabs.forEach((tab) =>
    tab.addEventListener("click", () => {
      const id = tab.dataset.case;
      tabs.forEach((t) => {
        const on = t === tab;
        t.classList.toggle("is-active", on);
        t.setAttribute("aria-selected", on);
      });
      panels.forEach((p) => {
        const on = p.dataset.casePanel === id;
        p.hidden = !on;
        p.classList.toggle("is-active", on);
        const v = p.querySelector("video");
        if (v) on && !reduceMotion ? v.play().catch(() => {}) : v.pause();
      });
    })
  );

  /* ---------- Reel modal ---------- */
  const modal = document.getElementById("reel-modal");
  const modalVideo = modal?.querySelector("video");
  document.querySelectorAll("[data-open-reel]").forEach((b) =>
    b.addEventListener("click", () => {
      if (!modal) return;
      modal.showModal();
      modalVideo.muted = false;
      modalVideo.play().catch(() => {});
    })
  );
  const closeModal = () => { modalVideo?.pause(); modal?.close(); };
  modal?.querySelector("[data-close-reel]").addEventListener("click", closeModal);
  modal?.addEventListener("click", (e) => { if (e.target === modal) closeModal(); });
  modal?.addEventListener("close", () => modalVideo?.pause());

  /* ---------- Variable-font proximity headline ----------
     Splits the text into letters; each one gets heavier and wider as the pointer approaches. */
  const vf = document.querySelector("[data-proximity]");
  if (vf && canHover && !reduceMotion) {
    const text = vf.textContent.trim();
    vf.setAttribute("aria-label", text);
    vf.innerHTML = [...text]
      .map((c) => (c === " " ? '<span class="vf__sp"> </span>' : `<span class="vf__c" aria-hidden="true">${c}</span>`))
      .join("");
    const letters = [...vf.querySelectorAll(".vf__c")];
    let px = -9999, py = -9999, queued = false;
    const paint = () => {
      queued = false;
      letters.forEach((el) => {
        const r = el.getBoundingClientRect();
        const d = Math.hypot(px - (r.left + r.width / 2), py - (r.top + r.height / 2));
        const f = Math.max(0, 1 - d / 260);
        el.style.fontVariationSettings = `"wght" ${Math.round(500 + f * 300)}, "wdth" ${Math.round(100 - f * 25)}`;
      });
    };
    window.addEventListener("mousemove", (e) => {
      px = e.clientX; py = e.clientY;
      if (!queued) { queued = true; requestAnimationFrame(paint); }
    });
    paint();
  }

  /* ---------- Stacking service cards ----------
     Cards are position:sticky; as the next card slides over, the previous one recedes. */
  const stackCards = [...document.querySelectorAll(".stack__card")];
  if (stackCards.length && !reduceMotion) {
    let ticking = false;
    const update = () => {
      ticking = false;
      const sticky = getComputedStyle(stackCards[0]).position === "sticky";
      stackCards.forEach((card, i) => {
        const nextCard = stackCards[i + 1];
        if (!nextCard) return;
        if (!sticky) { card.style.transform = card.style.filter = ""; return; }
        const top = nextCard.getBoundingClientRect().top;
        const start = window.innerHeight;
        const end = parseFloat(getComputedStyle(nextCard).top) || 100;
        const p = Math.min(Math.max((start - top) / (start - end), 0), 1);
        card.style.transform = `scale(${1 - p * 0.06})`;
        card.style.filter = `brightness(${1 - p * 0.25})`;
      });
    };
    window.addEventListener("scroll", () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } }, { passive: true });
    update();
  }

  /* ---------- Envelope → letter ---------- */
  const envelope = document.querySelector(".envelope");
  const letterModal = document.getElementById("letter-modal");
  const today = new Date().toLocaleDateString("en-CA", { year: "numeric", month: "long", day: "numeric" });
  document.querySelectorAll("[data-today]").forEach((el) => (el.textContent = today));
  if (envelope && letterModal) {
    envelope.addEventListener("click", () => {
      if (envelope.classList.contains("is-open")) { letterModal.showModal(); return; }
      envelope.classList.add("is-open");
      setTimeout(() => letterModal.showModal(), reduceMotion ? 0 : 1250);
    });
    letterModal.querySelectorAll("[data-close-letter]").forEach((b) => b.addEventListener("click", () => letterModal.close()));
    letterModal.addEventListener("click", (e) => { if (e.target === letterModal) letterModal.close(); });
    letterModal.addEventListener("close", () => setTimeout(() => envelope.classList.remove("is-open"), 200));
  }
})();
