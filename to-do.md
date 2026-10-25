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

- [x] **Add Google Ads / GA4 tracking.** Done in `681be11` (2026-10-25). The
  tags load on the first scroll/tap/click, so Lighthouse is unaffected
  (see `performance-tracking.md`). Google Ads conversion "Iniciar Atendimento
  (Whatsapp)" (`AW-11343656312/2TwlCInQgqkdEPjqiaEq`) is the Primary action;
  the GA4 "Contact (custom_outbound_click)" action was set to Secondary.

- [ ] **Mark `generate_lead` as a key event in GA4** (Admin → Events, once the
  first one has arrived). If Google Ads then imports it, keep the imported
  action **Secondary** so a click isn't counted twice for bidding.

- [ ] **Check conversions are recording** in Google Ads (Goals → Conversions)
  by **30 October**. The budget went from R$10 to R$50/day on 25 October
  (about 20–25 clicks a day), so a few conversions should have arrived. If
  it's still 0, investigate before spending more.

- [ ] **Consider a target CPA** once the campaign has 15–30 conversions. Until
  then, leave "Maximize conversions" without a target.

- [ ] **Check LGPD consent** for the advertising cookies the Google tag sets.

## SEO

### Backlinks

Union has 3 backlinks (SEOptimer, 2026-10-25: Links grade F). Most important
first. Sorocaba Fácil: contacted 2026-10-25.

Use exactly the same business name, address and phone number on every listing
as on the Google Business Profile: Google cross-checks them, and consistent
listings help the map results.

- [ ] **Free directories** (_about 15 minutes each; aim for 3–4 a week_):
  - [ ] Doctoralia (doctoralia.com.br), the main Brazilian health directory
  - [ ] Apontador
  - [ ] GuiaMais
  - [ ] Solutudo
  - [ ] Cylex Brasil
  - [ ] Reclame Aqui (free company page; families check it before hiring)

- [ ] **Own profiles, each linking to the site** (_about 10 minutes each_).
  Links from these don't pass ranking strength directly, but they help Google
  confirm Union is a real business. Once they're live, add them to the site
  footer and to the business details (`sameAs` in `src/pages/index.astro`).
  - [ ] Facebook page
  - [ ] Instagram
  - [ ] LinkedIn company page
  - [ ] Company page on a job site (Indeed, Catho or Vagas.com)

- [ ] **Local partners** (the strongest links; each one needs a conversation).
  Ask whether they'd list Union on a "parceiros" page:
  - [ ] Geriatricians, physiotherapists, clinics and hospitals Union already
    works with or gets referrals from
  - [ ] Care homes (ILPIs): families who leave a care home often need home care
  - [ ] ACSO (Associação Comercial de Sorocaba): the member directory
  - [ ] Industry associations: ABEMID, NEAD

- [ ] **Local press.** Pitch the head nurse as an expert on caring for elderly
  people to Jornal Cruzeiro do Sul and G1 Sorocaba e Jundiaí, around set dates:
  Alzheimer's month (September), Dia do Idoso (1 October), heat waves. One
  article with a link is worth more than 20 directory listings.
  _About 1 hour to write the pitch email; it may take a few tries._

- [ ] **A guide page other sites will link to** (later), e.g. "Como escolher um
  cuidador de idosos" or a pricing guide.

Don't buy links or "link packages": Google penalises them.

### Other

- [ ] **Run SEOptimer on competitors, one per day** (the free plan allows one
  audit a day), to compare with Union's report from 2026-10-25 (grade C, Links
  F, 3 backlinks). In this order:
  1. anjosnolar.com.br (organic #1 for "home care sorocaba", small one-page site)
  2. conformed.com.br (local, #2)
  3. novaaliancahomecare.com.br (local, #4)

  Skip homeangels.com.br: it's a national franchise, so it ranks on the
  main brand's domain strength, which Union can't copy.

- [ ] **Add a pricing question to the FAQ** (`src/components/Faq.astro`, as the
  2nd question): "Quanto custa o home care ou um cuidador de idosos?". Explain
  what the price depends on (12 h / 24 h shifts, days per week, level of care),
  what's always included (enfermeira chefe supervision, guaranteed
  replacement, no labour liabilities), and end with "Solicite um orçamento sem
  compromisso" and a "Solicitar orçamento" button linking to `#contato`, so the
  click goes through the contact dialog and counts as a conversion. Families
  search for "quanto custa", "valores" and "orçamento", and two campaign
  keywords already target these. Don't add FAQ structured data: since 2023
  Google only shows FAQ results for government and major health sites.

  _About 15 minutes once the text is written._

## Contact flow

- [ ] **Decide whether the other WhatsApp links should use the contact dialog.**
  The FAQ's "Falar com a Union" button and the two footer numbers still link
  straight to WhatsApp, bypassing the "Como podemos ajudar?" dialog.

- [ ] **Decide whether the floating widget should open the dialog directly**
  instead of scrolling to "Vamos conversar" (saves visitors one click).

- [ ] **Check the dropdown labels in Firefox and older Safari.** "Um ente querido
  precisa de cuidados domiciliares" and "Sou cuidador(a) e quero trabalhar com a
  Union" wrap correctly in Chrome, Edge and Safari 27, but long labels are cut
  off in the closed dropdown in Firefox and older Safari.

## Housekeeping

- [ ] **Set the Node.js version in the Netlify dashboard to 24** (Project
  configuration → Developer settings → Continuous deployment → Dependency
  management). Optional: `netlify.toml` already sets `NODE_VERSION = "24"` and
  takes precedence, but the dashboard still shows the old pinned version (16).
