/* Nurture & Next: presentation data, prototype v3 (after the client's feedback of 16 and 22 November 2026).
   "Previous design" = the incomplete Figma design from the previous designer (desktop frames only). */
var PREV = 'The previous designer’s Figma frame (desktop only). On Mobile, the desktop frame is shown scaled down.';
var NEW_PAGE = function (what) { return what; };

window.SHELL = {
  client: { name: 'Nurture & Next', logo: 'site/assets/img/logo-secondary-light.svg', subtitle: 'Website prototype v3' },
  domain: 'nurtureandnext.com',
  kinds: { brand: 'Brand', sales: 'Sales', trust: 'Trust', fix: 'Fix' },
  labels: {
    native: { tag: 'NATIVE', means: 'in Stiletto 5.2.2', color: '#17683f' },
    custom: { tag: 'CUSTOM', means: 'small new code', color: '#b4530a' },
    app: { tag: 'APP', means: 'needs an app', color: '#5b33b8' },
    todo: { tag: 'NEEDS INPUT', means: 'from Nurture & Next', color: '#a3231b' }
  },
  docs: [
    { id: 'brand', label: 'Brand', src: 'docs/brand.html' },
    { id: 'plan', label: 'Build plan', src: 'docs/plan.html' },
    { id: 'questions', label: 'Questions', src: 'docs/questions.html' },
    { id: 'audit', label: 'v1 review', src: 'docs/audit.html' }
  ],
  pages: [
    {
      id: 'home', label: 'Home', src: 'site/index.html',
      before: { kind: 'shot', name: 'home', caption: PREV },
      notes: [
        { n: 1, k: 'sales', t: 'The top bar sells',
          was: 'A ticker of four slogans, the first repeating the headline.',
          now: 'Three rotating facts: free UAE shipping over AED 500, save 7% with a bundle, 7-day size exchange.',
          why: 'Each line is a reason to add one more piece.' },
        { n: 2, k: 'sales', t: 'Shop by garment or by print',
          was: 'Five plain links; no menus.',
          now: 'Shop opens by garment and by print (each with its colour), plus a bundle card. Stories groups the prints, the wheel, the library and the journal.',
          why: 'Parents browse by garment; the client wants the prints to be browsable too.' },
        { n: 3, k: 'brand', t: 'One promise, then shop',
          was: 'Headline in capitals, two buttons, and a product card in dollars.',
          now: 'The client’s headline “Parenting has enough guesswork. We’re starting with sleep.” in sentence case, their line on what Nurture & Next is building, two buttons. Separate phone crop.',
          why: 'Clean and direct; the shopping starts one scroll down.' },
        { n: 4, k: 'sales', t: 'Each print, shoppable on its own',
          was: 'One generic sleepsuit and PJ set, prices in dollars.',
          now: 'Tabs for Sleepsuits, PJ sets and Grip socks. Each print is its own card in its own colour, with price, Add to bag (size picker in the card) and View.',
          why: 'The client’s brief: with a small range, let the prints and illustrations sell.' },
        { n: 5, k: 'brand', t: 'AeroCool in two states, at a glance',
          was: 'Three label-and-sentence rows and a taupe “The result” pill. The client called it PPT bullet points.',
          now: 'A diagram that switches between warm (heat absorbed into the capsules) and cool (heat given back). One line each. Copy is easy to change after testing.',
          why: 'The technology is understood in five seconds, without reading.' },
        { n: 6, k: 'brand', t: 'Benefits once, as icons',
          was: 'Benefits repeated across three text sections.',
          now: 'Five icons with one short line each. Not repeated elsewhere on the page.',
          why: 'The client asked for visual highlights and no repetition.' },
        { n: 7, k: 'trust', t: 'Parents say it, not us',
          was: 'One testimonial with a photo in the previous design.',
          now: 'Under the client’s heading “Good nights, in their own words.”, Stiletto’s Testimonials section: three short quotes with a star rating, who said it, and a link to the piece they wear. The text is a sample until real reviews from tester families arrive.',
          why: 'The client asked for testimonials. Placed right before the bundles, where a parent decides to buy more than one.' },
        { n: 8, k: 'sales', t: 'The two new bundles',
          was: 'Three bundle concepts in dollars.',
          now: 'Bedtime Rotation (“One to wear. One to spare.”) and Bedtime & Beyond (“For sleepy nights & busy little days.”), both 7% off, each linking to the configurable bundle page with that bundle selected.',
          why: 'Bundles lift order value past the AED 500 free-shipping line.' },
        { n: 9, k: 'trust', t: 'Real bedtimes, everywhere',
          was: 'Not there.',
          now: 'Under the client’s heading “Real bedtimes, everywhere.”: a rail of vertical clips from parents. Each is tagged with what the child is wearing, and tapping one opens it with Shop this. Photos stand in for the clips.',
          why: 'The client asked for UGC. Seeing the prints on real children sells them better than a product shot.' },
        { n: 10, k: 'brand', t: 'Every print has a story',
          was: 'Library tiles with an Amazon button first.',
          now: 'Three story covers in reading order, linking to the story pages.',
          why: 'Connects the prints to the in-box game and the QR code.' },
        { n: 11, k: 'brand', t: 'The founder, in one line',
          was: 'A long “parenting has enough guesswork” section and a testing note.',
          now: 'One photo, one quote, two sentences, a link.',
          why: 'Editorial where it works, short where it doesn’t need to be long.' },
        { n: 12, k: 'fix', t: 'Two articles, not four',
          was: 'Four journal previews.',
          now: 'Two, as the client asked.',
          why: 'Shorter page; the journal has its own home.' },
        { n: 13, k: 'sales', t: 'Better nights start here',
          was: 'The page ended on the journal.',
          now: 'The client’s closing call to action: “Better nights start here.”, “Find the sleepwear that fits their stage.”, Shop 0–12M (sleepsuits) and Shop 1Y–4Y (PJ sets). One quiet photo of a baby settling under a printed blanket, drifting very slowly. Nothing new introduced.',
          why: 'The last easy way back into the shop before the footer.' },
        { n: 14, k: 'fix', t: 'A UAE store',
          was: '“United States (USD $)” in the footer.',
          now: 'UAE · AED only. Four short link columns.',
          why: 'The client’s request: AED as the default, no USD placeholders.' }
      ]
    },
    {
      id: 'collection', label: 'Shop', src: 'site/collection.html',
      before: { kind: 'none', caption: NEW_PAGE('No collection page was designed.') },
      notes: [
        { n: 1, k: 'sales', t: 'A page per garment and per print', was: 'Not designed.', now: 'One template: all, a garment, or a single print. A print view opens with its colour and story line.', why: 'Customers browse by print as well as garment, as the client asked.' },
        { n: 2, k: 'sales', t: 'Filters in two rows of chips', was: 'Not designed.', now: 'Garment and print chips, a sort menu, sticky while scrolling.', why: 'With eight products, chips show every option at once.' },
        { n: 3, k: 'sales', t: 'One card per print', was: 'Not designed.', now: 'Eight products (six prints across two garments, two socks), linked by sibling swatches. Quick add opens a size picker in the card; sold-out sizes are crossed out.', why: 'The prints are the product. Each gets its own photo and card.' },
        { n: 4, k: 'brand', t: 'AeroCool in the grid', was: 'Not designed.', now: 'One tile explains the fabric in two colours and links to the AeroCool page.', why: 'Answers “why this price” where the decision is made.' },
        { n: 5, k: 'sales', t: 'Bundles in the grid', was: 'Not designed.', now: 'A dark tile for the 7% bundles.', why: 'Shoppers comparing pieces are the ones who buy two.' }
      ]
    },
    {
      id: 'product', label: 'Product', src: 'site/product.html?p=sleepsuit-moon',
      before: { kind: 'shot', name: 'product', caption: PREV },
      notes: [
        { n: 1, k: 'sales', t: 'A clean gallery', was: 'Thumbnails and one image, for one print.', now: 'Stiletto’s grid gallery on desktop, swipe with dots on phones. Each print has its own photos.', why: 'The print is what they are choosing.' },
        { n: 2, k: 'sales', t: 'The other prints, as print swatches', was: '“Print: Under One Moon” in text.', now: 'Three swatches drawn from each print’s motif, each linking to its own product.', why: 'Six distinct products, browsable by print, as the client asked.' },
        { n: 3, k: 'sales', t: 'Same print, other garment', was: 'Not possible.', now: 'A Sleepsuit / PJ set switch with ages and prices.', why: 'Siblings in both directions: by print and by garment.' },
        { n: 4, k: 'trust', t: 'Sizes with clear states', was: 'Size chips and “Approved measurements coming soon”.', now: 'Selected state, sold-out sizes crossed out, and a size guide drawer with a measurements table (sample numbers until development).', why: 'The client’s request, and the main cause of exchanges.' },
        { n: 5, k: 'sales', t: 'Build your bundle & save 7%', was: 'Not there.', now: 'Directly under Add to bag; opens the bundle page with this piece already in it.', why: 'The client’s contextual CTA, at the moment of intent.' },
        { n: 6, k: 'fix', t: 'Each benefit in one place', was: 'Intro, fabric section and seven features repeated each other.', now: 'Four short accordions: details, fabric and care, size and fit, delivery and exchanges.', why: 'No repetition, as the client asked.' },
        { n: 7, k: 'brand', t: 'Every feature explained once', was: 'Seven text blocks in a dark band. In v2, an icon row and “Made for the middle of the night” both repeated the responsiveness and the two-way zip.', now: 'One section, “Comfort in every little detail”: a garment photo with six numbered hotspots and the client’s copy. The short description no longer explains the fabric. PJ sets show only the details a PJ set has.', why: 'The client: each feature in one section only.' },
        { n: 8, k: 'brand', t: 'One story: this print’s', was: 'Three print photos, no stories. In v2, the other two stories sat beside it.', now: 'Only the story of the print being viewed, with its opening lines and Read the story. The other two are a tap away in the story reader.', why: 'The client: one story per product, relevant to that product.' },
        { n: 9, k: 'trust', t: 'Customer reviews', was: 'Not there.', now: 'Stars and the review count under the title (tap to jump down), then a reviews section before the recommendations: the average, how the ratings split, a fit scale from runs small to runs large, and reviews showing the size bought and how it fit. Through a reviews app styled to the theme. Sample reviews, written for each garment, until real ones arrive.', why: 'Parents trust other parents, and the fit line answers the sizing worry before it stops a purchase.' },
        { n: 10, k: 'sales', t: 'Complete their bedtime', was: 'Not there.', now: 'Same print in the other garment, and socks.', why: 'Natural second pieces, toward a bundle.' }
      ]
    },
    {
      id: 'bundles', label: 'Bundles', src: 'site/bundles.html',
      before: { kind: 'none', caption: NEW_PAGE('Bundles were three cards on the home page.') },
      notes: [
        { n: 1, k: 'sales', t: 'A page for bundles', was: 'Three editorial cards on the home page.', now: 'A dedicated, configurable bundle page.', why: 'The client: an interactive shopping experience, not another editorial section.' },
        { n: 2, k: 'sales', t: 'Two bundles to choose from', was: 'Three concepts in dollars.', now: 'Bedtime Rotation (any two sleepwear garments) and Bedtime & Beyond (two plus grip socks). Both 7% off.', why: 'As specified by the client; 7% subject to final unit economics.' },
        { n: 3, k: 'sales', t: 'Pick pieces visually', was: 'Not possible.', now: 'Slots for each piece; print tiles in their colours with the bundle price shown; sizes with sold-out states. It moves to the next slot by itself.', why: 'Fast, clear, and the prints stay the hero.' },
        { n: 4, k: 'sales', t: 'A live summary', was: 'Not possible.', now: 'Pieces, the 7% saving in AED and the total update as you pick. On phones a bar keeps the total and the button in reach.', why: 'The saving is visible at every step.' },
        { n: 5, k: 'trust', t: 'How it works, in three lines', was: 'Not there.', now: 'Mix anything, 7% off every piece, exchanges as usual.', why: 'Answers the questions that stop a bundle purchase.' }
      ]
    },
    {
      id: 'cart', label: 'Bag', src: 'site/cart.html?demo=1',
      views: [{ label: 'Bag page', src: 'site/cart.html?demo=1' }, { label: 'Drawer', src: 'site/collection.html?demo=1&bag=open&as=cart&bagnote=1' }],
      before: { kind: 'none', caption: NEW_PAGE('No bag was designed.') },
      notes: [
        { n: 1, k: 'sales', t: 'The drawer opens on add', was: 'Not designed.', now: 'Stiletto’s quick cart with the free-shipping bar and a bundle prompt when no bundle is in the bag.', why: 'Keeps them shopping, nudges toward AED 500.' },
        { n: 2, k: 'trust', t: 'Bundle savings on each line', was: 'Not designed.', now: 'Bundle pieces are tagged and show the original price crossed out.', why: 'The saving is visible right up to checkout.' },
        { n: 3, k: 'sales', t: 'Gift note and one add-on', was: 'Not designed.', now: 'A gift note, checkout, and Cloud Hopper as an add-on.', why: 'Baby clothes are often gifts.' }
      ]
    },
    {
      id: 'prints', label: 'Lumi', src: 'site/prints.html',
      views: [{ label: 'Lumi’s wheel', src: 'site/prints.html' }, { label: 'Story reader', src: 'site/print-story.html?s=moon' }],
      before: { kind: 'none', caption: NEW_PAGE('A new page: where the QR code in the box lands.') },
      notes: [
        { n: 1, k: 'brand', t: 'The page looks like the wheel card', was: 'Olive “Meet Lumi” section, cream page, like the rest of the site.', now: 'Midnight navy with a faint starfield and warm lamplight gold, taken from the wheel card in the box. The card’s heading line becomes the page heading, with a gold accent word and tiny spaced capitals, in the same fonts as the rest of the site (no italics). A moon and twinkling stars, soft hills and a cloud edge between sections, so it reads like a picture book. The wheel is the hero.', why: 'The client: Lumi’s page should feel like the wheel card. Opening it should feel like opening the box again.' },
        { n: 2, k: 'brand', t: 'The same wheel as in the box', was: 'Eight made-up situations on a flat colour wheel.', now: 'The printed wheel itself. The whole wheel turns one way and Lumi’s centre the other, like a fairground wheel; the arrow stops on one of the six adventures, which links to that book in the Library. A ring of little lamps lights up and chases while it spins; children can tap the wheel itself. The result shows the book’s cover with a burst of stars. Below, the six adventures as round pictures cut from the wheel: tap one and the wheel spins to it. The image is upscaled from a screenshot until the original file arrives.', why: 'The client: keep the wheel the same as the printed one, and connect it to the Library stories.' },
        { n: 3, k: 'brand', t: 'A bedtime ritual', was: 'Ended with a print story.', now: 'Spin, tell, tuck in with Lumi’s book. Three soft cards with gold drawn icons (a wheel, a speech bubble, a sleepy moon), joined by the dashed line from the wheel card.', why: 'The ritual matches the box.' },
        { n: 4, k: 'sales', t: 'One link to the Library', was: 'In v2, “Read them in order”: the three print stories.', now: 'On the card’s warm paper: three book covers fanned like books on a bed, Lumi peeking over them, one line and Visit the Library.', why: 'As the client asked. Print stories stay on each product page and the story reader.' },
        { n: 5, k: 'brand', t: 'A storybook, not a web page', was: 'Not designed.', now: 'The client’s story text, a few lines per page, on the print’s colour. Tap or swipe to turn, a dim mode for bedtime, then Next story and Shop this print.', why: 'Where the thank-you card QR (“Discover their print story”) should land.' }
      ]
    },
    {
      id: 'aerocool', label: 'AeroCool', src: 'site/aerocool.html',
      before: { kind: 'shot', name: 'fabric', caption: PREV },
      notes: [
        { n: 1, k: 'fix', t: 'Problem and inspiration in two lines', was: 'Two long sections repeating the temperature-change explanation.', now: 'One heading and two sentences, with the space porthole image.', why: 'The client asked to shorten them.' },
        { n: 2, k: 'brand', t: 'Four stages, one line each', was: 'Four boxes with generic icons and paragraphs.', now: 'A stepper: a drawing per stage, one line each, with next and previous.', why: 'A simple explanation of the innovation, visually different from the storytelling pages.' },
        { n: 3, k: 'sales', t: 'Shop, straight after', was: 'One “Shop now” at the end. In v2, “In three prints, from newborn to four” with a line of ages.', now: '“A collection for every little stage”, one line and Shop now, with two products, immediately after the stages. The client’s copy.', why: 'Shorter, and it speaks to the whole range rather than repeating ages.' },
        { n: 4, k: 'trust', t: 'Testing, when results are in', was: '“Results will be displayed here once confirmed.”', now: 'Kept short and marked NEEDS INPUT; no garment features repeated.', why: 'Publish the testing section with real results.' }
      ]
    },
    {
      id: 'about', label: 'Our story', src: 'site/about.html',
      before: { kind: 'shot', name: 'story', caption: PREV },
      notes: [
        { n: 1, k: 'brand', t: 'The previous designer’s look, through the whole page', was: 'Different styles from section to section.', now: 'The look of the previous designer’s frame carried through the page: warm brown, full-width photos with a warm tint, a first line in white capitals and a second line in soft taupe-pink on the photo sections, faint thin circle lines. Text kept modest so only one line per section reads as a heading. The opening keeps its italic line; elsewhere the second lines are upright. The client’s copy, with two repeated lines removed.', why: 'The client liked that frame; one consistent, personal look.' },
        { n: 2, k: 'brand', t: 'The brand story, on soft sand', was: 'Two columns of text with pictures underneath.', now: 'On a soft sand background with faint circle lines: the question, a thin rule, the two paragraphs and Shop now together on the left; the sleepwear and grip socks photos on the right, slightly staggered.', why: 'A short, warm introduction that leads into her story.' },
        { n: 3, k: 'brand', t: 'Her story, like a picture book', was: 'Four paragraphs in one block beside a photo.', now: '“The story behind Nurture & Next” as a small label above “A little boy. A big life change. And a whole lot of questions.”, then one paragraph at a time like the pages of a picture book, all on one screen. It turns on its own every few seconds while on screen, and her photo changes with it; arrows or a swipe still turn the page. No long scroll.', why: 'The founder story is the heart of the page.' },
        { n: 4, k: 'brand', t: 'The moment it clicked', was: 'Capitals on dark, with floating bubbles.', now: 'On black: “DIFFERENT FAMILIES. DIFFERENT CHILDREN. The same questions, again and again.” centred in soft pink, faint circle lines, then “That’s when something clicked.”', why: 'The turning point, a quiet pause between the photos.' },
        { n: 5, k: 'brand', t: 'The idea, then childhood right now', was: 'Large statements with a text card over a photo.', now: 'The question with “so much guesswork?” in taupe-pink, a photo beside the answer. Then “BECAUSE CHILDHOOD IS HAPPENING RIGHT NOW.” on a full-width photo with its line and Shop now.', why: 'Her idea, in the order she tells it, ending on the feeling.' },
        { n: 6, k: 'sales', t: 'Why Nurture & Next exists', was: 'Three columns with icons.', now: 'The heading and a calm nursery photo on the left, purpose, belief and positioning as three quiet lines on the right, then Shop now.', why: 'The client’s closing section, without reading like a list of pointers.' }
      ]
    },
    {
      id: 'library', label: 'Library', src: 'site/library.html',
      before: { kind: 'shot', name: 'library', caption: PREV },
      notes: [
        { n: 1, k: 'brand', t: 'The same world as Lumi’s wheel', was: 'Cream page like the shop.', now: 'Midnight navy with a faint starfield and lamplight gold, as on Lumi’s page and the wheel card, with Lumi glowing and a link back to the wheel.', why: 'The client asked for the Library to take the same theme.' },
        { n: 2, k: 'sales', t: 'The wheel’s adventures, first', was: '“Collection A” and paragraph descriptions.', now: 'Lumi’s Wonder Trails on the night background, one sentence per book, Buy on Amazon in gold where available. Each book can be linked to from the wheel.', why: 'Every slice of the wheel leads here.' },
        { n: 3, k: 'brand', t: 'The second series, on card paper', was: '“Collection B”.', now: 'Little Lessons for Growing Minds on the wheel card’s warm paper.', why: 'Keeps the two series distinct.' }
      ]
    },
    {
      id: 'journal', label: 'Journal', src: 'site/journal.html',
      before: { kind: 'none', caption: NEW_PAGE('The home page linked to four article titles.') },
      notes: [
        { n: 1, k: 'brand', t: 'A simple journal', was: 'Not designed.', now: 'One featured article and topic filters.', why: 'Somewhere for the home page’s two articles to lead.' },
        { n: 2, k: 'trust', t: 'Articles to write', was: 'Titles only.', now: 'Marked NEEDS INPUT.', why: 'Launch with one or two finished articles.' }
      ]
    },
    {
      id: 'help', label: 'Help', src: 'site/help.html',
      views: [{ label: 'Contact & FAQ', src: 'site/help.html' }, { label: 'Shipping', src: 'site/shipping.html' }, { label: 'Exchanges', src: 'site/returns.html' }, { label: 'Size guide', src: 'site/size-guide.html' }],
      before: { kind: 'shot', name: 'help', caption: PREV },
      notes: [
        { n: 1, k: 'trust', t: 'Clickable WhatsApp and email', was: '“[To be added]” and “[To be confirmed]”.', now: 'Two tappable contact cards, marked NEEDS INPUT until the details and hours are confirmed.', why: 'The client’s request.' },
        { n: 2, k: 'trust', t: 'A form that confirms', was: 'A form with no states.', now: 'Inline errors on required fields and a clear confirmation after sending.', why: 'The client’s request.' },
        { n: 3, k: 'trust', t: 'A short FAQ', was: 'Thirteen questions, one answered.', now: 'Six: sizing, delivery time and cost, exchanges, tracking, washing.', why: 'The priorities the client listed.' },
        { n: 4, k: 'fix', t: 'Policies on their own pages', was: 'Everything on one long page.', now: 'Shipping, Exchanges & returns and Size guide as separate pages.', why: 'As requested; the contact page stays short.' },
        { n: 5, k: 'trust', t: 'Delivery at a glance', was: 'A dark table.', now: 'A light table that stacks on phones; free shipping highlighted.', why: 'Most people check this on a phone.' },
        { n: 6, k: 'trust', t: 'Exchanges in three steps', was: 'Five boxes of policy text.', now: 'Message us, send it back, get the new size.', why: 'The process before the fine print.' },
        { n: 7, k: 'trust', t: 'The fine print, folded', was: 'Always open.', now: 'Four short rows.', why: 'Easy to find the one answer needed.' },
        { n: 8, k: 'trust', t: 'One size guide', was: '“Approved measurements coming soon”.', now: 'Tabs per garment; sample numbers until the real measurements arrive.', why: 'Also feeds the size drawer on product pages.' }
      ]
    }
  ]
};
