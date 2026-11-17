# Stiletto 5.2.2: Nurture & Next (prepared, not published)

`stiletto-nurture-next/` is a copy of the Stiletto 5.2.2 theme supplied, with only the parts that will not change in the feedback round prepared. Nothing has been uploaded to Shopify.

## Done

- `config/settings_data.json`: brand colours (cream page, charcoal text and footer, taupe buttons), Newsreader headings in capitals, DM Sans body, button and navigation tracking, sentence-case product titles, portrait product cards, round sibling swatches, badges (New, Set, Coming soon), free shipping bar at 500 (AED), cart notes and cross-sells on.
- `sections/nn-bundle-cards.liquid`: the "Build their bedtime" bundle cards (reads `custom.includes` metafield, list of single line text).
- `sections/nn-delivery-table.liquid`: the delivery-by-region table, prefilled with the UAE/GCC rates.
- `shopify theme check`: no offenses in the two new sections or the settings. The 39 files it flags are Stiletto's own, unchanged.

## Check on first upload

- The heading font is set to `newsreader_n4`. If the font picker shows a different handle (or no Newsreader), choose it in Theme settings › Typography.
- Upload the logo (prototype/site/assets/img/logo-primary.svg, or a PNG export) in Header › Logo, and the favicon (favicon-512.png).

## After the prototype is approved

Build the templates (`index.json`, `product.json`, `collection.json`, `page.*.json`) from the build labels in the prototype, once products, prices and photographs exist. See the Build plan tab in the prototype.

Upload as an unpublished theme only: `shopify theme push --unpublished` from inside `stiletto-nurture-next/`.
