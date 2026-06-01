---
name: Midnight Slate
colors:
  surface: '#0b1326'
  surface-dim: '#0b1326'
  surface-bright: '#31394d'
  surface-container-lowest: '#060e20'
  surface-container-low: '#131b2e'
  surface-container: '#171f33'
  surface-container-high: '#222a3d'
  surface-container-highest: '#2d3449'
  on-surface: '#dae2fd'
  on-surface-variant: '#bbcabf'
  inverse-surface: '#dae2fd'
  inverse-on-surface: '#283044'
  outline: '#86948a'
  outline-variant: '#3c4a42'
  surface-tint: '#4edea3'
  primary: '#4edea3'
  on-primary: '#003824'
  primary-container: '#10b981'
  on-primary-container: '#00422b'
  inverse-primary: '#006c49'
  secondary: '#7bd0ff'
  on-secondary: '#00354a'
  secondary-container: '#00a6e0'
  on-secondary-container: '#00374d'
  tertiary: '#ffb3af'
  on-tertiary: '#650911'
  tertiary-container: '#fc7c78'
  on-tertiary-container: '#711419'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#6ffbbe'
  primary-fixed-dim: '#4edea3'
  on-primary-fixed: '#002113'
  on-primary-fixed-variant: '#005236'
  secondary-fixed: '#c4e7ff'
  secondary-fixed-dim: '#7bd0ff'
  on-secondary-fixed: '#001e2c'
  on-secondary-fixed-variant: '#004c69'
  tertiary-fixed: '#ffdad7'
  tertiary-fixed-dim: '#ffb3af'
  on-tertiary-fixed: '#410005'
  on-tertiary-fixed-variant: '#842225'
  background: '#0b1326'
  on-background: '#dae2fd'
  surface-variant: '#2d3449'
typography:
  headline-lg:
    fontFamily: Geist
    fontSize: 30px
    fontWeight: '600'
    lineHeight: 38px
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Geist
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
    letterSpacing: -0.01em
  body-lg:
    fontFamily: Geist
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-md:
    fontFamily: Geist
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  label-md:
    fontFamily: Geist
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
  headline-lg-mobile:
    fontFamily: Geist
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  unit: 4px
  gutter-md: 24px
  margin-page: 32px
  container-padding: 20px
  element-gap: 12px
---

## Brand & Style
The design system is a sophisticated, developer-centric interface that prioritizes clarity and technical precision. It is built for professional portfolios, technical documentation, and SaaS dashboards where information density needs to feel calm rather than overwhelming.

The aesthetic follows a **Modern Corporate** style with a dark-mode first philosophy. It leverages deep tonal layering rather than heavy shadows to create depth. The interface evokes a sense of reliability and modern craftsmanship through a monochromatic base accented by a singular, vibrant emerald green that signals activity and status.

## Colors
The palette is rooted in a deep, desaturated navy-grey foundation. 
- **Core Background**: A dark Slate/Navy (#0F172A) provides a low-strain viewing experience.
- **Surface Elevation**: Cards and nested containers use a slightly lighter, muted navy (#1E293B) to create a clear visual hierarchy.
- **Accents**: The primary emerald green (#10B981) is used sparingly for high-value status indicators, active states, and success messaging.
- **Typography Tones**: Headings use a crisp off-white for maximum legibility, while secondary labels and metadata use a cool grey to recede into the background.

## Typography
This design system utilizes **Geist** exclusively to maintain a technical, clean, and developer-friendly appearance. The typeface's geometric construction and generous tracking make it ideal for data-heavy interfaces.

Hierarchy is established primarily through weight and color rather than drastic size changes. Primary headings are semi-bold and pure white, while body text and descriptions transition into the "Slate" grey palette to maintain a comfortable reading rhythm. Monospaced elements (if used for code) should integrate seamlessly with the Geist aesthetic.

## Layout & Spacing
The layout employs a **Fluid Grid** model built on a 4px baseline. Standard containers utilize a 12-column grid on desktop with 24px gutters to allow the content-heavy cards sufficient breathing room.

- **Mobile**: Margins compress to 16px, and grids collapse to a single column.
- **Desktop**: A max-width of 1280px is recommended for readability, centered within the viewport.
- **Internal Spacing**: Elements within cards should maintain a consistent 20px padding to echo the generous, open feel of the reference aesthetic.

## Elevation & Depth
Depth is communicated through **Tonal Layers** rather than shadows. In this system, "higher" elements are represented by lighter fill colors:
1.  **Base Level**: Deep Navy (#0F172A) for the application background.
2.  **Level 1 (Cards)**: Muted Navy (#1E293B).
3.  **Level 2 (In-card elements/chips)**: Slate Grey (#334155).

Thin, low-opacity borders (1px solid #334155) can be used on Level 1 cards to provide extra definition against the background without adding visual clutter.

## Shapes
The shape language is defined by **Soft Geometric** forms. A standard radius of 8px (0.5rem) is applied to all primary containers, cards, and input fields. 

Secondary elements like tags, status chips, and small buttons may use a fully rounded "pill" shape to contrast against the structured grid of the cards. Interactive elements should never have sharp 0px corners, as the design system aims for an approachable yet professional feel.

## Components
- **Cards**: Background #1E293B, 8px border radius, no shadow. Content should have 20px internal padding.
- **Buttons**: Primary buttons use a subtle dark border or a semi-transparent fill. Ghost buttons are preferred for secondary actions.
- **Chips/Tags**: Small, 4px - 6px radius, using a dark slate background (#334155) with light grey text.
- **Status Indicators**: Use a 8px circular dot. The emerald green (#10B981) indicates "Active" or "Available."
- **Input Fields**: Dark backgrounds slightly deeper than the card surface, with 1px borders that highlight on focus using the emerald green.
- **Lists**: Items should be separated by subtle horizontal rules (#334155) or simply by vertical whitespace within a card.