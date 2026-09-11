# Fyah Pit — Brand Website

A production-ready marketing site for **Fyah Pit**, a fictional fire-grilled
Caribbean kitchen in Peckham, London, built as a long-form, art-directed
single page.

## Structure

```
index.html          Markup for every section (hero, menu, story, fire feature,
                     reviews, location, FAQ, footer, etc.)
assets/styles.css    Full design system (tokens, typography, components, sections)
assets/script.js     Nav scroll state, mobile menu, scroll-reveal, FAQ accordion,
                      sticky mobile CTA, ember particles
vercel.json          Security headers + long-lived caching for /assets
```

No build step, no framework, no dependencies — just static HTML/CSS/JS,
deployable as-is.

## Brand system

- **Colours** — near-black (`--black`), rich green (`--green`), vivid red
  (`--red`), warm gold (`--gold`), warm off-white (`--cream`) — all defined as
  CSS custom properties at the top of `assets/styles.css`.
- **Type** — Bungee (display/headlines) + Work Sans (body/UI), loaded from
  Google Fonts.
- **Logo** — an original circular badge mark (flame + grill-grate motif) built
  as inline SVG (`#logo-fyahpit` symbol in `index.html`), reused via `<use>`
  in the nav, hero, footer and final CTA so it never needs to be redrawn.

## Placeholder business details

Address, phone, email, hours and social handles are plausible placeholders
for this demo brand — swap them for real details before going live:

- Address: 12 Bellwood Row, Peckham, London SE15 4TR
- Phone: 020 7946 0958 (Ofcom's reserved fictional-drama range)
- Email: hello@fyahpit.co.uk
- Social links currently point to `#` — update with real profile URLs.

## Local preview

```
python3 -m http.server 8000
# open http://localhost:8000
```

## Deploy to Vercel

1. Push to GitHub
2. Import at vercel.com/new
3. Deploy (no configuration needed)
