# Sales Partner · Mercedes-Benz — Dealer website POC

An interactive HTML proof-of-concept for an authorised **Mercedes-Benz** dealer network with four locations: București, Timișoara, Arad and Cluj-Napoca.

- **Design:** follows the dealer sample design (C&I and font).
- **Content:** inspired by the Aliat and Autoklass stock listings.
- **Models page:** a wrapper of the official mercedes-benz.ro models listing.
- **Purpose:** validate design and flows with the client, and serve as the reference for the CakePHP 4 implementation.

> **Demo only.** Dealer data, people, stock, VINs and offers are fictional.
> The model list and the "Începând de la" prices on **Modele** are a snapshot of mercedes-benz.ro/passengercars/models.html (October 2026).

## Run it

- **Locally:** double-click `index.html`, or serve the folder. No build step is needed.
- **Vercel:**
  - Repo: `xeatra/dealerwebsite`
  - Root Directory: `mercedes`
  - Framework: Other
  - Build command: none
  - `vercel.json` sends `X-Robots-Tag: noindex`, and `robots.txt` blocks crawlers.
- **Language:** RO by default. Switch with the RO/EN toggle or `?lang=en`.

## Design (from the dealer sample)

| Element | Value |
|---|---|
| Font | **Archivo** 300/400/500/600/700, self-hosted (OFL) |
| Colours | Black `#0a0a0a` / `#111`, white, greys `#8a8a8a` `#9a9a9a` `#d6d6d6` `#e6e6e6` |
| Shapes | Square buttons and inputs (radius 0). Model cards on Modele are rounded (8px), as on mercedes-benz.ro. |
| Type | Light (300) headlines, upper-case letter-spaced eyebrows, wordmark spaced at 0.32em |
| Car photos | Illustrative free photos from **Unsplash** (Unsplash License), hot-linked from `images.unsplash.com` as Unsplash recommends. Every stock car has 1–3 photos plus a credit line, and the full credit list is on `legal.html#foto`. If a photo fails to load, the side-profile SVG in the car's colour shows instead. In production the photos come from the DMS vehicle gallery. The Modele page uses the official images (see Modele). |

## Pages

| File | Page | Notes |
|---|---|---|
| `index.html` | Home | Dark hero with EQE photo and stats, quick search (Toate / Noi / Certificate & ex-demo), featured stock, body-type tiles linking to Modele, seasonal band, services, contact CTA |
| `modele.html` | **Modele** | Wrapper of the mercedes-benz.ro listing (details below) |
| `stoc.html` | Stoc auto | Tabs: Toate / Noi / Certificat / Ex-demo (details below) |
| `vehicul.html?id=` | Vehicle | Gallery, specs, VIN, stock ID, equipment, history and warranty by condition, finance calculator, offer and test-drive forms, similar cars |
| `oferte.html` | Oferte & campanii | Offer of the month, Auto / Service / Piese tabs, request form in a modal |
| `service.html` | Programare | 4 steps: Tip & vehicul → Logistică → Dată & oră → Date contact. Live summary, confirmation `SRV-2026-xxxx`. Prefills: `?tip=td&v=<stockId>`, `?loc=<id>` |
| `piese.html` | Piese & accesorii | 6 showcase parts (ref code, indicative price, "Solicită ofertă"), "e-shop coming soon" band with launch notification, VIN-based part request form |
| `locatii.html` | Locații | Map, city and service-type filters, 4 location cards |
| `locatie.html?id=` | Location | Photo, map, contact (call / WhatsApp / directions), hours, services, team, "Programează o vizită", stock at this location |
| `legal.html`, `404.html` | Legal, not found | |

### Modele

- 53 models in 8 body groups, matching the official structure.
- Brand label (Mercedes-Benz / Mercedes-AMG / Mercedes-Maybach), fuel chips, "Nou" / "În curând" markers, and the "Începând de la" price.
- Filters: Doar modele noi, Marcă, Model autovehicul, Tip combustibil, Preț. Sorting is available.
- Each card shows the official model image for that model, loaded directly from mercedes-benz.ro (`/content/dam/…`, the same image as the official overview page). If it fails, a drawing shows instead.
- **Clicking a card opens the official overview page** on mercedes-benz.ro in a new tab.
- Where the dealer has matching stock, the card also links to it, e.g. "4 în stoc →".

### Stoc auto

- Filters: search, model, body, fuel, drive, brand, vehicle type (autoturism / autoutilitară), location, max price, "available now".
- List view with an advisor column, or grid view.
- Sort and pagination.
- Statuses: Disponibil / Rezervat / "Disponibil din <date>".

## Integration points (Sales Partner APIs)

| Block | Source |
|---|---|
| `SP.STOCK` | DMS stock feed: ID, VIN, condition, status / ETA, list and offer price, location, advisor, equipment, photo gallery |
| `SP.LOCATIONS`, team | DMS organisation / users |
| Lead forms (offer, test drive, contact, part request) | `POST /api/leads` → Lead Collector (source = Website, type, context = stock ID / offer / part ref) |
| Service booking | `POST /api/service/appointments` → After-Sales appointment request |
| `SP.OFFERS` | Dealer CMS |
| `SP.PARTS` | After-Sales parts catalogue (e-shop phase 2) |
| `SP.RANGE` | Static. Refresh periodically from mercedes-benz.ro, or keep it in the CMS. |

Every integration point is marked with an `Integration point:` comment in the JS.

## Files

```
assets/css/site.css     – complete stylesheet (Archivo @font-face + layout)
assets/js/data.js       – dealer, locations, stock, equipment, MB range, offers, parts
assets/js/i18n.js       – RO / EN dictionary
assets/js/core.js       – helpers, car illustrations, header / footer, cards, lead form, modal
assets/js/pages.js      – one function per page (CakePHP: one template per action)
assets/img/             – hero, offers, locations, parts (webp)
assets/fonts/           – Archivo woff2 + licence
```
