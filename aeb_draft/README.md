# AEB Innovators website

A from-scratch rebuild of the AEB Innovators homepage (reference: https://aebinno.com/), using React 19 and Vite.

## Run it

```bash
npm install
npm run dev       # local development server
npm run build     # production build into dist/
npm run preview   # serve the production build
npm run lint      # ESLint
```

## Structure

```
src/
  content.js            all business copy and contact details, taken from the live site
  index.css             design tokens (colour, type steps, spacing, motion) and base styles
  App.jsx               page composition and scroll-reveal observer
  components/
    Header.jsx/.css     transparent-over-hero header, solid on scroll, full-screen phone menu
    Hero.jsx/.css       dark navy hero: headline, two CTAs, trust strip of partner logos
    About.jsx/.css      company intro and a two-column founder profile
    Services.jsx/.css   the six service lines as a numbered index list (01–06)
    Process.jsx/.css    the four working stages as a connected timeline
    Team.jsx/.css       portrait grid with a single navy duotone treatment
    Testimonials.jsx/.css  one quote at a time with prev/next, plus a distinct recognition line
    Contact.jsx/.css    split layout: contact details + WhatsApp vs. an enquiry composer
    Footer.jsx/.css     minimal: logo, nav, social links, copyright
public/images/          the company's own photographs, portraits and logos
```

## Design system

- **Colour**: deep navy `#0a2233` (section ground + hero gradient end `#061420`), warm paper
  `#f6f3ee` (section ground), near-black ink `#17140f` (paper text), and one gold accent `#ffc814`
  sampled from the logo. The accent is reserved for buttons, decorative marks and text on navy
  (high contrast); on paper, labels and numerals use ink tones instead, since gold-on-paper fails
  WCAG contrast.
- **Type**: Fraunces Variable (display headings, serif) and Inter Variable (body/UI, sans),
  both self-hosted via `@fontsource-variable`. Hero headline scales 44–88px; section headings
  40–56px; body 17–18px, line length capped near 65ch.
- **Layout**: a plain 12-column grid (`.grid12`), left-aligned and asymmetric — nothing is
  centred by default. Sections alternate navy and paper grounds with 80–160px of vertical
  rhythm (`--section`).

## Notes

- The contact form has no backend. It composes the message and opens the visitor's email app or
  WhatsApp, addressed to `aebinnovators@gmail.com` / `+92 323 2493219`. The visitor sees the
  subject line before sending.
- `lacc.png` and `quickfix.png` in `public/images/logos/` were reprocessed (white background
  keyed to transparent) so the hero trust strip's monochrome treatment renders correctly for
  every partner logo.
