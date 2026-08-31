# Global Design Rules
- Typography: Use system monospace fonts or a rigid sans-serif stack. Do not import generic Google fonts like Inter or Roboto.
- Color Palette: Implement a strict two-theme system, each theme monochrome-plus-one-accent. The default theme uses a solid dark navy background, silver text, and a cyan accent. The `blood-moon` theme (activated via `[data-theme='blood-moon']`) uses a solid dark maroon background, pale pink text, and a crimson accent. No gradients, textures, or third colors in either theme. Reserve the accent color exclusively for `:hover`/`:focus` states.
- Layout: Avoid centered text blocks and standard three-column symmetrical feature cards. Use an asymmetrical bento grid — solid-fill tiles of varying size, separated by generous gap spacing rather than visible borders — and dense information layouts. Every top-level section shares a uniform `px-6` horizontal padding; width is bounded by the shared `max-w-5xl` page container, not by per-section padding variation.
- UI Elements: Do not use rounded corners. Tiles and buttons are sharp-edged, solid-fill blocks with no border and no shadow at rest. Accent-colored `box-shadow` glow is permitted strictly on `:hover`/`:focus` states of interactive elements — never on static containers.
- Hero Exception: the Hero section deliberately breaks two rules above for visual hierarchy on the page's highest-impact section. Its primary CTA and status tag use the accent color at rest, not only on hover. Its secondary CTA, status tag, and boot-log panel each use a single 1px border. Every other component keeps the rules above unchanged.

# Code Constraints
- Do not add comments to the code.
