# Design System Inspired by 3Q Hospitality Supply

Use this file as the source of truth for visual and brand decisions in this project.

## 1. Visual Theme & Atmosphere

The QMaster design system is inspired by 3Q Hospitality Supply: professional industrial efficiency combined with contemporary approachability. It uses strong contrast between deep maritime blue and vibrant lime green to communicate trust, expertise, and forward momentum. The aesthetic balances corporate solidity with modern dynamism through geometric accent shapes, clean spacing, high-contrast navigation, and component-rich layouts.

This is a B2B system for operational teams who need reliability, clarity, and confident navigation. The design should feel premium and specialized while staying accessible, scannable, and easy to use.

**Key Characteristics**
- Bold primary blue (`#0D4E8E`) establishes authority and corporate confidence.
- Energetic lime green (`#BED731`) highlights actions, active states, and visual emphasis.
- Local UTM Avo typography keeps the product aligned with the installed brand font.
- Geometric accent shapes add contemporary flair without overwhelming content.
- High contrast between interactive and neutral elements guides user focus.
- Industrial, operational, and product-focused imagery should integrate into structured layouts.
- Strategic white space supports scanning and comprehension.

## 2. Color Palette & Roles

### Primary

- **Corporate Navy** (`#0D4E8E`): Primary brand color for headers, navigation, links, trusted UI elements, and key brand surfaces. Establishes institutional authority.
- **Dark Text** (`#212529`): Secondary text and UI details requiring strong contrast. Use for body copy alternatives, labels, and muted interface text.

### Accent Colors

- **Energy Lime** (`#BED731`): Primary call-to-action emphasis, highlights, active indicators, and promotional elements. Creates visual pop and directs attention.
- **Gold Accent** (`#8B7046`): Premium badge treatment and special indicators. Use sparingly for emphasis.
- **Pale Cream** (`#EEF4C7`): Subtle background tint for featured sections or secondary highlight areas.

### Interactive

- **Primary CTA Blue** (`#0D4E8E`): Search buttons, form submission triggers, and trusted secondary actions.
- **Secondary CTA Lime** (`#BED731`): High-visibility actions and active navigation treatments.
- **Link Blue** (`#0D4E8E`): Navigation, inline hyperlinks, and branded text links.

### Neutral Scale

- **Pure White** (`#FFFFFF`): Primary surface background for pages, cards, and containers.
- **Pure Black** (`#000000`): Maximum contrast text and borders. Use only when necessary.
- **Light Gray** (`#F9F9FB`): Subtle background variation for secondary surfaces.
- **Medium Gray** (`#F1F1F1`): Input and neutral component backgrounds.
- **Border Gray** (`#DDDDDD`): Section dividers and subtle borders.
- **Input Border** (`#E1E1E1`): Form element borders at reduced emphasis.

### Surface & Borders

- **Card Border** (`rgba(0, 0, 0, 0.125)`): Subtle 1px border on contained elements.
- **Input Border Gray** (`#EBEBEB`): Minimal form input boundaries.
- **Neutral Divider** (`#808080`): Mid-tone separator when stronger definition is needed.

### Semantic / Status

- **Alert Red** (`#AD2B2B`): Error states and critical warnings.
- **Info Blue** (`#2F80ED`): Informational messaging and secondary CTAs.

## 3. Typography Rules

### Font Family

**Primary:** Local UTM Avo font installed in the app.

Files:
- `apps/web/public/fonts/UTM-Avo.ttf`
- `apps/web/public/fonts/UTM-AvoItalic.ttf`
- `apps/web/public/fonts/UTM-AvoBold.ttf`
- `apps/web/public/fonts/UTM-AvoBold_Italic.ttf`

The font is configured in `apps/web/app/layout.tsx` with `next/font/local` and assigned to `--font-sans`. Use `font-sans` for all product UI. Do not introduce Inter or another external sans-serif font unless explicitly requested.

### Hierarchy

| Role | Font | Size | Weight | Line Height | Letter Spacing | Notes |
|------|------|------|--------|-------------|-----------------|-------|
| Display / H1 | UTM Avo | 40px | 700 | 48px | 0px | Hero headlines and page titles. Maximum visual prominence. |
| Heading / H2 | UTM Avo | 32px | 700 | 38.4px | 0px | Section headers and major content divisions. |
| Subheading / H3 | UTM Avo | 18px | 700 | 21.6px | 0px | Card titles and category headers. |
| Label / H4 | UTM Avo | 14px | 700 | 16.8px | 0px | Form labels and secondary headings. |
| Body / Paragraph | UTM Avo | 14px | 400 | 21px | 0px | Primary content and product descriptions. |
| Caption / Small | UTM Avo | 11.2px | 400 | 16.8px | 0px | Helper text, timestamps, and secondary information. |
| Button Text | UTM Avo | 14px | 400–700 | 14px | 0px | Action labels with compact line height. |
| Link Text | UTM Avo | 14px | 400–700 | 21px | 0px | Inline and navigation links. Weight varies by context. |

### Principles

- **Consistency Over Variation:** Maintain the hierarchy across all contexts. Avoid intermediate sizes unless responsive scaling requires it.
- **Contrast Through Weight, Not Size:** Use weight shifts before increasing font size.
- **Line Height for Readability:** Body text at 21px line height ensures comfortable scanning.
- **Single Font Family:** UTM Avo exclusively supports project consistency.
- **Accessible Minimums:** No text smaller than 11.2px in main content. Form inputs should be at least 14px.

## 4. Component Stylings

### Buttons

#### Primary Button (Blue Background)

- **Background:** `#0D4E8E`
- **Text Color:** `#FFFFFF`
- **Font Size:** `14px`
- **Font Weight:** `400` or `700` for high emphasis
- **Padding:** `7px 20px`
- **Height:** `45px`
- **Border Radius:** `4px` standalone, or `0px 4px 4px 0px` for connected search buttons
- **Border:** `0px none`
- **Box Shadow:** None by default
- **Hover State:** Darken to `#0A3A66`
- **Active State:** `#062A4A`
- **Disabled State:** Opacity `0.5` with cursor `not-allowed`

#### Secondary Button (Lime Background)

- **Background:** `#BED731`
- **Text Color:** `#FFFFFF` or `#212529` depending on contrast context
- **Font Size:** `14px`
- **Font Weight:** `400` or `700`
- **Padding:** `7px 20px`
- **Height:** `45px`
- **Border Radius:** `3px` or `4px`
- **Border:** `0px none`
- **Box Shadow:** None by default
- **Hover State:** Darken to `#A8C428`
- **Active State:** `#92AD23`
- **Disabled State:** Opacity `0.5`

#### Ghost Button (Transparent)

- **Background:** `transparent`
- **Text Color:** `#212529`
- **Font Size:** `14px`
- **Font Weight:** `400`
- **Padding:** `0px` for icon buttons, `7px 20px` for text buttons
- **Height:** `20px–45px` depending on use
- **Border Radius:** `2px` or `3px`
- **Border:** `1px solid transparent`
- **Box Shadow:** None
- **Hover State:** Background `rgba(13, 78, 142, 0.08)`, text `#0D4E8E`
- **Focus State:** Outline `2px solid #0D4E8E` offset `2px`

### Cards & Containers

#### Product Card (White)

- **Background:** `#FFFFFF`
- **Text Color:** `#0D4E8E`
- **Font Size:** `14px`
- **Font Weight:** `400`
- **Padding:** `10px 15px`
- **Border Radius:** `4px`
- **Border:** `1px solid rgba(0, 0, 0, 0.125)`
- **Box Shadow:** None by default
- **Width:** `400px` typical desktop product grid item
- **Height:** Auto, content-driven
- **Hover State:** `box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px`, with subtle lift

#### Featured Section Container

- **Background:** `transparent` or `#FFFFFF`
- **Text Color:** `#0D4E8E`
- **Padding:** `0px–40px` depending on section purpose
- **Border Radius:** `0px`
- **Border:** `0px none`
- **Width:** `1440px` max for full-width hero sections
- **Height:** `552px` target for desktop hero sections
- **Box Shadow:** None

#### Nested Card

- **Background:** `transparent` or `#F1F1F1`
- **Text Color:** `#0D4E8E`
- **Padding:** `0px` transparent, or `6px 12px` input-like variant
- **Border Radius:** `0px` or `4px`
- **Border:** `0px none` transparent, or `1px solid #CECECE` input-like variant
- **Box Shadow:** None

### Inputs & Forms

#### Search Input (Large)

- **Background:** `#F1F1F1`
- **Text Color:** `#0D4E8E`
- **Font Size:** `14px`
- **Font Weight:** `400`
- **Padding:** `0px 82px 0px 20px`
- **Height:** `45px`
- **Border Radius:** `3px`
- **Border:** `1px solid #EBEBEB`
- **Box Shadow:** None
- **Width:** `588px` desktop target
- **Placeholder Color:** `rgba(13, 78, 142, 0.5)`
- **Focus State:** Border `1px solid #0D4E8E`, outline none, background `#FFFFFF`

#### Category Search Input

- **Background:** `#F2F2F7`
- **Text Color:** `#0D4E8E`
- **Font Size:** `14px`
- **Font Weight:** `400`
- **Padding:** `0px 100px 0px 20px`
- **Height:** `45px`
- **Border Radius:** `4px`
- **Border:** `1px solid #D9D9D9`
- **Width:** `450px` desktop target
- **Focus State:** Border `1px solid #0D4E8E`

#### Compact Input

- **Background:** `#FFFFFF`
- **Text Color:** `#495057`
- **Font Size:** `16px`
- **Font Weight:** `400`
- **Padding:** `6px 12px`
- **Height:** `30px`
- **Border Radius:** `0px`
- **Border:** `1px solid #CED4DA`
- **Width:** `55px` minimal quantity field
- **Focus State:** Border `2px solid #0D4E8E`, outline none

### Navigation

#### Primary Navigation Bar

- **Background:** `#0D4E8E` for full-width nav bars, or white/frosted surfaces when using a floating header.
- **Text Color:** `#FFFFFF` on navy, `#0D4E8E` or `#212529` on light surfaces.
- **Font Size:** `14px`
- **Font Weight:** `400` or `700` for active items.
- **Padding:** `12px 20px` default nav item.
- **Height:** `56px–64px`.
- **Border Radius:** `0px` for full-width bars, `999px` for floating pill headers.
- **Link Hover State:** Use underline hover for current QMaster header, or `rgba(255, 255, 255, 0.1)` on navy bars.
- **Active Link:** Lime (`#BED731`) underline or filled active background depending on component style.

#### Hamburger Menu (Mobile)

- **Background:** `#BED731`
- **Icon Color:** `#FFFFFF` or `#212529`
- **Padding:** `12px 16px`
- **Border Radius:** `4px`
- **Height:** `48px`
- **Width:** `48px`
- **Border:** `0px none`
- **Font Size:** `14px`
- **Font Weight:** `700`

### Links

#### Standard Link

- **Background:** `transparent`
- **Text Color:** `#0D4E8E`
- **Font Size:** `14px`
- **Font Weight:** `400`
- **Text Decoration:** None by default, underline on hover.
- **Padding:** `0px` inline, expanded padding for navigation hit areas.
- **Hover State:** Text color `#062A4A`, text decoration `underline`.
- **Active State:** Text color `#0A3A66`.
- **Focus State:** Outline `2px solid #0D4E8E` offset `2px`.

#### Emphasized Link

- **Font Weight:** `700`
- **Font Size:** `14px`
- **Text Color:** `#0D4E8E`
- **Hover State:** Color `#062A4A`, underline.

#### Footer Link

- **Font Size:** `14px`
- **Font Weight:** `400`
- **Text Color:** `#0D4E8E`
- **Hover State:** Underline `2px solid #0D4E8E`.

### Badges

#### Premium Price Badge

- **Background:** Linear gradient or solid `#8B7046`
- **Text Color:** `#FFFFFF`
- **Font Size:** `12px`
- **Font Weight:** `700`
- **Padding:** `8px 16px`
- **Border Radius:** `50%`
- **Border:** `0px none`
- **Box Shadow:** `rgba(0, 0, 0, 0.25) 0px 1px 10px 0px`
- **Width/Height:** `80px` circular target

## 5. Layout Principles

### Spacing System

**Base Unit:** `4px`

**Spacing Scale:**
- `4px` — Micro gaps between adjacent elements.
- `8px` — Tight margins between related components.
- `12px` — Standard padding within compact containers.
- `16px` — Default margin between sections.
- `20px` — Input field and button padding.
- `24px` — Section margins and consistent gap between cards.
- `28px` — Larger section spacing.
- `32px` — Container padding for medium-sized layouts.
- `36px` — Spacious padding for premium content areas.
- `40px` — Hero section padding and large container margins.
- `52px` — Extra-large feature padding.
- `56px` — Maximum gap scale for top-level section separation.

### Grid & Container

**Max Width:** `1440px` for full-featured desktop layouts.

**Secondary Max Width:** `1200px` for constrained content areas.

**Column Strategy:** 12-column grid with `24px` gutter.
- Desktop: 12 columns.
- Tablet: 6 columns.
- Mobile: 4 columns, usually stacked 1 or 2.

**Typical Layouts:**
- Hero section: Full-width `1440px` by `552px` with asymmetric image plus text overlay.
- Product grid: 3 columns on desktop with `20px` gap.
- Feature cards: 3 columns on desktop, 1 column on mobile.
- Navigation: Full-width bar or floating pill with centered content container.

### Whitespace Philosophy

Whitespace is strategic and purposeful. Use generous margins (`24px–40px`) between major sections to create visual breathing room and support hierarchy. Inputs and buttons should have `16px–20px` internal padding, with `24px` gaps between groups. Product cards maintain `10px–15px` internal padding. Never place text closer than `12px` from container edges.

### Border Radius Scale

- `0px` — Hard edges for strict industrial/professional components.
- `2px` — Minimal rounding on ghost buttons and small controls.
- `3px` — Search inputs and secondary button variants.
- `4px` — Standard cards, primary buttons, and modal-like containers.
- `50%` — Perfect circles for badges and icon buttons.
- `999px` — Floating pill headers, rounded CTAs, and nav capsules.

## 6. Depth & Elevation

| Level | Treatment | Use |
|-------|-----------|-----|
| Flat (0) | No shadow, `box-shadow: none` | Card borders, backgrounds, text |
| Subtle (1) | `rgba(0, 0, 0, 0.06) -2px 0px 8px 0px` | Dropdown menus, tooltip backgrounds |
| Raised (2) | `rgba(0, 0, 0, 0.25) 0px 1px 10px 0px` | Buttons on hover, interactive modals |
| Deep (3) | `rgba(0, 0, 0, 0.25) 0px 0px 5px 0px` | Featured modals, premium showcases |

**Shadow Philosophy:**
Shadows are used sparingly to avoid visual clutter. Reserve elevation for hover states, dropdown menus, and premium featured content. Product cards and main containers should usually stay flat with border-only styling.

**Hover Elevation Pattern:**
Interactive cards transition from flat (`border: 1px solid rgba(0, 0, 0, 0.125)`) to raised (`box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px`) with a subtle lift.

## 7. Do's and Don'ts

### Do

- **Use Navy (`#0D4E8E`) for trust and navigation.** Primary links, headers, and brand-critical UI should reinforce authority.
- **Apply Lime (`#BED731`) to CTAs and active states.** Use it for search, primary actions, underlines, and promotional highlights.
- **Use the installed UTM Avo font exclusively.** Keep typography consistent with the app setup.
- **Maintain minimum 14px font size for primary content.** Use 11.2px only for captions and helper text.
- **Use 24px minimum spacing between sections.** This supports visual hierarchy and prevents cognitive overload.
- **Stack inputs and buttons as paired groups when relevant.** Search input plus button should appear unified.
- **Leverage geometric accent shapes in hero and feature sections.** Triangular outlines and angled blocks fit the brand inspiration.
- **Provide 48px by 48px minimum touch targets on mobile.** All interactive elements must meet comfortable touch standards.

### Don't

- **Never use low-contrast gray text on white below 14px.** Use Navy (`#0D4E8E`) or Dark Text (`#212529`) for readable content.
- **Avoid mixing too many button styles in the same layout.** Use clear hierarchy between navy, lime, and ghost actions.
- **Do not introduce another font.** The project uses UTM Avo, not Inter.
- **Never apply shadows to every card by default.** Shadows belong to hover/interactive states and premium content.
- **Avoid placing text closer than 12px from any container edge.** Cramped content reduces readability.
- **Do not use colors outside the defined palette.** Custom colors dilute brand consistency.
- **Avoid invisible transparency overlays.** Keep interactive backgrounds visible enough to communicate state.
- **Never disable form inputs with opacity alone.** Use disabled behavior and clear visual indicators.

## 8. Responsive Behavior

### Breakpoints

| Name | Width | Key Changes |
|------|-------|-------------|
| Mobile | 320px–479px | Single-column layout, hamburger menu, full-width search, stacked cards |
| Tablet | 480px–767px | 2-column product grid, side-by-side forms, compact dropdown navigation |
| Laptop | 768px–1199px | 3-column product grid, full horizontal navigation, expanded hero sections |
| Desktop | 1200px+ | 12-column grid, 1440px max hero, 3-column product cards, expanded features |

### Mobile-Specific Adjustments

- Navigation shifts to a hamburger menu with `#BED731` background.
- Search input width becomes `100vw - 32px`.
- Product cards stack vertically, each occupying full width minus margins.
- Button padding can reduce to `6px 12px` on compact forms.
- Font sizes remain fixed; do not reduce body text below 14px.
- Touch targets expand to at least `44px`, preferably `48px`.

### Tablet Adjustments

- Navigation remains full-width but secondary menu items may collapse to dropdown.
- Product grid shifts to 2 columns with `20px` gap.
- Input fields may stay full-width or move into a 2-column layout.
- Major section padding reduces from `40px` to `32px`.

### Laptop+ Behavior

- 3-column product grid is stable around `400px` per card.
- Full horizontal navigation menu is visible.
- Hero sections display full-width up to `1440px` max with asymmetric layout.
- Use generous `24px–40px` padding on main containers.

### Touch Targets

- **Minimum Interactive Height:** `48px` for buttons, link areas, and form fields.
- **Minimum Interactive Width:** `48px` for icon buttons, close buttons, and toggles.
- **Preferred Button Padding:** `8px 16px` minimum.
- **Link Hit Area:** At least `44px` by `44px`, expanded by padding.
- **Form Input Height:** `45px` minimum.
- **Spacing Between Touch Targets:** Minimum `8px`.

### Collapsing Strategy

- **Hero Section:** Desktop uses asymmetric layout with image right and text left; mobile stacks image above text.
- **Product Grid:** 3 columns on desktop, 2 on tablet, 1 on mobile.
- **Navigation:** Horizontal on desktop; hamburger or compact menu on mobile.
- **Form Fields:** Side-by-side on desktop/tablet; stacked on mobile.
- **Search Bar:** Dual-input desktop layout can collapse to a single merged mobile search input.

## 9. Agent Prompt Guide

### Quick Color Reference

- **Primary CTA:** Energy Lime (`#BED731`) for high-attention actions.
- **Navigation & Links:** Corporate Navy (`#0D4E8E`) for navigation, headings, links, and trusted UI.
- **Background:** Pure White (`#FFFFFF`) for primary surfaces.
- **Text (Dark):** Corporate Navy (`#0D4E8E`) for body copy and primary content.
- **Text (Emphasis):** Dark Text (`#212529`) for labels, captions, and strong neutral text.
- **Input Fields:** Light Gray (`#F1F1F1` or `#F2F2F7`).
- **Borders:** Light Border (`#EBEBEB`, `#DDDDDD`, or `#E1E1E1`).
- **Status/Badge:** Gold (`#8B7046`) for premium indicators.
- **Warning:** Red (`#AD2B2B`) for errors and critical warnings.
- **Info:** Light Blue (`#2F80ED`) for informational messaging.

### Iteration Guide

1. **Typography uses the installed UTM Avo font.** Do not switch to Inter even though the inspiration source uses it.
2. **Use the fixed hierarchy.** Display 40px, Heading 32px, Subheading 18px, Label 14px, Body 14px, Caption 11.2px.
3. **Buttons follow three patterns.** Navy for trusted primary/secondary actions, lime for high-attention CTAs, ghost for minimal actions.
4. **Spacing follows the 4px scale.** Use `4px`, `8px`, `12px`, `16px`, `20px`, `24px`, `28px`, `32px`, `36px`, `40px`, `52px`, or `56px`.
5. **Inputs are 45px tall.** Search inputs use light gray backgrounds, navy text, and navy focus borders.
6. **Cards and containers use minimal borders.** Shadows appear only on hover or premium featured content.
7. **Hero sections target 552px desktop height.** Use asymmetric layouts and geometric accents.
8. **Product grids collapse predictably.** 3 columns desktop, 2 tablet, 1 mobile.
9. **Navigation uses navy and lime as the primary state colors.** Current QMaster header may use a white/frosted pill with lime underline.
10. **Touch targets are at least 48px by 48px.** Links require enough padding to be comfortably clickable.
11. **Accessibility contrast matters.** Navy on white is preferred for readable text. Lime should be paired with labels and strong contrast.
12. **Responsive breakpoints are fixed.** Mobile 320–479px, Tablet 480–767px, Laptop 768–1199px, Desktop 1200px+.
