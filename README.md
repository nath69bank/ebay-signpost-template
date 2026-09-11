# Ken Suya — Brand Website

A production-ready marketing site for **Ken Suya**, a suya specialist taking
orders online for collection and delivery, built as a long-form, art-directed
single page around the real Ken Suya logo and brand assets.

## Structure

```
index.html            Markup for every section (hero, menu, story, craft
                       feature, reviews, location, FAQ, footer, etc.)
assets/styles.css      Full design system (tokens, typography, components, sections)
assets/script.js       Nav scroll state, mobile menu, scroll-reveal, FAQ accordion,
                        sticky mobile CTA, ember particles
assets/images/         Real logo crops + food photography (see below)
vercel.json            Security headers + long-lived caching for /assets
```

No build step, no framework, no dependencies — just static HTML/CSS/JS,
deployable as-is.

## Brand system

- **Colours** — sampled directly from the supplied logo: deep maroon
  (`--maroon`, grounding dark), golden yellow (`--gold`), vivid red (`--red`),
  fresh green (`--green`, from the chili stem), warm cream (`--cream`). All
  defined as CSS custom properties at the top of `assets/styles.css`.
- **Type** — Baloo 2 (bold, rounded display/headlines) + Nunito Sans
  (body/UI), loaded from Google Fonts — chosen to echo the glossy, playful
  energy of the logo's script lettering.
- **Logo** — the real supplied logo, used unaltered. It has a plain white
  background (no transparency), so it's always presented on a white "sticker
  chip" (`.logo-chip`) rather than dropped directly onto colored sections.

## Image assets (`assets/images/`)

| File | Source | Used for |
|---|---|---|
| `ken-suya-logo.jpg` | Full logo lockup incl. tagline, trimmed from the supplied artwork | Hero sticker card, final CTA |
| `ken-suya-badge.jpg` | Circular badge only (tagline cropped out) | Nav, footer |
| `chili-icon.jpg` | Chili icon cropped from the logo artwork | Story gallery, favicon source |
| `favicon-64.jpg` / `favicon-180.jpg` | Resized from the chili crop | Favicon / Apple touch icon |
| `suya-plate.jpg`, `suya-closeup.jpg`, `suya-wide.jpg` | Clean crops of the food photo from the supplied promo flyer (text/QR removed) | Hero background, experience section, menu cards, story gallery |

No stock photography or AI-generated imagery was introduced — every image on
the site is a crop of assets actually supplied for this brand.

## Placeholder / unverified details — confirm before launch

- **Address** is a placeholder the user asked to be invented: *Unit 4,
  Greenfield Business Park, Birmingham B11 2AA*. Replace with the real
  address (or remove the address block in favour of "message us for
  location" if there's no fixed site).
- **WhatsApp** (`+47 7863 337662`) and **Instagram** (`@KenSuya`) are the
  real handles supplied and are used as-is, including the `wa.me` order
  links throughout the site.
- **Prices** on the menu (Beef £8.00, Chicken £7.50, Lamb £9.00, Party
  Platters from £45.00, Extra-Spicy Special £8.50) and **ordering hours**
  are reasonable placeholders — update to the real numbers.
- **Reviews** are illustrative placeholder testimonials, not real customer
  quotes — swap in genuine reviews when available.
- The halal FAQ answer deliberately avoids asserting a certification claim
  I can't verify — update it directly if there's a real answer.
- `og:url` / canonical currently point at a placeholder domain
  (`kensuya.co.uk`) — update once a real domain is live.

## Local preview

```
python3 -m http.server 8000
# open http://localhost:8000
```

## Deploy to Vercel

1. Push to GitHub
2. Import at vercel.com/new
3. Deploy (no configuration needed)
