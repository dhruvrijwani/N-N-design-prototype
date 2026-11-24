/* Illustrations for the three print stories, drawn in SVG for the prototype from the print motifs
   (moon, aeroplane and clouds, cloud and stars). The print artwork from the client replaces them.
   Each story has its own palette and its own page layouts; the story text itself comes, unchanged,
   from stories.js. */
(function () {
  var uid = 0;
  function id(p) { return p + (++uid); }
  function n(v) { return Math.round(v * 10) / 10; }
  function svg(w, h, inner, par) { return '<svg viewBox="0 0 ' + w + ' ' + h + '" preserveAspectRatio="' + (par || 'xMidYMid slice') + '" aria-hidden="true">' + inner + '</svg>'; }
  function sky(w, h, a, b) { var g = id('sk'); return '<defs><linearGradient id="' + g + '" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="' + a + '"/><stop offset="1" stop-color="' + b + '"/></linearGradient></defs><rect width="' + w + '" height="' + h + '" fill="url(#' + g + ')"/>'; }
  function glow(x, y, r, c, o) { var g = id('gl'); return '<defs><radialGradient id="' + g + '"><stop offset="0" stop-color="' + c + '" stop-opacity="' + (o || .55) + '"/><stop offset="1" stop-color="' + c + '" stop-opacity="0"/></radialGradient></defs><circle cx="' + x + '" cy="' + y + '" r="' + r + '" fill="url(#' + g + ')"/>'; }

  // a four-point sparkle
  function star(x, y, r, c, cls) {
    var k = r * .2;
    var d = 'M' + n(x) + ' ' + n(y - r) + 'Q' + n(x + k) + ' ' + n(y - k) + ' ' + n(x + r) + ' ' + n(y) + 'Q' + n(x + k) + ' ' + n(y + k) + ' ' + n(x) + ' ' + n(y + r) + 'Q' + n(x - k) + ' ' + n(y + k) + ' ' + n(x - r) + ' ' + n(y) + 'Q' + n(x - k) + ' ' + n(y - k) + ' ' + n(x) + ' ' + n(y - r) + 'Z';
    return '<path class="' + (cls || 'tw') + '" style="animation-delay:-' + n(((x * 7 + y * 3) % 50) / 10) + 's" d="' + d + '" fill="' + c + '"/>';
  }
  // a star with a little face (the friendly star of the stories)
  function face(x, y, r, c, ink, sleep) {
    var e = r * .2, ey = y - r * .02;
    var eyes = sleep ? '<path d="M' + n(x - e * 1.6) + ' ' + n(ey) + 'q' + n(e * .7) + ' ' + n(e * .6) + ' ' + n(e * 1.4) + ' 0M' + n(x + e * .2) + ' ' + n(ey) + 'q' + n(e * .7) + ' ' + n(e * .6) + ' ' + n(e * 1.4) + ' 0" stroke="' + ink + '" stroke-width="' + n(r * .05) + '" fill="none" stroke-linecap="round"/>'
      : '<circle cx="' + n(x - e) + '" cy="' + n(ey) + '" r="' + n(r * .06) + '" fill="' + ink + '"/><circle cx="' + n(x + e) + '" cy="' + n(ey) + '" r="' + n(r * .06) + '" fill="' + ink + '"/>';
    return '<g>' + glow(x, y, r * 2.2, c, .45) + star(x, y, r, c, 'tw2') + eyes + '<path d="M' + n(x - e * .7) + ' ' + n(y + r * .14) + 'q' + n(e * .7) + ' ' + n(e * .6) + ' ' + n(e * 1.4) + ' 0" stroke="' + ink + '" stroke-width="' + n(r * .05) + '" fill="none" stroke-linecap="round"/></g>';
  }
  // a scatter of far stars, the same every time for a given seed
  function field(count, w, h, seed, c, big) {
    var s = seed, out = '';
    function r() { s = (s * 9301 + 49297) % 233280; return s / 233280; }
    for (var i = 0; i < count; i++) {
      var x = r() * w, y = r() * h, z = r();
      out += z > (big || .82) ? star(x, y, 6 + z * 10, c) : '<circle class="tw" style="animation-delay:-' + n(z * 4) + 's" cx="' + n(x) + '" cy="' + n(y) + '" r="' + n(1.2 + z * 2.2) + '" fill="' + c + '"/>';
    }
    return out;
  }
  function crescent(x, y, r, c) { return '<path d="M' + x + ' ' + (y - r) + 'A' + r + ' ' + r + ' 0 1 0 ' + x + ' ' + (y + r) + 'A' + n(r * 1.25) + ' ' + n(r * 1.25) + ' 0 0 1 ' + x + ' ' + (y - r) + 'Z" fill="' + c + '"/>'; }
  function moon(x, y, r, c, smile, ink) {
    var o = glow(x, y, r * 1.9, c, .35) + '<circle cx="' + x + '" cy="' + y + '" r="' + r + '" fill="' + c + '"/>' +
      '<circle cx="' + n(x - r * .35) + '" cy="' + n(y - r * .3) + '" r="' + n(r * .14) + '" fill="#000" opacity=".06"/><circle cx="' + n(x + r * .4) + '" cy="' + n(y + r * .35) + '" r="' + n(r * .1) + '" fill="#000" opacity=".06"/><circle cx="' + n(x + r * .2) + '" cy="' + n(y - r * .5) + '" r="' + n(r * .07) + '" fill="#000" opacity=".06"/>';
    if (smile) {
      var w = n(r * .05);
      o += '<path d="M' + n(x - r * .42) + ' ' + n(y - r * .08) + 'q' + n(r * .14) + ' ' + n(r * .12) + ' ' + n(r * .28) + ' 0M' + n(x + r * .14) + ' ' + n(y - r * .08) + 'q' + n(r * .14) + ' ' + n(r * .12) + ' ' + n(r * .28) + ' 0" stroke="' + ink + '" stroke-width="' + w + '" fill="none" stroke-linecap="round"/>' +
        '<path d="M' + n(x - r * .3) + ' ' + n(y + r * .22) + 'q' + n(r * .3) + ' ' + n(r * .26) + ' ' + n(r * .6) + ' 0" stroke="' + ink + '" stroke-width="' + w + '" fill="none" stroke-linecap="round"/>' +
        '<circle cx="' + n(x - r * .5) + '" cy="' + n(y + r * .18) + '" r="' + n(r * .1) + '" fill="#e9a99a" opacity=".5"/><circle cx="' + n(x + r * .5) + '" cy="' + n(y + r * .18) + '" r="' + n(r * .1) + '" fill="#e9a99a" opacity=".5"/>';
    }
    return o;
  }
  function cloud(x, y, w, c, cls) {
    var h = w * .42;
    return '<g' + (cls ? ' class="' + cls + '"' : '') + ' fill="' + c + '"><circle cx="' + n(x + w * .27) + '" cy="' + n(y + h * .62) + '" r="' + n(w * .19) + '"/><circle cx="' + n(x + w * .5) + '" cy="' + n(y + h * .42) + '" r="' + n(w * .26) + '"/><circle cx="' + n(x + w * .74) + '" cy="' + n(y + h * .64) + '" r="' + n(w * .18) + '"/><rect x="' + n(x + w * .08) + '" y="' + n(y + h * .62) + '" width="' + n(w * .84) + '" height="' + n(h * .45) + '" rx="' + n(h * .22) + '"/></g>';
  }
  function hills(w, h, y, c, c2) {
    return (c2 ? '<path d="M0 ' + (y - 40) + 'C' + w * .2 + ' ' + (y - 110) + ' ' + w * .4 + ' ' + (y - 20) + ' ' + w * .62 + ' ' + (y - 70) + 'S' + w * .9 + ' ' + (y - 60) + ' ' + w + ' ' + (y - 90) + 'V' + h + 'H0Z" fill="' + c2 + '"/>' : '') +
      '<path d="M0 ' + y + 'C' + w * .25 + ' ' + (y - 70) + ' ' + w * .5 + ' ' + (y - 60) + ' ' + w * .72 + ' ' + (y - 24) + 'S' + w * .95 + ' ' + (y - 34) + ' ' + w + ' ' + (y - 40) + 'V' + h + 'H0Z" fill="' + c + '"/>';
  }
  function arcs(x, y, s, c, dir) { // sound waves
    var o = '', d = dir || -1;
    for (var i = 1; i <= 3; i++) { var r = 14 * i * s; o += '<path d="M' + n(x + d * r * .5) + ' ' + n(y - r * .85) + 'A' + n(r) + ' ' + n(r) + ' 0 0 ' + (d < 0 ? 0 : 1) + ' ' + n(x + d * r * .5) + ' ' + n(y + r * .85) + '" fill="none" stroke="' + c + '" stroke-width="' + n(3 * s) + '" stroke-linecap="round" opacity="' + (1 - i * .22) + '"/>'; }
    return o;
  }
  function note(x, y, s, c) { return '<g fill="' + c + '" transform="translate(' + x + ' ' + y + ') scale(' + s + ')"><ellipse cx="0" cy="0" rx="7" ry="5.5" transform="rotate(-20)"/><rect x="5" y="-30" width="2.6" height="30"/><path d="M7.6 -30q10 4 8 14q-2-7-8-8z"/></g>'; }

  // the little elephant (and Mama and Papa, larger). x, y = where its feet touch the ground
  function elephant(x, y, s, o) {
    o = o || {};
    var c = o.c || '#d3cabd', c2 = o.c2 || '#bcb1a2', ink = o.ink || '#2f2b24', sx = o.flip ? -s : s;
    var trunks = {
      down: 'M30 78C18 92 16 120 26 134C30 140 40 138 38 130C32 118 34 100 46 90Z',
      up: 'M36 58C22 46 16 24 24 8C28 2 38 4 35 12C30 26 36 42 50 52Z',
      call: 'M30 66C14 60 4 44 8 30C10 23 19 24 18 31C18 42 26 51 42 55Z',
      curl: 'M30 80C14 86 10 104 22 112C30 117 38 110 33 104C27 108 22 102 26 96C30 90 38 90 46 88Z'
    };
    var leg = o.leg ? ' transform="rotate(38 84 118)"' : '';
    var eye = o.sleep ? '<path d="M44 64q6 5 12 0" stroke="' + ink + '" stroke-width="3" fill="none" stroke-linecap="round"/>' : '<circle cx="50" cy="62" r="4.6" fill="' + ink + '"/><circle cx="51.6" cy="60.4" r="1.4" fill="#fff"/>';
    return (o.cls ? '<g class="' + o.cls + '">' : '') + '<g transform="translate(' + x + ' ' + y + ') scale(' + sx + ' ' + s + ')' + (o.rot ? ' rotate(' + o.rot + ')' : '') + ' translate(-100 -160)">' +
      '<rect x="98" y="120" width="22" height="40" rx="10" fill="' + c2 + '"/><rect x="134" y="120" width="22" height="40" rx="10" fill="' + c2 + '"/>' +
      '<path d="M176 92q16 4 13 22" stroke="' + c2 + '" stroke-width="5" fill="none" stroke-linecap="round"/>' +
      '<ellipse cx="118" cy="98" rx="60" ry="42" fill="' + c + '"/>' +
      '<rect x="72" y="116" width="24" height="44" rx="11" fill="' + c + '"' + leg + '/><rect x="152" y="116" width="24" height="44" rx="11" fill="' + c + '"/>' +
      '<path d="' + trunks[o.trunk || 'down'] + '" fill="' + c + '"/>' +
      '<circle cx="62" cy="70" r="40" fill="' + c + '"/>' +
      '<ellipse cx="94" cy="72" rx="24" ry="30" fill="' + c2 + '"/><ellipse cx="96" cy="74" rx="14" ry="19" fill="#e9a99a" opacity=".35"/>' +
      eye + '<circle cx="42" cy="82" r="7" fill="#e9a99a" opacity=".45"/><path d="M52 90q6 4 12 0" stroke="' + ink + '" stroke-width="2.6" fill="none" stroke-linecap="round"/>' +
      (o.bow ? '<circle cx="70" cy="30" r="6" fill="' + o.bow + '"/>' : '') +
      '</g>' + (o.cls ? '</g>' : '');
  }
  function bunny(x, y, s, o) {
    o = o || {};
    var c = o.c || '#f4eee6', p = '#e9b8ac', ink = o.ink || '#2f2b24', sx = o.flip ? -s : s;
    return '<g transform="translate(' + x + ' ' + y + ') scale(' + sx + ' ' + s + ') translate(-40 -120)">' +
      '<ellipse cx="26" cy="30" rx="7" ry="24" fill="' + c + '" transform="rotate(-10 26 52)"/><ellipse cx="42" cy="28" rx="7" ry="24" fill="' + c + '" transform="rotate(12 42 50)"/>' +
      '<ellipse cx="26" cy="32" rx="3" ry="16" fill="' + p + '" transform="rotate(-10 26 52)"/><ellipse cx="42" cy="30" rx="3" ry="16" fill="' + p + '" transform="rotate(12 42 50)"/>' +
      '<ellipse cx="46" cy="96" rx="26" ry="22" fill="' + c + '"/><circle cx="70" cy="100" r="8" fill="#fff"/>' +
      '<circle cx="32" cy="64" r="20" fill="' + c + '"/>' +
      (o.sleep ? '<path d="M22 63q4 3 8 0" stroke="' + ink + '" stroke-width="2.2" fill="none" stroke-linecap="round"/>' : '<circle cx="26" cy="62" r="3" fill="' + ink + '"/>') +
      '<circle cx="14" cy="68" r="2.6" fill="' + p + '"/><circle cx="24" cy="72" r="4.5" fill="' + p + '" opacity=".5"/>' +
      '<ellipse cx="30" cy="114" rx="9" ry="5" fill="' + c + '"/>' +
      '</g>';
  }
  function teddy(x, y, s, o) {
    o = o || {};
    var c = o.c || '#b88d64', l = '#e3c7a5', ink = o.ink || '#2f2b24';
    var eyes = o.sleep ? '<path d="M35 41q5 4 10 0M55 41q5 4 10 0" stroke="' + ink + '" stroke-width="2.6" fill="none" stroke-linecap="round"/>'
      : o.wide ? '<circle cx="40" cy="39" r="7" fill="#fff"/><circle cx="60" cy="39" r="7" fill="#fff"/><circle cx="41" cy="40" r="3.6" fill="' + ink + '"/><circle cx="59" cy="40" r="3.6" fill="' + ink + '"/>'
      : '<circle cx="40" cy="40" r="3.6" fill="' + ink + '"/><circle cx="60" cy="40" r="3.6" fill="' + ink + '"/>';
    var arms = o.up ? '<ellipse cx="18" cy="66" rx="9" ry="17" fill="' + c + '" transform="rotate(-30 18 66)"/><ellipse cx="82" cy="66" rx="9" ry="17" fill="' + c + '" transform="rotate(30 82 66)"/>'
      : '<ellipse cx="22" cy="88" rx="9" ry="15" fill="' + c + '" transform="rotate(20 22 88)"/><ellipse cx="78" cy="88" rx="9" ry="15" fill="' + c + '" transform="rotate(-20 78 88)"/>';
    return '<g transform="translate(' + x + ' ' + y + ') scale(' + s + ')' + (o.rot ? ' rotate(' + o.rot + ')' : '') + ' translate(-50 -120)">' +
      (o.head ? '' : '<ellipse cx="50" cy="94" rx="30" ry="26" fill="' + c + '"/><ellipse cx="50" cy="98" rx="16" ry="14" fill="' + l + '"/>' + arms + '<ellipse cx="34" cy="116" rx="11" ry="6" fill="' + l + '"/><ellipse cx="66" cy="116" rx="11" ry="6" fill="' + l + '"/>') +
      '<circle cx="26" cy="22" r="12" fill="' + c + '"/><circle cx="74" cy="22" r="12" fill="' + c + '"/><circle cx="26" cy="22" r="6" fill="' + l + '"/><circle cx="74" cy="22" r="6" fill="' + l + '"/>' +
      '<circle cx="50" cy="44" r="28" fill="' + c + '"/><ellipse cx="50" cy="54" rx="12" ry="9" fill="' + l + '"/><ellipse cx="50" cy="49" rx="5" ry="3.6" fill="' + ink + '"/>' +
      eyes + '<path d="M46 58q4 3 8 0" stroke="' + ink + '" stroke-width="2.2" fill="none" stroke-linecap="round"/>' +
      (o.stache ? cloud(27, 52, 46, '#fbf8f3') : '') +
      '</g>';
  }
  function bird(x, y, s, c, flip) {
    return '<g transform="translate(' + x + ' ' + y + ') scale(' + (flip ? -s : s) + ' ' + s + ')"><circle cx="0" cy="0" r="14" fill="' + c + '"/><circle cx="-10" cy="-12" r="9" fill="' + c + '"/><path d="M-19 -13l-8 3 8 2z" fill="#e0a04e"/><circle cx="-12" cy="-14" r="1.8" fill="#2f2b24"/><ellipse cx="4" cy="0" rx="9" ry="6" fill="#000" opacity=".1"/><path d="M12 -4l10-6-2 10z" fill="' + c + '"/></g>';
  }
  // Teddy's little aeroplane, facing right; who: 'teddy', 'both'
  function plane(x, y, s, o) {
    o = o || {};
    var c = o.c || '#e0c16e', c2 = o.c2 || '#c9a54f', cr = '#f8f2eb';
    var crew = '';
    if (o.who === 'both') crew += '<g transform="translate(64 58) scale(.42)">' + bunny(0, 0, 1, {}).replace(/^<g transform="[^"]+"/, '<g transform="translate(-40 -120)"') + '</g>';
    if (o.who) crew += '<g transform="translate(118 62) scale(.5)">' + teddy(0, 0, 1, { head: true, stache: o.stache }).replace(/^<g transform="[^"]+"/, '<g transform="translate(-50 -120)"') + '</g>';
    var puffs = o.puffy ? cloud(10, 22, 120, cr) + cloud(90, 18, 130, cr) + cloud(40, 54, 160, cr) : '';
    return (o.cls ? '<g class="' + o.cls + '">' : '') + '<g transform="translate(' + x + ' ' + y + ') scale(' + s + ')' + (o.rot ? ' rotate(' + o.rot + ')' : '') + ' translate(-110 -66)">' +
      crew +
      '<path d="M26 50L14 14h28l24 36z" fill="' + c2 + '"/>' +
      '<rect x="20" y="46" width="172" height="40" rx="20" fill="' + c + '"/><rect x="20" y="62" width="172" height="6" fill="' + c2 + '" opacity=".6"/>' +
      '<circle cx="160" cy="62" r="7" fill="' + cr + '"/><ellipse cx="108" cy="78" rx="58" ry="12" fill="' + c2 + '"/>' +
      '<circle cx="194" cy="66" r="10" fill="' + cr + '"/><ellipse class="prop" cx="204" cy="66" rx="4" ry="26" fill="' + cr + '" opacity=".85"/>' +
      puffs +
      '</g>' + (o.cls ? '</g>' : '');
  }
  function line(d, c, w, dash, cls) { return '<path' + (cls ? ' class="' + cls + '"' : '') + ' d="' + d + '" fill="none" stroke="' + c + '" stroke-width="' + w + '" stroke-linecap="round"' + (dash ? ' stroke-dasharray="' + dash + '"' : '') + '/>'; }
  function mapgrid(w, h, c) { // faint map lines for Dream Atlas
    var o = '';
    for (var i = 1; i < 6; i++) o += '<path d="M0 ' + n(h * i / 6) + 'Q' + w / 2 + ' ' + n(h * i / 6 - 40) + ' ' + w + ' ' + n(h * i / 6) + '" fill="none" stroke="' + c + '" stroke-width="1.2" opacity=".22"/>';
    for (var j = 1; j < 8; j++) o += '<path d="M' + n(w * j / 8) + ' 0Q' + n(w * j / 8 + (j - 4) * 18) + ' ' + h / 2 + ' ' + n(w * j / 8) + ' ' + h + '" fill="none" stroke="' + c + '" stroke-width="1.2" opacity=".22"/>';
    return o;
  }
  function compass(x, y, r, c) {
    return '<g fill="none" stroke="' + c + '" stroke-width="2" opacity=".75"><circle cx="' + x + '" cy="' + y + '" r="' + r + '"/><circle cx="' + x + '" cy="' + y + '" r="' + n(r * .82) + '" stroke-dasharray="2 8"/></g>' +
      '<path d="M' + x + ' ' + (y - r * .7) + 'L' + n(x + r * .12) + ' ' + y + 'L' + x + ' ' + n(y + r * .7) + 'L' + n(x - r * .12) + ' ' + y + 'Z" fill="' + c + '" opacity=".75"/><path d="M' + n(x - r * .7) + ' ' + y + 'L' + x + ' ' + n(y - r * .12) + 'L' + n(x + r * .7) + ' ' + y + 'L' + x + ' ' + n(y + r * .12) + 'Z" fill="' + c + '" opacity=".4"/>';
  }

  /* ---------------- Under One Moon: the sky comes closer ---------------- */
  var M = { a: '#26241c', b: '#4d4434', moon: '#e0c16e', st: '#f8f2eb', h1: '#3a3327', h2: '#2f2a21' };
  var W = 1600, H = 900;
  function mSky(cnt, seed) { return sky(W, H, M.a, M.b) + field(cnt, W, H * .7, seed, M.st); }
  var moonS = {
    open: function () { return svg(W, H, mSky(70, 3) + glow(800, 760, 520, M.moon, .3) + '<circle cx="800" cy="770" r="260" fill="' + M.moon + '"/>' + hills(W, H, 790, M.h2, M.h1) + elephant(980, 742, .55, { trunk: 'up', flip: true })); },
    pages: [
      { l: 'full', pos: 'tr', art: function () { return svg(W, H, mSky(40, 11) + crescent(300, 170, 70, M.moon) + hills(W, H, 820, M.h2, M.h1) + elephant(470, 760, 1.25, { flip: true }) + elephant(700, 770, .6, { flip: true, trunk: 'up' })); } },
      { l: 'split', big: [1], art: function () { return svg(800, 900, sky(800, 900, M.a, M.b) + field(26, 800, 380, 5, M.st) + hills(800, 900, 860, M.h2) + elephant(400, 830, 1.9, { flip: true, trunk: 'up' }) + elephant(470, 592, .78, { flip: true, trunk: 'up' })); } },
      { l: 'split', flip: true, art: function () { return svg(800, 900, sky(800, 900, M.a, M.b) + crescent(560, 120, 60, M.moon) + field(18, 800, 300, 21, M.st) + hills(800, 900, 860, M.h2) + elephant(400, 830, 1.9, { flip: true, rot: -5 }) + elephant(456, 592, .78, { flip: true, trunk: 'up', rot: 8 })); } },
      { l: 'circle', art: function () { return svg(600, 600, sky(600, 600, M.a, M.b) + field(16, 600, 260, 8, M.st) + hills(600, 600, 560, M.h2) + elephant(220, 540, 1.6, { flip: true, trunk: 'curl' }) + elephant(410, 548, .8) + '<path d="M334 330q8-12 16 0q8-12 16 0q0 14-16 22q-16-8-16-22z" fill="#e9a99a" opacity=".8"/>'); } },
      { l: 'full', pos: 'tl', mid: [3], art: function () { return svg(W, H, mSky(50, 41) + hills(W, H, 820, M.h2, M.h1) + elephant(1100, 760, 1, { flip: true, trunk: 'call' }) + arcs(1206, 628, 2.2, M.st, 1)); } },
      { l: 'tri', art: function () {
        var b = function (inner) { return svg(400, 400, sky(400, 400, M.a, M.b) + field(10, 400, 200, inner.length, M.st) + hills(400, 400, 380, M.h2) + inner); };
        return [b(elephant(200, 350, 1.1, { flip: true, trunk: 'call' }) + arcs(306, 207, 1.2, M.st, 1)), b(elephant(200, 300, 1.1, { flip: true, trunk: 'up' }) + '<ellipse cx="200" cy="362" rx="70" ry="8" fill="#000" opacity=".2"/>'), b(elephant(200, 350, 1.1, { flip: true, trunk: 'up', leg: true, rot: -4 }))];
      } },
      { l: 'type', art: function () { return svg(900, 260, star(150, 130, 14, M.st) + star(450, 130, 34, M.st) + glow(760, 130, 130, M.moon, .5) + star(760, 130, 60, M.moon, 'tw2'), 'xMidYMid meet'); } },
      { l: 'type', big: [3], art: function () { return svg(1200, 300, line('M60 60C320 40 520 260 800 200S1080 120 1140 240', M.st, 4, '2 14') + face(1120, 230, 46, M.moon, M.a), 'xMidYMid meet'); } },
      { l: 'split', mid: [1], art: function () { return svg(800, 900, sky(800, 900, M.a, M.b) + field(14, 800, 320, 77, M.st) + hills(800, 900, 860, M.h2) + elephant(480, 820, 1.7, { trunk: 'up' }) + face(361, 512, 40, M.moon, M.a)); } },
      { l: 'full', pos: 'bl', art: function () {
        var ring = ''; for (var i = 0; i < 10; i++) { var a = i / 10 * Math.PI * 2; ring += star(1060 + Math.cos(a) * 250, 520 + Math.sin(a) * 170, 12 + (i % 3) * 8, i % 2 ? M.moon : M.st); }
        return svg(W, H, sky(W, H, M.a, M.b) + field(90, W, H * .7, 17, M.st, .7) + moon(1320, 170, 220, M.moon) + hills(W, H, 840, M.h2) + elephant(1060, 790, 1, { trunk: 'up', flip: true }) + ring);
      } },
      { l: 'spread', art: function () {
        var ring = ''; for (var i = 0; i < 14; i++) { var a = i / 14 * Math.PI * 2; ring += star(800 + Math.cos(a) * 300, 460 + Math.sin(a) * 260, 10 + (i % 4) * 6, i % 3 ? M.st : M.moon); }
        return svg(W, H, sky(W, H, M.a, M.b) + field(60, W, H, 29, M.st, .75) + crescent(1380, 150, 80, M.moon) + elephant(800, 640, 1.1, { trunk: 'up', rot: -10, cls: 'twirl' }) + '<g class="spin">' + ring + '</g>' + face(640, 300, 30, M.moon, M.a));
      } },
      { l: 'full', pos: 't', last: true, art: function () { return svg(W, H, mSky(40, 9) + moon(1260, 190, 110, M.moon) + hills(W, H, 830, M.h2, M.h1) + elephant(600, 790, 1.3, { sleep: true, flip: true }) + elephant(1040, 790, 1.3, { sleep: true }) + elephant(820, 800, .62, { sleep: true, trunk: 'curl' }) + face(764, 700, 16, M.moon, M.a, true)); } }
    ]
  };

  /* ---------------- Dream Atlas: a journey drawn like a map ---------------- */
  var A = { a: '#7e9e9f', b: '#a7c0bf', cl: '#f8f2eb', ink: '#262729', st: '#fdf6e3', moon: '#f3dfa2', h: '#6c8c8d' };
  function aSky(w, h) { return sky(w, h, A.a, A.b) + mapgrid(w, h, A.cl); }
  var atlas = {
    open: function () { return svg(W, H, aSky(W, H) + field(30, W, H * .6, 4, A.st) + compass(800, 450, 300, A.cl) + line('M180 700C420 520 520 860 800 760S1240 300 1400 200', A.ink, 3, '4 14') + plane(1400, 200, .9, { who: 'both', rot: -14 }) + cloud(140, 160, 260, A.cl) + cloud(1220, 640, 300, A.cl)); },
    pages: [
      { l: 'split', art: function () { return svg(800, 900, aSky(800, 900) + field(12, 800, 300, 3, A.st) + hills(800, 900, 860, A.h) + elephant(250, 820, 1.25, { trunk: 'call', flip: true }) + bunny(560, 820, 1.25, {}) + teddy(680, 822, 1.1, {}) + face(250, 300, 30, A.moon, A.ink)); } },
      { l: 'split', flip: true, mid: [2], art: function () { return svg(800, 900, aSky(800, 900) + field(14, 800, 260, 13, A.st) + hills(800, 900, 860, A.h) + plane(420, 680, 1.5, {}) + teddy(200, 830, 1.3, { up: true }) + bunny(660, 836, .9, { flip: true })); } },
      { l: 'full', pos: 'tl', big: [0], art: function () { return svg(W, H, aSky(W, H) + field(40, W, H * .7, 31, A.st) + moon(1380, 160, 110, A.moon) + line('M120 860C420 800 660 640 900 470', A.ink, 3, '4 14') + plane(1000, 410, 1.4, { who: 'both', rot: -18, cls: 'bob' }) + cloud(760, 120, 220, A.cl) + cloud(420, 690, 300, A.cl) + cloud(1200, 560, 260, A.cl)); } },
      { l: 'full', pos: 'r', art: function () { return svg(W, H, aSky(W, H) + field(60, W, H, 7, A.st, .7) + crescent(560, 430, 330, A.moon) + bunny(470, 150, 1.1, { flip: true }) + line('M520 120L740 40', '#8a6d4a', 5) + line('M740 40C760 220 720 420 760 640', A.ink, 2, '3 8') + star(760, 660, 18, A.st) + bird(300, 760, 1.6, '#e7a96b') + note(220, 690, 1.3, A.ink) + note(170, 630, 1, A.ink)); } },
      { l: 'circle', big: [1], art: function () { return svg(600, 600, aSky(600, 600) + cloud(400, 70, 200, A.cl) + teddy(300, 600, 2.7, { stache: true })); } },
      { l: 'split', flip: true, big: [1], art: function () { return svg(800, 900, aSky(800, 900) + field(10, 800, 300, 19, A.st) + plane(400, 470, 2.2, { who: 'teddy', puffy: true, stache: true, cls: 'bob' }) + bunny(170, 840, 1.1, {})); } },
      { l: 'fog', art: function () { return svg(W, H, aSky(W, H) + cloud(-120, 40, 700, A.cl) + cloud(520, -60, 760, A.cl) + cloud(1060, 120, 700, A.cl) + cloud(-200, 480, 760, A.cl) + cloud(1000, 520, 800, A.cl) + '<g opacity=".35">' + plane(800, 760, .6, { who: 'teddy' }) + '</g>' + cloud(420, 180, 760, A.cl)); } },
      { l: 'type', big: [3], art: function () { return svg(900, 300, cloud(40, 30, 440, A.cl) + cloud(420, 50, 420, A.cl) + face(470, 150, 34, A.moon, A.ink), 'xMidYMid meet'); } },
      { l: 'full', pos: 'tr', big: [3], art: function () { return svg(W, H, aSky(W, H) + field(30, W, H, 51, A.st) + crescent(330, 520, 260, A.moon) + bunny(260, 290, 1, { flip: true }) + line('M310 260L470 190', '#8a6d4a', 5) + line('M470 190C700 140 860 560 1100 650', A.ink, 3, '6 10') + face(1110, 655, 34, A.moon, A.ink) + cloud(1220, 620, 380, A.cl)); } },
      { l: 'full', pos: 't', art: function () { return svg(W, H, aSky(W, H) + field(20, W, 360, 27, A.st) + crescent(260, 780, 220, A.moon) + bunny(250, 590, .9, { flip: true }) + line('M290 560L380 520', '#8a6d4a', 5) + bird(400, 840, 1.3, '#e7a96b') + note(470, 780, 1.1, A.ink) + glow(860, 700, 320, A.moon, .35) + line('M380 520C640 820 980 560 1240 640', A.moon, 7) + face(1250, 640, 26, A.moon, A.ink) + cloud(1220, 470, 360, A.cl) + plane(980, 720, .8, { who: 'teddy', rot: -6 })); } },
      { l: 'type', big: [1, 2], burst: true, art: function () { return svg(1200, 320, cloud(80, 90, 420, A.cl) + cloud(680, 100, 440, A.cl) + plane(600, 170, 1.1, { who: 'teddy', rot: -10 }) + star(260, 60, 18, A.moon) + star(960, 50, 22, A.moon) + star(1100, 220, 14, A.moon), 'xMidYMid meet'); } },
      { l: 'circle', art: function () { return svg(600, 600, aSky(600, 600) + field(12, 600, 600, 61, A.st) + crescent(300, 560, 260, A.moon) + teddy(330, 420, 1.6, { up: true }) + bunny(250, 420, 1.4, {}) + '<path d="M286 230q8-12 16 0q8-12 16 0q0 14-16 22q-16-8-16-22z" fill="#e9a99a" opacity=".85"/>'); } },
      { l: 'full', pos: 'tr', art: function () { return svg(W, H, aSky(W, H) + field(40, W, H * .6, 71, A.st) + plane(860, 140, .5, { who: 'both', rot: -8 }) + face(560, 300, 34, A.moon, A.ink) + hills(W, H, 840, A.h, '#7a9a9b') + elephant(560, 790, 1, { trunk: 'up', flip: true }) + arcs(650, 610, 1.4, A.cl, 1)); } },
      { l: 'full', pos: 't', last: true, art: function () { return svg(W, H, aSky(W, H) + field(60, W, H * .8, 83, A.st) + moon(800, 470, 130, A.moon, true, A.ink) + line('M120 720C480 820 900 560 1200 640', A.ink, 3, '4 14') + plane(1240, 630, 1, { who: 'both', rot: -4 }) + bird(1420, 520, 1.2, '#e7a96b', true) + hills(W, H, 880, A.h) + elephant(220, 850, .6, { trunk: 'up', flip: true })); } }
    ]
  };

  /* ---------------- Hush Hush: a lullaby that grows darker and calmer ---------------- */
  // each page a little later in the evening
  var HS = ['#d8d7ce', '#d2cfc6', '#cbc5bd', '#c1b8b2', '#b6aaa6', '#a5979a', '#8e8290', '#776c7d', '#625a6d', '#4f4859', '#3d3846', '#2e2a35'];
  var Hc = { cl: '#f3efe8', cl2: '#e3ddd4', st: '#f1dca6', ink: '#2f2b24', taupe: '#b59c92' };
  function hSky(w, h, k) { return sky(w, h, HS[Math.max(0, k - 1)], HS[k]); }
  var hush = {
    open: function () { return svg(W, H, hSky(W, H, 1) + field(20, W, H * .5, 2, '#fff') + cloud(420, 380, 760, Hc.cl) + teddy(800, 520, 1.3, { sleep: true }) + face(1180, 200, 28, Hc.st, Hc.ink) + face(1290, 260, 20, Hc.st, Hc.ink)); },
    pages: [
      { l: 'full', pos: 'l', art: function () { return svg(W, H, hSky(W, H, 1) + moon(1260, 190, 90, Hc.st) + line('M700 760C820 520 1080 600 1120 380S1380 240 1480 300', Hc.ink, 3, '4 14') + plane(1000, 520, .9, { who: 'teddy', rot: -20 }) + cloud(820, 640, 300, Hc.cl) + cloud(1300, 560, 220, Hc.cl) + star(1440, 420, 14, Hc.st) + star(900, 260, 18, Hc.st)); } },
      { l: 'circle', art: function () { return svg(600, 600, hSky(600, 600, 2) + '<rect x="70" y="360" width="460" height="150" rx="20" fill="' + Hc.taupe + '"/><rect x="90" y="340" width="420" height="90" rx="40" fill="' + Hc.cl + '"/><ellipse cx="190" cy="350" rx="80" ry="34" fill="#fff"/>' + teddy(300, 440, 2, { wide: true }) + '<rect x="70" y="390" width="460" height="120" rx="14" fill="' + Hc.cl2 + '"/>'); } },
      { l: 'split', mid: [2, 3], art: function () { return svg(800, 900, hSky(800, 900, 3) + cloud(20, 560, 760, Hc.cl2) + teddy(400, 640, 2.4, { sleep: true, up: true }) + arcs(300, 430, 1.6, Hc.ink, -1) + arcs(500, 430, 1.6, Hc.ink, 1)); } },
      { l: 'type', art: function () { return svg(600, 280, teddy(300, 270, 1.9, {}) + cloud(380, 40, 130, Hc.cl), 'xMidYMid meet'); } },
      { l: 'split', flip: true, big: [3], art: function () { return svg(800, 900, hSky(800, 900, 5) + cloud(70, 640, 180, Hc.cl, 'grow g1') + cloud(250, 560, 260, Hc.cl, 'grow g2') + cloud(420, 420, 360, Hc.cl, 'grow g3') + face(620, 200, 22, Hc.st, Hc.ink)); } },
      { l: 'full', pos: 't', art: function () { return svg(W, H, hSky(W, H, 6) + field(30, W, H * .5, 23, '#fff') + cloud(300, 470, 1000, Hc.cl, 'sway') + teddy(800, 690, 1.4, {}) + '<ellipse cx="800" cy="730" rx="200" ry="40" fill="' + Hc.cl + '"/>'); } },
      { l: 'split', big: [], art: function () { return svg(800, 900, hSky(800, 900, 7) + field(20, 800, 400, 31, '#fff') + cloud(40, 560, 720, Hc.cl) + teddy(420, 660, 1.6, { wide: true }) + face(250, 330, 34, Hc.st, Hc.ink) + face(560, 300, 28, Hc.st, Hc.ink)); } },
      { l: 'verse', art: function () { return svg(W, 200, field(26, W, 200, 37, Hc.st) + line('M0 150C200 110 400 190 600 150S1000 110 1200 150S1500 180 1600 150', Hc.cl, 2, '', '') + line('M0 175C220 140 420 210 640 175S1040 140 1240 175S1520 200 1600 175', Hc.cl, 1.5, '3 9', ''), 'xMidYMid slice'); } },
      { l: 'sway', art: function () { return svg(W, H, hSky(W, H, 9) + field(40, W, H * .6, 47, Hc.st) + '<g class="sway">' + cloud(380, 420, 840, Hc.cl) + teddy(800, 610, 1.3, { sleep: true }) + '</g>'); } },
      { l: 'split', flip: true, art: function () { return svg(800, 900, hSky(800, 900, 10) + field(20, 800, 500, 53, Hc.st) + cloud(20, 520, 760, Hc.cl) + teddy(400, 620, 1.7, { sleep: true }) + face(560, 260, 28, Hc.st, Hc.ink)); } },
      { l: 'full', pos: 'tl', art: function () { return svg(W, H, hSky(W, H, 11) + field(50, W, H * .7, 59, Hc.st) + cloud(560, 470, 760, Hc.cl2) + teddy(940, 650, 1.2, { sleep: true }) + face(1240, 300, 30, Hc.st, Hc.ink) + face(1360, 380, 24, Hc.st, Hc.ink, true) + '<circle cx="1060" cy="540" r="10" fill="' + Hc.cl + '" opacity=".7"/><circle cx="1100" cy="500" r="16" fill="' + Hc.cl + '" opacity=".7"/><circle cx="1180" cy="420" r="70" fill="' + Hc.cl + '" opacity=".25"/>' + plane(1180, 420, .35, { who: 'teddy' })); } },
      { l: 'end', last: true, art: function () { return svg(W, H, sky(W, H, '#2e2a35', '#23202a') + field(40, W, H, 67, Hc.st, .9) + face(800, 330, 30, Hc.st, Hc.ink, true)); } }
    ]
  };

  window.STORY_ART = {
    moon: { scenes: moonS, fg: '#f8f2eb', bg: M.a, theme: 'night', next: atlas.open },
    atlas: { scenes: atlas, fg: A.ink, bg: A.a, theme: 'day', next: hush.open },
    hush: { scenes: hush, fg: A.ink, bg: HS[0], theme: 'dusk', shades: HS },
    open: { moon: moonS.open, atlas: atlas.open, hush: hush.open }
  };
})();
