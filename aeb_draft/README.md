# AEB Innovators website

A from-scratch rebuild of the AEB Innovators homepage (reference: https://aebinno.com/), using React 19 and Vite.
It adds no runtime dependencies beyond React.

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
    Header.jsx/.css     sticky header: wordmark block, link tab to the 42% axis, phone menu
    Hero.jsx/.css       photographic mosaic masthead and the title on the axis
    About.jsx/.css      lead paragraph, four pillars, founder colour page
    Services.jsx/.css   mosaic of the six service lines ("Ask about this" pre-fills the form)
    Process.jsx/.css    the four working stages as a descending staircase
    Team.jsx/.css       portrait strip of the six team members
    Testimonials.jsx    switchable quotes (tabs with keyboard support)
    Gallery.jsx/.css    draggable row of programme photographs and the company film
    Contact.jsx/.css    enquiry composer: sends through the visitor's email app or WhatsApp
    Footer.jsx/.css     closing blue field with the email address as the headline
public/images/          the company's own photographs, portraits and logos, cropped and compressed
```

## Design system

- **Colour**: paper `#f3f6f8`, paper tone `#e6ecf0`, navy ink `#0a2233`, brand blue `#036387`, logo yellow `#ffcb04`.
  Yellow is kept for the primary action and a few brand moments.
- **Type**: Hanken Grotesk 400 and 500 only, in five steps (small, body, lead, head, display).
- **Layout**: one vertical axis at 42% of the viewport. Headings start on it and side notes sit to its left.
  Full-bleed colour pages alternate with text pages, and every corner is square.

## Notes

- The contact form has no backend. It composes the message and opens the visitor's email app or WhatsApp
  addressed to `aebinnovators@gmail.com` / `+92 323 2493219`. The visitor sees the subject line before sending.
- The company film is embedded from YouTube (`youtube-nocookie.com`) and loads only when someone presses play.
