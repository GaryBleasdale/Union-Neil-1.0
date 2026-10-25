import { defineCollection } from "astro:content";
import { file } from "astro/loaders";
import { z } from "astro/zod";

// Union's Google reviews, copied by hand from the Business Profile into
// src/data/reviews.json. (Google's Places API terms don't allow storing
// reviews it returns, so they can't be fetched at build time.) The schema
// makes the build fail on a typo instead of shipping a broken card.

const reviewsFile = "src/data/reviews.json";

const reviews = defineCollection({
  // getCollection() doesn't keep file order, so each review gets its
  // position in the file; the site shows them in that order.
  loader: file(reviewsFile, {
    parser: (text) =>
      JSON.parse(text).reviews.map((review: object, order: number) => ({ ...review, order })),
  }),
  schema: z.object({
    order: z.number().int(),
    name: z.string(),
    /** e.g. "filha do Senhor Bonifácio", shown under the name. */
    relation: z.string().optional(),
    /** The account name on Google, to find the review there. */
    googleName: z.string(),
    rating: z.number().int().min(1).max(5),
    /** null for star-only reviews, which aren't shown. */
    text: z.string().nullable(),
    /** A sentence from the text, shown in bold above it on long reviews. */
    headline: z.string().optional(),
    /** When it was posted, as precisely as Google shows it: YYYY or YYYY-MM. */
    date: z.string().regex(/^\d{4}(-\d{2})?$/),
    bairro: z.string().nullable(),
    cidade: z.string().nullable(),
    source: z.enum(["google", "direct"]),
    /** The type of care the review describes, if it says. */
    service: z.string().optional(),
    featured: z.boolean(),
  }),
});

const googleRating = defineCollection({
  loader: file(reviewsFile, {
    parser: (text) => [{ id: "google", ...JSON.parse(text).googleRating }],
  }),
  schema: z.object({
    rating: z.number().min(1).max(5),
    count: z.number().int(),
    /** When rating and count were last copied from Google. */
    checkedOn: z.iso.date(),
    profileUrl: z.url(),
  }),
});

export const collections = { reviews, googleRating };
