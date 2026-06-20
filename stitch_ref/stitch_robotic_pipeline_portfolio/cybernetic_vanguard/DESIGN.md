---
name: Cybernetic Vanguard
colors:
  surface: '#11131c'
  surface-dim: '#11131c'
  surface-bright: '#373943'
  surface-container-lowest: '#0c0e17'
  surface-container-low: '#191b24'
  surface-container: '#1d1f29'
  surface-container-high: '#282933'
  surface-container-highest: '#32343e'
  on-surface: '#e1e1ef'
  on-surface-variant: '#b9cacb'
  inverse-surface: '#e1e1ef'
  inverse-on-surface: '#2e303a'
  outline: '#849495'
  outline-variant: '#3b494b'
  surface-tint: '#00dbe9'
  primary: '#dbfcff'
  on-primary: '#00363a'
  primary-container: '#00f0ff'
  on-primary-container: '#006970'
  inverse-primary: '#006970'
  secondary: '#ebb2ff'
  on-secondary: '#520072'
  secondary-container: '#b600f8'
  on-secondary-container: '#fff6fc'
  tertiary: '#f7f4ff'
  on-tertiary: '#2f303b'
  tertiary-container: '#d9d8e8'
  on-tertiary-container: '#5d5e6b'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#7df4ff'
  primary-fixed-dim: '#00dbe9'
  on-primary-fixed: '#002022'
  on-primary-fixed-variant: '#004f54'
  secondary-fixed: '#f8d8ff'
  secondary-fixed-dim: '#ebb2ff'
  on-secondary-fixed: '#320047'
  on-secondary-fixed-variant: '#74009f'
  tertiary-fixed: '#e2e1f1'
  tertiary-fixed-dim: '#c6c5d4'
  on-tertiary-fixed: '#1a1b26'
  on-tertiary-fixed-variant: '#454652'
  background: '#11131c'
  on-background: '#e1e1ef'
  surface-variant: '#32343e'
typography:
  headline-xl:
    fontFamily: sora
    fontSize: 64px
    fontWeight: '800'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: sora
    fontSize: 40px
    fontWeight: '700'
    lineHeight: '1.2'
    letterSpacing: -0.01em
  headline-lg-mobile:
    fontFamily: sora
    fontSize: 32px
    fontWeight: '700'
    lineHeight: '1.2'
  headline-md:
    fontFamily: sora
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.4'
  body-lg:
    fontFamily: jetbrainsMono
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: jetbrainsMono
    fontSize: 15px
    fontWeight: '400'
    lineHeight: '1.6'
  label-sm:
    fontFamily: jetbrainsMono
    fontSize: 12px
    fontWeight: '600'
    lineHeight: '1'
    letterSpacing: 0.1em
spacing:
  unit: 4px
  gutter: 24px
  margin-desktop: 64px
  margin-mobile: 20px
  container-max: 1440px
---

## Brand & Style

The design system is engineered for a high-performance robotic portfolio, targeting aerospace, robotics firms, and cutting-edge tech recruiters. The aesthetic is "Industrial Futurism"—a blend of high-tech precision and raw engineering utility. 

It draws heavily from **Modern Brutalism** and **Technical Minimalist** movements. The UI should evoke the feeling of a heads-up display (HUD) or a secure terminal interface used to monitor autonomous systems. Key visual drivers include pipeline-inspired structural borders, subtle background grid overlays, and high-contrast neon accents against a light-absorbing midnight foundation. The emotional response is one of reliability, advanced intelligence, and precision engineering.

## Colors

The palette is anchored in a multi-layered dark theme to provide maximum depth.
- **Backgrounds:** The base layer uses `neutral` (#0F111A), a deep charcoal-midnight. Secondary containers use `tertiary` (#1A1B26) to create subtle elevation.
- **Accents:** Neon Cyan (#00F0FF) is the primary action color, used for high-priority data and interactive states. Electric Purple (#BC13FE) serves as a secondary accent for status indicators, hover states, and specialized categorizations.
- **Overlays:** Use a 5% opacity Cyan for grid lines and a 10% opacity Purple for "pipeline" decorative borders.

## Typography

Typography balances the wide, aggressive geometry of **Sora** for headings with the functional, developer-centric precision of **JetBrains Mono** for data and body content.

- **Headlines:** Sora should be used in Bold or Extra Bold weights. Letter spacing is slightly tightened for a dense, impactful look. Large headlines (XL) should be used sparingly for hero sections.
- **Body & Data:** JetBrains Mono provides the "technical readouts" feel. It ensures that technical specifications and code snippets remain legible.
- **Labels:** Small labels and tags should always be uppercase with increased letter spacing to mimic industrial serial numbers and hardware markings.

## Layout & Spacing

This design system utilizes a **12-column fluid grid** for desktop and a **4-column grid** for mobile. The layout is structured around a "Pipeline Architecture"—elements are connected by vertical and horizontal lines that suggest a continuous flow of data or power.

- **Grid:** Use a 24px gutter. All spacing increments must be multiples of 4px to maintain mathematical precision.
- **Margins:** Large outer margins on desktop provide "breathing room" for complex technical components.
- **Pipeline Borders:** Section dividers should not just be simple lines; they should feature small "nodes" (2x2px squares) at intersections to reinforce the industrial feel.

## Elevation & Depth

Depth is not communicated through shadows, but through **Tonal Layers** and **Luminous Outlines**.
- **Surface Tiering:** The background is the lowest level. Content cards sit on the `tertiary` color (#1A1B26) with a 1px solid border in a slightly lighter shade or 10% Cyan.
- **Glow Effects:** Instead of shadows, use "Outer Glows" for active states. A 2px-4px soft Cyan blur can be applied to buttons or active status indicators to simulate light emission from a screen.
- **Background Grid:** A subtle, non-scrolling grid pattern (fixed position) should be visible at 3% opacity to provide a technical floor for all elements.

## Shapes

The shape language is strictly **Sharp (0px)**. Rounded corners are avoided to maintain the aggressive, industrial aesthetic of robotic hardware and heavy machinery. 

For decorative elements, use 45-degree "clipped corners" (chamfers) rather than radii. This applies specifically to the corners of primary buttons and section headers to evoke the look of machined metal plates.

## Components

- **Buttons:** Sharp-edged boxes with 1px borders. Primary buttons use a solid Cyan fill with black text. Secondary buttons use a transparent background with a Cyan border and text. On hover, buttons should trigger a "flicker" animation or a solid Cyan glow.
- **Status Chips:** Small, rectangular tags with monochromatic backgrounds. Use Neon Purple for "System Active" or "In Progress" states.
- **Input Fields:** Bottom-border only or full-border boxes with JetBrains Mono text. Focus states should trigger a subtle scanning-line animation or a color shift to Cyan.
- **Cards:** No shadows. Cards are defined by their 1px borders and optional "Corner Brackets"—small L-shaped graphics at the corners to suggest a view-port or targeter.
- **Pipeline Dividers:** Vertical lines that connect different content blocks, ending in a small square terminal or a "node."
- **Data Tables:** High-density grids with no vertical lines, only horizontal dividers, using the `label-sm` typography for headers.