# To-do

Next steps for the Union Neil site, most important first.

## Security

- [ ] **Move the `/cadastro` password out of the code.** It is hard-coded in
  `netlify/functions/validate.js` and visible in the git history.
  1. Add it as a Netlify environment variable (e.g. `CADASTRO_PASSWORD`).
  2. Read it in the function with `process.env.CADASTRO_PASSWORD`.
  3. Change the password itself, since the old one is in git history for good.

  _About 10 minutes._

## Performance

- [ ] **Inline the stylesheet into the HTML.** Set `build.inlineStylesheets: "always"`
  in `astro.config.mjs`. The CSS is about 6 KiB, and inlining removes the one
  render-blocking request, which should help loads when Netlify's cache is cold
  (the slow Lighthouse runs in `performance-tracking.md`). Re-run Lighthouse
  afterwards and add the results to `performance-tracking.md`.

  _About 10 minutes including the Lighthouse check._

- [ ] **Decide on Microsoft Clarity's third-party cookies.** They are the only
  remaining Lighthouse "Best practices" issue (score 77). Options: keep Clarity
  and accept the score, or remove/replace it.

## Analytics & ads tracking

- [ ] **Add Google Analytics / Google Ads tracking.** The site currently has
  **no Google tracking** — only Microsoft Clarity. The homepage's Google tags
  were removed in commit `231e465` (2025-05-17, "(bug) add back reactivity,
  improve review display"), so no GA or Ads data has been collected since then.
  The IDs it used, to reuse or confirm they're still active:
  - Google Tag Manager: `GTM-KWFCK44`
  - Google Analytics 4: `G-T55SWE3RWZ`
  - Google Ads: `AW-11343656312` (with a conversion label,
    `AW-11343656312/jEc9CKjlvOQYEPjqiaEq`)

  When adding it back:
  1. Pick one route: a single GTM container (manage GA4 + Ads tags in GTM), or
     `gtag.js` directly. Not both.
  2. Track the contact dialog's WhatsApp buttons as conversions: "Iniciar
     atendimento" (customer lead) and "Enviar CV" (job applicant) as separate
     events, so ads aren't credited for CV submissions.
  3. Load the tag at the end of `<body>` in `src/layouts/Layout.astro`, like
     Clarity. Loading tracking scripts before the stylesheet caused the CLS 0.916
     problem (see `performance-tracking.md`).
  4. Check whether a cookie-consent banner is needed under the LGPD before
     setting advertising cookies.
  5. Re-run Lighthouse and record the results in `performance-tracking.md`.

## Contact flow

- [ ] **Decide whether the other WhatsApp links should use the contact dialog.**
  The FAQ's "Falar com a Union" button and the two footer numbers still link
  straight to WhatsApp, bypassing the "Como podemos ajudar?" dialog.

- [ ] **Decide whether the floating widget should open the dialog directly**
  instead of scrolling to "Vamos conversar" (saves visitors one click).

- [ ] **Consider a shorter label for dropdown option 1.** "Cuidados e Assistência
  Domiciliar para um ente querido" wraps correctly in Chrome, Edge and Safari 27,
  but is cut off in the closed dropdown in Firefox and older Safari. A shorter
  label (e.g. "Cuidados para um ente querido") would fix it everywhere.

## Housekeeping

- [ ] **Set the Node.js version in the Netlify dashboard to 24** (Project
  configuration → Developer settings → Continuous deployment → Dependency
  management). Optional: `netlify.toml` already sets `NODE_VERSION = "24"` and
  takes precedence, but the dashboard still shows the old pinned version (16).
