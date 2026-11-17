# Nurture & Next website: prototype

## Version 2 (16 November 2026), after the client's feedback

The client's email and the three print stories are in `../brief/`. What changed:

- **Catalogue**: eight products. The AeroCool Sleepsuit and PJ Set each come in Under One Moon, Dream Atlas and Hush Hush, and every print is its own product, linked by siblings both ways. Cloud Hopper and Little Wild Trio grip socks complete the range. Dummy products are removed.
- **Design system**: charcoal text, products on white, each print with its own colour field, a nine-style type scale, italic only in stories and quotes, and Stiletto's own motion timings (Brand tab).
- **New pages**: Bundles (configurable: Bedtime Rotation and Bedtime & Beyond, 7% off), Prints (QR landing, a playable Lumi wheel and a story reader for the three stories), and separate Shipping, Exchanges and Size guide pages.
- **Rebuilt**: Home, Shop (by garment and by print), Product, AeroCool (four-stage stepper), Our story (about 40% shorter), Library and Help.
- **Placeholders**: the print and Lumi drawings, the wheel situations, the measurements and every price except AED 349. All are marked NEEDS INPUT and listed in the Questions tab.

Everything below describes version 1 and is kept for reference.

---

A clickable prototype of the Nurture & Next website, built to match the Stiletto Shopify theme (v5.2.2) section by section, so that once it is approved it can be built in Shopify as shown. Nothing has been built or published on Shopify yet.

## Open it

Double-click `index.html`. It runs from the folder in Chrome or Edge with no server and no internet connection (fonts and images are included).

## Sharing it online

It is a static site with no build step, so it deploys to Vercel as it is: choose "Other" as the framework and leave the build command empty.

- `vercel.json` asks search engines not to index any page.
- A page opened outside the presentation shows a one-line notice that it is a design prototype and not the live store.

To keep it to invited reviewers, open the Vercel project's Settings › Deployment Protection, choose **All Deployments** with Vercel Authentication, then use **Share › Anyone with the link**.

## What you are looking at

| Tab | What it is |
|---|---|
| **Brand** | The identity: colours, type, logo, photography, voice, and where each lives in Stiletto. Start here. |
| **Home, Shop, Product, Bag, Our story, The fabric, Library, Journal, Help & contact** | The pages. Each is one real responsive page: the Mobile and Desktop views are the same code at 390px and 1440px. |
| **Design review, Build plan, Questions** | What was wrong with the previous design and what Stiletto can do; how to build it; what only Nurture & Next can answer. |

On a page tab, the second bar controls the view:

- **Mobile / Desktop** switches the frame.
- **New / Previous design / Side by side** shows the new prototype, the previous designer's Figma frame, or both.
- **Notes** opens the panel on the right: each change, what the previous design did, and why it matters. Tap a note to jump to it on the page; tap a numbered pin to find its note.
- **Build labels** outlines every part of the page and says how it is built in Stiletto: `NATIVE` (a built-in section, block or setting), `CUSTOM` (a small piece of new code), `APP`, or `NEEDS INPUT` (waiting on a fact or asset from Nurture & Next).
- **Bag** has two views: the bag page and the drawer that opens when something is added.
- **Open this page on its own** opens the page without the frame, for a phone or a second screen.

The pages link to each other and behave like a store: tabs and filters work, prints change the photos, sizes select, and the bag keeps its items (in this browser only). The tabs follow you as you click through. Left and right arrow keys move between tabs.

## The direction

A faithful port of the previous designer's latest frames, tidied: the same sections in the same order, with the brand's own copy, photographs, colours (seven from the guidelines) and typefaces (Newsreader and DM Sans). What changed is what was broken or missing: phone layouts for every page, one currency (AED) and one set of product names, the pages that buttons led to (shop, bag, journal), and no unfinished facts or invented reviews shown to customers. Bigger structural changes are left for the client's feedback round.

## What is real and what is illustrative

From the Figma file and brand guidelines (16 November 2026): all copy, photographs, book illustrations, logo, colours, fonts, the AED 349 sleepsuit price, delivery and exchange terms, product details, fabric and care facts.

Illustrative, and marked `NEEDS INPUT`:

- every price except AED 349 (scaled from it), and bundle prices
- PJ set sizes, size chart measurements (marked "sample")
- the testimonial and the "real bedtimes" videos (pre-launch)
- contact email, phone and hours; payment methods
- print story lines and one suggested journal title
- the domain (nurtureandnext.com is assumed)

## Gaps to know about

1. No phone designs existed, so the Previous design view on Mobile is the desktop frame scaled down.
2. Several images in the Figma file are small (about 680px wide) and many have captions baked in. They were cropped clean for review; clean full-resolution originals are needed for launch.
3. Checkout is Shopify's own page and is not mocked up.

## Before anything is built

The Questions tab lists 24 questions. Three matter most: the real AED prices, which print names are final, and whether the testimonial and videos are from real testers.
