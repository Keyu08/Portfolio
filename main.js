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
     Each <figure data-video="vlog46"> gets a muted looping video.
     Looks for assets/videos/<name>.mp4, then .mov. If neither loads, it shows a
     labelled placeholder so the layout never breaks. */
  const makeVideo = (fig) => {
    const name = fig.dataset.video;
    const video = document.createElement("video");
    Object.assign(video, { muted: true, loop: true, playsInline: true, preload: "metadata" });
    video.setAttribute("muted", "");
    video.setAttribute("playsinline", "");
    ["mp4", "mov"].forEach((ext, i, all) => {
      const s = document.createElement("source");
      s.type = ext === "mp4" ? "video/mp4" : "video/quicktime";
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
    let cx = 0, cy = 0, tx = 0, ty = 0;
    window.addEventListener("mousemove", (e) => {
      tx = e.clientX; ty = e.clientY;
      cursor.classList.add("is-visible");
      cursor.classList.toggle("is-play", !!e.target.closest("[data-cursor='play']"));
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
})();
