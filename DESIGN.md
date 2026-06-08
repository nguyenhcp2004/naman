# Design Guidelines

Use this file as the source of truth for visual and brand decisions in this project.

## Brand

- Product name: QMaster
- Visual direction: clean, professional, precise, and technical.
- The interface should feel like a modern business/education platform, not a generic dark SaaS template.
- Preserve the logo hierarchy: QMaster blue is the main brand color; lime is a supporting accent.

## Color Tokens

Theme tokens live in `packages/ui/src/styles/globals.css`.

### Primary

Use QMaster blue as the primary brand color.

- Primary: `#00578d`
- Primary foreground: `#ffffff`

Use primary for:

- Main buttons
- Active navigation states
- Important brand blocks
- Key charts or data series
- Logo-backed surfaces

Do not replace primary with the lime accent in dark mode.

### Accent

Use lime as the accent color.

- Accent: `#bfd731`
- Accent foreground: dark neutral text

Use accent sparingly for:

- Highlights
- Small status indicators
- Underlines
- Progress accents
- Secondary chart series
- Focus/ring emphasis

Avoid large lime surfaces unless the design specifically calls for a promotional or high-attention area.

### Neutrals

Use neutral white, black, and gray surfaces to support the brand colors.

- Light mode should feel white-first and spacious.
- Dark mode should use dark neutral surfaces with blue remaining the primary action color.
- Cards should maintain clear borders and enough contrast from the page background.

## Typography

The app uses the local UTM Avo font from:

- `apps/web/public/fonts/UTM-Avo.ttf`
- `apps/web/public/fonts/UTM-AvoItalic.ttf`
- `apps/web/public/fonts/UTM-AvoBold.ttf`
- `apps/web/public/fonts/UTM-AvoBold_Italic.ttf`

The font is configured in `apps/web/app/layout.tsx` with `next/font/local` and assigned to `--font-sans`.

Use existing Tailwind font utilities:

- `font-sans` for normal UI text
- `font-bold` or `font-semibold` for emphasis
- `italic` only when intentional

Avoid introducing another sans-serif font unless explicitly requested.

## Layout

- Prefer clean, balanced layouts with clear alignment.
- Use generous whitespace around important content.
- Use rounded cards and controls consistent with the current radius tokens.
- Avoid overly decorative gradients unless they support the QMaster identity.
- Keep responsive behavior first-class: every page should work well on mobile and desktop.

## Components

This project uses shared UI components from `packages/ui/src/components`.

Prefer existing components before creating new primitives:

- Use `Button` from `@workspace/ui/components/button` for buttons.
- Use theme tokens like `bg-primary`, `text-primary-foreground`, `bg-accent`, `border-border`, and `text-muted-foreground` instead of hardcoded colors in components.
- Hardcoded brand hex values are acceptable only in token definitions or one-off brand assets.

## Buttons

- Primary buttons should use `bg-primary text-primary-foreground`.
- Accent buttons should be rare; use only for secondary highlights or special calls to attention.
- Outline buttons should remain neutral and professional.
- Keep button labels short and action-oriented.

## Dark Mode

Dark mode must preserve brand hierarchy:

- Primary remains QMaster blue: `#00578d`
- Accent remains lime: `#bfd731`
- Do not invert the brand hierarchy by making lime the primary action color.
- Use lime mostly for focus, highlights, and supporting visual details.

## Copy Tone

- Clear, confident, and professional.
- Avoid playful SaaS filler copy unless requested.
- Prefer concise headings and direct action labels.

## Agent Rules

When making UI changes:

1. Check `packages/ui/src/styles/globals.css` before adding or changing colors.
2. Use design tokens rather than raw hex values in page/component markup.
3. Keep QMaster blue as primary and lime as accent.
4. Preserve UTM Avo as the default sans font.
5. Validate with `npm run typecheck` after code changes.
6. If changing visual structure, ensure the result is responsive.
