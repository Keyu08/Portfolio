# keyu.cuts: Portfolio Conversion Blueprint

Goal of the site: **book discovery calls with brand founders and marketing teams.**
Everything below serves that one action.

> **v2 positioning (current):** "Cinematic short-form storyteller who lives on the feed", not
> "performance editor with ROAS receipts". You don't have paid-ads proof yet, so the site sells
> what you *can* prove: taste and craft (the work itself), social-media fluency, a brand you built
> and sold out (Nymeris), national-level recognition, and a low-risk **Founding Partner** offer that
> turns "no case studies yet" into a reason to book now. The performance-metric template below is
> kept for when you have real numbers.

### What changed in v2
- Hero: "Stories that [stop the scroll / feel like cinema / sell without selling / people actually save]"
- Reframe: "Your audience can smell an ad. So I make stories worth watching."
- New **Services** section as sticky stacking cards (Capture / Elevate / Grow), inspired by extrafazant
- Case studies became **Selected work** with honest craft specs (hook timing, pacing, runtime, organic views)
- New **Story** section: a sealed envelope that opens into your letter ("I never really set out to become a content creator")
- Proof now leads with **"Proof I can sell"** (Nymeris: 2 sold-out collections, team of 11, institutional contract)
- Pricing became the **Founding Partner Program** (3 brands, intro rate, in exchange for sharing results)
- FAQ answers "You're early in your career, why trust you?" and "Do you make UGC?" honestly
- Hero headline uses the variable font Bricolage Grotesque; letters get heavier and narrower near the cursor

---

## Part 0: Reverse-engineering extrafazant.nl (why that kind of site works)

> Note: extrafazant.nl and the case-study pages about it were blocked by the network
> I built this in, so I couldn't inspect the live code. Verified facts: Extrafazant is
> a 2014-founded video and animation studio in Tilburg (NL) that makes animation,
> social content and video productions, for clients such as Mentos and Willem II, under a playful
> "pheasant" brand. The analysis below covers the techniques award-level motion-studio
> sites like it rely on, and which ones I carried into your site.

| Principle | What it does for the visitor | How it's applied on your site |
|---|---|---|
| **The site *is* the portfolio** | A video studio proves craft through motion on the site itself, not with words. | Live 9:16 phones in the hero, a hover-to-play rail, kinetic headline rotator, animated counters. |
| **One strong personality** | A memorable brand quirk (the pheasant) makes a small studio feel like a brand. | "keyu.cuts" wordmark, and the **scientist-editor** angle ("Trained in a lab. Sharpened on the feed."). |
| **Huge, confident type + few colors** | Reads instantly, looks premium, and lets the work be the color. | Inter Tight 900 at tight tracking, paper / ink / signal orange only. Mono labels give a data-dashboard feel. |
| **Micro-interactions everywhere** | Rewards curiosity and signals attention to detail (the thing clients pay for). | Custom cursor that becomes "PLAY" over videos, magnetic hover on phones, FAQ "+" rotation, nav hides on scroll. |
| **Rhythm by section color blocks** | Alternating light/dark/accent sections create "cuts" like an edit. | Paper → ink ticker → paper → ink reel → paper → orange method → paper → ink → paper → orange CTA. |
| **Short, punchy copy** | Visitors skim. Studios write like ads. | Every section headline works as a standalone hook. |
| **Clear single CTA** | Fun never gets in the way of contact. | "Book a Strategy Call" in nav, hero, sticky on mobile, and the final section. |

**Where your site goes further than a typical studio site:** a studio sells *craft*.
You sell *performance*. So the site adds what media buyers care about: metrics
(Hook rate, Hold rate, CTR, ROAS), a testing method, volume and turnaround guarantees, and urgency.

---

## Revised structure (and why)

Your 4-part structure stays, with 4 additions in between that do the selling:

1. **Hero:** revenue-first promise plus CTA.
2. *Ticker:* the deliverables, at a glance.
3. *Reframe:* name the buyer's real problem (more winners, not prettier videos).
4. **Reel:** a 45s hook-heavy reel plus the visible sequencing logic.
5. **Case studies:** 3 projects with metrics, plus a "more edits" rail (vlog46/27/47/41).
6. *The Lab Method:* your testing process, which makes you different from "an editor".
7. *Proof of authority:* science fair and national awards, media features, and real numbers from your CV.
8. **Trust + offer:** turnaround, revisions, volume, communication, and 3 packages.
9. **FAQ:** objection handling.
10. **Final CTA:** high urgency with a free-value hook.

---

## 1. Hero (above the fold)

- **Eyebrow (urgency):** ● Taking 2 new brands for *[auto: next month]*
- **Headline:** I edit ads that **[stop the scroll. / beat your control. / sell out stock. / pay for themselves.]** (rotating)
- **Sub-headline:** Performance-first UGC, TikTok & Reels creative for DTC brands and media buyers. Every cut is engineered for **hook rate, hold rate and ROAS**, not just to look good.
- **Primary CTA:** Book a Strategy Call →
- **Secondary CTA:** ▶ Watch the 45s reel
- **Trust strip:** Gold Medal, Canada-Wide Science Fair · Featured on Télé-Québec & Radio-Canada · EN · FR · 中文 ad variants
- **Visual:** 3 autoplaying 9:16 edits (vlog46, vlog27, vlog47) fanned like phones, with chips "HOOK 0.8s", "THUMB-STOP", "UGC · 9:16".

Alternative headlines to A/B test:
- "Creative that makes your media buyer look like a genius."
- "More winning ads. Less wasted spend."
- "Scroll-stopping ads, built like experiments."

---

## 2. The reel (30–60s, hook-heavy)

Target length: **45 seconds, 9:16, muted-first (captions burned in), music cut on beat.**

| Time | Beat | What goes on screen |
|---|---|---|
| 0–3s | **Cold-open thumb-stop** | Your single most arresting frame. Motion in frame 1. No logo, no intro. |
| 3–12s | **Hook machine-gun** | 6–8 best opening 1–1.5s of different ads back-to-back, on the beat. Shows you can hook any category. |
| 12–25s | **Range** | UGC talking head → product demo → unboxing → before/after → founder story. Use split-screens. |
| 25–37s | **Proof overlays** | Burn "Hook rate 41%" / "3.2x ROAS" etc. over the ads that earned them (real numbers only). |
| 37–45s | **The ask** | "keyu.cuts: ads that pay for themselves. Book a strategy call." Hard cut to black. |

Rules: no clip longer than 2s in the first 12s. Every 3s, something changes (cut, zoom, text, SFX).
Export at 1080×1920 H.264, under 15 MB for the web (see README).

---

## 3. Case study framework (fill-in-the-blank)

Use this for each of the 3 featured projects (already wired into the site's tabs):

```
CLIENT LINE:  [Brand] · [Category] · [Platforms]
HEADLINE:     [Result-led verb] + [what you did] + [outcome]
              e.g. "Turned a 4-min creator ramble into a 22-second winner"

METRICS (4 boxes)
  Hook rate  [XX]%    (3s video views ÷ impressions)    vs [XX]% account avg
  Hold rate  [XX]%    (ThruPlays or 15s views ÷ impressions)
  CTR        [X.X]%   (link click-through)
  ROAS       [X.X]x   on $[XX]k spend   (or Sales / CPA / CPI, whichever the client cares about)

THE PROBLEM:   [What was broken: drop-off point, rising CPA, fatigue]
THE ANGLE:     [Your creative hypothesis: hook, structure, emotion]
WHAT I TESTED: [N hooks × N lengths = N variants. Which won and why.]
QUOTE:         "[One sentence from the founder or media buyer.]"  [Name, Role @ Brand]
```

**Rules:** only publish numbers you can back up with an Ads Manager screenshot. If a client
is under NDA, use "[Category] brand" and keep the metrics. No real clients yet? Run 3
spec ads for real brands (or your own Nymeris drops), spend $50–100 on each, and publish
those real numbers labelled "Spec test".

---

## 4. Trust signals, FAQ and the final CTA

**Guarantees (edit to what you can actually deliver):**
48–72h turnaround · 2 revision rounds · 20+ variants/month · direct line to the editor.

**Authority (from your CV, all real):**
- Gold Medal, Canada-Wide Science Fair (VisionnAIre, AI retinal disease detection, 97.33% accuracy across 8 pathologies)
- Youth Can Innovate Award, senior category winner (CWSF)
- Visionary Award, Canadian Nuclear Laboratories (CWSF)
- ADRIQ Jeune Innovateur, 1 of 8 teams to represent Québec nationally
- OCTAS Relève Étudiante award
- Silver Medal, Québec Provincial Science Fair; Gold Medal, Montréal Regional (Tree-spAI, drone + CNN, 20 species)
- Featured on *Génial!* (Télé-Québec) and *Moteur de Recherche* (Radio-Canada)
- Founder of Nymeris: 2 sold-out collections, team of 11, institutional contract

**Why this works for ad buyers:** it repositions you from "student editor" to "someone who runs
rigorous experiments and has been validated by national judges", which is exactly the
mindset of creative testing.

**FAQ:** turnaround, revisions, testing volume, strategy help, what you need from them,
FR and Mandarin versions, agency white-label (see `index.html`).

**Final CTA:**
- Eyebrow: ● 2 spots left for [next month]
- Headline: "Your next winning ad is one call away."
- Offer: a free 20-minute call. I review your current ads live and give you 3 hook ideas to test this week.
- Scarcity: "I work with a maximum of 4 brands at a time."

---

## Before you go live: checklist

- [ ] Drop `vlog46`, `vlog27`, `vlog47`, `vlog41` (and `showreel`) into `assets/videos/`, converted to mp4
- [ ] Replace the Calendly link and `hello@YOURDOMAIN.com` in `index.html`
- [ ] Fill every `[BRACKET]` in the case studies and pricing
- [ ] Confirm the guarantee numbers (48–72h, 2 revisions, 20+ variants) are ones you can keep
- [ ] Update the spots count (`data-spots`) each month

---

## v4: Pricing (founding rates, CAD)

| Offer | Price | Why this number |
|---|---|---|
| Pilot Video | $350 (+$150 if I shoot) | Low enough for a "yes" without a meeting, high enough to signal pro work. 3 hook variants make it feel like a test, not a gamble. |
| Monthly Content | From $1,800/mo (8 videos + 1 shoot day) | About $225 per video, the going rate for early-career short-form creators who also shoot. Recurring revenue is the goal. |
| Side Quest Feature | From $600 | Creator integration on your channels + 30-day usage rights. Backed by 222K / 75K organic view proof. |
| Event coverage & recaps | From $500 | Aloya-style recap: on-site filming + one edited recap. |

Raise rates by ~25% once the 3 founding spots are filled and you have client results to publish.

## v4: Video placement logic

- **Hero:** strongest vertical hooks (Wonderland 75K in the centre, bathtub surreal hook, En Marge docuseries).
- **Selected work** (order = what buyers care about): viral storytelling (75K) → kinetic type (222K) → brand activation with real sponsors (Aloya: Silk, Orangina) → hospitality (Chaoxiyuan).
- **Services:** each card shows the video that proves it: series design (Side Quests Ep 1), cinematic food (10 PM in Shanghai), events (Aloya).
- **Series row:** Side Quests Ep 1–3 + En Marge, to show recurring-audience thinking.
- **Widescreen gallery:** travel, food, nightlife and documentary range.


## v6: Page order (optimised for conversion)

1. **Hero:** promise + CTA, three strongest vertical edits
2. **Created with:** client logos right under the fold (social proof before any claim)
3. **The real problem:** why scripted ads fail and why trust matters
4. **Selected work:** proof of quality as early as possible, ending in a mid-page CTA
5. **Services:** what they can buy, with the video that proves each one
6. **How I learn:** every video gets broken down (Wonderland example); lessons applied in any style
7. **How we work together:** the Lab Method (hypothesis → variants → test → iterate)
8. **Who you'd work with:** the letter + floating facts (18, Montréal, trilingual, team, Nymeris…)
9. **Why trust me:** VisionnAIre project file + moving "Recognized by" banner + Nymeris sales proof
10. **Pricing & guarantees:** founding rates, turnaround, revisions
11. **FAQ:** objections
12. **Book:** final CTA with scarcity

## v8 notes
- **Prices are no longer shown on the site.** Each plan says a short "let's find the deal" line. The v4 pricing table above stays as your private reference for calls.
- Case studies are now **director's notes** (feeling, hook, story, music & sound, type & look) plus "What your brand can take from it". They're written in first person from the project breakdowns, so edit any line that doesn't match what you actually had in mind.
- The Lab Method follows the 6-step scientific method: research, hypothesis, experiment (plan, shoot, edit), analyze, conclusion, iterate.

## v9: Creator positioning + heritage palette
- Voice shifted from agency to **creator / brand ambassador / promoter**: "Book a Collab Call", "Partnered with", "Three ways to work with me" (Create · Showcase · Represent).
- Offers ordered Single Collab → Brand Ambassador (featured) → Monthly Retainer (last).
- Palette: espresso #2C1E1A, cream #F9F6F0, olive #4A5343, oxblood #4A1521, plus a light oxblood tint (#C98A7D) used only as the accent on dark surfaces so it stays readable.
