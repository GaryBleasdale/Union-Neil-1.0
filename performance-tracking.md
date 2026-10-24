# Performance tracking

Lighthouse results for https://unionneil.com.br/ against each deployed commit.
Add a new section at the top of "Results" after each deploy that could affect
performance.

## How to measure

- Lighthouse CLI, **mobile** form factor, default simulated throttling.
- Run against the **live** site, at least **5 times**, and record the median.
  Single runs vary a lot: a cold Netlify cache can turn a 100 into an 84.
- Test the live site or `pnpm build && pnpm preview`, never `pnpm dev`
  (the dev server is unminified and scores around 56).

```sh
for i in 1 2 3 4 5; do
  lighthouse https://unionneil.com.br/ --quiet --chrome-flags="--headless=new" \
    --output=json --output-path=./lh-$i.json
done
```

## Summary

| Date | Commit | Performance | Accessibility | Best practices | SEO | LCP | CLS | Page weight |
|---|---|---|---|---|---|---|---|---|
| 2026-10-24 | `7af46d7` (Astro) | **100** | **100** | 77 | 100 | **1.67 s** | **0.029** | **294 KiB** |
| 2026-10-24 | `3b0e84c` (old HTML site) | 99 | 98 | 77 | 100 | 1.82 s | 0.044 | 575 KiB |

Values are medians. LCP = Largest Contentful Paint; CLS = Cumulative Layout Shift.

## Results

### 2026-10-24 · `7af46d7` · Astro site

"move clarity to bottom for CLS improvement; make whatasapp widget not render
when hero is in full view". Lighthouse 13.5.0, mobile, 5 runs.

| Metric | Run 1 | Run 2 | Run 3 | Run 4 | Run 5 | Median |
|---|---|---|---|---|---|---|
| Performance | 100 | 100 | 84 | 100 | 94 | **100** |
| Accessibility | 100 | 100 | 100 | 100 | 100 | **100** |
| Best practices | 77 | 77 | 77 | 77 | 77 | **77** |
| SEO | 100 | 100 | 100 | 100 | 100 | **100** |
| First Contentful Paint | 1.06 s | 0.91 s | 1.67 s | 0.91 s | 0.91 s | **0.91 s** |
| Largest Contentful Paint | 1.21 s | 1.67 s | 3.94 s | 1.51 s | 3.11 s | **1.67 s** |
| Total Blocking Time | 25 ms | 19 ms | 0 ms | 16 ms | 17 ms | **17 ms** |
| Cumulative Layout Shift | 0.029 | 0.029 | 0.029 | 0.028 | 0.029 | **0.029** |
| Speed Index | 1.68 s | 0.91 s | 4.40 s | 0.91 s | 0.92 s | **0.92 s** |
| Page weight | 294 KiB | 294 KiB | 294 KiB | 294 KiB | 294 KiB | **294 KiB** |
| Server response time | 419 ms | 7 ms | 330 ms | 8 ms | 8 ms | **8 ms** |

Notes:
- Runs 3 and 5 coincided with slow server responses (cold Netlify cache). In
  run 3 the hero image downloaded quickly but took ~2 s to render while the
  stylesheet and fonts loaded under simulated throttling. See the "Inline the
  stylesheet" item in `to-do.md`.
- Remaining issue: Microsoft Clarity's third-party cookies (Best practices).
- Before this commit, about 1 in 3 runs had CLS 0.916 (performance 55–56):
  Clarity ran before the stylesheet loaded and forced an unstyled layout. Fixed
  by moving the Clarity snippet to the end of `<body>`.

### 2026-10-24 · `3b0e84c` · Old HTML site (baseline)

The site before the Astro migration. Lighthouse 13.5.0, mobile, 1 run.

| Metric | Value |
|---|---|
| Performance | 99 |
| Accessibility | 98 |
| Best practices | 77 |
| SEO | 100 |
| First Contentful Paint | 1.20 s |
| Largest Contentful Paint | 1.82 s |
| Total Blocking Time | 24 ms |
| Cumulative Layout Shift | 0.044 |
| Speed Index | 2.18 s |
| Page weight | 575 KiB |
| Server response time | 710 ms |
