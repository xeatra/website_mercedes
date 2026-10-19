/* =====================================================================
   PAGES — each returns { title, html, bind }.
   CakePHP: one controller action / template per page.
   ===================================================================== */
(function () {
  const SP = window.SP, t = SP.t, L = SP.L, esc = SP.esc, I = SP.icon;
  SP.pages = {};
  const FAM = { a: 'Clasa A', c: 'Clasa C', e: 'Clasa E', s: 'Clasa S', 'maybach-s': 'Mercedes-Maybach Clasa S', 'cla-electric': 'CLA', 'cla-sb': 'CLA Shooting Brake', 'c-estate': 'Clasa C T-Modell',
    'e-estate': 'Clasa E T-Modell', 'cle-coupe': 'CLE Coupé', 'cle-cabrio': 'CLE Cabriolet', 'amg-gt-4': 'AMG GT 4 uși', gla: 'GLA', 'glb-electric': 'GLB', glc: 'GLC', 'glc-coupe': 'GLC Coupé',
    'gle-coupe': 'GLE Coupé', gls: 'GLS', g: 'Clasa G', v: 'Clasa V', sprinter: 'Sprinter' };
  const famLbl = f => SP.lang === 'en' ? FAM[f].replace('Clasa ', '').replace(/^([A-Z])$/, '$1-Class').replace(/^([A-Z]) (.*)$/, '$1-Class $2').replace('4 uși', '4-Door') : FAM[f];
  const opt = (v, l, sel) => '<option value="' + esc(v) + '"' + (String(sel) === String(v) ? ' selected' : '') + '>' + l + '</option>';
  const PRICE_STEPS = [40000, 50000, 60000, 80000, 100000, 150000, 200000];
  const usedConds = ['cert', 'demo'];

  /* ================= HOME ================= */
  SP.pages.home = () => {
    const featured = SP.STOCK.filter(v => v.featured).slice(0, 4);
    const fams = Object.keys(FAM).filter(f => SP.STOCK.some(v => v.fam === f));
    const groups = SP.RANGE_GROUPS.filter(g => g[0] !== 'grand');
    const shapeOf = { sedan: 'sedan', suv: 'suv', estate: 'estate', hatch: 'hatch', coupe: 'coupe', cabrio: 'cabrio', van: 'van' };
    const promo = SP.OFFERS.find(o => o.id === 'tyres');
    return {
      title: '', html:
        '<section class="hero"><div class="wrap hero__in"><div class="hero__txt"><p class="eyebrow eyebrow--dim">' + t('h.eyebrow') + '</p><h1 class="hero__h">' + t('h.h1') + '</h1><p class="hero__p">' + t('h.p') + '</p>' +
        '<div class="btnrow"><a class="btn btn--white" href="stoc.html">' + t('h.cta1') + '</a><a class="btn btn--ghost" href="service.html?tip=td">' + t('h.cta2') + '</a></div>' +
        '<div class="stats"><div><strong>' + SP.DEALER.stats.stock + '</strong><span>' + t('h.s1') + '</span></div><div><strong>' + SP.DEALER.stats.locations + '</strong><span>' + t('h.s2') + '</span></div><div><strong>' + SP.DEALER.stats.reply + '</strong><span>' + t('h.s3') + '</span></div></div></div>' +
        '<div class="hero__img"><img src="assets/img/eqe2.webp" alt="Mercedes-Benz EQE" width="1184" height="1184"></div></div></section>' +
        '<section class="wrap"><form class="qsearch" id="qs"><div class="qsearch__tabs" role="tablist">' + [['all', t('c.all')], ['new', t('h.tabNew')], ['used', t('h.tabUsed')]].map((x, i) => '<button type="button" role="tab" data-cond="' + x[0] + '" class="' + (i ? '' : 'is-on') + '">' + x[1] + '</button>').join('') + '</div>' +
        '<div class="qsearch__row"><label><span>' + t('h.model') + '</span><select name="model">' + opt('', t('c.any')) + fams.map(f => opt(f, famLbl(f))).join('') + '</select></label>' +
        '<label><span>' + t('h.body') + '</span><select name="body">' + opt('', t('c.any')) + Object.keys(SP.BODY).map(b => opt(b, L(SP.BODY[b]))).join('') + '</select></label>' +
        '<label><span>' + t('h.fuel') + '</span><select name="fuel">' + opt('', t('c.any')) + Object.keys(SP.FUEL).map(b => opt(b, L(SP.FUEL[b]))).join('') + '</select></label>' +
        '<label><span>' + t('h.max') + '</span><select name="max">' + opt('', t('c.any')) + PRICE_STEPS.map(p => opt(p, SP.eur(p))).join('') + '</select></label>' +
        '<button class="btn btn--ink" type="submit">' + t('h.search') + ' ↗</button></div><input type="hidden" name="cond" value=""></form></section>' +
        '<section class="wrap sec">' + SP.shead(t('h.featE'), t('h.featH'), [t('h.featAll'), 'stoc.html']) + '<div class="grid4">' + featured.map(SP.stockCard).join('') + '</div></section>' +
        '<section class="wrap sec">' + SP.shead(t('h.rangeE'), t('h.rangeH'), [t('h.rangeAll'), 'modele.html']) + '<div class="tiles">' + groups.map(g => {
          const n = SP.RANGE.filter(m => m.g === g[0] || (g[0] === 'van' && m.g === 'grand')).length;
          return '<a class="tile" href="modele.html?tip=' + g[0] + '"><span class="tile__img">' + SP.carSvg(shapeOf[g[0]], '#2b2d30') + SP.phImg(SP.TILE_PHOTOS[g[0]], 480, 300, 'tile__ph', L(g[1])) + '</span><strong>' + L(g[1]) + '</strong><small>' + n + ' ' + t('h.models') + '</small></a>';
        }).join('') + '<a class="tile tile--all" href="modele.html"><strong>' + t('h.rangeAll') + ' →</strong><small>Mercedes-Benz · AMG · Maybach</small></a></div></section>' +
        '<section class="wrap sec"><div class="band"><div><p class="eyebrow eyebrow--dim">' + t('h.promoE') + '</p><h2 class="band__h">' + L(promo.title) + '</h2><p>' + L(promo.lead) + '</p></div><a class="btn btn--white" href="oferte.html">' + t('h.promoCta') + '</a></div></section>' +
        '<section class="wrap sec">' + SP.shead('', t('h.servH')) + '<div class="grid3">' + [['s1', 'stoc.html', 'car'], ['s2', 'oferte.html', 'doc'], ['s3', 'service.html', 'wrench']].map(s =>
          '<a class="scard" href="' + s[1] + '">' + I(s[2]) + '<h3>' + t('h.' + s[0] + 't') + '</h3><p>' + t('h.' + s[0] + 'p') + '</p><span class="ulink ulink--sm">' + t('h.' + s[0] + 'c') + ' →</span></a>').join('') + '</div></section>' +
        '<section class="wrap sec sec--last"><div class="cta"><h2>' + t('h.ctaH') + '</h2><p>' + t('h.ctaP') + '</p><button class="btn btn--ink" type="button" data-contact>' + t('h.ctaB') + '</button></div></section>',
      bind(m) {
        const f = m.querySelector('#qs');
        f.querySelectorAll('[data-cond]').forEach(b => b.addEventListener('click', () => { f.querySelectorAll('[data-cond]').forEach(x => x.classList.toggle('is-on', x === b)); f.cond.value = b.dataset.cond === 'all' ? '' : b.dataset.cond; }));
        f.addEventListener('submit', e => { e.preventDefault(); const p = new URLSearchParams(); ['cond', 'model', 'body', 'fuel', 'max'].forEach(k => { if (f[k].value) p.set(k, f[k].value); }); location.href = 'stoc.html' + (p.toString() ? '?' + p : ''); });
        m.querySelector('[data-contact]').addEventListener('click', () => SP.modal(t('h.ctaB'), SP.leadForm({ type: 'contact', ctx: 'home', message: true })));
      }
    };
  };

  /* ================= MODELE (wrapper of mercedes-benz.ro models listing) ================= */
  SP.pages.models = () => {
    const st = { onlyNew: false, brands: [], types: [], fuels: [], max: 0, sort: 'rec' };
    const tip = SP.param('tip'); if (tip) st.types = tip === 'van' ? ['van', 'grand'] : [tip];
    const maxP = 280000;
    const cb = (grp, v, l, n) => '<label class="cbx"><input type="checkbox" data-f="' + grp + '" value="' + v + '"' + (st[grp].includes(v) ? ' checked' : '') + '><span>' + l + '</span>' + (n != null ? '<em>' + n + '</em>' : '') + '</label>';
    const brandN = b => SP.RANGE.filter(m => m.brand === b).length;
    const side = '<div class="mside__h"><strong>' + t('m.filters') + '</strong><button type="button" class="ulink ulink--sm" data-mreset>' + t('c.reset') + '</button></div>' +
      '<label class="switch"><input type="checkbox" data-new><span class="switch__t"></span><span>' + t('m.onlyNew') + '</span></label>' +
      '<details open class="fgrp"><summary>' + t('m.brand') + I('down') + '</summary>' + [['mb', 'Mercedes-Benz'], ['amg', 'Mercedes-AMG'], ['maybach', 'Mercedes-Maybach']].map(b => cb('brands', b[0], b[1], brandN(b[0]))).join('') + '</details>' +
      '<details open class="fgrp"><summary>' + t('m.type') + I('down') + '</summary>' + SP.RANGE_GROUPS.map(g => cb('types', g[0], L(g[1]), SP.RANGE.filter(m => m.g === g[0]).length)).join('') + '</details>' +
      '<details open class="fgrp"><summary>' + t('m.fuel') + I('down') + '</summary>' + Object.keys(SP.FUEL).map(f => cb('fuels', f, L(SP.FUEL[f]), SP.RANGE.filter(m => m.fuels.includes(f)).length)).join('') + '</details>' +
      '<details open class="fgrp"><summary>' + t('m.price') + I('down') + '</summary><div class="range"><input type="range" min="40000" max="' + maxP + '" step="5000" value="' + maxP + '" data-max aria-label="' + t('m.price') + '"><p>' + t('m.upto') + ' <strong data-maxv>' + SP.eur(maxP) + '</strong></p></div></details>';
    const card = m => {
      const inStock = m.fam ? SP.STOCK.filter(v => v.fam === m.fam).length : 0;
      return '<article class="mcard"><a class="mcard__a" href="' + m.url + '" target="_blank" rel="noopener" aria-label="' + esc(m.name) + ' – ' + t('m.ext') + '">' +
        '<span class="mcard__top"><span class="mcard__brand mcard__brand--' + m.brand + '">' + SP.brandLbl(m.brand) + '</span>' + (m.isNew ? '<span class="mcard__new">' + (m.soon ? t('c.soon') : t('c.new')) + '</span>' : '') + '</span>' +
        '<span class="mcard__name">' + esc(m.name) + '</span><span class="mcard__chips">' + m.fuels.map(f => '<span>' + L(SP.FUEL[f]) + '</span>').join('') + '</span>' +
        '<span class="mcard__img">' + SP.carSvg(m.shape, m.brand === 'maybach' ? '#3b3640' : m.brand === 'amg' ? '#2a2c2f' : '#8f9398') + (m.img ? '<img src="' + m.img + '" alt="' + esc(m.name) + '" loading="lazy" referrerpolicy="no-referrer" onerror="this.remove()">' : '') + '</span>' +
        '<span class="mcard__price">' + (m.price ? '<small>' + t('c.from') + '</small><strong>' + SP.eur2(m.price) + '</strong>' : '<small>' + t('m.priceSoon') + '</small>') + '</span>' +
        '<span class="mcard__go">' + t('m.discover') + I('ext') + '</span></a>' +
        (inStock ? '<a class="mcard__stock" href="stoc.html?model=' + m.fam + '">' + inStock + ' ' + t('m.inStock') + ' →</a>' : '') + '</article>';
    };
    return {
      title: t('nav.models'), html: SP.phead(t('m.eyebrow'), t('m.title'), t('m.sub')) +
        '<section class="wrap mlay"><button class="btn btn--line btn--sm mfbtn" type="button" data-mtoggle>' + I('sliders') + t('m.filters') + '</button><aside class="mside" id="mside">' + side + '<button class="btn btn--ink btn--block mside__apply" type="button" data-mtoggle>' + t('m.apply') + '</button></aside>' +
        '<div class="mmain"><div class="mbar"><p><strong data-mcount></strong> ' + t('m.count') + '</p><label class="sel"><span class="sr">' + t('m.sort') + '</span><select data-msort>' + opt('rec', t('m.sRec')) + opt('asc', t('m.sAsc')) + opt('desc', t('m.sDesc')) + opt('name', t('m.sName')) + '</select></label></div>' +
        '<div data-mlist></div><p class="note">' + I('doc') + t('m.note') + '</p></div></section>',
      bind(m) {
        const list = m.querySelector('[data-mlist]'), side = m.querySelector('#mside');
        const draw = () => {
          let r = SP.RANGE.filter(x => (!st.onlyNew || x.isNew) && (!st.brands.length || st.brands.includes(x.brand)) && (!st.types.length || st.types.includes(x.g)) &&
            (!st.fuels.length || x.fuels.some(f => st.fuels.includes(f))) && (!st.max || x.price == null || x.price <= st.max));
          m.querySelector('[data-mcount]').textContent = r.length;
          const srt = { asc: (a, b) => (a.price || 1e9) - (b.price || 1e9), desc: (a, b) => (b.price || 0) - (a.price || 0), name: (a, b) => a.name.localeCompare(b.name) }[st.sort];
          if (!r.length) { list.innerHTML = '<p class="empty">' + t('m.none') + '</p>'; return; }
          if (srt) { list.innerHTML = '<div class="mgrid">' + r.slice().sort(srt).map(card).join('') + '</div>'; return; }
          list.innerHTML = SP.RANGE_GROUPS.map(g => { const items = r.filter(x => x.g === g[0]); return items.length ? '<section class="mgroup" id="g-' + g[0] + '"><h2 class="mgroup__h">' + L(g[1]) + ' <span>' + items.length + '</span></h2><div class="mgrid">' + items.map(card).join('') + '</div></section>' : ''; }).join('');
        };
        side.addEventListener('change', e => {
          const x = e.target;
          if (x.dataset.f) { const a = st[x.dataset.f]; if (x.checked) a.push(x.value); else a.splice(a.indexOf(x.value), 1); }
          if (x.hasAttribute('data-new')) st.onlyNew = x.checked;
          draw();
        });
        const rg = side.querySelector('[data-max]');
        rg.addEventListener('input', () => { st.max = +rg.value >= 280000 ? 0 : +rg.value; side.querySelector('[data-maxv]').textContent = SP.eur(+rg.value); draw(); });
        m.querySelector('[data-msort]').addEventListener('change', e => { st.sort = e.target.value; draw(); });
        m.querySelector('[data-mreset]').addEventListener('click', () => { st.onlyNew = false; st.brands = []; st.types = []; st.fuels = []; st.max = 0; side.querySelectorAll('input[type=checkbox]').forEach(c => c.checked = false); rg.value = 280000; side.querySelector('[data-maxv]').textContent = SP.eur(280000); draw(); });
        m.querySelectorAll('[data-mtoggle]').forEach(b => b.addEventListener('click', () => side.classList.toggle('is-open')));
        draw();
      }
    };
  };

  /* ================= STOCK ================= */
  SP.pages.stock = () => {
    const p = k => SP.param(k) || '';
    const st = { cond: p('cond') || 'all', q: '', model: p('model'), body: p('body'), fuel: p('fuel'), drive: '', loc: p('loc'), vtype: '', brand: '', max: +p('max') || 0, avail: false, sort: 'rec', view: 'list', page: 1 };
    try { st.view = SP.store.get('mb.view') || 'list'; } catch (e) { }
    const sel = (k, label, opts) => '<label class="fsel"><span>' + label + '</span><select data-s="' + k + '">' + opt('', t('c.any'), st[k]) + opts.map(o => opt(o[0], o[1], st[k])).join('') + '</select></label>';
    const fams = Object.keys(FAM).filter(f => SP.STOCK.some(v => v.fam === f));
    const rail = '<div class="rail__h"><strong>' + t('s.filters') + '</strong><button type="button" class="ulink ulink--sm" data-sreset>' + t('c.reset') + '</button></div>' +
      '<label class="fsearch">' + I('search') + '<input type="search" data-s="q" placeholder="' + t('s.search') + '" aria-label="' + t('s.search') + '"></label>' +
      sel('model', t('h.model'), fams.map(f => [f, famLbl(f)])) +
      sel('body', t('h.body'), Object.keys(SP.BODY).map(b => [b, L(SP.BODY[b])])) +
      sel('fuel', t('h.fuel'), Object.keys(SP.FUEL).map(b => [b, L(SP.FUEL[b])])) +
      sel('drive', t('s.drive'), [['awd', '4MATIC'], ['rwd', L(SP.DRIVE.rwd)], ['fwd', L(SP.DRIVE.fwd)]]) +
      sel('brand', t('s.brand'), [['mb', 'Mercedes-Benz'], ['amg', 'Mercedes-AMG'], ['maybach', 'Mercedes-Maybach']]) +
      sel('vtype', t('s.vtype'), [['pc', t('s.pc')], ['lcv', t('s.lcv')]]) +
      sel('loc', t('s.loc'), SP.LOCATIONS.map(l => [l.id, l.city])) +
      sel('max', t('h.max'), PRICE_STEPS.map(x => [x, SP.eur(x)])) +
      '<label class="cbx cbx--rail"><input type="checkbox" data-s="avail"><span>' + t('s.onlyAvail') + '</span></label>';
    const tabs = [['all', t('c.all')], ['new', t('h.tabNew')], ['cert', L(SP.COND.cert)], ['demo', L(SP.COND.demo)]];
    const item = v => {
      const a = SP.ADVISORS[v.adv], specs = [v.km ? SP.kmTxt(v) : '0 km', L(SP.FUEL[v.fuel]), t('v.auto'), v.hp + ' ' + t('c.hp'), L(SP.DRIVE[v.drive])];
      return '<article class="litem"><a class="litem__img" href="vehicul.html?id=' + v.id + '">' + SP.condBadge(v) + SP.stage(v) + '</a>' +
        '<div class="litem__b"><p class="eyebrow eyebrow--sm">' + L(SP.BODY[v.body]).toUpperCase() + ' · ' + v.year + '</p><h3><a href="vehicul.html?id=' + v.id + '">' + (v.brand === 'mb' ? 'Mercedes-Benz ' : '') + esc(v.title) + '</a></h3>' +
        '<p class="muted">' + esc(v.version) + ' · ' + SP.loc(v.loc).city + '</p><p class="dots">' + specs.map(s => '<span>' + s + '</span>').join('') + '</p>' + SP.statusTag(v).replace('stag', 'stag stag--inline') +
        '<p class="price price--lg">' + (v.was ? '<s>' + SP.eur(v.was) + '</s>' : '') + '<strong>' + SP.eur(v.price) + '</strong><small>' + t('c.vat') + '</small></p></div>' +
        '<div class="litem__adv">' + SP.advisorMini(a) + '<a class="btn btn--ink btn--sm btn--block" href="vehicul.html?id=' + v.id + '">' + t('c.details') + ' →</a><button type="button" class="btn btn--line btn--sm btn--block" data-contact="' + v.id + '">' + t('s.contact') + '</button></div></article>';
    };
    return {
      title: t('nav.stock'), html: SP.phead(t('s.eyebrow'), t('s.title'), t('s.sub'), true, '<div class="segs" role="tablist">' + tabs.map(x => '<button type="button" data-cond="' + x[0] + '">' + x[1] + '</button>').join('') + '</div>') +
        '<section class="wrap slay"><button class="btn btn--line btn--sm sfbtn" type="button" data-stoggle>' + I('sliders') + t('s.showFilters') + '</button><aside class="rail" id="rail">' + rail + '</aside>' +
        '<div class="smain"><div class="sbar"><p><strong data-scount></strong> ' + t('c.results') + '</p><div class="sbar__r"><span class="vsw"><button type="button" data-view="list" aria-label="' + t('s.list') + '">' + I('list') + '</button><button type="button" data-view="grid" aria-label="' + t('s.grid') + '">' + I('grid') + '</button></span>' +
        '<label class="sel"><span class="sr">' + t('s.sort') + '</span><select data-ssort>' + opt('rec', t('s.sRec')) + opt('pa', t('s.sPa')) + opt('pd', t('s.sPd')) + opt('y', t('s.sY')) + opt('k', t('s.sK')) + '</select></label></div></div>' +
        '<div data-slist></div><nav class="pager" data-pager aria-label="Pagination"></nav></div></section>',
      bind(m) {
        const list = m.querySelector('[data-slist]'), rail = m.querySelector('#rail'), PER = 8;
        const draw = () => {
          m.querySelectorAll('[data-cond]').forEach(b => { const on = b.dataset.cond === st.cond || (st.cond === 'used' && b.dataset.cond === 'cert'); b.classList.toggle('is-on', on); b.setAttribute('aria-selected', on); });
          m.querySelectorAll('[data-view]').forEach(b => b.classList.toggle('is-on', b.dataset.view === st.view));
          const q = st.q.toLowerCase();
          let r = SP.STOCK.filter(v => (st.cond === 'all' || v.cond === st.cond || (st.cond === 'used' && usedConds.includes(v.cond))) && (!st.model || v.fam === st.model) && (!st.body || v.body === st.body) && (!st.fuel || v.fuel === st.fuel) &&
            (!st.drive || v.drive === st.drive) && (!st.loc || v.loc === st.loc) && (!st.vtype || v.type === st.vtype) && (!st.brand || v.brand === st.brand) && (!st.max || v.price <= st.max) && (!st.avail || v.status === 'avail') &&
            (!q || (v.title + ' ' + v.version + ' ' + v.id).toLowerCase().includes(q)));
          const srt = { pa: (a, b) => a.price - b.price, pd: (a, b) => b.price - a.price, y: (a, b) => b.year - a.year, k: (a, b) => a.km - b.km }[st.sort];
          if (srt) r = r.slice().sort(srt);
          m.querySelector('[data-scount]').textContent = r.length;
          const pages = Math.max(1, Math.ceil(r.length / PER)); st.page = Math.min(st.page, pages);
          const items = r.slice((st.page - 1) * PER, st.page * PER);
          list.innerHTML = !r.length ? '<p class="empty">' + t('s.none') + '</p>' : st.view === 'grid' ? '<div class="grid3 grid3--stock">' + items.map(SP.stockCard).join('') + '</div>' : '<div class="llist">' + items.map(item).join('') + '</div>';
          const pg = m.querySelector('[data-pager]');
          pg.innerHTML = pages < 2 ? '' : '<button type="button" data-pg="' + (st.page - 1) + '"' + (st.page === 1 ? ' disabled' : '') + ' aria-label="prev">‹</button>' + Array.from({ length: pages }, (_, i) => '<button type="button" data-pg="' + (i + 1) + '" class="' + (i + 1 === st.page ? 'is-on' : '') + '">' + (i + 1) + '</button>').join('') + '<button type="button" data-pg="' + (st.page + 1) + '"' + (st.page === pages ? ' disabled' : '') + ' aria-label="next">›</button>';
        };
        rail.addEventListener('input', e => { const k = e.target.dataset.s; if (!k) return; st[k] = e.target.type === 'checkbox' ? e.target.checked : (k === 'max' ? +e.target.value : e.target.value); st.page = 1; draw(); });
        m.querySelector('[data-sreset]').addEventListener('click', () => { Object.assign(st, { q: '', model: '', body: '', fuel: '', drive: '', loc: '', vtype: '', brand: '', max: 0, avail: false, page: 1 }); rail.querySelectorAll('select').forEach(s => s.value = ''); rail.querySelector('[data-s=q]').value = ''; rail.querySelector('[data-s=avail]').checked = false; draw(); });
        m.querySelectorAll('[data-cond]').forEach(b => b.addEventListener('click', () => { st.cond = b.dataset.cond; st.page = 1; draw(); }));
        m.querySelectorAll('[data-view]').forEach(b => b.addEventListener('click', () => { st.view = b.dataset.view; SP.store.set('mb.view', st.view); draw(); }));
        m.querySelector('[data-ssort]').addEventListener('change', e => { st.sort = e.target.value; draw(); });
        m.querySelector('[data-pager]').addEventListener('click', e => { const b = e.target.closest('[data-pg]'); if (!b || b.disabled) return; st.page = +b.dataset.pg; draw(); m.querySelector('.slay').scrollIntoView({ behavior: 'smooth' }); });
        list.addEventListener('click', e => { const b = e.target.closest('[data-contact]'); if (!b) return; const v = SP.car(b.dataset.contact); SP.modal(t('s.contact') + ' · ' + esc(v.title), SP.leadForm({ type: 'stock', ctx: v.id, message: true })); });
        m.querySelector('[data-stoggle]').addEventListener('click', () => rail.classList.toggle('is-open'));
        draw();
      }
    };
  };

  /* ================= VEHICLE ================= */
  SP.pages.vehicle = () => {
    const v = SP.car(SP.param('id')) || SP.STOCK[0];
    const a = SP.ADVISORS[v.adv], loc = SP.loc(v.loc), fin = { down: 20, term: 48 }, APR = .069;
    const name = (v.brand === 'mb' ? 'Mercedes-Benz ' : '') + v.title;
    const specs = [[t('v.body'), L(SP.BODY[v.body])], [t('v.year'), v.year], [t('v.km'), SP.kmTxt(v)], [t('v.fuel'), L(SP.FUEL[v.fuel])], [t('v.gear'), t('v.auto')], [t('v.power'), v.hp + ' ' + t('c.hp') + ' / ' + Math.round(v.hp * .7355) + ' kW'],
      v.fuel === 'electric' ? [t('v.range'), v.range + ' km'] : [t('v.cc'), SP.nf(v.cc) + ' cm³'], [t('v.drive'), L(SP.DRIVE[v.drive])], [t('v.color'), L(v.color)], [t('v.cond'), L(SP.COND[v.cond])], [t('v.vin'), v.vin], [t('v.stockId'), v.id]];
    const eq = SP.equipment(v);
    const hist = v.cond === 'cert' ? ['v.h1', 'v.h2', 'v.h3'] : v.cond === 'demo' ? ['v.hd1', 'v.h2', 'v.hd2'] : ['v.hn1', 'v.hn2'];
    const histIc = ['doc', 'calendar', 'shield'];
    
    const sim = SP.STOCK.filter(x => x.id !== v.id && x.body === v.body).concat(SP.STOCK.filter(x => x.id !== v.id && x.body !== v.body)).slice(0, 3);
    const tdExtra = SP.field('tdd', 'date', t('b.day'), '<input id="tdd" name="date" type="date">');
    return {
      title: name, html:
        '<section class="wrap vd"><a class="back" href="stoc.html">' + I('arrowL') + t('v.back') + '</a>' +
        '<div class="vd__top"><div class="vd__gal"><div class="vd__main stage stage--light" data-stage>' + SP.condBadge(v) + SP.carSvg(SP.vehShape(v), v.hex) + SP.phImg(v.photos[0], 1400, 875, 'stage__ph', name).replace('loading="lazy"', 'data-main') + '<span class="vd__count">' + I('camera') + v.photos.length + '</span></div>' +
        (v.photos.length > 1 ? '<div class="vd__thumbs">' + v.photos.map((k, i) => '<button type="button" class="stage' + (i ? '' : ' is-on') + '" data-ph="' + k + '" aria-label="' + (i + 1) + '">' + SP.carSvg(SP.vehShape(v), v.hex) + SP.phImg(k, 360, 225) + '</button>').join('') + '</div>' : '') +
        '<p class="vd__credit" data-credit>' + SP.credit(v.photos[0]) + '</p><p class="note note--sm">' + I('camera') + t('v.photos') + '</p></div>' +
        '<div class="vd__side"><p class="eyebrow eyebrow--sm">' + L(SP.BODY[v.body]).toUpperCase() + ' · ' + v.year + '</p><h1 class="vd__h">' + esc(name) + '</h1><p class="muted">' + esc(v.version) + ' · ' + L(SP.FUEL[v.fuel]) + ' · ' + t('v.auto') + '</p>' +
        '<p class="chips">' + [v.km ? SP.kmTxt(v) : '0 km', L(SP.FUEL[v.fuel]), t('v.auto'), v.hp + ' ' + t('c.hp')].map(x => '<span>' + x + '</span>').join('') + '</p>' +
        '<div class="pbox">' + (v.was ? '<p class="pbox__r"><span>' + t('v.list') + '</span><s>' + SP.eur(v.was) + '</s></p>' : '') + '<p class="pbox__r pbox__r--main"><span>' + (v.was ? t('v.offer') : t('v.price')) + '</span><strong>' + SP.eur(v.price) + '</strong></p>' +
        '<p class="pbox__r"><span class="muted">' + t('c.vat') + '</span>' + (v.was ? '<em class="save">' + t('c.save') + ' ' + SP.eur(v.was - v.price) + '</em>' : '') + '</p><p class="pbox__st pbox__st--' + v.status + '">' + SP.statusTxt(v) + ' · ' + loc.city + '</p></div>' +
        '<a class="btn btn--ink btn--block" href="#oferta">' + t('c.reqOffer') + '</a><a class="btn btn--line btn--block" href="service.html?tip=td&v=' + v.id + '">' + t('v.td') + '</a>' +
        '<div class="advbox"><p class="eyebrow eyebrow--sm">' + t('v.advisor') + '</p><div class="advbox__r">' + SP.advisorMini(a) + '<span class="advbox__b"><a class="ibtn" href="tel:' + a.phone.replace(/\s/g, '') + '" aria-label="' + t('c.call') + '">' + I('phone') + '</a><a class="ibtn" href="mailto:' + loc.email + '?subject=' + encodeURIComponent(v.id + ' ' + v.title) + '" aria-label="Email">' + I('mail') + '</a></span></div></div></div></div>' +
        '<div class="vd__body"><div><h2 class="h3">' + t('v.specs') + '</h2><dl class="specs">' + specs.map(s => '<div><dt>' + s[0] + '</dt><dd>' + esc(s[1]) + '</dd></div>').join('') + '</dl>' +
        '<h2 class="h3">' + t('v.eq') + '</h2><ul class="eqlist">' + eq.map(e => '<li>' + I('check') + L(e) + '</li>').join('') + '</ul>' +
        '<h2 class="h3">' + t('v.hist') + '</h2><ul class="hist">' + hist.map((h, i) => '<li>' + I(histIc[i]) + t(h) + '</li>').join('') + '</ul></div>' +
        '<aside class="fin" data-fin><h2 class="h4">' + t('v.fin') + '</h2><p class="muted small">' + t('v.apr') + '</p>' +
        '<label class="slider"><span><b>' + t('v.down') + '</b><em data-fdv></em></span><input type="range" min="0" max="50" step="5" value="20" data-fd aria-label="' + t('v.down') + '"></label>' +
        '<label class="slider"><span><b>' + t('v.term') + '</b><em data-ftv></em></span><input type="range" min="12" max="60" step="12" value="48" data-ft aria-label="' + t('v.term') + '"></label>' +
        '<div class="fin__res"><p class="eyebrow eyebrow--sm">' + t('v.monthly') + '</p><strong data-fm></strong></div><a class="btn btn--ink btn--block" href="#oferta">' + t('c.reqOffer') + '</a><p class="muted small">' + t('v.finNote') + '</p></aside></div>' +
        '<div class="vd__forms" id="oferta"><div class="fbox"><h2 class="h4">' + t('v.reqT') + '</h2><p class="muted small">' + t('v.reqP') + '</p>' + SP.leadForm({ type: 'offer', ctx: v.id, submit: t('c.reqOffer') }) + '</div>' +
        '<div class="fbox"><h2 class="h4">' + t('v.tdT') + '</h2><p class="muted small">' + t('v.tdP') + '</p>' + SP.leadForm({ type: 'testdrive', ctx: v.id, submit: t('v.td'), ghost: true, extra: tdExtra }) + '</div></div>' +
        '<div class="sec sec--last">' + SP.shead('', t('v.similar')) + '<div class="grid3">' + sim.map(SP.stockCard).join('') + '</div></div></section>',
      bind(m) {
        const st = m.querySelector('[data-stage]');
        m.querySelectorAll('[data-ph]').forEach(b => b.addEventListener('click', () => { const k = b.dataset.ph, im = st.querySelector('[data-main]'); if (im) im.src = SP.ph(k, 1400, 875); m.querySelector('[data-credit]').innerHTML = SP.credit(k); m.querySelectorAll('[data-ph]').forEach(x => x.classList.toggle('is-on', x === b)); }));
        const fd = m.querySelector('[data-fd]'), ft = m.querySelector('[data-ft]');
        const calc = () => { fin.down = +fd.value / 100; fin.term = +ft.value; m.querySelector('[data-fdv]').textContent = fd.value + '% · ' + SP.eur(v.price * fin.down); m.querySelector('[data-ftv]').textContent = ft.value + ' ' + t('v.months'); m.querySelector('[data-fm]').textContent = SP.eur(SP.monthly(v.price, fin.down, fin.term, APR)); };
        fd.addEventListener('input', calc); ft.addEventListener('input', calc); calc();
        const d = m.querySelector('#tdd'); if (d) { const x = new Date(); x.setDate(x.getDate() + 1); d.min = x.toISOString().slice(0, 10); }
      }
    };
  };

  /* ================= OFFERS ================= */
  SP.pages.offers = () => {
    let cat = 'all';
    const f = SP.OFFERS.find(o => o.featured);
    const card = o => '<article class="ocard"><div class="ocard__img"><img src="' + o.img + '" alt="" loading="lazy"></div><div class="ocard__b"><p class="ocard__k"><span>' + L(o.tag).toUpperCase() + '</span><span class="obadge">' + L(o.badge) + '</span></p>' +
      '<h3>' + L(o.title) + '</h3><p class="muted">' + L(o.lead) + '</p></div><div class="ocard__f"><button type="button" class="ulink ulink--sm" data-offer="' + o.id + '">' + t('c.reqOffer') + '</button><small>' + t('c.valid') + ' ' + SP.dshort(o.valid) + '</small></div></article>';
    return {
      title: t('nav.offers'), html: SP.phead(t('o.eyebrow'), t('o.title'), t('o.sub')) +
        '<section class="wrap"><article class="ofeat"><div class="ofeat__img"><img src="' + f.img + '" alt=""></div><div class="ofeat__b"><p class="eyebrow eyebrow--sm">' + t('o.month') + '</p><h2>' + L(f.title) + '</h2><p class="muted">' + L(f.lead) + '</p>' +
        '<div class="ofeat__f"><button type="button" class="btn btn--ink" data-offer="' + f.id + '">' + t('c.reqOffer') + '</button><small>' + t('c.valid') + ' <strong>' + SP.dshort(f.valid) + '</strong></small></div></div></article>' +
        '<div class="segs segs--light" role="tablist">' + [['all', t('c.all')], ['cars', t('o.cars')], ['service', t('o.service')], ['parts', t('o.parts')]].map(x => '<button type="button" data-ocat="' + x[0] + '">' + x[1] + '</button>').join('') + '</div>' +
        '<div class="grid3" data-olist></div><p class="note">' + I('doc') + t('o.legal') + '</p></section><div class="sec--last"></div>',
      bind(m) {
        const draw = () => { m.querySelectorAll('[data-ocat]').forEach(b => b.classList.toggle('is-on', b.dataset.ocat === cat)); m.querySelector('[data-olist]').innerHTML = SP.OFFERS.filter(o => !o.featured && (cat === 'all' || o.cat === cat)).map(card).join(''); };
        m.querySelectorAll('[data-ocat]').forEach(b => b.addEventListener('click', () => { cat = b.dataset.ocat; draw(); }));
        m.addEventListener('click', e => { const b = e.target.closest('[data-offer]'); if (!b) return; const o = SP.OFFERS.find(x => x.id === b.dataset.offer); SP.modal(L(o.title), SP.leadForm({ type: 'offer', ctx: 'offer:' + o.id, message: true, submit: t('c.reqOffer') })); });
        draw();
      }
    };
  };

  /* ================= SERVICE BOOKING (4 steps) ================= */
  SP.pages.service = () => {
    const pv = SP.car(SP.param('v'));
    const b = { step: 1, type: SP.param('tip') === 'td' ? 'td' : 'svc', vin: '', plate: '', km: '', model: pv ? pv.fam : (SP.param('m') || ''), needs: ['n1'], loc: pv ? pv.loc : (SP.param('loc') || SP.LOCATIONS[0].id), drop: 'd1', addr: '', repl: false, notes: '',
      day: null, time: null, title: 'mr', name: '', phone: '', email: '', pref: 'phone', gdpr: false, ref: null };
    const days = []; const d0 = new Date(); d0.setHours(12, 0, 0, 0);
    for (let i = 1; days.length < 12; i++) { const d = new Date(d0); d.setDate(d0.getDate() + i); if (d.getDay() !== 0) days.push(d.toISOString().slice(0, 10)); }
    const TIMES = ['08:30', '09:30', '10:30', '11:30', '13:00', '14:00', '15:00', '16:30'];
    const busy = (di, ti) => (di * 3 + ti * 2) % 7 === 0;
    const steps = ['b.s1', 'b.s2', 'b.s3', 'b.s4'];
    const rangeModels = SP.RANGE.filter(m => !m.soon);
    const pick = (k, v, title, desc, ic) => '<button type="button" class="pick' + (b[k] === v ? ' is-on' : '') + '" data-pick="' + k + '" data-v="' + v + '">' + (ic ? I(ic) : '') + '<strong>' + title + '</strong>' + (desc ? '<small>' + desc + '</small>' : '') + '</button>';
    const inp = (k, label, type, ph) => '<div class="field"><label for="b_' + k + '">' + label + '</label><input id="b_' + k + '" data-b="' + k + '" type="' + (type || 'text') + '" value="' + esc(b[k]) + '"' + (ph ? ' placeholder="' + ph + '"' : '') + '></div>';
    const dayLbl = iso => SP.date(iso, { weekday: 'short', day: 'numeric', month: 'short' });
    const vehLbl = () => b.type === 'td' ? (pv && b.model === pv.fam ? pv.title + ' (' + pv.id + ')' : (rangeModels.find(m => m.url === b.model) || {}).name || (FAM[b.model] ? famLbl(b.model) : '—')) : (b.vin || b.plate || '—');
    const body = () => {
      if (b.step === 5) return '<div class="bdone"><span class="done__i">' + I('check') + '</span><h2 class="h2">' + t('b.doneT') + '</h2><p class="muted">' + t('b.doneP') + '</p><p class="bdone__ref"><small>' + t('b.ref') + '</small><strong>' + b.ref + '</strong></p>' +
        '<dl class="specs specs--1">' + summary().map(s => '<div><dt>' + s[0] + '</dt><dd>' + esc(s[1]) + '</dd></div>').join('') + '</dl><p class="note note--sm">' + I('box') + t('b.int') + '</p><div class="btnrow btnrow--c"><button type="button" class="btn btn--ink" data-bnew>' + t('b.new') + '</button><a class="btn btn--line" href="index.html">' + t('b.home') + '</a></div></div>';
      let h = '';
      if (b.step === 1) {
        h = '<h3 class="bq">' + t('b.what') + '</h3><div class="picks picks--2">' + pick('type', 'svc', t('b.svc'), t('b.svcD'), 'wrench') + pick('type', 'td', t('b.td'), t('b.tdD'), 'car') + '</div>';
        if (b.type === 'svc') h += '<div class="fgrid">' + inp('vin', t('b.vin') + ' *', 'text', t('b.vinPh')) + inp('plate', t('b.plate'), 'text', 'B 00 SPA') + inp('km', t('b.km'), 'number', '45000') + '</div>' +
          '<h3 class="bq">' + t('b.needs') + '</h3><div class="cbgrid">' + ['n1', 'n2', 'n3', 'n4', 'n5'].map(n => '<label class="cbx cbx--box"><input type="checkbox" data-need="' + n + '"' + (b.needs.includes(n) ? ' checked' : '') + '><span>' + t('b.' + n) + '</span></label>').join('') + '</div>';
        else h += '<div class="field field--full"><label for="b_model">' + t('b.tdModel') + ' *</label><select id="b_model" data-b="model">' + opt('', '—', b.model) +
          (pv ? '<optgroup label="' + t('nav.stock') + '">' + opt(pv.fam, pv.title + ' · ' + pv.id, b.model) + '</optgroup>' : '') +
          SP.RANGE_GROUPS.map(g => '<optgroup label="' + L(g[1]) + '">' + rangeModels.filter(m => m.g === g[0]).map(m => opt(m.url, m.name, b.model)).join('') + '</optgroup>').join('') + '</select></div>';
      } else if (b.step === 2) {
        h = '<h3 class="bq">' + t('b.loc') + '</h3><div class="picks picks--4">' + SP.LOCATIONS.map(l => pick('loc', l.id, l.city, l.address.split(',')[0], 'pin')).join('') + '</div>' +
          (b.type === 'svc' ? '<h3 class="bq">' + t('b.drop') + '</h3><div class="picks picks--3">' + ['d1', 'd2', 'd3'].map(x => pick('drop', x, t('b.' + x))).join('') + '</div>' + (b.drop === 'd2' ? '<div class="fgrid">' + '<div class="field field--full"><label for="b_addr">' + t('b.addr') + ' *</label><input id="b_addr" data-b="addr" value="' + esc(b.addr) + '" placeholder="' + t('b.addrPh') + '"></div></div>' : '') +
            '<label class="cbx"><input type="checkbox" data-b="repl"' + (b.repl ? ' checked' : '') + '><span>' + t('b.repl') + '</span></label>' : '') +
          '<div class="field field--full"><label for="b_notes">' + t('b.notes') + '</label><textarea id="b_notes" data-b="notes" rows="3" placeholder="' + t('b.notesPh') + '">' + esc(b.notes) + '</textarea></div>';
      } else if (b.step === 3) {
        h = '<h3 class="bq">' + t('b.day') + '</h3><div class="days">' + days.map((d, i) => '<button type="button" class="day' + (b.day === d ? ' is-on' : '') + '" data-day="' + d + '"><small>' + SP.date(d, { weekday: 'short' }) + '</small><strong>' + new Date(d + 'T12:00:00').getDate() + '</strong><small>' + SP.date(d, { month: 'short' }) + '</small></button>').join('') + '</div>' +
          '<h3 class="bq">' + t('b.time') + '</h3><div class="times">' + TIMES.map((x, ti) => { const di = days.indexOf(b.day), bz = di < 0 || busy(di, ti); return '<button type="button" class="time' + (b.time === x ? ' is-on' : '') + '" data-time="' + x + '"' + (bz ? ' disabled' : '') + '>' + x + (di >= 0 && bz ? '<small>' + t('b.busy') + '</small>' : '') + '</button>'; }).join('') + '</div>';
      } else {
        h = '<div class="picks picks--inline"><span class="lbl">' + t('b.title2') + '</span>' + pick('title', 'mr', t('b.mr')) + pick('title', 'mrs', t('b.mrs')) + '</div><div class="fgrid">' +
          '<div class="field field--full"><label for="b_name">' + t('b.name') + ' *</label><input id="b_name" data-b="name" autocomplete="name" value="' + esc(b.name) + '" placeholder="' + t('f.namePh') + '"></div>' +
          inp('phone', t('b.phone') + ' *', 'tel', t('f.phonePh')) + inp('email', t('b.email') + ' *', 'email', t('f.emailPh')) + '</div>' +
          '<h3 class="bq">' + t('b.pref') + '</h3><div class="picks picks--3">' + [['phone', t('b.phone')], ['email', t('b.email')], ['wa', 'WhatsApp']].map(x => pick('pref', x[0], x[1])).join('') + '</div>' +
          '<label class="check"><input type="checkbox" data-b="gdpr"' + (b.gdpr ? ' checked' : '') + '><span>' + t('f.gdpr') + ' <a href="legal.html?doc=confidentialitate">' + t('f.privacy') + '</a>.</span></label>';
      }
      return '<p class="bstep">' + t('b.step') + ' ' + b.step + ' ' + t('b.of') + ' 4 · <strong>' + t(steps[b.step - 1]) + '</strong></p>' + h + '<p class="err" data-berr role="alert"></p>' +
        '<div class="bnav"><button type="button" class="btn btn--line" data-bprev' + (b.step === 1 ? ' style="visibility:hidden"' : '') + '>' + t('b.prev') + '</button><button type="button" class="btn btn--ink" data-bnext>' + (b.step === 4 ? t('b.submit') : t('b.next')) + '</button></div>';
    };
    const summary = () => [[t('b.type'), b.type === 'td' ? t('b.td') : t('b.svc') + (b.needs.length ? ' – ' + b.needs.map(n => t('b.' + n)).join(', ') : '')], [t('b.vehicle'), vehLbl()],
      [t('s.loc'), SP.loc(b.loc).name], [t('b.when'), b.day ? dayLbl(b.day) + (b.time ? ', ' + b.time : '') : '—'], [t('b.name'), b.name ? (t(b.title === 'mr' ? 'b.mr' : 'b.mrs') + ' ' + b.name) : '—']];
    const valid = () => {
      if (b.step === 1) return b.type === 'svc' ? b.vin.trim().length >= 6 || b.plate.trim().length >= 5 : !!b.model;
      if (b.step === 2) return !(b.type === 'svc' && b.drop === 'd2' && b.addr.trim().length < 5);
      if (b.step === 3) return !!(b.day && b.time);
      return b.name.trim().length >= 3 && /^[+0-9 ()-]{9,}$/.test(b.phone.trim()) && /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(b.email.trim()) && b.gdpr;
    };
    return {
      title: t('nav.service'), html: SP.phead(t('b.eyebrow'), t('b.title'), t('b.sub')) +
        '<section class="wrap blay sec--last"><div class="bcard"><ol class="prog" data-prog></ol><div data-bbody></div></div><aside class="bsum" data-bsum></aside></section>',
      bind(m) {
        const box = m.querySelector('[data-bbody]');
        const draw = () => {
          m.querySelector('[data-prog]').innerHTML = steps.map((s, i) => '<li class="' + (b.step > i + 1 ? 'is-done' : b.step === i + 1 ? 'is-on' : '') + '"><span>' + (b.step > i + 1 ? I('check') : i + 1) + '</span><em>' + t(s) + '</em></li>').join('');
          box.innerHTML = body();
          m.querySelector('[data-bsum]').innerHTML = b.step === 5 ? '' : '<h3 class="h4">' + t('b.summary') + '</h3><dl class="specs specs--1">' + summary().map(s => '<div><dt>' + s[0] + '</dt><dd>' + esc(s[1]) + '</dd></div>').join('') + '</dl>' +
            '<div class="bsum__loc"><p><strong>' + SP.loc(b.loc).name + '</strong></p><p class="muted small">' + SP.loc(b.loc).address + '</p><p class="small"><a href="tel:' + SP.loc(b.loc).phone.replace(/\s/g, '') + '">' + I('phone') + SP.loc(b.loc).phone + '</a></p></div>';
          m.querySelector('[data-bsum]').hidden = b.step === 5;
        };
        box.addEventListener('click', e => {
          const p = e.target.closest('[data-pick]'); if (p) { b[p.dataset.pick] = p.dataset.v; if (p.dataset.pick === 'type' && b.type === 'td' && !b.model && pv) b.model = pv.fam; draw(); return; }
          const dy = e.target.closest('[data-day]'); if (dy) { b.day = dy.dataset.day; b.time = null; draw(); return; }
          const tm = e.target.closest('[data-time]'); if (tm && !tm.disabled) { b.time = tm.dataset.time; draw(); return; }
          if (e.target.closest('[data-bprev]')) { b.step--; draw(); return; }
          if (e.target.closest('[data-bnew]')) { Object.assign(b, { step: 1, day: null, time: null, ref: null }); draw(); return; }
          if (e.target.closest('[data-bnext]')) {
            if (!valid()) { box.querySelector('[data-berr]').textContent = b.step === 3 ? t('b.errDay') : t('b.err'); return; }
            /* Integration point: POST /api/service/appointments → Sales Partner After-Sales (appointment request) */
            if (b.step === 4) b.ref = 'SRV-2026-' + String(Math.floor(1000 + Math.random() * 8999));
            b.step++; draw(); m.querySelector('.blay').scrollIntoView({ behavior: 'smooth' });
          }
        });
        box.addEventListener('input', e => { const k = e.target.dataset.b; if (k) { b[k] = e.target.type === 'checkbox' ? e.target.checked : e.target.value; if (k === 'model') draw(); else m.querySelector('[data-bsum] dl').innerHTML = summary().map(s => '<div><dt>' + s[0] + '</dt><dd>' + esc(s[1]) + '</dd></div>').join(''); }
          const n = e.target.dataset.need; if (n) { if (e.target.checked) b.needs.push(n); else b.needs.splice(b.needs.indexOf(n), 1); } });
        draw();
      }
    };
  };

  /* ================= PARTS (showcase — e-shop later) ================= */
  SP.pages.parts = () => {
    const card = p => '<article class="pcard"><div class="pcard__img"><img src="' + p.img + '" alt="" loading="lazy"></div><div class="pcard__b"><p class="eyebrow eyebrow--sm">' + L(p.cat).toUpperCase() + '</p><h3>' + L(p.name) + '</h3><p class="muted small">' + L(p.note) + '</p>' +
      '<p class="pcard__ref">' + t('p.ref') + ' <code>' + p.ref + '</code></p></div><div class="pcard__f"><span class="price"><strong>' + SP.eur(p.price) + '</strong><small>' + t('p.indic') + ' · ' + t('c.vat') + '</small></span><button type="button" class="btn btn--line btn--sm" data-part="' + p.id + '">' + t('p.ask') + '</button></div></article>';
    const vinF = SP.field('pv1', 'vin', t('b.vin'), '<input id="pv1" name="vin" placeholder="' + t('b.vinPh') + '">');
    return {
      title: t('nav.parts'), html: SP.phead(t('p.eyebrow'), t('p.title'), t('p.sub')) +
        '<section class="wrap"><div class="soon">' + I('box') + '<div><h2>' + t('p.soonT') + '</h2><p>' + t('p.soonP') + '</p></div><form class="nl nl--light" data-notify novalidate><label class="sr" for="pn">Email</label><input id="pn" type="email" placeholder="' + t('ft.nlPh') + '"><button type="submit">' + t('p.notify') + '</button></form></div>' +
        '<div class="grid3">' + SP.PARTS.map(card).join('') + '</div>' +
        '<div class="vinreq sec sec--last"><div><h2 class="h2">' + t('p.vinT') + '</h2><p class="muted">' + t('p.vinP') + '</p></div><div class="fbox">' + SP.leadForm({ type: 'parts', ctx: 'parts-request', message: true, extra: vinF }) + '</div></div></section>',
      bind(m) {
        m.addEventListener('click', e => { const b = e.target.closest('[data-part]'); if (!b) return; const p = SP.PARTS.find(x => x.id === b.dataset.part); SP.modal(L(p.name), '<p class="muted small">' + t('p.ref') + ' ' + p.ref + '</p>' + SP.leadForm({ type: 'parts', ctx: 'part:' + p.ref, extra: SP.field('pmv', 'vin', t('b.vin'), '<input id="pmv" name="vin" placeholder="' + t('b.vinPh') + '">', true), submit: t('p.ask') })); });
        const nf = m.querySelector('[data-notify]'); nf.addEventListener('submit', e => { e.preventDefault(); const i = nf.querySelector('input'); if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(i.value.trim())) { i.setAttribute('aria-invalid', ''); i.focus(); return; } nf.outerHTML = '<p class="nl__ok nl__ok--dark">' + I('check') + t('p.notifyOk') + '</p>'; });
      }
    };
  };

  /* ================= LOCATIONS ================= */
  const mapSrc = l => 'https://maps.google.com/maps?q=' + encodeURIComponent(l.address + ', Romania') + '&z=15&output=embed';
  const hrs = l => l.hours.map(h => '<div><dt>' + t('l.' + h[0]) + '</dt><dd>' + (h[1] || t('c.closed')) + '</dd></div>').join('');
  SP.pages.locations = () => {
    const st = { city: '', svc: '', sel: SP.LOCATIONS[0].id };
    const tagsAll = ['sales', 'service', 'parts', 'body', 'tyres', 'finance', 'vans'];
    const card = l => '<article class="lcard' + (st.sel === l.id ? ' is-on' : '') + '"><a class="lcard__img" href="locatie.html?id=' + l.id + '"><img src="' + l.img + '" alt="' + esc(l.name) + '" loading="lazy"></a><div class="lcard__b"><h3>' + l.name + '</h3>' +
      '<p class="ico">' + I('pin') + '<span>' + l.address + '</span></p><p class="ico">' + I('clock') + '<span>' + t('l.hours') + ': ' + l.hours[0][1] + '</span></p><p class="ltags">' + l.tags.map(x => '<span>' + t('tagS.' + x) + '</span>').join('') + '</p></div>' +
      '<div class="lcard__f"><a class="ulink ulink--sm" href="locatie.html?id=' + l.id + '">' + t('l.view') + '</a><span><button type="button" class="tlink" data-map="' + l.id + '">' + I('pin') + t('l.dir') + '</button><a class="tlink" href="tel:' + l.phone.replace(/\s/g, '') + '">' + I('phone') + t('c.call') + '</a></span></div></article>';
    return {
      title: t('nav.locations'), html: SP.phead(t('l.eyebrow'), t('l.title'), t('l.sub')) +
        '<section class="wrap sec--last"><div class="map"><iframe data-mapf title="Map" loading="lazy" referrerpolicy="no-referrer-when-downgrade" src="' + mapSrc(SP.LOCATIONS[0]) + '"></iframe></div>' +
        '<div class="lfil"><label class="sel"><span class="sr">' + t('l.city') + '</span><select data-lc>' + opt('', t('l.city')) + SP.LOCATIONS.map(l => opt(l.id, l.city)).join('') + '</select></label>' +
        '<label class="sel"><span class="sr">' + t('l.svc') + '</span><select data-ls>' + opt('', t('l.svc')) + tagsAll.map(x => opt(x, t('tag.' + x))).join('') + '</select></label></div>' +
        '<div class="grid3" data-llist></div></section>',
      bind(m) {
        const draw = () => { m.querySelector('[data-llist]').innerHTML = SP.LOCATIONS.filter(l => (!st.city || l.id === st.city) && (!st.svc || l.tags.includes(st.svc))).map(card).join(''); };
        m.querySelector('[data-lc]').addEventListener('change', e => { st.city = e.target.value; if (st.city) { st.sel = st.city; m.querySelector('[data-mapf]').src = mapSrc(SP.loc(st.city)); } draw(); });
        m.querySelector('[data-ls]').addEventListener('change', e => { st.svc = e.target.value; draw(); });
        m.addEventListener('click', e => { const b = e.target.closest('[data-map]'); if (!b) return; st.sel = b.dataset.map; m.querySelector('[data-mapf]').src = mapSrc(SP.loc(st.sel)); draw(); m.querySelector('.map').scrollIntoView({ behavior: 'smooth' }); });
        draw();
      }
    };
  };

  SP.pages.location = () => {
    const l = SP.loc(SP.param('id')) || SP.LOCATIONS[0];
    const stock = SP.STOCK.filter(v => v.loc === l.id).slice(0, 3);
    return {
      title: l.name, html: '<section class="wrap ld"><a class="back" href="locatii.html">' + I('arrowL') + t('l.all') + '</a><div class="ld__grid"><div><h1 class="h1 h1--md">' + l.name + '</h1><div class="ld__img"><img src="' + l.img + '" alt="' + esc(l.name) + '"></div>' +
        '<div class="map map--sm"><iframe title="Map" loading="lazy" referrerpolicy="no-referrer-when-downgrade" src="' + mapSrc(l) + '"></iframe></div>' +
        '<div class="ld__info"><div><h2 class="cap">' + t('l.contact') + '</h2><p>' + l.address + '</p><p><a href="tel:' + l.phone.replace(/\s/g, '') + '"><strong>' + l.phone + '</strong></a></p><p>email: <a href="mailto:' + l.email + '">' + l.email + '</a></p>' +
        '<div class="btnrow"><a class="btn btn--ink btn--sm" href="tel:' + l.phone.replace(/\s/g, '') + '">' + t('c.call') + '</a><a class="btn btn--line btn--sm" href="https://wa.me/' + l.wa.replace(/\D/g, '') + '" target="_blank" rel="noopener">WhatsApp</a><a class="btn btn--line btn--sm" href="https://www.google.com/maps/dir/?api=1&destination=' + encodeURIComponent(l.address) + '" target="_blank" rel="noopener">' + t('l.dir') + '</a></div></div>' +
        '<div><h2 class="cap">' + t('l.hours') + '</h2><dl class="hrs">' + hrs(l) + '</dl></div></div></div>' +
        '<aside class="ld__side"><h2 class="cap">' + t('l.services') + '</h2><ul class="svl">' + l.tags.map(x => '<li>' + I('check') + t('tag.' + x) + '</li>').join('') + '</ul><hr><h2 class="cap">' + t('l.team') + '</h2>' +
        l.team.map(p => SP.advisorMini({ name: p[0], role: p[1] })).join('') + '<a class="btn btn--ink btn--block" href="service.html?loc=' + l.id + '">' + t('l.book') + '</a></aside></div>' +
        (stock.length ? '<div class="sec sec--last">' + SP.shead('', t('l.stock'), [t('h.featAll'), 'stoc.html?loc=' + l.id]) + '<div class="grid3">' + stock.map(SP.stockCard).join('') + '</div></div>' : '') + '</section>'
    };
  };

  /* ================= LEGAL / 404 ================= */
  SP.pages.legal = () => {
    const d = SP.param('doc') || 'termeni', k = { termeni: 'ft.terms', confidentialitate: 'ft.privacy', cookies: 'ft.cookies' }[d] || 'ft.terms';
    const used = [...new Set(Object.values(SP.PHOTO_MAP).flat().concat(Object.values(SP.TILE_PHOTOS)))];
    return { title: t(k), html: SP.phead(t('lg.title'), t(k), '') + '<section class="wrap sec--last prose"><p>' + t('lg.p') + '</p><p>' + t('ft.demo') + '</p><h2 class="h3" id="foto">' + t('lg.photos') + '</h2><p>' + t('lg.photosP') + '</p><ul class="credits">' + used.map(x => '<li>' + SP.credit(x) + '</li>').join('') + '</ul></section>' };
  };
  SP.pages.notfound = () => ({ title: '404', html: SP.phead('404', t('nf.title'), t('nf.p')) + '<section class="wrap sec--last"><a class="btn btn--ink" href="index.html">' + t('b.home') + '</a></section>' });
})();
