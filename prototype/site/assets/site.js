/* Nurture & Next prototype v2: catalogue, shared header/footer/drawers, bag, cards, small behaviours.
   Loaded on every page before proto.js; renders synchronously so build labels and pins see the shared parts.
   On Shopify: header/footer groups, quick cart, product cards, sibling metafields. */
(function () {
  'use strict';
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var IMG = 'assets/img/';
  var FREE_SHIP = 500, BUNDLE_SAVE = 0.07;

  /* ---------- prints, garments, products ---------- */
  var PRINTS = {
    moon: { name: 'Under One Moon', n: 1, line: 'A little elephant who wanted to play with the stars.' },
    atlas: { name: 'Dream Atlas', n: 2, line: 'Teddy flies to the moon, and a star finds the way home.' },
    hush: { name: 'Hush Hush', n: 3, line: 'A cloud and two stars sing Teddy to sleep.' }
  };
  var GARMENTS = {
    sleepsuit: { label: 'Sleepsuits', name: 'AeroCool Sleepsuit', age: '0–12M', sizes: ['0–3M', '3–6M', '6–9M', '9–12M'], price: 349 },
    pj: { label: 'PJ sets', name: 'AeroCool PJ Set', age: '12M–4Y', sizes: ['12–18M', '18–24M', '2–3Y', '3–4Y'], price: 379 },
    socks: { label: 'Grip socks', age: '6M–4Y', sizes: ['6–12M', '1–2Y', '2–4Y'] }
  };
  // eight Shopify products. Siblings: same garment, other prints (swatches) and same print, other garment (switch)
  var P = {
    'sleepsuit-moon':  { g: 'sleepsuit', print: 'moon',  imgs: ['sleepsuit-moon', 'fabric-moon', 'room-moon'], badge: 'New' },
    'sleepsuit-atlas': { g: 'sleepsuit', print: 'atlas', imgs: ['sleepsuit-atlas', 'tent', 'baby-elephant'], soldout: ['0–3M'] },
    'sleepsuit-hush':  { g: 'sleepsuit', print: 'hush',  imgs: ['baby-teddy', 'pocket-elephant', 'smile-baby'] },
    'pj-moon':  { g: 'pj', print: 'moon',  imgs: ['girl-sleep-lamp', 'mum-hug', 'pj-fold'], badge: 'New' },
    'pj-atlas': { g: 'pj', print: 'atlas', imgs: ['girl-bag', 'girl-bag-2', 'pj-fold'] },
    'pj-hush':  { g: 'pj', print: 'hush',  imgs: ['pj-set', 'topdown-baby', 'pj-fold'], soldout: ['3–4Y'] },
    'cloud-hopper': { g: 'socks', title: 'Cloud Hopper', sub: 'Grip socks · 1 pair', price: 69, imgs: ['grip-socks', 'tent'] },
    'little-wild-trio': { g: 'socks', title: 'Little Wild Trio', sub: 'Grip socks · 3 pairs', price: 159, imgs: ['tent', 'grip-socks'] }
  };
  Object.keys(P).forEach(function (id) {
    var p = P[id], g = GARMENTS[p.g];
    p.id = id;
    p.title = p.title || g.name;
    p.printName = p.print ? PRINTS[p.print].name : '';
    p.sub = p.sub || p.printName;
    p.price = p.price || g.price;
    p.sizes = g.sizes; p.age = g.age; p.soldout = p.soldout || [];
    p.full = p.print ? p.title + ' · ' + p.printName : p.title;
  });
  var ORDER = ['sleepsuit-moon', 'sleepsuit-atlas', 'sleepsuit-hush', 'pj-moon', 'pj-atlas', 'pj-hush', 'cloud-hopper', 'little-wild-trio'];
  function siblings(id) { var p = P[id]; return ORDER.filter(function (k) { return P[k].g === p.g && P[k].print; }); }
  function twin(id) { var p = P[id]; if (!p.print) return null; return (p.g === 'sleepsuit' ? 'pj-' : 'sleepsuit-') + p.print; }

  function aed(n) { return 'AED ' + Math.round(n).toLocaleString('en-US'); }
  function img(n) { return IMG + n + '.webp'; }
  function url(id) { return 'product.html?p=' + id; }

  /* ---------- line drawings (placeholders for the real print artwork) ---------- */
  var ART = window.NN_ART; // print motifs and Lumi, defined in logos.js
  var I = {
    search: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="11" cy="11" r="6.5"/><path d="m16 16 4.5 4.5"/></svg>',
    user: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="8" r="4"/><path d="M4.5 20.5c1.2-3.6 4-5.5 7.5-5.5s6.3 1.9 7.5 5.5"/></svg>',
    bag: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M5 8h14l-1 12.5H6L5 8Z"/><path d="M9 10V6.5a3 3 0 0 1 6 0V10"/></svg>',
    menu: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M3.5 7h17M3.5 12h17M3.5 17h17"/></svg>',
    close: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="m6 6 12 12M18 6 6 18"/></svg>',
    plus: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M12 5v14M5 12h14"/></svg>',
    down: '<svg viewBox="0 0 10 10" fill="none" stroke="currentColor" stroke-width="1.4"><path d="m2 3.5 3 3 3-3"/></svg>',
    arrow: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M4 12h15m-6-6 6 6-6 6"/></svg>',
    ig: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="3.5" y="3.5" width="17" height="17" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.2" cy="6.8" r=".9" fill="currentColor"/></svg>',
    wa: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M4 20l1.3-4A8 8 0 1 1 8 18.7L4 20Z"/><path d="M9 9.5c0 3 2.5 5.5 5.5 5.5l1-1.5-2-1-1 .8a4 4 0 0 1-2.3-2.3l.8-1-1-2L9 9.5Z" fill="currentColor" stroke="none"/></svg>',
    mail: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="3" y="5" width="18" height="14"/><path d="m3.5 6 8.5 7 8.5-7"/></svg>',
    thermo: '<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><path d="M20 8a4 4 0 0 1 8 0v20a8 8 0 1 1-8 0Z"/><circle cx="24" cy="34" r="3.5" fill="#e0c16e" stroke="none"/><path d="M24 31V16"/><path d="M36 14h6M36 20h4M6 14h6M8 20h4"/></svg>',
    feather: '<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><path d="M12 38C14 22 24 10 38 8c-2 14-12 26-26 30Z"/><path d="M12 38 30 18M18 30h8M22 24h8"/></svg>',
    zip: '<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><path d="M24 4v40"/><path d="M20 8h4M24 12h4M20 16h4M24 20h4M20 24h4"/><rect x="19" y="27" width="10" height="7" rx="1.5"/><path d="M24 34v4"/></svg>',
    cuff: '<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><path d="M14 8h14v18c0 8-4 14-10 14s-8-4-8-10V18c0-4 2-6 4-6"/><path d="M14 26h14"/><path d="M28 18c6 0 8 4 6 8"/></svg>',
    tag: '<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><path d="M8 8h16l16 16-16 16L8 24Z"/><circle cx="17" cy="17" r="2.5"/><path d="M6 42 42 6"/></svg>',
    sock: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"><path d="M9 3h7v9l-6 7.5a3 3 0 0 1-4.5-4L9 12Z"/></svg>',
    suit: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"><path d="M9 3h6l5 4-2 3-2-1v12h-3v-5h-2v5H8V9L6 10 4 7Z"/></svg>'
  };

  /* ---------- cards ---------- */
  function swatchesHTML(id) {
    var p = P[id]; if (!p.print) return '';
    return '<div class="sw">' + siblings(id).map(function (k) {
      return '<a href="' + url(k) + '" data-print="' + P[k].print + '" class="' + (k === id ? 'is-on' : '') + '" title="' + P[k].printName + '" aria-label="' + P[k].printName + '"></a>';
    }).join('') + '</div>';
  }
  function sizesHTML(id) {
    var p = P[id];
    return '<div class="pc__sizes"><p><span>Choose a size</span><button type="button" data-unsize aria-label="Close">×</button></p><div>' +
      p.sizes.map(function (s) { return '<button type="button" data-add="' + id + '" data-size="' + s + '"' + (p.soldout.indexOf(s) > -1 ? ' disabled title="Sold out"' : '') + '>' + s + '</button>'; }).join('') + '</div></div>';
  }
  function pc(id) {
    var p = P[id];
    return '<article class="pc" data-print="' + (p.print || '') + '"><div class="pc__top">' +
      '<a class="pc__media" href="' + url(id) + '">' + (p.badge ? '<span class="pc__badge">' + p.badge + '</span>' : '') +
        '<img src="' + img(p.imgs[0]) + '" alt="' + p.full + '" loading="lazy">' + (p.imgs[1] ? '<img src="' + img(p.imgs[1]) + '" alt="" loading="lazy">' : '') + '</a>' +
      '<button class="pc__add" type="button" data-size-open aria-label="Quick add ' + p.full + '">' + I.plus + '</button>' + sizesHTML(id) + '</div>' +
      '<div class="pc__body"><a class="pc__name t-name" href="' + url(id) + '">' + p.title + '</a><span class="pc__price">' + aed(p.price) + '</span>' +
        '<div class="pc__meta"><span>' + (p.print ? '<i class="pdot" data-print="' + p.print + '"></i>' : '') + p.sub + '</span>' + swatchesHTML(id) + '</div></div>' +
    '</article>';
  }
  function prc(id) {
    var p = P[id];
    return '<article class="prc pc" data-print="' + p.print + '">' +
      '<div class="pc__top"><a class="prc__media" href="' + url(id) + '"><span class="prc__motif">' + ART[p.print] + '</span><img src="' + img(p.imgs[0]) + '" alt="' + p.full + '" loading="lazy"></a>' +
      sizesHTML(id) + '</div>' +
      '<div class="prc__b"><span class="t-label">Print ' + PRINTS[p.print].n + ' of 3</span><a class="t-h3" href="' + url(id) + '">' + p.printName + '</a><span class="pc__price">' + aed(p.price) + '</span>' +
        '<span class="t-small" style="grid-column:1/-1;opacity:.8">' + p.title + ' · ' + p.age + '</span>' +
        '<div class="prc__cta"><button class="btn btn--sm" type="button" data-size-open>Add to bag</button><a class="btn btn--sm btn--ghost" href="' + url(id) + '">View</a></div></div>' +
    '</article>';
  }

  /* ---------- header ---------- */
  var PAGE = document.body.getAttribute('data-page');
  var logo = (window.NN_LOGO || {}).primary || '<b>nurture &amp; NEXT</b>';
  function cur(ids) { return ids.indexOf(PAGE) > -1 ? ' is-cur' : ''; }
  var printLinks = Object.keys(PRINTS).map(function (k) { return '<li><a href="collection.html?print=' + k + '"><i class="pdot" data-print="' + k + '"></i>' + PRINTS[k].name + '</a></li>'; }).join('');
  var megaShop = '<div class="mega"><div class="wrap mega__in">' +
    '<div><h4 class="t-label">By garment</h4><ul><li><a href="collection.html?g=sleepsuit">Sleepsuits</a></li><li><a href="collection.html?g=pj">PJ sets</a></li><li><a href="collection.html?g=socks">Grip socks</a></li><li><a href="collection.html">Shop all</a></li></ul></div>' +
    '<div><h4 class="t-label">By print</h4><ul>' + printLinks + '</ul></div>' +
    '<a class="mega__card" href="bundles.html"><img src="' + img('basket-wide') + '" alt=""><span>Build a bundle, save 7%</span></a>' +
  '</div></div>';
  var megaStories = '<div class="mega"><div class="wrap mega__in mega__in--stories">' +
    Object.keys(PRINTS).map(function (k) { return '<a class="mega__cover cov" href="print-story.html?s=' + k + '" data-print="' + k + '"><div class="cov__art">' + ART[k] + '</div><b>' + PRINTS[k].name + '</b></a>'; }).join('') +
    '<div><h4 class="t-label">Stories</h4><ul><li><a href="prints.html">Lumi’s wheel</a></li><li><a href="library.html">Lumi’s Library</a></li><li><a href="journal.html">Journal</a></li></ul></div>' +
  '</div></div>';

  document.body.insertAdjacentHTML('afterbegin',
    '<div class="ann" data-build="native" data-build-label="Announcement bar: 3 announcements, autoplay" data-note-key="ann"><div class="ann__in">' +
      '<span class="ann__i is-on">Free UAE shipping over AED 500</span><span class="ann__i">Build a bundle, save 7%</span><span class="ann__i">Easy 7-day size exchange in the UAE</span>' +
    '</div></div>' +
    '<header class="hdr" data-build="native" data-build-label="Header: logo left, menu centre, 2 compact meganavs" data-build-pos="br" data-note-key="header"><div class="wrap hdr__in">' +
      '<button class="ibtn hdr__menu" type="button" data-open="menu" aria-label="Menu">' + I.menu + '</button>' +
      '<a class="hdr__logo" href="index.html" aria-label="Nurture & Next home">' + logo + '</a>' +
      '<nav class="hdr__nav" aria-label="Main">' +
        '<div class="nav__i"><a class="' + cur(['collection', 'product']) + '" href="collection.html">Shop ' + I.down + '</a>' + megaShop + '</div>' +
        '<div class="nav__i"><a class="' + cur(['bundles']) + '" href="bundles.html">Bundles</a></div>' +
        '<div class="nav__i"><a class="' + cur(['aerocool']) + '" href="aerocool.html">AeroCool</a></div>' +
        '<div class="nav__i"><a class="' + cur(['prints', 'library', 'journal']) + '" href="prints.html">Stories ' + I.down + '</a>' + megaStories + '</div>' +
        '<div class="nav__i"><a class="' + cur(['about']) + '" href="about.html">Our story</a></div>' +
      '</nav>' +
      '<div class="hdr__r"><a class="ibtn d-only" href="collection.html" aria-label="Search">' + I.search + '</a><a class="ibtn d-only" href="help.html" aria-label="Account">' + I.user + '</a>' +
        '<button class="ibtn" type="button" data-open="bag" aria-label="Bag">' + I.bag + '<span class="cnt" data-count>0</span></button></div>' +
    '</div></header>');

  document.body.insertAdjacentHTML('beforeend',
    '<footer class="ftr" data-build="native" data-build-label="Footer: newsletter block, 4 link lists, social, payment icons" data-note-key="footer"><div class="wrap">' +
      '<div class="ftr__top"><div><div class="ftr__logo">' + logo + '</div><form class="ftr__news" data-form novalidate><p>Bedtime stories, new prints and the occasional sleep tip. One email a month.</p>' +
        '<div class="form__fields"><div class="ftr__row"><input type="email" required placeholder="Your email" aria-label="Email"><button type="submit">Subscribe</button></div></div><p class="ok" style="background:transparent;color:var(--cream);padding:12px 0 0;border:0">Thank you. You’re on the list.</p></form>' +
        '<div class="social"><a href="#" aria-label="Instagram">' + I.ig + '</a><a href="#" aria-label="WhatsApp">' + I.wa + '</a></div></div>' +
      '<div class="ftr__cols">' +
        '<div><h4 class="t-label">Shop</h4><a href="collection.html?g=sleepsuit">Sleepsuits</a><a href="collection.html?g=pj">PJ sets</a><a href="collection.html?g=socks">Grip socks</a><a href="bundles.html">Bundles</a></div>' +
        '<div><h4 class="t-label">Stories</h4><a href="prints.html">Lumi’s wheel</a><a href="library.html">Lumi’s Library</a><a href="journal.html">Journal</a></div>' +
        '<div><h4 class="t-label">About</h4><a href="about.html">Our story</a><a href="aerocool.html">AeroCool</a></div>' +
        '<div><h4 class="t-label">Help</h4><a href="help.html">Contact us</a><a href="help.html#faq">FAQs</a><a href="shipping.html">Shipping &amp; delivery</a><a href="returns.html">Exchanges &amp; returns</a><a href="help.html#track">Track your order</a></div>' +
      '</div></div>' +
      '<div class="ftr__bot"><span>United Arab Emirates · AED</span><span>© 2026 Nurture &amp; Next · <a href="#">Privacy</a> · <a href="#">Terms</a></span><span class="pay"><i>VISA</i><i>MASTERCARD</i><i>APPLE PAY</i></span></div>' +
    '</div></footer>' +
    '<div class="scrim" data-close></div>' +
    '<aside class="drawer drawer--l" aria-label="Menu" data-build="native" data-build-label="Mobile menu drawer with menu images" data-note-key="menu">' +
      '<div class="drawer__hd"><span class="hdr__logo" style="justify-self:start">' + logo + '</span><button class="ibtn" type="button" data-close aria-label="Close">' + I.close + '</button></div>' +
      '<div class="drawer__bd"><div class="mnav__tiles"><a href="collection.html?g=sleepsuit"><img src="' + img('sleepsuit-moon') + '" alt="">Sleepsuits · 0–12M</a><a href="collection.html?g=pj"><img src="' + img('girl-sleep-lamp') + '" alt="">PJ sets · 12M–4Y</a></div>' +
        '<nav class="mnav"><details><summary>Shop <span>+</span></summary><div class="mnav__sub"><a href="collection.html">Shop all</a><a href="collection.html?g=socks">Grip socks</a>' +
          Object.keys(PRINTS).map(function (k) { return '<a href="collection.html?print=' + k + '"><i class="pdot" data-print="' + k + '"></i>' + PRINTS[k].name + '</a>'; }).join('') + '</div></details>' +
          '<a href="bundles.html">Bundles</a><a href="aerocool.html">AeroCool</a>' +
          '<details><summary>Stories <span>+</span></summary><div class="mnav__sub"><a href="prints.html">Lumi’s wheel</a><a href="library.html">Lumi’s Library</a><a href="journal.html">Journal</a></div></details>' +
          '<a href="about.html">Our story</a><a href="help.html">Help</a></nav></div>' +
    '</aside>' +
    '<aside class="drawer drawer--r is-bag" aria-label="Bag" data-build="native" data-build-label="Quick cart: free shipping bar at AED 500" data-note-key="bag">' +
      '<div class="drawer__hd"><h2 class="t-h3">Your bag</h2><button class="ibtn" type="button" data-close aria-label="Close">' + I.close + '</button></div>' +
      '<div class="drawer__bd" data-bag-lines></div><div class="drawer__ft" data-bag-foot></div></aside>' +
    '<div class="toast" role="status" aria-live="polite"></div>');
  $('.hdr').style.position = 'sticky';

  /* ---------- bag (this browser only) ---------- */
  var KEY = 'nn-proto-bag-v2';
  function load() { try { return JSON.parse(localStorage.getItem(KEY)) || []; } catch (e) { return []; } }
  function save() { try { localStorage.setItem(KEY, JSON.stringify(bag)); } catch (e) {} }
  var bag = load().filter(function (l) { return P[l.id]; });
  function count() { return bag.reduce(function (n, l) { return n + l.qty; }, 0); }
  function total() { return bag.reduce(function (n, l) { return n + l.qty * l.price; }, 0); }
  function linesHTML() {
    if (!bag.length) return '<div class="empty"><p class="t-h3">Your bag is empty</p><p class="muted t-small" style="margin:6px 0 20px">Start with their size.</p><div class="btns" style="justify-content:center"><a class="btn" href="collection.html?g=sleepsuit">Sleepsuits</a><a class="btn btn--ghost" href="collection.html?g=pj">PJ sets</a></div></div>';
    var t = total(), left = Math.max(0, FREE_SHIP - t);
    return '<div class="ship">' + (left ? 'You’re <b>' + aed(left) + '</b> away from free UAE shipping.' : 'Free UAE shipping included.') + '<div class="ship__bar"><i style="width:' + Math.min(100, t / FREE_SHIP * 100) + '%"></i></div></div>' +
      bag.map(function (l, i) {
        var p = P[l.id];
        return '<div class="bl"><img src="' + img(p.imgs[0]) + '" alt=""><div><p class="t-name">' + p.title + '</p><p class="bl__m">' + (p.print ? p.printName + ' · ' : '') + l.size + '</p>' +
          (l.bundle ? '<span class="bl__tag">' + l.bundle + ' · 7% off</span><br>' : '') +
          '<span class="qty"><button type="button" data-q="-1" data-i="' + i + '" aria-label="One fewer">−</button><span>' + l.qty + '</span><button type="button" data-q="1" data-i="' + i + '" aria-label="One more">+</button></span>' +
          '<button class="rm" type="button" data-rm="' + i + '">Remove</button></div><span class="bl__p">' + aed(l.price * l.qty) + (l.bundle ? '<s>' + aed(p.price * l.qty) + '</s>' : '') + '</span></div>';
      }).join('') +
      (bag.some(function (l) { return l.bundle; }) ? '' : '<a class="tlink" href="bundles.html" style="margin-top:16px">Build a bundle and save 7% →</a>');
  }
  function footHTML() {
    if (!bag.length) return '<p class="t-small muted center">Free UAE shipping over AED 500 · 7-day size exchange</p>';
    return '<div class="sum"><span>Subtotal</span><span>' + aed(total()) + '</span></div><p class="t-small muted" style="margin:4px 0 14px">Delivery calculated at checkout.</p>' +
      '<a class="btn btn--block" href="cart.html?checkout=1">Checkout</a><a class="btn btn--ghost btn--block" style="margin-top:8px" href="cart.html">View bag</a>';
  }
  function renderBag() {
    $$('[data-count]').forEach(function (e) { e.textContent = count(); });
    var L = $('[data-bag-lines]'), F = $('[data-bag-foot]');
    if (L) L.innerHTML = linesHTML();
    if (F) F.innerHTML = footHTML();
    document.dispatchEvent(new CustomEvent('nn:bag'));
  }
  function addLine(id, size, qty, opts) {
    opts = opts || {};
    var p = P[id], price = opts.bundle ? Math.round(p.price * (1 - BUNDLE_SAVE)) : p.price;
    var ex = bag.filter(function (l) { return l.id === id && l.size === size && (l.bundle || '') === (opts.bundle || ''); })[0];
    if (ex) ex.qty += qty || 1; else bag.push({ id: id, size: size, qty: qty || 1, price: price, bundle: opts.bundle || '' });
  }
  function add(id, size, qty) { addLine(id, size, qty); save(); renderBag(); NN.open('bag'); }
  function addBundle(name, items) { items.forEach(function (it) { addLine(it.id, it.size, 1, { bundle: name }); }); save(); renderBag(); NN.open('bag'); }
  function open(w) { document.body.classList.remove('is-bag', 'is-menu', 'is-sheet'); document.body.classList.add('is-' + w); }
  function close() { document.body.classList.remove('is-bag', 'is-menu', 'is-sheet'); }
  function toast(m) { var t = $('.toast'); t.textContent = m; t.classList.add('is-on'); clearTimeout(toast.t); toast.t = setTimeout(function () { t.classList.remove('is-on'); }, 2600); }

  /* ---------- fill marked grids ---------- */
  $$('[data-cards]').forEach(function (el) { el.innerHTML = el.getAttribute('data-cards').split(',').map(function (id) { return pc(id.trim()); }).join(''); });
  $$('[data-printcards]').forEach(function (el) { el.innerHTML = el.getAttribute('data-printcards').split(',').map(function (id) { return prc(id.trim()); }).join(''); });
  $$('[data-art]').forEach(function (el) { el.innerHTML = ART[el.getAttribute('data-art')]; });
  $$('[data-icon]').forEach(function (el) { el.innerHTML = I[el.getAttribute('data-icon')]; });

  /* ---------- events ---------- */
  document.addEventListener('click', function (e) {
    var t = e.target.closest('[data-open], [data-close], [data-size-open], [data-unsize], [data-add], [data-q], [data-rm], [data-tab], [data-fake]');
    if (!t) return;
    if (t.hasAttribute('data-open')) { e.preventDefault(); open(t.getAttribute('data-open')); return; }
    if (t.hasAttribute('data-close')) { close(); return; }
    if (t.hasAttribute('data-size-open')) { $$('.pc.is-sizing').forEach(function (c) { c.classList.remove('is-sizing'); }); t.closest('.pc').classList.add('is-sizing'); return; }
    if (t.hasAttribute('data-unsize')) { t.closest('.pc').classList.remove('is-sizing'); return; }
    if (t.hasAttribute('data-add')) { var c = t.closest('.pc'); if (c) c.classList.remove('is-sizing'); add(t.getAttribute('data-add'), t.getAttribute('data-size'), 1); return; }
    if (t.hasAttribute('data-q')) { var l = bag[+t.getAttribute('data-i')]; l.qty += +t.getAttribute('data-q'); if (l.qty < 1) bag.splice(+t.getAttribute('data-i'), 1); save(); renderBag(); return; }
    if (t.hasAttribute('data-rm')) { bag.splice(+t.getAttribute('data-rm'), 1); save(); renderBag(); return; }
    if (t.hasAttribute('data-tab')) {
      var box = t.closest('[data-tabs]'), key = t.getAttribute('data-tab');
      $$('[data-tab]', box).forEach(function (b) { b.classList.toggle('is-on', b === t); b.setAttribute('aria-selected', b === t); });
      $$('[data-panel]', box).forEach(function (p) { p.hidden = p.getAttribute('data-panel') !== key; });
      if (window.PROTO) PROTO.refresh();
      return;
    }
    if (t.hasAttribute('data-fake')) { e.preventDefault(); toast(t.getAttribute('data-fake')); }
  });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') { close(); $$('.pc.is-sizing').forEach(function (c) { c.classList.remove('is-sizing'); }); } });

  // forms: inline validation, then a clear confirmation
  document.addEventListener('submit', function (e) {
    var f = e.target; if (!f.hasAttribute('data-form')) return;
    e.preventDefault();
    var bad = false;
    $$('input[required], textarea[required], select[required]', f).forEach(function (inp) {
      var ok = inp.value.trim() && (inp.type !== 'email' || /.+@.+\..+/.test(inp.value));
      var w = inp.closest('.field'); if (w) w.classList.toggle('is-err', !ok);
      if (!ok) bad = true;
    });
    if (bad) { var first = $('.is-err input, .is-err textarea', f); if (first) first.focus(); else toast('Please enter a valid email.'); return; }
    f.classList.add('is-sent');
  });

  // header shadow once scrolled; reveal-on-scroll
  var hdr = $('.hdr');
  window.addEventListener('scroll', function () { hdr.classList.toggle('is-stuck', window.scrollY > 8); }, { passive: true });
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (en) { en.forEach(function (x) { if (x.isIntersecting) { x.target.classList.add('is-in'); io.unobserve(x.target); } }); }, { rootMargin: '0px 0px -8% 0px' });
    $$('.rv').forEach(function (el) { io.observe(el); });
  } else { $$('.rv').forEach(function (el) { el.classList.add('is-in'); }); }

  // announcement rotation
  var anns = $$('.ann__i'), ai = 0;
  setInterval(function () { anns[ai].classList.remove('is-on'); ai = (ai + 1) % anns.length; anns[ai].classList.add('is-on'); }, 4000);

  // presentation helpers: ?demo=1 fills an empty bag, ?bag=open opens the drawer, ?as=<tab> reports another tab (used for views)
  var QS = new URLSearchParams(location.search);
  if (QS.get('demo') === '1' && !bag.length) {
    addLine('sleepsuit-moon', '3–6M', 1, { bundle: 'Bedtime Rotation' }); addLine('sleepsuit-hush', '3–6M', 1, { bundle: 'Bedtime Rotation' }); addLine('cloud-hopper', '6–12M', 1); save();
  }
  window.NN = { P: P, PRINTS: PRINTS, GARMENTS: GARMENTS, ORDER: ORDER, ART: ART, I: I, aed: aed, img: img, url: url, pc: pc, prc: prc, siblings: siblings, twin: twin,
    add: add, addBundle: addBundle, open: open, close: close, toast: toast, bag: function () { return bag; }, BUNDLE_SAVE: BUNDLE_SAVE };
  renderBag();
  if (QS.get('bag') === 'open') open('bag');
  if (QS.get('as')) {
    document.body.setAttribute('data-page', QS.get('as'));
    $$('main [data-note]').forEach(function (el) { el.removeAttribute('data-note'); });
    window.PROTO_NOTES_OVERRIDE = { bag: +(QS.get('bagnote') || 1) };
  }
})();
