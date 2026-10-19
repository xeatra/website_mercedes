/* =====================================================================
   CORE — helpers, header, footer, shared components.
   Partials map 1:1 to CakePHP elements (header, footer, card-stock,
   card-model, card-offer, lead-form).
   ===================================================================== */
(function () {
  const SP = window.SP;
  const store = { get(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }, set(k, v) { try { localStorage.setItem(k, v); } catch (e) { } } };
  SP.store = store;
  const qs = new URLSearchParams(location.search);
  SP.lang = (qs.get('lang') || store.get('mb.lang') || 'ro') === 'en' ? 'en' : 'ro';
  SP.setLang = l => { SP.lang = l; store.set('mb.lang', l); SP.render(); };
  SP.t = k => { const v = SP.I18N[k]; return v ? v[SP.lang === 'en' ? 1 : 0] : k; };
  SP.L = v => (v && typeof v === 'object' && !Array.isArray(v) && ('ro' in v)) ? (v[SP.lang] || v.ro) : v;
  SP.param = k => new URLSearchParams(location.search).get(k);
  SP.esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  SP.nf = (n, d) => Number(n).toLocaleString(SP.lang === 'en' ? 'en-GB' : 'de-DE', { minimumFractionDigits: d || 0, maximumFractionDigits: d || 0 });
  SP.eur = n => n == null ? '—' : (SP.lang === 'en' ? '€' + SP.nf(n) : SP.nf(n) + ' €');
  SP.eur2 = n => n == null ? '—' : (SP.lang === 'en' ? '€' + SP.nf(n, 2) : SP.nf(n, 2) + ' €');
  SP.date = (iso, o) => new Date(iso + 'T12:00:00').toLocaleDateString(SP.lang === 'en' ? 'en-GB' : 'ro-RO', o || { day: 'numeric', month: 'long', year: 'numeric' });
  SP.dshort = iso => SP.date(iso, { day: '2-digit', month: '2-digit', year: 'numeric' });
  SP.ref = p => p + '-' + String(Math.floor(1000 + Math.random() * 8999));
  SP.monthly = (price, down, n, apr) => { const P = price * (1 - down), r = apr / 12; return P * r / (1 - Math.pow(1 + r, -n)); };
  SP.loc = id => SP.LOCATIONS.find(l => l.id === id);
  SP.car = id => SP.STOCK.find(v => v.id === id);
  SP.initials = n => n.split(' ').map(x => x[0]).join('').slice(0, 2);
  const t = SP.t, L = SP.L, esc = SP.esc;

  /* ---------- icons ---------- */
  const P = {
    arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>', arrowL: '<path d="M19 12H5M11 18l-6-6 6-6"/>', ext: '<path d="M7 17 17 7M9 7h8v8"/>', down: '<path d="m6 9 6 6 6-6"/>',
    menu: '<path d="M4 7h16M4 12h16M4 17h16"/>', x: '<path d="M18 6 6 18M6 6l12 12"/>', check: '<path d="M20 6 9 17l-5-5"/>',
    phone: '<path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2z"/>',
    pin: '<path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/>', clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    mail: '<rect x="3" y="5" width="18" height="14" rx="1"/><path d="m3 7 9 6 9-6"/>', search: '<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>',
    list: '<path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01"/>', grid: '<rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/>',
    sliders: '<path d="M4 6h10M18 6h2M4 12h4M12 12h8M4 18h12M20 18h0"/><circle cx="16" cy="6" r="2"/><circle cx="10" cy="12" r="2"/><circle cx="18" cy="18" r="2"/>',
    shield: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/><path d="m9 12 2 2 4-4"/>', calendar: '<rect x="3" y="4" width="18" height="17"/><path d="M8 2v4M16 2v4M3 10h18"/>',
    doc: '<path d="M14 3H6v18h12V9z"/><path d="M14 3v6h6M8 13h8M8 17h5"/>', camera: '<path d="M14.5 4h-5L7 7H4v13h16V7h-3z"/><circle cx="12" cy="13" r="3"/>',
    wa: '<path d="M3 21l1.7-5A9 9 0 1 1 8 19.4z"/>', wrench: '<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.8-3.8a6 6 0 0 1-7.9 7.9l-6.9 6.9a2.1 2.1 0 0 1-3-3l6.9-6.9a6 6 0 0 1 7.9-7.9z"/>',
    car: '<path d="M5 17h14M3 17v-4l2.2-5.2A2 2 0 0 1 7 6.5h10a2 2 0 0 1 1.8 1.3L21 13v4"/><circle cx="7" cy="17" r="2"/><circle cx="17" cy="17" r="2"/>', bolt: '<path d="M13 2 4 14h7l-1 8 9-12h-7z"/>',
    box: '<path d="m3 7 9-4 9 4v10l-9 4-9-4z"/><path d="m3 7 9 4 9-4M12 11v10"/>', bell: '<path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10 21a2 2 0 0 0 4 0"/>'
  };
  SP.icon = (n, c) => '<svg class="ic ' + (c || '') + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="square" stroke-linejoin="miter" aria-hidden="true">' + (P[n] || '') + '</svg>';
  const I = SP.icon;

  /* ---------- car side-profile illustrations (placeholders until DMS photos) ---------- */
  const SH = {
    sedan: { w: [95, 305], r: 29, b: 'M22 120C20 106 30 99 50 96L112 88C136 68 162 56 196 54L246 54C274 56 296 68 318 86L362 92C376 95 380 104 380 114L380 124C380 130 376 132 370 132L334 132A29 29 0 0 0 276 132L124 132A29 29 0 0 0 66 132L30 132C24 132 22 128 22 120Z', g: 'M124 88C146 72 166 62 196 61L244 61C266 62 284 72 300 85Z', p: 222 },
    hatch: { w: [100, 296], r: 29, b: 'M30 120C28 106 38 99 58 96L116 88C138 68 160 56 194 54L262 54C290 56 310 70 326 90L346 98C356 102 358 110 358 118L358 126C358 130 356 132 352 132L325 132A29 29 0 0 0 267 132L129 132A29 29 0 0 0 71 132L36 132C32 132 30 128 30 120Z', g: 'M128 88C148 72 166 62 194 61L258 61C282 62 300 74 314 90Z', p: 226 },
    estate: { w: [95, 305], r: 29, b: 'M22 120C20 106 30 99 50 96L112 88C136 68 162 56 196 54L330 54C346 56 358 72 368 92C378 96 380 104 380 114L380 124C380 130 376 132 370 132L334 132A29 29 0 0 0 276 132L124 132A29 29 0 0 0 66 132L30 132C24 132 22 128 22 120Z', g: 'M124 88C146 72 166 62 196 61L326 61C338 63 348 74 354 88Z', p: 230 },
    coupe: { w: [95, 305], r: 29, b: 'M22 120C20 106 30 99 50 96L116 88C140 70 166 60 200 58L236 58C272 60 304 76 330 90L364 94C376 97 380 104 380 114L380 124C380 130 376 132 370 132L334 132A29 29 0 0 0 276 132L124 132A29 29 0 0 0 66 132L30 132C24 132 22 128 22 120Z', g: 'M128 88C150 72 170 65 200 64L234 64C262 66 288 76 308 88Z', p: 0 },
    cabrio: { w: [95, 305], r: 29, b: 'M22 120C20 106 30 99 50 96L120 90L148 68L155 70L136 90L300 90L362 92C376 95 380 104 380 114L380 124C380 130 376 132 370 132L334 132A29 29 0 0 0 276 132L124 132A29 29 0 0 0 66 132L30 132C24 132 22 128 22 120Z', g: 'M196 90L198 74C198 70 202 68 206 68L216 68C220 68 222 71 222 75L222 90ZM250 90L252 74C252 70 256 68 260 68L270 68C274 68 276 71 276 75L276 90Z', p: 0 },
    suv: { w: [100, 300], r: 32, lift: 8, b: 'M24 112C22 96 30 88 50 84L108 78C128 54 150 38 186 36L314 36C334 38 350 54 362 76L372 82C380 86 382 96 382 108L382 124C382 130 378 132 372 132L332 132A32 32 0 0 0 268 132L132 132A32 32 0 0 0 68 132L32 132C26 132 24 128 24 120Z', g: 'M122 78C140 58 158 46 188 44L310 44C326 46 338 58 346 74Z', p: 236 },
    suvc: { w: [100, 300], r: 32, lift: 8, b: 'M24 112C22 96 30 88 50 84L108 78C128 56 152 42 190 40L252 40C290 42 326 60 352 80L372 84C380 87 382 96 382 108L382 124C382 130 378 132 372 132L332 132A32 32 0 0 0 268 132L132 132A32 32 0 0 0 68 132L32 132C26 132 24 128 24 120Z', g: 'M122 78C142 58 160 48 190 47L250 47C280 49 306 62 326 78Z', p: 230 },
    g: { w: [100, 300], r: 32, lift: 8, b: 'M30 116L30 92C30 86 34 84 40 84L104 82L120 40C121 37 123 36 126 36L330 36C334 36 336 38 336 42L340 82L366 84C372 85 374 88 374 94L374 124C374 130 370 132 364 132L332 132A32 32 0 0 0 268 132L132 132A32 32 0 0 0 68 132L38 132C32 132 30 128 30 122Z', g: 'M128 44L328 44L330 78L116 80Z', p: 222 },
    van: { w: [95, 305], r: 29, b: 'M22 118C20 104 26 98 40 94L76 86C98 56 118 40 150 36L366 34C374 34 378 38 378 46L378 124C378 130 374 132 368 132L334 132A29 29 0 0 0 276 132L124 132A29 29 0 0 0 66 132L30 132C24 132 22 128 22 118Z', g: 'M92 86C110 60 126 48 152 44L360 42L360 78Z', p: 182 },
    lcv: { w: [95, 305], r: 29, b: 'M22 118C20 104 26 98 40 94L76 86C98 56 118 40 150 36L366 34C374 34 378 38 378 46L378 124C378 130 374 132 368 132L334 132A29 29 0 0 0 276 132L124 132A29 29 0 0 0 66 132L30 132C24 132 22 128 22 118Z', g: 'M92 86C110 60 126 48 152 44L178 44L178 82Z', p: 0 }
  };
  let gid = 0;
  SP.carSvg = (shape, hex, cls) => {
    const s = SH[shape] || SH.sedan, id = 'cg' + (++gid), dark = parseInt((hex || '#888').slice(1, 3), 16) < 90;
    const wheel = x => '<g transform="translate(' + x + ' 132)"><circle r="' + (s.r - 6) + '" fill="#141414"/><circle r="' + (s.r - 15) + '" fill="#9a9da1"/><circle r="' + (s.r - 15) + '" fill="none" stroke="#6d7074" stroke-width="2" stroke-dasharray="3 4"/><circle r="4" fill="#2b2b2b"/></g>';
    return '<svg class="carsvg ' + (cls || '') + '" viewBox="0 0 400 170" role="img" aria-hidden="true"><defs><linearGradient id="' + id + '" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff" stop-opacity=".38"/><stop offset=".45" stop-color="#fff" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".28"/></linearGradient></defs>' +
      '<ellipse cx="200" cy="158" rx="178" ry="8" fill="#000" opacity=".16"/>' +
      '<g transform="translate(0 -' + (s.lift || 0) + ')"><path d="' + s.b + '" fill="' + hex + '"/><path d="' + s.b + '" fill="url(#' + id + ')"/>' +
      '<path d="' + s.g + '" fill="' + (dark ? '#4a535d' : '#2a3038') + '" opacity=".92"/>' + (s.p ? '<path d="M' + s.p + ' 46V' + (s.lift ? 78 : 88) + '" stroke="' + hex + '" stroke-width="5"/>' : '') +
      '<path d="M40 104h14" stroke="#eef3f6" stroke-width="5" stroke-linecap="round"/><path d="M' + (shape === 'hatch' ? 350 : 372) + ' 102v8" stroke="#b3121b" stroke-width="5" stroke-linecap="round"/></g>' +
      wheel(s.w[0]) + wheel(s.w[1]) + '</svg>';
  };
  SP.vehShape = v => v.type === 'lcv' ? 'lcv' : (/coupe/.test(v.fam) && v.body === 'suv') ? 'suvc' : v.shape;

  /* ---------- brand mark / wordmark ---------- */
  SP.wordmark = (inv) => '<span class="wm' + (inv ? ' wm--inv' : '') + '"><span class="wm__s">S</span><span class="wm__t"><strong>SALES PARTNER</strong><small>' + L(SP.DEALER.sub) + '</small></span></span>';
  const brandLbl = b => b === 'amg' ? 'Mercedes-AMG' : b === 'maybach' ? 'Mercedes-Maybach' : 'Mercedes-Benz';
  SP.brandLbl = brandLbl;

  /* ---------- header ---------- */
  const NAV = [['models', 'modele.html'], ['stock', 'stoc.html'], ['offers', 'oferte.html'], ['service', 'service.html'], ['parts', 'piese.html'], ['locations', 'locatii.html']];
  const ACT = { home: '', models: 'models', stock: 'stock', vehicle: 'stock', offers: 'offers', service: 'service', parts: 'parts', locations: 'locations', location: 'locations' };
  const langSw = () => '<span class="lang"><button type="button" data-lang="ro" class="' + (SP.lang === 'ro' ? 'is-on' : '') + '">RO</button><button type="button" data-lang="en" class="' + (SP.lang === 'en' ? 'is-on' : '') + '">EN</button></span>';
  SP.header = page => {
    const a = ACT[page];
    return '<header class="hdr" id="hdr"><div class="wrap hdr__in"><a class="hdr__brand" href="index.html" aria-label="Sales Partner – home">' + SP.wordmark() + '</a>' +
      '<nav class="nav" aria-label="Main">' + NAV.map(n => '<a href="' + n[1] + '"' + (a === n[0] ? ' class="is-on" aria-current="page"' : '') + '>' + t('nav.' + n[0]) + '</a>').join('') + '</nav>' +
      '<div class="hdr__r"><a class="hdr__tel" href="tel:' + SP.DEALER.phone.replace(/\s/g, '') + '">' + I('phone') + '<span>' + SP.DEALER.phone + '</span></a>' + langSw() +
      '<button class="burger" type="button" aria-label="' + t('nav.menu') + '" aria-expanded="false" data-burger>' + I('menu') + '</button></div></div>' +
      '<div class="mnav" id="mnav" hidden><div class="wrap">' + NAV.map(n => '<a href="' + n[1] + '"' + (a === n[0] ? ' class="is-on"' : '') + '>' + t('nav.' + n[0]) + '</a>').join('') +
      '<a href="tel:' + SP.DEALER.phone.replace(/\s/g, '') + '">' + I('phone') + SP.DEALER.phone + '</a></div></div></header>';
  };

  /* ---------- footer ---------- */
  SP.footer = () => {
    const col = (h, l) => '<div class="fcol"><h4>' + h + '</h4><ul>' + l.map(x => '<li><a href="' + x[1] + '">' + x[0] + '</a></li>').join('') + '</ul></div>';
    return '<footer class="ftr"><div class="wrap"><div class="ftr__grid"><div class="fcol fcol--brand">' + SP.wordmark(true) + '<p>' + t('ft.about') + '</p></div>' +
      col(t('ft.sales'), [[t('nav.models'), 'modele.html'], [t('nav.stock'), 'stoc.html'], [t('ft.newCars'), 'stoc.html?cond=new'], [t('ft.usedCars'), 'stoc.html?cond=used'], [t('nav.offers'), 'oferte.html']]) +
      col(t('ft.services'), [[t('nav.service'), 'service.html'], [t('nav.testdrive'), 'service.html?tip=td'], [t('nav.parts'), 'piese.html'], [t('nav.locations'), 'locatii.html']]) +
      '<div class="fcol"><h4>' + t('ft.nl') + '</h4><p>' + t('ft.nlP') + '</p><form class="nl" data-nl novalidate><label class="sr" for="nl">Email</label><input id="nl" type="email" placeholder="' + t('ft.nlPh') + '"><button type="submit">' + t('f.send') + '</button></form></div></div>' +
      '<div class="ftr__loc">' + SP.LOCATIONS.map(l => '<a href="locatie.html?id=' + l.id + '"><strong>' + l.city + '</strong><span>' + l.address + '</span><span>' + l.phone + '</span></a>').join('') + '</div>' +
      '<div class="ftr__bot"><p>© 2026 ' + SP.DEALER.legal.company + ' · ' + SP.DEALER.legal.reg + ' · ' + SP.DEALER.legal.cui + '</p><p class="ftr__links"><a href="legal.html?doc=termeni">' + t('ft.terms') + '</a><a href="legal.html?doc=confidentialitate">' + t('ft.privacy') + '</a><a href="legal.html?doc=cookies">' + t('ft.cookies') + '</a>' +
      '<a href="https://anpc.ro/ce-este-sal/" target="_blank" rel="noopener">ANPC SAL</a><a href="https://ec.europa.eu/consumers/odr" target="_blank" rel="noopener">SOL</a></p></div>' +
      '<p class="ftr__demo">' + t('ft.demo') + '</p></div></footer>';
  };

  /* ---------- shared components ---------- */
  SP.phead = (eyebrow, title, sub, dark, extra) => '<section class="phead' + (dark ? ' phead--dark' : '') + '"><div class="wrap"><p class="eyebrow">' + eyebrow + '</p><h1 class="h1">' + title + '</h1>' + (sub ? '<p class="phead__sub">' + sub + '</p>' : '') + (extra || '') + '</div></section>';
  SP.shead = (eyebrow, title, link) => '<div class="shead"><div>' + (eyebrow ? '<p class="eyebrow eyebrow--sm">' + eyebrow + '</p>' : '') + '<h2 class="h2">' + title + '</h2></div>' + (link ? '<a class="ulink" href="' + link[1] + '">' + link[0] + ' →</a>' : '') + '</div>';
  SP.condBadge = v => '<span class="badge' + (v.cond === 'new' ? ' badge--ink' : '') + '">' + L(SP.COND[v.cond]) + '</span>';
  SP.statusTxt = v => v.status === 'incoming' ? t('st.incoming') + ' ' + SP.date(v.eta, { day: 'numeric', month: 'long' }) : t('st.' + v.status);
  SP.statusTag = v => v.status === 'avail' ? '' : '<span class="stag stag--' + v.status + '">' + SP.statusTxt(v) + '</span>';
  SP.kmTxt = v => SP.nf(v.km) + ' km';
  SP.phImg = (k, w, h, cls, alt) => k && SP.PHOTOS[k] ? '<img class="' + (cls || 'stage__ph') + '" src="' + SP.ph(k, w, h) + '" alt="' + esc(alt || '') + '" loading="lazy" onerror="this.remove()">' : '';
  SP.stage = (v, cls) => '<div class="stage ' + (cls || '') + '">' + SP.carSvg(SP.vehShape(v), v.hex) + SP.phImg(v.photos[0], 800, 600, '', v.title) + '</div>';
  SP.credit = k => SP.PHOTOS[k] ? (SP.lang === 'en' ? 'Photo: ' : 'Foto: ') + '<a href="https://unsplash.com/photos/' + SP.PHOTOS[k][1] + '" target="_blank" rel="noopener">' + esc(SP.PHOTOS[k][2]) + '</a> / Unsplash' : '';
  SP.stockCard = v => '<article class="ccard"><a class="ccard__img" href="vehicul.html?id=' + v.id + '">' + SP.condBadge(v) + SP.statusTag(v) + SP.stage(v) + '</a>' +
    '<div class="ccard__b"><h3><a href="vehicul.html?id=' + v.id + '">' + (v.brand === 'mb' ? 'Mercedes-Benz ' : '') + esc(v.title) + '</a></h3><p class="muted">' + L(SP.FUEL[v.fuel]) + ' · ' + (v.km ? SP.kmTxt(v) : t('c.new')) + ' · ' + v.year + '</p>' +
    '<div class="ccard__f"><span class="price">' + (v.was ? '<s>' + SP.eur(v.was) + '</s>' : '') + '<strong>' + SP.eur(v.price) + '</strong></span><a class="ulink ulink--sm" href="vehicul.html?id=' + v.id + '">' + t('c.details') + ' →</a></div></div></article>';
  SP.advisorMini = (a, compact) => '<div class="adv' + (compact ? ' adv--c' : '') + '"><span class="av">' + SP.initials(a.name) + '</span><span><strong>' + a.name + '</strong><small>' + t('r.' + a.role) + '</small></span></div>';

  /* ---------- lead form → Sales Partner Lead Collector ---------- */
  let seq = 0;
  SP.field = (id, name, label, input, full) => '<div class="field' + (full ? ' field--full' : '') + '"><label for="' + id + '">' + label + '</label>' + input + '<span class="err" data-err="' + name + '"></span></div>';
  SP.leadForm = o => {
    o = o || {}; const id = 'lf' + (++seq), F = SP.field;
    return '<form class="lead" data-lead novalidate data-type="' + (o.type || 'offer') + '" data-ctx="' + esc(o.ctx || '') + '"><div class="fgrid">' +
      F(id + 'n', 'name', t('f.name') + ' *', '<input id="' + id + 'n" name="name" autocomplete="name" placeholder="' + t('f.namePh') + '">', true) +
      F(id + 'p', 'phone', t('f.phone') + ' *', '<input id="' + id + 'p" name="phone" type="tel" autocomplete="tel" placeholder="' + t('f.phonePh') + '">') +
      F(id + 'e', 'email', t('f.email') + ' *', '<input id="' + id + 'e" name="email" type="email" autocomplete="email" placeholder="' + t('f.emailPh') + '">') +
      (o.extra || '') +
      (o.message ? F(id + 'g', 'message', t('f.msg'), '<textarea id="' + id + 'g" name="message" rows="3"></textarea>', true) : '') +
      '</div><label class="check"><input type="checkbox" name="gdpr"><span>' + t('f.gdpr') + ' <a href="legal.html?doc=confidentialitate">' + t('f.privacy') + '</a>.</span></label><span class="err" data-err="gdpr"></span>' +
      '<button class="btn ' + (o.ghost ? 'btn--line' : 'btn--ink') + ' btn--block" type="submit">' + (o.submit || t('f.send')) + '</button></form>';
  };
  SP.validate = f => {
    const v = n => (f.elements[n] && f.elements[n].value || '').trim(), e = {};
    if (f.elements.name && v('name').length < 3) e.name = t('f.errName');
    if (f.elements.phone && !/^[+0-9 ()-]{9,}$/.test(v('phone'))) e.phone = t('f.errPhone');
    if (f.elements.email && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(v('email'))) e.email = t('f.errEmail');
    if (f.elements.gdpr && !f.elements.gdpr.checked) e.gdpr = t('f.errGdpr');
    f.querySelectorAll('[data-err]').forEach(x => { x.textContent = e[x.dataset.err] || ''; });
    f.querySelectorAll('input,select,textarea').forEach(x => x.toggleAttribute('aria-invalid', !!e[x.name]));
    const k = Object.keys(e)[0]; if (k && f.elements[k]) f.elements[k].focus();
    return !k;
  };
  SP.done = (title, text, ref) => '<div class="done" role="status"><span class="done__i">' + I('check') + '</span><h3>' + title + '</h3><p>' + text + ' <strong>' + ref + '</strong></p></div>';

  /* ---------- modal ---------- */
  SP.modal = (title, body, onBind) => {
    const el = document.createElement('div'); el.className = 'modal'; el.setAttribute('role', 'dialog'); el.setAttribute('aria-modal', 'true');
    el.innerHTML = '<div class="modal__p"><div class="modal__h"><h3>' + title + '</h3><button type="button" class="modal__x" aria-label="' + t('nav.close') + '">' + I('x') + '</button></div><div class="modal__b">' + body + '</div></div>';
    const close = () => { el.remove(); document.body.classList.remove('noscroll'); document.removeEventListener('keydown', key); };
    const key = e => { if (e.key === 'Escape') close(); };
    el.addEventListener('click', e => { if (e.target === el || e.target.closest('.modal__x')) close(); });
    document.addEventListener('keydown', key); document.body.appendChild(el); document.body.classList.add('noscroll');
    bindForms(el); if (onBind) onBind(el); const f = el.querySelector('input,select,button'); if (f) f.focus();
  };

  function bindForms(root) {
    root.querySelectorAll('form[data-lead]').forEach(f => f.addEventListener('submit', e => {
      e.preventDefault(); if (!SP.validate(f)) return;
      /* Integration point: POST /api/leads → Sales Partner Lead Collector (source=Website, type, context=stock ID / offer / part) */
      f.outerHTML = SP.done(t('f.ok'), t('f.okD'), '#' + SP.ref('WEB-2026'));
    }));
  }
  SP.bindForms = bindForms;

  function chrome() {
    document.querySelectorAll('.cookie,.demo-badge').forEach(e => e.remove());
    const b = document.createElement('a'); b.className = 'demo-badge'; b.href = 'https://salespartner.ro'; b.target = '_blank'; b.rel = 'noopener'; b.textContent = 'DEMO · Sales Partner'; document.body.appendChild(b);
    if (store.get('mb.cookies')) return;
    const c = document.createElement('div'); c.className = 'cookie';
    c.innerHTML = '<p>' + t('ck.text') + ' <a href="legal.html?doc=cookies">' + t('ck.more') + '</a></p><div><button class="btn btn--line btn--sm" data-ck="n">' + t('ck.nec') + '</button><button class="btn btn--ink btn--sm" data-ck="a">' + t('ck.ok') + '</button></div>';
    c.addEventListener('click', e => { const k = e.target.closest('[data-ck]'); if (k) { store.set('mb.cookies', k.dataset.ck); c.remove(); } });
    document.body.appendChild(c);
  }

  function bind() {
    document.querySelectorAll('[data-lang]').forEach(b => b.addEventListener('click', () => SP.setLang(b.dataset.lang)));
    const bg = document.querySelector('[data-burger]'), mn = document.getElementById('mnav');
    bg.addEventListener('click', () => { mn.hidden = !mn.hidden; bg.setAttribute('aria-expanded', String(!mn.hidden)); bg.innerHTML = I(mn.hidden ? 'menu' : 'x'); });
    document.querySelectorAll('[data-nl]').forEach(f => f.addEventListener('submit', e => { e.preventDefault(); const i = f.querySelector('input'); if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(i.value.trim())) { i.setAttribute('aria-invalid', ''); i.focus(); return; } f.outerHTML = '<p class="nl__ok">' + I('check') + t('ft.nlOk') + '</p>'; }));
    bindForms(document.getElementById('main'));
  }

  SP.render = function () {
    const page = document.body.dataset.page || 'home';
    document.documentElement.lang = SP.lang;
    document.getElementById('site-header').innerHTML = SP.header(page);
    document.getElementById('site-footer').innerHTML = SP.footer();
    const fn = SP.pages[page] || SP.pages.notfound, out = fn();
    document.getElementById('main').innerHTML = out.html;
    document.title = (out.title ? out.title + ' · ' : '') + 'Sales Partner · Mercedes-Benz (demo)';
    bind(); if (out.bind) out.bind(document.getElementById('main'));
    chrome();
    if (location.hash) { const el = document.getElementById(location.hash.slice(1)); if (el) setTimeout(() => el.scrollIntoView(), 50); }
  };
  document.addEventListener('DOMContentLoaded', SP.render);
})();
