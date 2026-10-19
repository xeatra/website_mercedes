/* =====================================================================
   DATA — demo content. In production every block below comes from the
   Sales Partner APIs (CakePHP 4):
     DEALER / LOCATIONS / TEAM  → dealer master data (DMS → Organisation)
     STOCK                      → vehicle stock feed (DMS → Stock, status, prices)
     OFFERS                     → CMS campaigns (dealer back-office)
     PARTS                      → parts catalogue (After-Sales → Parts) — showcase only
     RANGE (Modele)             → static snapshot of mercedes-benz.ro/passengercars/models.html
   All dealer data is FICTIONAL (demo).
   ===================================================================== */
window.SP = window.SP || {};
(function (SP) {
  const R = (ro, en) => ({ ro, en: en || ro });

  SP.DEALER = {
    name: 'Sales Partner', sub: R('PARTENER MERCEDES-BENZ', 'MERCEDES-BENZ PARTNER'),
    phone: '+40 21 000 0000', email: 'contact@demo-salespartner.ro',
    legal: { company: 'Sales Partner Auto SRL (demo)', reg: 'J40/0000/2026', cui: 'RO00000000' },
    stats: { stock: '320+', locations: 4, reply: '24h' }
  };

  /* ---------- locations ---------- */
  SP.LOCATIONS = [
    { id: 'bucuresti', city: 'București', name: 'Sales Partner București', address: 'Strada Doctor Thoma Ionescu 10, Sector 5, București', phone: '+40 21 000 0001', wa: '+40 700 000 001', email: 'bucuresti@demo-salespartner.ro', img: 'assets/img/sp.webp',
      hours: [['mon', '08:00 – 19:00'], ['sat', '09:00 – 14:00'], ['sun', null]], tags: ['sales', 'service', 'parts', 'body', 'tyres', 'finance'],
      team: [['Mihai Stoian', 'gm'], ['Elena Vasilescu', 'salesdir'], ['Robert Radu', 'workshop']] },
    { id: 'timisoara', city: 'Timișoara', name: 'Sales Partner Timișoara', address: 'Calea Aradului 110, Timișoara', phone: '+40 256 000 001', wa: '+40 700 000 002', email: 'timisoara@demo-salespartner.ro', img: 'assets/img/aks_chitilla.webp',
      hours: [['mon', '08:00 – 19:00'], ['sat', '09:00 – 14:00'], ['sun', null]], tags: ['sales', 'service', 'parts', 'tyres', 'finance'],
      team: [['Andrei Munteanu', 'gm'], ['Ioana Pop', 'sales'], ['Radu Crișan', 'workshop']] },
    { id: 'arad', city: 'Arad', name: 'Sales Partner Arad', address: 'Calea Zimandului 4, Arad', phone: '+40 257 000 002', wa: '+40 700 000 003', email: 'arad@demo-salespartner.ro', img: 'assets/img/aks_pipera.webp',
      hours: [['mon', '08:30 – 18:00'], ['sat', '09:00 – 13:00'], ['sun', null]], tags: ['sales', 'service', 'parts', 'vans'],
      team: [['Cristian Toma', 'gm'], ['Vlad Dinu', 'eq'], ['Sorina Lazăr', 'service']] },
    { id: 'cluj', city: 'Cluj-Napoca', name: 'Sales Partner Cluj', address: 'Strada Bobâlnei 67, Cluj-Napoca', phone: '+40 264 000 003', wa: '+40 700 000 004', email: 'cluj@demo-salespartner.ro', img: 'assets/img/aliat.webp',
      hours: [['mon', '08:00 – 19:00'], ['sat', '09:00 – 14:00'], ['sun', null]], tags: ['sales', 'service', 'parts', 'body', 'finance'],
      team: [['Alexandru Mureșan', 'gm'], ['Bianca Pop', 'sales'], ['Paul Rus', 'workshop']] }
  ];

  SP.ADVISORS = {
    ip: { name: 'Ioana Pop', role: 'sales', phone: '+40 700 100 101' },
    am: { name: 'Andrei Munteanu', role: 'sales', phone: '+40 700 100 102' },
    vd: { name: 'Vlad Dinu', role: 'eq', phone: '+40 700 100 103' },
    ev: { name: 'Elena Vasilescu', role: 'salesdir', phone: '+40 700 100 104' },
    bp: { name: 'Bianca Pop', role: 'sales', phone: '+40 700 100 105' },
    ct: { name: 'Cristian Toma', role: 'vans', phone: '+40 700 100 106' }
  };

  /* ---------- enums ---------- */
  SP.BODY = {
    sedan: R('Limuzină', 'Saloon'), suv: R('SUV', 'SUV'), coupe: R('Coupé', 'Coupé'), estate: R('Break / T-Modell', 'Estate'),
    hatch: R('Compactă', 'Compact'), cabrio: R('Cabriolet & Roadster', 'Cabriolet & Roadster'), van: R('Van / Monovolum', 'Van / MPV')
  };
  SP.FUEL = { petrol: R('Benzină', 'Petrol'), diesel: R('Diesel', 'Diesel'), phev: R('Plug-in hybrid', 'Plug-in hybrid'), electric: R('Electric', 'Electric') };
  SP.COND = { new: R('Nou', 'New'), cert: R('Certificat', 'Certified'), demo: R('Ex-demo', 'Ex-demo') };
  SP.DRIVE = { awd: '4MATIC', rwd: R('Spate', 'Rear-wheel'), fwd: R('Față', 'Front-wheel') };

  /* ---------- stock (inspired by real dealer listings; prices VAT incl.) ----------
     status: avail | reserved | incoming (eta) */
  const S = (id, cond, fam, title, version, body, fuel, drive, hp, year, km, price, was, color, hex, loc, adv, extra) =>
    Object.assign({ id, cond, fam, title, version, body, fuel, drive, hp, year, km, price, was, color, hex, loc, adv, status: 'avail', gear: 'auto', type: 'pc' }, extra || {});
  SP.STOCK = [
    S('MB-26101', 'new', 'glc-coupe', 'GLC 300 4MATIC Coupé', 'AMG Line Premium Plus', 'suv', 'petrol', 'awd', 258, 2026, 0, 78647, 82277, R('Negru obsidian metalizat', 'Obsidian black metallic'), '#1d1f22', 'bucuresti', 'ip', { cc: 1999, featured: 1 }),
    S('MB-26102', 'new', 'c', 'C 300 4MATIC Limuzină', 'AMG Line', 'sedan', 'petrol', 'awd', 258, 2026, 0, 61912, null, R('Gri grafit', 'Graphite grey'), '#55595e', 'bucuresti', 'am', { cc: 1999 }),
    S('MB-26103', 'new', 'v', 'V 300 d extra-lung', 'EXCLUSIVE', 'van', 'diesel', 'rwd', 237, 2026, 0, 110964, null, R('Negru obsidian', 'Obsidian black'), '#1d1f22', 'timisoara', 'ct', { cc: 1950, featured: 1 }),
    S('MB-26104', 'new', 'sprinter', 'Sprinter 517 CDI Furgon', 'Standard, ampatament lung', 'van', 'diesel', 'rwd', 170, 2026, 0, 52602, null, R('Alb arctic', 'Arctic white'), '#f1f1ef', 'arad', 'ct', { cc: 1950, type: 'lcv', gear: 'auto' }),
    S('MB-26105', 'new', 'c', 'C 180 Limuzină', 'Avantgarde', 'sedan', 'petrol', 'rwd', 170, 2026, 0, 42596, null, R('Alb polar', 'Polar white'), '#f3f3f1', 'bucuresti', 'am', { cc: 1496, status: 'reserved' }),
    S('MB-26106', 'new', 'gle-coupe', 'GLE 400 e 4MATIC Coupé', 'AMG Line', 'suv', 'phev', 'awd', 381, 2026, 0, 101341, null, R('Gri grafit', 'Graphite grey'), '#55595e', 'cluj', 'bp', { cc: 1999 }),
    S('MB-26107', 'new', 'c', 'C 200 4MATIC Limuzină', 'Avantgarde Advanced', 'sedan', 'petrol', 'awd', 204, 2026, 0, 55500, null, R('Argintiu iridium', 'Iridium silver'), '#a3a7ab', 'timisoara', 'ip', { cc: 1496 }),
    S('MB-26108', 'new', 'c', 'C 220 d Limuzină', 'AMG Line', 'sedan', 'diesel', 'rwd', 197, 2026, 0, 58299, null, R('Negru obsidian', 'Obsidian black'), '#1d1f22', 'bucuresti', 'am', { cc: 1993, status: 'incoming', eta: '2026-10-26' }),
    S('MB-24109', 'cert', 'cle-cabrio', 'CLE 450 4MATIC Cabriolet', 'AMG Line', 'cabrio', 'petrol', 'awd', 381, 2024, 23351, 67760, null, R('Argintiu iridium', 'Iridium silver'), '#a3a7ab', 'bucuresti', 'ev', { cc: 2999, featured: 1 }),
    S('MB-26110', 'new', 'glc-coupe', 'GLC 300 e 4MATIC Coupé', 'AMG Line Advanced Plus', 'suv', 'phev', 'awd', 313, 2026, 0, 88173, 95433, R('Alb polar', 'Polar white'), '#f3f3f1', 'cluj', 'bp', { cc: 1999 }),
    S('MB-25111', 'demo', 's', 'S 500 4MATIC lung', 'AMG Line Exclusive', 'sedan', 'petrol', 'awd', 449, 2025, 4800, 179195, 196400, R('Negru obsidian', 'Obsidian black'), '#1d1f22', 'bucuresti', 'ev', { cc: 2999 }),
    S('MB-26112', 'new', 'maybach-s', 'Mercedes-Maybach S 580 4MATIC', 'Two-tone', 'sedan', 'petrol', 'awd', 503, 2026, 0, 260490, null, R('Negru obsidian', 'Obsidian black'), '#1d1f22', 'bucuresti', 'ev', { cc: 3982, brand: 'maybach' }),
    S('MB-26113', 'new', 'g', 'Mercedes-AMG G 63', 'Night Package', 'suv', 'petrol', 'awd', 585, 2026, 0, 263623, null, R('Negru night', 'Night black'), '#1d1f22', 'bucuresti', 'ev', { cc: 3982, brand: 'amg', shape: 'g' }),
    S('MB-26114', 'new', 'a', 'A 180 Compactă', 'Progressive', 'hatch', 'petrol', 'fwd', 136, 2026, 0, 35389, 37469, R('Alb digital', 'Digital white'), '#f2f2f0', 'arad', 'ct', { cc: 1332 }),
    S('MB-26115', 'new', 'gls', 'GLS 450 d 4MATIC', 'AMG Line Premium Plus', 'suv', 'diesel', 'awd', 367, 2026, 0, 121936, null, R('Negru obsidian', 'Obsidian black'), '#1d1f22', 'timisoara', 'ip', { cc: 2989 }),
    S('MB-24116', 'cert', 'a', 'A 250 e Compactă', 'Progressive Line', 'hatch', 'phev', 'fwd', 218, 2024, 3180, 38900, null, R('Gri mountain', 'Mountain grey'), '#6f7377', 'cluj', 'bp', { cc: 1332 }),
    S('MB-23117', 'cert', 'gle-coupe', 'GLE 350 de 4MATIC Coupé', 'AMG Line', 'suv', 'phev', 'awd', 320, 2023, 50000, 89000, null, R('Negru obsidian', 'Obsidian black'), '#1d1f22', 'timisoara', 'am', { cc: 1950 }),
    S('MB-25118', 'demo', 'gla', 'GLA 200 d', 'Progressive Advanced', 'suv', 'diesel', 'fwd', 150, 2025, 2900, 47326, 50980, R('Alb digital', 'Digital white'), '#f2f2f0', 'arad', 'ct', { cc: 1950 }),
    S('MB-25119', 'demo', 'gle-coupe', 'Mercedes-AMG GLE 53 HYBRID 4MATIC+ Coupé', 'AMG Night Package', 'suv', 'phev', 'awd', 544, 2025, 22, 112938, 119714, R('Alb diamant bright', 'Diamond white bright'), '#efefea', 'bucuresti', 'vd', { cc: 2999, brand: 'amg', featured: 1 }),
    S('MB-23120', 'cert', 'e-estate', 'E 220 d 4MATIC All-Terrain', 'Avantgarde', 'estate', 'diesel', 'awd', 197, 2023, 41200, 58900, null, R('Argintiu iridium', 'Iridium silver'), '#a3a7ab', 'cluj', 'bp', { cc: 1993 }),
    S('MB-26121', 'new', 'cla-electric', 'CLA 250+ cu tehnologie EQ', 'AMG Line', 'sedan', 'electric', 'rwd', 272, 2026, 0, 52400, null, R('Alb polar', 'Polar white'), '#f3f3f1', 'timisoara', 'vd', { cc: 0, range: 792 }),
    S('MB-26122', 'new', 'glb-electric', 'GLB 250+ cu tehnologie EQ', 'Progressive', 'suv', 'electric', 'rwd', 272, 2026, 0, 58200, null, R('Alb polar', 'Polar white'), '#f3f3f1', 'cluj', 'vd', { cc: 0, range: 631 }),
    S('MB-22123', 'cert', 'c-estate', 'C 220 d T-Modell', 'Avantgarde', 'estate', 'diesel', 'rwd', 200, 2022, 61200, 36900, null, R('Argintiu high-tech', 'High-tech silver'), '#a9adb2', 'arad', 'ct', { cc: 1993 }),
    S('MB-25124', 'demo', 'e', 'E 300 e 4MATIC Limuzină', 'Exclusive', 'sedan', 'phev', 'awd', 313, 2025, 6100, 72400, 79800, R('Alb diamant', 'Diamond white'), '#efefea', 'timisoara', 'ip', { cc: 1999 }),
    S('MB-26125', 'new', 'cle-coupe', 'CLE 220 d Coupé', 'AMG Line', 'coupe', 'diesel', 'rwd', 197, 2026, 0, 61800, null, R('Alb diamant', 'Diamond white'), '#efefea', 'timisoara', 'am', { cc: 1993 }),
    S('MB-23126', 'cert', 'glc', 'GLC 220 d 4MATIC', 'AMG Line', 'suv', 'diesel', 'awd', 197, 2023, 38400, 52900, null, R('Gri selenit', 'Selenite grey'), '#6b6f73', 'arad', 'ct', { cc: 1993 }),
    S('MB-26127', 'new', 'cle-coupe', 'Mercedes-AMG CLE 53 4MATIC+ Coupé', 'AMG Dynamic Plus', 'coupe', 'petrol', 'awd', 449, 2026, 0, 88285, null, R('Alb diamant', 'Diamond white'), '#efefea', 'cluj', 'bp', { cc: 2999, brand: 'amg', featured: 1 }),
    S('MB-26128', 'new', 'sprinter', 'Sprinter 319 CDI Tourer', '9 locuri', 'van', 'diesel', 'rwd', 190, 2026, 0, 64990, null, R('Gri tenorit', 'Tenorite grey'), '#5b5f63', 'arad', 'ct', { cc: 2989, type: 'lcv' }),
    S('MB-22129', 'cert', 'amg-gt-4', 'Mercedes-AMG GT 63 4MATIC+ 4-Door Coupé', 'AMG Night Package', 'coupe', 'petrol', 'awd', 639, 2022, 29800, 109900, null, R('Gri graphite magno', 'Graphite grey magno'), '#4a4d51', 'bucuresti', 'ev', { cc: 3982, brand: 'amg' }),
    S('MB-25130', 'demo', 'v', 'V 250 d lung', 'AVANTGARDE', 'van', 'diesel', 'rwd', 190, 2025, 3900, 79800, 86500, R('Negru obsidian', 'Obsidian black'), '#1d1f22', 'timisoara', 'ct', { cc: 1950 }),
    S('MB-26131', 'new', 'cla-sb', 'CLA 200 Shooting Brake', 'Progressive', 'estate', 'petrol', 'fwd', 163, 2026, 0, 46100, null, R('Negru cosmos', 'Cosmos black'), '#222326', 'cluj', 'bp', { cc: 1332, status: 'incoming', eta: '2026-11-12' }),
    S('MB-22132', 'cert', 's', 'S 450 d 4MATIC', 'AMG Line', 'sedan', 'diesel', 'awd', 367, 2022, 54800, 84900, null, R('Negru obsidian', 'Obsidian black'), '#1d1f22', 'cluj', 'bp', { cc: 2989 })
  ];
  SP.STOCK.forEach((v, i) => { v.vin = 'W1K' + ['N', 'X', 'Z', 'V', 'H'][i % 5] + (200000 + i * 7919).toString().slice(0, 6) + 'A' + String(100000 + i * 3571).slice(-6); v.brand = v.brand || 'mb'; v.shape = v.shape || v.body; });


  /* ---------- illustrative photos (Unsplash licence, hot-linked as Unsplash recommends) ----------
     In production these come from the DMS vehicle gallery. Key → [photo id, Unsplash page id, author] */
  SP.PHOTOS = {"a10": ["1665856999901-180960454ceb", "Xn2RHH92TBE", "Pasqualino Capobianco"], "a12": ["1597111556393-7c103b4bce20", "eG-Zc-R2REc", "Nihon Graphy"], "a14": ["1565534271200-2b76c39be938", "DXPievyRkK0", "Philipp Katzenberger"], "a15": ["1612368764459-0446df792e36", "ge8Cs-Kd_vM", "Albert Vincent Wu"], "a16": ["1471174617910-3e9c04f58ff5", "ovrOPhu8vSw", "Oliur"], "a9": ["1665858355875-3d9a585166b9", "7NOxuLzoOpA", "Pasqualino Capobianco"], "c0": ["1624085568108-36410cfe4d24", "GfA_3_hLUNA", "Alexis AMZ DA CRUZ"], "c1": ["1625690096555-a0a4d190901c", "8hxq0T0WLTQ", "Benjamin Zhao"], "c10": ["1739644246940-6c6108a20dfb", "CBSX3rMJdFo", "T. Hoffmann"], "c11": ["1551836989-b4622a17a792", "xt74g8vni58", "Andre Ouellet"], "c13": ["1616874946786-787aed76ba0d", "7mOMiK5TNCs", "June Andrei George"], "c14": ["1623927932009-9d23724d77eb", "yIxzF7TZ8kc", "Alexis AMZ DA CRUZ"], "c18": ["1605330757549-67b5021634ba", "ps5dQwktxXc", "VIRUL"], "c19": ["1536842924721-5855afcf5bd5", "OfzBQ4Qvv9s", "Daen van Beers"], "c3": ["1625690180114-5530b1304127", "5DremXTTKE0", "Benjamin Zhao"], "c5": ["1657687556560-8f1226cf52b2", "avsomwy3gjg", "Shubham Sharan"], "c6": ["1686562483617-3cf08d81e117", "32DO2xptbp8", "Mr Dibo"], "c7": ["1735541855773-a787dea1bd36", "f55jjjO0rX4", "Rana Singh"], "c9": ["1739644246928-f4f96c5d9afc", "uXcBGA252J0", "T. Hoffmann"], "e1": ["1688054004259-4afed16cea8b", "Oa5FamQqWQ8", "Martin Baron"], "e10": ["1785734297457-c49d012ea529", "3pVEP6BvYvE", "Zion C"], "e17": ["1669023161442-bb13d1f2e492", "XY3oWAtQVoU", "Asawin Phunphairoj"], "e19": ["1633102072085-832b54f9709c", "N255Ip4f_5M", "Deniz Demirci"], "e21": ["1774411679135-187f3c4b81b6", "ybaHOUVkLXs", "hemantha varma"], "e22": ["1660108352270-c43e077e1dea", "oD7NGtJdnyA", "Jass (akajassd) Hernandez"], "e23": ["1660108354003-5729e760de06", "4VsPpOUwEVk", "Jass (akajassd) Hernandez"], "g1": ["1732347700505-e1231e0f7c94", "w5HkSArtyow", "Lukáš Parničan"], "g12": ["1684239784136-324d4d6d4e90", "HaqGejTTBAk", "Александр Бендус"], "g13": ["1692970096012-599b1d7c62c0", "MdaopO-wDXI", "Václav Pechar"], "g14": ["1684239757561-2ddb0817ca68", "-kh3K4mLN3o", "Александр Бендус"], "g16": ["1684239717646-34897497b66c", "lewR_WBj_Qw", "Александр Бендус"], "g18": ["1616702487738-3731989fcc54", "sE5F7Hd1BU4", "Haidong Liang"], "g3": ["1684239725236-5f3b6e9f02c3", "c6RAUFIoDsY", "Александр Бендус"], "g5": ["1669221817458-63a3da4ddecb", "suYT1tHhRIA", "Dekler Ph"], "g6": ["1638980707800-8f6d3fce4598", "WKFdtZah6lk", "Saurabh Yadav"], "g7": ["1692970095410-6bd548fc7f6c", "MyidPsXdKUU", "Václav Pechar"], "g8": ["1616874946767-fc90e3495f91", "LR05tfYX1k8", "June Andrei George"], "s0": ["1619221496652-7ee3d7406203", "MllJgoAFTcE", "Mark Tryapichnikov"], "s1": ["1661589997089-405a6076fc18", "341Jd6-foKo", "Mikolaj Górzyński"], "s14": ["1639060015856-a0f542108ba6", "pLQbrGZDEaY", "Christian Wiediger"], "s18": ["1723075472832-1f2313c90acc", "VZdIJIRjvIY", "Angelina Kusznirewicz"], "s3": ["1680451553374-09d8d6a1ca58", "ZmcOEbW3hDg", "Dekler Ph"], "s6": ["1680446983373-853872fb667a", "iuLTK-vzcmE", "Dekler Ph"], "s7": ["1639060015191-57b7c025941d", "DnUbTwfOX0g", "Christian Wiediger"], "s9": ["1710343491609-0cbc6c14b92d", "CTHf0y5NXP0", "Romain Water"], "w14": ["1651049413978-3f18a21a4771", "PrD-ocyzzZ8", "Mr Dibo"], "w23": ["1660108197864-eb219c5af538", "FQsvOOGEvQw", "Jass (akajassd) Hernandez"], "x0": ["1648413653877-ade5eefd2f1b", "xZJ6uV5F4_k", "D Panyukov"], "x10": ["1592860585388-1c9bdff4e765", "l52z-MuTr88", "Alex Haney"], "x12": ["1618843479313-40f8afb4b4d8", "8qYE6LGHW-c", "Aaron Huber"], "x17": ["1599767958551-276fcac34484", "9PBJr66VJwU", "Gabor Papp"], "x20": ["1646194314870-6e25f74e6e60", "tSaU0LdGh9c", "Jason Pineda"], "x7": ["1756704756051-9aa48231c440", "1swhdtw6Aho", "Rana Singh"], "y13": ["1765461734605-34657fa04db2", "PNW4oeltJGo", "William G"], "y4": ["1659671026898-b4b7f9eda35e", "Tqtwr2h5f4A", "Philip Blank"], "y9": ["1659671026909-ff35c71cfac9", "EmeFHFlypQE", "Philip Blank"], "z10": ["1688619104878-1f5bc6293785", "1BbFInFW1Hc", "Negley Stockman"], "z11": ["1688619104633-b05bc632aca7", "3TUJNkRpIx4", "Negley Stockman"], "z12": ["1628347496893-fa6ad6769952", "SurEc8CZNtQ", "Baptiste Buisson"], "z4": ["1688619102678-918f9e9313e6", "U6JQB2lT6YQ", "Negley Stockman"], "z6": ["1688619103078-ffe42d3642b7", "uaN8ZzXyj58", "Negley Stockman"], "z9": ["1688619103182-b431507f6a59", "BwtJ_JlCi3Q", "Negley Stockman"]};
  SP.PHOTO_MAP = {"26101": ["g6", "g8", "g12"], "26102": ["c1", "c3", "c13"], "26103": ["z12", "y13"], "26104": ["z4", "z6", "z9"], "26105": ["c6", "c19"], "26106": ["g13", "g1"], "26107": ["c11", "c3"], "26108": ["c10", "c9", "c19"], "24109": ["y4", "y9"], "26110": ["g3", "g14", "g16"], "25111": ["s1", "s3", "s7"], "26112": ["s18", "s9", "s14"], "26113": ["x0", "x7", "x10"], "26114": ["a9", "a16"], "26115": ["e17", "e21", "e19"], "24116": ["a10", "a16"], "23117": ["g7", "g1"], "25118": ["w14", "w23"], "25119": ["g5", "g1"], "23120": ["e1"], "26121": ["a12", "w23"], "26122": ["e23", "e22", "w23"], "22123": ["e10", "c3"], "25124": ["c14", "c0", "s7"], "26125": ["c18", "c7"], "23126": ["g18", "g16"], "26127": ["c5", "c7"], "26128": ["z10", "z11", "z9"], "22129": ["x17", "x12", "x20"], "25130": ["y13"], "26131": ["a15", "a14"], "22132": ["s6", "s0", "s14"]};
  SP.TILE_PHOTOS = {"sedan": "s1", "suv": "g6", "estate": "e1", "hatch": "a9", "coupe": "c18", "cabrio": "y4", "van": "z12"};
  SP.ph = (k, w, h) => SP.PHOTOS[k] ? 'https://images.unsplash.com/photo-' + SP.PHOTOS[k][0] + '?auto=format&fit=crop&q=72&w=' + w + (h ? '&h=' + h : '') : '';
  SP.STOCK.forEach(v => { v.photos = SP.PHOTO_MAP[v.id.slice(3)] || []; });

  /* ---------- equipment (from DMS vehicle equipment list) ---------- */
  const EQ_BASE = [R('Sistem multimedia MBUX', 'MBUX multimedia system'), R('Faruri LED High Performance', 'LED High Performance headlamps'), R('Apple CarPlay & Android Auto', 'Apple CarPlay & Android Auto'), R('Climatizare automată THERMATIC', 'THERMATIC automatic climate control'),
    R('Asistent activ de menținere a benzii', 'Active Lane Keeping Assist'), R('Asistent activ de frânare', 'Active Brake Assist'), R('Cameră marșarier', 'Reversing camera'), R('Senzori parcare față-spate', 'Parking sensors front & rear'), R('Volan sport multifuncțional din piele', 'Leather multifunction sports steering wheel'),
    R('Încărcare wireless smartphone', 'Wireless smartphone charging'), R('KEYLESS-GO Start', 'KEYLESS-GO start function'), R('Lumină ambientală 64 culori', '64-colour ambient lighting'), R('Sistem de apel de urgență Mercedes-Benz', 'Mercedes-Benz emergency call system'), R('Servicii Mercedes me connect', 'Mercedes me connect services')];
  const EQ_PLUS = [R('Pachet parcare cu cameră 360°', 'Parking package with 360° camera'), R('Realitate augmentată MBUX pentru navigație', 'MBUX augmented reality navigation'), R('Head-up display', 'Head-up display'), R('Scaune față încălzite', 'Heated front seats'), R('Pachet memorie scaune', 'Seat memory package'),
    R('Faruri DIGITAL LIGHT', 'DIGITAL LIGHT headlamps'), R('Sistem audio Burmester® surround', 'Burmester® surround sound system'), R('Trapă panoramică', 'Panoramic sliding sunroof'), R('Pachet confort KEYLESS-GO', 'KEYLESS-GO comfort package'), R('DISTRONIC – pilot automat cu distanță', 'Active Distance Assist DISTRONIC'),
    R('Asistent unghi mort', 'Blind Spot Assist'), R('Suspensie adaptivă cu amortizare reglabilă', 'Adaptive damping suspension'), R('Jante aliaj AMG 20"', '20" AMG light-alloy wheels'), R('Ornamente lemn de stejar antracit', 'Anthracite open-pore oak trim'), R('Pachet AMG Night', 'AMG Night Package'), R('Cârlig de remorcare cu ESP', 'Towbar with ESP trailer stabilisation')];
  const EQ_EV = [R('Încărcare AC 11 kW / DC 200 kW', 'AC 11 kW / DC 200 kW charging'), R('Pompă de căldură', 'Heat pump'), R('Navigație cu Electric Intelligence', 'Navigation with Electric Intelligence'), R('Pre-climatizare din aplicație', 'Pre-entry climate control via app')];
  const EQ_LUX = [R('Scaune ventilate și cu masaj', 'Ventilated massage seats'), R('Suspensie pneumatică AIRMATIC', 'AIRMATIC air suspension'), R('Direcție integrală spate', 'Rear-axle steering'), R('Piele Nappa', 'Nappa leather'), R('Uși cu închidere asistată', 'Soft-close doors'), R('Pachet ENERGIZING', 'ENERGIZING package')];
  const EQ_VAN = [R('Uși culisante electrice stânga-dreapta', 'Power sliding doors both sides'), R('Scaune individuale în spate', 'Rear individual seats'), R('Cameră marșarier', 'Reversing camera'), R('Climatizare spate', 'Rear climate control'), R('MBUX cu ecran 10,25"', 'MBUX with 10.25" display'), R('Asistent vânt lateral', 'Crosswind Assist'), R('DISTRONIC', 'DISTRONIC'), R('Faruri LED', 'LED headlamps')];
  SP.equipment = v => {
    if (v.body === 'van') return EQ_VAN.concat(v.type === 'lcv' ? [R('Pereți laterali protejați', 'Load-space side panelling'), R('Puncte de ancorare marfă', 'Load-securing rails')] : [R('Masă rabatabilă', 'Folding table'), R('Lumină ambientală', 'Ambient lighting')]);
    const lux = v.price > 95000, mid = v.price > 50000;
    let l = EQ_BASE.slice();
    l = l.concat(EQ_PLUS.slice(0, lux ? 16 : mid ? 11 : 5));
    if (v.fuel === 'electric' || v.fuel === 'phev') l = l.concat(EQ_EV.slice(0, v.fuel === 'electric' ? 4 : 2));
    if (lux) l = l.concat(EQ_LUX);
    return l;
  };

  /* ---------- Mercedes-Benz range (snapshot of mercedes-benz.ro/passengercars/models.html, Oct 2026) ----------
     Clicking a model opens the official overview page on mercedes-benz.ro. */
  const MBRO = 'https://www.mercedes-benz.ro/passengercars/models/';
  const M = (g, brand, name, fuels, price, path, o) => Object.assign({ g, brand, name, fuels, price, url: MBRO + path }, o || {});
  SP.RANGE_GROUPS = [
    ['sedan', R('Limuzină', 'Saloon')], ['suv', R('SUV & Autovehicule de teren', 'SUV & Off-roader')], ['estate', R('T-Modell / Shooting Brake', 'Estate / Shooting Brake')],
    ['hatch', R('Compact', 'Compact')], ['coupe', R('Coupé', 'Coupé')], ['cabrio', R('Cabriolet și Roadster', 'Cabriolet & Roadster')], ['grand', R('Grand Limousine', 'Grand Limousine')], ['van', R('Monovolum', 'MPV')]
  ];
  SP.RANGE = [
    M('sedan', 'mb', 'CLA Coupé cu tehnologie EQ', ['electric'], 47870, 'saloon/cla-electric/overview.html', { isNew: 1, fam: 'cla-electric' }),
    M('sedan', 'mb', 'CLA Coupé', ['petrol'], 42970, 'saloon/cla/overview.html', { isNew: 1, fam: 'cla' }),
    M('sedan', 'amg', 'Mercedes-AMG CLA Coupé electric', ['electric'], 78099.99, 'saloon/cla-electric/amg.html', { isNew: 1 }),
    M('sedan', 'mb', 'Clasa C Limuzină cu tehnologie EQ', ['electric'], 59290, 'saloon/c-class-electric/overview.html', { isNew: 1, fam: 'c-electric' }),
    M('sedan', 'mb', 'Clasa C Limuzină', ['petrol', 'diesel', 'phev'], 46590, 'saloon/c-class/overview.html', { fam: 'c' }),
    M('sedan', 'mb', 'EQS Limuzină', ['electric'], 120879, 'saloon/eqs/overview.html', { fam: 'eqs' }),
    M('sedan', 'mb', 'Clasa E Limuzină', ['petrol', 'diesel', 'phev'], 62800, 'saloon/e-class/overview.html', { fam: 'e' }),
    M('sedan', 'amg', 'Mercedes-AMG E 53 HYBRID Limuzină', ['phev'], 116550.01, 'saloon/e-class/amg.html'),
    M('sedan', 'mb', 'Clasa S Limuzină', ['petrol', 'diesel', 'phev'], 120160.01, 'saloon-long/s-class/overview.html', { isNew: 1, fam: 's' }),
    M('sedan', 'maybach', 'Mercedes-Maybach Clasa S', ['petrol', 'phev'], 201950, 'saloon-long/mercedes-maybach-s-class/overview.html', { fam: 'maybach-s' }),

    M('suv', 'maybach', 'Mercedes-Maybach EQS SUV', ['electric'], 215740, 'suv/maybach-eqs/overview.html'),
    M('suv', 'mb', 'Noul GLA', ['petrol', 'electric'], null, 'suv/new/gla.html', { isNew: 1, soon: 1 }),
    M('suv', 'amg', 'Noul Mercedes-AMG GT SUV', ['electric'], null, 'suv/new/amg-gt-suv.html', { isNew: 1, soon: 1 }),
    M('suv', 'mb', 'GLA', ['petrol', 'diesel', 'phev'], 44790, 'suv/gla/overview.html', { fam: 'gla' }),
    M('suv', 'mb', 'GLA cu tehnologie EQ', ['electric'], 49120, 'suv/gla-electric/overview.html'),
    M('suv', 'mb', 'GLB cu tehnologie EQ', ['electric'], 51450, 'suv/glb-electric/overview.html', { isNew: 1, fam: 'glb-electric' }),
    M('suv', 'mb', 'GLB', ['petrol', 'diesel'], 48280, 'suv/glb/overview.html', { isNew: 1, fam: 'glb' }),
    M('suv', 'mb', 'GLC SUV cu tehnologie EQ', ['electric'], 59900, 'suv/glc-electric/overview.html', { isNew: 1, fam: 'glc-electric' }),
    M('suv', 'mb', 'GLC SUV', ['petrol', 'diesel', 'phev'], 60650, 'suv/glc/overview.html', { fam: 'glc' }),
    M('suv', 'amg', 'Mercedes-AMG GLC SUV', ['petrol', 'phev'], 89929.62, 'suv/glc/amg.html'),
    M('suv', 'mb', 'GLC Coupé', ['petrol', 'diesel', 'phev'], 64310, 'suv/glc-coupe/overview.html', { fam: 'glc-coupe' }),
    M('suv', 'amg', 'Mercedes-AMG GLC Coupé', ['petrol', 'phev'], 92470, 'suv/glc-coupe/amg.html'),
    M('suv', 'mb', 'GLE SUV', ['petrol', 'diesel', 'phev'], 91840, 'suv/gle/overview.html', { fam: 'gle' }),
    M('suv', 'amg', 'Mercedes-AMG GLE SUV', ['petrol', 'phev'], 114830, 'suv/gle/amg.html'),
    M('suv', 'mb', 'GLE Coupé', ['diesel', 'phev'], 99100, 'suv/gle-coupe/overview.html', { fam: 'gle-coupe' }),
    M('suv', 'amg', 'Mercedes-AMG GLE Coupé', ['petrol', 'phev'], 120880, 'suv/gle-coupe/amg.html'),
    M('suv', 'mb', 'GLS SUV', ['petrol', 'diesel'], 109990.21, 'suv/gls/overview.html', { fam: 'gls' }),
    M('suv', 'amg', 'Mercedes-AMG GLS', ['petrol'], 192880, 'suv/gls/amg.html'),
    M('suv', 'maybach', 'Mercedes-Maybach GLS', ['petrol'], 201830, 'suv/maybach-gls/overview.html'),
    M('suv', 'mb', 'Clasa G cu tehnologie EQ', ['electric'], 148380, 'suv/g-class-electric/overview.html'),
    M('suv', 'mb', 'Clasa G', ['diesel'], 138900, 'suv/g-class/overview.html', { fam: 'g' }),
    M('suv', 'amg', 'Mercedes-AMG G 63', ['petrol'], 210740, 'suv/g-class/amg.html', { fam: 'g' }),

    M('estate', 'mb', 'CLA Shooting Brake cu tehnologie EQ', ['electric'], 49260, 'estate/cla-shooting-brake-electric/overview.html', { isNew: 1 }),
    M('estate', 'mb', 'CLA Shooting Brake', ['petrol'], 44360, 'estate/cla-shooting-brake/overview.html', { isNew: 1, fam: 'cla-sb' }),
    M('estate', 'amg', 'Mercedes-AMG CLA Shooting Brake electric', ['electric'], 79250, 'estate/cla-shooting-brake-electric/amg.html', { isNew: 1 }),
    M('estate', 'mb', 'Clasa C T-Modell', ['petrol', 'diesel', 'phev'], 48160, 'estate/c-class/overview.html', { fam: 'c-estate' }),
    M('estate', 'mb', 'Clasa E T-Modell', ['petrol', 'diesel', 'phev'], 65350.01, 'estate/e-class/overview.html', { fam: 'e-estate' }),
    M('estate', 'mb', 'Clasa E All-Terrain', ['diesel'], 78230, 'estate/e-class/overview.html#all-terrain', { fam: 'e-estate' }),
    M('estate', 'amg', 'Mercedes-AMG E 53 HYBRID T-Modell', ['phev'], 120330, 'estate/e-class/amg.html'),

    M('hatch', 'mb', 'Clasa A Compactă', ['petrol', 'diesel', 'phev'], 37370, 'hatchback/a-class/overview.html', { fam: 'a' }),
    M('hatch', 'amg', 'Mercedes-AMG A 35 Compactă', ['petrol'], 59140, 'hatchback/a-class/amg.html'),

    M('coupe', 'mb', 'CLE Coupé', ['petrol', 'diesel'], 59540, 'coupe/cle/overview.html', { fam: 'cle-coupe' }),
    M('coupe', 'amg', 'Mercedes-AMG CLE Coupé', ['petrol'], 92950, 'coupe/cle/amg.html', { fam: 'cle-coupe' }),
    M('coupe', 'amg', 'Mercedes-AMG GT Coupé', ['petrol', 'phev'], 127770, 'coupe/amg-gt-2-door/overview.html'),
    M('coupe', 'amg', 'Mercedes-AMG GT 4 uși Coupé', ['petrol', 'phev'], 118280, 'coupe/amg-gt-4-door/overview.html', { fam: 'amg-gt-4' }),

    M('cabrio', 'mb', 'CLE Cabriolet', ['petrol', 'diesel'], 68260, 'cabriolet-roadster/cle/overview.html', { fam: 'cle-cabrio' }),
    M('cabrio', 'amg', 'Mercedes-AMG CLE Cabriolet', ['petrol'], 102330, 'cabriolet-roadster/cle/amg.html'),
    M('cabrio', 'amg', 'Mercedes-AMG SL', ['petrol', 'phev'], 136950, 'cabriolet-roadster/sl/overview.html'),
    M('cabrio', 'maybach', 'Mercedes-Maybach SL', ['petrol'], 274428.99, 'cabriolet-roadster/mercedes-maybach-sl/overview.html'),

    M('grand', 'mb', 'VLE', ['electric'], 76539.76, 'grand-limousine/vle/overview.html', { isNew: 1 }),

    M('van', 'mb', 'Clasa V', ['diesel'], 63623.01, 'van/v-class/overview.html', { fam: 'v' }),
    M('van', 'mb', 'Marco Polo', ['diesel'], 92614.61, 'van/marco-polo/overview.html'),
    M('van', 'mb', 'Marco Polo HORIZON', ['diesel'], 81665.32, 'van/marco-polo-horizon/overview.html')
  ];
  /* car silhouette shape per range group */
  /* model images: the official sharing / model-overview images, loaded directly from mercedes-benz.ro (same source as the listing) */
  const MB_IMG = {"cabriolet-roadster/cle/amg.html": "cle/cle-cabriolet-a236-pi/modeloverview/01-2024/images/mercedes-amg-cle-cabriolet-a236-model-overview-696x392-01-2024.png", "cabriolet-roadster/cle/overview.html": "cle/cle-cabriolet-a236-pi/modeloverview/10-2023/images/mercedes-benz-cle-a236-modeloverview-696x392-10-2023.png", "cabriolet-roadster/mercedes-maybach-sl/overview.html": "sl/mercedes-maybach-sl-z232-pi/modeloverview/10-2024/images/mercedes-maybach-sl-z232-modeloverview-696x392-10-2024.png", "cabriolet-roadster/sl/overview.html": "sl/sl-roadster-r232-pi/modeloverview/11-2022/images/mercedes-amg-sl-r232-modeloverview-696x392-11-2022.png", "coupe/amg-gt-2-door/overview.html": "amg-gt/amg-gt-2-doors-coupe-c192/modeloverview/07-2023/images/mercedes-amg-gt-c192-modeloveroview-696x392-07-2023.png", "coupe/amg-gt-4-door/overview.html": "amg-gt/amg-gt-4-door-coupe-c590/pad/modeloverview/03-2026/images/mercedes-amg-gt-coupe-c590-pad-sharing-image-696x392-03-2026.png", "coupe/cle/amg.html": "cle/cle-coupe-c236-pi/modeloverview/11-2023/images/mercedes-amg-cle-coupe-53-modeloverview-696x392-11-2023.png", "coupe/cle/overview.html": "cle/cle-coupe-c236-pi/modeloverview/06-2023/images/mercedes-benz-cle-coupe-c236-model-overview-696x392-06-2023.png", "estate/c-class/overview.html": "c-class/c-class-estate-s206-fl/spa-highlights/06-2026/images/mercedes-benz-c-class-s206-spa-og-image-696x392-06-2026.png", "estate/cla-shooting-brake-electric/amg.html": "cla/cla-shooting-brake-x174-pi/amg-pad/modeloverview/05-2026/images/mercedes-amg-cla-x174-modeloverview-696x392-05-2026.png", "estate/cla-shooting-brake-electric/overview.html": "cla/cla-shooting-brake-x174-pi/modeloverview/07-2025/images/mercedes-benz-cla-x174-modeloverview-696x392-07-2025.png", "estate/cla-shooting-brake/overview.html": "cla/cla-shooting-brake-x178-pi/modeloverview/05-2025/images/mercedes-benz-cla-shooting-brake-x178-model-overview-696x392-05-2025.png", "estate/e-class/amg.html": "e-class/e-class-estate-s214-pi/modeloverview/mercedes-amg-e-class-estate-s214-model-overview-696x392-02-2024.png", "estate/e-class/overview.html": "e-class/e-class-estate-s214-pi/modeloverview/mercedes-benz-e-class-estate-s214-model-overview-696x392-06-2023.png", "estate/e-class/overview.html#all-terrain": "e-class/e-class-estate-s214-pi/modeloverview/mercedes-benz-e-class-estate-s214-model-overview-696x392-06-2023.png", "grand-limousine/vle/overview.html": "vle/story-page/mercedes-benz-vle_amg-line-plus1280x960.jpg", "hatchback/a-class/amg.html": "a-class/hatchback-w177-fl-pi/modeloverview/08-2022/images/mercedes-amg-a-class-w177-modeloverview-696x392-08-2022.png", "hatchback/a-class/overview.html": "a-class/hatchback-w177-fl-pi/modeloverview/08-2023/images/mercedes-benz-a-class-w177-696x392-08-2023.png", "saloon-long/mercedes-maybach-s-class/overview.html": "s-class/mercedes-maybach-s-class-z223-fl-pi/pad/modeloverview/11-2025/images/mercedes-maybach-s-class-z223-fl-pad-model-overview-696x392-11-2025.png", "saloon-long/s-class/overview.html": "s-class/s-class-saloon-long-v223fl-pi/modeloverview/01-2026/mercedes-benz-s-class-v223-fl-pad-model-overview-696x392-01-2026.png", "saloon/c-class-electric/overview.html": "c-class/c-class-saloon-w520/og-image/03-2026/images/mercedes-benz-c-class-w520-model-overview-696x392-03-2026.png", "saloon/c-class/overview.html": "c-class/c-class-saloon-w206-fl/spa-highlights/06-2026/images/mercedes-benz-c-class-w206-spa-og-image-696x392-06-2026.png", "saloon/cla-electric/amg.html": "cla/cla-saloon-c174-pi/amg-pad/og-image/05-2026/images/mercedes-amg-cla-c174-pad-og-image-696x392-05-2026.png", "saloon/cla-electric/overview.html": "cla/cla-saloon-c174-pi/modeloverview/04-2025/images/mercedes-benz-cla-c174-model-overview-696x392-04-2025.png", "saloon/cla/overview.html": "cla/c178/model-overview/07-2025/images/mercedes-benz-cla-c178-og-image-696x392-07-2025.png", "saloon/e-class/overview.html": "e-class/e-class-saloon-w214-pi/modeloverview/02-2023/images/mercedes-benz-e-class-w214-modeloverview-696x392-02-2023.jpg", "saloon/eqs/overview.html": "eqs/eqs-saloon-v297-fl/clp/modeloverview/02-2026/images/mercedes-benz-eqs-saloon-v297fl-clp-sharing-image-696x392-02-2026.png", "suv/g-class-electric/overview.html": "g-class/n465-pi/modeloverview/02-2026/images/mercedes-benz-g-class-n465-sharing-image-696x392-02-2026.png", "suv/g-class/amg.html": "g-class/w465-pi/amg/modeloverview/02-2024/images/mercedes-amg-g-class-w456-model-overview-696x392-02-2024.png", "suv/g-class/overview.html": "g-class/w465-pi/modeloverview/03-2024/images/mercedes-benz-g-class-w465-modeloverview-696x392-03-2024.png", "suv/gla-electric/overview.html": "gla/gla-h244/modeloverview/06-2026/images/mercedes-benz-gla-h244-model-overview-696x392-06-2026.png", "suv/gla/overview.html": "gla/gla-suv-h247-fl-pi/modeloverview/03-2023/images/mercedes-gla-h247-modeloverview-696x392-03-2023.png", "suv/glb-electric/overview.html": "glb/glb-suv-x244-pi/pad/modeloverview/12-2025/images/mercedes-benz-glb-x244-bev-modeloverview-696x392-12-2025.png", "suv/glb/overview.html": "glb/glb-suv-x248-pi/pad/modeloverview/10-2025/images/mercedes-benz-glb-x248-ice-pad-sharing-image-696x392-10-2025.png", "suv/glc-coupe/amg.html": "glc/glc-coupe-c254-fl-pi/modeloverview/08-2023/images/mercedes-amg-glc-coupe-c254-modeloverview-696x392-08-2023.png", "suv/glc-coupe/overview.html": "glc/glc-coupe-c254-fl-pi/modeloverview/04-2023/images/mercedes-benz-glc-coupe-c254-modeloverview-696x392-04-2023.png", "suv/glc-electric/overview.html": "glc/glc-suv-x540-pi/pad/model-overview/07-2025/images/mercedes-benz-glc-x540-pad-model-overview-696x392-07-2025.png", "suv/glc/amg.html": "glc/glc-suv-x254-fl-pi/modeloverview/03-2023/images/mercedes-amg-glc-suv-x254-modeloverview-696x392-03-2023.png", "suv/glc/overview.html": "glc/suv-x254/modeloverview/images/mercedes-benz-glc-suv-x254-modeloverview-696x392-05-2022.png", "suv/gle-coupe/overview.html": "gle/gle-coupe-c167-fl-pi/modeloverview/03-2026/images/mercedes-benz-gle-coupe-c167-modeloverview-696x392-03-2026.png", "suv/gle/amg.html": "gle/gle-suv-v167-fl-pi/amg-63-pad/modeloverview/05-2026/images/mercedes-amg-gle-v167-63-modeloverview-696x392-05-2026.png", "suv/gle/overview.html": "gle/gle-suv-v167-fl-pi/pad/model-overview/01-2026/images/mercedes-benz-gle-suv-v167-modeloverview-696x392-01-2026.png", "suv/gls/amg.html": "gls/gls-suv-x167-fl-pi/amg-spa/og-image/07-2026/images/mercedes-amg-gls-x167-spa-og-image-696x392-07-2026.png", "suv/gls/overview.html": "gls/gls-suv-x167-fl-pi/modeloverview/02-2026/images/mercedes-benz-gls-x167-ice-pad-sharing-image-696x392-02-2026.png", "suv/maybach-eqs/overview.html": "mercedes-maybach/mercedes-maybach-eqs-suv-z296/modeloverview/03-2023/images/mercedes-maybach-eqs-suv-z296-modeloverview-693x392-03-2023.png", "suv/maybach-gls/overview.html": "gls/maybach-gls-x167-fl-2026-pi/og-image/02-2026/images/mercedes-maybach-gls-x167-spa-og-image-696x392-06-2026.png", "suv/new/amg-gt-suv.html": "amg-gt/amg-gt-suv-x591/pad/modeloverview/07-2026/images/mercedes-amg-gt-suv-x591-pad-og-image-696x392-07-2026.png", "suv/new/gla.html": "gla/gla-h248/og-image/06-2026/images/mercedes-benz-gla-h248-pad-og-image-696x392-06-2026.png", "van/marco-polo-horizon/overview.html": "v-class-marco-polo-horizon-(cy-24-2)/24c0219_004.jpg", "van/marco-polo/overview.html": "v-class-marco-polo-(cy-24-1)/24c0214_004.jpg", "van/v-class/overview.html": "v-class-(cy-24-2)/overview/V-Class-Exclusive_24C0047_04.jpg"};
  SP.RANGE.forEach(m => { const k = m.url.replace(MBRO, ''); const alt = { 'saloon/e-class/amg.html': 'saloon/e-class/overview.html', 'suv/gle-coupe/amg.html': 'suv/gle-coupe/overview.html' }[k]; if (MB_IMG[k] || alt) m.img = 'https://www.mercedes-benz.ro/content/dam/hq/passengercars/cars/' + (MB_IMG[k] || MB_IMG[alt]); });
  SP.RANGE.forEach(m => { m.shape = m.g === 'grand' ? 'van' : (/Clasa G|G 63/.test(m.name) ? 'g' : (/SL\b/.test(m.name) ? 'cabrio' : (/GT Coupé$/.test(m.name) ? 'coupe' : (m.g === 'suv' && /Coupé/.test(m.name) ? 'suvc' : m.g)))); });

  /* ---------- offers (CMS) ---------- */
  SP.OFFERS = [
    { id: 'eq-140', cat: 'cars', img: 'assets/img/campanie.webp', badge: '1,40%', featured: 1, tag: R('Electric EQ', 'Electric EQ'),
      title: R('Dobândă fixă 1,40% la CLA, GLC și GLB electrice', '1.40% fixed rate on electric CLA, GLC & GLB'), lead: R('Finanțare Mercedes-Benz Financial Services cu dobândă fixă pentru modelele complet electrice comandate până la final de an.', 'Mercedes-Benz Financial Services finance at a fixed rate for all-electric models ordered by year end.'), valid: '2026-12-31' },
    { id: 'c-leasing', cat: 'cars', img: 'assets/img/dobanda_o.webp', badge: '0%', tag: R('Auto nou', 'New car'),
      title: R('Leasing 0% avans la Clasa C', '0% down lease on the C-Class'), lead: R('Pachet leasing cu dobândă fixă și prima rată amânată 90 de zile.', 'Lease package with fixed rate and first instalment deferred 90 days.'), valid: '2026-12-31' },
    { id: 'eqe-bonus', cat: 'cars', img: 'assets/img/eqe2.webp', badge: '−5.000 €', tag: R('Stoc EQ', 'EQ stock'),
      title: R('Bonus 5.000 € la modelele EQ din stoc', '€5,000 bonus on EQ stock models'), lead: R('Reducere directă la vehiculele electrice disponibile imediat în showroom.', 'Direct discount on electric vehicles available now in the showroom.'), valid: '2026-11-30' },
    { id: 'winter', cat: 'service', img: 'assets/img/anvelope.webp', badge: '−25%', tag: R('Service', 'Service'),
      title: R('Pachet revizie de iarnă', 'Winter service package'), lead: R('Verificare în 30 de puncte, schimb anvelope și diagnoză — preț fix, cu programare online.', '30-point check, tyre change and diagnostics — fixed price, book online.'), valid: '2026-12-31' },
    { id: 'tyres', cat: 'parts', img: 'assets/img/roata.webp', badge: R('GRATUIT', 'FREE'), tag: R('Anvelope', 'Tyres'),
      title: R('Anvelope de iarnă MO cu montaj gratuit', 'MO winter tyres with free fitting'), lead: R('Set complet de anvelope omologate Mercedes-Benz (marcaj MO) cu montaj și echilibrare incluse.', 'Full set of Mercedes-Benz approved (MO) tyres with fitting and balancing included.'), valid: '2026-12-31' },
    { id: 'wallbox', cat: 'parts', img: 'assets/img/statie.webp', badge: '−20%', tag: R('Accesorii', 'Accessories'),
      title: R('−20% la Mercedes-Benz Wallbox', '−20% on the Mercedes-Benz Wallbox'), lead: R('Stație de încărcare 22 kW pentru acasă, cu instalare prin partenerii noștri.', '22 kW home charging station, installed by our partners.'), valid: '2026-12-31' },
    { id: 'brakes', cat: 'parts', img: 'assets/img/placute.webp', badge: '−15%', tag: R('Piese', 'Parts'),
      title: R('Plăcuțe + discuri la preț de set', 'Pads + discs at set price'), lead: R('Kit frânare original cu reducere la achiziția împreună cu montajul.', 'Genuine brake kit discounted when bought with fitting.'), valid: '2026-12-31' }
  ];

  /* ---------- parts showcase (e-shop comes later) ---------- */
  SP.PARTS = [
    { id: 'p1', cat: R('Ulei & filtre', 'Oil & filters'), img: 'assets/img/ulei.webp', name: R('Ulei motor Mercedes-Benz 5W-30, 5 L', 'Mercedes-Benz 5W-30 engine oil, 5 L'), ref: 'A 000 989 70 06 13', price: 79, note: R('Specificație MB 229.52', 'MB spec 229.52') },
    { id: 'p2', cat: R('Frânare', 'Brakes'), img: 'assets/img/brebo.webp', name: R('Disc frână ventilat perforat', 'Ventilated cross-drilled brake disc'), ref: 'A 000 421 07 12', price: 168, note: R('Axa față, Clasa C / E', 'Front axle, C / E-Class') },
    { id: 'p3', cat: R('Frânare', 'Brakes'), img: 'assets/img/placute.webp', name: R('Set plăcuțe frână', 'Brake pad set'), ref: 'A 213 423 38 00', price: 142, note: R('Axa spate, cu senzor de uzură', 'Rear axle, with wear sensor') },
    { id: 'p4', cat: R('Accesorii', 'Accessories'), img: 'assets/img/frana.webp', name: R('Set covorașe cauciuc CLASSIC', 'CLASSIC rubber floor mats'), ref: 'A 223 680 31 03', price: 96, note: R('Rând 1, negru', 'Row 1, black') },
    { id: 'p5', cat: R('Anvelope', 'Tyres'), img: 'assets/img/roata.webp', name: R('Anvelopă iarnă 245/45 R19 MO', 'Winter tyre 245/45 R19 MO'), ref: 'Q 440 141 21 64', price: 238, note: R('Omologată Mercedes-Benz', 'Mercedes-Benz approved') },
    { id: 'p6', cat: R('Încărcare', 'Charging'), img: 'assets/img/statie.webp', name: R('Mercedes-Benz Wallbox 22 kW', 'Mercedes-Benz Wallbox 22 kW'), ref: 'A 000 900 89 18', price: 1290, note: R('Cablu 5 m inclus', '5 m cable included') }
  ];
})(window.SP);
